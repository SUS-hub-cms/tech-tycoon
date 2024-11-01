'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type SandboxContextType = {
  isSandboxMode: boolean
  toggleSandboxMode: () => void
  unlimitedMoney: boolean
  setUnlimitedMoney: (value: boolean) => void
  unlimitedRP: boolean
  setUnlimitedRP: (value: boolean) => void
  unlockAll: boolean
  setUnlockAll: (value: boolean) => void
  noCosts: boolean
  setNoCosts: (value: boolean) => void
}

const SandboxContext = createContext<SandboxContextType | undefined>(undefined)

export function SandboxProvider({ children }: { children: ReactNode }) {
  const [isSandboxMode, setIsSandboxMode] = useState(false)
  const [unlimitedMoney, setUnlimitedMoney] = useState(false)
  const [unlimitedRP, setUnlimitedRP] = useState(false)
  const [unlockAll, setUnlockAll] = useState(false)
  const [noCosts, setNoCosts] = useState(false)
  const [isShiftPressed, setIsShiftPressed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsShiftPressed(true)
      } else if (isShiftPressed && event.key.toLowerCase() === 'h') {
        const handleNextKey = (nextEvent: KeyboardEvent) => {
          if (nextEvent.key.toLowerCase() === 't') {
            setIsSandboxMode(prev => !prev)
          }
          window.removeEventListener('keydown', handleNextKey)
        }
        window.addEventListener('keydown', handleNextKey, { once: true })
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsShiftPressed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isShiftPressed])

  const toggleSandboxMode = () => setIsSandboxMode(prev => !prev)

  return (
    <SandboxContext.Provider 
      value={{ 
        isSandboxMode, 
        toggleSandboxMode,
        unlimitedMoney,
        setUnlimitedMoney,
        unlimitedRP,
        setUnlimitedRP,
        unlockAll,
        setUnlockAll,
        noCosts,
        setNoCosts
      }}
    >
      {children}
    </SandboxContext.Provider>
  )
}

export function useSandbox() {
  const context = useContext(SandboxContext)
  if (context === undefined) {
    throw new Error('useSandbox must be used within a SandboxProvider')
  }
  return context
}
