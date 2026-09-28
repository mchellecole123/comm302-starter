/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { StocksSection } from './components/StocksSection';
import { CryptoAndCommoditiesSection } from './components/CryptoAndCommoditiesSection';
import { EconomicCalendarSection } from './components/EconomicCalendarSection';
import { Footer } from './components/Footer';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SearchModal } from './components/SearchModal';
import { StockScreenerModal } from './components/StockScreenerModal';
import { EconomicCalendarModal } from './components/EconomicCalendarModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';

import { Category, Instrument } from './types';
import {
  INDICES_DATA,
  STOCKS_DATA,
  CRYPTO_DATA,
  FUTURES_FOREX_DATA,
  ECONOMIC_EVENTS,
  ALL_INSTRUMENTS,
} from './data/mockData';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Overview');
  const [selectedMarketRegion, setSelectedMarketRegion] = useState<string>('Everywhere');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);

  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Watchlist persisted state
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      return saved ? JSON.parse(saved) : ['NVDA', 'BTCUSD', 'AAPL'];
    } catch {
      return ['NVDA', 'BTCUSD', 'AAPL'];
    }
  });

  const [liveUpdatesEnabled, setLiveUpdatesEnabled] = useState(true);
  const [currentIndices, setCurrentIndices] = useState<Instrument[]>(INDICES_DATA);
  const [currentCrypto, setCurrentCrypto] = useState<Instrument[]>(CRYPTO_DATA);
  const [currentFutures, setCurrentFutures] = useState<Instrument[]>(FUTURES_FOREX_DATA);

  // Sync watchlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tv_watchlist', JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist]);

  // Global hotkey Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Subtle Live Market Simulation Ticker
  useEffect(() => {
    if (!liveUpdatesEnabled) return;

    const interval = setInterval(() => {
      // Pick random asset to nudge slightly
      const nudge = (val: number, spread = 0.0008) => {
        const delta = (Math.random() - 0.49) * spread * val;
        return Number((val + delta).toFixed(val > 100 ? 2 : 4));
      };

      setCurrentIndices((prev) =>
        prev.map((ind) => {
          const newPrice = nudge(ind.price, 0.0003);
          return { ...ind, price: newPrice };
        })
      );

      setCurrentCrypto((prev) =>
        prev.map((c) => {
          const newPrice = nudge(c.price, 0.0007);
          return { ...c, price: newPrice };
        })
      );

      setCurrentFutures((prev) =>
        prev.map((f) => {
          const newPrice = nudge(f.price, 0.0004);
          return { ...f, price: newPrice };
        })
      );
    }, 3200);

    return () => clearInterval(interval);
  }, [liveUpdatesEnabled]);

  const handleToggleWatchlist = useCallback((symbol: string) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  }, []);

  // Filter or scroll to section based on category selection
  const handleSelectCategory = (cat: Category | string) => {
    setActiveCategory(cat as Category);
    if (cat === 'Economy') {
      setIsCalendarOpen(true);
    } else if (cat === 'ETFs') {
      setIsScreenerOpen(true);
    } else {
      const elementId =
        cat === 'Indices'
          ? 'indices-section'
          : cat === 'Stocks'
          ? 'stocks-section'
          : cat === 'Crypto' || cat === 'Forex' || cat === 'Futures' || cat === 'Bonds'
          ? 'crypto-commodities-section'
          : null;
      if (elementId) {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#131722] antialiased selection:bg-[#2962FF]/15 selection:text-[#2962FF]">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        liveUpdatesEnabled={liveUpdatesEnabled}
        onToggleLiveUpdates={() => setLiveUpdatesEnabled(!liveUpdatesEnabled)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Hero Headline & Category Pills */}
      <HeroSection
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        selectedMarketRegion={selectedMarketRegion}
        onSelectMarketRegion={setSelectedMarketRegion}
      />

      {/* Main Content Sections */}
      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 py-6 space-y-12">
        {/* Indices Section */}
        <div id="indices-section">
          <IndicesSection
            indices={currentIndices}
            onSelectInstrument={setSelectedInstrument}
            onViewCategory={handleSelectCategory}
          />
        </div>

        {/* Stocks Section */}
        <div id="stocks-section">
          <StocksSection
            onSelectInstrument={setSelectedInstrument}
            onOpenScreener={() => setIsScreenerOpen(true)}
            onViewCategory={handleSelectCategory}
          />
        </div>

        {/* Crypto & Commodities / Currencies Grid */}
        <div id="crypto-commodities-section">
          <CryptoAndCommoditiesSection
            cryptoData={currentCrypto}
            futuresForexData={currentFutures}
            onSelectInstrument={setSelectedInstrument}
            onViewCategory={handleSelectCategory}
          />
        </div>

        {/* Economic Calendar Preview */}
        <div id="economy-section">
          <EconomicCalendarSection
            events={ECONOMIC_EVENTS}
            onOpenFullCalendar={() => setIsCalendarOpen(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenCategory={handleSelectCategory}
        onOpenScreener={() => setIsScreenerOpen(true)}
      />

      {/* Interactive Symbol Detail Modal */}
      {selectedInstrument && (
        <AssetDetailModal
          instrument={selectedInstrument}
          onClose={() => setSelectedInstrument(null)}
          isWatchlisted={watchlist.includes(selectedInstrument.symbol)}
          onToggleWatchlist={handleToggleWatchlist}
        />
      )}

      {/* Global Quick Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectInstrument={setSelectedInstrument}
      />

      {/* Full Stock Screener Modal */}
      <StockScreenerModal
        isOpen={isScreenerOpen}
        onClose={() => setIsScreenerOpen(false)}
        onSelectInstrument={setSelectedInstrument}
      />

      {/* Full Economic Calendar Modal */}
      <EconomicCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      {/* Watchlist Slide-out Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistSymbols={watchlist}
        allInstruments={ALL_INSTRUMENTS}
        onSelectInstrument={setSelectedInstrument}
        onRemoveFromWatchlist={handleToggleWatchlist}
      />
    </div>
  );
}
