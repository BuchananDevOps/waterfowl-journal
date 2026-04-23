import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity.client'
import { postBySlugQuery, allPostsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity.image'
import type { Post } from '@/lib/types'
import { Container } from '@/components/Container'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts: Post[] = await client.fetch(allPostsQuery).catch(() => [])
  return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post: Post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.mainImage
      ? { images: [{ url: urlFor(post.mainImage).width(1200).height(630).url() }] }
      : undefined,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post: Post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)

  if (!post) notFound()

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <article className="py-16">
      <Container className="flex flex-col gap-10 sm:gap-16">
        {/* Header block */}
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm/7 text-mist-600">
            <Link href="/" className="hover:text-mist-950 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-mist-950 transition-colors">Articles</Link>
            {post.categories && post.categories.length > 0 && (
              <>
                <span>/</span>
                <Link
                  href={`/topics/${post.categories[0].slug.current}`}
                  className="hover:text-mist-950 transition-colors"
                >
                  {post.categories[0].title}
                </Link>
              </>
            )}
          </nav>

          {/* Category tags */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/topics/${cat.slug.current}`}
                  className="inline-flex items-center rounded-full bg-mist-950/10 text-mist-950 hover:bg-mist-950/15 text-xs/6 font-semibold px-3 py-0.5 transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="font-display text-[2rem]/10 tracking-tight text-mist-950 text-balance sm:text-5xl/14">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg/8 text-mist-700 text-pretty">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-3 text-sm/7 text-mist-600">
            {post.author?.name && (
              <span className="font-medium text-mist-950">{post.author.name}</span>
            )}
            {post.author?.name && publishedDate && <span>&middot;</span>}
            {publishedDate && <span>{publishedDate}</span>}
          </div>
        </div>

        {/* Hero image */}
        {post.mainImage && (
          <div className="relative w-full h-64 sm:h-112 rounded-xl overflow-hidden ring-1 ring-black/5">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Body — Document element pattern from Oatmeal */}
        {post.body && (
          <div
            className={[
              'mx-auto w-full max-w-2xl',
              'space-y-4 text-sm/7 text-mist-700',
              '[&_a]:font-semibold [&_a]:text-mist-950 [&_a]:underline [&_a]:underline-offset-4',
              '[&_h2]:font-display [&_h2]:text-base/8 [&_h2]:font-medium [&_h2]:text-mist-950 [&_h2]:not-first:mt-8',
              '[&_h3]:font-display [&_h3]:text-sm/7 [&_h3]:font-semibold [&_h3]:text-mist-950',
              '[&_strong]:font-semibold [&_strong]:text-mist-950',
              '[&_ul]:list-[square] [&_ul]:pl-6 [&_ul]:marker:text-mist-400',
              '[&_ol]:list-decimal [&_ol]:pl-6',
              '[&_li]:pl-2',
              '[&_blockquote]:border-l-2 [&_blockquote]:border-mist-200 [&_blockquote]:pl-6 [&_blockquote]:italic',
            ].join(' ')}
          >
            <PortableText value={post.body} />
          </div>
        )}

        {/* Back link */}
        <div className="mx-auto w-full max-w-2xl border-t border-mist-950/10 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm/7 font-medium text-mist-950 hover:text-mist-600 transition-colors"
          >
            &larr; Back to all articles
          </Link>
        </div>
      </Container>
    </article>
  )
}
