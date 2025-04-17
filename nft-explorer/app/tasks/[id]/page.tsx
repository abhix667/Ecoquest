"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt"
import { mockTasks } from "@/lib/mock-data"
import { Clock, Trophy, Upload, CheckCircle2, AlertCircle } from "lucide-react"

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { connected } = useWallet()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [proofText, setProofText] = useState("")
  const [proofFile, setProofFile] = useState<File | null>(null)

  // Find the task by ID
  const task = mockTasks.find((t) => t.id === params.id)

  if (!connected) {
    return <ConnectWalletPrompt />
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
          <h1 className="text-3xl font-bold mb-4">Task Not Found</h1>
          <p className="text-lg text-violet-200 mb-8">The task you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/tasks")}>Back to Tasks</Button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    // Simulate API call to submit task proof
    try {
      // In a real app, we would upload the proof and verify the task completion
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitted(true)
    } catch (err) {
      setError("Failed to submit task. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 text-violet-300 hover:text-white hover:bg-slate-800/50"
            onClick={() => router.push("/tasks")}
          >
            ← Back to Tasks
          </Button>

          <Card className="bg-slate-800/50 border-violet-500/30 backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{task.title}</CardTitle>
                  <CardDescription className="text-violet-200">{task.category} Task</CardDescription>
                </div>
                <Badge
                  className={
                    task.difficulty === "Easy"
                      ? "bg-green-600"
                      : task.difficulty === "Medium"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }
                >
                  {task.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-violet-200">{task.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4 flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-violet-400" />
                  <div>
                    <p className="text-sm text-violet-300">Time Estimate</p>
                    <p className="font-medium">{task.timeEstimate}</p>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 flex items-center space-x-3">
                  <Trophy className="h-5 w-5 text-violet-400" />
                  <div>
                    <p className="text-sm text-violet-300">Reward</p>
                    <p className="font-medium">{task.reward}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1 text-violet-200">
                  {task.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {submitted ? (
            <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-400" />
                <h2 className="text-2xl font-bold mb-2">Task Submitted Successfully!</h2>
                <p className="text-violet-200 mb-6">
                  Your submission is being reviewed. Once approved, the NFT reward will be sent to your wallet.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
                  <Button variant="outline" onClick={() => router.push("/tasks")}>
                    Find More Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 border-violet-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Submit Task Proof</CardTitle>
                <CardDescription className="text-violet-200">
                  Provide evidence that you've completed the task requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="proof" className="text-sm font-medium">
                      Describe how you completed the task
                    </label>
                    <Textarea
                      id="proof"
                      placeholder="Explain how you completed the task requirements..."
                      className="bg-slate-700/50 border-violet-500/30 min-h-[120px]"
                      value={proofText}
                      onChange={(e) => setProofText(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="file" className="text-sm font-medium">
                      Upload proof (optional)
                    </label>
                    <div className="border-2 border-dashed border-violet-500/30 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-violet-400" />
                      <p className="text-sm text-violet-200 mb-4">Drag and drop files here, or click to browse</p>
                      <Input id="file" type="file" className="hidden" onChange={handleFileChange} />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-violet-500/30"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        Browse Files
                      </Button>
                      {proofFile && <p className="mt-2 text-sm text-violet-300">Selected: {proofFile.name}</p>}
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-900/20 border border-red-500/30 text-red-200 p-3 rounded-md">{error}</div>
                  )}

                  <CardFooter className="px-0 pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-violet-600 hover:bg-violet-700"
                      disabled={submitting || !proofText}
                    >
                      {submitting ? "Submitting..." : "Submit Task"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
