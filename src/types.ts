import { Dispatch, SetStateAction } from 'react';

export interface Product {
  // ... (existing Product interface remains unchanged)
}

export interface CreatedProduct extends Product {
  // ... (existing CreatedProduct interface remains unchanged)
}

export interface ProductionItem {
  // ... (existing ProductionItem interface remains unchanged)
}

export interface Loan {
  amount: number;
  interestRate: number;
  dueDate: Date;
  remainingAmount: number;
  payLaterCount: number; // Add this new property
}

export interface GameState {
  companyName: string;
  companyLogo: string;
  money: number;
  researchPoints: number;
  products: Product[];
  createdProducts: CreatedProduct[];
  productionQueue: ProductionItem[];
  loans: Loan[];
  gameDate: Date;
  difficulty: 'Easy' | 'Standard' | 'Hard';
  isBankrupt: boolean; // Add this new property
}

export type GameStateDispatch = Dispatch<SetStateAction<GameState>>;