import React from 'react';
import type { Visit } from '../../lib/visitTrack';

// A slide deck of a report room (2026-11-20): /d/<slug>/deck. The deck is one self-contained
// HTML file (content/d/<file>.html) whose slides are `.slide` sections, one `.active` at a
// time, moved by its own script (#prev, #next, the arrow keys). It is drawn in a sandboxed
// iframe that may run that script but is not same-origin with this page, so nothing in it
// can reach the site. A small bridge added to the file tells this page which slide is on
// screen (postMessage), which is what the visit records: one page per slide, seconds per
// slide. This page's own controls, keys and swipes move the deck through the same bridge.

type Labels = {
  prev: string;
  next: string;
  slideOf: (n: number, total: number) => string;
  fullscreen: string;
  exitFullscreen: string;
  rotate: string;
  frameTitle: string;
};

const BRIDGE = `<script>(function(){
var slides=[].slice.call(document.querySelectorAll('.slide'));
function cur(){for(var k=0;k<slides.length;k++){if(slides[k].classList.contains('active'))return k}return 0}
var last=-1;
function report(){var i=cur();if(i!==last){last=i;parent.postMessage({dfjDeck:1,slide:i+1,total:slides.length},'*')}}
new MutationObserver(report).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
report();
function go(d){var b=document.getElementById(d==='prev'?'prev':'next');if(b)b.click()}
window.addEventListener('message',function(e){if(e.source!==parent||!e.data)return;if(e.data.dfjDeckGo)go(e.data.dfjDeckGo);if(e.data.dfjDeckHello)report()});
var x0=null,y0=null;
document.addEventListener('touchstart',function(e){var t=e.changedTouches[0];x0=t.clientX;y0=t.clientY},{passive:true});
document.addEventListener('touchend',function(e){if(x0===null)return;var t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))go(dx<0?'next':'prev')},{passive:true});
})();</script>`;

// Before the deck's own script: links open outside the frame, the deck's own small nav gives
// way to this page's controls, and its history.replaceState (a no-op in a srcdoc frame,
// and a SecurityError in some browsers) never stops it.
const HEAD = `<base target="_blank"><style>.nav{display:none!important}</style><script>try{history.replaceState=function(){}}catch(e){}</script>`;

function prepare(html: string): string {
  // The deck fits its slides to the window less a strip for its own bar (innerHeight - 40);
  // that bar is hidden here and this page draws its own under the frame, so the slides
  // take the whole frame.
  html = html.replace(/\(window\.innerHeight-\d+\)\/720/g, 'window.innerHeight/720');
  let out = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + HEAD) : HEAD + html;
  out = /<\/body>/i.test(out) ? out.replace(/<\/body>/i, `${BRIDGE}</body>`) : out + BRIDGE;
  return out;
}

const DeckView: React.FC<{ html: string; slides: number; visit: React.MutableRefObject<Visit | null>; t: Labels }> = ({
  html,
  slides,
  visit,
  t,
}) => {
  const frame = React.useRef<HTMLIFrameElement>(null);
  const wrap = React.useRef<HTMLDivElement>(null);
  const [slide, setSlide] = React.useState(1);
  const [total, setTotal] = React.useState(slides);
  const [full, setFull] = React.useState(false);
  const srcDoc = React.useMemo(() => prepare(html), [html]);

  const go = React.useCallback((dir: 'prev' | 'next') => {
    frame.current?.contentWindow?.postMessage({ dfjDeckGo: dir }, '*');
  }, []);

  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!frame.current || e.source !== frame.current.contentWindow) return;
      const d = e.data as { dfjDeck?: number; slide?: number; total?: number } | null;
      if (!d || d.dfjDeck !== 1 || typeof d.slide !== 'number') return;
      setSlide(d.slide);
      if (typeof d.total === 'number' && d.total > 0) {
        setTotal(d.total);
        visit.current?.setPagesTotal(d.total);
      }
      visit.current?.page(d.slide);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [visit]);

  // The arrow keys move the deck even when the focus is on this page, not in the frame.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        go('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go('prev');
      } else if (e.key === 'Escape' && full) {
        setFull(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, full]);

  // Full screen: the real one where the browser has it, and the frame over the whole
  // viewport either way (an iPhone has no element full screen), so a phone held sideways
  // reads the slides at full size.
  const toggleFull = () => {
    const next = !full;
    setFull(next);
    const el = wrap.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    try {
      if (next && el) {
        if (el.requestFullscreen) void el.requestFullscreen().catch(() => {});
        else el.webkitRequestFullscreen?.();
      } else if (!next && document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {});
      }
    } catch {
      /* the overlay alone is enough */
    }
  };

  React.useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFull(false);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  React.useEffect(() => {
    if (!full) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [full]);

  return (
    <div ref={wrap} className={full ? 'deck deck--full' : 'deck'}>
      <div className="deck-stage">
        <iframe
          ref={frame}
          className="deck-frame"
          title={t.frameTitle}
          srcDoc={srcDoc}
          // allow-scripts without allow-same-origin: the deck runs its own slide script in an
          // opaque origin and can reach nothing here; links open in a new tab.
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          onLoad={() => frame.current?.contentWindow?.postMessage({ dfjDeckHello: 1 }, '*')}
        />
      </div>
      <div className="deck-bar">
        <button type="button" className="deck-btn" onClick={() => go('prev')} disabled={slide <= 1} aria-label={t.prev}>
          ←
        </button>
        <span className="deck-count" aria-live="polite">
          {t.slideOf(slide, total)}
        </span>
        <button type="button" className="deck-btn" onClick={() => go('next')} disabled={slide >= total} aria-label={t.next}>
          →
        </button>
        <button type="button" className="aif-link deck-full" onClick={toggleFull}>
          {full ? t.exitFullscreen : t.fullscreen}
        </button>
      </div>
      {!full ? <p className="aif-meta deck-rotate">{t.rotate}</p> : null}
    </div>
  );
};

export default DeckView;
