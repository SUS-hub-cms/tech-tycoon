import React from 'react';
import { DollarSign, Brain } from 'lucide-react';

interface StatsProps {
  money: number;
  researchPoints: number;
}

const Stats: React.FC<StatsProps> = ({ money, researchPoints }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
        <DollarSign className="w-5 h-5 text-green-500 mr-2" />
        <span className="font-semibold">${money}</span>
      </div>
      <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
        <Brain className="w-5 h-5 text-blue-500 mr-2" />
        <span className="font-semibold">{researchPoints} RP</span>
      </div>
    </div>
  );
};

export default Stats;