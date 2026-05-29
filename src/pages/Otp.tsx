import { useState, useEffect, useRef } from 'react';
import brandLogo from '../assets/logo.png';
import { theme } from '../styles/theme';

interface OtpProps {
  phone: string;
  setScreen: (screen: 'login' | 'otp' | 'home') => void;
}

function Otp({ phone, setScreen }: OtpProps) {
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);

  // Auto-focus first input on mount
  useEffect(() => {
    setTimeout(() => {
      if (inputRefs[0]?.current) {
        inputRefs[0].current.focus();
      }
    }, 100);
  }, []);

  // Resend timer countdown
  useEffect(() => {
    let interval: number | undefined;
    if (resendDisabled && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
      setTimer(30);
    }
    return () => {
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [resendDisabled, timer]);

  const handleOtpChange = (value: string, index: number): void => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);
    
    // Auto focus next
    if (value && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleVerify = (): void => {
    const otpCode = otpValues.join('');
    if (otpCode.length === 4) {
      setIsVerifying(true);
      // Simulate API call - replace with your actual verification logic
      setTimeout(() => {
        setIsVerifying(false);
        setScreen('home');
      }, 600);
    } else {
      // Shake animation on incomplete OTP
      const container = document.getElementById('otp-container');
      if (container) {
        container.classList.add('animate-shake');
        setTimeout(() => container.classList.remove('animate-shake'), 400);
      }
    }
  };

  const handleResendCode = (): void => {
    if (!resendDisabled) {
      setResendDisabled(true);
      setTimer(30);
      setOtpValues(['', '', '', '']);
      if (inputRefs[0]?.current) {
        inputRefs[0].current.focus();
      }
    }
  };

  const isOtpFull = otpValues.every(digit => digit.length === 1);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900 overflow-x-hidden flex items-center justify-center">
      {/* Soft background glow elements */}
      <div className="absolute top-0 left-0 w-full h-[320px] bg-gradient-to-br from-maroon-700/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-maroon-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-60 h-60 bg-maroon-600/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Header with back button and brand */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-12 flex items-center justify-between">
        <button 
          onClick={() => setScreen('login')}
          className="w-10 h-10 rounded-full bg-maroon-800/50 shadow-md border border-maroon-700 flex items-center justify-center text-maroon-200 text-xl active:scale-95 transition-all hover:bg-maroon-700"
          aria-label="Go back"
        >
          ←
        </button>
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-maroon-800 shadow-md border border-maroon-700">
          <img src={brandLogo} alt="logo" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6 py-8 mt-16">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            Enter OTP
          </h2>
          <p className="text-maroon-200 text-sm">
            We sent a verification code to
          </p>
          <div className="mt-3">
            <span className="text-maroon-100 font-semibold text-base bg-maroon-800/50 px-4 py-2 rounded-full inline-block border border-maroon-700">
              +252 {phone}
            </span>
          </div>
        </div>

        {/* OTP Inputs */}
        <div id="otp-container" className="flex justify-between gap-3 my-10">
          {otpValues.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`
                w-full aspect-square max-w-[70px] text-center text-3xl font-bold
                rounded-xl border-2 transition-all duration-150 outline-none
                ${digit 
                  ? 'border-maroon-500 bg-maroon-800/70 text-white' 
                  : 'border-maroon-700 bg-maroon-800/50 text-white'}
                focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 focus:bg-maroon-800/70
              `}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!isOtpFull || isVerifying}
          className={`
            w-full h-[52px] rounded-xl font-semibold text-base transition-all duration-200
            ${isOtpFull && !isVerifying 
              ? 'bg-maroon-600 text-white shadow-lg shadow-maroon-900/50 active:scale-[0.97] hover:bg-maroon-700' 
              : 'bg-maroon-800/50 text-maroon-400 cursor-not-allowed border border-maroon-700'}
          `}
        >
          {isVerifying ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Verifying...
            </span>
          ) : (
            'Verify & Access'
          )}
        </button>

        {/* Resend Section */}
        <div className="mt-8 pt-4 text-center">
          <p className="text-sm text-maroon-300">
            Didn't receive code?{' '}
            <button
              onClick={handleResendCode}
              disabled={resendDisabled}
              className={`
                font-semibold transition-all
                ${resendDisabled ? 'text-maroon-500' : 'text-maroon-300 hover:text-maroon-100'}
              `}
            >
              {resendDisabled ? `Resend in ${timer}s` : 'Resend Code'}
            </button>
          </p>
        </div>
      </div>

      {/* Shake animation styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}

export default Otp;