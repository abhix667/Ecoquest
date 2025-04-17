import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Trophy, ArrowRight, CheckCircle } from "lucide-react"

interface TaskCardProps {
  task: any
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="bg-slate-800/30 border-violet-500/20 hover:border-violet-500/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold">{task.title}</h3>
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
            <p className="text-violet-200 mb-4">{task.description}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-violet-300">
                <Clock className="h-4 w-4 mr-1" />
                {task.timeEstimate}
              </div>
              <div className="flex items-center text-sm text-violet-300">
                <Trophy className="h-4 w-4 mr-1" />
                {task.reward}
              </div>
              <Badge variant="outline" className="border-violet-500/30 text-violet-300">
                {task.category}
              </Badge>
            </div>
          </div>

          <div className="flex justify-end">
            {task.status === "completed" ? (
              <Button disabled className="bg-green-600 text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed
              </Button>
            ) : (
              <Button asChild className="bg-violet-600 hover:bg-violet-700 flex items-center gap-2">
                <Link href={`/tasks/${task.id}`}>
                  Start Task
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
