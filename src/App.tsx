import { useState, useCallback } from 'react';
import { GameState } from './types';
import { initialProducts } from './data/products';
import GameMenu from './components/GameMenu';
import CompanySetup, { CompanySetup as CompanySetupType } from './components/CompanySetup';
import Game from './components/Game';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showCompanySetup, setShowCompanySetup] = useState(false);

  const handleStartNewGame = useCallback(() => {
    setShowCompanySetup(true);
  }, []);

  const handleCompanySetup = useCallback((setup: CompanySetupType) => {
    const initialState: GameState = {
      companyName: setup.name,
      companyLogo: setup.logo,
      money: setup.startBudget,
      researchPoints: 10, // Start with 10 RP
      products: initialProducts,
      createdProducts: [],
      productionQueue: [],
      loans: [],
      gameDate: new Date(setup.startYear, 0, 1),
      difficulty: setup.difficulty,
      isBankrupt: false,
    };
    setGameState(initialState);
    setShowCompanySetup(false);
  }, []);

  const handleLoadGame = useCallback((loadedState: GameState) => {
    setGameState(loadedState);
  }, []);

  const handleBankruptcy = useCallback((action: 'mainMenu' | 'retry') => {
    if (action === 'mainMenu') {
      setGameState(null);
    } else {
      setShowCompanySetup(true);
    }
  }, []);

  if (showCompanySetup) {
    return <CompanySetup onSetupComplete={handleCompanySetup} />;
  }

  if (gameState) {
    return (
      <Game
        gameState={gameState}
        setGameState={setGameState}
        onBankruptcy={handleBankruptcy}
      />
    );
  }

  return <GameMenu onStartNewGame={handleStartNewGame} onLoadGame={handleLoadGame} />;
};

export default App;