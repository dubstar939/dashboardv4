"use client"

import { useState, useEffect } from "react"
import { Newspaper } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const NEWS_HEADLINES = [
  "Tech stocks surge as AI investments continue to drive market growth",
  "Climate summit reaches historic agreement on carbon reduction targets",
  "Federal Reserve signals potential rate adjustments in coming months",
  "New breakthrough in renewable energy storage announced by researchers",
  "Major infrastructure bill passes with bipartisan support",
  "Global health initiative launches new vaccination program",
  "Space exploration milestone: New Mars mission scheduled for next year",
]

export function NewsTicker() {
  const [newsIndex, setNewsIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % NEWS_HEADLINES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-800/40 border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="flex items-center">
          <div className="bg-cyan-500/20 px-3 py-2 border-r border-slate-700/50 flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 uppercase">Breaking</span>
          </div>
          <div className="flex-1 overflow-hidden px-4 py-2">
            <p className="text-sm text-slate-300 whitespace-nowrap animate-marquee">
              {NEWS_HEADLINES[newsIndex]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
