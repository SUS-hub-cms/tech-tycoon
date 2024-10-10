import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { CreatedProduct } from '../types';
import { Cpu, Monitor } from 'lucide-react';

interface ProductCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProduct: (product: CreatedProduct) => void;
}

const ProductCreationModal: React.FC<ProductCreationModalProps> = ({ isOpen, onClose, onCreateProduct }) => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState<'CPU' | 'GPU'>('CPU');
  const [productSubtype, setProductSubtype] = useState('');
  const [productTier, setProductTier] = useState<'Basic' | 'Enhanced' | 'Enhanced 2' | 'Enhanced 3'>('Basic');
  const [productSpecs, setProductSpecs] = useState({
    // CPU specs
    cores: 1,
    threads: 1,
    baseFrequency: 1,
    turboFrequency: 1,
    powerUsage: 50,
    caches: 1,
    // GPU specs
    baseClock: 500,
    boostClock: 750,
    memoryClock: 1000,
    memorySize: 1,
    memoryType: 'GDDR2X',
    directX: '9',
    vulkan: '0.2',
    openGL: '1.0',
  });
  const [productPrice, setProductPrice] = useState(100);

  useEffect(() => {
    // Reset specs when product type or tier changes
    setProductSpecs(getDefaultSpecs(productType, productTier));
  }, [productType, productTier]);

  const getDefaultSpecs = (type: 'CPU' | 'GPU', tier: 'Basic' | 'Enhanced' | 'Enhanced 2' | 'Enhanced 3') => {
    const defaultSpecs = {
      cores: 1,
      threads: 2,
      baseFrequency: 1,
      turboFrequency: 1.5,
      powerUsage: 50,
      caches: 2,
      baseClock: 1000,
      boostClock: 1500,
      memoryClock: 1500,
      memorySize: 2,
      memoryType: 'GDDR2X',
      directX: '9',
      vulkan: '0.2',
      openGL: '1.0',
    };

    if (type === 'CPU') {
      switch (tier) {
        case 'Basic':
          return { ...defaultSpecs, cores: 1, threads: 2, baseFrequency: 1, turboFrequency: 1.5, powerUsage: 50, caches: 2 };
        case 'Enhanced':
          return { ...defaultSpecs, cores: 2, threads: 4, baseFrequency: 1.5, turboFrequency: 2, powerUsage: 80, caches: 3 };
        case 'Enhanced 2':
          return { ...defaultSpecs, cores: 4, threads: 8, baseFrequency: 2, turboFrequency: 2.5, powerUsage: 120, caches: 5 };
        case 'Enhanced 3':
          return { ...defaultSpecs, cores: 8, threads: 16, baseFrequency: 2.5, turboFrequency: 3, powerUsage: 150, caches: 8 };
      }
    } else {
      switch (tier) {
        case 'Basic':
          return { ...defaultSpecs, baseClock: 1000, boostClock: 1500, memoryClock: 1500, memorySize: 2, memoryType: 'GDDR2X', directX: '9', vulkan: '0.2', openGL: '1.0' };
        case 'Enhanced':
          return { ...defaultSpecs, baseClock: 1500, boostClock: 2000, memoryClock: 2000, memorySize: 4, memoryType: 'GDDR3', directX: '9.5', vulkan: '0.3', openGL: '1.3.5' };
        case 'Enhanced 2':
          return { ...defaultSpecs, baseClock: 2000, boostClock: 2500, memoryClock: 2500, memorySize: 6, memoryType: 'GDDR4', directX: '10', vulkan: '0.5', openGL: '2.0' };
        case 'Enhanced 3':
          return { ...defaultSpecs, baseClock: 2500, boostClock: 3000, memoryClock: 3000, memorySize: 8, memoryType: 'GDDR5', directX: '11', vulkan: '1.0', openGL: '3.0' };
      }
    }
    return defaultSpecs;
  };

  const handleCreateProduct = () => {
    const newProduct: CreatedProduct = {
      id: Date.now().toString(),
      name: productName,
      type: productType,
      subtype: productSubtype,
      level: productTier,
      createdName: productName,
      copies: 1,
      cost: 100, // This should be calculated based on specs
      researchCost: 50, // This should be calculated based on specs
      researchPoints: 10, // This should be calculated based on specs
      isResearched: true,
      productionTime: 10, // This should be calculated based on specs
      moneyPerCopy: productPrice,
      researchPointsPerCopy: 0.1, // This should be calculated based on specs
      price: productPrice,
      specs: productSpecs,
    };

    onCreateProduct(newProduct);
    onClose();
  };

  const renderSpecInputs = () => {
    if (productType === 'CPU') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Cores</label>
            <input
              type="number"
              value={productSpecs.cores}
              onChange={(e) => setProductSpecs({ ...productSpecs, cores: Math.min(parseInt(e.target.value), getTierLimit('cores')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Threads</label>
            <input
              type="number"
              value={productSpecs.threads}
              onChange={(e) => setProductSpecs({ ...productSpecs, threads: Math.min(parseInt(e.target.value), getTierLimit('threads')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Base Frequency (GHz)</label>
            <input
              type="number"
              step="0.1"
              value={productSpecs.baseFrequency}
              onChange={(e) => setProductSpecs({ ...productSpecs, baseFrequency: Math.min(parseFloat(e.target.value), getTierLimit('baseFrequency')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Turbo Frequency (GHz)</label>
            <input
              type="number"
              step="0.1"
              value={productSpecs.turboFrequency}
              onChange={(e) => setProductSpecs({ ...productSpecs, turboFrequency: Math.min(parseFloat(e.target.value), getTierLimit('turboFrequency')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Power Usage (W)</label>
            <input
              type="number"
              value={productSpecs.powerUsage}
              onChange={(e) => setProductSpecs({ ...productSpecs, powerUsage: Math.min(parseInt(e.target.value), getTierLimit('powerUsage')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Caches (MB)</label>
            <input
              type="number"
              value={productSpecs.caches}
              onChange={(e) => setProductSpecs({ ...productSpecs, caches: Math.min(parseInt(e.target.value), getTierLimit('caches')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Base Clock (MHz)</label>
            <input
              type="number"
              value={productSpecs.baseClock}
              onChange={(e) => setProductSpecs({ ...productSpecs, baseClock: Math.min(parseInt(e.target.value), getTierLimit('baseClock')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Boost Clock (MHz)</label>
            <input
              type="number"
              value={productSpecs.boostClock}
              onChange={(e) => setProductSpecs({ ...productSpecs, boostClock: Math.min(parseInt(e.target.value), getTierLimit('boostClock')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Memory Clock (MHz)</label>
            <input
              type="number"
              value={productSpecs.memoryClock}
              onChange={(e) => setProductSpecs({ ...productSpecs, memoryClock: Math.min(parseInt(e.target.value), getTierLimit('memoryClock')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Memory Size (GB)</label>
            <input
              type="number"
              value={productSpecs.memorySize}
              onChange={(e) => setProductSpecs({ ...productSpecs, memorySize: Math.min(parseInt(e.target.value), getTierLimit('memorySize')) })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Memory Type</label>
            <select
              value={productSpecs.memoryType}
              onChange={(e) => setProductSpecs({ ...productSpecs, memoryType: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              {getTierLimit('memoryType').map((type: string) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">DirectX</label>
            <select
              value={productSpecs.directX}
              onChange={(e) => setProductSpecs({ ...productSpecs, directX: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              {getTierLimit('directX').map((version: string) => (
                <option key={version} value={version}>DirectX {version}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Vulkan</label>
            <select
              value={productSpecs.vulkan}
              onChange={(e) => setProductSpecs({ ...productSpecs, vulkan: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              {getTierLimit('vulkan').map((version: string) => (
                <option key={version} value={version}>Vulkan {version}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">OpenGL</label>
            <select
              value={productSpecs.openGL}
              onChange={(e) => setProductSpecs({ ...productSpecs, openGL: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              {getTierLimit('openGL').map((version: string) => (
                <option key={version} value={version}>OpenGL {version}</option>
              ))}
            </select>
          </div>
        </div>
      );
    }
  };

  const getTierLimit = (spec: string) => {
    const limits = {
      CPU: {
        Basic: { cores: 2, threads: 4, baseFrequency: 2, turboFrequency: 2.5, powerUsage: 120, caches: 4 },
        Enhanced: { cores: 4, threads: 16, baseFrequency: 2.3, turboFrequency: 2.9, powerUsage: 130, caches: 5 },
        'Enhanced 2': { cores: 8, threads: 32, baseFrequency: 3, turboFrequency: 3.5, powerUsage: 200, caches: 8 },
        'Enhanced 3': { cores: 16, threads: 64, baseFrequency: 3.5, turboFrequency: 5, powerUsage: 250, caches: 12 },
      },
      GPU: {
        Basic: { baseClock: 1500, boostClock: 2300, memoryClock: 2000, memorySize: 4, memoryType: ['GDDR2X', 'GDDR3'], directX: ['9'], vulkan: ['0.2', '0.3', '0.3.55'], openGL: ['1.0', '1.2', '1.3.5'] },
        Enhanced: { baseClock: 2000, boostClock: 3000, memoryClock: 2800, memorySize: 6, memoryType: ['GDDR2X', 'GDDR3', 'GDDR3X', 'GDDR4'], directX: ['9', '9.5', '10'], vulkan: ['0.2', '0.3', '0.3.55', '0.5'], openGL: ['1.0', '1.2', '1.3.5', '1.3.8', '1.5'] },
        'Enhanced 2': { baseClock: 3200, boostClock: 4800, memoryClock: 3500, memorySize: 8, memoryType: ['GDDR2X', 'GDDR3', 'GDDR3X', 'GDDR4', 'GDDR4X', 'GDDR5'], directX: ['9', '10', '11'], vulkan: ['0.2', '0.3', '0.3.55', '0.5', '0.8.2'], openGL: ['1.0', '1.2', '1.3.5', '1.3.8', '1.5', '2.0', '2.0.5', '3.0', '3.1.2'] },
        'Enhanced 3': { baseClock: 4000, boostClock: 5000, memoryClock: 5000, memorySize: 32, memoryType: ['GDDR2X', 'GDDR3', 'GDDR3X', 'GDDR4', 'GDDR4X', 'GDDR5', 'GDDR5X'], directX: ['9', '10', '11', '12'], vulkan: ['0.2', '0.3', '0.3.55', '0.5', '1.0', '1.2.1'], openGL: ['1.0', '1.2', '1.3.5', '1.3.8', '1.5', '2.0', '2.1.2', '2.5', '3.0', '3.5.1'] },
      },
    };

    return (limits[productType] as any)[productTier][spec];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Product">
      <div className="space-y-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setProductType('CPU')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${productType === 'CPU' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            <Cpu className="mr-2" /> CPU
          </button>
          <button
            onClick={() => setProductType('GPU')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${productType === 'GPU' ? 'bg-green-600' : 'bg-gray-700'}`}
          >
            <Monitor className="mr-2" /> GPU
          </button>
        </div>

        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Subtype</label>
            <select
              value={productSubtype}
              onChange={(e) => setProductSubtype(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              {productType === 'CPU' ? (
                <>
                  <option value="AI">AI</option>
                  <option value="Laptop">Laptop</option>
                  <option value="PC">PC</option>
                </>
              ) : (
                <>
                  <option value="Dedicated">Dedicated</option>
                  <option value="Integrated">Integrated</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Graphics">Graphics</option>
                  <option value="AI">AI</option>
                </>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tier</label>
            <select
              value={productTier}
              onChange={(e) => setProductTier(e.target.value as 'Basic' | 'Enhanced' | 'Enhanced 2' | 'Enhanced 3')}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
            >
              <option value="Basic">Basic</option>
              <option value="Enhanced">Enhanced</option>
              <option value="Enhanced 2">Enhanced 2</option>
              <option value="Enhanced 3">Enhanced 3</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4">
          <h3 className="text-lg font-semibold mb-2">Specifications</h3>
          {renderSpecInputs()}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Product Price</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
          />
        </div>

        <button
          onClick={handleCreateProduct}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Create Product
        </button>
      </div>
    </Modal>
  );
};  
  export default ProductCreationModal;