'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { ScrollArea } from "@/components/researchPopup/ui/scroll-area"
import { Cpu, Monitor, HardDrive, CircuitBoard } from "lucide-react"
import { ResearchData, Research, ResearchCategory, type ResearchItem } from "@/components/data/researchData"

type ResearchPopupProps = {
  research: Research;
  onResearch: (category: ResearchCategory, itemName: string) => void;
  money: number;
  researchPoints: number; // Add this line
  researchData: ResearchData;
};

export function ResearchPopup({ research, onResearch, money, researchPoints, researchData, children }: ResearchPopupProps & { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<ResearchCategory>("CPU")

  const getCategoryIcon = (category: ResearchCategory) => {
    switch (category) {
      case "CPU": return <Cpu className="w-4 h-4" />;
      case "GPU": return <Monitor className="w-4 h-4" />;
      case "Disk": return <HardDrive className="w-4 h-4" />;
      case "RAM": return <CircuitBoard className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[875px]">
        <DialogHeader>
          <DialogTitle>Research</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ResearchCategory)} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {(Object.keys(researchData) as ResearchCategory[]).map((category) => (
              <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                {getCategoryIcon(category)}
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {(Object.entries(researchData) as [ResearchCategory, ResearchData[ResearchCategory]][]).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(items).map(([itemName, item]) => (
                    <ResearchItemComponent 
                      key={itemName} 
                      item={{ 
                        ...item, 
                        name: itemName, 
                        currentLevel: research[category][itemName as keyof Research[typeof category]].currentLevel 
                      }} 
                      category={category} 
                      research={research} 
                      onResearch={onResearch} 
                      money={money}
                      researchPoints={researchPoints} // Add this line
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

type ResearchItemComponentProps<T extends ResearchCategory> = { 
  item: ResearchData[T][keyof ResearchData[T]] & { 
    name: string;
    currentLevel: number;
    maxValue?: number | string;
    description: string;
    levels?: number;
    specs?: Array<{ level: number; value: string | number; cost: { researchPoints: number; money: number } }>;
  }; 
  category: T; 
  research: Research; 
  onResearch: ResearchPopupProps['onResearch']; 
  money: number;
  researchPoints: number; // Add this line
};

function ResearchItemComponent<T extends ResearchCategory>({ item, category, research, onResearch, money, researchPoints }: ResearchItemComponentProps<T>) {
  const getCurrentLevelValue = (item: ResearchItemComponentProps<T>['item']) => {
    if (item.levels === 1) return item.maxValue;
    return item.specs?.[item.currentLevel - 1]?.value || 'N/A';
  };

  const getNextLevelValue = (item: ResearchItemComponentProps<T>['item']) => {
    if (item.levels) {
      if (item.currentLevel >= item.levels) return item.maxValue;
      if (item.levels === 1) return item.maxValue;
    }
    return item.specs?.[item.currentLevel]?.value || 'N/A';
  };

  const getCurrentLevelCost = (item: ResearchItemComponentProps<T>['item']) => {
    return item.specs?.[item.currentLevel]?.cost || { researchPoints: 0, money: 0 };
  };

  const isMaxLevel = item.levels && item.currentLevel === item.levels;

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{item.name}</h3>
        <span className="text-sm text-muted-foreground">
          Level {item.currentLevel}/{item.levels || 'N/A'}
        </span>
      </div>
      <Progress value={(item.currentLevel / (item.levels || 1)) * 100} className="w-full" />
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>Current: Level {item.currentLevel} ({getCurrentLevelValue(item)})</span>
        <span>Next: Level {Math.min(item.currentLevel + 1, item.levels || Infinity)} ({getNextLevelValue(item)})</span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-medium">Max: {item.maxValue}</span>
        <Button 
          size="sm" 
          disabled={isMaxLevel || (getCurrentLevelCost(item).money > money || getCurrentLevelCost(item).researchPoints > researchPoints)}
          onClick={() => onResearch(category, item.name)}
        >
          {isMaxLevel ? "Max Level" : `Upgrade to Level ${item.currentLevel + 1}`}
          <span className="ml-1 text-xs">
            ({getCurrentLevelCost(item).researchPoints}RP, ${getCurrentLevelCost(item).money})
          </span>
        </Button>
      </div>
    </div>
  )
}
