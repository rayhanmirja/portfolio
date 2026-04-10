"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function ScrollReset() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    return null;
}

/**
 * Wraps the tree with Lenis smooth scrolling. Split into its own module so
 * `SmoothScroll` can `next/dynamic`-import it — that way lenis and its CSS
 * hooks end up in a separate chunk that mobile clients never download.
 */
export default function LenisShell({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
            }}
        >
            <ScrollReset />
            {children}
        </ReactLenis>
    );
}
