import React from 'react';
import { GameState } from '../types';
import { Save } from 'lucide-react';

interface SaveGameProps {
  gameState: GameState;
}
const formatGameState = (state: GameState): any => {
  return {
    companyName: state.companyName,
    companyLogo: state.companyLogo,
    money: state.money,
    researchPoints: state.researchPoints,
    products: state.products.map(product => ({
      id: product.id,
      name: product.name,
      type: product.type,
      subtype: product.subtype,
      level: product.level,
      specs: product.specs,
      price: product.price,
      isResearched: product.isResearched,
      researchPoints: product.researchPoints,
      researchCost: product.researchCost,
    })),
    gameDate: state.gameDate.toISOString(),
    loans: state.loans,
    createdProducts: state.createdProducts,
    productionQueue: state.productionQueue,
  };
};

const SaveGame: React.FC<SaveGameProps> = ({ gameState }) => {
  const handleSave = () => {
    const formattedState = formatGameState(gameState);
    const saveData = JSON.stringify(formattedState, null, 2);
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


