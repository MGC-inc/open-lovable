"use client";

import { useRef, useState } from "react";

/**
 * Company video on the top page. A still frame covers the player until it is
 * clicked, and comes back when playback stops — the same treatment the original
 * page gave it, so the controls stay out of the way of the artwork.
 */
export default function AboutVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = useState(true);

  return (
    <>
      <video
        ref={video}
        className="p-home_about__video"
        width="100%"
        controls
        muted
        playsInline
        poster="/assets/img/home/frame.jpg"
        onPlay={() => setShowPoster(false)}
        onPause={() => setShowPoster(true)}
        onEnded={() => setShowPoster(true)}
      >
        <source src="/assets/img/home/movie.mp4" type="video/mp4" />
      </video>
      {showPoster && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          className="video-poster"
          src="/assets/img/home/frame.jpg"
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "100%", cursor: "pointer" }}
          onClick={() => void video.current?.play()}
        />
      )}
    </>
  );
}
