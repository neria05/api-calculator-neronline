import React from 'react';

interface TokenInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        id={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min="0"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default TokenInput;