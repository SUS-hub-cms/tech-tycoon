'use client'

import { useEffect, useRef, useState } from 'react'
import { useMusic } from '@/contexts/music-context'

const AUDIO_TRACKS = {
  background: '/music/background-music.mp3',
  // Add more tracks here as needed
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { volume, isMuted } = useMusic()
  const [loadError, setLoadError] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Initial setup of volume and mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  // Add click listener to start audio
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error)
          setLoadError(true)
        })
        setHasInteracted(true)
      }
    }

    // Listen for any user interaction
    document.addEventListener('click', handleInteraction, { once: true })
    document.addEventListener('keydown', handleInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
    }
  }, [hasInteracted])

  // Handle audio loading
  useEffect(() => {
    const audio = new Audio(AUDIO_TRACKS.background)
    
    const handleCanPlayThrough = () => {
      setLoadError(false)
      console.log('Audio loaded successfully')
    }

    const handleError = (e: ErrorEvent) => {
      console.error('Audio loading error:', e.message)
      setLoadError(true)
      setHasInteracted(false)
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)
    audio.addEventListener('error', handleError as EventListener)

    // Set initial properties
    audio.volume = volume / 100
    audio.muted = isMuted
    audio.loop = true

    // Update the ref without directly assigning to current
    if (audioRef.current) {
      const currentAudio = audioRef.current
      currentAudio.src = audio.src
      currentAudio.volume = audio.volume
      currentAudio.muted = audio.muted
      currentAudio.loop = audio.loop
    }

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      audio.removeEventListener('error', handleError as EventListener)
      audio.pause()
      audio.src = ''
    }
  }, [volume, isMuted])

  if (loadError) {
    console.warn('Failed to load background music')
    return null
  }

  return (
    <audio
      ref={audioRef}
      src={AUDIO_TRACKS.background}
      loop
      preload="auto"
      onLoadedData={() => setLoadError(false)}
      onError={(e) => {
        const error = e.currentTarget.error
        console.error('Audio loading error:', error?.message || 'Unknown error')
        setLoadError(true)
      }}
    />
  )
}
