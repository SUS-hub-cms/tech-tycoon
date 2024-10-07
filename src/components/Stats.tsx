import React from 'react';
import { DollarSign, Brain, Calendar } from 'lucide-react';

interface StatsProps {
  money: number;
  researchPoints: number;
  gameDate: Date;
}

const Stats: React.FC<StatsProps> = ({ money, researchPoints, gameDate }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
        <DollarSign className="w-5 h-5 text-green-500 mr-2" />
        <span className="font-semibold">${money.toLocaleString()}</span>
      </div>
      <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
        <Brain className="w-5 h-5 text-blue-500 mr-2" />
        <span className="font-semibold">{researchPoints.toLocaleString()} RP</span>
      </div>
      <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
        <Calendar className="w-5 h-5 text-yellow-500 mr-2" />
        <span className="font-semibold">{gameDate.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Stats;