export interface CodeListing {
  id: string;
  title: string;
  description: string;
  price: string;
  seller: string;
  language: string;
  preview: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string;
  chainId: string | null;
}