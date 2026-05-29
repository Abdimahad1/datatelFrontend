import { useRef, useEffect } from 'react';
import brandLogo from '../assets/logo.png';
import type { Screen } from '../App';

interface LoginProps {
  phone: string;
  setPhone: (phone: string) => void;
  setScreen: (screen: Screen) => void;
}

function Login({ phone, setPhone, setScreen }: LoginProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, []);

  const handleContinue = (): void => {
    if (phone.length >= 8 && phone.length <= 9) {
      setScreen('otp');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(value);
  };

  const isPhoneValid = phone.length >= 8 && phone.length <= 9;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900 overflow-x-hidden flex items-center justify-center">
      {/* Soft background glow elements */}
      <div className="absolute top-0 left-0 w-full h-[320px] bg-gradient-to-br from-maroon-700/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-maroon-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-60 h-60 bg-maroon-600/20 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6 py-8">
        {/* Brand Logo + Name */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-xl shadow-maroon-900/50 mb-3 border-2 border-maroon-600">
            <img 
              src={brandLogo} 
              alt="Datatel" 
              className="w-full h-full object-cover" 
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-3">
            Datatel
          </h1>
          <p className="text-maroon-200 text-center text-sm mt-1 max-w-[260px]">
            Secure access, one-time code
          </p>
        </div>

        {/* Phone Input */}
        <div className="space-y-5">
          <div className="relative">
            <div className="absolute -top-2.5 left-4 bg-maroon-800 px-2 text-xs font-medium text-maroon-200 z-10">
              Mobile number
            </div>
            <div className={`
              flex items-center h-[68px] w-full rounded-xl border-2 transition-all duration-200 bg-maroon-800/50
              ${phone.length > 0 ? 'border-maroon-500 bg-maroon-800/70 shadow-lg' : 'border-maroon-700 bg-maroon-800/50'}
              focus-within:border-maroon-500 focus-within:shadow-lg focus-within:bg-maroon-800/70
            `}>
              <div className="pl-4 pr-3 h-full flex items-center border-r border-maroon-700">
                <span className="text-maroon-300 font-semibold text-base">+252</span>
              </div>
              <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                placeholder="61 234 567"
                value={phone}
                onChange={handlePhoneChange}
                className="flex-1 h-full bg-transparent px-4 text-base text-white placeholder:text-maroon-400 tracking-wide outline-none"
              />
            </div>
            <p className="text-xs text-maroon-300 mt-2 ml-2">
              Enter 8-9 digits after +252
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!isPhoneValid}
            className={`
              w-full h-[52px] rounded-xl font-semibold text-base transition-all duration-200 mt-4
              ${isPhoneValid 
                ? 'bg-maroon-600 text-white shadow-lg shadow-maroon-900/50 active:scale-[0.97] hover:bg-maroon-700' 
                : 'bg-maroon-800/50 text-maroon-400 cursor-not-allowed border border-maroon-700'}
            `}
          >
            Continue →
          </button>

          {/* Footer text */}
          <div className="pt-8">
            <p className="text-center text-xs text-maroon-400">
              We'll send a 4-digit code to verify your device
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;