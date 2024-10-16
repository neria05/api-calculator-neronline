import React from 'react';

interface CategoryTabsProps {
  category: string;
  setCategory: (category: string) => void;}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ category, setCategory }) => {
  const categories = [
    { id: 'text', label: 'Text' },
    { id: 'image', label: 'Image' },
    { id: 'audio', label: 'Audio' },
    { id: 'embedding', label: 'Embedding' },
    { id: 'finetuning', label: 'Fine-tuning' },
    { id: 'assistants', label: 'Assistants' },
    { id: 'realtime', label: 'Realtime' },
  ];

  return (
    <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
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
  );
};

export default CategoryTabs;