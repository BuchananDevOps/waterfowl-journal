import Link from 'next/link'
import Image from 'next/image'
import { clsx } from 'clsx/lite'
import { urlFor } from '@/lib/sanity.image'
import type { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
  size?: 'default' | 'large'
}

export default function PostCard({ post, size = 'default' }: PostCardProps) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  if (size === 'large') {
    return (
      <Link href={`/blog/${post.slug.current}`} className="group block">
        <article className="relative overflow-hidden rounded-xl bg-mist-950/2.5">
          {post.mainImage && (
            <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-sm ring-1 ring-black/5">
              <Image
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-mist-950/75 via-mist-950/20 to-transparent" />
            </div>
          )}
          <div
            className={clsx(
              'p-6 sm:p-10',
              post.mainImage && 'absolute bottom-0 left-0 right-0 text-white',
            )}
          >
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {post.categories.map((cat) => (
                  <span
                    key={cat._id}
                    className="text-xs/6 font-semibold uppercase tracking-wider bg-white/15 text-white px-2.5 py-0.5 rounded-full"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}
            <h2 className="font-display text-2xl/9 sm:text-3xl/10 tracking-tight text-balance group-hover:opacity-80 transition-opacity">
              {post.title}
            </h2>
            {post.excerpt && (
              <p
                className={clsx(
                  'text-sm/7 mt-2 line-clamp-2',
                  post.mainImage ? 'text-white/70' : 'text-mist-700',
                )}
              >
                {post.excerpt}
              </p>
            )}
            {publishedDate && (
              <p
                className={clsx(
                  'text-xs/6 mt-3',
                  post.mainImage ? 'text-white/50' : 'text-mist-500',
                )}
              >
                {post.author?.name && <span>{post.author.name} &middot; </span>}
                {publishedDate}
              </p>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <article className="bg-mist-950/2.5 rounded-xl p-2 hover:bg-mist-950/5 transition-colors">
        {post.mainImage && (
          <div className="relative h-44 overflow-hidden rounded-sm ring-1 ring-black/5">
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
            <p className="text-xs/6 font-semibold text-mist-700">
              {post.categories[0].title}
            </p>
          )}
          <h3 className="font-display text-base/8 text-mist-950 mt-1 line-clamp-2 group-hover:text-mist-600 transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm/7 text-mist-700 mt-1 line-clamp-2">{post.excerpt}</p>
          )}
          {publishedDate && (
            <p className="text-xs/6 text-mist-500 mt-2">
              {post.author?.name && <span>{post.author.name} &middot; </span>}
              {publishedDate}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}
