"use client"

import { useState, useRef } from "react"
import { Phone, Plus, Trash2, Mic, Save, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CallLog {
  id: string
  callerName: string
  phone: string
  notes: string
  timestamp: Date
  callType?: string
}

const CALL_TYPES = ["Incoming", "Outgoing", "Missed", "Voicemail"]

export function CallLog() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([
    { id: "1", callerName: "John Smith", phone: "555-0123", notes: "Discussed project timeline", timestamp: new Date() },
    { id: "2", callerName: "Sarah Johnson", phone: "555-0456", notes: "Follow up on proposal", timestamp: new Date(Date.now() - 3600000) },
  ])
  const [newCall, setNewCall] = useState({ callerName: "", phone: "", notes: "" })
  const [selectedCallType, setSelectedCallType] = useState("Incoming")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const addCallLog = () => {
    if (newCall.callerName.trim()) {
      setCallLogs([{ id: Date.now().toString(), ...newCall, timestamp: new Date(), callType: selectedCallType }, ...callLogs])
      setNewCall({ callerName: "", phone: "", notes: "" })
      setIsAddDialogOpen(false)
    }
  }

  const clearAllCalls = () => {
    setCallLogs([])
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-sm">
            <Phone className="mr-2 h-4 w-4 text-cyan-500" />
            Call Log
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsAddDialogOpen(true)}>
                Add Call Log
              </DropdownMenuItem>
              <DropdownMenuItem onClick={clearAllCalls}>
                Clear All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-2">
          <div className="space-y-2">
            {callLogs.map((call) => (
              <div key={call.id} className="bg-slate-800/40 rounded-md px-3 py-2 border border-slate-700/30">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-cyan-500" />
                    <span className="text-sm font-medium text-slate-200">{call.callerName}</span>
                    {call.callType && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">{call.callType}</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">
                    {call.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{call.phone}</div>
                {call.notes && <div className="text-xs text-slate-500 mt-1">{call.notes}</div>}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Add Call Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-slate-100">Add Call Log</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Caller Name"
                value={newCall.callerName}
                onChange={(e) => setNewCall({ ...newCall, callerName: e.target.value })}
                className="bg-slate-800/50 border-slate-700/50"
              />
              <Input
                placeholder="Phone"
                value={newCall.phone}
                onChange={(e) => setNewCall({ ...newCall, phone: e.target.value })}
                className="bg-slate-800/50 border-slate-700/50"
              />
            </div>
            <Textarea
              placeholder="Notes"
              value={newCall.notes}
              onChange={(e) => setNewCall({ ...newCall, notes: e.target.value })}
              className="bg-slate-800/50 border-slate-700/50 min-h-[80px]"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-slate-800/50 border-slate-700/50">
                  {selectedCallType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {CALL_TYPES.map((type) => (
                  <DropdownMenuItem key={type} onClick={() => setSelectedCallType(type)}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex gap-2 pt-2">
              <Button onClick={addCallLog} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-700">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
