import React from 'react';

interface ModelSelectorProps {
  category: string;
  model: string;
  setModel: (model: string) => void;
  assistantModel: string;
  setAssistantModel: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ category, model, setModel, assistantModel, setAssistantModel }) => {
  const modelOptions = {
    text: [
      { value: 'gpt-4o', label: 'GPT-4o' },
      { value: 'gpt-4o-2024-08-06', label: 'GPT-4o (2024-08-06)' },
      { value: 'gpt-4o-2024-05-13', label: 'GPT-4o (2024-05-13)' },
      { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
      { value: 'gpt-4o-mini-2024-07-18', label: 'GPT-4o mini (2024-07-18)' },
      { value: 'o1-preview', label: 'o1-preview' },
      { value: 'o1-preview-2024-09-12', label: 'o1-preview-2024-09-12' },
      { value: 'o1-mini', label: 'o1-mini' },
      { value: 'o1-mini-2024-09-12', label: 'o1-mini-2024-09-12' },
      { value: 'chatgpt-4o-latest', label: 'ChatGPT-4o (Latest)' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-4-turbo-2024-04-09', label: 'GPT-4 Turbo (2024-04-09)' },
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-4-32k', label: 'GPT-4 32k' },
      { value: 'gpt-4-0125-preview', label: 'GPT-4 0125 Preview' },
      { value: 'gpt-4-1106-preview', label: 'GPT-4 1106 Preview' },
      { value: 'gpt-4-vision-preview', label: 'GPT-4 Vision Preview' },
      { value: 'gpt-3.5-turbo-0125', label: 'GPT-3.5 Turbo 0125' },
      { value: 'gpt-3.5-turbo-instruct', label: 'GPT-3.5 Turbo Instruct' },
      { value: 'gpt-3.5-turbo-1106', label: 'GPT-3.5 Turbo 1106' },
      { value: 'gpt-3.5-turbo-0613', label: 'GPT-3.5 Turbo 0613' },
      { value: 'gpt-3.5-turbo-16k-0613', label: 'GPT-3.5 Turbo 16k 0613' },
      { value: 'gpt-3.5-turbo-0301', label: 'GPT-3.5 Turbo 0301' },
      { value: 'davinci-002', label: 'Davinci 002' },
      { value: 'babbage-002', label: 'Babbage 002' },
    ],
    image: [
      { value: 'dall-e-3-standard-1024', label: 'DALL-E 3 (Standard 1024x1024)' },
      { value: 'dall-e-3-standard-1792', label: 'DALL-E 3 (Standard 1024x1792 או 1792x1024)' },
      { value: 'dall-e-3-hd-1024', label: 'DALL-E 3 (HD 1024x1024)' },
      { value: 'dall-e-3-hd-1792', label: 'DALL-E 3 (HD 1024x1792 או 1792x1024)' },
      { value: 'dall-e-2-1024', label: 'DALL-E 2 (1024x1024)' },
      { value: 'dall-e-2-512', label: 'DALL-E 2 (512x512)' },
      { value: 'dall-e-2-256', label: 'DALL-E 2 (256x256)' },
    ],
    audio: [
      { value: 'whisper', label: 'Whisper' },
      { value: 'tts', label: 'TTS' },
      { value: 'tts-hd', label: 'TTS HD' },
    ],
    embedding: [
      { value: 'text-embedding-3-small', label: 'text-embedding-3-small' },
      { value: 'text-embedding-3-large', label: 'text-embedding-3-large' },
      { value: 'ada-v2', label: 'ada v2' },
    ],
    finetuning: [
      { value: 'gpt-4o-2024-08-06-ft', label: 'GPT-4o (2024-08-06) Fine-tuning' },
      { value: 'gpt-4o-mini-2024-07-18-ft', label: 'GPT-4o mini (2024-07-18) Fine-tuning' },
      { value: 'gpt-3.5-turbo-ft', label: 'GPT-3.5 Turbo Fine-tuning' },
      { value: 'davinci-002-ft', label: 'Davinci-002 Fine-tuning' },
      { value: 'babbage-002-ft', label: 'Babbage-002 Fine-tuning' },
    ],
    assistants: [
      { value: 'assistants-code-interpreter', label: 'Code Interpreter' },
      { value: 'assistants-file-search', label: 'File Search' },
    ],
    realtime: [
      { value: 'gpt-4o-realtime-preview', label: 'GPT-4o Realtime Preview' },
      { value: 'gpt-4o-realtime-preview-2024-10-01', label: 'GPT-4o Realtime Preview (2024-10-01)' },
    ],
  };

  return (
    <div className="mb-3 sm:mb-4">
      <label htmlFor="model" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
        בחר מודל
      </label>
      <select
        id="model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full p-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {modelOptions[category].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {category === 'assistants' && (
        <div className="mt-3 sm:mt-4">
          <label htmlFor="assistantModel" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            מודל שפה של Assistant
          </label>
          <select
            id="assistantModel"
            value={assistantModel}
            onChange={(e) => setAssistantModel(e.target.value)}
            className="w-full p-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {modelOptions.text.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;