"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { 
  Cpu, 
  DollarSign, 
  ShoppingCart, 
  Factory, 
  Users, 
  Zap, 
  Plus, 
  Monitor, 
  HardDrive, 
  CircuitBoard, 
  Moon, 
  Sun, 
  Calendar, 
  Pause, 
  Play, 
  FastForward, 
  ArrowRight, 
  ArrowLeft, 
  Gauge, 
  Bolt, 
  Maximize2, 
  Box, 
  MemoryStick, // Changed from Memory to MemoryStick
  Clock, 
  Activity, 
  Layers, 
  ChevronRight, 
  Volume2, 
  VolumeX 
} from "lucide-react"
import { getResearchData, ResearchData, Research, ResearchCategory, ResearchItem } from "@/components/data/researchData"
import { ResearchPopup } from "@/components/researchPopup/research-popup"
import ManufactureProductsUI from "@/components/ManufactureProductsUI"
import Image from 'next/image'
import { motion } from "framer-motion"
import { useMusic } from '@/contexts/music-context'
import Slider from "react-slider"
import { SandboxProvider } from '@/contexts/sandbox-context'
import SandboxPopup from '@/components/sandbox/sandbox-popup'
import { useSandbox } from '@/contexts/sandbox-context'
import { useSave } from '@/contexts/save-context'

type Product = {
  id: string;
  type: 'CPU' | 'GPU' | 'Disk' | 'RAM';
  name: string;
  specs: {
    [key: string]: string | number | boolean;
    series: string;
    copies: number;
  };
  manufacturedCopies: number;
  quality: number;
  copies: number; // Add this to match ManufactureProductsUI
}

type TimeSpeed = 'paused' | 'normal' | 'fast' | 'superfast';

type ResearchAreas = {
  [K in keyof typeof getResearchData]: keyof typeof getResearchData[K];
};

// Add this type definition at the top of the file
type ResearchItemWithSpecs = {
  levels: number;
  description: string;
  name?: string;
  maxValue?: number;
  maxBusSpeed?: number;
  types?: string[];
  unit?: string;
  requires?: string | [string, number]; // Add requires property
  specs?: Array<{
    level: number;
    value: number | string | boolean;
    cost: {
      researchPoints: number;
      money: number;
    }
  }>;
};

// Add this function at the top of your file, outside of the Component function
function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

function useClientSideValue<T>(serverValue: T, clientValue: T): T {
  const [value, setValue] = useState(serverValue);
  useEffect(() => {
    setValue(clientValue);
  }, [clientValue]);
  return value;
}

// Add this type helper
type ResearchKeys<T> = {
  [K in keyof T]: keyof T[K]
}[keyof T]

export default function Component({ onQuit }: { onQuit: () => void }) {
  const { toast } = useToast()
  const [money, setMoney] = useState(1000000)
  const [researchPoints, setResearchPoints] = useState(100) // Add this line to initialize research points
  const [date, setDate] = useState(new Date("2024-01-01"))
  const [researchData, setResearchData] = useState(() => getResearchData());
  const [research, setResearch] = useState<Research>(() => {
    const initialResearch: Research = Object.fromEntries(
      Object.entries(researchData).map(([category, items]) => [
        category,
        Object.fromEntries(
          Object.entries(items).map(([itemName, item]) => [
            itemName,
            {
              currentLevel: 0,
              maxLevel: item.levels
            }
          ])
        )
      ])
    ) as Research;
    return initialResearch;
  });
  const [products, setProducts] = useState<Product[]>([])
  const [employees, setEmployees] = useState(0)
  const [marketShare, setMarketShare] = useState(0)
  const [customerSatisfaction, setCustomerSatisfaction] = useState(50)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [timeSpeed, setTimeSpeed] = useState<TimeSpeed>('normal')
  const [series, setSeries] = useState<{ [key: string]: string[] }>({
    CPU: [],
    GPU: [],
    Disk: [],
    RAM: [],
  })
  const [integratedGraphics, setIntegratedGraphics] = useState<string[]>([])
  const [creationStep, setCreationStep] = useState(1)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    type: 'CPU',
    specs: {
      series: '',
      copies: 0
    }
  })
  const [isCreatingNewSeries, setIsCreatingNewSeries] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [randomValue, setRandomValue] = useState(0);
  const [formattedMoney, setFormattedMoney] = useState('');
  const [pendingProduct, setPendingProduct] = useState<Partial<Product> | null>(null)
  const [isManufactureDialogOpen, setIsManufactureDialogOpen] = useState(false);
  const [newlyCreatedProductId, setNewlyCreatedProductId] = useState<string | null>(null);
  const { volume, isMuted, setVolume, setIsMuted } = useMusic()
  const { unlimitedMoney, unlimitedRP, unlockAll, noCosts } = useSandbox()
  const [previousDailyCosts, setPreviousDailyCosts] = useState<number | null>(null)
  const { 
    isAutoSaveEnabled, 
    setAutoSaveEnabled, 
    autoSaveInterval, 
    setAutoSaveInterval,
    autoSave 
  } = useSave()

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (timeSpeed !== 'paused') {
      const interval = getTimeInterval();
      if (interval !== undefined) {
        timer = setInterval(() => {
          advanceTime()
        }, interval)
      }
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeSpeed])

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    // Initialize any state that might cause hydration mismatches here
    setMoney(1000000);
    setDate(new Date("2024-01-01"));
    setMarketShare(0);
    setCustomerSatisfaction(50);
    // ... initialize other state variables as needed
  }, []);

  useEffect(() => {
    setResearchData(getResearchData());
  }, []);

  useEffect(() => {
    setRandomValue(Math.random());
  }, []);

  useEffect(() => {
    // Format money consistently on the client side
    setFormattedMoney(new Intl.NumberFormat('en-US').format(money));
  }, [money]);

  // Modify money-related functions to respect sandbox mode
  const spendMoney = (amount: number) => {
    if (unlimitedMoney) {
      return true // Always allow spending if unlimited money is enabled
    }
    if (money < amount) {
      return false
    }
    setMoney(prev => prev - amount)
    return true
  }

  // Modify research points functions to respect sandbox mode
  const spendResearchPoints = (amount: number) => {
    if (unlimitedRP) return true
    if (researchPoints < amount) return false
    setResearchPoints(prev => prev - amount)
    return true
  }

  // Add effect to handle no costs mode
  useEffect(() => {
    if (noCosts) {
      // Store current daily costs before setting to 0
      setPreviousDailyCosts(calculateDailyCosts())
    } else if (previousDailyCosts !== null) {
      // Restore previous daily costs when no costs is turned off
      const currentCosts = calculateDailyCosts()
      if (currentCosts > 0) {
        spendMoney(currentCosts)
      }
    }
  }, [noCosts])

  // Update the unlock all effect
  useEffect(() => {
    if (unlockAll) {
      setResearch(prev => {
        const newResearch = { ...prev }
        // Type-safe iteration over research categories
        Object.keys(newResearch).forEach((category) => {
          const typedCategory = category as keyof Research
          const categoryData = newResearch[typedCategory]
          
          // Type-safe iteration over research items
          Object.keys(categoryData).forEach((item) => {
            const typedItem = item as keyof typeof categoryData
            const researchItem = researchData[typedCategory][typedItem]
            
            if (researchItem) {
              categoryData[typedItem] = {
                ...categoryData[typedItem],
                currentLevel: researchItem.levels
              }
            }
          })
        })
        return newResearch
      })
    }
  }, [unlockAll, researchData])

  // Add effect to maintain infinite resources when enabled
  useEffect(() => {
    if (unlimitedMoney) {
      setMoney(999999999)
    }
    if (unlimitedRP) {
      setResearchPoints(999999999)
    }
  }, [unlimitedMoney, unlimitedRP])

  // Add effect for auto-save
  useEffect(() => {
    if (!isAutoSaveEnabled) return

    const gameState = {
      money,
      researchPoints,
      date,
      research,
      products,
      employees,
      marketShare,
      customerSatisfaction,
      series,
      integratedGraphics,
    }

    autoSave(gameState)
  }, [
    isAutoSaveEnabled,
    money,
    researchPoints,
    date,
    research,
    products,
    employees,
    marketShare,
    customerSatisfaction,
    series,
    integratedGraphics,
    autoSave
  ])

  const getTimeInterval = () => {
    switch (timeSpeed) {
      case 'paused': return undefined;
      case 'normal': return 600; // 1 minute = 1 day
      case 'fast': return 300; // 30 seconds = 1 day
      case 'superfast': return 150; // 15 seconds = 1 day
      default: return 600;
    }
  }

  const handleProductInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (isCreatingNewSeries) {
      handleCreateNewSeries(e);
    } else {
      setNewProduct(prev => ({
        ...prev,
        name: formData.get('name') as string,
        specs: {
          ...prev.specs,
          series: formData.get('series') as string,
          price: Number(formData.get('price')),
          copies: Number(formData.get('copies')),
        }
      }));
      setCreationStep(2);
    }
  };

  const handleProductSpecsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const specs: Product['specs'] = {
      series: newProduct.specs?.series || '',
      copies: newProduct.specs?.copies || 0
    };
    
    formData.forEach((value, key) => {
      if (key === 'supportRayTracing') {
        specs[key] = value === 'on';
      } else if (typeof value === 'string') {
        const researchCategory = getResearchCategory(newProduct.type!, key) as keyof Research;
        const researchItem = getResearchItemWithSpecs(newProduct.type!, key);
        if (researchItem) {
          const maxAllowedValue = researchItem.specs?.[research[researchCategory][key as keyof typeof research[typeof researchCategory]].currentLevel - 1]?.value || researchItem.maxValue;
          specs[key] = Math.min(Number(value), Number(maxAllowedValue?.toString().replace(/[^\d.-]/g, '') ?? 0));
        } else {
          specs[key] = isNaN(Number(value)) ? value : Number(value);
        }
      }
    });
    
    createProduct(newProduct.type!, newProduct.name!, specs);
    setCreationStep(1);
    setNewProduct({ 
      type: 'CPU', 
      specs: { 
        series: '',
        copies: 0
      } 
    });
  };

  const getResearchCategory = (productType: string, specName: string): string => {
    switch (productType) {
      case 'CPU':
        return 'CPU';
      case 'GPU':
        return 'GPU';
      case 'Disk':
        return 'Disk';
      case 'RAM':
        return 'RAM';
      default:
        return '';
    }
  };

  const createProduct = (type: Product['type'], name: string, specs: Partial<Product['specs']>) => {
    const newProduct: Product = {
      id: `${type}-${Date.now()}`,
      type,
      name,
      specs: {
        series: specs.series || '',
        copies: specs.copies || 0,
        ...specs
      },
      manufacturedCopies: 0,
      quality: 0,
      copies: specs.copies || 0
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setIsDialogOpen(false);
    setNewProduct({ 
      type: 'CPU', 
      specs: { 
        series: '',
        copies: 0
      } 
    });
    setCreationStep(1);
    toast({
      title: "Product Created",
      description: `You've created a new ${type}: ${name}`,
    });
    
    setIsManufactureDialogOpen(true);
    setNewlyCreatedProductId(newProduct.id);
  };

  const researchProduct = (category: keyof ResearchData, itemName: string) => {
    const item = researchData[category]?.[itemName as keyof ResearchData[typeof category]];
    if (!item) return;

    const currentLevel = research[category][itemName as keyof Research[typeof category]].currentLevel;
    if (currentLevel >= item.levels) return;

    let cost = { money: 0, researchPoints: 0 };
    if ((item as any).specs) {
      cost = (item as any).specs[currentLevel]?.cost || cost;
    } else if ((item as any).cost) {
      cost = (item as any).cost;
    }

    if (money < cost.money) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough money for research.",
        variant: "destructive",
      });
      return;
    }

    setResearch(prevResearch => ({
      ...prevResearch,
      [category]: {
        ...prevResearch[category],
        [itemName as keyof Research[typeof category]]: {
          ...prevResearch[category][itemName as keyof Research[typeof category]],
          currentLevel: currentLevel + 1
        }
      }
    }));
    setMoney(prevMoney => prevMoney - cost.money);
    toast({
      title: "Research Completed",
      description: `You've made progress in ${category} ${itemName} research!`,
    });
  };

  const buyComponents = () => {
    if (money < 200000) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough money to buy components.",
        variant: "destructive",
      })
      return
    }

    setMoney(prevMoney => prevMoney - 200000)
    toast({
      title: "Components Purchased",
      description: "You've bought new components for production.",
    })
  }

  const manufactureProducts = () => {
    if (products.length === 0) {
      toast({
        title: "No Products",
        description: "You need to create products before manufacturing.",
        variant: "destructive",
      })
      return
    }

    const revenue = products.length * 50000 // Revenue per product
    setMoney(prevMoney => prevMoney + revenue)
    setMarketShare(prevShare => Math.min(prevShare + 2, 100))
    setCustomerSatisfaction(prevSatisfaction => Math.min(prevSatisfaction + 1, 100))
    toast({
      title: "Products Manufactured",
      description: `You've manufactured products and earned ${revenue.toLocaleString()}!`,
    })
  }

  const hireEmployees = () => {
    if (money < 100000) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough money to hire employees.",
        variant: "destructive",
      })
      return
    }

    setEmployees(prevEmployees => prevEmployees + 5)
    setMoney(prevMoney => prevMoney - 100000) // Cost of hiring
    toast({
      title: "Employees Hired",
      description: "You've hired 5 new employees!",
    })
  }

  // Update calculateDailyCosts to respect noCosts mode
  const calculateDailyCosts = () => {
    if (noCosts) return 0

    // Base costs
    let totalCosts = 0
    
    // Employee costs
    totalCosts += employees * 1000
    
    // Maintenance costs for products
    totalCosts += products.length * 500
    
    // Research facility costs
    totalCosts += 2000
    
    return totalCosts
  }

  // Update advanceTime to handle daily costs properly
  const advanceTime = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() + 1)
      
      // Apply daily costs (will be 0 if noCosts is true)
      const dailyCosts = calculateDailyCosts()
      if (dailyCosts > 0) {
        spendMoney(dailyCosts)
      }
      
      // Generate research points daily
      if (!unlimitedRP) {
        const baseRP = 10
        const bonusRP = Math.floor(employees * 0.5)
        setResearchPoints(prev => prev + baseRP + bonusRP)
      }
      
      return newDate
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const handleTimeControl = (speed: TimeSpeed) => {
    setTimeSpeed(speed);
    // Add any additional logic for changing game speed here
  };

  const handleCreateNewSeries = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSeriesName = formData.get('newSeries') as string;
    
    if (newProduct.type && newSeriesName) {
      // Update the series state
      setSeries(prev => ({
        ...prev,
        [newProduct.type!]: [...(prev[newProduct.type!] || []), newSeriesName]
      }));
      
      // Update the current product with the new series
      setNewProduct(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          series: newSeriesName,
          copies: prev.specs?.copies || 0
        }
      }));
      
      setIsCreatingNewSeries(false);
      toast({
        title: "Series Created",
        description: `New ${newProduct.type} series "${newSeriesName}" has been created.`,
      });
    }
  };

  // Modify the handleResearch function to respect unlimited RP
  const handleResearch = (category: ResearchCategory, itemName: string) => {
    const researchCategory = research[category] as Record<string, { currentLevel: number; maxLevel: number }>;
    const researchDataCategory = researchData[category] as unknown as Record<string, ResearchItemWithSpecs>;
    
    const currentLevel = researchCategory[itemName].currentLevel;
    const cost = researchDataCategory[itemName].specs?.[currentLevel]?.cost || { researchPoints: 0, money: 0 };

    // Check if we can proceed with the research
    if ((unlimitedMoney || money >= cost.money) && (unlimitedRP || researchPoints >= cost.researchPoints)) {
      // Only deduct resources if not in unlimited mode
      if (!unlimitedMoney) {
        setMoney(prev => prev - cost.money);
      }
      if (!unlimitedRP) {
        setResearchPoints(prev => prev - cost.researchPoints);
      }

      setResearch(prevResearch => ({
        ...prevResearch,
        [category]: {
          ...prevResearch[category],
          [itemName]: {
            ...researchCategory[itemName],
            currentLevel: currentLevel + 1
          }
        }
      }));

      toast({
        title: "Research Completed",
        description: `Upgraded ${itemName} in ${category} to level ${currentLevel + 1}`,
      });
    } else {
      toast({
        title: "Insufficient Resources",
        description: "Not enough money or research points for this upgrade.",
        variant: "destructive",
      });
    }
  };

  const handleManufacture = (productId: string, copies: number, investmentPerCopy: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const totalCost = copies * investmentPerCopy;
      if (totalCost > money) {
        toast({
          title: "Insufficient Funds",
          description: "You don't have enough money to manufacture these products.",
          variant: "destructive",
        });
        return;
      }

      setMoney(prevMoney => prevMoney - totalCost);
      setProducts(prevProducts => prevProducts.map(p => 
        p.id === productId 
          ? { ...p, manufacturedCopies: p.manufacturedCopies + copies, quality: Math.min(p.quality + (investmentPerCopy / 200), 5) }
          : p
      ));

      toast({
        title: "Manufacturing Started",
        description: `Started manufacturing ${copies} copies of ${product.name}.`,
      });
    }
  };

  const calculateQuality = (investment: number): number => {
    if (investment < 200) return 1;
    if (investment < 400) return 2;
    if (investment < 600) return 3;
    if (investment < 800) return 4;
    return 5;
  };

  const handleProductCreation = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product]);
    setIsDialogOpen(false);
    setIsManufactureDialogOpen(true);
  };

  const handleProductConfirmation = (confirmed: boolean) => {
    if (confirmed && pendingProduct) {
      createProduct(
        pendingProduct.type as 'CPU' | 'GPU' | 'Disk' | 'RAM',
        pendingProduct.name as string,
        pendingProduct.specs as { [key: string]: number | string | boolean }
      );
    } else {
      setCreationStep(1);
    }
    setPendingProduct(null);
  };

  const handleSpecChange = (key: string, value: string | number | boolean) => {
    setNewProduct(prev => ({
      ...prev,
      specs: {
        series: prev.specs?.series || '',
        copies: prev.specs?.copies || 0,
        ...prev.specs,
        [key]: value
      }
    }));
  };

  const getResearchItemWithSpecs = (type: Product['type'], key: string): ResearchItemWithSpecs | null => {
    const item = researchData[type]?.[key as keyof typeof researchData[typeof type]];
    if (!item) return null;
    return {
      ...item,
      name: key // Add name if not present
    };
  };

  // Fix invest money slider
  const handleInvestMoneyChange = (value: number) => {
    if (typeof value === 'number' && !isNaN(value)) {
      // Handle the investment logic here
      if (spendMoney(value)) {
        // Add your investment logic
        toast({
          title: "Investment Made",
          description: `Successfully invested $${formatNumber(value)}`,
        })
      } else {
        toast({
          title: "Insufficient Funds",
          description: "Not enough money for this investment",
          variant: "destructive",
        })
      }
    }
  }

  // Add save/load handlers
  const handleSaveGame = async () => {
    const gameState = {
      money,
      researchPoints,
      date,
      research,
      products,
      employees,
      marketShare,
      customerSatisfaction,
      series,
      integratedGraphics,
      // Add any other state you want to save
    }

    const saveData = JSON.stringify(gameState)
    const blob = new Blob([saveData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `hardware-tycoon-save-${new Date().toISOString()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLoadGame = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const saveData = JSON.parse(e.target?.result as string)
          
          // Update all game state
          setMoney(saveData.money)
          setResearchPoints(saveData.researchPoints)
          setDate(new Date(saveData.date))
          setResearch(saveData.research)
          setProducts(saveData.products)
          setEmployees(saveData.employees)
          setMarketShare(saveData.marketShare)
          setCustomerSatisfaction(saveData.customerSatisfaction)
          setSeries(saveData.series)
          setIntegratedGraphics(saveData.integratedGraphics)
          
          toast({
            title: "Game Loaded",
            description: "Your save file has been loaded successfully.",
          })
        } catch (error) {
          toast({
            title: "Error Loading Save",
            description: "Failed to load the save file. It may be corrupted.",
            variant: "destructive",
          })
        }
      }
      reader.readAsText(file)
    }
    
    input.click()
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 shadow-lg p-4 transition-colors duration-200">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo */}
            <Image
              src="/Hardware tycoon logo.png"
              alt="Hardware Tycoon Logo"
              width={180}  // Small size for the header
              height={150}  // Maintained aspect ratio
              className="h-auto"
            />
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="flex items-center bg-white dark:bg-gray-700 px-3 py-1 rounded-full mb-2 sm:mb-0 transition-colors duration-200">
                <DollarSign className="mr-1 text-green-600 dark:text-green-400" />
                <span className="font-semibold">${formatNumber(money)}</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-700 px-3 py-1 rounded-full mb-2 sm:mb-0 transition-colors duration-200">
                <Zap className="mr-1 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">{formatNumber(researchPoints)} RP</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-700 px-3 py-1 rounded-full mb-2 sm:mb-0 transition-colors duration-200">
                <Calendar className="mr-1 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">{date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-700 rounded-full mb-2 sm:mb-0 transition-colors duration-200">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTimeControl('paused')}
                  className={`rounded-l-full ${timeSpeed === 'paused' ? 'bg-blue-200 dark:bg-blue-800' : ''}`}
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTimeControl('normal')}
                  className={`${timeSpeed === 'normal' ? 'bg-blue-200 dark:bg-blue-800' : ''}`}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTimeControl('fast')}
                  className={`${timeSpeed === 'fast' ? 'bg-blue-200 dark:bg-blue-800' : ''}`}
                >
                  <FastForward className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTimeControl('superfast')}
                  className={`rounded-r-full ${timeSpeed === 'superfast' ? 'bg-blue-200 dark:bg-blue-800' : ''}`}
                >
                  <FastForward className="h-4 w-4" />
                  <FastForward className="h-4 w-4 -ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stats Panel - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
            >
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">Company Stats</h2>
              <div className="space-y-6">
                <div className="group hover:scale-105 transition-transform duration-200">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Market Share</h3>
                  <Progress value={marketShare} className="h-3 bg-gray-200 dark:bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500" 
                         style={{ width: `${marketShare}%` }} />
                  </Progress>
                  <span className="text-sm text-gray-700 dark:text-gray-300 mt-2 block">{marketShare}%</span>
                </div>
                
                <div className="group hover:scale-105 transition-transform duration-200">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Customer Satisfaction</h3>
                  <Progress value={customerSatisfaction} className="h-3 bg-gray-200 dark:bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500" 
                         style={{ width: `${customerSatisfaction}%` }} />
                  </Progress>
                  <span className="text-sm text-gray-700 dark:text-gray-300 mt-2 block">{customerSatisfaction}%</span>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg"
                >
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Employees</h3>
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{employees}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Main Content - 9 columns */}
          <div className="lg:col-span-9 space-y-6">
            {/* Actions Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
            >
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="w-full h-32 text-lg flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-200"
                    onClick={() => setIsManufactureDialogOpen(true)}
                  >
                    <Factory className="mb-2 h-10 w-10" />
                    Manufacture Products
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="w-full h-32 text-lg flex flex-col items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg transition-all duration-200"
                    onClick={hireEmployees}
                  >
                    <Users className="mb-2 h-10 w-10" />
                    Hire Employees
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ResearchPopup
                    research={research}
                    onResearch={handleResearch}
                    money={money}
                    researchPoints={researchPoints}
                    researchData={researchData}
                  >
                    <Button 
                      className="w-full h-32 text-lg flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg transition-all duration-200"
                    >
                      <Zap className="mb-2 h-10 w-10" />
                      Research Components
                    </Button>
                  </ResearchPopup>
                </motion.div>
              </div>

              <div className="mt-6">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={buyComponents} 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transition-all duration-200"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Buy Components
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Products Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">Products</h2>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-2 shadow-lg transition-all duration-200"
                      >
                        <Plus className="h-6 w-6" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <DialogHeader>
                        <DialogTitle>Create New Product - Step {creationStep}</DialogTitle>
                        <DialogDescription>
                          {creationStep === 1 ? "Select product type" : 
                           creationStep === 2 ? "Configure product details" : 
                           "Review and confirm"}
                        </DialogDescription>
                      </DialogHeader>

                      {creationStep === 1 && (
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            className="h-24 flex flex-col items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900"
                            variant="outline"
                            onClick={() => {
                              setNewProduct(prev => ({ ...prev, type: 'CPU' }));
                              setCreationStep(2);
                            }}
                          >
                            <Cpu className="h-8 w-8 mb-2" />
                            CPU
                          </Button>
                          <Button
                            className="h-24 flex flex-col items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900"
                            variant="outline"
                            onClick={() => {
                              setNewProduct(prev => ({ ...prev, type: 'GPU' }));
                              setCreationStep(2);
                            }}
                          >
                            <Monitor className="h-8 w-8 mb-2" />
                            GPU
                          </Button>
                          <Button
                            className="h-24 flex flex-col items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900"
                            variant="outline"
                            onClick={() => {
                              setNewProduct(prev => ({ ...prev, type: 'RAM' }));
                              setCreationStep(2);
                            }}
                          >
                            <CircuitBoard className="h-8 w-8 mb-2" />
                            RAM
                          </Button>
                          <Button
                            className="h-24 flex flex-col items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900"
                            variant="outline"
                            onClick={() => {
                              setNewProduct(prev => ({ ...prev, type: 'Disk' }));
                              setCreationStep(2);
                            }}
                          >
                            <HardDrive className="h-8 w-8 mb-2" />
                            Storage
                          </Button>
                        </div>
                      )}

                      {creationStep === 2 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Series</Label>
                            <div className="flex items-center space-x-2">
                              <Select
                                value={newProduct.specs?.series as string}
                                onValueChange={(value) => setNewProduct(prev => ({
                                  ...prev,
                                  specs: {
                                    ...prev.specs,
                                    series: value,
                                    copies: prev.specs?.copies || 0
                                  }
                                }))}
                              >
                                <SelectTrigger className="flex-1">
                                  <SelectValue placeholder="Select series" />
                                </SelectTrigger>
                                <SelectContent>
                                  {series[newProduct.type!]?.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Dialog open={isCreatingNewSeries} onOpenChange={setIsCreatingNewSeries}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                  >
                                    New Series
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                  <DialogHeader>
                                    <DialogTitle>Create New Series</DialogTitle>
                                    <DialogDescription>
                                      Enter a name for the new {newProduct.type} series
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form onSubmit={handleCreateNewSeries} className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Series Name</Label>
                                      <Input 
                                        name="newSeries" 
                                        required 
                                        placeholder="Enter series name"
                                        className="bg-white dark:bg-gray-700"
                                      />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                      <Button type="button" variant="outline" onClick={() => setIsCreatingNewSeries(false)}>
                                        Cancel
                                      </Button>
                                      <Button type="submit">
                                        Create Series
                                      </Button>
                                    </div>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Product Name</Label>
                            <Input
                              value={newProduct.name || ''}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Enter product name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Production Copies</Label>
                            <Input
                              type="number"
                              min="1"
                              value={newProduct.specs?.copies || ''}
                              onChange={(e) => {
                                const copiesValue = parseInt(e.target.value) || 0;
                                setNewProduct(prev => ({
                                  ...prev,
                                  specs: {
                                    ...(prev.specs || {}),  // Spread existing specs first
                                    series: prev.specs?.series || '',
                                    copies: copiesValue  // Set the new copies value
                                  }
                                }));
                              }}
                              placeholder="Enter number of copies"
                            />
                          </div>

                          <div className="flex justify-between mt-4">
                            <Button onClick={() => setCreationStep(1)}>Back</Button>
                            <Button
                              onClick={() => setCreationStep(3)}
                              disabled={!newProduct.name || !newProduct.specs?.copies || !newProduct.specs?.series}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}

                      {creationStep === 3 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Product Specifications</Label>
                            {Object.entries(researchData[newProduct.type!] || {}).map(([key, item]) => {
                              const researchCategory = newProduct.type!;
                              const researchItem = item as ResearchItemWithSpecs;
                              const researchLevel = research[researchCategory]?.[key as keyof typeof research[typeof researchCategory]];
                              
                              if (!researchLevel) return null;

                              return (
                                <div key={key} className="space-y-2">
                                  <Label>{key}</Label>
                                  {researchItem.specs ? (
                                    // For items with predefined spec levels
                                    <Select
                                      value={newProduct.specs?.[key]?.toString() || ''}
                                      onValueChange={(value) => {
                                        setNewProduct(prev => ({
                                          ...prev,
                                          specs: {
                                            series: prev.specs?.series || '',
                                            copies: prev.specs?.copies || 0,
                                            ...(prev.specs || {}),
                                            [key]: value.includes('GHz') || value.includes('W') || value.includes('cores') || value.includes('threads') 
                                              ? value 
                                              : Number(value)
                                          }
                                        }));
                                      }}
                                      disabled={researchLevel.currentLevel === 0}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder={`Select ${key}`} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {researchItem.specs.slice(0, researchLevel.currentLevel).map((spec) => (
                                          <SelectItem key={spec.level} value={spec.value.toString()}>
                                            {spec.value.toString()}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : researchItem.types ? (
                                    // For items with type selection (like memory technology)
                                    <Select
                                      value={newProduct.specs?.[key]?.toString() || ''}
                                      onValueChange={(value) => {
                                        setNewProduct(prev => ({
                                          ...prev,
                                          specs: {
                                            series: prev.specs?.series || '',
                                            copies: prev.specs?.copies || 0,
                                            ...(prev.specs || {}),
                                            [key]: value
                                          }
                                        }));
                                      }}
                                      disabled={researchLevel.currentLevel === 0}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder={`Select ${key}`} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {researchItem.types.slice(0, researchLevel.currentLevel).map((type) => (
                                          <SelectItem key={type} value={type}>
                                            {type}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : researchItem.maxValue ? (
                                    // For numerical inputs with max values
                                    <div className="flex items-center space-x-2">
                                      <Input
                                        type="number"
                                        value={newProduct.specs?.[key]?.toString() || ''}
                                        onChange={(e) => {
                                          const value = Math.min(
                                            Number(e.target.value),
                                            researchItem.maxValue! * (researchLevel.currentLevel / researchLevel.maxLevel)
                                          );
                                          setNewProduct(prev => ({
                                            ...prev,
                                            specs: {
                                              series: prev.specs?.series || '',
                                              copies: prev.specs?.copies || 0,
                                              ...(prev.specs || {}),
                                              [key]: value
                                            }
                                          }));
                                        }}
                                        disabled={researchLevel.currentLevel === 0}
                                        min={0}
                                        max={researchItem.maxValue * (researchLevel.currentLevel / researchLevel.maxLevel)}
                                      />
                                      <span className="text-sm text-gray-500">
                                        Max: {researchItem.maxValue * (researchLevel.currentLevel / researchLevel.maxLevel)}
                                        {researchItem.unit && ` ${researchItem.unit}`}
                                      </span>
                                    </div>
                                  ) : null}
                                  {researchLevel.currentLevel === 0 && (
                                    <p className="text-sm text-red-500">Research required</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between mt-4">
                            <Button onClick={() => setCreationStep(2)}>Back</Button>
                            <Button
                              onClick={() => {
                                setPendingProduct(newProduct);
                                setCreationStep(4);
                              }}
                              disabled={!Object.keys(newProduct.specs || {}).length}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}

                      {creationStep === 4 && pendingProduct && (
                        <div className="space-y-4">
                          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              {pendingProduct.type === 'CPU' && <Cpu className="w-5 h-5" />}
                              {pendingProduct.type === 'GPU' && <Monitor className="w-5 h-5" />}
                              {pendingProduct.type === 'RAM' && <MemoryStick className="w-5 h-5" />}
                              {pendingProduct.type === 'Disk' && <HardDrive className="w-5 h-5" />}
                              Product Summary
                            </h3>
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                  <Box className="w-4 h-4" />Type:
                                </p>
                                <p>{pendingProduct.type}</p>
                                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                  <Layers className="w-4 h-4" />Series:
                                </p>
                                <p>{pendingProduct.specs?.series}</p>
                                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                  <ChevronRight className="w-4 h-4" />Name:
                                </p>
                                <p>{pendingProduct.name}</p>
                                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                  <Activity className="w-4 h-4" />Production Copies:
                                </p>
                                <p>{formatNumber(pendingProduct.specs?.copies || 0)}</p>
                              </div>
                              
                              <Separator className="my-4" />
                              
                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <Gauge className="w-5 h-5" />
                                  Technical Specifications:
                                </h4>
                                <div className="space-y-2">
                                  {Object.entries(pendingProduct.specs || {}).map(([key, value]) => {
                                    if (key !== 'series' && key !== 'copies') {
                                      const researchItem = ((researchData[pendingProduct.type!] as unknown) as Record<string, ResearchItemWithSpecs>)?.[key];
                                      
                                      // Create a type-safe way to access research data
                                      const getResearchLevel = (productType: string, researchKey: string) => {
                                        if (!research[productType as keyof typeof research]) return undefined;
                                        const researchCategory = research[productType as keyof typeof research];
                                        return researchCategory[researchKey as keyof typeof researchCategory];
                                      };

                                      const researchLevel = getResearchLevel(pendingProduct.type!, key);
                                      
                                      const requirementMet = !researchItem?.requires || (
                                        typeof researchItem.requires === 'string'
                                          ? getResearchLevel(pendingProduct.type!, researchItem.requires)?.currentLevel ?? 0 > 0
                                          : (getResearchLevel(pendingProduct.type!, researchItem.requires[0])?.currentLevel ?? 0) >= (researchItem.requires[1] ?? 0)
                                      );

                                      // Get appropriate icon based on spec type
                                      const getSpecIcon = () => {
                                        if (key.toLowerCase().includes('frequency') || key.toLowerCase().includes('speed')) {
                                          return <Gauge className="w-4 h-4" />;
                                        }
                                        if (key.toLowerCase().includes('power')) {
                                          return <Zap className="w-4 h-4" />;
                                        }
                                        if (key.toLowerCase().includes('cores') || key.toLowerCase().includes('threads')) {
                                          return <Layers className="w-4 h-4" />;
                                        }
                                        if (key.toLowerCase().includes('boost')) {
                                          return <Bolt className="w-4 h-4" />;
                                        }
                                        if (key.toLowerCase().includes('capacity')) {
                                          return <Maximize2 className="w-4 h-4" />;
                                        }
                                        if (key.toLowerCase().includes('clock')) {
                                          return <Clock className="w-4 h-4" />;
                                        }
                                        return <Box className="w-4 h-4" />;
                                      };

                                      return (
                                        <div key={key} className="grid grid-cols-2 gap-2 p-2 rounded bg-gray-50 dark:bg-gray-800">
                                          <div className="flex items-center gap-2">
                                            {getSpecIcon()}
                                            <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                                            {!requirementMet && (
                                              <span className="ml-2 text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                                                <Zap className="w-3 h-3" />
                                                (Requires {researchItem?.requires} research)
                                              </span>
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="font-medium">{value}
                                              {typeof value === 'number' && researchItem?.unit && ` ${researchItem.unit}`}
                                            </span>
                                            {researchLevel !== undefined && (
                                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Activity className="w-3 h-3" />
                                                Level {researchLevel.currentLevel}/{researchItem?.levels}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button onClick={() => setCreationStep(3)} className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 rotate-180" />
                              Back
                            </Button>
                            <Button 
                              onClick={() => handleProductConfirmation(true)}
                              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                            >
                              Confirm Creation
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Keep existing dialogs */}
        <ManufactureProductsUI
          products={products}
          playerMoney={money}
          onManufacture={handleManufacture}
          isOpen={isManufactureDialogOpen}
          onOpenChange={setIsManufactureDialogOpen}
          newProductId={newlyCreatedProductId}
        />
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 mt-8">
        <div className="container mx-auto text-center flex justify-center items-center space-x-4">
          <Button onClick={handleSaveGame}>
            Save Game
          </Button>
          <Button onClick={handleLoadGame}>
            Load Game
          </Button>
          <Button variant="link" onClick={() => setIsOptionsOpen(true)}>
            Options
          </Button>
          <Button variant="link" onClick={onQuit}>
            Quit to Main Menu
          </Button>
        </div>
      </footer>

      <SandboxPopup
        money={money}
        setMoney={setMoney}
        researchPoints={researchPoints}
        setResearchPoints={setResearchPoints}
      />
    </div>
  )
}
