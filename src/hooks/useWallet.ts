import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const SEPOLIA_CHAIN_ID = '0xaa36a7';
const SEPOLIA_CONFIG = {
  chainId: SEPOLIA_CHAIN_ID,
  chainName: 'Sepolia',
  nativeCurrency: {
    name: 'Sepolia Ether',
    symbol: 'SEP',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.infura.io/v3/'],
  blockExplorerUrls: ['https://sepolia.etherscan.io/'],
};

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState<string | null>(null);

  const checkNetwork = async () => {
    if (!window.ethereum) return false;
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== SEPOLIA_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        }).catch(async (switchError: any) => {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [SEPOLIA_CONFIG],
            });
          }
        });
      }
      return true;
    } catch (error) {
      console.error('Error checking/switching network:', error);
      return false;
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      return;
    }

    try {
      const networkOk = await checkNetwork();
      if (!networkOk) {
        toast.error('Please switch to Sepolia network');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      setAddress(accounts[0]);
      setIsConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const sendTransaction = async (to: string, value: string) => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      return false;
    }

    try {
      const networkOk = await checkNetwork();
      if (!networkOk) {
        toast.error('Please switch to Sepolia network');
        return false;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Check balance before transaction
      const balance = await provider.getBalance(address);
      const valueInWei = ethers.parseEther(value);
      
      // Estimate gas
      const gasEstimate = await provider.estimateGas({
        from: address,
        to,
        value: valueInWei,
      });
      
      const gasPrice = await provider.getGasPrice();
      const totalCost = valueInWei + (gasEstimate * gasPrice);
      
      if (balance < totalCost) {
        toast.error(`Insufficient funds. You need at least ${ethers.formatEther(totalCost)} SEP`);
        return false;
      }

      const tx = await signer.sendTransaction({
        to,
        value: valueInWei,
        gasLimit: gasEstimate,
      });

      toast.loading('Transaction pending...', { id: tx.hash });
      
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        toast.success('Purchase successful!', { id: tx.hash });
        return true;
      } else {
        toast.error('Transaction failed', { id: tx.hash });
        return false;
      }
    } catch (error: any) {
      console.error('Transaction error:', error);
      if (error.code === 'INSUFFICIENT_FUNDS') {
        toast.error('Insufficient funds for transaction and gas fees');
      } else {
        toast.error(error.message || 'Transaction failed');
      }
      return false;
    }
  };

  const disconnectWallet = () => {
    setAddress('');
    setIsConnected(false);
    toast.success('Wallet disconnected');
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        });

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setAddress('');
          setIsConnected(false);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return {
    isConnected,
    address,
    chainId,
    connectWallet,
    disconnectWallet,
    formatAddress,
    sendTransaction,
  };
};