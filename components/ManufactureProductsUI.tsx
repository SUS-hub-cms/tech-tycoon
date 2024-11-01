'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Slider from "react-slider"
import { Label } from "@/components/ui/label"
import { Factory, DollarSign, AlertCircle, Star, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import "./slider.css" // We'll create this file for styles

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
  copies: number;
}

type ManufactureProductsUIProps = {
  products: Product[];
  playerMoney: number;
  onManufacture: (productId: string, copies: number, investmentPerCopy: number) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  newProductId: string | null;
}

export default function ManufactureProductsUI({ products, playerMoney, onManufacture, isOpen, onOpenChange, newProductId }: ManufactureProductsUIProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [investment, setInvestment] = useState<number>(0)
  const [isCopiesConfirmed, setIsCopiesConfirmed] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const { toast } = useToast()

  // Calculate maximum possible investment based on player money and copies
  const maxPossibleInvestment = selectedProduct 
    ? Math.floor(playerMoney / (selectedProduct.copies - selectedProduct.manufacturedCopies))
    : 0

  // Enhanced quality level calculation
  const getQualityLevel = (investment: number) => {
    const maxInvestment = maxPossibleInvestment;
    const percentage = (investment / maxInvestment) * 100;
    
    if (percentage >= 90) return 5; // Exceptional quality
    if (percentage >= 70) return 4; // High quality
    if (percentage >= 50) return 3; // Good quality
    if (percentage >= 30) return 2; // Average quality
    return 1; // Basic quality
  }

  // Get quality description
  const getQualityDescription = (level: number) => {
    switch (level) {
      case 5: return "Exceptional - Premium grade components and thorough QA";
      case 4: return "High - Quality components and detailed testing";
      case 3: return "Good - Standard components with basic testing";
      case 2: return "Average - Budget components with minimal testing";
      case 1: return "Basic - Lowest cost components, no testing";
      default: return "Unknown quality";
    }
  }

  // Calculate total cost
  const totalCost = selectedProduct 
    ? investment * (selectedProduct.copies - selectedProduct.manufacturedCopies)
    : 0;

  const handleInvestmentChange = (values: number[]) => {
    // Check if player has enough money
    if (playerMoney < 10000) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough money to do this action!",
        variant: "destructive",
      });
      setInvestment(0);
      return;
    }

    if (!selectedProduct) return;

    const newInvestment = values[0];
    const remainingCopies = selectedProduct.copies - selectedProduct.manufacturedCopies;
    const totalCost = newInvestment * remainingCopies;
    
    if (totalCost > playerMoney) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough money for this investment level!",
        variant: "destructive",
      });
      // Set investment to maximum possible based on available money
      setInvestment(Math.floor(playerMoney / remainingCopies));
      return;
    }

    setInvestment(newInvestment);
  };

  useEffect(() => {
    if (isOpen && newProductId) {
      handleProductSelect(newProductId);
    }
  }, [isOpen, newProductId]);

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setInvestment(100) // Default investment per copy
      setIsCopiesConfirmed(false)
    }
  }

  const handleConfirm = () => {
    if (selectedProduct) {
      const remainingCopies = selectedProduct.copies - selectedProduct.manufacturedCopies
      const totalCost = remainingCopies * investment
      if (totalCost > playerMoney) {
        toast({
          title: "Insufficient Funds",
          description: "You don't have enough money to manufacture these products.",
          variant: "destructive",
        })
        return
      }
      onManufacture(selectedProduct.id, remainingCopies, investment)
      setIsConfirmationOpen(false)
      setSelectedProduct(null)
      setInvestment(0)
      setIsCopiesConfirmed(false)
      toast({
        title: "Manufacturing Started",
        description: `Started manufacturing ${remainingCopies} copies of ${selectedProduct.name}.`,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Manufacture Products</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Product Selection</CardTitle>
            <CardDescription>Choose a product to manufacture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select onValueChange={handleProductSelect}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} ({product.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProduct && (
                <div className="space-y-2">
                  <Label>Copies</Label>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <span>{selectedProduct.copies - selectedProduct.manufacturedCopies} copies available</span>
                    {!isCopiesConfirmed ? (
                      <div className="space-x-2">
                        <Button size="sm" onClick={() => setIsCopiesConfirmed(true)}>Accept</Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedProduct(null)}>No</Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setIsCopiesConfirmed(false)}>Change</Button>
                    )}
                  </div>
                </div>
              )}

              {isCopiesConfirmed && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="investment" className="flex items-center gap-2">
                      Investment per copy
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Higher investment improves product quality
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <Slider
                        min={0}
                        max={maxPossibleInvestment}
                        step={Math.max(1, Math.floor(maxPossibleInvestment / 100))}
                        value={[investment]}
                        onChange={handleInvestmentChange}
                        className="horizontal-slider"
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        renderThumb={(props, state) => {
                          const { key, ...restProps } = props;
                          return (
                            <div 
                              key={key} 
                              {...restProps} 
                              className="slider-thumb"
                              style={{
                                ...restProps.style,
                                left: `${state.valueNow / maxPossibleInvestment * 100}%`
                              }}
                            >
                              <span className="thumb-value">${formatNumber(state.valueNow)}</span>
                            </div>
                          );
                        }}
                      />
                      <span className="w-20 text-right">${formatNumber(investment)}</span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Quality Level:</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < getQualityLevel(investment)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        {getQualityDescription(getQualityLevel(investment))}
                      </p>

                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                        <div className="flex justify-between text-sm">
                          <span>Total Cost:</span>
                          <span className="font-medium">${formatNumber(totalCost)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Remaining Money:</span>
                          <span className="font-medium">${formatNumber(playerMoney - totalCost)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      onClick={() => {
                        if (selectedProduct) {
                          onManufacture(
                            selectedProduct.id,
                            selectedProduct.copies - selectedProduct.manufacturedCopies,
                            investment
                          );
                          setSelectedProduct(null);
                          setInvestment(0);
                          setIsCopiesConfirmed(false);
                        }
                      }}
                      disabled={!selectedProduct || investment <= 0 || totalCost > playerMoney}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Start Manufacturing
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => setIsConfirmationOpen(true)} 
            disabled={!selectedProduct || !isCopiesConfirmed}
          >
            Manufacture
          </Button>
        </div>
      </DialogContent>
      {isConfirmationOpen && (
        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Manufacturing</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-2">
              <p>Are you sure you want to manufacture {selectedProduct ? selectedProduct.copies - selectedProduct.manufacturedCopies : 0} copies of {selectedProduct?.name}?</p>
              <p>Total investment: ${selectedProduct ? (selectedProduct.copies - selectedProduct.manufacturedCopies) * investment : 0}</p>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
                No, Cancel
              </Button>
              <Button onClick={handleConfirm}>
                Yes, Manufacture
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}

// Helper function to format numbers
function formatNumber(num: number | undefined): string {
  if (num === undefined || num === null) return '0';
  return num.toLocaleString('en-US');
}
