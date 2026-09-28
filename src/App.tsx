/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { StocksSection } from './components/StocksSection';
import { CryptoSection } from './components/CryptoSection';
import { FuturesCurrenciesSection } from './components/FuturesCurrenciesSection';
import { EconomicCalendarSection } from './components/EconomicCalendarSection';
import { Footer } from './components/Footer';
import { SymbolDetailModal } from './components/SymbolDetailModal';
import { SearchModal } from './components/SearchModal';
import { StockScreenerModal } from './components/StockScreenerModal';
import { EconomicCalendarModal } from './components/EconomicCalendarModal';
import { WatchlistSidebar } from './components/WatchlistSidebar';
import { GetStartedModal } from './components/GetStartedModal';
import {
  MAJOR_INDICES,
  SECONDARY_INDICES,
  STOCKS_DATA,
  CRYPTO_ASSETS,
  FUTURES_CURRENCIES_ASSETS,
  ECONOMIC_EVENTS,
} from './data/mockMarketData';
import { MarketAsset, MarketCategory } from './types/market';

export default function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Market Category Navigation
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('overview');
  const [selectedRegion, setSelectedRegion] = useState<string>('Everywhere (Global)');

  // Live Market Data State
  const [primaryIndices, setPrimaryIndices] = useState<MarketAsset[]>(MAJOR_INDICES);
  const [secondaryIndices, setSecondaryIndices] = useState<MarketAsset[]>(SECONDARY_INDICES);
  const [stocksData, setStocksData] = useState<Record<string, MarketAsset[]>>(STOCKS_DATA);
  const [cryptoAssets, setCryptoAssets] = useState<MarketAsset[]>(CRYPTO_ASSETS);
  const [futuresCurrenciesAssets, setFuturesCurrenciesAssets] = useState<MarketAsset[]>(FUTURES_CURRENCIES_ASSETS);
  const [economicEvents] = useState(ECONOMIC_EVENTS);

  // Modals & Drawers
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [screenerModalOpen, setScreenerModalOpen] = useState<boolean>(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState<boolean>(false);
  const [watchlistSidebarOpen, setWatchlistSidebarOpen] = useState<boolean>(false);
  const [getStartedModalOpen, setGetStartedModalOpen] = useState<boolean>(false);

  // Live Updates Simulation
  const [isLiveUpdating, setIsLiveUpdating] = useState<boolean>(true);

  // Watchlist stored in LocalStorage
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      return saved ? JSON.parse(saved) : ['nvda', 'btcusd', 'spx'];
    } catch {
      return ['nvda', 'btcusd', 'spx'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tv_watchlist', JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live tick simulation
  useEffect(() => {
    if (!isLiveUpdating) return;

    const interval = setInterval(() => {
      // Pick a random collection to tick
      const dice = Math.random();

      if (dice < 0.35) {
        // Tick one stock
        setStocksData((prev) => {
          const tab = 'large-cap';
          const items = prev[tab] || [];
          if (!items.length) return prev;
          const idx = Math.floor(Math.random() * items.length);
          const item = items[idx];
          const delta = (Math.random() - 0.49) * 0.4;
          const newPrice = Math.max(1, item.price + delta);
          const newChange = item.change + delta;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;

          const updated = [...items];
          updated[idx] = {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
          return { ...prev, [tab]: updated };
        });
      } else if (dice < 0.65) {
        // Tick crypto
        setCryptoAssets((prev) => {
          const idx = Math.floor(Math.random() * prev.length);
          const item = prev[idx];
          const pct = (Math.random() - 0.49) * 0.003;
          const newPrice = item.price * (1 + pct);
          const newChange = item.change + (newPrice - item.price);
          const newChangePercent = item.changePercent + pct * 100;

          const updated = [...prev];
          updated[idx] = {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
          return updated;
        });
      } else {
        // Tick primary indices
        setPrimaryIndices((prev) => {
          const idx = Math.floor(Math.random() * prev.length);
          const item = prev[idx];
          const delta = (Math.random() - 0.49) * 2.5;
          const newPrice = item.price + delta;
          const newChange = item.change + delta;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;

          const updated = [...prev];
          updated[idx] = {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
          return updated;
        });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveUpdating]);

  // Aggregate all assets for search & screener
  const allAssets = useMemo(() => {
    const stockList = Object.values(stocksData).flat();
    return [
      ...primaryIndices,
      ...secondaryIndices,
      ...stockList,
      ...cryptoAssets,
      ...futuresCurrenciesAssets,
    ];
  }, [primaryIndices, secondaryIndices, stocksData, cryptoAssets, futuresCurrenciesAssets]);

  const uniqueAllStocks = useMemo(() => {
    const seen = new Set<string>();
    const list: MarketAsset[] = [];
    Object.values(stocksData).forEach((arr) => {
      arr.forEach((item) => {
        if (!seen.has(item.symbol)) {
          seen.add(item.symbol);
          list.push(item);
        }
      });
    });
    return list;
  }, [stocksData]);

  // Watchlist full items
  const watchlistItems = useMemo(() => {
    return allAssets.filter((a) => watchlist.includes(a.id));
  }, [allAssets, watchlist]);

  // Handle Watchlist Toggle
  const handleToggleWatchlist = useCallback(
    (id: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setWatchlist((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    },
    []
  );

  // Category select scroll / filter
  const handleSelectCategory = (cat: MarketCategory) => {
    setActiveCategory(cat);
    if (cat === 'indices') {
      document.getElementById('indices')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'stocks') {
      document.getElementById('stocks')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'crypto') {
      document.getElementById('crypto')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'futures' || cat === 'forex' || cat === 'bonds') {
      document.getElementById('futures')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'economy') {
      document.getElementById('economy')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-[#D1D4DC] min-h-screen flex flex-col antialiased transition-colors duration-200">
      {/* Main Header */}
      <Header
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWatchlist={() => setWatchlistSidebarOpen(true)}
        watchlistCount={watchlist.length}
        isLiveUpdating={isLiveUpdating}
        onToggleLive={() => setIsLiveUpdating(!isLiveUpdating)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenGetStarted={() => setGetStartedModalOpen(true)}
      />

      {/* Hero Headline & Category Pill Navigation */}
      <HeroSection
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* Main Content Sections */}
      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 py-6 space-y-12">
        {/* Indices Section */}
        {(activeCategory === 'overview' || activeCategory === 'indices') && (
          <IndicesSection
            primaryIndices={primaryIndices}
            secondaryIndices={secondaryIndices}
            onSelectAsset={setSelectedAsset}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* Stocks Section */}
        {(activeCategory === 'overview' || activeCategory === 'stocks') && (
          <StocksSection
            stocksData={stocksData}
            onSelectAsset={setSelectedAsset}
            onOpenScreener={() => setScreenerModalOpen(true)}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* 2-Column Grid: Crypto & Futures/Currencies */}
        {(activeCategory === 'overview' ||
          activeCategory === 'crypto' ||
          activeCategory === 'futures' ||
          activeCategory === 'forex' ||
          activeCategory === 'bonds') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(activeCategory === 'overview' || activeCategory === 'crypto') && (
              <CryptoSection
                cryptoAssets={cryptoAssets}
                onSelectAsset={setSelectedAsset}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />
            )}

            {(activeCategory === 'overview' ||
              activeCategory === 'futures' ||
              activeCategory === 'forex' ||
              activeCategory === 'bonds') && (
              <FuturesCurrenciesSection
                assets={futuresCurrenciesAssets}
                onSelectAsset={setSelectedAsset}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />
            )}
          </div>
        )}

        {/* Economic Calendar Section */}
        {(activeCategory === 'overview' || activeCategory === 'economy') && (
          <EconomicCalendarSection
            events={economicEvents}
            onOpenFullCalendar={() => setCalendarModalOpen(true)}
          />
        )}
      </main>

      {/* TradingView Footer */}
      <Footer />

      {/* Interactive Symbol Detail Modal */}
      <SymbolDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        isStarred={selectedAsset ? watchlist.includes(selectedAsset.id) : false}
        onToggleWatchlist={(id) => handleToggleWatchlist(id)}
      />

      {/* Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        allAssets={allAssets}
        onSelectAsset={setSelectedAsset}
      />

      {/* Stock Screener Modal */}
      <StockScreenerModal
        isOpen={screenerModalOpen}
        onClose={() => setScreenerModalOpen(false)}
        allStocks={uniqueAllStocks}
        onSelectStock={setSelectedAsset}
      />

      {/* Economic Calendar Modal */}
      <EconomicCalendarModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        events={economicEvents}
      />

      {/* Watchlist Drawer */}
      <WatchlistSidebar
        isOpen={watchlistSidebarOpen}
        onClose={() => setWatchlistSidebarOpen(false)}
        watchlistItems={watchlistItems}
        onSelectAsset={setSelectedAsset}
        onRemoveItem={(id) => handleToggleWatchlist(id)}
        onClearAll={() => setWatchlist([])}
      />

      {/* Get Started / Account Modal */}
      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
      />
    </div>
  );
}
