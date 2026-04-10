"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Track hover states for interactive elements
        const handleLinkHoverEnter = () => setIsHovering(true);
        const handleLinkHoverLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        // Add listeners to all interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, [data-cursor="hover"]'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleLinkHoverEnter);
            el.addEventListener("mouseleave", handleLinkHoverLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleLinkHoverEnter);
                el.removeEventListener("mouseleave", handleLinkHoverLeave);
            });
        };
    }, [cursorX, cursorY, isHovering]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: isVisible ? 1 : 0,
            }}
            animate={{
                scale: isHovering ? 1.5 : 1,
                backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
            }}
            transition={{ duration: 0.2 }}
        />
    );
}
