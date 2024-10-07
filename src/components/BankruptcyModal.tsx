import React from 'react';
import Modal from './Modal';

interface BankruptcyModalProps {
  isOpen: boolean;
  onAction: (action: 'mainMenu' | 'retry') => void;
}

const BankruptcyModal: React.FC<BankruptcyModalProps> = ({ isOpen, onAction }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Bankruptcy!">
      <div className="space-y-4">
        <p className="text-lg">
          Your company has gone bankrupt. What would you like to do?
        </p>
        <button
          onClick={() => onAction('mainMenu')}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Return to Main Menu
        </button>
        <button
          onClick={() => onAction('retry')}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Restart from Company Setup
        </button>
      </div>
    </Modal>
  );
};

export default BankruptcyModal;