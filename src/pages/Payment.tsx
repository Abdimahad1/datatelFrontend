import { useState } from 'react';

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

interface PaymentProps {
  provider: Provider;
  bundle: Bundle;
  setScreen: (screen: string) => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  recommended?: boolean;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'evc', name: 'EVC', icon: 'E', recommended: false },
  { id: 'edahab', name: 'eDahab', icon: 'e', recommended: false },
  { id: 'jeeb', name: 'Jeeb', icon: 'J', recommended: false },
  { id: 'tplus', name: 'T Plus', icon: 'T', recommended: true },
];

function Payment({ provider, bundle, setScreen }: PaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('tplus');
  const [fromNumber, setFromNumber] = useState<string>('+252 61 0000000');
  const [toNumber, setToNumber] = useState<string>('+252 61 0000000');

  const handlePayment = () => {
    // Process payment logic here
    setScreen('paymentSuccess');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-900 to-maroon-800">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setScreen('bundles')}
            className="w-10 h-10 rounded-full bg-maroon-800/50 border border-maroon-700 flex items-center justify-center text-maroon-200 text-xl active:scale-95"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Payment</h1>
            <p className="text-maroon-300 text-sm">Review and confirm</p>
          </div>
        </div>
      </div>

      {/* Bundle Summary */}
      <div className="px-5 mb-6">
        <div className="bg-maroon-800/50 rounded-2xl p-5 border border-maroon-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-maroon-300 text-xs uppercase">{provider.name}</p>
              <h3 className="text-white font-bold text-lg">{bundle.name}</h3>
              <p className="text-maroon-300 text-sm">{bundle.size} • Valid for {bundle.validity}</p>
            </div>
            <div className="text-right">
              {bundle.discount > 0 && (
                <p className="text-maroon-400 line-through text-sm">${bundle.originalPrice.toFixed(2)}</p>
              )}
              <p className="text-white font-bold text-2xl">${bundle.discountedPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-5 mb-6">
        <h2 className="text-white font-semibold text-lg mb-3">PAYMENT METHOD</h2>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-maroon-500 bg-maroon-800/70'
                  : 'border-maroon-700 bg-maroon-800/30'
              }`}
            >
              {method.recommended && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-maroon-700 flex items-center justify-center font-bold text-white text-xl">
                  {method.icon}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{method.name}</p>
                  <p className="text-maroon-300 text-xs">Mobile money</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="px-5 mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-maroon-300 text-sm mb-2 block">Taleefanka lacagta laga dirayo</label>
            <input
              type="tel"
              value={fromNumber}
              onChange={(e) => setFromNumber(e.target.value)}
              className="w-full bg-maroon-800/50 border border-maroon-700 rounded-xl p-4 text-white placeholder-maroon-400 outline-none focus:border-maroon-500"
            />
          </div>
          <div>
            <label className="text-maroon-300 text-sm mb-2 block">Taleefanka lacagta loo dirayo</label>
            <input
              type="tel"
              value={toNumber}
              onChange={(e) => setToNumber(e.target.value)}
              className="w-full bg-maroon-800/50 border border-maroon-700 rounded-xl p-4 text-white placeholder-maroon-400 outline-none focus:border-maroon-500"
            />
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="px-5 pb-8">
        <button
          onClick={handlePayment}
          className="w-full bg-maroon-600 text-white py-4 rounded-xl font-semibold text-lg active:scale-98 transition-all hover:bg-maroon-700"
        >
          Pay ${bundle.discountedPrice.toFixed(2)}
        </button>
      </div>

      <div className="h-6" />
    </div>
  );
}

export default Payment;