import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
  size?: "default" | "large";
}

export default function PostCard({ post, size = "default" }: PostCardProps) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  if (size === "large") {
    return (
      <Link href={`/blog/${post.slug.current}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl bg-surface shadow-md hover:shadow-xl transition-shadow">
          {post.mainImage && (
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <Image
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          )}
          <div className={`p-6 ${post.mainImage ? "absolute bottom-0 left-0 right-0 text-white" : ""}`}>
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {post.categories.map((cat) => (
                  <span
                    key={cat._id}
                    className="text-xs font-semibold uppercase tracking-wider bg-accent text-white px-2 py-0.5 rounded-full"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}
            <h2 className="text-2xl font-bold leading-snug mb-2 group-hover:text-accent-light transition-colors">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className={`text-sm leading-relaxed line-clamp-2 ${post.mainImage ? "text-white/80" : "text-muted"}`}>
                {post.excerpt}
              </p>
            )}
            {publishedDate && (
              <p className={`text-xs mt-3 ${post.mainImage ? "text-white/60" : "text-muted"}`}>
                {post.author?.name && <span>{post.author.name} &middot; </span>}
                {publishedDate}
              </p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <article className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border">
        {post.mainImage && (
          <div className="relative h-44 overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(600).height(340).url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-4">
          {post.categories && post.categories.length > 0 && (
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {post.categories[0].title}
            </span>
          )}
          <h3 className="font-bold text-base leading-snug mt-1 mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-xs text-muted line-clamp-2">{post.excerpt}</p>
          )}
          {publishedDate && (
            <p className="text-xs text-muted mt-2">{publishedDate}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
