import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Shield, Zap, DollarSign } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code2 className="w-8 h-8 text-blue-400" />,
      title: 'Code Marketplace',
      description: 'Buy and sell high-quality code snippets, templates, and full applications',
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: 'Secure Transactions',
      description: 'All transactions are secured by blockchain technology',
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'Instant Delivery',
      description: 'Get immediate access to purchased code',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-purple-400" />,
      title: 'Fair Pricing',
      description: 'Competitive prices set by the community',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Web3 Code Marketplace
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Buy and sell code securely using blockchain technology. Join the future of code commerce.
        </p>
        <button
          onClick={() => navigate('/marketplace')}
          className="btn-primary text-lg px-8 py-3"
        >
          Explore Marketplace
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="glass-card p-6 rounded-xl text-center"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-slate-400 mb-8">
          Join our community of developers and start trading code today.
        </p>
        <button
          onClick={() => navigate('/marketplace')}
          className="btn-primary text-lg"
        >
          Enter Marketplace
        </button>
      </motion.div>
    </div>
  );
};

export default LandingPage;