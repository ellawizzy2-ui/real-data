
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface mt-12 py-4">
      <div className="container mx-auto px-4 text-center text-brand-text-secondary text-sm">
        <p>&copy; {new Date().getFullYear()} AI Image Enhancer. All rights reserved.</p>
        <p className="mt-1">Powered by Google Gemini</p>
      </div>
    </footer>
  );
};
