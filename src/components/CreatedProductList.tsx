import React from 'react';
import { CreatedProduct } from '../types';
import { Cpu, Monitor } from 'lucide-react';

interface CreatedProductListProps {
  createdProducts: CreatedProduct[];
  onUpgrade: (product: CreatedProduct) => void;
  onRemake: (product: CreatedProduct) => void;
}

const CreatedProductList: React.FC<CreatedProductListProps> = ({ createdProducts, onUpgrade, onRemake }) => {
  const cpuProducts = createdProducts.filter(product => product.type === 'CPU');
  const gpuProducts = createdProducts.filter(product => product.type === 'GPU');

  const renderProductCard = (product: CreatedProduct) => (
    <div key={product.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{product.createdName}</h3>
      <p className="text-sm text-gray-400 mb-1">Type: {product.type}</p>
      <p className="text-sm text-gray-400 mb-1">Subtype: {product.subtype}</p>
      <p className="text-sm text-gray-400 mb-1">Level: {product.level}</p>
      <p className="text-sm text-gray-400 mb-1">Copies: {product.copies}</p>
      <p className="text-sm text-gray-400 mb-3">Production Time: {product.productionTime}s</p>
      <div className="flex space-x-2">
        {product.level !== 'Enhanced 3' && (
          <button
            onClick={() => onUpgrade(product)}
            className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
          >
            Upgrade
          </button>
        )}
        <button
          onClick={() => onRemake(product)}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Remake
        </button>
      </div>
    </div>
  );

  const renderCategory = (title: string, icon: React.ReactNode, categoryProducts: CreatedProduct[]) => (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-semibold ml-2">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryProducts.map(renderProductCard)}
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6">Created Products</h2>
      {renderCategory("CPUs", <Cpu className="w-6 h-6 text-blue-500" />, cpuProducts)}
      {renderCategory("GPUs", <Monitor className="w-6 h-6 text-green-500" />, gpuProducts)}
    </div>
  );
};

export default CreatedProductList;