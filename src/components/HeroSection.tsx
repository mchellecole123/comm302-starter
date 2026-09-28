import React, { useState } from 'react';
import { Category } from '../types';
import { ChevronDown, Check, Globe2 } from 'lucide-react';

interface HeroSectionProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  selectedMarketRegion: string;
  onSelectMarketRegion: (region: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
  selectedMarketRegion,
  onSelectMarketRegion,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories: Category[] = [
    'Overview',
    'Indices',
    'Stocks',
    'Crypto',
    'Forex',
    'Futures',
    'Bonds',
    'ETFs',
    'Economy',
  ];

  const regions = [
    { id: 'Everywhere', title: 'Markets, everywhere', subtitle: 'Global multi-asset view' },
    { id: 'Americas', title: 'Markets, Americas', subtitle: 'US, Canada, Latin America exchanges' },
    { id: 'Europe', title: 'Markets, Europe', subtitle: 'LSE, Euronext, DAX, SIX' },
    { id: 'Asia-Pacific', title: 'Markets, Asia-Pacific', subtitle: 'TSE, HKEX, Shanghai, ASX' },
    { id: 'Emerging', title: 'Markets, Emerging', subtitle: 'B3, BSE, IDX, JSE' },
  ];

  const currentRegion = regions.find((r) => r.id === selectedMarketRegion) || regions[0];

  return (
    <section className="pt-8 pb-4 select-none" data-purpose="hero-title-and-tabs">
      <div className="max-w-[1380px] mx-auto px-4 text-center">
        {/* "Markets, everywhere" dropdown title */}
        <div className="relative inline-block">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center justify-center gap-2 cursor-pointer group focus:outline-none"
            aria-expanded={dropdownOpen}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#131722] group-hover:text-[#2962FF] transition-colors">
              {currentRegion.title}
            </h1>
            <ChevronDown
              className={`w-6 h-6 sm:w-7 sm:h-7 text-[#131722] mt-1 group-hover:text-[#2962FF] transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180 text-[#2962FF]' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu for Region Selection */}
          {dropdownOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 sm:w-80 bg-white border border-[#E0E3EB] rounded-2xl shadow-xl py-2 z-30 text-left animate-in fade-in zoom-in-95">
              <div className="px-3.5 py-2 border-b border-[#E0E3EB] flex items-center gap-2 text-xs font-semibold text-[#787B86]">
                <Globe2 className="w-3.5 h-3.5" />
                <span>SELECT REGIONAL FOCUS</span>
              </div>
              <div className="py-1">
                {regions.map((region) => {
                  const isSelected = selectedMarketRegion === region.id;
                  return (
                    <button
                      key={region.id}
                      onClick={() => {
                        onSelectMarketRegion(region.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 flex items-center justify-between text-left transition hover:bg-[#F8F9FD] ${
                        isSelected ? 'bg-[#F0F3FA]' : ''
                      }`}
                    >
                      <div>
                        <p className={`text-sm font-bold ${isSelected ? 'text-[#2962FF]' : 'text-[#131722]'}`}>
                          {region.title}
                        </p>
                        <p className="text-xs text-[#787B86]">{region.subtitle}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#2962FF]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Market Category Sub-nav Horizontal Pill Bar */}
        <div className="mt-8 flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] text-white shadow-sm'
                    : 'bg-[#F0F3FA] hover:bg-[#E0E3EB] text-[#131722]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
