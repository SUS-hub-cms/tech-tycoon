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

  const startYears = [1970, 1980, 1990, 2010, 2020, 2030];
  const budgets = [5000, 10000, 20000, 30000, 50000];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo(e.target?.result as string);
        setSelectedLogo('uploaded');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName && selectedLogo) {
      const setup: CompanySetup = {
        name: companyName,
        logo: uploadedLogo || selectedLogo,
        startYear,
        startBudget,
        difficulty,
      };
      onSetupComplete(setup);
    } else {
      alert('Please enter a company name and select a logo.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-4xl font-bold mb-8">Set Up Your Company</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Company Logo</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setSelectedLogo('CPU')}
              className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                selectedLogo === 'CPU' ? 'bg-blue-500' : 'bg-gray-700'
              } hover:bg-blue-600 transition-colors duration-200`}
            >
              <Cpu className="w-12 h-12 mb-2" />
              <span>CPU</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedLogo('GPU')}
              className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                selectedLogo === 'GPU' ? 'bg-blue-500' : 'bg-gray-700'
              } hover:bg-blue-600 transition-colors duration-200`}
            >
              <Monitor className="w-12 h-12 mb-2" />
              <span>GPU</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                selectedLogo === 'uploaded' ? 'bg-blue-500' : 'bg-gray-700'
              } hover:bg-blue-600 transition-colors duration-200`}
            >
              {uploadedLogo ? (
                <img src={uploadedLogo} alt="Uploaded logo" className="w-12 h-12 mb-2 object-contain" />
              ) : (
                <Upload className="w-12 h-12 mb-2" />
              )}
              <span>Upload Logo</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Year</label>
            <select
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
            >
              {startYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Start Budget</label>
            <select
              value={startBudget}
              onChange={(e) => setStartBudget(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
            >
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  ${budget.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Standard' | 'Hard')}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Standard">Standard</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors duration-200"
        >
          Start Your Company
        </button>
      </form>
    </div>
  );
};

export default CompanySetup;