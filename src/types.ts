import { Dispatch, SetStateAction } from 'react';

export interface Product {
  id: string;
  name: string;
  type: 'CPU' | 'GPU';
  subtype: string;
  level: 'Basic' | 'Enhanced' | 'Enhanced 2' | 'Enhanced 3';
  cost: number;
  researchCost: number;
  researchPoints: number;
  isResearched: boolean;
  productionTime: number;
  moneyPerCopy: number;
  researchPointsPerCopy: number;
  price: number;
  specs: any;
}

export interface CreatedProduct extends Product {
  createdName: string;
  copies: number;
  specs: {
    // CPU specs
    cores?: number;
    threads?: number;
    baseFrequency?: number;
    turboFrequency?: number;
    powerUsage?: number;
    caches?: number;
    // GPU specs
    baseClock?: number;
    boostClock?: number;
    memoryClock?: number;
    memorySize?: number;
    memoryType?: string;
    directX?: string;
    vulkan?: string;
    openGL?: string;
  };
}

export interface ProductionItem {
  product: Product;
  name: string;
  copies: number;
  progress: number;
  totalTime: number;
  price: number;
}

export interface Loan {
  amount: number;
  interestRate: number;
  dueDate: Date;
  remainingAmount: number;
  payLaterCount: number;
}

export interface GameState {
  company: {
    name: string;
    logo: string;
    money: number;
    researchPoints: number;
  };
  companyName: string;
  companyLogo: string;
  money: number;
  researchPoints: number;
  gameDate: Date;
  date: Date;
  products: Product[];
  loans: Loan[];
  productionQueue: ProductionItem[];
  createdProducts: CreatedProduct[];
}

export type GameStateDispatch = Dispatch<SetStateAction<GameState>>;