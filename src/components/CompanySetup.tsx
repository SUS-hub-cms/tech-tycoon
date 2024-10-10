import React, { useState, useRef } from 'react';
import { Cpu, Monitor, Upload } from 'lucide-react';

interface CompanySetupProps {
  onSetupComplete: (setup: CompanySetup) => void;
}

export interface CompanySetup {
  name: string;
  logo: string;
  startYear: number;
  startBudget: number;
  difficulty: 'Easy' | 'Standard' | 'Hard';
}

const CompanySetup: React.FC<CompanySetupProps> = ({ onSetupComplete }) => {
  const [companyName, setCompanyName] = useState('');
  const [selectedLogo, setSelectedLogo] = useState('');
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [startYear, setStartYear] = useState(1970);
  const [startBudget, setStartBudget] = useState(5000);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Standard' | 'Hard'>('Standard');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedLogo(reader.result as string);
        setSelectedLogo('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetupComplete({
      name: companyName,
      logo: selectedLogo === 'upload' ? uploadedLogo || '' : selectedLogo,
      startYear,
      startBudget,
      difficulty,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Set Up Your Company</h2>
        
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Company Logo
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedLogo('cpu')}
              className={`p-4 rounded-lg flex flex-col items-center justify-center ${selectedLogo === 'cpu' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <Cpu className="w-8 h-8 mb-2" />
              <span className="text-sm">CPU</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedLogo('gpu')}
              className={`p-4 rounded-lg flex flex-col items-center justify-center ${selectedLogo === 'gpu' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <Monitor className="w-8 h-8 mb-2" />
              <span className="text-sm">GPU</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 rounded-lg flex flex-col items-center justify-center ${selectedLogo === 'upload' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm">Upload Logo</span>
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="startYear" className="block text-sm font-medium text-gray-300 mb-1">
              Start Year
            </label>
            <select
              id="startYear"
              value={startYear}
              onChange={(e) => setStartYear(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              {Array.from({ length: 54 }, (_, i) => 1970 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="startBudget" className="block text-sm font-medium text-gray-300 mb-1">
              Start Budget
            </label>
            <select
              id="startBudget"
              value={startBudget}
              onChange={(e) => setStartBudget(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              {[1000, 5000, 10000, 20000, 50000].map((budget) => (
                <option key={budget} value={budget}>${budget.toLocaleString()}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Standard' | 'Hard')}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Standard">Standard</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 text-lg font-semibold"
        >
          Start Your Company
        </button>
      </form>
    </div>
  );
};

export default CompanySetup;