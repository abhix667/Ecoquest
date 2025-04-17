"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { connected, address, connectWallet, disconnectWallet } = useWallet()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tasks", href: "/tasks" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Leaderboard", href: "/leaderboard" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-violet-500/20 bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="bg-violet-600 h-8 w-8 rounded-md flex items-center justify-center mr-2">
              <span className="font-bold text-white">QR</span>
            </div>
            <span className="font-bold text-xl text-white">QuestRewards</span>
          </Link>

          <nav className="ml-10 hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  pathname === link.href ? "text-white font-medium" : "text-violet-200 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {connected ? (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block bg-slate-800 px-3 py-1 rounded-md border border-violet-500/20">
                <p className="text-xs text-violet-300">Wallet</p>
                <p className="text-sm font-medium">
                  {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : ""}
                </p>
              </div>
              <Button
                variant="outline"
                className="border-violet-500/30 text-violet-200 hover:bg-violet-900/30"
                onClick={disconnectWallet}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === link.href
                    ? "bg-violet-900/50 text-white"
                    : "text-violet-200 hover:bg-violet-900/30 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
