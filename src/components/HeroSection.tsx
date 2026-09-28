import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { MarketCategory } from '../types/market';

interface HeroSectionProps {
  activeCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  selectedRegion: string;
  onSelectRegion: (reg: string) => void;
}

const CATEGORIES: { id: MarketCategory; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'indices', label: 'Indices' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'forex', label: 'Forex' },
  { id: 'futures', label: 'Futures' },
  { id: 'bonds', label: 'Bonds' },
  { id: 'etfs', label: 'ETFs' },
  { id: 'economy', label: 'Economy' },
];

const REGIONS = ['Everywhere (Global)', 'Americas', 'Europe', 'Asia-Pacific'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section className="pt-8 sm:pt-10 pb-4" data-purpose="hero-title-and-tabs">
      <div className="max-w-[1380px] mx-auto px-4 text-center">
        {/* "Markets, everywhere" dropdown title */}
        <div className="relative inline-block">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center justify-center gap-2 cursor-pointer group focus:outline-none"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#131722] dark:text-white">
              {selectedRegion === 'Everywhere (Global)'
                ? 'Markets, everywhere'
                : `Markets, ${selectedRegion}`}
            </h1>
            <ChevronDown className="w-7 h-7 text-[#131722] dark:text-white mt-1 group-hover:translate-y-0.5 transition" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl shadow-xl py-2 z-50 text-left">
              <div className="px-4 py-1.5 text-xs font-bold text-[#787B86] uppercase tracking-wider">
                Select Region Focus
              </div>
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    onSelectRegion(region);
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] flex items-center justify-between transition"
                >
                  <span>{region}</span>
                  {selectedRegion === region && (
                    <Check className="w-4 h-4 text-[#2962FF]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Market Category Sub-nav Horizontal Pill Bar */}
        <div className="mt-6 sm:mt-8 flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-2 px-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722] shadow-sm'
                    : 'bg-[#F0F3FA] dark:bg-[#1E222D] hover:bg-[#E0E3EB] dark:hover:bg-[#2A2E39] text-[#131722] dark:text-[#D1D4DC]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
