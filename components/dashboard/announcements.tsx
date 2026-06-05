"use client"

import { useState } from "react"
import { Megaphone, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Announcement {
  id: string
  title: string
  content: string
  date: Date
}

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: "1", title: "System Maintenance", content: "Scheduled maintenance this weekend", date: new Date() },
    { id: "2", title: "Team Meeting", content: "Weekly sync at 10 AM Monday", date: new Date() },
  ])
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" })
  const [showModal, setShowModal] = useState(false)

  const addAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      setAnnouncements([
        { id: Date.now().toString(), title: newAnnouncement.title, content: newAnnouncement.content, date: new Date() },
        ...announcements
      ])
      setNewAnnouncement({ title: "", content: "" })
      setShowModal(false)
    }
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-sm">
            <Megaphone className="mr-2 h-4 w-4 text-cyan-500" />
            Announcements
          </CardTitle>
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-slate-100">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100">Add Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-3">
                <Input
                  placeholder="Title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="bg-slate-800/50 border-slate-700/50"
                />
                <Textarea
                  placeholder="Content"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  className="bg-slate-800/50 border-slate-700/50 min-h-[80px]"
                />
                <div className="flex gap-2 pt-2">
                  <Button onClick={addAnnouncement} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setShowModal(false)} className="border-slate-700">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-2">
          <div className="space-y-2">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-slate-800/40 rounded-md px-3 py-2 border border-slate-700/30 relative group">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-cyan-400">{announcement.title}</div>
                    <div className="text-xs text-slate-400 mt-1">{announcement.content}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {announcement.date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteAnnouncement(announcement.id)}
                    className="h-6 w-6 p-0 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
