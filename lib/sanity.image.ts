import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "@/sanity/config";

const builder = createImageUrlBuilder(sanityConfig);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
