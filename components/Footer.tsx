import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-2">
              <span>🦆</span>
              <span>Waterfowl Journal</span>
            </Link>
            <p className="text-sm max-w-xs text-white/60">
              Your field guide to duck hunting, goose hunting, gear, conservation, and the waterfowl lifestyle.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold mb-1">Topics</span>
              <Link href="/topics/duck-hunting" className="hover:text-white transition-colors">Duck Hunting</Link>
              <Link href="/topics/goose-hunting" className="hover:text-white transition-colors">Goose Hunting</Link>
              <Link href="/topics/gear" className="hover:text-white transition-colors">Gear & Equipment</Link>
              <Link href="/topics/conservation" className="hover:text-white transition-colors">Conservation</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold mb-1">More</span>
              <Link href="/blog" className="hover:text-white transition-colors">All Articles</Link>
              <Link href="/studio" className="hover:text-white transition-colors">CMS Studio</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-xs text-white/40 text-center">
          &copy; {new Date().getFullYear()} Waterfowl Journal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
