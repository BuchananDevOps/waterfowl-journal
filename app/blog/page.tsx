import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity.client'
import { allPostsQuery, allCategoriesQuery } from '@/lib/queries'
import type { Post, Category } from '@/lib/types'
import PostCard from '@/components/PostCard'
import { Container } from '@/components/Container'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all waterfowl hunting articles, guides, and field reports.',
}

export default async function BlogPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    client.fetch(allPostsQuery).catch(() => []),
    client.fetch(allCategoriesQuery).catch(() => []),
  ])

  return (
    <section className="py-16">
      <Container className="flex flex-col gap-10 sm:gap-16">
        {/* Header */}
        <div className="flex max-w-2xl flex-col gap-2">
          <p className="text-sm/7 font-semibold text-mist-700">Articles</p>
          <h1 className="font-display text-[2rem]/10 tracking-tight text-mist-950 sm:text-5xl/14">
            All Articles
          </h1>
          <p className="text-base/7 text-mist-700 mt-2">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
          </p>
        </div>

        {/* Category filter pills */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-mist-950 text-white text-sm/7 font-medium px-4 py-1.5"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/topics/${cat.slug.current}`}
                className="inline-flex items-center rounded-full bg-mist-950/5 text-mist-950 hover:bg-mist-950/10 text-sm/7 font-medium px-4 py-1.5 transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-4xl">📝</p>
            <h2 className="font-display text-xl/8 text-mist-950">No articles yet</h2>
            <p className="text-base/7 text-mist-700">
              Head to{' '}
              <Link href="/studio" className="font-semibold text-mist-950 underline underline-offset-4">
                Sanity Studio
              </Link>{' '}
              to publish your first post.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
