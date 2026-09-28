import React, { useState } from 'react';
import { Instrument } from '../types';
import { STOCKS_DATA, WORLD_STOCKS } from '../data/mockData';
import { ChevronRight, ArrowUpDown } from 'lucide-react';

interface StocksSectionProps {
  onSelectInstrument: (instrument: Instrument) => void;
  onOpenScreener: () => void;
  onViewCategory?: (cat: string) => void;
}

export const StocksSection: React.FC<StocksSectionProps> = ({
  onSelectInstrument,
  onOpenScreener,
  onViewCategory,
}) => {
  const [region, setRegion] = useState<'United States' | 'World'>('United States');
  const [activeTab, setActiveTab] = useState('Large-cap movers');
  const [sortField, setSortField] = useState<'marketCap' | 'price' | 'changePercent'>('marketCap');
  const [sortAsc, setSortAsc] = useState(false);

  const tabs = [
    'Large-cap movers',
    'Most active',
    'Top gainers',
    'Top losers',
    '52-week high',
  ];

  const currentStocks = region === 'World' 
    ? WORLD_STOCKS 
    : (STOCKS_DATA[activeTab] || STOCKS_DATA['Large-cap movers']);

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Strong Buy':
        return <span className="text-xs font-bold text-[#089981] bg-[#E6F4F1] px-2 py-0.5 rounded-full whitespace-nowrap">Strong Buy</span>;
      case 'Buy':
        return <span className="text-xs font-bold text-[#089981] bg-[#E6F4F1] px-2 py-0.5 rounded-full whitespace-nowrap">Buy</span>;
      case 'Neutral':
        return <span className="text-xs font-semibold text-[#787B86] bg-[#F0F3FA] px-2 py-0.5 rounded-full whitespace-nowrap">Neutral</span>;
      case 'Sell':
        return <span className="text-xs font-bold text-[#F23645] bg-[#FDF0F1] px-2 py-0.5 rounded-full whitespace-nowrap">Sell</span>;
      case 'Strong Sell':
        return <span className="text-xs font-bold text-[#F23645] bg-[#FDF0F1] px-2 py-0.5 rounded-full whitespace-nowrap">Strong Sell</span>;
      default:
        return null;
    }
  };

  return (
    <section data-purpose="stocks-overview" className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onViewCategory?.('Stocks')}
          className="group inline-flex items-center gap-1 text-2xl font-bold text-[#131722] hover:text-[#2962FF] transition cursor-pointer"
        >
          <span>Stocks</span>
          <ChevronRight className="w-5 h-5 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-1 sm:gap-2 bg-[#F0F3FA] p-1 rounded-xl">
          <button
            onClick={() => setRegion('United States')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
              region === 'United States'
                ? 'bg-white text-[#131722] shadow-xs'
                : 'text-[#787B86] hover:text-[#131722]'
            }`}
          >
            United States
          </button>
          <button
            onClick={() => setRegion('World')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
              region === 'World'
                ? 'bg-white text-[#131722] shadow-xs'
                : 'text-[#787B86] hover:text-[#131722]'
            }`}
          >
            World
          </button>
        </div>
      </div>

      {/* Stocks Sub-tabs and Table Layout */}
      <div className="bg-white border border-[#E0E3EB] rounded-2xl overflow-hidden shadow-xs">
        {/* Table Filters / Tabs */}
        {region === 'United States' && (
          <div className="flex items-center border-b border-[#E0E3EB] px-4 overflow-x-auto no-scrollbar gap-6 text-sm font-semibold">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 whitespace-nowrap transition cursor-pointer border-b-2 ${
                  activeTab === tab
                    ? 'text-[#2962FF] border-[#2962FF]'
                    : 'text-[#787B86] hover:text-[#131722] border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Stock Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase text-[#787B86] border-b border-[#E0E3EB] bg-[#F8F9FD] select-none">
                <th className="py-3 px-4 font-semibold">Ticker / Name</th>
                <th className="py-3 px-4 font-semibold text-right">Price (USD)</th>
                <th className="py-3 px-4 font-semibold text-right">Change %</th>
                <th className="py-3 px-4 font-semibold text-right hidden sm:table-cell">Change</th>
                <th className="py-3 px-4 font-semibold text-right hidden md:table-cell">Volume</th>
                <th className="py-3 px-4 font-semibold text-right">Market Cap</th>
                <th className="py-3 px-4 font-semibold text-center hidden lg:table-cell">Technical Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] text-sm">
              {currentStocks.map((stock) => {
                const isPositive = stock.changePercent >= 0;
                return (
                  <tr
                    key={stock.id}
                    onClick={() => onSelectInstrument(stock)}
                    className="hover:bg-[#F8F9FD] transition cursor-pointer group"
                  >
                    {/* Ticker & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 text-white shadow-xs"
                          style={{ backgroundColor: stock.badgeBg || '#131722' }}
                        >
                          {stock.badgeLabel || stock.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-[#131722] flex items-center gap-1.5 group-hover:text-[#2962FF] transition-colors">
                            {stock.symbol}
                            <span className="text-[10px] font-normal text-[#787B86] border border-[#E0E3EB] px-1 rounded">
                              {stock.exchange}
                            </span>
                          </div>
                          <div className="text-xs text-[#787B86] truncate max-w-[140px] sm:max-w-none">
                            {stock.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 text-right font-semibold tabular-numbers text-[#131722]">
                      {stock.price.toFixed(2)}
                    </td>

                    {/* Change % */}
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tabular-numbers ${
                          isPositive
                            ? 'bg-[#E6F4F1] text-[#089981]'
                            : 'bg-[#FDF0F1] text-[#F23645]'
                        }`}
                      >
                        {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                      </span>
                    </td>

                    {/* Change ($) */}
                    <td
                      className={`py-3.5 px-4 text-right text-xs font-medium tabular-numbers hidden sm:table-cell ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${stock.change.toFixed(2)}` : stock.change.toFixed(2)}
                    </td>

                    {/* Volume */}
                    <td className="py-3.5 px-4 text-right text-xs text-[#787B86] tabular-numbers hidden md:table-cell">
                      {stock.volume}
                    </td>

                    {/* Market Cap */}
                    <td className="py-3.5 px-4 text-right font-medium text-xs text-[#131722] tabular-numbers">
                      {stock.marketCap}
                    </td>

                    {/* Technical Rating */}
                    <td className="py-3.5 px-4 text-center hidden lg:table-cell">
                      {getRatingBadge(stock.technicalRating)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Link */}
        <div className="p-3 bg-[#F8F9FD] border-t border-[#E0E3EB] text-center">
          <button
            onClick={onOpenScreener}
            className="text-xs font-bold text-[#2962FF] hover:underline cursor-pointer inline-flex items-center gap-1"
          >
            <span>Launch Stock Screener (8,429 stocks)</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
