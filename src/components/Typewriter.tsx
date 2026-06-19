"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through phrases with a type → pause → delete loop and a blinking caret.
 * Reserves space for the longest phrase so the layout never jumps.
 */
export default function Typewriter({
  phrases,
  typeSpeed = 55,
  deleteSpeed = 30,
  pause = 1800,
}: {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[index % phrases.length];

    // Finished typing → hold, then start deleting
    if (!deleting && subIndex === current.length) {
      const id = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(id);
    }

    // Finished deleting → advance to the next phrase
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const id = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(id);
  }, [subIndex, deleting, index, phrases, typeSpeed, deleteSpeed, pause]);

  const current = phrases[index % phrases.length] ?? "";
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-block w-full align-top">
      {/* invisible placeholder reserves space for the tallest/longest phrase */}
      <span aria-hidden className="invisible">
        {longest}
      </span>
      <span className="absolute inset-0">
        {current.substring(0, subIndex)}
        <span className="caret" aria-hidden />
      </span>
    </span>
  );
}
