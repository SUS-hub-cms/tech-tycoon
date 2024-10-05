import React from 'react';
import { Cpu } from 'lucide-react';

interface GameMenuProps {
  onStartNewGame: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartNewGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8 text-blue-500">Hardware Tycoon</h1>
      <Cpu className="w-24 h-24 text-blue-500 mb-8" />
      <button
        onClick={onStartNewGame}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors duration-200"
      >
        Start New Game
      </button>
    </div>
  );
};

export default GameMenu;