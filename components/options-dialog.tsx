'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMusic } from "@/contexts/music-context"
import { useSave } from "@/contexts/save-context"
import Link from 'next/link'

type OptionsDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function OptionsDialog({ isOpen, onClose }: OptionsDialogProps) {
  const { volume, isMuted, setVolume, setIsMuted } = useMusic()
  const { 
    isAutoSaveEnabled, 
    setAutoSaveEnabled,
    autoSaveInterval,
    setAutoSaveInterval,
    isCloudSaveEnabled,
    setCloudSaveEnabled
  } = useSave()

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Options</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Audio</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Music Volume</Label>
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-[60%]"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Mute Music</Label>
                <Switch
                  checked={isMuted}
                  onCheckedChange={setIsMuted}
                />
              </div>
            </div>
          </div>

          {/* Save Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Save Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Auto-Save</Label>
                <Switch
                  checked={isAutoSaveEnabled}
                  onCheckedChange={setAutoSaveEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Auto-Save Interval (minutes)</Label>
                <Select
                  value={autoSaveInterval.toString()}
                  onValueChange={(value) => setAutoSaveInterval(Number(value))}
                  disabled={!isAutoSaveEnabled}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Cloud Save</Label>
                <Switch
                  checked={isCloudSaveEnabled}
                  onCheckedChange={setCloudSaveEnabled}
                />
              </div>

              <div className="flex justify-end">
                <Link href="/account" target="_blank">
                  <Button variant="outline">
                    Manage Cloud Saves
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
