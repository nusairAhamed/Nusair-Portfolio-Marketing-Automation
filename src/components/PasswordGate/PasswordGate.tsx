import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = 'Temp@2026';
const STORAGE_KEY = 'portfolio_preview_auth';

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = password.trim();

    if (trimmed === CORRECT_PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, 'granted');
        sessionStorage.setItem(STORAGE_KEY, 'granted');
      } catch {
        // Fallback for restricted storage
      }
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      inputRef.current?.select();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#080C14] text-white selection:bg-[#C6F135] selection:text-[#080C14]">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-xs flex flex-col gap-3 transition-transform ${
          isShaking ? 'animate-shake-x' : ''
        }`}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Password"
            autoComplete="current-password"
            className={`w-full px-4 py-3 pr-11 text-sm bg-slate-900/90 text-white rounded-xl border placeholder:text-slate-500 focus:outline-none transition-all ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                : 'border-white/10 focus:border-[#C6F135] focus:ring-1 focus:ring-[#C6F135]'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-[#C6F135] text-slate-950 hover:bg-[#bbf01d] active:scale-[0.99] transition-all cursor-pointer shadow-[0_2px_12px_rgba(198,241,53,0.25)]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
