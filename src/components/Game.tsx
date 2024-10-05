import React from 'react';
import { GameState, Product } from '../types';
import ProductList from './ProductList';
import Stats from './Stats';
import { Cpu, Monitor, Smartphone } from 'lucide-react';

interface GameProps {
  gameState: GameState;
  onResearch: (product: Product) => void;
  onProduce: (product: Product) => void;
}

const Game: React.FC<GameProps> = ({ gameState, onResearch, onProduce }) => {
  const { companyName, companyLogo } = gameState;

  const getLogo = () => {
    switch (companyLogo) {
      case 'CPU':
        return <Cpu className="w-12 h-12 text-blue-500 mr-4" />;
      case 'GPU':
        return <Monitor className="w-12 h-12 text-blue-500 mr-4" />;
      case 'Smartphone':
        return <Smartphone className="w-12 h-12 text-blue-500 mr-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          {getLogo()}
          <h1 className="text-4xl font-bold">{companyName}</h1>
        </div>
        <Stats money={gameState.money} researchPoints={gameState.researchPoints} />
      </header>
      <ProductList
        products={gameState.products}
        onResearch={onResearch}
        onProduce={onProduce}
      />
    </div>
  );
};

export default Game;