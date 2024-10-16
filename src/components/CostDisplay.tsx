import React from 'react';

interface CostDisplayProps {
  cost: number;
}

const CostDisplay: React.FC<CostDisplayProps> = ({ cost }) => {
  return (
    <div className="mt-6 bg-blue-100 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-blue-800 mb-2">עלות משוערת</h2>
      <p className="text-3xl font-bold text-blue-600">${cost.toFixed(6)}</p>
    </div>
  );
};

export default CostDisplay;