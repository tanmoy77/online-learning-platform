import React from "react";

const VideoPlayer = ({ videoSrc, title }) => {
  return (
    <div>
      <iframe
        width="100%"
        className="aspect-video"
        src={videoSrc}
        title={title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
