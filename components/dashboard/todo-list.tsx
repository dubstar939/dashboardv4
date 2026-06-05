"use client"

import { useState } from "react"
import { ListTodo, Plus, Check, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  reminder?: string
}

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: "1", text: "Review project documentation", completed: false, createdAt: new Date() },
    { id: "2", text: "Schedule team meeting", completed: true, createdAt: new Date() },
    { id: "3", text: "Update client presentation", completed: false, createdAt: new Date() },
  ])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false, createdAt: new Date() }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 flex items-center text-sm">
          <ListTodo className="mr-2 h-4 w-4 text-cyan-500" />
          Todo List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-3">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a task..."
            className="bg-slate-800/50 border-slate-700/50 text-sm"
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <Button size="sm" onClick={addTodo} className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[200px] pr-2">
          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 bg-slate-800/40 rounded-md px-3 py-2 border border-slate-700/30">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="border-slate-600 data-[state=checked]:bg-cyan-600"
                />
                <span className={`flex-1 text-sm ${todo.completed ? "line-through text-slate-500" : "text-slate-200"}`}>
                  {todo.text}
                </span>
                <Button variant="ghost" size="sm" onClick={() => deleteTodo(todo.id)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-400">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
