import React, { useState } from 'react';
import { Code2, DollarSign, FileText, Tag } from 'lucide-react';

interface ListingFormProps {
  onSubmit: (listing: {
    title: string;
    description: string;
    price: string;
    language: string;
    preview: string;
  }) => void;
}

export const ListingForm: React.FC<ListingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    language: '',
    preview: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      price: '',
      language: '',
      preview: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl">
      <div className="space-y-4">
        <div>
          <label className="flex items-center text-slate-300 mb-2">
            <FileText className="w-4 h-4 mr-2 text-blue-400" />
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="e.g., Smart Contract Template"
            required
          />
        </div>
        <div>
          <label className="flex items-center text-slate-300 mb-2">
            <Tag className="w-4 h-4 mr-2 text-blue-400" />
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-field"
            placeholder="Describe your code..."
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-slate-300 mb-2">
              <DollarSign className="w-4 h-4 mr-2 text-blue-400" />
              Price (ETH)
            </label>
            <input
              type="number"
              step="0.001"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input-field"
              placeholder="0.1"
              required
            />
          </div>
          <div>
            <label className="flex items-center text-slate-300 mb-2">
              <Code2 className="w-4 h-4 mr-2 text-blue-400" />
              Language
            </label>
            <input
              type="text"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="input-field"
              placeholder="e.g., Solidity"
              required
            />
          </div>
        </div>
        <div>
          <label className="flex items-center text-slate-300 mb-2">
            <Code2 className="w-4 h-4 mr-2 text-blue-400" />
            Code Preview
          </label>
          <textarea
            value={formData.preview}
            onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
            className="input-field font-mono"
            placeholder="Paste your code preview here..."
            rows={6}
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          List Code
        </button>
      </div>
    </form>
  );
};