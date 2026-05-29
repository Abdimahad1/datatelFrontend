import { useState } from 'react';
import type { Screen } from '../types';

interface Provider {
  id: number;
  name: string;
  logo: string;
}

interface ProviderSelectionProps {
  provider: Provider;
  setScreen: (screen: Screen) => void;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: 'anfac_plus', name: 'Anfac Plus', description: 'Premium daily & weekly bundles', icon: '⚡' },
  { id: 'anfac', name: 'Anfac', description: 'Affordable everyday data', icon: '📱' },
  { id: 'adsl_plus', name: 'ADSL Plus', description: 'Home internet packages', icon: '🏠' },
  { id: 'unlimited', name: 'Unlimited Data', description: 'No limits, full speed', icon: '🚀' },
];

function ProviderSelection({ provider, setScreen, setSelectedCategory }: ProviderSelectionProps) {
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setScreen('categories');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-900 to-maroon-800">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-full bg-maroon-800/50 border border-maroon-700 flex items-center justify-center text-maroon-200 text-xl active:scale-95"
          >
            ←
          </button>
          <div>
            <p className="text-maroon-300 text-xs">SELECTED PROVIDER</p>
            <h1 className="text-2xl font-bold text-white">{provider.name}</h1>
          </div>
        </div>
      </div>

      {/* Selected Provider Badge */}
      <div className="px-5 mb-6">
        <div className="bg-maroon-800/50 rounded-2xl p-4 border border-maroon-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-maroon-700">
              <img src={provider.logo} alt={provider.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-maroon-300 text-xs">SELECTED PROVIDER</p>
              <p className="text-white font-semibold text-lg">{provider.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-5 flex-1">
        <h2 className="text-white font-semibold text-lg mb-4">CATEGORIES</h2>
        
        <div className="space-y-3 pb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.name)}
              className="w-full bg-maroon-800/30 rounded-2xl p-5 border border-maroon-700 active:scale-98 transition-all hover:bg-maroon-800/50 text-left"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                    <p className="text-maroon-300 text-sm">{category.description}</p>
                  </div>
                </div>
                <span className="text-maroon-400 text-xl">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}

export default ProviderSelection;