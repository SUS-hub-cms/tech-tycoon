import React from 'react';
import { Cpu, Upload } from 'lucide-react';
import { GameState } from '../types';

interface GameMenuProps {
  onStartNewGame: () => void;
  onLoadGame: (loadedState: GameState) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartNewGame, onLoadGame }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedState = JSON.parse(e.target?.result as string) as GameState;
          onLoadGame(loadedState);
        } catch (error) {
          console.error('Error loading game:', error);
          alert('Error loading game. Please try again with a valid save file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-8">Hardware Tycoon</h1>
      <div className="space-y-4">
        <button
          onClick={onStartNewGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors duration-200 flex items-center"
        >
          <Cpu className="mr-2" /> Start New Game
        </button>
        <label className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors duration-200 flex items-center justify-center cursor-pointer">
          <Upload className="mr-2" /> Load Game
          <input type="file" onChange={handleFileUpload} className="hidden" accept=".json" />
        </label>
      </div>
    </div>
  );
};

export default GameMenu;