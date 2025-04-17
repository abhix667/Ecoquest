import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface NFTCardProps {
  nft: any
  showcase?: boolean
}

export function NFTCard({ nft, showcase = false }: NFTCardProps) {
  return (
    <Card className="bg-slate-800/30 border-violet-500/20 overflow-hidden hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
      <CardContent className="p-0">
        <div className="relative">
          <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-64 object-cover" />
          <Badge className="absolute top-2 right-2 bg-violet-600">{nft.rarity}</Badge>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{nft.name}</h3>
          <p className="text-violet-200 text-sm mb-3 line-clamp-2">{nft.description}</p>

          {!showcase && (
            <div className="flex justify-between items-center">
              <div className="text-xs text-violet-300">Earned: {nft.earnedDate}</div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}

          {showcase && (
            <div className="bg-violet-900/30 rounded-lg p-2 text-center text-sm text-violet-200">
              Complete tasks to earn similar NFTs
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
