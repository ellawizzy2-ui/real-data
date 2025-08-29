import React from 'react';
import type { EnhancementType } from '../types';
import { EnhancementType as EnhancementTypeEnum } from '../types';


interface EnhancementOptionsProps {
  onEnhance: (type: EnhancementType) => void;
  isLoading: boolean;
  currentEnhancement: EnhancementType | null;
}

// Fix: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const optionIcons: Record<EnhancementType, React.ReactElement> = {
    [EnhancementTypeEnum.AUTO]: <MagicWandIcon />,
    [EnhancementTypeEnum.UPSCALE]: <ArrowsPointingOutIcon />,
    [EnhancementTypeEnum.DENOISE]: <SparklesIcon />,
    [EnhancementTypeEnum.DEBLUR]: <ViewfinderCircleIcon />,
    [EnhancementTypeEnum.FACE_RESTORE]: <FaceSmileIcon />,
    [EnhancementTypeEnum.COLOR_CORRECTION]: <SwatchIcon />,
};

export const EnhancementOptions: React.FC<EnhancementOptionsProps> = ({ onEnhance, isLoading, currentEnhancement }) => {
    const options = Object.values(EnhancementTypeEnum);
    
    return (
        <div className="bg-brand-surface p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-2 gap-4">
                {options.map((type) => (
                    <button
                        key={type}
                        onClick={() => onEnhance(type)}
                        disabled={isLoading}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                        ${isLoading && currentEnhancement === type ? 'bg-brand-primary/80 text-white animate-pulse' : ''}
                        ${!isLoading && currentEnhancement === type ? 'bg-brand-primary text-white' : 'bg-brand-background hover:bg-brand-primary/20'}
                        `}
                    >
                        <div className="w-8 h-8 mb-2">{optionIcons[type]}</div>
                        <span className="text-sm font-semibold">{type}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};


// SVG Icons (defined within the component file for simplicity)

function MagicWandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.4-c.11.02.22.037.33.05A18.06 18.06 0 0012 21.75c5.385 0 9.873-3.56 11.18-8.421a1.12 1.12 0 00-.23-1.007l-1.12-1.122a3 3 0 00-4.242 0l-3.172 3.172a3 3 0 00-1.128 5.78z" />
    </svg>
  );
}

function ArrowsPointingOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.21-1.049a3.375 3.375 0 00-2.285-2.285l-1.049-.21a3.375 3.375 0 00-2.285 2.285l-.21 1.049a3.375 3.375 0 002.285 2.285l1.049.21a3.375 3.375 0 002.285-2.285z" />
    </svg>
  );
}

function ViewfinderCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function FaceSmileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" />
    </svg>
  );
}

function SwatchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18M12 3.75L16.5 9m-4.5-5.25L12 9m0 0L7.5 3.75M12 9v12" />
    </svg>
  );
}
