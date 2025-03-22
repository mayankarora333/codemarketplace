import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Wallet, Layout, User } from 'lucide-react';
import { useWalletContext } from '../context/WalletContext';

const Navbar = () => {
  const { isConnected, address, connectWallet, disconnectWallet, formatAddress } = useWalletContext();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass-card sticky top-0 z-50 backdrop-blur-lg border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                CodeMarket
              </h1>
              <p className="text-sm text-slate-400">Web3 Code Marketplace</p>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/marketplace"
              className={`flex items-center space-x-2 ${
                isActive('/marketplace') ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layout className="w-5 h-5" />
              <span>Marketplace</span>
            </Link>

            {isConnected && (
              <Link
                to="/profile"
                className={`flex items-center space-x-2 ${
                  isActive('/profile') ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            )}

            <button
              onClick={isConnected ? disconnectWallet : connectWallet}
              className="btn-connect"
            >
              <Wallet className="w-5 h-5 mr-2" />
              {isConnected ? formatAddress(address) : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;