import React, { useState, useCallback } from 'react';
import { GameState } from './types';
import { initialProducts } from './data/products';
import GameMenu from './components/GameMenu';
import CompanySetup, { CompanySetup as CompanySetupType } from './components/CompanySetup';
import Game from './components/Game';

const getInitialState = (setup: CompanySetupType): GameState => ({
  companyName: setup.name,
  companyLogo: setup.logo,
  money: setup.startBudget,
  researchPoints: 50,
  products: initialProducts.map(product => {
    if (setup.difficulty === 'Easy') {
      return {
        ...product,
        moneyPerCopy: 200,
        researchCost: product.researchCost / 2,
        cost: product.cost / 2,
      };
    } else if (setup.difficulty === 'Hard') {
      return {
        ...product,
        moneyPerCopy: 95,
        researchCost: product.researchCost * 2,
        cost: product.cost * 2,
      };
    }
    return product;
  }),
  createdProducts: [],
  productionQueue: [],
  loans: [],
  gameDate: new Date(`${setup.startYear}-01-01`),
  difficulty: setup.difficulty,
  isBankrupt: false,
});

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gamePhase, setGamePhase] = useState<'menu' | 'setup' | 'game'>('menu');
  const [initialSetup, setInitialSetup] = useState<CompanySetupType | null>(null);

  const startNewGame = useCallback(() => {
    setGamePhase('setup');
  }, []);

  const setupCompany = useCallback((setup: CompanySetupType) => {
    const initialState = getInitialState(setup);
    setGameState(initialState);
    setInitialSetup(setup);
    setGamePhase('game');
  }, []);

  const loadGame = useCallback((loadedState: GameState) => {
    setGameState(loadedState);
    setGamePhase('game');
  }, []);

  const handleBankruptcy = useCallback((action: 'mainMenu' | 'retry') => {
    if (action === 'mainMenu') {
      setGameState(null);
      setGamePhase('menu');
    } else if (action === 'retry' && initialSetup) {
      const newInitialState = getInitialState(initialSetup);
      setGameState(newInitialState);
    }
  }, [initialSetup]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {gamePhase === 'menu' && <GameMenu onStartNewGame={startNewGame} onLoadGame={loadGame} />}
      {gamePhase === 'setup' && <CompanySetup onSetupComplete={setupCompany} />}
      {gamePhase === 'game' && gameState && (
        <Game
          gameState={gameState}
          setGameState={setGameState}
          onBankruptcy={handleBankruptcy}
        />
      )}
    </div>
  );
}

export default App;