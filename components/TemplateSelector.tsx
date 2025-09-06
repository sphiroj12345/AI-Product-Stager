
import React from 'react';
import { Template } from '../types';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplateId: string | null;
  onSelectTemplate: (id: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, selectedTemplateId, onSelectTemplate }) => {
  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-semibold mb-4 text-slate-300">2. Choose a Style</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 transform hover:scale-105 ${
              selectedTemplateId === template.id ? 'ring-4 ring-blue-500' : 'ring-2 ring-transparent hover:ring-blue-400'
            }`}
          >
            <img src={template.thumbnail} alt={template.name} className="w-full h-24 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
              <p className="text-white text-sm font-semibold">{template.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
