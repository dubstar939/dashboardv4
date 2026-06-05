"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const US_TIMEZONES = [
  { name: "Eastern", zone: "America/New_York", abbr: "EST/EDT" },
  { name: "Central", zone: "America/Chicago", abbr: "CST/CDT" },
  { name: "Mountain", zone: "America/Denver", abbr: "MST/MDT" },
  { name: "Pacific", zone: "America/Los_Angeles", abbr: "PST/PDT" },
  { name: "Alaska", zone: "America/Anchorage", abbr: "AKST/AKDT" },
]

export function TimezoneClocks() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getTimeForZone = (zone: string) => {
    return currentTime.toLocaleTimeString("en-US", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 flex items-center text-sm">
          <Clock className="mr-2 h-4 w-4 text-cyan-500" />
          US Time Zones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {US_TIMEZONES.map((tz) => (
          <div key={tz.zone} className="flex items-center justify-between bg-slate-800/40 rounded-md px-3 py-2 border border-slate-700/30">
            <div>
              <div className="text-xs text-slate-400">{tz.name}</div>
              <div className="text-xs text-slate-500">{tz.abbr}</div>
            </div>
            <div className="text-sm font-mono text-cyan-400">{getTimeForZone(tz.zone)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
