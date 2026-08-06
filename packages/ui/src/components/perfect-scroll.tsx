"use client";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { cn } from "../lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, useEffect, useRef } from "react";

export interface PerfectScrollProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  options?: PerfectScrollbar.Options;
}

/**
 * Drop-in scroll container using perfect-scrollbar (same as Fuse React theme).
 * Renders custom scrollbar DOM elements that show on hover — bypasses macOS
 * overlay scrollbar limitations.
 */
const PerfectScroll = forwardRef<HTMLDivElement, PerfectScrollProps>(
  ({ children, className, options, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const psRef = useRef<PerfectScrollbar | null>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      psRef.current = new PerfectScrollbar(element, {
        wheelPropagation: true,
        ...options,
      });

      const resizeObserver = new ResizeObserver(() => {
        psRef.current?.update();
      });

      resizeObserver.observe(element);
      if (element.firstElementChild) {
        resizeObserver.observe(element.firstElementChild);
      }

      return () => {
        resizeObserver.disconnect();
        if (psRef.current) {
          psRef.current.destroy();
          psRef.current = null;
        }
      };
    }, [options]);

    // Update perfect-scrollbar on render
    useEffect(() => {
      psRef.current?.update();
    });

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        className={cn("relative", className)}
        style={{ overflow: "hidden", ...props.style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PerfectScroll.displayName = "PerfectScroll";

export { PerfectScroll };
