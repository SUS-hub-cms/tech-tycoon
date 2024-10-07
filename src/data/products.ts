import { Product } from '../types';

const createProduct = (
  id: string,
  name: string,
  type: 'CPU' | 'GPU',
  subtype: string,
  level: 'Basic' | 'Enhanced' | 'Enhanced 2' | 'Enhanced 3',
  cost: number,
  researchCost: number,
  researchPoints: number,
  productionTime: number,
  moneyPerCopy: number,
  researchPointsPerCopy: number
): Product => ({
  id,
  name,
  type,
  subtype,
  level,
  cost,
  researchCost,
  researchPoints,
  isResearched: false,
  productionTime,
  moneyPerCopy,
  researchPointsPerCopy,
});

export const initialProducts: Product[] = [
  createProduct('cpu-pc-1', 'Basic PC CPU', 'CPU', 'PC', 'Basic', 100, 50, 10, 10, 1.5, 0.1),
  createProduct('cpu-laptop-1', 'Basic Laptop CPU', 'CPU', 'Laptop', 'Basic', 150, 75, 15, 10, 2, 0.15),
  createProduct('cpu-ai-1', 'Basic AI CPU', 'CPU', 'AI', 'Basic', 200, 100, 20, 10, 3, 0.2),
  createProduct('gpu-dedicated-1', 'Basic Dedicated GPU', 'GPU', 'Dedicated', 'Basic', 150, 75, 15, 10, 2, 0.15),
  createProduct('gpu-integrated-1', 'Basic Integrated GPU', 'GPU', 'Integrated', 'Basic', 100, 50, 10, 10, 1.5, 0.1),
  createProduct('gpu-graphics-1', 'Basic Graphics GPU', 'GPU', 'Graphics', 'Basic', 200, 100, 20, 10, 3, 0.2),
  createProduct('gpu-gaming-1', 'Basic Gaming GPU', 'GPU', 'Gaming', 'Basic', 250, 125, 25, 10, 3.5, 0.25),
  createProduct('gpu-ai-1', 'Basic AI GPU', 'GPU', 'AI', 'Basic', 300, 150, 30, 10, 4, 0.3),
];

export const getNextLevel = (level: Product['level']): Product['level'] => {
  switch (level) {
    case 'Basic': return 'Enhanced';
    case 'Enhanced': return 'Enhanced 2';
    case 'Enhanced 2': return 'Enhanced 3';
    default: return 'Enhanced 3';
  }
};

export const upgradeProduct = (product: Product): Product => {
  const nextLevel = getNextLevel(product.level);
  const multiplier = nextLevel === 'Enhanced' ? 1.5 : nextLevel === 'Enhanced 2' ? 2 : 3;

  return {
    ...product,
    level: nextLevel,
    cost: Math.round(product.cost * multiplier),
    researchCost: Math.round(product.researchCost * multiplier),
    researchPoints: Math.round(product.researchPoints * multiplier),
    productionTime: product.productionTime + (nextLevel === 'Enhanced' ? 5 : nextLevel === 'Enhanced 2' ? 15 : 25),
    moneyPerCopy: product.moneyPerCopy * multiplier,
    researchPointsPerCopy: product.researchPointsPerCopy * multiplier,
  };
};