// ─── CustomCursor Component ───────────────────────────────────────────────────
// Replaces the default OS mouse cursor with a custom two-part neon cursor:
//   1. A small solid dot that follows the mouse exactly.
//   2. A larger hollow ring that lags slightly behind the dot (smooth follow).
//
// Behaviour:
//   • On hover over links, buttons, and inputs → cursor turns GOLDEN and the ring grows.
//   • On mouse down (click) → dot shrinks and ring shrinks.
//   • Cursor starts hidden and only appears after the first mouse move.
//   • On touch devices (phones/tablets), this whole component returns null \u2014 nothing renders.
//
// How the animation loop works:
//   requestAnimationFrame (RAF) runs every ~16ms (60fps). Each frame it:
//     \u2014 Moves the dot instantly to the current mouse position.
//     \u2014 Moves the ring 10% of the way toward the dot (lerp), creating a lag effect.
//   This approach uses direct DOM style mutations instead of React state, which is
//   much faster and avoids re-renders on every mouse move.

import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null); // Ref to the small solid dot element
  const ringRef = useRef<HTMLDivElement>(null); // Ref to the large hollow ring element

  // Current exact mouse position (updated on every mousemove)
  const pos = useRef({ x: -100, y: -100 });

  // Current interpolated ring position (lags behind pos for the smooth follow effect)
  const ringPos = useRef({ x: -100, y: -100 });

  // Stores the RAF ID so we can cancel it on cleanup
  const rafRef = useRef<number>(0);

  const [hovering, setHovering]   = useState(false); // True when hovering over a clickable element
  const [clicking, setClicking]   = useState(false); // True while mouse button is held down
  const [visible, setVisible]     = useState(false); // False until first mouse move (avoids jump from 0,0)

  // Detect if the device uses touch (coarse pointer = touchscreen).
  // On touch devices we don't show the custom cursor at all.
  const isTouch =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouch) return; // Don't run any of this on touch devices

    // \u2500\u2500 Track mouse position \u2500\u2500
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true); // Show the cursor after the first move
    };

    // \u2500\u2500 Track click state \u2500\u2500
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    // \u2500\u2500 Detect when hovering over an interactive element \u2500\u2500
    // Uses event delegation: checks if the event target is or is inside a clickable element.
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (
        t?.closest(
          'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
        )
      ) {
        setHovering(true); // Switch to golden hover style
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (
        t?.closest(
          'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
        )
      ) {
        setHovering(false); // Switch back to default cyan style
      }
    };

    // Register all event listeners
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);

    // \u2500\u2500 Animation loop (runs at ~60fps) \u2500\u2500
    const loop = () => {
      const dot  = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        // Move the dot INSTANTLY to the exact mouse position
        dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      if (ring) {
        // Move the ring 10% of the distance toward the dot each frame.
        // This creates the smooth "lagging ring" effect.
        // Formula: currentPos += (target - currentPos) * speed
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      // Schedule the next frame
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop); // Start the loop

    // Cleanup: remove all listeners and stop the animation when component unmounts
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, visible]);

  // Don't render anything on touch devices
  if (isTouch) return null;

  return (
    <>
      {/* ── Small solid DOT \u2014 follows cursor exactly ── */}
      <div
        ref={dotRef}
        aria-hidden="true" // Purely decorative; screen readers ignore it
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          // Size shrinks while clicking
          width:  clicking ? '6px' : '8px',
          height: clicking ? '6px' : '8px',
          // Colour: golden on hover, cyan otherwise
          background: hovering ? '#ffb800' : '#00f5ff',
          borderRadius: '50%',
          pointerEvents: 'none', // Must not block any mouse events
          zIndex: 99999,         // Always on top of everything
          opacity: visible ? 1 : 0, // Hidden until first mouse move
          // Glow effect matches the dot colour
          boxShadow: hovering
            ? '0 0 10px #ffb800'
            : '0 0 10px #00f5ff',
          // Smooth colour and size transitions
          transition: 'width 0.15s, height 0.15s, background 0.2s, box-shadow 0.2s',
          willChange: 'transform', // Performance hint: this element will be transformed often
        }}
      />

      {/* ── Large hollow RING \u2014 follows cursor with a slight lag ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          // Ring grows larger when hovering, shrinks when clicking
          width:  hovering ? '52px' : clicking ? '22px' : '36px',
          height: hovering ? '52px' : clicking ? '22px' : '36px',
          border: `1.5px solid ${hovering ? '#ffb800' : '#00f5ff'}`, // Border colour matches dot
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,          // Just below the dot
          opacity: visible ? (hovering ? 0.7 : 0.35) : 0, // More visible on hover
          // Smooth size and colour transitions
          transition:
            'width 0.3s ease, height 0.3s ease, border-color 0.2s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  );
};
