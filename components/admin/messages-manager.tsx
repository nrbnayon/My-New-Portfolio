"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Trash2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Message = {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      })

      if (response.ok) {
        setMessages(messages.map((msg) => (msg._id === id ? { ...msg, read: true } : msg)))
      }
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Message deleted successfully",
        })
        fetchMessages()
      } else {
        throw new Error("Failed to delete message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return <div>Loading messages...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">Total: {messages.length}</Badge>
          <Badge variant="destructive">Unread: {messages.filter((msg) => !msg.read).length}</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message._id} className={`${!message.read ? "border-primary" : ""}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{message.subject}</CardTitle>
                    {!message.read && (
                      <Badge variant="destructive" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>From: {message.name}</span>
                    <span>{message.email}</span>
                    <span>{formatDate(message.createdAt)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => !message.read && markAsRead(message._id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{message.subject}</DialogTitle>
                        <DialogDescription>
                          From: {message.name} ({message.email}) • {formatDate(message.createdAt)}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <p className="whitespace-pre-wrap">{message.message}</p>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button asChild>
                            <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
                              <Mail className="h-4 w-4 mr-2" />
                              Reply
                            </a>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline" onClick={() => deleteMessage(message._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No messages yet. Messages from your contact form will appear here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
