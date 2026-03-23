"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
  /** Whether a page transition is in progress */
  isNavigating: boolean;
  /** The target route path we're navigating to */
  targetPath: string | null;
  /** Call when a nav link is clicked to immediately show skeleton */
  startNavigation: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  targetPath: null,
  startNavigation: () => {},
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const startNavigation = useCallback(
    (path: string) => {
      // Don't trigger skeleton for same-page navigation
      if (path === pathname) return;
      setIsNavigating(true);
      setTargetPath(path);
    },
    [pathname]
  );

  // When pathname changes → navigation completed
  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
      setTargetPath(null);
    }
    // Only react to pathname changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ⚡ Bolt: Memoize the context value to prevent unnecessary re-renders of all consuming components
  // when the provider re-renders. This ensures the object reference remains stable
  // unless the actual navigation state changes. Expected impact: Reduces re-renders of all NavigationContext consumers by ~100% when parent re-renders without state changes.
  const value = useMemo(() => ({
    isNavigating,
    targetPath,
    startNavigation,
  }), [isNavigating, targetPath, startNavigation]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
