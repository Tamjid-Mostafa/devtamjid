import React from "react";
import Iframe from "react-iframe";

interface IframePreviewProps {
  url: string;
  height?: string | undefined;
}

const IframePreview: React.FC<IframePreviewProps> = ({ url, height }) => {
  if (!url) {
    return <p>Missing Embed URL</p>;
  }

  return (
    <Iframe
      url={url}
      width="100%"
      height={height || "350"}
      styles={{
        ...(height === undefined && { aspectRatio: "16 / 9" }),
      }}
      display="block"
      position="relative"
      frameBorder={0}
      allowFullScreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />
  );
};

export default IframePreview;
