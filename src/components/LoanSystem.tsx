import React, { useState } from 'react';
import { Loan } from '../types';

interface LoanSystemProps {
  loans: Loan[];
  onLoanTaken: (loan: Loan) => void;
  onLoanPayment: (loanIndex: number, paymentAmount: number) => void;
  playerMoney: number;
}

const LoanSystem: React.FC<LoanSystemProps> = ({ loans, onLoanTaken, onLoanPayment, playerMoney }) => {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [selectedInterestRate, setSelectedInterestRate] = useState(5);

  const loanAmounts = [1000, 5000, 10000, 20000, 30000, 50000];
  const interestRates = [
    { rate: 5, days: 30 },
    { rate: 10, days: 20 },
    { rate: 15, days: 10 },
  ];

  const handleTakeLoan = () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interestRates.find(r => r.rate === selectedInterestRate)!.days);

    const newLoan: Loan = {
      amount: selectedAmount,
      interestRate: selectedInterestRate,
      dueDate,
      remainingAmount: selectedAmount * (1 + selectedInterestRate / 100),
    };

    onLoanTaken(newLoan);
  };

  const handlePayLoan = (loanIndex: number) => {
    const loan = loans[loanIndex];
    const maxPayment = Math.min(playerMoney, loan.remainingAmount);
    const paymentAmount = parseFloat(prompt(`Enter payment amount (max $${maxPayment.toFixed(2)}):`) || '0');

    if (paymentAmount > 0 && paymentAmount <= maxPayment) {
      onLoanPayment(loanIndex, paymentAmount);
    } else {
      alert('Invalid payment amount');
    }
  };

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Loan System</h2>
      <div className="mb-4">
        <label className="block mb-2">Loan Amount:</label>
        <select
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg"
        >
          {loanAmounts.map((amount) => (
            <option key={amount} value={amount}>
              ${amount}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Interest Rate:</label>
        <select
          value={selectedInterestRate}
          onChange={(e) => setSelectedInterestRate(Number(e.target.value))}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg"
        >
          {interestRates.map(({ rate, days }) => (
            <option key={rate} value={rate}>
              {rate}% ({days} days)
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleTakeLoan}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 mb-4"
      >
        Take Loan
      </button>
      <h3 className="text-xl font-semibold mb-2">Active Loans:</h3>
      {loans.length === 0 ? (
        <p>No active loans</p>
      ) : (
        <ul className="space-y-2">
          {loans.map((loan, index) => (
            <li key={index} className="bg-gray-700 p-3 rounded-lg">
              <p>Amount: ${loan.amount}</p>
              <p>Interest Rate: {loan.interestRate}%</p>
              <p>Due Date: {loan.dueDate.toLocaleDateString()}</p>
              <p>Remaining: ${loan.remainingAmount.toFixed(2)}</p>
              <button
                onClick={() => handlePayLoan(index)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Make Payment
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoanSystem;