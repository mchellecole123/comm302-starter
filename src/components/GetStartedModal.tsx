import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl w-full max-w-md p-6 shadow-2xl relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#787B86] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-5 text-center">
            {/* TV Logo */}
            <div className="w-12 h-12 rounded-2xl bg-[#131722] dark:bg-white text-white dark:text-[#131722] mx-auto flex items-center justify-center shadow-md">
              <svg className="h-6 w-9 fill-current" viewBox="0 0 36 24">
                <path d="M0 4.5C0 2.01472 2.01472 0 4.5 0H7.5C9.98528 0 12 2.01472 12 4.5V19.5C12 21.9853 9.98528 24 7.5 24H4.5C2.01472 24 0 21.9853 0 19.5V4.5Z" />
                <path d="M12 4.5C12 2.01472 14.0147 0 16.5 0H22.5C23.0523 0 23.5 0.447715 23.5 1V5C23.5 5.55228 23.0523 6 22.5 6H19.5V19.5C19.5 21.9853 17.4853 24 15 24H12V4.5Z" />
                <path d="M24 4.5C24 2.01472 26.0147 0 28.5 0H31.5C33.9853 0 36 2.01472 36 4.5V19.5C36 21.9853 33.9853 24 31.5 24H28.5C26.0147 24 24 21.9853 24 19.5V4.5Z" />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#131722] dark:text-white">
                Join 60+ Million Traders
              </h3>
              <p className="text-xs text-[#787B86] mt-1">
                Unlock real-time streaming, advanced multi-chart layouts, and custom Pine Script alerts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#787B86] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trader@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#181B24] text-sm text-[#131722] dark:text-white outline-none focus:border-[#2962FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl tv-btn-gradient text-white text-sm font-bold shadow-md hover:opacity-95 transition"
              >
                Continue with Email
              </button>
            </form>

            <div className="relative flex items-center justify-center my-4">
              <span className="absolute inset-x-0 h-px bg-[#E0E3EB] dark:bg-[#2A2E39]" />
              <span className="relative bg-white dark:bg-[#1E222D] px-3 text-xs text-[#787B86]">
                or connect with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSubmitted(true)}
                className="py-2 px-3 border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl text-xs font-semibold hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39] transition flex items-center justify-center gap-2 text-[#131722] dark:text-white"
              >
                <span>Google</span>
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="py-2 px-3 border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl text-xs font-semibold hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39] transition flex items-center justify-center gap-2 text-[#131722] dark:text-white"
              >
                <span>Apple</span>
              </button>
            </div>

            <p className="text-[11px] text-[#787B86] leading-relaxed">
              By proceeding, you agree to TradingView's Terms of Service and Privacy Policy.
            </p>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#089981] mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-[#131722] dark:text-white">
              Welcome to TradingView!
            </h3>
            <p className="text-xs text-[#787B86] max-w-xs mx-auto">
              Your session is active. Live market streaming and custom alerts are enabled for your workspace.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-[#2962FF] text-white text-sm font-semibold hover:bg-[#1E53E5] transition"
            >
              Start Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
