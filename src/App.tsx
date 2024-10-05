import React, { useState } from 'react';
import { GameState, Product } from './types';
import { initialProducts } from './data/products';
import GameMenu from './components/GameMenu';
import CompanySetup from './components/CompanySetup';
import Game from './components/Game';

const initialState: GameState = {
  money: 1000,
  researchPoints: 50,
  products: initialProducts,
  companyName: '',
  companyLogo: '',
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [gamePhase, setGamePhase] = useState<'menu' | 'setup' | 'game'>('menu');

  const startNewGame = () => {
    setGamePhase('setup');
  };

  const setupCompany = (name: string, logo: string) => {
    setGameState(prevState => ({
      ...prevState,
      companyName: name,
      companyLogo: logo,
    }));
    setGamePhase('game');
  };

  const handleResearch = (product: Product) => {
    if (gameState.money >= product.researchCost && gameState.researchPoints >= product.researchPoints) {
      setGameState((prevState) => ({
        ...prevState,
        money: prevState.money - product.researchCost,
        researchPoints: prevState.researchPoints - product.researchPoints,
        products: prevState.products.map((p) =>
          p.id === product.id ? { ...p, isResearched: true } : p
        ),
      }));
    } else {
      alert('Not enough resources to research this product!');
    }
  };

  const handleProduce = (product: Product) => {
    if (gameState.money >= product.cost) {
      setGameState((prevState) => ({
        ...prevState,
        money: prevState.money - product.cost + product.cost * 1.5, // Sell for 50% profit
        researchPoints: prevState.researchPoints + Math.floor(product.researchPoints / 2),
      }));
    } else {
      alert('Not enough money to produce this product!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {gamePhase === 'menu' && <GameMenu onStartNewGame={startNewGame} />}
      {gamePhase === 'setup' && <CompanySetup onSetupComplete={setupCompany} />}
      {gamePhase === 'game' && (
        <Game
          gameState={gameState}
          onResearch={handleResearch}
          onProduce={handleProduce}
        />
      )}
    </div>
  );
}

export default App;