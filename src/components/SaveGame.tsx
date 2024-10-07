import React from 'react';
import { GameState } from '../types';
import { Save } from 'lucide-react';

interface SaveGameProps {
  gameState: GameState;
}

const SaveGame: React.FC<SaveGameProps> = ({ gameState }) => {
  const handleSave = () => {
    const saveData = JSON.stringify(gameState);
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hardware_tycoon_save.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleSave}
      className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors duration-200"
      title="Save Game"
    >
      <Save size={24} />
    </button>
  );
};

export default SaveGame;