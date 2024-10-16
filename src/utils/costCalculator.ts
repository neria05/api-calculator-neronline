interface ModelPricing {
  input?: number;
  output?: number;
  cachedInput?: number;
  training?: number;
  perImage?: number;
  perMinute?: number;
  perCharacter?: number;
  perSession?: number;
  perGBPerDay?: number;
  audioInput?: number;
  audioOutput?: number;
}

const modelPricing: Record<string, ModelPricing> = {
  // GPT-4o
  'gpt-4o': { input: 2.50, output: 10.00, cachedInput: 1.25 },
  'gpt-4o-2024-08-06': { input: 2.50, output: 10.00, cachedInput: 1.25 },
  'gpt-4o-2024-05-13': { input: 5.00, output: 15.00 },
  // GPT-4o mini
  'gpt-4o-mini': { input: 0.15, output: 0.60, cachedInput: 0.075 },
  'gpt-4o-mini-2024-07-18': { input: 0.15, output: 0.60, cachedInput: 0.075 },
  // Embedding Models
  'text-embedding-3-small': { input: 0.02 },
  'text-embedding-3-large': { input: 0.13 },
  'ada-v2': { input: 0.10 },
  // Fine-tuning Models
  'gpt-4o-2024-08-06-ft': { input: 3.75, output: 15.00, training: 25.00 },
  'gpt-4o-mini-2024-07-18-ft': { input: 0.30, output: 1.20, training: 3.00 },
  'gpt-3.5-turbo-ft': { input: 3.00, output: 6.00, training: 8.00 },
  'davinci-002-ft': { input: 12.00, output: 12.00, training: 6.00 },
  'babbage-002-ft': { input: 1.60, output: 1.60, training: 0.40 },
  // DALL-E
  'dall-e-3-standard-1024': { perImage: 0.04 },
  'dall-e-3-standard-1792': { perImage: 0.08 },
  'dall-e-3-hd-1024': { perImage: 0.08 },
  'dall-e-3-hd-1792': { perImage: 0.12 },
  'dall-e-2-1024': { perImage: 0.02 },
  'dall-e-2-512': { perImage: 0.018 },
  'dall-e-2-256': { perImage: 0.016 },
  // OpenAI o1
  'o1-preview': { input: 15.00, output: 60.00, cachedInput: 7.50 },
  'o1-preview-2024-09-12': { input: 15.00, output: 60.00, cachedInput: 7.50 },
  // OpenAI o1-mini
  'o1-mini': { input: 3.00, output: 12.00, cachedInput: 1.50 },
  'o1-mini-2024-09-12': { input: 3.00, output: 12.00, cachedInput: 1.50 },
  // Audio models
  'whisper': { perMinute: 0.006 },
  'tts': { perCharacter: 0.015 },
  'tts-hd': { perCharacter: 0.030 },
  // Realtime API
  'gpt-4o-realtime-preview': { input: 5.00, output: 20.00, audioInput: 100.00, audioOutput: 200.00 },
  'gpt-4o-realtime-preview-2024-10-01': { input: 5.00, output: 20.00, audioInput: 100.00, audioOutput: 200.00 },
  // Additional models
  'chatgpt-4o-latest': { input: 5.00, output: 15.00 },
  'gpt-4-turbo': { input: 10.00, output: 30.00 },
  'gpt-4-turbo-2024-04-09': { input: 10.00, output: 30.00 },
  'gpt-4': { input: 30.00, output: 60.00 },
  'gpt-4-32k': { input: 60.00, output: 120.00 },
  'gpt-4-0125-preview': { input: 10.00, output: 30.00 },
  'gpt-4-1106-preview': { input: 10.00, output: 30.00 },
  'gpt-4-vision-preview': { input: 10.00, output: 30.00 },
  'gpt-3.5-turbo-0125': { input: 0.50, output: 1.50 },
  'gpt-3.5-turbo-instruct': { input: 1.50, output: 2.00 },
  'gpt-3.5-turbo-1106': { input: 1.00, output: 2.00 },
  'gpt-3.5-turbo-0613': { input: 1.50, output: 2.00 },
  'gpt-3.5-turbo-16k-0613': { input: 3.00, output: 4.00 },
  'gpt-3.5-turbo-0301': { input: 1.50, output: 2.00 },
  'davinci-002': { input: 2.00, output: 2.00 },
  'babbage-002': { input: 0.40, output: 0.40 },
  // Assistants API
  'assistants-code-interpreter': { perSession: 0.03 },
  'assistants-file-search': { perGBPerDay: 0.10 },
};

export const calculateCost = (
  model: string,
  inputTokens: number,
  outputTokens: number,
  isBatchAPI: boolean,
  trainingTokens: number = 0,
  imageCount: number = 1,
  minutes: number = 0,
  characters: number = 0,
  sessions: number = 0,
  gbPerDay: number = 0,
  resolution: string = '1024x1024',
  apiCalls: number = 1,
  includeVision: boolean = false,
  assistantModel?: string,
  isAudioInput: boolean = false,
  isAudioOutput: boolean = false
): number => {
  const pricing = modelPricing[model];
  if (!pricing) return 0;

  let totalCost = 0;

  if (pricing.input) {
    let inputCost = (inputTokens / 1_000_000) * (isAudioInput && pricing.audioInput ? pricing.audioInput : pricing.input);
    if (isBatchAPI) inputCost /= 2;
    totalCost += inputCost;
  }

  if (pricing.output) {
    let outputCost = (outputTokens / 1_000_000) * (isAudioOutput && pricing.audioOutput ? pricing.audioOutput : pricing.output);
    if (isBatchAPI) outputCost /= 2;
    totalCost += outputCost;
  }

  if (pricing.training) {
    totalCost += (trainingTokens / 1_000_000) * pricing.training;
  }

  if (pricing.perImage) {
    totalCost += imageCount * pricing.perImage;
  }

  if (pricing.perMinute) {
    totalCost += minutes * pricing.perMinute;
  }

  if (pricing.perCharacter) {
    totalCost += (characters / 1_000_000) * pricing.perCharacter;
  }

  if (pricing.perSession) {
    totalCost += sessions * pricing.perSession;
  }

  if (pricing.perGBPerDay) {
    totalCost += gbPerDay * pricing.perGBPerDay;
  }

  // Vision pricing calculator
  if ((model.startsWith('gpt-4o') || model === 'gpt-4-vision-preview') && includeVision && resolution) {
    const [width, height] = resolution.split('x').map(Number);
    const baseTokens = 85;
    const tilesX = Math.ceil(width / 512);
    const tilesY = Math.ceil(height / 512);
    const totalTiles = tilesX * tilesY;
    const tileTokens = 170 * totalTiles;
    const totalTokens = baseTokens + tileTokens;
    
    let visionCost = (totalTokens / 1_000_000) * pricing.input!;
    if (isBatchAPI) visionCost /= 2;
    totalCost += visionCost;
  }

  // Assistant model cost
  if (assistantModel) {
    const assistantPricing = modelPricing[assistantModel];
    if (assistantPricing) {
      let assistantInputCost = (inputTokens / 1_000_000) * assistantPricing.input!;
      let assistantOutputCost = (outputTokens / 1_000_000) * assistantPricing.output!;
      totalCost += assistantInputCost + assistantOutputCost;
    }
  }

  // Realtime API audio costs
  if (isAudioInput && pricing.audioInput) {
    totalCost += (minutes * 0.06); // 6¢ per minute for audio input
  }
  if (isAudioOutput && pricing.audioOutput) {
    totalCost += (minutes * 0.24); // 24¢ per minute for audio output
  }

  return totalCost * apiCalls;
};