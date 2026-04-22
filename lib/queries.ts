import { groq } from "next-sanity";

export const postFields = groq`
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->{name, image},
  "categories": categories[]->{_id, title, slug}
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const featuredPostQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0] {
    ${postFields}
  }
`;

export const postsByTopicQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...4] {
      ${postFields}
    }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      ${postFields}
    }
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id, title, slug, description
  }
`;
