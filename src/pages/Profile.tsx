import React from 'react';
import { motion } from 'framer-motion';
import { useWalletContext } from '../context/WalletContext';
import { Code2, Package, ShoppingCart } from 'lucide-react';

const Profile = () => {
  const { address, formatAddress } = useWalletContext();

  const stats = [
    { icon: <Code2 />, label: 'Listed Items', value: '5' },
    { icon: <ShoppingCart />, label: 'Purchases', value: '3' },
    { icon: <Package />, label: 'Sales', value: '2' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="glass-card rounded-xl p-8 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{formatAddress(address)}</h2>
            <p className="text-slate-400">Member since March 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800/50 rounded-lg p-4 text-center"
            >
              <div className="flex justify-center mb-2 text-blue-400">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/30 p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-blue-400">
                      {index % 2 === 0 ? <ShoppingCart /> : <Package />}
                    </div>
                    <div>
                      <div className="font-medium">
                        {index % 2 === 0 ? 'Purchased' : 'Sold'} React Component Library
                      </div>
                      <div className="text-sm text-slate-400">2 days ago</div>
                    </div>
                  </div>
                  <div className="text-emerald-400">0.1 ETH</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;