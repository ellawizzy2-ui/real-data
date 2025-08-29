
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EnhancementOptions } from './components/EnhancementOptions';
import { ImagePreview } from './components/ImagePreview';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import type { EnhancementType } from './types';
import { enhanceImage } from './services/geminiService';

const App: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEnhancement, setCurrentEnhancement] = useState<EnhancementType | null>(null);

  const handleFileSelect = (file: File) => {
    if (file.size > 25 * 1024 * 1024) { // 25MB limit
        setError("File is too large. Please select a file smaller than 25MB.");
        return;
    }
    setError(null);
    setOriginalFile(file);
    setEnhancedImage(null);
    setCurrentEnhancement(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEnhance = useCallback(async (type: EnhancementType) => {
    if (!originalFile) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setEnhancedImage(null);
    setCurrentEnhancement(type);

    try {
      const enhancedImageBase64 = await enhanceImage(originalFile, type);
      setEnhancedImage(`data:${originalFile.type};base64,${enhancedImageBase64}`);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to enhance image. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [originalFile]);

  const handleClear = () => {
    setOriginalFile(null);
    setOriginalImagePreview(null);
    setEnhancedImage(null);
    setError(null);
    setIsLoading(false);
    setCurrentEnhancement(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        {!originalFile && (
          <div className="w-full max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-2 text-brand-text-primary">Upload Your Photo to Enhance</h2>
            <p className="text-brand-text-secondary mb-6">Experience the magic of AI. Improve resolution, remove noise, and restore details instantly.</p>
            <ImageUploader onFileSelect={handleFileSelect} />
            {error && <p className="mt-4 text-red-400">{error}</p>}
          </div>
        )}

        {originalFile && (
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-bold mb-4">Enhancement Options</h2>
                <EnhancementOptions onEnhance={handleEnhance} isLoading={isLoading} currentEnhancement={currentEnhancement} />
                 <button 
                  onClick={handleClear} 
                  className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50">
                   Start Over
                </button>
              </div>

              <div className="lg:col-span-8">
                {isLoading && <Loader enhancementType={currentEnhancement} />}
                {!isLoading && error && (
                    <div className="flex items-center justify-center h-full bg-brand-surface rounded-lg p-8">
                        <p className="text-red-400 text-center">{error}</p>
                    </div>
                )}
                {!isLoading && !error && (
                    <ImagePreview 
                        original={originalImagePreview} 
                        enhanced={enhancedImage} 
                    />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
