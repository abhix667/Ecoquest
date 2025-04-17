import { NFTCard } from "@/components/nft-card"
import { mockNFTs } from "@/lib/mock-data"

export function RecentRewards() {
  // Use only the first 4 NFTs for the showcase
  const showcaseNFTs = mockNFTs.slice(0, 4)

  return (
    <section className="container mx-auto px-4 py-16 bg-slate-900/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Recently Earned Rewards</h2>
        <p className="text-lg text-violet-200 max-w-2xl mx-auto">
          Check out these exclusive NFTs that users have earned by completing tasks on our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {showcaseNFTs.map((nft) => (
          <NFTCard key={nft.id} nft={nft} showcase />
        ))}
      </div>
    </section>
  )
}
