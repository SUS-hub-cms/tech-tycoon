import React, { useState, useEffect } from 'react';
import { Loan } from '../types';

interface BankSystemProps {
  loans: Loan[];
  onLoanTaken: (loan: Loan) => void;
  onLoanPayment: (loanIndex: number, paymentAmount: number) => void;
  playerMoney: number;
  currentDate: Date;
}

const BankSystem: React.FC<BankSystemProps> = ({ loans, onLoanTaken, onLoanPayment, playerMoney, currentDate }) => {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [selectedInterestRate, setSelectedInterestRate] = useState(5);
  const [loanReminders, setLoanReminders] = useState<string[]>([]);

  const loanAmounts = [1000, 5000, 10000, 20000, 30000, 50000];
  const interestRates = [
    { rate: 5, days: 30 },
    { rate: 10, days: 20 },
    { rate: 15, days: 10 },
  ];

  useEffect(() => {
    const newReminders = loans.filter(loan => {
      const daysUntilDue = Math.ceil((loan.dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDue <= 3 && daysUntilDue > 0;
    }).map(loan => {
      const daysUntilDue = Math.ceil((loan.dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      return `Loan payment of $${loan.remainingAmount.toFixed(2)} due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}!`;
    });

    setLoanReminders(newReminders);
  }, [loans, currentDate]);

  const handleTakeLoan = () => {
    const dueDate = new Date(currentDate.getTime() + interestRates.find(r => r.rate === selectedInterestRate)!.days * 24 * 60 * 60 * 1000);

    const newLoan: Loan = {
      amount: selectedAmount,
      interestRate: selectedInterestRate,
      dueDate,
      remainingAmount: selectedAmount * (1 + selectedInterestRate / 100),
      payLaterCount: 0,
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
    <div className="space-y-4">
      {loanReminders.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Loan Payment Reminders:</p>
          <ul className="list-disc list-inside">
            {loanReminders.map((reminder, index) => (
              <li key={index}>{reminder}</li>
            ))}
          </ul>
        </div>
      )}
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

export default BankSystem;