import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface TaskPreviewProps {
  title: string
  description: string
  difficulty: string
  reward: string
  image: string
  href: string
}

export function TaskPreview({ title, description, difficulty, reward, image, href }: TaskPreviewProps) {
  return (
    <Card className="bg-slate-800/30 border-violet-500/20 overflow-hidden hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <Badge
          className={
            difficulty === "Easy"
              ? "absolute top-2 right-2 bg-green-600"
              : difficulty === "Medium"
                ? "absolute top-2 right-2 bg-yellow-600"
                : "absolute top-2 right-2 bg-red-600"
          }
        >
          {difficulty}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-violet-200 mb-4">{description}</p>
        <div className="bg-violet-900/30 rounded-lg p-3 flex items-center justify-between">
          <span className="text-sm text-violet-200">Reward:</span>
          <span className="font-medium">{reward}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={href}
          className="w-full inline-flex items-center justify-center text-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          View Task
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
