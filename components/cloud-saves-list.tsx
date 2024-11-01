'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ApiService } from '@/services/api-service'
import { useAuth } from '@/contexts/auth-context'
import { formatDistanceToNow } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

type CloudSave = {
  id: string
  timestamp: Date
  name?: string
  saveData: string
  userId: string
}

type FirebaseResponse = {
  id: string
  timestamp: Timestamp | Date
  name?: string
  saveData: string
  userId: string
}

export function CloudSavesList() {
  const { user } = useAuth()
  const [saves, setSaves] = useState<CloudSave[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadSaves = async () => {
    if (!user) return
    try {
      setIsLoading(true)
      const cloudSaves = await ApiService.listSaves(user.id)
      const transformedSaves = cloudSaves.map((save: any): CloudSave => {
        const data = save as FirebaseResponse
        return {
          id: data.id,
          timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp),
          name: data.name,
          saveData: data.saveData,
          userId: data.userId
        }
      })
      setSaves(transformedSaves)
    } catch (error) {
      console.error('Failed to load saves:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadSaves()
  }, [user])

  const handleDelete = async (saveId: string) => {
    if (!user) return
    try {
      await ApiService.deleteSave(saveId, user.id)
      await loadSaves()
    } catch (error) {
      console.error('Failed to delete save:', error)
    }
  }

  if (isLoading) {
    return <div>Loading saves...</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Your Cloud Saves</h3>
      {saves.length === 0 ? (
        <Card className="p-4">
          <p>No cloud saves found.</p>
        </Card>
      ) : (
        saves.map((save) => (
          <Card key={save.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{save.name || 'Unnamed Save'}</p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(save.timestamp, { addSuffix: true })}
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(save.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
