import type { Screen } from '../types';

interface Provider {
  id: number;
  name: string;
  logo: string;
}

interface Bundle {
  id: string;
  size: string;
  validity: string;
  discount: number;
  originalPrice: number;
  discountedPrice: number;
}

interface SelectedBundle {
  name: string;
  size: string;
  validity: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

interface CategoriesProps {
  provider: Provider;
  category: string;
  setScreen: (screen: Screen) => void;
  setSelectedBundle: (bundle: SelectedBundle) => void;
}

// Bundle data for each category
const getBundlesForCategory = (category: string, providerName: string): Bundle[] => {
  if (category === 'Anfac Plus') {
    return [
      { id: '1', size: '500 MB', validity: '1 Day', discount: 15, originalPrice: 1.00, discountedPrice: 0.85 },
      { id: '2', size: '1 GB', validity: '1 Day', discount: 15, originalPrice: 2.00, discountedPrice: 1.70 },
      { id: '3', size: '3 GB', validity: '3 Days', discount: 15, originalPrice: 5.00, discountedPrice: 4.25 },
      { id: '4', size: '5 GB', validity: '7 Days', discount: 15, originalPrice: 8.00, discountedPrice: 6.80 },
      { id: '5', size: '10 GB', validity: '15 Days', discount: 15, originalPrice: 15.00, discountedPrice: 12.75 },
      { id: '6', size: '25 GB', validity: '30 Days', discount: 15, originalPrice: 30.00, discountedPrice: 25.00 },
    ];
  } else if (category === 'Anfac') {
    return [
      { id: '7', size: '100 MB', validity: '1 Day', discount: 10, originalPrice: 0.50, discountedPrice: 0.45 },
      { id: '8', size: '500 MB', validity: '3 Days', discount: 10, originalPrice: 2.00, discountedPrice: 1.80 },
      { id: '9', size: '1 GB', validity: '7 Days', discount: 10, originalPrice: 3.50, discountedPrice: 3.15 },
      { id: '10', size: '2 GB', validity: '15 Days', discount: 10, originalPrice: 6.00, discountedPrice: 5.40 },
    ];
  } else if (category === 'ADSL Plus') {
    return [
      { id: '11', size: '50 GB', validity: '30 Days', discount: 20, originalPrice: 25.00, discountedPrice: 20.00 },
      { id: '12', size: '100 GB', validity: '30 Days', discount: 20, originalPrice: 45.00, discountedPrice: 36.00 },
      { id: '13', size: '200 GB', validity: '30 Days', discount: 20, originalPrice: 80.00, discountedPrice: 64.00 },
    ];
  } else {
    return [
      { id: '14', size: 'Unlimited', validity: '1 Day', discount: 0, originalPrice: 5.00, discountedPrice: 5.00 },
      { id: '15', size: 'Unlimited', validity: '7 Days', discount: 10, originalPrice: 30.00, discountedPrice: 27.00 },
      { id: '16', size: 'Unlimited', validity: '30 Days', discount: 15, originalPrice: 100.00, discountedPrice: 85.00 },
    ];
  }
};

function Categories({ provider, category, setScreen, setSelectedBundle }: CategoriesProps) {
  const bundles = getBundlesForCategory(category, provider.name);

  const handleBundleSelect = (bundle: Bundle) => {
    setSelectedBundle({
      name: category,
      size: bundle.size,
      validity: bundle.validity,
      originalPrice: bundle.originalPrice,
      discountedPrice: bundle.discountedPrice,
      discount: bundle.discount,
    });
    setScreen('bundles');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-900 to-maroon-800">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={() => setScreen('providerSelection')}
            className="w-10 h-10 rounded-full bg-maroon-800/50 border border-maroon-700 flex items-center justify-center text-maroon-200 text-xl active:scale-95"
          >
            ←
          </button>
          <div>
            <p className="text-maroon-300 text-xs">{provider.name}</p>
            <h1 className="text-2xl font-bold text-white">{category}</h1>
          </div>
        </div>
        <p className="text-maroon-300 text-sm">Choose a bundle</p>
      </div>

      {/* Bundles Grid */}
      <div className="px-5 flex-1 pb-8">
        <div className="space-y-3">
          {bundles.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => handleBundleSelect(bundle)}
              className="w-full bg-maroon-800/30 rounded-2xl p-5 border border-maroon-700 active:scale-98 transition-all hover:bg-maroon-800/50"
            >
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <h3 className="text-white font-bold text-xl">{bundle.size}</h3>
                  <p className="text-maroon-300 text-sm mt-1">Valid for {bundle.validity}</p>
                  {bundle.discount > 0 && (
                    <span className="inline-block mt-2 bg-red-500/20 text-red-300 text-xs font-semibold px-2 py-1 rounded-full">
                      -{bundle.discount}%
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {bundle.discount > 0 && (
                    <p className="text-maroon-400 line-through text-sm">${bundle.originalPrice.toFixed(2)}</p>
                  )}
                  <p className="text-white font-bold text-2xl">${bundle.discountedPrice.toFixed(2)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}

export default Categories;