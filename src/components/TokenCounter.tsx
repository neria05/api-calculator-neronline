import React, { useState, useEffect } from 'react';
import { encode } from 'gpt-tokenizer';

interface TokenCounterProps {
  setInputTokens: (tokens: number) => void;
  setOutputTokens: (tokens: number) => void;
}

const TokenCounter: React.FC<TokenCounterProps> = ({ setInputTokens, setOutputTokens }) => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  const countTokens = (input: string) => {
    const tokens = encode(input).length;
    setInputTokens(tokens);
    setOutputTokens(Math.round(tokens * 1.5));
  };

  return (
    <div className="mt-3 sm:mt-4">
      <label htmlFor="token-counter" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
        סופר טוקנים
      </label>
      <textarea
        id="token-counter"
        rows={4}
        className="w-full p-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="הדבק את הטקסט שלך כאן כדי לספור טוקנים..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          countTokens(e.target.value);
        }}
      ></textarea>
      <p className="mt-1 text-xs sm:text-sm text-gray-500">
        מספר מילים: {wordCount}
      </p>
      <p className="mt-1 text-xs sm:text-sm text-gray-500">
        טוקנים משוערים: {encode(text).length} (קלט), {Math.round(encode(text).length * 1.5)} (פלט)
      </p>
    </div>
  );
};

export default TokenCounter;