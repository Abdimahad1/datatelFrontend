import { CheckCircle } from 'lucide-react';
import type { Screen } from '../App';

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

interface PaymentSuccessProps {
  provider: Provider;
  bundle: Bundle;
  setScreen: (screen: Screen) => void;
}

function PaymentSuccess({ provider, bundle, setScreen }: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-900 to-maroon-800 flex items-center justify-center">
      <div className="px-5 w-full max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle size={56} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-maroon-200">
            {bundle.size} bundle has been activated on your {provider.name} line.
          </p>
        </div>

        {/* Transaction Details */}
        <div className="bg-maroon-800/50 rounded-2xl p-6 border border-maroon-700 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-maroon-700">
              <span className="text-maroon-300">Provider</span>
              <span className="text-white font-semibold">{provider.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-maroon-700">
              <span className="text-maroon-300">Bundle</span>
              <span className="text-white font-semibold">{bundle.size}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-maroon-700">
              <span className="text-maroon-300">Validity</span>
              <span className="text-white font-semibold">{bundle.validity}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-maroon-300">Amount paid</span>
              <span className="text-white font-bold text-2xl">${bundle.discountedPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setScreen('home')}
            className="w-full bg-maroon-600 text-white py-4 rounded-xl font-semibold active:scale-98 transition-all hover:bg-maroon-700"
          >
            Back to Home
          </button>
          <button
            onClick={() => setScreen('home')}
            className="w-full bg-maroon-800/50 text-maroon-200 py-4 rounded-xl font-semibold border border-maroon-700 active:scale-98 transition-all"
          >
            View My Bundles
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;