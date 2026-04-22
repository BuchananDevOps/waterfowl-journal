import type { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import { allPostsQuery, allCategoriesQuery } from "@/lib/queries";
import type { Post, Category } from "@/lib/types";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all waterfowl hunting articles, guides, and field reports.",
};

export default async function BlogPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    client.fetch(allPostsQuery).catch(() => []),
    client.fetch(allCategoriesQuery).catch(() => []),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2">All Articles</h1>
        <p className="text-muted">
          {posts.length} {posts.length === 1 ? "article" : "articles"} published
        </p>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-full bg-primary text-white text-sm font-medium"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/topics/${cat.slug.current}`}
              className="px-3 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📝</p>
          <h2 className="text-xl font-bold text-primary mb-2">No articles yet</h2>
          <p className="text-muted">
            Head to{" "}
            <Link href="/studio" className="text-accent underline">
              Sanity Studio
            </Link>{" "}
            to publish your first post.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
