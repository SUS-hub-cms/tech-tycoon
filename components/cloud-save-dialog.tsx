'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { ApiService } from "@/services/api-service"
import { useToast } from "@/hooks/use-toast"
import { Timestamp } from 'firebase/firestore'

interface SaveData {
  id: string;
  name: string;
  timestamp: Date;
  saveData: string;
  userId: string;
}

interface CloudSaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadSave: (saveData: string) => void;
}

export function CloudSaveDialog({
  isOpen,
  onClose,
  onLoadSave,
}: CloudSaveDialogProps) {
  const { user, login } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [cloudSaves, setCloudSaves] = useState<SaveData[]>([])

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await login(email, password)
      const saves = await ApiService.listSaves(user!.id)
      const transformedSaves = saves.map((save: any) => ({
        id: save.id,
        timestamp: save.timestamp instanceof Timestamp ? save.timestamp.toDate() : new Date(save.timestamp),
        name: save.name,
        saveData: save.saveData,
        userId: save.userId
      }))
      setCloudSaves(transformedSaves)
      toast({
        title: "Logged In",
        description: "Successfully logged in.",
      })
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Failed to log in. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadSave = async (saveId: string) => {
    if (!user) return
    try {
      setIsLoading(true)
      const saveData = await ApiService.loadSave(saveId, user.id)
      if (saveData) {
        onLoadSave(saveData.saveData)
        onClose()
        toast({
          title: "Success",
          description: "Save loaded successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load save from cloud.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cloud Saves</DialogTitle>
        </DialogHeader>

        {!user ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cloudSaves.map((save: any) => (
              <div
                key={save.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <span>{new Date(save.timestamp).toLocaleString()}</span>
                <Button onClick={() => handleLoadSave(save.id)}>Load</Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
