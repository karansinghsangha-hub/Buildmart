import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query via useSyncExternalStore — the primitive
 * React itself recommends for "read a browser-only value, subscribe to
 * its changes" (see https://react.dev/reference/react/useSyncExternalStore).
 * Unlike useState+useEffect, this can't cause a setState-in-effect lint
 * finding and can't cause a hydration mismatch: it reports `serverSnapshot`
 * during server rendering / the static export build (no window there) and
 * during the client's first paint, then syncs to the real value right
 * after hydration with no flicker-prone extra render of our own.
 */
export function useMediaQuery(query: string, serverSnapshot = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  );
}
