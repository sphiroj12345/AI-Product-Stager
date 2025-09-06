
import React, { useState, useMemo } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { TemplateSelector } from './components/TemplateSelector';
import { GeneratedImageViewer } from './components/GeneratedImageViewer';
import { generateProductImage } from './services/geminiService';
import { TEMPLATES } from './constants';
import { Template, TemplateInputs } from './types';

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [templateInputs, setTemplateInputs] = useState<TemplateInputs>({});

  const selectedTemplate = useMemo<Template | undefined>(() => {
    return TEMPLATES.find(t => t.id === selectedTemplateId);
  }, [selectedTemplateId]);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplateId(id);
    setTemplateInputs({}); // Reset inputs when template changes
  };

  const handleInputChange = (id: keyof TemplateInputs, value: string) => {
    setTemplateInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedTemplate) {
      setError("Please upload an image and select a style template first.");
      return;
    }

    let finalPrompt = selectedTemplate.prompt;

    if (selectedTemplate.fields) {
      const allFieldsFilled = selectedTemplate.fields.every(field => templateInputs[field.id]?.trim());
      if (!allFieldsFilled) {
        setError("Please fill in all the details for the selected style.");
        return;
      }
      // Replace placeholders
      finalPrompt = selectedTemplate.fields.reduce((prompt, field) => {
        const regex = new RegExp(`{${field.id}}`, 'g');
        return prompt.replace(regex, templateInputs[field.id] || '');
      }, selectedTemplate.prompt);
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateProductImage(uploadedImage, finalPrompt);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.toString() || "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
    }
  };

  const areTemplateInputsValid = useMemo(() => {
    if (!selectedTemplate?.fields) {
      return true; // No fields to validate
    }
    return selectedTemplate.fields.every(field => templateInputs[field.id]?.trim());
  }, [selectedTemplate, templateInputs]);

  const isGenerateButtonDisabled = isLoading || !uploadedImage || !selectedTemplateId || !areTemplateInputsValid;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI Product Stager
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Create professional product photos in seconds.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Controls */}
          <div className="flex flex-col p-6 bg-gray-800/60 rounded-xl border border-gray-700">
            <ImageUploader onImageUpload={setUploadedImage} uploadedImage={uploadedImage} />
            <TemplateSelector templates={TEMPLATES} selectedTemplateId={selectedTemplateId} onSelectTemplate={handleSelectTemplate} />
            
            {selectedTemplate?.fields && (
              <div className="w-full mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">3. Customize Details</h3>
                {selectedTemplate.fields.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-slate-400 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      id={field.id}
                      name={field.id}
                      value={templateInputs[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id as keyof TemplateInputs, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-auto pt-8">
               <button
                onClick={handleGenerate}
                disabled={isGenerateButtonDisabled}
                className={`w-full text-lg font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center
                  ${isGenerateButtonDisabled 
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105'
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  '✨ Generate Image'
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="min-h-[60vh] lg:min-h-full">
            <GeneratedImageViewer
              isLoading={isLoading}
              generatedImage={generatedImage}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
