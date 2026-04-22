export interface Author {
  name: string;
  image?: SanityImage;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface SanityImage {
  asset: { _ref: string };
  alt?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
  author?: Author;
  categories?: Category[];
  body?: import("@portabletext/types").PortableTextBlock[];
}

export interface TopicWithPosts extends Category {
  posts: Post[];
}
