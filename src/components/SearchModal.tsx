import React, { useState, useEffect, useRef } from 'react';
import { Instrument } from '../types';
import { ALL_INSTRUMENTS } from '../data/mockData';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstrument: (instrument: Instrument) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectInstrument,
}) => {
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'Stocks', 'Crypto', 'Indices', 'Forex', 'Futures', 'Bonds'];

  const filtered = ALL_INSTRUMENTS.filter((inst) => {
    const matchesCategory = filterCategory === 'All' || inst.category === filterCategory;
    const matchesQuery =
      inst.symbol.toLowerCase().includes(query.toLowerCase()) ||
      inst.name.toLowerCase().includes(query.toLowerCase()) ||
      inst.exchange.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        onSelectInstrument(filtered[selectedIndex]);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-20">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full border border-[#E0E3EB] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787B86] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search symbol, company, or asset (e.g. NVDA, Bitcoin, S&P 500)..."
            className="w-full text-base bg-transparent border-none outline-none text-[#131722] placeholder-[#787B86] font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#787B86] hover:text-[#131722] p-1 rounded-full hover:bg-[#F0F3FA]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-semibold text-[#787B86] px-1.5 py-0.5 border border-[#E0E3EB] rounded bg-[#F8F9FD]">
            ESC
          </kbd>
        </div>

        {/* Category Pills */}
        <div className="flex items-center px-4 py-2.5 border-b border-[#E0E3EB] gap-2 overflow-x-auto no-scrollbar bg-[#F8F9FD]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'bg-white text-[#787B86] border border-[#E0E3EB] hover:text-[#131722]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#E0E3EB] p-1">
          {filtered.length > 0 ? (
            filtered.map((inst, idx) => {
              const isSelected = idx === selectedIndex;
              const isPositive = inst.changePercent >= 0;
              return (
                <div
                  key={inst.id}
                  onClick={() => {
                    onSelectInstrument(inst);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl flex items-center justify-between transition cursor-pointer ${
                    isSelected ? 'bg-[#F0F3FA]' : 'hover:bg-[#F8F9FD]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs"
                      style={{ backgroundColor: inst.badgeBg || '#131722' }}
                    >
                      {inst.badgeLabel || inst.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-sm text-[#131722]">
                        <span>{inst.symbol}</span>
                        <span className="text-[10px] text-[#787B86] border border-[#E0E3EB] px-1 rounded font-normal">
                          {inst.exchange}
                        </span>
                        <span className="text-[10px] text-[#787B86] bg-white border border-[#E0E3EB] px-1.5 rounded font-normal">
                          {inst.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#787B86] truncate max-w-[200px] sm:max-w-xs">{inst.name}</p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#131722] tabular-numbers">
                        {inst.price > 100
                          ? inst.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                          : inst.price.toFixed(4)}
                      </p>
                      <p
                        className={`text-xs font-semibold tabular-numbers flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? `+${inst.changePercent.toFixed(2)}%` : `${inst.changePercent.toFixed(2)}%`}
                      </p>
                    </div>
                    {isSelected && <ArrowRight className="w-4 h-4 text-[#2962FF] hidden sm:block" />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-[#787B86]">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for NVDA, BTC, S&P 500, or EUR/USD.</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#F8F9FD] border-t border-[#E0E3EB] flex items-center justify-between text-[11px] text-[#787B86]">
          <div className="flex items-center gap-3">
            <span><b>↑↓</b> to navigate</span>
            <span><b>↵</b> to select</span>
            <span><b>esc</b> to exit</span>
          </div>
          <span>TradingView Global Search</span>
        </div>
      </div>
    </div>
  );
};
