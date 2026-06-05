"use client"

import { useState } from "react"
import { Calculator as CalculatorIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleOperation = (op: string) => {
    setPrevValue(parseFloat(display))
    setOperation(op)
    setNewNumber(true)
  }

  const handleEquals = () => {
    if (prevValue !== null && operation) {
      const current = parseFloat(display)
      let result = 0
      switch (operation) {
        case "+": result = prevValue + current; break
        case "-": result = prevValue - current; break
        case "*": result = prevValue * current; break
        case "/": result = current !== 0 ? prevValue / current : 0; break
        case "%": result = prevValue * (current / 100); break
      }
      setDisplay(result.toString())
      setPrevValue(null)
      setOperation(null)
      setNewNumber(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPrevValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".")
      setNewNumber(false)
    }
  }

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ]

  const handleButtonClick = (btn: string) => {
    if (btn >= "0" && btn <= "9") {
      handleNumber(btn)
    } else {
      switch (btn) {
        case "C": handleClear(); break
        case "±": setDisplay((parseFloat(display) * -1).toString()); break
        case "%": handleOperation("%"); break
        case "÷": handleOperation("/"); break
        case "×": handleOperation("*"); break
        case "-": handleOperation("-"); break
        case "+": handleOperation("+"); break
        case ".": handleDecimal(); break
        case "=": handleEquals(); break
      }
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 flex items-center text-sm">
          <CalculatorIcon className="mr-2 h-4 w-4 text-cyan-500" />
          Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Display */}
        <div className="bg-slate-800/50 rounded-md p-3 mb-3 border border-slate-700/30">
          <div className="text-right text-2xl font-mono text-cyan-400 truncate">{display}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {buttons.flat().map((btn, idx) => (
            <Button
              key={idx}
              variant="outline"
              onClick={() => handleButtonClick(btn)}
              className={`h-10 text-sm font-medium ${
                btn === "0" ? "col-span-2" : ""
              } ${
                ["÷", "×", "-", "+", "="].includes(btn)
                  ? "bg-cyan-600 border-cyan-600 text-white hover:bg-cyan-700"
                  : ["C", "±", "%"].includes(btn)
                  ? "bg-slate-700 border-slate-700 text-slate-200 hover:bg-slate-600"
                  : "bg-slate-800/50 border-slate-700/50 text-slate-200 hover:bg-slate-700"
              }`}
            >
              {btn}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
