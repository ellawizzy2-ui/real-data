
import React from 'react';
import type { EnhancementType } from '../types';

interface LoaderProps {
  enhancementType: EnhancementType | null;
}

const loadingMessages: { [key in EnhancementType | 'default']: string[] } = {
  default: [
    "Analyzing image...",
    "Warming up the AI models...",
    "This may take a few moments...",
  ],
  "Auto Enhance": [
    "Applying smart adjustments...",
    "Finding the perfect balance...",
    "Polishing every pixel...",
  ],
  "Upscale 2x": [
    "Generating new pixels...",
    "Intelligently increasing resolution...",
    "Adding high-frequency details...",
  ],
  "Denoise": [
    "Identifying and removing grain...",
    "Clarifying the details...",
    "Smoothing out the noise...",
  ],
  "Deblur": [
    "Recalculating sharp edges...",
    "Correcting camera shake...",
    "Bringing your image into focus...",
  ],
  "Face Restore": [
    "Detecting facial features...",
    "Reconstructing facial details...",
    "Bringing faces to life...",
  ],
  "Color Correction": [
    "Balancing hues and saturation...",
    "Optimizing tones and contrast...",
    "Making colors pop...",
  ],
};

export const Loader: React.FC<LoaderProps> = ({ enhancementType }) => {
  const [messageIndex, setMessageIndex] = React.useState(0);
  
  const messages = enhancementType ? loadingMessages[enhancementType] : loadingMessages.default;
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-brand-surface rounded-lg p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
      <h3 className="text-xl font-bold mt-6 text-brand-text-primary">
        {enhancementType ? `Applying: ${enhancementType}` : 'Processing...'}
      </h3>
      <p className="text-brand-text-secondary mt-2 text-center transition-opacity duration-500">
        {messages[messageIndex]}
      </p>
    </div>
  );
};
