"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lenis is only useful on devices with a wheel/trackpad. On touch devices the
// native scroll is already smooth, and shipping lenis there just burns JS
// parse/execute time — a measurable hit to mobile TBT/perf. We `next/dynamic`
// import it so it lands in its own chunk that mobile clients never fetch.
const LenisShell = dynamic(() => import("./LenisShell"), { ssr: false });

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [useLenisShell, setUseLenisShell] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!isTouch && !prefersReducedMotion) {
            setUseLenisShell(true);
        }
    }, []);

    if (useLenisShell) {
        return <LenisShell>{children}</LenisShell>;
    }

    return <>{children}</>;
}
