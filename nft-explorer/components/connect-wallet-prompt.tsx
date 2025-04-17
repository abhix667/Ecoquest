"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { Wallet } from "lucide-react"

export function ConnectWalletPrompt() {
  const { connectWallet } = useWallet()

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800/50 border border-violet-500/30 rounded-xl p-8 backdrop-blur-sm text-center">
        <Wallet className="h-16 w-16 mx-auto mb-6 text-violet-400" />
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-violet-200 mb-8">
          You need to connect your wallet to access this page and start earning NFT rewards.
        </p>
        <Button onClick={connectWallet} className="w-full bg-violet-600 hover:bg-violet-700 py-6 text-lg">
          Connect Wallet
        </Button>
      </div>
    </div>
  )
}
