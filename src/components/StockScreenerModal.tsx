import React, { useState } from 'react';
import { X, Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MarketAsset, TechnicalRating } from '../types/market';

interface StockScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  allStocks: MarketAsset[];
  onSelectStock: (stock: MarketAsset) => void;
}

export const StockScreenerModal: React.FC<StockScreenerModalProps> = ({
  isOpen,
  onClose,
  allStocks,
  onSelectStock,
}) => {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price' | 'changePercent'>('changePercent');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  if (!isOpen) return null;

  const sectors = ['All', 'Electronic Technology', 'Technology Services', 'Consumer Durables', 'Health Technology', 'Retail Trade'];
  const ratings = ['All', 'Strong Buy', 'Buy', 'Neutral', 'Sell', 'Strong Sell'];

  const filtered = allStocks
    .filter((s) => {
      const matchSearch =
        s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.name.toLowerCase().includes(search.toLowerCase());
      const matchSector = selectedSector === 'All' || s.sector === selectedSector;
      const matchRating = selectedRating === 'All' || s.technicalRating === selectedRating;
      return matchSearch && matchSector && matchRating;
    })
    .sort((a, b) => {
      const valA = a[sortBy] ?? 0;
      const valB = b[sortBy] ?? 0;
      return sortAsc ? valA - valB : valB - valA;
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[#2962FF]" />
            <div>
              <h2 className="text-lg font-black text-[#131722] dark:text-white">
                Global Stock Screener
              </h2>
              <p className="text-xs text-[#787B86]">
                Filter 8,429+ equities by sector, rating, market performance and fundamentals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#787B86] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 bg-[#F8F9FD] dark:bg-[#181B24] border-b border-[#E0E3EB] dark:border-[#2A2E39] flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-[#787B86] absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by symbol or company..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg text-[#131722] dark:text-white outline-none focus:border-[#2962FF]"
            />
          </div>

          {/* Sector filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#787B86] font-medium">Sector:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#131722] dark:text-white outline-none cursor-pointer"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Rating filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#787B86] font-medium">Rating:</span>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#131722] dark:text-white outline-none cursor-pointer"
            >
              {ratings.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Screener Results Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="sticky top-0 bg-[#F8F9FD] dark:bg-[#181B24] border-b border-[#E0E3EB] dark:border-[#2A2E39] text-xs text-[#787B86] uppercase select-none">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Ticker / Name</th>
                <th className="py-2.5 px-4 font-semibold hidden md:table-cell">Sector</th>
                <th
                  onClick={() => {
                    if (sortBy === 'price') setSortAsc(!sortAsc);
                    else { setSortBy('price'); setSortAsc(false); }
                  }}
                  className="py-2.5 px-4 font-semibold text-right cursor-pointer hover:text-[#131722] dark:hover:text-white"
                >
                  <span className="inline-flex items-center gap-1 justify-end">
                    Price (USD)
                    <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th
                  onClick={() => {
                    if (sortBy === 'changePercent') setSortAsc(!sortAsc);
                    else { setSortBy('changePercent'); setSortAsc(false); }
                  }}
                  className="py-2.5 px-4 font-semibold text-right cursor-pointer hover:text-[#131722] dark:hover:text-white"
                >
                  <span className="inline-flex items-center gap-1 justify-end">
                    Change %
                    <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th className="py-2.5 px-4 font-semibold text-right hidden sm:table-cell">Market Cap</th>
                <th className="py-2.5 px-4 font-semibold text-center">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
              {filtered.map((s) => {
                const isPos = s.changePercent >= 0;
                return (
                  <tr
                    key={s.id}
                    onClick={() => {
                      onSelectStock(s);
                      onClose();
                    }}
                    className="hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]/50 transition cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          style={{ backgroundColor: s.badge.bg }}
                          className="w-7 h-7 rounded-md text-white flex items-center justify-center font-bold text-xs shrink-0"
                        >
                          {s.badge.text}
                        </div>
                        <div>
                          <div className="font-bold text-[#131722] dark:text-white flex items-center gap-1.5">
                            {s.symbol}
                            <span className="text-[10px] text-[#787B86] border border-[#E0E3EB] dark:border-[#2A2E39] px-1 rounded">
                              {s.exchange}
                            </span>
                          </div>
                          <div className="text-xs text-[#787B86] truncate max-w-[160px]">{s.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-[#787B86] hidden md:table-cell">
                      {s.sector || 'General'}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold tabular-numbers text-[#131722] dark:text-white">
                      ${s.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tabular-numbers ${
                          isPos
                            ? 'bg-[#E6F4F1] dark:bg-[#089981]/15 text-[#089981]'
                            : 'bg-[#FDF0F1] dark:bg-[#F23645]/15 text-[#F23645]'
                        }`}
                      >
                        {isPos ? '+' : ''}{s.changePercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-xs tabular-numbers font-medium text-[#131722] dark:text-white hidden sm:table-cell">
                      {s.marketCap || '-'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        s.technicalRating?.includes('Buy')
                          ? 'text-[#089981] bg-[#E6F4F1] dark:bg-[#089981]/15'
                          : s.technicalRating?.includes('Sell')
                          ? 'text-[#F23645] bg-[#FDF0F1] dark:bg-[#F23645]/15'
                          : 'text-[#787B86] bg-[#F0F3FA] dark:bg-[#2A2E39]'
                      }`}>
                        {s.technicalRating || 'Neutral'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] border-t border-[#E0E3EB] dark:border-[#2A2E39] text-xs text-[#787B86] flex items-center justify-between">
          <span>Showing {filtered.length} matched equities</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#2962FF] text-white font-semibold hover:bg-[#1E53E5] transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
