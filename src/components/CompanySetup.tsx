import React, { useState } from 'react';
import { Cpu, Monitor, Smartphone } from 'lucide-react';

interface CompanySetupProps {
  onSetupComplete: (name: string, logo: string) => void;
}

const CompanySetup: React.FC<CompanySetupProps> = ({ onSetupComplete }) => {
  const [companyName, setCompanyName] = useState('');
  const [selectedLogo, setSelectedLogo] = useState('');

  const logos = [
    { icon: Cpu, name: 'CPU' },
    { icon: Monitor, name: 'GPU' },
    { icon: Smartphone, name: 'Smartphone' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName && selectedLogo) {
      onSetupComplete(companyName, selectedLogo);
    } else {
      alert('Please enter a company name and select a logo.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-8">Set Up Your Company</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
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
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Logo</label>
          <div className="grid grid-cols-3 gap-4">
            {logos.map(({ icon: Icon, name }) => (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedLogo(name)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                  selectedLogo === name ? 'bg-blue-500' : 'bg-gray-700'
                } hover:bg-blue-600 transition-colors duration-200`}
              >
                <Icon className="w-12 h-12 mb-2" />
                <span>{name}</span>
              </button>
            ))}
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