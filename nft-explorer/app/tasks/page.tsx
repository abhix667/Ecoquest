"use client"

import { useState } from "react"
import { useWallet } from "@/components/wallet-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskCard } from "@/components/task-card"
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt"
import { mockTasks } from "@/lib/mock-data"
import { Search, Filter } from "lucide-react"

export default function TasksPage() {
  const { connected } = useWallet()
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || task.difficulty.toLowerCase() === difficultyFilter
    const matchesCategory = categoryFilter === "all" || task.category.toLowerCase() === categoryFilter

    return matchesSearch && matchesDifficulty && matchesCategory
  })

  if (!connected) {
    return <ConnectWalletPrompt />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Available Tasks</h1>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">
            Browse and complete tasks to earn NFT rewards. Filter by difficulty or category to find the perfect
            challenge.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-violet-500/30 rounded-xl p-6 mb-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300" />
              <Input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 bg-slate-700/50 border-violet-500/30 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="bg-slate-700/50 border-violet-500/30 text-white">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-violet-500/30">
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-slate-700/50 border-violet-500/30 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-violet-500/30">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="text-center py-16 bg-slate-800/30 rounded-lg border border-violet-500/20">
              <Filter className="h-12 w-12 mx-auto mb-4 text-violet-400" />
              <h3 className="text-xl font-medium mb-2">No tasks match your filters</h3>
              <p className="text-violet-200 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                variant="outline"
                className="border-violet-500/30 text-violet-200"
                onClick={() => {
                  setSearchTerm("")
                  setDifficultyFilter("all")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
