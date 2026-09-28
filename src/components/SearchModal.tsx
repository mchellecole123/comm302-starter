import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allAssets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allAssets,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = allAssets.filter((asset) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'stocks' && asset.assetType === 'stock') ||
      (activeFilter === 'crypto' && asset.assetType === 'crypto') ||
      (activeFilter === 'indices' && asset.assetType === 'index') ||
      (activeFilter === 'futures' && (asset.assetType === 'future' || asset.assetType === 'forex' || asset.assetType === 'bond'));

    const matchesQuery =
      asset.symbol.toLowerCase().includes(query.toLowerCase()) ||
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.exchange.toLowerCase().includes(query.toLowerCase());

    return matchesFilter && matchesQuery;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        onSelectAsset(filtered[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787B86] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search symbol, company, currency or crypto..."
            className="w-full text-base bg-transparent border-none outline-none text-[#131722] dark:text-white placeholder-[#787B86]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#787B86] hover:text-[#131722] dark:hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-[#787B86] bg-[#F0F3FA] dark:bg-[#2A2E39] border border-[#E0E3EB] dark:border-[#2A2E39] rounded">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-[#F8F9FD] dark:bg-[#181B24] border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-semibold">
          {[
            { id: 'all', label: 'All' },
            { id: 'stocks', label: 'Stocks' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'indices', label: 'Indices' },
            { id: 'futures', label: 'Futures & Forex' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFilter(f.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722]'
                  : 'bg-white dark:bg-[#1E222D] text-[#787B86] hover:text-[#131722] dark:hover:text-white border border-[#E0E3EB] dark:border-[#2A2E39]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#787B86]">
              No results found for "{query}". Try searching for NVDA, Bitcoin, or S&P 500.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isPos = item.changePercent >= 0;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectAsset(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 px-4 flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#F0F3FA] dark:bg-[#2A2E39]'
                      : 'hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        background: item.badge.bg,
                        color: item.badge.textColor,
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                    >
                      {item.badge.text}
                    </div>
                    <div>
                      <div className="font-bold text-[#131722] dark:text-white flex items-center gap-2 text-sm">
                        {item.symbol}
                        <span className="text-[10px] text-[#787B86] font-normal border border-[#E0E3EB] dark:border-[#2A2E39] px-1 rounded uppercase">
                          {item.exchange}
                        </span>
                        <span className="text-[10px] font-semibold text-[#2962FF] uppercase">
                          {item.assetType}
                        </span>
                      </div>
                      <div className="text-xs text-[#787B86]">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className="font-semibold text-sm tabular-numbers text-[#131722] dark:text-white">
                        {item.price > 10
                          ? item.price.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : item.price.toFixed(4)}
                      </div>
                      <div
                        className={`text-xs font-semibold tabular-numbers flex items-center justify-end gap-0.5 ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPos ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#787B86] opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] border-t border-[#E0E3EB] dark:border-[#2A2E39] text-xs text-[#787B86] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              Use <kbd className="px-1 py-0.5 bg-white dark:bg-[#1E222D] border rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-white dark:bg-[#1E222D] border rounded">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-white dark:bg-[#1E222D] border rounded">Enter</kbd> to select
            </span>
          </div>
          <span>{filtered.length} results</span>
        </div>
      </div>
    </div>
  );
};
