import React from 'react';
import { ProductionItem } from '../types';

interface ProductionQueueProps {
  queue: ProductionItem[];
}

const ProductionQueue: React.FC<ProductionQueueProps> = ({ queue }) => {
  return (
    <div className="mt-8 mb-8 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Production Queue</h2>
      {queue.length === 0 ? (
        <p>No items in production.</p>
      ) : (
        <div className="space-y-4">
          {queue.map((item, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-400 mb-1">Type: {item.product.type}</p>
              <p className="text-sm text-gray-400 mb-1">Copies: {item.copies}</p>
              <p className="text-sm text-gray-400 mb-1">Price: ${item.price}</p>
              <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(item.progress / item.totalTime) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Progress: {Math.round((item.progress / item.totalTime) * 100)}% 
                ({item.progress}s / {item.totalTime}s)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductionQueue;