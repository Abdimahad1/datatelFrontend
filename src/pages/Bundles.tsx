interface Provider {
  id: number;
  name: string;
  logo: string;
}

interface Bundle {
  name: string;
  size: string;
  validity: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

interface BundlesProps {
  provider: Provider;
  bundle: Bundle;
  setScreen: (screen: string) => void;
}

function Bundles({ provider, bundle, setScreen }: BundlesProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-900 to-maroon-800">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setScreen('categories')}
            className="w-10 h-10 rounded-full bg-maroon-800/50 border border-maroon-700 flex items-center justify-center text-maroon-200 text-xl active:scale-95"
          >
            ←
          </button>
          <div>
            <p className="text-maroon-300 text-xs uppercase">{provider.name}</p>
            <h1 className="text-xl font-bold text-white">{bundle.name}</h1>
          </div>
        </div>
      </div>

      {/* Bundle Details Card */}
      <div className="px-5 mt-4">
        <div className="bg-maroon-800/50 rounded-2xl p-6 border border-maroon-700">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-maroon-700 mx-auto flex items-center justify-center mb-3">
              <span className="text-3xl">📦</span>
            </div>
            <h2 className="text-white text-2xl font-bold">{bundle.size}</h2>
            <p className="text-maroon-300 mt-1">Valid for {bundle.validity}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-maroon-700">
              <span className="text-maroon-300">Original Price</span>
              <span className="text-maroon-400 line-through">${bundle.originalPrice.toFixed(2)}</span>
            </div>
            {bundle.discount > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-maroon-700">
                <span className="text-maroon-300">Discount</span>
                <span className="text-red-400 font-semibold">{bundle.discount}% OFF</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-white font-semibold">Final Price</span>
              <span className="text-white font-bold text-2xl">${bundle.discountedPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setScreen('payment')}
            className="w-full mt-6 bg-maroon-600 text-white py-4 rounded-xl font-semibold active:scale-98 transition-all hover:bg-maroon-700"
          >
            Proceed to Payment →
          </button>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}

export default Bundles;