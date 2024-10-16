import React, { useState, useEffect } from 'react';
import { Calculator, Github } from 'lucide-react';
import CategoryTabs from './components/CategoryTabs';
import ModelSelector from './components/ModelSelector';
import InputSection from './components/InputSection';
import CostDisplay from './components/CostDisplay';
import TokenCounter from './components/TokenCounter';
import { calculateCost } from './utils/costCalculator';

const App: React.FC = () => {
  const [category, setCategory] = useState('text');
  const [model, setModel] = useState('gpt-4o');
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(1500);
  const [trainingTokens, setTrainingTokens] = useState(10000);
  const [imageCount, setImageCount] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [characters, setCharacters] = useState(1000);
  const [sessions, setSessions] = useState(1);
  const [gbPerDay, setGbPerDay] = useState(1);
  const [resolution, setResolution] = useState('1024x1024');
  const [isBatchAPI, setIsBatchAPI] = useState(false);
  const [apiCalls, setApiCalls] = useState(1);
  const [includeVision, setIncludeVision] = useState(false);
  const [assistantModel, setAssistantModel] = useState('gpt-4o');
  const [isAudioInput, setIsAudioInput] = useState(false);
  const [isAudioOutput, setIsAudioOutput] = useState(false);

  useEffect(() => {
    // Set default model when category changes
    switch (category) {
      case 'text':
        setModel('gpt-4o');
        break;
      case 'image':
        setModel('dall-e-3-standard-1024');
        break;
      case 'audio':
        setModel('whisper');
        break;
      case 'embedding':
        setModel('text-embedding-3-small');
        break;
      case 'finetuning':
        setModel('gpt-4o-2024-08-06-ft');
        break;
      case 'assistants':
        setModel('assistants-code-interpreter');
        setAssistantModel('gpt-4o');
        break;
      case 'realtime':
        setModel('gpt-4o-realtime-preview');
        break;
    }
  }, [category]);

  const cost = calculateCost(
    model,
    inputTokens,
    outputTokens,
    isBatchAPI,
    trainingTokens,
    imageCount,
    minutes,
    characters,
    sessions,
    gbPerDay,
    resolution,
    apiCalls,
    includeVision,
    category === 'assistants' ? assistantModel : undefined,
    isAudioInput,
    isAudioOutput
  );

  return (
    <div className="min-h-screen bg-[#263238] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl rtl">
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 text-blue-600 ml-2" />
          <h1 className="text-2xl font-bold text-gray-800">מחשבון עלויות API של OpenAI - נר אונליין</h1>
        </div>
        <CategoryTabs category={category} setCategory={setCategory} />
        <div className="mt-6">
          <ModelSelector
            category={category}
            model={model}
            setModel={setModel}
            assistantModel={assistantModel}
            setAssistantModel={setAssistantModel}
          />
          <InputSection
            category={category}
            model={model}
            inputTokens={inputTokens}
            setInputTokens={setInputTokens}
            outputTokens={outputTokens}
            setOutputTokens={setOutputTokens}
            trainingTokens={trainingTokens}
            setTrainingTokens={setTrainingTokens}
            imageCount={imageCount}
            setImageCount={setImageCount}
            minutes={minutes}
            setMinutes={setMinutes}
            characters={characters}
            setCharacters={setCharacters}
            sessions={sessions}
            setSessions={setSessions}
            gbPerDay={gbPerDay}
            setGbPerDay={setGbPerDay}
            resolution={resolution}
            setResolution={setResolution}
            isBatchAPI={isBatchAPI}
            setIsBatchAPI={setIsBatchAPI}
            apiCalls={apiCalls}
            setApiCalls={setApiCalls}
            includeVision={includeVision}
            setIncludeVision={setIncludeVision}
            isAudioInput={isAudioInput}
            setIsAudioInput={setIsAudioInput}
            isAudioOutput={isAudioOutput}
            setIsAudioOutput={setIsAudioOutput}
          />
          {category === 'text' && (
            <TokenCounter
              setInputTokens={setInputTokens}
              setOutputTokens={setOutputTokens}
            />
          )}
          <CostDisplay cost={cost} />
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>פותח באהבה על ידי נר אונליין</p>
          <a href="https://github.com/neria05" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <Github className="w-4 h-4 ml-1" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;