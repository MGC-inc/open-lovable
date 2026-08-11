"use client";

import { useEffect, useRef, useState } from "react";

const COOKIE = "loaded";

function hasSeenLoader() {
  return document.cookie.split("; ").some((entry) => entry.startsWith(`${COOKIE}=`));
}

/**
 * Opening splash: the brand logo drawn by a Lottie animation over a brushed
 * metal backdrop, then a fade to the page.
 *
 * As on the original site this plays at most once a day — the WordPress
 * template omitted the loader entirely once a `loaded` cookie was present, so
 * the cookie is set here for the same 24 hours.
 */
export default function Loader() {
  const container = useRef<HTMLDivElement>(null);
  // Rendered only after mount so the server HTML never contains the overlay:
  // without JavaScript there would be nothing to remove it again.
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (hasSeenLoader()) {
      document.body.classList.add("is-load");
      return;
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !container.current) return;

    let animation: { destroy: () => void } | undefined;
    let fadeTimer = 0;
    let removeTimer = 0;
    let cancelled = false;

    const finish = () => {
      document.cookie = `${COOKIE}=1; max-age=86400; path=/`;
      setFading(true);
      removeTimer = window.setTimeout(() => {
        setShow(false);
        document.body.classList.add("is-load");
      }, 400);
    };

    void import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !container.current) return;
      const item = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "/assets/loading.json",
        // The frames reference their images relative to the site root; without
        // this they would be resolved against the JSON's own directory.
        assetsPath: "/assets/img/common/"
      });
      animation = item;
      item.addEventListener("complete", () => {
        fadeTimer = window.setTimeout(finish, 1000);
      });
      // If the animation data ever fails to load, do not trap the visitor.
      item.addEventListener("data_failed", finish);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      animation?.destroy();
    };
  }, [show]);

  if (!show) return null;

  return <div id="js-loader" className={fading ? "is-fading" : undefined} ref={container} />;
}
