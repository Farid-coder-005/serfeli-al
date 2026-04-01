"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function LoadingBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Track full URL key including search params
  const prevKey = useRef(`${pathname}?${searchParams.toString()}`);

  useEffect(() => {
    const key = `${pathname}?${searchParams.toString()}`;
    if (key === prevKey.current) return;
    prevKey.current = key;

    // Clear any previous timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start bar immediately
    setProgress(15);
    setVisible(true);

    // Ramp up to ~90% quickly using small intervals
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(intervalRef.current!);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 80);

    // Complete quickly — no need for a long artificial wait
    timerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current!);
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 rounded-r-full shadow-[0_0_8px_2px_rgba(22,163,74,0.5)]"
        style={{
          width: `${progress}%`,
          transition: progress === 100
            ? "width 0.18s ease-out"
            : "width 0.1s ease-in-out",
        }}
      />
    </div>
  );
}

// useSearchParams needs a Suspense boundary
export default function LoadingBar() {
  return (
    <Suspense fallback={null}>
      <LoadingBarInner />
    </Suspense>
  );
}
