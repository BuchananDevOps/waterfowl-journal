import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { featuredPostQuery, postsByTopicQuery, allPostsQuery } from "@/lib/queries";
import type { Post, TopicWithPosts } from "@/lib/types";
import PostCard from "@/components/PostCard";

export const revalidate = 60;

export default async function Home() {
  const [featured, topics, recentPosts]: [Post, TopicWithPosts[], Post[]] = await Promise.all([
    client.fetch(featuredPostQuery).catch(() => null),
    client.fetch(postsByTopicQuery).catch(() => []),
    client.fetch(allPostsQuery).catch(() => []),
  ]);

  const topicsWithPosts = topics.filter((t) => t.posts?.length > 0);
  const hasContent = featured || topicsWithPosts.length > 0 || recentPosts.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-5xl mb-4">🦆</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Waterfowl Journal
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-8">
            Field reports, gear breakdowns, habitat tips, and everything in between — written for hunters by hunters.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Browse All Articles
            </Link>
            <Link
              href="#topics"
              className="border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Explore Topics
            </Link>
          </div>
        </div>
      </section>

      {!hasContent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-4xl mb-4">📝</p>
          <h2 className="text-2xl font-bold text-primary mb-2">No posts yet</h2>
          <p className="text-muted mb-6">
            Head to the{" "}
            <Link href="/studio" className="text-accent underline">
              Sanity Studio
            </Link>{" "}
            to create your first post.
          </p>
        </section>
      )}

      {/* Featured Post */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-accent" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              Featured
            </h2>
          </div>
          <PostCard post={featured} size="large" />
        </section>
      )}

      {/* Posts by Topic */}
      {topicsWithPosts.length > 0 && (
        <section id="topics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-0.5 bg-accent" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              Browse by Topic
            </h2>
          </div>
          <div className="space-y-16">
            {topicsWithPosts.map((topic) => (
              <div key={topic._id}>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{topic.title}</h3>
                    {topic.description && (
                      <p className="text-sm text-muted mt-1">{topic.description}</p>
                    )}
                  </div>
                  <Link
                    href={`/topics/${topic.slug.current}`}
                    className="text-sm font-medium text-accent hover:text-primary transition-colors whitespace-nowrap"
                  >
                    View all &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topic.posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts fallback when no topics set */}
      {topicsWithPosts.length === 0 && recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-0.5 bg-accent" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              Recent Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Topic navigation strip */}
      {topicsWithPosts.length > 0 && (
        <section className="border-t border-border bg-surface py-10 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-5 text-center">
              All Topics
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {topics.map((topic) => (
                <Link
                  key={topic._id}
                  href={`/topics/${topic.slug.current}`}
                  className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  {topic.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
