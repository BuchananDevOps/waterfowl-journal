import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="pt-16 mt-auto">
      <div className="bg-mist-950/5 py-16 text-mist-950">
        <div className="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10 flex flex-col gap-16">
          <div className="flex flex-col sm:flex-row justify-between gap-10">
            <div className="flex flex-col gap-3 max-w-xs">
              <Link href="/" className="font-display text-xl text-mist-950 inline-flex items-center gap-2">
                <span>🦆</span>
                Waterfowl Journal
              </Link>
              <p className="text-sm/7 text-mist-600">
                Your field guide to duck hunting, goose hunting, gear, conservation, and the waterfowl lifestyle.
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-12 gap-y-8 text-sm/7 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-mist-950">Topics</h3>
                <ul role="list" className="mt-2 flex flex-col gap-2">
                  <li className="text-mist-700 hover:text-mist-950 transition-colors">
                    <Link href="/topics/duck-hunting">Duck Hunting</Link>
                  </li>
                  <li className="text-mist-700 hover:text-mist-950 transition-colors">
                    <Link href="/topics/goose-hunting">Goose Hunting</Link>
                  </li>
                  <li className="text-mist-700 hover:text-mist-950 transition-colors">
                    <Link href="/topics/gear">Gear & Equipment</Link>
                  </li>
                  <li className="text-mist-700 hover:text-mist-950 transition-colors">
                    <Link href="/topics/conservation">Conservation</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-mist-950">More</h3>
                <ul role="list" className="mt-2 flex flex-col gap-2">
                  <li className="text-mist-700 hover:text-mist-950 transition-colors">
                    <Link href="/blog">All Articles</Link>
                  </li>
                  <li className="text-mist-700 hover:text-mist-950 transition-colors">
                    <Link href="/studio">CMS Studio</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="text-sm/7 text-mist-600">
            &copy; {new Date().getFullYear()} Waterfowl Journal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
