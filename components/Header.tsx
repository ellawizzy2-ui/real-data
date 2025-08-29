
import React from 'react';

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C11.45 2 11 2.45 11 3V4.5C11 5.05 11.45 5.5 12 5.5C12.55 5.5 13 5.05 13 4.5V3C13 2.45 12.55 2 12 2ZM6.03 4.61C5.64 4.22 5 4.22 4.61 4.61C4.22 5 4.22 5.64 4.61 6.03L5.64 7.05C6.03 7.44 6.67 7.44 7.05 7.05C7.44 6.67 7.44 6.03 7.05 5.64L6.03 4.61ZM2 12C2 11.45 2.45 11 3 11H4.5C5.05 11 5.5 11.45 5.5 12C5.5 12.55 5.05 13 4.5 13H3C2.45 13 2 12.55 2 12ZM4.61 17.97C4.22 18.36 4.22 19 4.61 19.39C5 19.78 5.64 19.78 6.03 19.39L7.05 18.36C7.44 17.97 7.44 17.33 7.05 16.95C6.67 16.56 6.03 16.56 5.64 16.95L4.61 17.97ZM12 18.5C11.45 18.5 11 18.95 11 19.5V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V19.5C13 18.95 12.55 18.5 12 18.5ZM18.36 16.95C17.97 16.56 17.33 16.56 16.95 16.95C16.56 17.33 16.56 17.97 16.95 18.36L17.97 19.39C18.36 19.78 19 19.78 19.39 19.39C19.78 19 19.78 18.36 19.39 17.97L18.36 16.95ZM19.5 13H21C21.55 13 22 12.55 22 12C22 11.45 21.55 11 21 11H19.5C18.95 11 18.5 11.45 18.5 12C18.5 12.55 18.95 13 19.5 13ZM18.36 7.05C18.75 6.67 18.75 6.03 18.36 5.64L17.34 4.61C16.95 4.22 16.31 4.22 15.92 4.61C15.53 5 15.53 5.64 15.92 6.03L16.95 7.05C17.33 7.44 17.97 7.44 18.36 7.05ZM12 6.5C8.96 6.5 6.5 8.96 6.5 12C6.5 15.04 8.96 17.5 12 17.5C15.04 17.5 17.5 15.04 17.5 12C17.5 8.96 15.04 6.5 12 6.5Z" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          <SparkleIcon className="w-8 h-8 text-brand-primary" />
          <h1 className="text-2xl font-bold ml-3 text-brand-text-primary">AI Image Enhancer</h1>
        </div>
      </div>
    </header>
  );
};
