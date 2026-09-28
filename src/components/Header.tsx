import React, { useState } from 'react';
import { Search, Globe, User, Star, Activity, Moon, Sun, Check, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  isLiveUpdating: boolean;
  onToggleLive: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  isLiveUpdating,
  onToggleLive,
  isDarkMode,
  onToggleDarkMode,
  onOpenGetStarted,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const languages = ['EN', 'ES', 'DE', 'FR', 'JA', 'ZH'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-b border-[#E0E3EB] dark:border-[#2A2E39] h-16 transition-colors duration-200">
      <div className="max-w-[1380px] mx-auto px-4 h-full flex items-center justify-between gap-2">
        {/* Left side: TV Brand Logo & Search Input */}
        <div className="flex items-center gap-4 sm:gap-6 flex-1 max-w-2xl">
          {/* TradingView Stylized Icon Logo */}
          <a
            href="#"
            aria-label="TradingView Home"
            className="flex items-center text-[#131722] dark:text-white hover:opacity-85 transition shrink-0"
          >
            <svg
              className="h-6 w-9 fill-current"
              viewBox="0 0 36 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 4.5C0 2.01472 2.01472 0 4.5 0H7.5C9.98528 0 12 2.01472 12 4.5V19.5C12 21.9853 9.98528 24 7.5 24H4.5C2.01472 24 0 21.9853 0 19.5V4.5Z" />
              <path d="M12 4.5C12 2.01472 14.0147 0 16.5 0H22.5C23.0523 0 23.5 0.447715 23.5 1V5C23.5 5.55228 23.0523 6 22.5 6H19.5V19.5C19.5 21.9853 17.4853 24 15 24H12V4.5Z" />
              <path d="M24 4.5C24 2.01472 26.0147 0 28.5 0H31.5C33.9853 0 36 2.01472 36 4.5V19.5C36 21.9853 33.9853 24 31.5 24H28.5C26.0147 24 24 21.9853 24 19.5V4.5Z" />
            </svg>
          </a>

          {/* Search Bar Input: "Search (Ctrl+K)" */}
          <div
            onClick={onOpenSearch}
            className="relative w-full max-w-[280px] cursor-pointer group"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#787B86]">
              <Search className="w-4 h-4" />
            </div>
            <div className="w-full pl-9 pr-8 py-2 text-sm bg-[#F0F3FA] dark:bg-[#1E222D] hover:bg-[#E5E9F2] dark:hover:bg-[#2A2E39] border border-transparent rounded-full text-[#787B86] flex items-center justify-between transition select-none">
              <span>Search (Ctrl+K)</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-[#787B86] bg-white dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold">
            <a
              href="#products"
              className="text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF] transition py-1"
            >
              Products
            </a>
            <a
              href="#community"
              className="text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF] transition py-1"
            >
              Community
            </a>
            <a
              href="#markets"
              className="text-[#2962FF] border-b-2 border-[#2962FF] py-1 font-bold"
            >
              Markets
            </a>
            <a
              href="#brokers"
              className="text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF] transition py-1"
            >
              Brokers
            </a>
            <a
              href="#more"
              className="text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF] transition py-1"
            >
              More
            </a>
          </nav>
        </div>

        {/* Right side: Controls & Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Data Pulse Toggle */}
          <button
            onClick={onToggleLive}
            title={isLiveUpdating ? 'Live prices active (Simulated)' : 'Live updates paused'}
            className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full border transition ${
              isLiveUpdating
                ? 'border-[#089981]/30 bg-[#E6F4F1] dark:bg-[#089981]/10 text-[#089981]'
                : 'border-[#E0E3EB] dark:border-[#2A2E39] text-[#787B86] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveUpdating ? 'bg-[#089981] animate-pulse' : 'bg-[#787B86]'
              }`}
            />
            <span className="hidden xl:inline">{isLiveUpdating ? 'Live' : 'Paused'}</span>
          </button>

          {/* Watchlist button */}
          <button
            onClick={onOpenWatchlist}
            title="Watchlist"
            className="relative p-2 text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] rounded-full transition"
          >
            <Star className="w-4 h-4" />
            {watchlistCount > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 bg-[#2962FF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-[#787B86] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] rounded-full transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] px-2 py-1 rounded transition"
            >
              <Globe className="w-4 h-4 text-[#787B86]" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-[#787B86]" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl shadow-lg py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-xs text-left text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] flex items-center justify-between"
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && <Check className="w-3.5 h-3.5 text-[#2962FF]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile */}
          <button
            aria-label="User Account"
            onClick={onOpenGetStarted}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] transition"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Get Started CTA Button with vibrant gradient */}
          <button
            onClick={onOpenGetStarted}
            className="tv-btn-gradient text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
