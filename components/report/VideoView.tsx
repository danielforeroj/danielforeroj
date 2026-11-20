import React from 'react';
import type { Visit } from '../../lib/visitTrack';

// A video of a report room (2026-11-20): /d/<slug>/video. An unlisted YouTube video, embedded
// from youtube-nocookie.com through the YouTube IFrame Player API, so the visit can record
// what was watched: time counts only while the video plays, one page per 30 second segment
// (the app's page strip then reads as which parts were watched and by how many), and play,
// pause, a jump and the end go on the visit's timeline with the second they happened at.

export const SEGMENT_SECONDS = 30;
const POLL_MS = 1000;

type YTPlayer = {
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};
type YTNamespace = {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number; BUFFERING: number; CUED: number };
};
type YTWindow = Window & { YT?: YTNamespace; onYouTubeIframeAPIReady?: () => void };

let apiPromise: Promise<YTNamespace> | null = null;

function loadApi(): Promise<YTNamespace> {
  const w = window as YTWindow;
  if (w.YT?.Player) return Promise.resolve(w.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (w.YT) resolve(w.YT);
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    s.onerror = () => {
      apiPromise = null;
      reject(new Error('YouTube API did not load'));
    };
    document.head.appendChild(s);
  });
  return apiPromise;
}

const segmentOf = (seconds: number) => Math.floor(Math.max(0, seconds) / SEGMENT_SECONDS) + 1;

const VideoView: React.FC<{
  youtubeId: string;
  title: string;
  visit: React.MutableRefObject<Visit | null>;
  t: { loadError: string };
}> = ({ youtubeId, title, visit, t }) => {
  const host = React.useRef<HTMLDivElement>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    let player: YTPlayer | null = null;
    let poll = 0;
    let playing = false;
    let lastTime = 0;
    let lastAt = 0;

    const now = () => {
      try {
        return player?.getCurrentTime() ?? 0;
      } catch {
        return 0;
      }
    };

    const knowLength = () => {
      try {
        const d = player?.getDuration() ?? 0;
        if (d > 0) visit.current?.setPagesTotal(Math.ceil(d / SEGMENT_SECONDS));
      } catch {
        /* not ready yet */
      }
    };

    const tick = () => {
      if (!playing) return;
      const time = now();
      const expected = lastTime + (Date.now() - lastAt) / 1000;
      // A jump while playing: the time moved by more than the clock did.
      if (Math.abs(time - expected) > 3) visit.current?.media('seek', time);
      lastTime = time;
      lastAt = Date.now();
      visit.current?.page(segmentOf(time));
    };

    loadApi()
      .then((YT) => {
        if (!alive || !host.current) return;
        const target = document.createElement('div');
        host.current.appendChild(target);
        player = new YT.Player(target, {
          host: 'https://www.youtube-nocookie.com',
          videoId: youtubeId,
          width: '100%',
          height: '100%',
          playerVars: { rel: 0, playsinline: 1, modestbranding: 1 },
          events: {
            onReady: knowLength,
            onError: () => alive && setFailed(true),
            onStateChange: (e: { data: number }) => {
              const time = now();
              if (e.data === YT.PlayerState.PLAYING) {
                knowLength();
                // A play after a jump made while paused lands on its new segment first.
                visit.current?.page(segmentOf(time));
                if (!playing) visit.current?.media('play', time);
                playing = true;
                lastTime = time;
                lastAt = Date.now();
                visit.current?.setActive(true);
                if (!poll) poll = window.setInterval(tick, POLL_MS);
              } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
                if (playing) tick();
                playing = false;
                visit.current?.setActive(false);
                window.clearInterval(poll);
                poll = 0;
                visit.current?.media(e.data === YT.PlayerState.ENDED ? 'ended' : 'pause', time);
              }
            },
          },
        });
      })
      .catch(() => alive && setFailed(true));

    return () => {
      alive = false;
      window.clearInterval(poll);
      try {
        player?.destroy();
      } catch {
        /* already gone */
      }
    };
  }, [youtubeId, visit]);

  return (
    <div className="vid">
      <div className="vid-stage" ref={host} title={title} />
      {failed ? (
        <p className="aif-meta rpt-status" role="status">
          {t.loadError}
        </p>
      ) : null}
    </div>
  );
};

export default VideoView;
