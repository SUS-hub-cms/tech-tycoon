import React from 'react';
import { Cpu, Save, Upload } from 'lucide-react';
import { GameState } from '../types';

interface GameMenuProps {
  onStartNewGame: () => void;
  onLoadGame: (loadedState: GameState) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartNewGame, onLoadGame }) => {
  const handleLoadGame = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedState = JSON.parse(e.target?.result as string);
          onLoadGame(loadedState);
        } catch (error) {
          console.error('Error loading save file:', error);
          alert('Error loading save file. Please try again.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8 text-blue-500">Hardware Tycoon</h1>
      <Cpu className="w-24 h-24 text-blue-500 mb-8" />
      <div className="space-y-4">
        <button
          onClick={onStartNewGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors duration-200 w-full"
        >
          Start New Game
        </button>
        <label className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors duration-200 flex items-center justify-center cursor-pointer">
          <Upload size={24} className="mr-2" />
          Load Game
          <input
            type="file"
            accept=".json"
            onChange={handleLoadGame}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default GameMenu;