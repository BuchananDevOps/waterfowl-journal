import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { allCategoriesQuery } from "@/lib/queries";
import type { Category } from "@/lib/types";

export default async function Navbar() {
  const categories: Category[] = await client.fetch(allCategoriesQuery).catch(() => []);

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-2xl">🦆</span>
            <span>Waterfowl Journal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-accent-light transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-accent-light transition-colors">
              All Posts
            </Link>
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat._id}
                href={`/topics/${cat.slug.current}`}
                className="hover:text-accent-light transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </nav>

          <Link
            href="/studio"
            className="text-xs bg-accent hover:bg-accent-light px-3 py-1.5 rounded-full transition-colors font-medium"
          >
            Studio
          </Link>
        </div>
      </div>
    </header>
  );
}
