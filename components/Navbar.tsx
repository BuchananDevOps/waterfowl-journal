import { client } from '@/lib/sanity.client'
import { allCategoriesQuery } from '@/lib/queries'
import type { Category } from '@/lib/types'
import { NavbarClient } from './NavbarClient'

export default async function Navbar() {
  const categories: Category[] = await client.fetch(allCategoriesQuery).catch(() => [])
  return <NavbarClient categories={categories} />
}
