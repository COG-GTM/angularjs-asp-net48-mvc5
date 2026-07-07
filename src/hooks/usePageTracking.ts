import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type GtagFn = (
  command: 'config' | 'event' | 'js',
  targetId: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

/**
 * Tracks page views on route changes. If a Google Analytics `gtag` global is
 * present it reports the new path; otherwise it is a no-op (safe in dev/tests).
 */
export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: path });
    }
  }, [location]);
}
