import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./config";

interface Source {
  asset?: {
    _ref: string;
  };
}

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: Source) => {
  if (!source || !source.asset) return null;
  const dimensions = source.asset?._ref.split("-")[2];

  const [width, height] = dimensions
    .split("x")
    .map((num) => parseInt(num, 10));

  const url = imageBuilder
    .image(source)
    .auto("format")
    .width(Math.min(width, 2000)) // Assuming 2000 is the max width
    .url();

  return {
    src: url,
    width: width,
    height: height,
  };
};
