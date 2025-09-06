import React from 'react';

interface GeneratedImageViewerProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
}

const LoadingIndicator: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-lg font-semibold text-slate-300">Generating your masterpiece...</p>
    <p className="text-sm text-slate-400">This can take a moment. The AI is working its magic!</p>
  </div>
);

const InitialState: React.FC = () => (
    <div className="text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-slate-400">Your generated image will appear here</h3>
        <p className="mt-1 text-sm">Upload an image and select a style to begin.</p>
    </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-xl font-semibold">Generation Failed</h3>
        <p className="mt-1 text-sm">{message}</p>
    </div>
);

export const GeneratedImageViewer: React.FC<GeneratedImageViewerProps> = ({ isLoading, generatedImage, error }) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-product-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full bg-gray-900/50 rounded-lg flex items-center justify-center p-4 border border-gray-700">
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && generatedImage && (
        <div className="relative w-full h-full">
            <img src={generatedImage} alt="Generated product shot" className="max-w-full max-h-full w-full h-full object-contain rounded-lg" />
            <button
                onClick={handleDownload}
                className="absolute top-4 right-4 bg-gray-800/70 text-white font-semibold py-2 px-4 rounded-lg backdrop-blur-sm hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 shadow-lg"
                aria-label="Download generated image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
            </button>
        </div>
      )}
      {!isLoading && !error && !generatedImage && <InitialState />}
    </div>
  );
};