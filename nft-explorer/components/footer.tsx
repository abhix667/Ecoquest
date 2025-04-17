import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-violet-500/20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center">
              <div className="bg-violet-600 h-8 w-8 rounded-md flex items-center justify-center mr-2">
                <span className="font-bold text-white">QR</span>
              </div>
              <span className="font-bold text-xl text-white">QuestRewards</span>
            </Link>
            <p className="mt-4 text-sm text-violet-200">
              Complete tasks, earn NFT rewards, and build your digital collection on our play-to-earn platform.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Platform</h3>
            <ul className="space-y-2 text-sm text-violet-200">
              <li>
                <Link href="/tasks" className="hover:text-white">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-white">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-white">
                  NFT Marketplace
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Resources</h3>
            <ul className="space-y-2 text-sm text-violet-200">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="hover:text-white">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Legal</h3>
            <ul className="space-y-2 text-sm text-violet-200">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-violet-500/20 pt-8 text-center text-sm text-violet-200">
          <p>© {new Date().getFullYear()} QuestRewards. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
