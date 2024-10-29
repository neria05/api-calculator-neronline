import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CategoryTabsProps {
  category: string;
  setCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ category, setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: 'text', label: 'טקסט' },
    { id: 'image', label: 'תמונה' },
    { id: 'audio', label: 'אודיו' },
    { id: 'embedding', label: 'Embedding' },
    { id: 'finetuning', label: 'Fine-tuning' },
    { id: 'assistants', label: 'Assistants' },
    { id: 'realtime', label: 'Realtime' },
  ];

  const getCurrentLabel = () => {
    return categories.find(cat => cat.id === category)?.label;
  };

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="sm:hidden">
        <div className="text-sm font-medium text-gray-700 mb-2">
          בחר את סוג המחשבון:
        </div>
        <div className="relative rounded-xl bg-blue-900/20 p-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-white p-3 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">{getCurrentLabel()}</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`w-full text-right px-4 py-3 text-sm transition-colors ${
                    category === cat.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setCategory(cat.id);
                    setIsOpen(false);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ${
              category === cat.id
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryTabs;