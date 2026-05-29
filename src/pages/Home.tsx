import { useState } from 'react';
import type { Screen } from '../App';

import hormuudLogo from '../assets/hormuud.png';
import somnetLogo from '../assets/somnet.png';
import somtelLogo from '../assets/somtel.png';
import amtelLogo from '../assets/amtel.png';
import somlinkLogo from '../assets/somlink.png';
import golisLogo from '../assets/golis.png';
import durdurLogo from '../assets/durdur.png';
import telesomLogo from '../assets/telesom.png';

interface Provider {
  id: number;
  name: string;
  logo: string;
}

interface HomeProps {
  setScreen: (screen: Screen) => void;
  setSelectedProvider: (provider: Provider) => void;
}

function Home({ setScreen, setSelectedProvider }: HomeProps) {
  const providers: Provider[] = [
    { id: 1, name: 'Hormuud', logo: hormuudLogo },
    { id: 2, name: 'Somnet', logo: somnetLogo },
    { id: 3, name: 'Somtel', logo: somtelLogo },
    { id: 4, name: 'Amtel', logo: amtelLogo },
    { id: 5, name: 'Somlink', logo: somlinkLogo },
    { id: 6, name: 'Golis', logo: golisLogo },
    { id: 7, name: 'Durdur', logo: durdurLogo },
    { id: 8, name: 'Telesom', logo: telesomLogo },
  ];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notificationCount] = useState<number>(3);

  const filteredProviders: Provider[] = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
    setScreen('providerSelection');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, providerName: string): void => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const colors = ['#800020', '#6b001a', '#560015', '#400010', '#e54848', '#f27a7a', '#f8b4b4', '#fbd5d5'];
      const colorIndex = providerName.length % colors.length;
      ctx.fillStyle = colors[colorIndex];
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(providerName.charAt(0), 50, 50);
      e.currentTarget.src = canvas.toDataURL();
    } else {
      e.currentTarget.src = `https://placehold.co/100x100/800020/white?text=${providerName.charAt(0)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-900 to-maroon-800">
      {/* App Bar */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Datatel</h1>
            <p className="text-maroon-100 text-sm mt-1">
              Buy mobile data bundles instantly from your favorite telecom provider.
            </p>
          </div>
          
          <div className="relative">
            <button className="relative w-10 h-10 rounded-full bg-maroon-800/50 flex items-center justify-center border border-maroon-600 hover:bg-maroon-700 transition-all">
              <span className="text-maroon-200 text-xl">🔔</span>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-maroon-200 text-lg">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Search provider..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full bg-maroon-800/50 backdrop-blur-md rounded-2xl py-4 pl-11 pr-4 text-white placeholder-maroon-300 outline-none focus:ring-2 focus:ring-maroon-500 transition-all border border-maroon-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-maroon-300 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Providers Section */}
      <div className="px-5 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-semibold text-lg">Choose a provider</h2>
          <span className="text-maroon-300 text-sm">{filteredProviders.length} available</span>
        </div>

        <div className="grid grid-cols-2 gap-6 pb-8">
          {filteredProviders.map((provider: Provider) => (
            <button
              key={provider.id}
              onClick={() => handleProviderClick(provider)}
              className="flex flex-col items-center justify-center gap-2 active:scale-95 transition-all duration-150"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden bg-maroon-800/50 shadow-lg hover:shadow-xl transition-shadow duration-200 border-2 border-maroon-600">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => handleImageError(e, provider.name)}
                  loading="lazy"
                />
              </div>
              <span className="text-white font-medium text-sm">{provider.name}</span>
            </button>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="text-5xl mb-3 text-maroon-300">🔍</span>
            <p className="text-maroon-300 text-center">No providers found for "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-maroon-300 text-sm underline hover:text-white">
              Clear search
            </button>
          </div>
        )}
      </div>

      <div className="h-6" />
    </div>
  );
}

export default Home;