'use client'

import Link from 'next/link'
import { useState } from 'react'
import { clsx } from 'clsx/lite'
import type { Category } from '@/lib/types'

function NavLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-between gap-2 font-medium text-mist-950 hover:text-mist-600 transition-colors',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function NavbarClient({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 bg-mist-100">
      <nav>
        <div className="mx-auto flex h-[5.25rem] max-w-2xl items-center gap-4 px-6 md:max-w-3xl lg:max-w-7xl lg:px-10">
          {/* Logo + desktop links */}
          <div className="flex flex-1 items-center gap-10">
            <Link
              href="/"
              className="font-display text-xl text-mist-950 tracking-tight inline-flex items-center gap-2 shrink-0"
            >
              <span className="text-2xl">🦆</span>
              Waterfowl Journal
            </Link>
            <div className="flex gap-8 max-lg:hidden">
              <NavLink href="/" className="text-sm/7">Home</NavLink>
              <NavLink href="/blog" className="text-sm/7">All Posts</NavLink>
              {categories.slice(0, 5).map((cat) => (
                <NavLink key={cat._id} href={`/topics/${cat.slug.current}`} className="text-sm/7">
                  {cat.title}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/studio"
              className="hidden sm:inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-mist-950 text-white hover:bg-mist-800 text-sm/7 font-medium px-4 py-1 transition-colors"
            >
              Studio
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex rounded-full p-1.5 text-mist-950 hover:bg-mist-950/10 lg:hidden transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {open && (
          <div className="fixed inset-0 z-50 bg-mist-100 px-6 py-6 lg:hidden">
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex rounded-full p-1.5 text-mist-950 hover:bg-mist-950/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-6">
              <NavLink href="/" className="text-3xl/10" onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink href="/blog" className="text-3xl/10" onClick={() => setOpen(false)}>All Posts</NavLink>
              {categories.slice(0, 5).map((cat) => (
                <NavLink
                  key={cat._id}
                  href={`/topics/${cat.slug.current}`}
                  className="text-3xl/10"
                  onClick={() => setOpen(false)}
                >
                  {cat.title}
                </NavLink>
              ))}
              <Link
                href="/studio"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-mist-950 text-white hover:bg-mist-800 text-sm/7 font-medium px-4 py-2"
              >
                Studio
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
