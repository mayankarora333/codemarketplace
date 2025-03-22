import React from 'react';
import { CodeListing } from '../types';
import { Code2, DollarSign, User, Tag } from 'lucide-react';

interface CodeCardProps {
  listing: CodeListing;
  onPurchase: (listing: CodeListing) => void;
  disabled?: boolean;
}

export const CodeCard: React.FC<CodeCardProps> = ({ listing, onPurchase, disabled }) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{listing.title}</h3>
          <span className="flex items-center px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
            <DollarSign className="w-4 h-4 mr-1" />
            {listing.price} ETH
          </span>
        </div>
        <p className="text-slate-300 mb-4">{listing.description}</p>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-blue-400">
            <Code2 className="w-4 h-4 mr-2" />
            <span>{listing.language}</span>
          </div>
          <div className="flex items-center text-slate-400">
            <User className="w-4 h-4 mr-2" />
            <span>{listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}</span>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <Tag className="w-4 h-4 mr-2 text-slate-400" />
            <span className="text-sm text-slate-400">Preview</span>
          </div>
          <pre className="text-slate-300 text-sm overflow-x-auto font-mono">
            {listing.preview}
          </pre>
        </div>
        <button
          onClick={() => onPurchase(listing)}
          disabled={disabled}
          className="btn-primary w-full"
        >
          {disabled ? 'Processing...' : 'Purchase Code'}
        </button>
      </div>
    </div>
  );
};