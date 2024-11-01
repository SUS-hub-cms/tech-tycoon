'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useSandbox } from '@/contexts/sandbox-context'

type SandboxPopupProps = {
  money: number
  setMoney: (value: number) => void
  researchPoints: number
  setResearchPoints: (value: number) => void
}

export default function SandboxPopup({ 
  money, 
  setMoney, 
  researchPoints, 
  setResearchPoints 
}: SandboxPopupProps) {
  const { 
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
  } = useSandbox()

  const [tempMoney, setTempMoney] = useState(money.toString())
  const [tempRP, setTempRP] = useState(researchPoints.toString())

  const handleMoneySubmit = () => {
    const value = Number(tempMoney)
    if (!isNaN(value)) {
      setMoney(value)
    }
  }

  const handleRPSubmit = () => {
    const value = Number(tempRP)
    if (!isNaN(value)) {
      setResearchPoints(value)
    }
  }

  return (
    <Dialog open={isSandboxMode} onOpenChange={toggleSandboxMode}>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle>Developer Sandbox Mode</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Money Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Set Money</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={tempMoney}
                  onChange={(e) => setTempMoney(e.target.value)}
                  className="w-32"
                  disabled={unlimitedMoney}
                />
                <Button onClick={handleMoneySubmit} disabled={unlimitedMoney}>
                  Set
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Unlimited Money</Label>
              <Switch
                checked={unlimitedMoney}
                onCheckedChange={setUnlimitedMoney}
              />
            </div>
          </div>

          {/* Research Points Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Set Research Points</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={tempRP}
                  onChange={(e) => setTempRP(e.target.value)}
                  className="w-32"
                  disabled={unlimitedRP}
                />
                <Button onClick={handleRPSubmit} disabled={unlimitedRP}>
                  Set
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Unlimited Research Points</Label>
              <Switch
                checked={unlimitedRP}
                onCheckedChange={setUnlimitedRP}
              />
            </div>
          </div>

          {/* Other Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Unlock All Functions</Label>
              <Switch
                checked={unlockAll}
                onCheckedChange={setUnlockAll}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>No Costs</Label>
              <Switch
                checked={noCosts}
                onCheckedChange={setNoCosts}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={toggleSandboxMode}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
