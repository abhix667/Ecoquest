"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ConnectWalletProps {
  connected: boolean
  setConnected: (connected: boolean) => void
  address: string
  setAddress: (address: string) => void
}

export function ConnectWallet({ connected, setConnected, address, setAddress }: ConnectWalletProps) {
  const [isOpen, setIsOpen] = useState(false)

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAddress(accounts[0])
        setConnected(true)
        setIsOpen(false)
      } catch (error) {
        console.error("User denied account access")
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.")
    }
  }

  const disconnectWallet = () => {
    setConnected(false)
    setAddress("")
  }

  return (
    <div>
      {!connected ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-slate-800 text-white border-slate-700">
            <DialogHeader>
              <DialogTitle>Connect your wallet</DialogTitle>
              <DialogDescription className="text-slate-400">
                Connect your wallet to explore and collect NFTs
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                onClick={connectMetaMask}
                className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600"
              >
                <div className="flex items-center">
                  <img src="/placeholder.svg?height=32&width=32" alt="MetaMask" className="h-8 w-8 mr-3" />
                  <span>MetaMask</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600" disabled>
                <div className="flex items-center">
                  <img src="/placeholder.svg?height=32&width=32" alt="WalletConnect" className="h-8 w-8 mr-3" />
                  <span>WalletConnect</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600" disabled>
                <div className="flex items-center">
                  <img src="/placeholder.svg?height=32&width=32" alt="Coinbase Wallet" className="h-8 w-8 mr-3" />
                  <span>Coinbase Wallet</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="bg-slate-700 px-4 py-2 rounded-md flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
            <span className="text-sm">
              {address.substring(0, 6)}...{address.substring(address.length - 4)}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={disconnectWallet}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Disconnect
          </Button>
        </div>
      )}
    </div>
  )
}
