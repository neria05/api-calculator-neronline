import React from 'react';
import TokenInput from './TokenInput';

interface InputSectionProps {
  category: string;
  model: string;
  inputTokens: number;
  setInputTokens: (value: number) => void;
  outputTokens: number;
  setOutputTokens: (value: number) => void;
  trainingTokens: number;
  setTrainingTokens: (value: number) => void;
  imageCount: number;
  setImageCount: (value: number) => void;
  minutes: number;
  setMinutes: (value: number) => void;
  characters: number;
  setCharacters: (value: number) => void;
  sessions: number;
  setSessions: (value: number) => void;
  gbPerDay: number;
  setGbPerDay: (value: number) => void;
  resolution: string;
  setResolution: (value: string) => void;
  isBatchAPI: boolean;
  setIsBatchAPI: (value: boolean) => void;
  apiCalls: number;
  setApiCalls: (value: number) => void;
  includeVision: boolean;
  setIncludeVision: (value: boolean) => void;
  isAudioInput: boolean;
  setIsAudioInput: (value: boolean) => void;
  isAudioOutput: boolean;
  setIsAudioOutput: (value: boolean) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  category,
  model,
  inputTokens,
  setInputTokens,
  outputTokens,
  setOutputTokens,
  trainingTokens,
  setTrainingTokens,
  imageCount,
  setImageCount,
  minutes,
  setMinutes,
  characters,
  setCharacters,
  sessions,
  setSessions,
  gbPerDay,
  setGbPerDay,
  resolution,
  setResolution,
  isBatchAPI,
  setIsBatchAPI,
  apiCalls,
  setApiCalls,
  includeVision,
  setIncludeVision,
  isAudioInput,
  setIsAudioInput,
  isAudioOutput,
  setIsAudioOutput,
}) => {
  return (
    <>
      <TokenInput label="Number of API Calls" value={apiCalls} onChange={setApiCalls} />
      {(category === 'text' || category === 'realtime') && (
        <>
          <TokenInput label="Input Tokens" value={inputTokens} onChange={setInputTokens} />
          <TokenInput label="Output Tokens" value={outputTokens} onChange={setOutputTokens} />
          {category === 'text' && model.startsWith('gpt-4o') && (
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeVision}
                  onChange={(e) => setIncludeVision(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Include Vision</span>
              </label>
            </div>
          )}
          {category === 'text' && includeVision && (
            <div className="mb-4">
              <label htmlFor="resolution" className="block text-sm font-medium text-gray-700 mb-1">
                Image Resolution
              </label>
              <select
                id="resolution"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
                <option value="1024x1792">1024x1792</option>
                <option value="1792x1024">1792x1024</option>
              </select>
            </div>
          )}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isBatchAPI}
                onChange={(e) => setIsBatchAPI(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Use Batch API (50% discount)</span>
            </label>
          </div>
        </>
      )}
      {category === 'image' && (
        <TokenInput label="Number of Images" value={imageCount} onChange={setImageCount} />
      )}
      {category === 'audio' && (
        <>
          {model === 'whisper' && (
            <TokenInput label="Minutes" value={minutes} onChange={setMinutes} />
          )}
          {['tts', 'tts-hd'].includes(model) && (
            <TokenInput label="Characters" value={characters} onChange={setCharacters} />
          )}
        </>
      )}
      {category === 'embedding' && (
        <TokenInput label="Input Tokens" value={inputTokens} onChange={setInputTokens} />
      )}
      {category === 'finetuning' && (
        <>
          <TokenInput label="Input Tokens" value={inputTokens} onChange={setInputTokens} />
          <TokenInput label="Output Tokens" value={outputTokens} onChange={setOutputTokens} />
          <TokenInput label="Training Tokens" value={trainingTokens} onChange={setTrainingTokens} />
        </>
      )}
      {category === 'assistants' && (
        <>
          <TokenInput label="Input Tokens" value={inputTokens} onChange={setInputTokens} />
          <TokenInput label="Output Tokens" value={outputTokens} onChange={setOutputTokens} />
          {model === 'assistants-code-interpreter' && (
            <TokenInput label="Sessions" value={sessions} onChange={setSessions} />
          )}
          {model === 'assistants-file-search' && (
            <TokenInput label="GB per Day" value={gbPerDay} onChange={setGbPerDay} />
          )}
        </>
      )}
      {category === 'realtime' && (
        <>
          <TokenInput label="Minutes" value={minutes} onChange={setMinutes} />
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAudioInput}
                onChange={(e) => setIsAudioInput(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Audio Input</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAudioOutput}
                onChange={(e) => setIsAudioOutput(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Audio Output</span>
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default InputSection;