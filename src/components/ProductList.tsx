import React, { useState } from 'react';
import { Product } from '../types';
import { Cpu, Monitor } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onResearch: (product: Product) => void;
  onProduce: (product: Product, name: string, copies: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onResearch, onProduce }) => {
  const [productName, setProductName] = useState('');
  const [productCopies, setProductCopies] = useState(1);

  const cpuProducts = products.filter(product => product.type === 'CPU');
  const gpuProducts = products.filter(product => product.type === 'GPU');

  const renderProductCard = (product: Product) => (
    <div key={product.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-sm text-gray-400 mb-1">Subtype: {product.subtype}</p>
      <p className="text-sm text-gray-400 mb-1">Level: {product.level}</p>
      <p className="text-sm text-gray-400 mb-1">Cost: ${product.cost}</p>
      <p className="text-sm text-gray-400 mb-1">Research Cost: ${product.researchCost}</p>
      <p className="text-sm text-gray-400 mb-1">Research Points: {product.researchPoints}</p>
      <p className="text-sm text-gray-400 mb-3">Production Time: {product.productionTime}s</p>
      {product.isResearched ? (
        <>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="w-full px-3 py-2 mb-2 bg-gray-700 rounded-lg text-white"
          />
          <input
            type="number"
            value={productCopies}
            onChange={(e) => setProductCopies(Math.min(250000000, Math.max(1, parseInt(e.target.value) || 1)))}
            min="1"
            max="250000000"
            className="w-full px-3 py-2 mb-2 bg-gray-700 rounded-lg text-white"
          />
          <button
            onClick={() => {
              onProduce(product, productName || product.name, productCopies);
              setProductName('');
              setProductCopies(1);
            }}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Produce
          </button>
        </>
      ) : (
        <button
          onClick={() => onResearch(product)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Research
        </button>
      )}
    </div>
  );

  const renderCategory = (title: string, icon: React.ReactNode, categoryProducts: Product[]) => (
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
    <div>
      {renderCategory("CPUs", <Cpu className="w-6 h-6 text-blue-500" />, cpuProducts)}
      {renderCategory("GPUs", <Monitor className="w-6 h-6 text-green-500" />, gpuProducts)}
    </div>
  );
};

export default ProductList;