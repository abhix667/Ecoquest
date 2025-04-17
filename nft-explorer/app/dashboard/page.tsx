"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TaskCard } from "@/components/task-card"
import { NFTCard } from "@/components/nft-card"
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt"
import { mockTasks, mockNFTs } from "@/lib/mock-data"

export default function Dashboard() {
  const { connected, address } = useWallet()
  const [userLevel, setUserLevel] = useState(3)
  const [userXP, setUserXP] = useState(350)
  const [nextLevelXP, setNextLevelXP] = useState(500)
  const [availableTasks, setAvailableTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [userNFTs, setUserNFTs] = useState([])

  useEffect(() => {
    if (connected) {
      // In a real app, we would fetch this data from the backend
      setAvailableTasks(mockTasks.filter((task) => task.status === "available"))
      setCompletedTasks(mockTasks.filter((task) => task.status === "completed"))
      setUserNFTs(mockNFTs)
    }
  }, [connected])

  if (!connected) {
    return <ConnectWalletPrompt />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <Card className="bg-slate-800/50 border-violet-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription className="text-violet-200">Track your progress and rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-violet-600 flex items-center justify-center text-2xl font-bold">
                  {address ? address.substring(0, 2) : ""}
                </div>
                <div>
                  <p className="text-sm text-violet-200">Wallet</p>
                  <p className="font-medium truncate">
                    {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-violet-200">Level {userLevel}</span>
                  <span className="text-violet-200">
                    {userXP}/{nextLevelXP} XP
                  </span>
                </div>
                <Progress value={(userXP / nextLevelXP) * 100} className="h-2 bg-slate-700" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-2xl font-bold">{completedTasks.length}</p>
                  <p className="text-sm text-violet-200">Tasks Completed</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-2xl font-bold">{userNFTs.length}</p>
                  <p className="text-sm text-violet-200">NFTs Earned</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-violet-600 hover:bg-violet-700">View Profile</Button>
            </CardFooter>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border-violet-500/30">
                <TabsTrigger value="available">Available Tasks</TabsTrigger>
                <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-4 mt-4">
                {availableTasks.length > 0 ? (
                  availableTasks.map((task) => <TaskCard key={task.id} task={task} />)
                ) : (
                  <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-violet-500/20">
                    <p className="text-lg text-violet-200">No available tasks at the moment. Check back soon!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-4">
                {completedTasks.length > 0 ? (
                  completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
                ) : (
                  <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-violet-500/20">
                    <p className="text-lg text-violet-200">You haven't completed any tasks yet. Start earning!</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your NFT Collection</h2>
                <Badge className="bg-violet-600">Total: {userNFTs.length}</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userNFTs.length > 0 ? (
                  userNFTs.slice(0, 3).map((nft) => <NFTCard key={nft.id} nft={nft} />)
                ) : (
                  <div className="col-span-3 text-center py-12 bg-slate-800/30 rounded-lg border border-violet-500/20">
                    <p className="text-lg text-violet-200">Complete tasks to earn your first NFT!</p>
                  </div>
                )}
              </div>

              {userNFTs.length > 0 && (
                <div className="text-center">
                  <Button variant="outline" className="border-violet-500/30 text-violet-200">
                    View All NFTs
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
