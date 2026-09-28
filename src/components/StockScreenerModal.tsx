import React, { useState } from 'react';
import { Instrument } from '../types';
import { ALL_INSTRUMENTS } from '../data/mockData';
import { X, Search, SlidersHorizontal, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

interface StockScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstrument: (instrument: Instrument) => void;
}

export const StockScreenerModal: React.FC<StockScreenerModalProps> = ({
  isOpen,
  onClose,
  onSelectInstrument,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState<'marketCap' | 'price' | 'changePercent'>('changePercent');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  if (!isOpen) return null;

  // Filter only stocks and indices
  const stocks = ALL_INSTRUMENTS.filter((i) => i.category === 'Stocks' || i.category === 'Indices');

  const filteredStocks = stocks.filter((st) => {
    const matchesSearch =
      st.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 'All' || st.technicalRating === selectedRating;
    return matchesSearch && matchesRating;
  });

  filteredStocks.sort((a, b) => {
    let valA = 0;
    let valB = 0;
    if (sortBy === 'price') {
      valA = a.price;
      valB = b.price;
    } else if (sortBy === 'changePercent') {
      valA = a.changePercent;
      valB = b.changePercent;
    } else {
      // rough numeric parse for marketCap
      valA = parseFloat(a.marketCap.replace(/[^0-9.]/g, '')) * (a.marketCap.includes('T') ? 1000 : 1);
      valB = parseFloat(b.marketCap.replace(/[^0-9.]/g, '')) * (b.marketCap.includes('T') ? 1000 : 1);
    }
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const toggleSort = (field: 'marketCap' | 'price' | 'changePercent') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-[#E0E3EB] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2962FF] text-white flex items-center justify-center font-bold">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#131722]">Stock Screener</h2>
              <p className="text-xs text-[#787B86]">Filter and sort through 8,429 global assets by technical indicators</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 border-b border-[#E0E3EB] bg-[#F8F9FD] flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#787B86] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ticker or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E0E3EB] rounded-xl text-[#131722] placeholder-[#787B86] focus:outline-none focus:ring-2 focus:ring-[#2962FF]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-semibold text-[#787B86]">Rating:</span>
            {['All', 'Strong Buy', 'Buy', 'Neutral', 'Sell'].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRating(r)}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  selectedRating === r
                    ? 'bg-[#131722] text-white'
                    : 'bg-white border border-[#E0E3EB] text-[#787B86] hover:text-[#131722]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Screener Data Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#F8F9FD] text-xs uppercase text-[#787B86] border-b border-[#E0E3EB]">
              <tr>
                <th className="py-3 px-4 font-semibold">Symbol / Name</th>
                <th
                  onClick={() => toggleSort('price')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-[#131722]"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('changePercent')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-[#131722]"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Change %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold text-right hidden sm:table-cell">Volume</th>
                <th
                  onClick={() => toggleSort('marketCap')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-[#131722]"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Market Cap</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold text-center">Technical Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] text-sm">
              {filteredStocks.map((st) => {
                const isPos = st.changePercent >= 0;
                return (
                  <tr
                    key={st.id}
                    onClick={() => {
                      onSelectInstrument(st);
                      onClose();
                    }}
                    className="hover:bg-[#F8F9FD] transition cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0"
                          style={{ backgroundColor: st.badgeBg || '#131722' }}
                        >
                          {st.badgeLabel || st.symbol.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#131722]">{st.symbol}</p>
                          <p className="text-xs text-[#787B86] truncate max-w-xs">{st.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold tabular-numbers text-[#131722]">
                      ${st.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tabular-numbers ${
                          isPos ? 'bg-[#E6F4F1] text-[#089981]' : 'bg-[#FDF0F1] text-[#F23645]'
                        }`}
                      >
                        {isPos ? `+${st.changePercent.toFixed(2)}%` : `${st.changePercent.toFixed(2)}%`}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-xs text-[#787B86] tabular-numbers hidden sm:table-cell">
                      {st.volume}
                    </td>
                    <td className="py-3 px-4 text-right text-xs font-medium text-[#131722] tabular-numbers">
                      {st.marketCap}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          st.technicalRating.includes('Buy')
                            ? 'bg-[#E6F4F1] text-[#089981]'
                            : st.technicalRating.includes('Sell')
                            ? 'bg-[#FDF0F1] text-[#F23645]'
                            : 'bg-[#F0F3FA] text-[#787B86]'
                        }`}
                      >
                        {st.technicalRating}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F9FD] border-t border-[#E0E3EB] text-center text-xs text-[#787B86]">
          Showing {filteredStocks.length} matching securities • Click any row for in-depth chart
        </div>
      </div>
    </div>
  );
};
