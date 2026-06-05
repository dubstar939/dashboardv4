"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelect?: (date: Date | null) => void
}

export function Calendar({ selectedDate: initialSelectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialSelectedDate ?? new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    return { daysInMonth, firstDayOfMonth }
  }

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth)

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(newDate)
    onDateSelect?.(newDate)
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-sm">
            <CalendarIcon className="mr-2 h-4 w-4 text-cyan-500" />
            Calendar
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={prevMonth} className="h-6 w-6 p-0 text-slate-400 hover:text-slate-100">
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <span className="text-xs font-medium text-slate-300 min-w-[100px] text-center">
              {currentMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
            <Button variant="ghost" size="sm" onClick={nextMonth} className="h-6 w-6 p-0 text-slate-400 hover:text-slate-100">
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-xs text-slate-500 text-center py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1
            const isToday = new Date().getDate() === day &&
              new Date().getMonth() === currentMonth.getMonth() &&
              new Date().getFullYear() === currentMonth.getFullYear()
            const isSelected = selectedDate?.getDate() === day &&
              selectedDate?.getMonth() === currentMonth.getMonth() &&
              selectedDate?.getFullYear() === currentMonth.getFullYear()

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`aspect-square rounded-md text-xs flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-cyan-600 text-white"
                    : isToday
                    ? "bg-slate-700 text-cyan-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
