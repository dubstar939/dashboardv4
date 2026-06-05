"use client"

import { useState, useCallback } from "react"
import { Radio, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const RADIO_STATIONS = [
  { name: "Jazz FM", genre: "Jazz", url: "https://stream.jazzfm.ro/jazz.mp3" },
  { name: "Classical 24", genre: "Classical", url: "https://classicalstream.publicradio.org/classical24.aac" },
  { name: "Smooth Jazz", genre: "Smooth Jazz", url: "https://stream.jazzfm.ro/smoothjazz.mp3" },
  { name: "Lo-Fi Beats", genre: "Lo-Fi", url: "https://streams.ilovemusic.de/iloveradio17.mp3" },
  { name: "Chill Hop", genre: "Chill", url: "https://streams.ilovemusic.de/iloveradio17.mp3" },
]

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [currentStation, setCurrentStation] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useState<HTMLAudioElement | null>(null)[0]

  const togglePlay = useCallback(() => {
    if (!audioRef) {
      const audio = new Audio(RADIO_STATIONS[currentStation].url)
      audio.volume = volume[0] / 100
      // Store in a ref for actual use
    }
    
    // Note: Actual audio control would need proper ref management
    setIsPlaying(!isPlaying)
  }, [isPlaying, currentStation, volume, audioRef])

  const changeStation = (direction: "next" | "prev") => {
    const newIndex = direction === "next" 
      ? (currentStation + 1) % RADIO_STATIONS.length
      : (currentStation - 1 + RADIO_STATIONS.length) % RADIO_STATIONS.length
    setCurrentStation(newIndex)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
    if (newVolume[0] > 0) setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 flex items-center text-sm">
          <Radio className="mr-2 h-4 w-4 text-cyan-500" />
          Radio Player
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Station Info */}
        <div className="text-center py-2 bg-slate-800/40 rounded-md border border-slate-700/30">
          <div className="text-sm font-semibold text-cyan-400">{RADIO_STATIONS[currentStation].name}</div>
          <div className="text-xs text-slate-500">{RADIO_STATIONS[currentStation].genre}</div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => changeStation("prev")} className="text-slate-400 hover:text-slate-100">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={togglePlay} 
            className="bg-cyan-600 hover:bg-cyan-700 w-10 h-10 p-0 rounded-full"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => changeStation("next")} className="text-slate-400 hover:text-slate-100">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 px-2">
          <Button variant="ghost" size="sm" onClick={toggleMute} className="h-6 w-6 p-0 text-slate-400">
            {isMuted || volume[0] === 0 ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
          </Button>
          <Slider
            value={isMuted ? [0] : volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  )
}
