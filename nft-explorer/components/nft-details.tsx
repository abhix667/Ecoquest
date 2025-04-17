"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, Check } from "lucide-react"

interface NFTDetailsProps {
  nft: any
  onClose: () => void
}

export function NFTDetails({ nft, onClose }: NFTDetailsProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[900px] bg-slate-800 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl">{nft.name}</DialogTitle>
          <DialogDescription className="text-slate-400">From collection: {nft.collection}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-auto object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-slate-300">{nft.description}</p>
            </div>

            <Separator className="bg-slate-700" />

            <div>
              <h3 className="text-lg font-medium mb-3">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Creator</span>
                  <div className="flex items-center">
                    <span className="text-slate-300">{nft.creator}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-1 text-slate-400 hover:text-white"
                      onClick={() => copyToClipboard(nft.creator)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Owner</span>
                  <span className="text-slate-300">{nft.owner}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Token ID</span>
                  <span className="text-slate-300">{nft.tokenId}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Contract Address</span>
                  <div className="flex items-center">
                    <span className="text-slate-300">{nft.contractAddress}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1 text-slate-400 hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Current Price</h3>
                  <p className="text-2xl font-bold">{nft.price}</p>
                </div>
                <Badge className="bg-green-600 hover:bg-green-700">For Sale</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">Buy Now</Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Make Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
