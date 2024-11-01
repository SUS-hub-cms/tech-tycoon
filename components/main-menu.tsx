'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react'
import GameUi from './game'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from 'lucide-react'
import { Volume2, VolumeX } from 'lucide-react'
import MusicPlayer from './audio/music-player'
import Slider from "react-slider"
import { useMusic } from '@/contexts/music-context'

export default function MainMenu() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [gameStarted, setGameStarted] = useState(false)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { volume, isMuted, setVolume, setIsMuted } = useMusic()
  const backgroundControls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    backgroundControls.start({
      backgroundPosition: `${mousePosition.x * 20}px ${mousePosition.y * 20}px`,
      transition: { type: 'spring', stiffness: 50, damping: 30 }
    })
  }, [mousePosition, backgroundControls])

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const handleNewGame = () => {
    setGameStarted(true)
  }

  const handleLoadGame = () => {
    // TODO: Implement load game functionality
    console.log('Load game clicked')
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  if (gameStarted) {
    return <GameUi onQuit={() => setGameStarted(false)} />
  }

  return (
    <div className="relative h-screen w-full bg-gray-900 text-white overflow-hidden">
      <MusicPlayer />
      <motion.div
        className="absolute inset-0"
        animate={backgroundControls}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.3), rgba(31, 41, 55, 0) 25%),
            radial-gradient(circle at 80% 80%, rgba(45, 212, 191, 0.3), rgba(31, 41, 55, 0) 25%),
            radial-gradient(circle at 50% 50%, rgba(31, 41, 55, 1), rgba(31, 41, 55, 0.7) 100%)
          `,
          backgroundSize: '120% 120%'
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Logo */}
        <div className="mt-16 mb-8 text-left">
          <Image
            src="/Hardware tycoon logo.png"
            alt="Hardware Tycoon Logo"
            width={300}
            height={100}
            className="ml-12 mt-12"
          />
        </div>

        {/* Main Buttons */}
        <div className="flex flex-col items-left space-y-4 mb-auto ml-12">
          <Button 
            className="w-64 h-16 text-2xl font-bold rounded-full shadow-lg overflow-hidden relative group text-white"
            onClick={handleNewGame}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 ease-out group-hover:scale-110"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"></span>
            <span className="relative z-10">New Game</span>
          </Button>
          <Button 
            className="w-64 h-16 text-2xl font-bold rounded-full shadow-lg overflow-hidden relative group text-white"
            onClick={handleLoadGame}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 ease-out group-hover:scale-110"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"></span>
            <span className="relative z-10">Load game</span>
          </Button>
        </div>

        {/* Options Button */}
        <div className="mb-8 ml-8">
          <Dialog open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-xl bg-gray-800 hover:bg-gray-700:text-white rounded-full transition-all duration-300 text-white"
              >
                <Settings className="mr-2 h-6 w-6" />
                Options
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <DialogHeader>
                <DialogTitle>Options</DialogTitle>
              </DialogHeader>
              
              {/* Theme Section */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="font-semibold mb-4">Theme</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Dark Mode</span>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={toggleDarkMode}
                      className="data-[state=checked]:bg-blue-600"
                    >
                      <span className="sr-only">Toggle dark mode</span>
                      {isDarkMode ? (
                        <Moon className="h-4 w-4 text-gray-100" />
                      ) : (
                        <Sun className="h-4 w-4 text-yellow-400" />
                      )}
                    </Switch>
                  </div>
                </div>

                {/* Sound Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Sound</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Music</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMuted(!isMuted)}
                        className="h-8 w-8"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Volume</span>
                        <span>{volume}%</span>
                      </div>
                      <Slider
                        className="horizontal-slider"
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={setVolume}
                        disabled={isMuted}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
