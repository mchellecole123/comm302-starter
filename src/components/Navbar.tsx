import React, { useState } from 'react';
import { Search, Globe, User, Bell, Star, Activity, ChevronDown, Check } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  liveUpdatesEnabled: boolean;
  onToggleLiveUpdates: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  watchlistCount,
  onOpenWatchlist,
  liveUpdatesEnabled,
  onToggleLiveUpdates,
  activeCategory,
  onSelectCategory,
}) => {
  const [activeNav, setActiveNav] = useState('Markets');
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [profileOpen, setProfileOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);

  const languages = ['EN - English', 'ES - Español', 'DE - Deutsch', 'JA - 日本語', 'FR - Français'];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E3EB] h-16 transition-all select-none">
        <div className="max-w-[1380px] mx-auto px-4 h-full flex items-center justify-between">
          {/* Left side: TV Brand Logo & Search Input & Primary Nav */}
          <div className="flex items-center gap-6">
            {/* TradingView Stylized Icon Logo */}
            <button 
              onClick={() => onSelectCategory('Overview')}
              aria-label="TradingView Home" 
              className="flex items-center text-[#131722] hover:opacity-85 transition focus:outline-none cursor-pointer"
            >
              <svg className="h-6 w-9 fill-current" fill="none" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 4.5C0 2.01472 2.01472 0 4.5 0H7.5C9.98528 0 12 2.01472 12 4.5V19.5C12 21.9853 9.98528 24 7.5 24H4.5C2.01472 24 0 21.9853 0 19.5V4.5Z" />
                <path d="M12 4.5C12 2.01472 14.0147 0 16.5 0H22.5C23.0523 0 23.5 0.447715 23.5 1V5C23.5 5.55228 23.0523 6 22.5 6H19.5V19.5C19.5 21.9853 17.4853 24 15 24H12V4.5Z" />
                <path d="M24 4.5C24 2.01472 26.0147 0 28.5 0H31.5C33.9853 0 36 2.01472 36 4.5V19.5C36 21.9853 33.9853 24 31.5 24H28.5C26.0147 24 24 21.9853 24 19.5V4.5Z" />
              </svg>
            </button>

            {/* Search Bar Input: "Search (Ctrl+K)" */}
            <div className="relative w-56 sm:w-64 md:w-72">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full text-left pl-9 pr-8 py-2 text-sm bg-[#F0F3FA] hover:bg-[#E5E9F2] border border-transparent rounded-full text-[#787B86] hover:text-[#131722] cursor-pointer transition flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-[#2962FF]"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#787B86] absolute left-3 top-1/2 -translate-y-1/2" />
                  <span className="truncate">Search (Ctrl+K)</span>
                </div>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-[#787B86] bg-white border border-[#E0E3EB] rounded">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Primary Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold">
              {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveNav(tab);
                    if (tab === 'Markets') {
                      onSelectCategory('Overview');
                    }
                  }}
                  className={`py-1 cursor-pointer transition relative ${
                    activeNav === tab
                      ? 'text-[#2962FF] font-bold border-b-2 border-[#2962FF]'
                      : 'text-[#131722] hover:text-[#2962FF]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Right side: Utility Actions (Live ticker, Watchlist, Language, Profile, CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Market Pulse toggle */}
            <button
              onClick={onToggleLiveUpdates}
              title={liveUpdatesEnabled ? 'Live market simulation active' : 'Click to enable live ticks'}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition ${
                liveUpdatesEnabled
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${liveUpdatesEnabled ? 'bg-emerald-500 animate-ping' : 'bg-neutral-400'}`} />
              <Activity className="w-3.5 h-3.5" />
              <span>{liveUpdatesEnabled ? 'Live Feed' : 'Static'}</span>
            </button>

            {/* Watchlist Quick Access */}
            <button
              onClick={onOpenWatchlist}
              title="Watchlist"
              className="relative p-2 rounded-lg text-[#131722] hover:bg-[#F0F3FA] transition cursor-pointer"
            >
              <Star className="w-4 h-4 text-[#787B86] hover:text-amber-500 transition-colors" />
              {watchlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#2962FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {watchlistCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#131722] hover:text-[#2962FF] px-2 py-1 rounded transition cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[#787B86]" />
                <span>{selectedLang}</span>
                <ChevronDown className="w-3 h-3 text-[#787B86]" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-[#E0E3EB] rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setSelectedLang(l.substring(0, 2));
                        setLangOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-[#131722] hover:bg-[#F0F3FA] flex items-center justify-between"
                    >
                      <span>{l}</span>
                      {selectedLang === l.substring(0, 2) && <Check className="w-3.5 h-3.5 text-[#2962FF]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User Account"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#131722] hover:bg-[#F0F3FA] transition cursor-pointer"
              >
                <User className="w-5 h-5 text-[#131722]" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E0E3EB] rounded-2xl shadow-xl p-3 z-50">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#E0E3EB]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2962FF] to-[#7645D9] text-white flex items-center justify-center font-bold text-sm">
                      TV
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#131722]">Pro Trader</p>
                      <p className="text-xs text-[#787B86]">michellenj2017@gmail.com</p>
                    </div>
                  </div>
                  <div className="pt-2 space-y-1 text-xs font-semibold text-[#131722]">
                    <button onClick={() => { onOpenWatchlist(); setProfileOpen(false); }} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#F0F3FA] flex items-center justify-between">
                      <span>My Watchlist</span>
                      <span className="text-[#2962FF] font-bold">{watchlistCount}</span>
                    </button>
                    <button onClick={() => setProfileOpen(false)} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#F0F3FA]">
                      Trading Accounts
                    </button>
                    <button onClick={() => setProfileOpen(false)} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#F0F3FA]">
                      Chart Layouts
                    </button>
                    <button onClick={() => setProfileOpen(false)} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#F0F3FA]">
                      Billing & Plans
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Get Started CTA Button with vibrant gradient */}
            <button
              onClick={() => setGetStartedOpen(true)}
              className="tv-btn-gradient text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* Get Started Modal Dialog */}
      {getStartedOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E0E3EB] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setGetStartedOpen(false)}
              className="absolute top-4 right-4 text-[#787B86] hover:text-[#131722] p-1.5 rounded-full hover:bg-[#F0F3FA]"
            >
              ✕
            </button>
            <div className="text-center pt-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2962FF] to-[#7645D9] text-white flex items-center justify-center mx-auto mb-4 font-black text-xl shadow-md">
                TV
              </div>
              <h2 className="text-2xl font-black text-[#131722]">Welcome to TradingView</h2>
              <p className="text-xs text-[#787B86] mt-1.5">
                Join 60+ million traders & investors covering global markets with world-class charting and screeners.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button 
                onClick={() => setGetStartedOpen(false)}
                className="w-full py-2.5 px-4 bg-[#131722] text-white font-semibold text-sm rounded-xl hover:bg-black transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue with Google</span>
              </button>
              <button 
                onClick={() => setGetStartedOpen(false)}
                className="w-full py-2.5 px-4 bg-[#F0F3FA] text-[#131722] font-semibold text-sm rounded-xl hover:bg-[#E0E3EB] transition cursor-pointer"
              >
                Sign up with Email
              </button>
            </div>

            <p className="text-[11px] text-center text-[#787B86] mt-4">
              By proceeding, you agree to our Terms of Service & Privacy Policy. Look first / Then leap.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
