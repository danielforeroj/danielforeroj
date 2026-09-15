import React from 'react';

/**
 * Keep the tab title and the description in step with the language the visitor is
 * reading, after hydration.
 *
 * <Seo> renders through vite-react-ssg's Head, which is what lands in the prerendered
 * HTML, and that is the right source for a crawler. It does not follow a later state
 * change though: the funnel picks its language after mount (?lang, then the stored
 * choice, then the browser), and the library re-renders when the visitor toggles, so
 * an English page kept the Spanish title in the tab. This syncs both to what the page
 * currently says, and leaves the prerendered head alone.
 */
export function useHeadSync(title: string, description?: string): void {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.title !== title) document.title = title;
    if (!description) return;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && meta.getAttribute('content') !== description) meta.setAttribute('content', description);
  }, [title, description]);
}
