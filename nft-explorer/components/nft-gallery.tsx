"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock NFT data for demonstration
const mockNFTs = [
  {
    id: "1",
    name: "Cosmic Voyager #42",
    description: "A journey through the digital cosmos, captured in vibrant colors and abstract forms.",
    image: "/placeholder.svg?height=400&width=400",
    collection: "Cosmic Voyagers",
    creator: "0x1234...5678",
    owner: "0x8765...4321",
    price: "0.5 ETH",
    tokenId: "42",
    contractAddress: "0xabc...def",
  },
  {
    id: "2",
    name: "Digital Dreamscape #17",
    description: "An ethereal landscape from the depths of digital imagination.",
    image: "/placeholder.svg?height=400&width=400",
    collection: "Digital Dreamscapes",
    creator: "0x2345...6789",
    owner: "0x9876...5432",
    price: "0.8 ETH",
    tokenId: "17",
    contractAddress: "0xbcd...efg",
  },
  {
    id: "3",
    name: "Pixel Punk #103",
    description: "A unique character from the Pixel Punks universe, with rare attributes.",
    image: "/placeholder.svg?height=400&width=400",
    collection: "Pixel Punks",
    creator: "0x3456...7890",
    owner: "0x0987...6543",
    price: "1.2 ETH",
    tokenId: "103",
    contractAddress: "0xcde...fgh",
  },
  {
    id: "4",
    name: "Abstract Emotion #7",
    description: "A visual representation of complex emotions through abstract digital art.",
    image: "/placeholder.svg?height=400&width=400",
    collection: "Abstract Emotions",
    creator: "0x4567...8901",
    owner: "0x1098...7654",
    price: "0.3 ETH",
    tokenId: "7",
    contractAddress: "0xdef...ghi",
  },
  {
    id: "5",
    name: "Crypto Creature #29",
    description: "A mythical creature born in the blockchain, with unique traits and abilities.",
    image: "/placeholder.svg?height=400&width=400",
    collection: "Crypto Creatures",
    creator: "0x5678...9012",
    owner: "0x2109...8765",
    price: "0.7 ETH",
    tokenId: "29",
    contractAddress: "0xefg...hij",
  },
  {
    id: "6",
    name: "Virtual Landscape #11",
    description: "A serene digital landscape inspired by both real and imagined worlds.",
    image: "/placeholder.svg?height=400&width=400",
    collection: "Virtual Landscapes",
    creator: "0x6789...0123",
    owner: "0x3210...9876",
    price: "0.4 ETH",
    tokenId: "11",
    contractAddress: "0xfgh...ijk",
  },
]

interface NFTGalleryProps {
  connected: boolean
  address: string
  setSelectedNFT: (nft: any) => void
  type: "explore" | "collection"
}

export function NFTGallery({ connected, address, setSelectedNFT, type }: NFTGalleryProps) {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API call to fetch NFTs
    const fetchNFTs = async () => {
      setLoading(true)

      // In a real app, you would fetch from an API or blockchain
      setTimeout(() => {
        if (type === "explore") {
          setNfts(mockNFTs)
        } else {
          // For collection, filter to show fewer NFTs as if they belong to the user
          setNfts(mockNFTs.slice(0, 2))
        }
        setLoading(false)
      }, 1500)
    }

    fetchNFTs()
  }, [type])

  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder="Search by name or collection..."
          className="pl-10 bg-slate-800 border-slate-700 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-slate-800 border-slate-700 overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="h-64 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredNFTs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <Card
              key={nft.id}
              className="bg-slate-800 border-slate-700 overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
              onClick={() => setSelectedNFT(nft)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-64 object-cover" />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {nft.price}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1 truncate">{nft.name}</h3>
                  <p className="text-slate-400 text-sm">{nft.collection}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">No NFTs found</h3>
          <p className="text-slate-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
