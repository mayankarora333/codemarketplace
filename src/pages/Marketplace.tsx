import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWalletContext } from '../context/WalletContext';
import { CodeCard } from '../components/CodeCard';
import { ListingForm } from '../components/ListingForm';
import { CodeListing } from '../types';
import { Sparkles } from 'lucide-react';

const initialListings: CodeListing[] = [
  {
    id: '1',
    title: 'React Authentication System',
    description: 'Complete authentication system with JWT tokens and refresh mechanism',
    price: '0.1',
    seller: '0x1234567890abcdef1234567890abcdef12345678',
    language: 'TypeScript',
    preview: 'export const useAuth = () => {\n  // Authentication logic\n};'
  },
  {
    id: '2',
    title: 'Smart Contract Template',
    description: 'ERC721 NFT contract with advanced features',
    price: '0.2',
    seller: '0xabcdef1234567890abcdef1234567890abcdef12',
    language: 'Solidity',
    preview: 'contract NFT is ERC721 {\n  // Contract implementation\n}'
  }
];

const Marketplace = () => {
  const { isConnected, address, sendTransaction } = useWalletContext();
  const [listings, setListings] = useState<CodeListing[]>(initialListings);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async (listing: CodeListing) => {
    if (!isConnected) return;

    if (listing.seller.toLowerCase() === address.toLowerCase()) {
      toast.error("You can't purchase your own listing!");
      return;
    }

    try {
      setIsPurchasing(true);
      const success = await sendTransaction(listing.seller, listing.price);
      
      if (success) {
        setListings(listings.filter(l => l.id !== listing.id));
      }
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleNewListing = (formData: Omit<CodeListing, 'id' | 'seller'>) => {
    const newListing: CodeListing = {
      ...formData,
      id: Date.now().toString(),
      seller: address,
    };
    setListings([newListing, ...listings]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {isConnected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold">List Your Code</h2>
          </div>
          <ListingForm onSubmit={handleNewListing} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {listings.map((listing) => (
          <CodeCard
            key={listing.id}
            listing={listing}
            onPurchase={handlePurchase}
            disabled={isPurchasing}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Marketplace;