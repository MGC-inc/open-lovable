"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The stylesheet keeps every `.js-anime` block translated/transparent until it
 * also carries `.is-anime`. The original site added that class from a scroll
 * handler; an IntersectionObserver does the same job without the jQuery.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".js-anime:not(.is-anime)"));
    if (targets.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-anime"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-anime");
          observer.unobserve(entry.target);
        });
      },
      // Reveal a little before the block is fully in view, as the original did.
      { rootMargin: "0px 0px -12% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
