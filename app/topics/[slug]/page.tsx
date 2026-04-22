import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { categoryBySlugQuery, allCategoriesQuery } from "@/lib/queries";
import type { TopicWithPosts, Category } from "@/lib/types";
import PostCard from "@/components/PostCard";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cats: Category[] = await client.fetch(allCategoriesQuery).catch(() => []);
  return cats.map((c) => ({ slug: c.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic: TopicWithPosts = await client.fetch(categoryBySlugQuery, { slug }).catch(() => null);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description ?? `Browse all ${topic.title} articles on Waterfowl Journal.`,
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic: TopicWithPosts = await client.fetch(categoryBySlugQuery, { slug }).catch(() => null);

  if (!topic) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{topic.title}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-0.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Topic</span>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">{topic.title}</h1>
        {topic.description && (
          <p className="text-muted max-w-2xl">{topic.description}</p>
        )}
        <p className="text-sm text-muted mt-2">
          {topic.posts.length} {topic.posts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {topic.posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🦆</p>
          <p className="text-muted">No articles in this topic yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic.posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
