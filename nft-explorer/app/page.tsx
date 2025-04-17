import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { TaskPreview } from "@/components/task-preview"
import { HowItWorks } from "@/components/how-it-works"
import { RecentRewards } from "@/components/recent-rewards"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 text-white">
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Tasks</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">
            Complete these tasks to earn exclusive NFT rewards. Each task has different difficulty levels and
            corresponding rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaskPreview
            title="Daily Login Streak"
            description="Login for 7 consecutive days to earn a special badge NFT"
            difficulty="Easy"
            reward="Badge NFT"
            image="/placeholder.svg?height=200&width=350"
            href="/tasks/daily-login"
          />
          <TaskPreview
            title="Community Challenge"
            description="Participate in our Discord community event and submit proof of participation"
            difficulty="Medium"
            reward="Community Spirit NFT"
            image="/placeholder.svg?height=200&width=350"
            href="/tasks/community"
          />
          <TaskPreview
            title="Creative Contest"
            description="Submit your original artwork based on this month's theme"
            difficulty="Hard"
            reward="Rare Artist NFT"
            image="/placeholder.svg?height=200&width=350"
            href="/tasks/creative"
          />
        </div>

        <div className="text-center mt-10">
          <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-xl">
            <Link href="/tasks">View All Tasks</Link>
          </Button>
        </div>
      </section>

      <HowItWorks />
      <RecentRewards />

      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto bg-violet-900/30 p-8 rounded-2xl border border-violet-500/30 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-lg text-violet-200 mb-8">
            Connect your wallet, complete tasks, and start building your NFT collection today!
          </p>
          <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-xl">
            <Link href="/dashboard">Launch Dashboard</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
