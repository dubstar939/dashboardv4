"use client"

import { useState } from "react"
import { Sun, Cloud, CloudRain, CloudSun } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer } from "lucide-react"

interface WeatherLocation {
  id: string
  city: string
  zipCode: string
  temp: number
  condition: string
  high: number
  low: number
}

const US_CITIES_WEATHER: WeatherLocation[] = [
  { id: "1", city: "New York", zipCode: "10001", temp: 72, condition: "sunny", high: 78, low: 65 },
  { id: "2", city: "Los Angeles", zipCode: "90001", temp: 85, condition: "sunny", high: 88, low: 70 },
  { id: "3", city: "Chicago", zipCode: "60601", temp: 68, condition: "cloudy", high: 72, low: 58 },
  { id: "4", city: "Houston", zipCode: "77001", temp: 92, condition: "partlyCloudy", high: 95, low: 78 },
  { id: "5", city: "Phoenix", zipCode: "85001", temp: 105, condition: "sunny", high: 110, low: 85 },
]

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "sunny": return <Sun className="h-6 w-6 text-amber-400" />
    case "cloudy": return <Cloud className="h-6 w-6 text-slate-400" />
    case "partlyCloudy": return <CloudSun className="h-6 w-6 text-amber-300" />
    case "rainy": return <CloudRain className="h-6 w-6 text-blue-400" />
    default: return <Sun className="h-6 w-6 text-amber-400" />
  }
}

export function WeatherWidget() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 flex items-center text-sm">
          <Thermometer className="mr-2 h-4 w-4 text-cyan-500" />
          US Cities Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {US_CITIES_WEATHER.map((city) => (
          <div key={city.id} className="flex items-center justify-between bg-slate-800/40 rounded-md px-3 py-2 border border-slate-700/30">
            <div className="flex items-center gap-2">
              {getWeatherIcon(city.condition)}
              <div>
                <div className="text-xs text-slate-400">{city.city}</div>
                <div className="text-xs text-slate-500">H: {city.high}° L: {city.low}°</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-slate-200">{city.temp}°</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
