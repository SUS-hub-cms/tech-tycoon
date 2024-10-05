export interface Product {
  id: string;
  name: string;
  type: 'CPU' | 'GPU';
  subtype: string;
  cost: number;
  researchCost: number;
  researchPoints: number;
  isResearched: boolean;
}

export interface GameState {
  money: number;
  researchPoints: number;
  products: Product[];
  companyName: string;
  companyLogo: string;
}