
import React from 'react';

interface ImagePreviewProps {
  original: string | null;
  enhanced: string | null;
}

const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export const ImagePreview: React.FC<ImagePreviewProps> = ({ original, enhanced }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold mb-3 text-brand-text-secondary">Before</h3>
        <div className="w-full aspect-square bg-brand-surface rounded-lg overflow-hidden flex items-center justify-center">
          {original ? (
            <img src={original} alt="Original" className="w-full h-full object-contain" />
          ) : (
            <p className="text-brand-text-secondary">Original image appears here</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold mb-3 text-brand-text-primary">After</h3>
        <div className="w-full aspect-square bg-brand-surface rounded-lg overflow-hidden flex items-center justify-center relative group">
          {enhanced ? (
            <>
              <img src={enhanced} alt="Enhanced" className="w-full h-full object-contain" />
              <a
                href={enhanced}
                download="enhanced-image.png"
                className="absolute bottom-4 right-4 bg-brand-primary text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-600"
                aria-label="Download enhanced image"
              >
                <DownloadIcon className="w-6 h-6" />
              </a>
            </>
          ) : (
             <div className="text-center p-4">
                <p className="text-brand-text-secondary">Your enhanced image will appear here.</p>
                <p className="text-sm text-brand-text-secondary/70 mt-2">Select an enhancement option to begin.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
