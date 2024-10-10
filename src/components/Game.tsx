import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Product, CreatedProduct, Loan } from '../types';
import ProductList from './ProductList';
import Stats from './Stats';
import ProductionQueue from './ProductionQueue';
import CreatedProductList from './CreatedProductList';
import BankSystem from './BankSystem';
import { upgradeProduct } from '../data/products';
import SaveGame from './SaveGame';
import Modal from './Modal';
import ProductCreationModal from './ProductCreationModal';
import { Building2, Cpu, Monitor, Package, PlusCircle } from 'lucide-react';

interface GameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onBankruptcy: (action: 'mainMenu' | 'retry') => void;
}

const Game: React.FC<GameProps> = ({ gameState, setGameState, onBankruptcy }) => {
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCreatedProductsModal, setShowCreatedProductsModal] = useState(false);
  const [showProductCreationModal, setShowProductCreationModal] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const moveX = (clientX - innerWidth / 2) / innerWidth * 20;
        const moveY = (clientY - innerHeight / 2) / innerHeight * 20;
        backgroundRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState((prevState) => {
        const currentDate = prevState.gameDate instanceof Date ? prevState.gameDate : new Date(prevState.gameDate);
        return {
          ...prevState,
          gameDate: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Add one day
        };
      });
    }, 1000); // Update every second
  
    return () => clearInterval(timer);
  }, [setGameState]);

  const handleResearch = useCallback((product: Product) => {
    setGameState((prevState) => {
      if (prevState.researchPoints >= product.researchPoints && prevState.money >= product.researchCost) {
        const updatedProducts = prevState.products.map((p) =>
          p.id === product.id ? { ...p, isResearched: true } : p
        );
        return {
          ...prevState,
          products: updatedProducts,
          researchPoints: prevState.researchPoints - product.researchPoints,
          money: prevState.money - product.researchCost,
        };
      }
      return prevState;
    });
  }, [setGameState]);

  const handleUpgrade = useCallback((product: Product) => {
    setGameState((prevState) => {
      const upgradedProduct = upgradeProduct(product);
      const updatedProducts = prevState.products.map((p) =>
        p.id === product.id ? upgradedProduct : p
      );
      return {
        ...prevState,
        products: updatedProducts,
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
      loan.remainingAmount -= paymentAmount;
      if (loan.remainingAmount <= 0) {
        updatedLoans.splice(loanIndex, 1);
      }
      return {
        ...prevState,
        money: prevState.money - paymentAmount,
        loans: updatedLoans,
      };
    });
  }, [setGameState]);

  const handleCreateProduct = useCallback((newProduct: CreatedProduct) => {
    setGameState((prevState) => ({
      ...prevState,
      createdProducts: [...prevState.createdProducts, newProduct],
    }));
    setShowProductCreationModal(false);
  }, [setGameState]);

  const handleUpgradeCreatedProduct = useCallback((product: CreatedProduct) => {
    // Implement upgrade logic for created products
    console.log('Upgrading created product:', product);
  }, []);

  const handleRemakeCreatedProduct = useCallback((product: CreatedProduct) => {
    // Implement remake logic for created products
    console.log('Remaking created product:', product);
  }, []);

  const renderCompanyLogo = () => {
    if (gameState.companyLogo === 'cpu') {
      return <Cpu className="w-10 h-10 text-blue-500" />;
    } else if (gameState.companyLogo === 'gpu') {
      return <Monitor className="w-10 h-10 text-green-500" />;
    } else if (gameState.companyLogo) {
      return <img src={gameState.companyLogo} alt="Company Logo" className="w-10 h-10 object-contain" />;
    }
    return null;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 transition-transform duration-300 ease-out"
        style={{ transform: 'translate(0, 0)' }}
      ></div>
      <div className="relative z-10 container mx-auto p-4 text-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {renderCompanyLogo()}
            <h1 className="text-3xl font-bold ml-2">{gameState.companyName}</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowCreatedProductsModal(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors duration-200"
              title="Created Products"
            >
              <Package size={24} />
            </button>
            <button
              onClick={() => setShowBankModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200 transform hover:scale-105"
              title="Bank"
            >
              <Building2 size={24} />
            </button>
            <SaveGame gameState={gameState} />
          </div>
        </div>
        <Stats
          money={gameState.money}
          researchPoints={gameState.researchPoints}
          gameDate={gameState.gameDate}
        />
        <ProductionQueue queue={gameState.productionQueue} />
        <ProductList
          products={gameState.products}
          onResearch={handleResearch}
          onUpgrade={handleUpgrade}
        />
        <Modal isOpen={showBankModal} onClose={() => setShowBankModal(false)} title="Bank">
          <BankSystem
            loans={gameState.loans}
            onLoanTaken={handleLoanTaken}
            onLoanPayment={handleLoanPayment}
            playerMoney={gameState.money}
            currentDate={gameState.gameDate}
          />
        </Modal>
        <Modal isOpen={showCreatedProductsModal} onClose={() => setShowCreatedProductsModal(false)} title="Created Products">
          <CreatedProductList
            createdProducts={gameState.createdProducts}
            onUpgrade={handleUpgradeCreatedProduct}
            onRemake={handleRemakeCreatedProduct}
          />
        </Modal>
        <ProductCreationModal
          isOpen={showProductCreationModal}
          onClose={() => setShowProductCreationModal(false)}
          onCreateProduct={handleCreateProduct}
        />
        <button
          onClick={() => setShowProductCreationModal(true)}
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
          title="Create New Product"
        >
          <PlusCircle size={32} />
        </button>
      </div>
    </div>
  );
};

export default Game;