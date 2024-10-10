import React from 'react';
import { DollarSign, Brain, Calendar } from 'lucide-react';

interface StatsProps {
  money: number;
  researchPoints: number;
  gameDate: Date | string;
}

const Stats: React.FC<StatsProps> = ({ money, researchPoints, gameDate }) => {
  const formatDate = (date: Date | string) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    } else if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    return 'Invalid Date';
  };

  return (
    <div className="flex space-x-4 mb-4">
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
        <span className="font-semibold">{formatDate(gameDate)}</span>
      </div>
    </div>
  );
};

export default Stats;
