import { createClient } from "next-sanity";
import { sanityConfig } from "@/sanity/config";

export const client = createClient({
  ...sanityConfig,
  useCdn: true,
});

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
