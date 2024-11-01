'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { ApiService } from '@/services/api-service'
import { useAuth } from './auth-context'
import { useToast } from '@/hooks/use-toast'
import { Timestamp } from 'firebase/firestore'

type CloudSave = {
  id: string
  timestamp: Date
  name?: string
  saveData: string
  userId: string
}

interface FirestoreData {
  timestamp: Timestamp
  name?: string
  saveData: string
  userId: string
}

interface FirebaseResponse extends FirestoreData {
  id: string
}

type SaveContextType = {
  isAutoSaveEnabled: boolean
  setAutoSaveEnabled: (enabled: boolean) => void
  autoSaveInterval: number
  setAutoSaveInterval: (minutes: number) => void
  lastSaveTime: Date | null
  setLastSaveTime: (time: Date | null) => void
  saveGame: (gameState: any) => Promise<void>
  loadGame: (saveData: string) => Promise<any>
  cloudSaves: CloudSave[]
  refreshCloudSaves: () => Promise<void>
  isCloudSaveEnabled: boolean
  setCloudSaveEnabled: (enabled: boolean) => void
  autoSave: (gameState: any) => Promise<void>
  lastAutoSave: Date | null
}

const SaveContext = createContext<SaveContextType | undefined>(undefined)

export function SaveProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isAutoSaveEnabled, setAutoSaveEnabled] = useState(false)
  const [autoSaveInterval, setAutoSaveInterval] = useState(5)
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null)
  const [cloudSaves, setCloudSaves] = useState<CloudSave[]>([])
  const [isCloudSaveEnabled, setCloudSaveEnabled] = useState(false)
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null)

  const saveGame = async (gameState: any) => {
    const saveData = JSON.stringify(gameState)
    
    try {
      // Local save
      const blob = new Blob([saveData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `hardware-tycoon-save-${new Date().toISOString()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      // Cloud save if enabled and authenticated
      if (isCloudSaveEnabled && user) {
        await ApiService.saveToCloud(saveData, user.id)
        await refreshCloudSaves()
        toast({
          title: "Game Saved",
          description: "Your game has been saved locally and to the cloud.",
        })
      } else {
        toast({
          title: "Game Saved",
          description: "Your game has been saved locally.",
        })
      }

      setLastSaveTime(new Date())
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save the game. Please try again.",
        variant: "destructive",
      })
    }
  }

  const loadGame = async (saveData: string) => {
    try {
      return JSON.parse(saveData)
    } catch (error) {
      throw new Error('Failed to parse save data')
    }
  }

  const refreshCloudSaves = async () => {
    if (user) {
      try {
        const saves = await ApiService.listSaves(user.id)
        const transformedSaves = saves.map((save: any): CloudSave => {
          const data = save as unknown as FirebaseResponse
          return {
            id: data.id,
            timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp),
            name: data.name,
            saveData: data.saveData,
            userId: data.userId
          }
        })
        setCloudSaves(transformedSaves)
      } catch (error) {
        console.error('Failed to fetch cloud saves:', error)
      }
    }
  }

  useEffect(() => {
    refreshCloudSaves()
  }, [user])

  const autoSave = useCallback(async (gameState: any) => {
    if (!isAutoSaveEnabled) return
    
    const now = new Date()
    if (lastAutoSave && (now.getTime() - lastAutoSave.getTime()) < (autoSaveInterval * 60 * 1000)) {
      return // Not enough time has passed since last auto-save
    }

    try {
      if (isCloudSaveEnabled && user) {
        await ApiService.saveToCloud(JSON.stringify(gameState), user.id, 'auto-save')
        await refreshCloudSaves()
      }
      setLastAutoSave(now)
      toast({
        title: "Auto-Save Complete",
        description: "Your game has been automatically saved.",
      })
    } catch (error) {
      console.error('Auto-save failed:', error)
    }
  }, [isAutoSaveEnabled, autoSaveInterval, lastAutoSave, isCloudSaveEnabled, user])

  return (
    <SaveContext.Provider 
      value={{
        isAutoSaveEnabled,
        setAutoSaveEnabled,
        autoSaveInterval,
        setAutoSaveInterval,
        lastSaveTime,
        setLastSaveTime,
        saveGame,
        loadGame,
        cloudSaves,
        refreshCloudSaves,
        isCloudSaveEnabled,
        setCloudSaveEnabled,
        autoSave,
        lastAutoSave
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}

export function useSave() {
  const context = useContext(SaveContext)
  if (context === undefined) {
    throw new Error('useSave must be used within a SaveProvider')
  }
  return context
}
