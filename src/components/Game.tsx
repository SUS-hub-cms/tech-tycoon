import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Product, ProductionItem, CreatedProduct, Loan } from '../types';
import ProductList from './ProductList';
import Stats from './Stats';
import ProductionQueue from './ProductionQueue';
import CreatedProductList from './CreatedProductList';
import BankSystem from './BankSystem';
import { upgradeProduct } from '../data/products';
import SaveGame from './SaveGame';
import Modal from './Modal';
import BankruptcyModal from './BankruptcyModal';
import { Building2, Save, Cpu, Monitor } from 'lucide-react';

interface GameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onBankruptcy: (action: 'mainMenu' | 'retry') => void;
}

const Game: React.FC<GameProps> = ({ gameState, setGameState, onBankruptcy }) => {
  const [isLoanReminderOpen, setIsLoanReminderOpen] = useState(false);
  const [currentLoanIndex, setCurrentLoanIndex] = useState(-1);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isCreatedProductsOpen, setIsCreatedProductsOpen] = useState(false);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!gameState.isBankrupt) {
        setGameState((prevState) => {
          const newDate = new Date(prevState.gameDate.getTime() + 24 * 60 * 60 * 1000); // Advance one day
          const updatedQueue = prevState.productionQueue.map((item) => {
            const newProgress = item.progress + 1;
            if (newProgress >= item.totalTime) {
              // Product is finished, add to created products
              const createdProduct: CreatedProduct = {
                ...item.product,
                createdName: item.name,
                copies: item.copies,
              };
              return null; // Remove from queue
            }
            return { ...item, progress: newProgress };
          }).filter(Boolean) as ProductionItem[];

          // Check for due loans
          const dueLoanIndex = prevState.loans.findIndex(loan => loan.dueDate <= newDate);
          if (dueLoanIndex !== -1) {
            setIsLoanReminderOpen(true);
            setCurrentLoanIndex(dueLoanIndex);
          }

          return {
            ...prevState,
            gameDate: newDate,
            productionQueue: updatedQueue,
            createdProducts: [
              ...prevState.createdProducts,
              ...updatedQueue
                .filter((item): item is ProductionItem => item !== null && item.progress >= item.totalTime)
                .map((item) => ({
                  ...item.product,
                  createdName: item.name,
                  copies: item.copies,
                })),
            ],
          };
        });
      }
    }, 1000); // Run every second to simulate a day passing

    return () => clearInterval(gameLoop);
  }, [setGameState, gameState.isBankrupt]);

  const handleResearch = useCallback((product: Product) => {
    setGameState((prevState) => {
      if (prevState.researchPoints >= product.researchCost) {
        const updatedProducts = prevState.products.map((p) =>
          p.id === product.id ? { ...p, isResearched: true } : p
        );
        return {
          ...prevState,
          products: updatedProducts,
          researchPoints: prevState.researchPoints - product.researchCost,
        };
      }
      return prevState;
    });
  }, [setGameState]);

  const handleProduce = useCallback((product: Product, name: string, copies: number) => {
    setGameState((prevState) => {
      const totalCost = product.cost * copies;
      if (prevState.money >= totalCost) {
        const newProductionItem: ProductionItem = {
          product,
          name,
          copies,
          progress: 0,
          totalTime: product.productionTime * copies,
        };
        return {
          ...prevState,
          money: prevState.money - totalCost,
          productionQueue: [...prevState.productionQueue, newProductionItem],
        };
      }
      return prevState;
    });
  }, [setGameState]);

  const handleUpgrade = useCallback((product: CreatedProduct) => {
    setGameState((prevState) => {
      const upgradedProduct = upgradeProduct(product);
      const updatedCreatedProducts = prevState.createdProducts.map((p) =>
        p.id === product.id ? upgradedProduct : p
      );
      return {
        ...prevState,
        createdProducts: updatedCreatedProducts,
      };
    });
  }, [setGameState]);

  const handleRemake = useCallback((product: CreatedProduct) => {
    setGameState((prevState) => {
      const newProductionItem: ProductionItem = {
        product,
        name: product.createdName,
        copies: product.copies,
        progress: 0,
        totalTime: product.productionTime * product.copies,
      };
      const updatedCreatedProducts = prevState.createdProducts.filter((p) => p.id !== product.id);
      return {
        ...prevState,
        createdProducts: updatedCreatedProducts,
        productionQueue: [...prevState.productionQueue, newProductionItem],
      };
    });
  }, [setGameState]);

  const handleLoanTaken = useCallback((loan: Loan) => {
    setGameState((prevState) => ({
      ...prevState,
      money: prevState.money + loan.amount,
      loans: [...prevState.loans, loan],
    }));
  }, [setGameState]);

  const handleLoanPayment = useCallback((loanIndex: number, paymentAmount: number) => {
    setGameState((prevState) => {
      const updatedLoans = [...prevState.loans];
      const loan = updatedLoans[loanIndex];
      if (loan) {
        loan.remainingAmount -= paymentAmount;
        if (loan.remainingAmount <= 0) {
          updatedLoans.splice(loanIndex, 1);
        }
        return {
          ...prevState,
          money: prevState.money - paymentAmount,
          loans: updatedLoans,
        };
      }
      return prevState;
    });
    setIsLoanReminderOpen(false);
  }, [setGameState]);

  const handlePayLater = useCallback(() => {
    setGameState((prevState) => {
      const updatedLoans = [...prevState.loans];
      const loan = updatedLoans[currentLoanIndex];
      if (loan) {
        loan.interestRate += 1;
        loan.payLaterCount += 1;
        loan.dueDate = new Date(loan.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days
        
        if (loan.payLaterCount >= 3) {
          return { ...prevState, loans: updatedLoans, isBankrupt: true, money: 0 };
        }
        
        return { ...prevState, loans: updatedLoans };
      }
      return prevState;
    });
    setIsLoanReminderOpen(false);
  }, [currentLoanIndex, setGameState]);

  const handleBankruptcyAction = useCallback((action: 'mainMenu' | 'retry') => {
    onBankruptcy(action);
  }, [onBankruptcy]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {gameState.companyLogo === 'CPU' ? (
            <Cpu className="w-10 h-10 text-blue-500 mr-2" />
          ) : gameState.companyLogo === 'GPU' ? (
            <Monitor className="w-10 h-10 text-green-500 mr-2" />
          ) : (
            <img src={gameState.companyLogo} alt="Company Logo" className="w-10 h-10 mr-2" />
          )}
          <h1 className="text-2xl font-bold">{gameState.companyName}</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsCreatedProductsOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200"
            title="View Created Products"
          >
            <Cpu size={24} />
          </button>
          <button
            onClick={() => setIsBankOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
            title="Open Bank"
          >
            <Building2 size={24} />
          </button>
          <SaveGame gameState={gameState} />
        </div>
      </div>
      
      <Stats money={gameState.money} researchPoints={gameState.researchPoints} gameDate={gameState.gameDate} />
      
      {/* Production Queue moved above the ProductList */}
      <ProductionQueue queue={gameState.productionQueue} />
      
      <ProductList products={gameState.products} onResearch={handleResearch} onProduce={handleProduce} />
      
      <Modal
        isOpen={isCreatedProductsOpen}
        onClose={() => setIsCreatedProductsOpen(false)}
        title="Created Products"
      >
        <CreatedProductList
          createdProducts={gameState.createdProducts}
          onUpgrade={handleUpgrade}
          onRemake={handleRemake}
        />
      </Modal>
      
      <Modal
        isOpen={isBankOpen}
        onClose={() => setIsBankOpen(false)}
        title="Bank System"
      >
        <BankSystem
          loans={gameState.loans}
          onLoanTaken={handleLoanTaken}
          onLoanPayment={handleLoanPayment}
          playerMoney={gameState.money}
          currentDate={gameState.gameDate}
        />
      </Modal>
      
      <Modal
        isOpen={isLoanReminderOpen}
        onClose={() => setIsLoanReminderOpen(false)}
        title="Loan Payment Reminder"
      >
        <div className="space-y-4">
          <p>A loan payment is due. What would you like to do?</p>
          <button
            onClick={handlePayLater}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
          >
            Pay Later (Interest rate will increase by 1%)
          </button>
          <button
            onClick={() => {
              const loan = gameState.loans[currentLoanIndex];
              if (loan) {
                handleLoanPayment(currentLoanIndex, loan.remainingAmount);
              }
            }}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Pay Now
          </button>
        </div>
      </Modal>

      <BankruptcyModal
        isOpen={gameState.isBankrupt}
        onAction={handleBankruptcyAction}
      />
    </div>
  );
};

export default Game;