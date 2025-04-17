import { Wallet, CheckSquare, Award, Layers } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-violet-200 max-w-2xl mx-auto">
          Our platform makes it easy to earn NFT rewards through simple tasks and challenges. Follow these steps to get
          started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-6 text-center">
          <div className="bg-violet-600/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="h-8 w-8 text-violet-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
          <p className="text-violet-200">
            Connect your crypto wallet to our platform to store your earned NFT rewards securely.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-6 text-center">
          <div className="bg-violet-600/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckSquare className="h-8 w-8 text-violet-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Complete Tasks</h3>
          <p className="text-violet-200">
            Browse available tasks and complete them according to the requirements provided.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-6 text-center">
          <div className="bg-violet-600/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-violet-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
          <p className="text-violet-200">
            Submit proof of task completion and receive unique NFT rewards directly to your wallet.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-6 text-center">
          <div className="bg-violet-600/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers className="h-8 w-8 text-violet-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Build Collection</h3>
          <p className="text-violet-200">
            Showcase your NFT collection and unlock special benefits as you complete more tasks.
          </p>
        </div>
      </div>
    </section>
  )
}
