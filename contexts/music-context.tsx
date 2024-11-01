'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type MusicContextType = {
  volume: number
  isMuted: boolean
  setVolume: (volume: number) => void
  setIsMuted: (muted: boolean) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <MusicContext.Provider value={{ volume, isMuted, setVolume, setIsMuted }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}
