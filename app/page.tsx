import Link from 'next/link'
import { client } from '@/lib/sanity.client'
import { featuredPostQuery, postsByTopicQuery, allPostsQuery } from '@/lib/queries'
import type { Post, TopicWithPosts } from '@/lib/types'
import PostCard from '@/components/PostCard'
import { Container } from '@/components/Container'

export const revalidate = 60

export default async function Home() {
  const [featured, topics, recentPosts]: [Post, TopicWithPosts[], Post[]] = await Promise.all([
    client.fetch(featuredPostQuery).catch(() => null),
    client.fetch(postsByTopicQuery).catch(() => []),
    client.fetch(allPostsQuery).catch(() => []),
  ])

  const topicsWithPosts = topics.filter((t) => t.posts?.length > 0)
  const hasContent = featured || topicsWithPosts.length > 0 || recentPosts.length > 0

  return (
    <div>
      {/* Hero — on-background, HeroSimpleCentered pattern */}
      <section className="py-16 sm:py-24">
        <Container className="flex flex-col items-center gap-6">
          <p className="text-sm/7 font-semibold text-mist-700">Your Field Guide to Waterfowl Hunting</p>
          <h1 className="font-display text-5xl/12 tracking-tight text-balance text-mist-950 text-center max-w-4xl sm:text-[4.5rem]/18">
            Waterfowl Journal
          </h1>
          <p className="text-lg/8 text-mist-700 max-w-xl text-center text-pretty">
            Field reports, gear breakdowns, habitat tips, and everything in between — written for hunters by hunters.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-mist-950 text-white hover:bg-mist-800 text-sm/7 font-medium px-4 py-2 transition-colors"
            >
              Browse All Articles
            </Link>
            <Link
              href="#topics"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-mist-950/10 text-mist-950 hover:bg-mist-950/15 text-sm/7 font-medium px-4 py-2 transition-colors"
            >
              Explore Topics
            </Link>
          </div>
        </Container>
      </section>

      {!hasContent && (
        <section className="py-16">
          <Container className="flex flex-col items-center gap-4 text-center">
            <p className="text-4xl">📝</p>
            <h2 className="font-display text-2xl/9 text-mist-950">No posts yet</h2>
            <p className="text-base/7 text-mist-700">
              Head to the{' '}
              <Link href="/studio" className="font-semibold text-mist-950 underline underline-offset-4">
                Sanity Studio
              </Link>{' '}
              to create your first post.
            </p>
          </Container>
        </section>
      )}

      {/* Featured Post */}
      {featured && (
        <section className="py-10">
          <Container className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-sm/7 font-semibold text-mist-700">Featured</p>
            </div>
            <PostCard post={featured} size="large" />
          </Container>
        </section>
      )}

      {/* Posts by Topic */}
      {topicsWithPosts.length > 0 && (
        <section id="topics" className="py-16">
          <Container className="flex flex-col gap-10 sm:gap-16">
            <div className="flex flex-col gap-2 max-w-2xl">
              <p className="text-sm/7 font-semibold text-mist-700">Browse by Topic</p>
            </div>
            <div className="flex flex-col gap-16">
              {topicsWithPosts.map((topic) => (
                <div key={topic._id}>
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <h2 className="font-display text-2xl/9 tracking-tight text-mist-950">{topic.title}</h2>
                      {topic.description && (
                        <p className="text-sm/7 text-mist-700 mt-1">{topic.description}</p>
                      )}
                    </div>
                    <Link
                      href={`/topics/${topic.slug.current}`}
                      className="text-sm/7 font-medium text-mist-950 hover:text-mist-600 transition-colors whitespace-nowrap"
                    >
                      View all &rarr;
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {topic.posts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Recent Posts fallback when no topics set */}
      {topicsWithPosts.length === 0 && recentPosts.length > 0 && (
        <section className="py-16">
          <Container className="flex flex-col gap-10 sm:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-sm/7 font-semibold text-mist-700">Recent Articles</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Topic navigation strip */}
      {topicsWithPosts.length > 0 && (
        <section className="border-t border-mist-950/10 bg-mist-950/2.5 py-10 mt-8">
          <Container>
            <p className="text-xs/6 font-semibold text-mist-600 mb-5 text-center uppercase tracking-widest">
              All Topics
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {topics.map((topic) => (
                <Link
                  key={topic._id}
                  href={`/topics/${topic.slug.current}`}
                  className="inline-flex items-center rounded-full bg-mist-950/5 px-4 py-1.5 text-sm/7 font-medium text-mist-950 hover:bg-mist-950/10 transition-colors"
                >
                  {topic.title}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
