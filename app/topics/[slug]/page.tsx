import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { categoryBySlugQuery, allCategoriesQuery } from '@/lib/queries'
import type { TopicWithPosts, Category } from '@/lib/types'
import PostCard from '@/components/PostCard'
import { Container } from '@/components/Container'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cats: Category[] = await client.fetch(allCategoriesQuery).catch(() => [])
  return cats.map((c) => ({ slug: c.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic: TopicWithPosts = await client.fetch(categoryBySlugQuery, { slug }).catch(() => null)
  if (!topic) return {}
  return {
    title: topic.title,
    description: topic.description ?? `Browse all ${topic.title} articles on Waterfowl Journal.`,
  }
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params
  const topic: TopicWithPosts = await client.fetch(categoryBySlugQuery, { slug }).catch(() => null)

  if (!topic) notFound()

  return (
    <section className="py-16">
      <Container className="flex flex-col gap-10 sm:gap-16">
        {/* Header */}
        <div className="flex max-w-2xl flex-col gap-4">
          <nav className="flex items-center gap-2 text-sm/7 text-mist-600">
            <Link href="/" className="hover:text-mist-950 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-mist-950 transition-colors">Articles</Link>
            <span>/</span>
            <span className="text-mist-950 font-medium">{topic.title}</span>
          </nav>
          <div className="flex flex-col gap-2">
            <p className="text-sm/7 font-semibold text-mist-700">Topic</p>
            <h1 className="font-display text-[2rem]/10 tracking-tight text-mist-950 sm:text-5xl/14">
              {topic.title}
            </h1>
          </div>
          {topic.description && (
            <p className="text-base/7 text-mist-700 text-pretty">{topic.description}</p>
          )}
          <p className="text-sm/7 text-mist-600">
            {topic.posts.length} {topic.posts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {/* Posts grid */}
        {topic.posts.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-4xl">🦆</p>
            <p className="text-base/7 text-mist-700">No articles in this topic yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {topic.posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
