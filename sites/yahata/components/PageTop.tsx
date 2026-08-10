"use client";

import { useEffect, useState } from "react";

/**
 * "Back to top" button. It appears once the page has been scrolled and parks
 * itself above the footer instead of overlapping it, matching the original.
 */
export default function PageTop() {
  const [visible, setVisible] = useState(false);
  const [parkedAt, setParkedAt] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);

      const footer = document.querySelector<HTMLElement>(".js-totop_ep");
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const reachedFooter = window.scrollY + window.innerHeight > footerTop;
      setParkedAt(reachedFooter ? footer.offsetHeight : null);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className={`c-totop js-totop${visible ? " is-act" : ""}`}
      style={
        parkedAt === null
          ? { display: visible ? "block" : "none", position: "fixed" }
          : { display: visible ? "block" : "none", position: "absolute", bottom: `calc(${parkedAt}px + 2vw)` }
      }
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span>
        ページの
        <br />
        TOPに戻る
      </span>
    </button>
  );
}
