import React, { useState } from "react";
import vidthumbnail from "../images/senator.jpg";

function VideoPlay() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full mx-auto mt-[3rem]">
      {!isPlaying ? (
        <div
          style={{ height: "23rem", flexShrink: 0 }}
          className="relative w-full"
        >
          {/* Thumbnail Image */}
          <img
            src={vidthumbnail}
            alt="Thumbnail"
            className="w-full object-cover mt-[.5rem]"
          />
        </div>
      ) : (
        <div
          className="w-full h-auto bg-black"
          style={{ height: "29 rem", flexShrink: 0 }}
        >
          {/* Actual Video Component Placeholder */}
          {/*  div for video component */}
          <div className="flex justify-center items-center h-64 text-white">
            Video Placeholder
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlay;
