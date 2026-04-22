import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity.client";
import { postBySlugQuery, allPostsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.image";
import type { Post } from "@/lib/types";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts: Post[] = await client.fetch(allPostsQuery).catch(() => []);
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: Post = await client.fetch(postBySlugQuery, { slug }).catch(() => null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.mainImage
      ? { images: [{ url: urlFor(post.mainImage).width(1200).height(630).url() }] }
      : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post: Post = await client.fetch(postBySlugQuery, { slug }).catch(() => null);

  if (!post) notFound();

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Articles</Link>
        {post.categories && post.categories.length > 0 && (
          <>
            <span>/</span>
            <Link
              href={`/topics/${post.categories[0].slug.current}`}
              className="hover:text-primary transition-colors"
            >
              {post.categories[0].title}
            </Link>
          </>
        )}
      </nav>

      {/* Category tags */}
      {post.categories && post.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/topics/${cat.slug.current}`}
              className="text-xs font-semibold uppercase tracking-wider bg-accent text-white px-3 py-1 rounded-full hover:bg-primary transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-snug mb-4">
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="text-lg text-muted leading-relaxed mb-6">{post.excerpt}</p>
      )}

      <div className="flex items-center gap-3 mb-8 text-sm text-muted">
        {post.author?.name && <span className="font-medium text-foreground">{post.author.name}</span>}
        {post.author?.name && publishedDate && <span>&middot;</span>}
        {publishedDate && <span>{publishedDate}</span>}
      </div>

      {post.mainImage && (
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-md">
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {post.body && (
        <div className="prose prose-stone prose-headings:text-primary prose-a:text-accent max-w-none">
          <PortableText value={post.body} />
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors"
        >
          &larr; Back to all articles
        </Link>
      </div>
    </article>
  );
}
