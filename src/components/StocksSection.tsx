import React, { useState } from 'react';
import { ChevronRight, ArrowUpDown, Star } from 'lucide-react';
import { MarketAsset, StockRegion, StockTab, TechnicalRating } from '../types/market';

interface StocksSectionProps {
  stocksData: Record<string, MarketAsset[]>;
  onSelectAsset: (asset: MarketAsset) => void;
  onOpenScreener: () => void;
  watchlist: string[];
  onToggleWatchlist: (id: string, e: React.MouseEvent) => void;
}

export const StocksSection: React.FC<StocksSectionProps> = ({
  stocksData,
  onSelectAsset,
  onOpenScreener,
  watchlist,
  onToggleWatchlist,
}) => {
  const [activeTab, setActiveTab] = useState<StockTab>('large-cap');
  const [activeRegion, setActiveRegion] = useState<StockRegion>('us');
  const [sortField, setSortField] = useState<keyof MarketAsset | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const currentList =
    activeRegion === 'world'
      ? stocksData['world'] || []
      : stocksData[activeTab] || [];

  const handleSort = (field: keyof MarketAsset) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedList = [...currentList].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const getRatingBadge = (rating?: TechnicalRating) => {
    if (!rating) return null;
    switch (rating) {
      case 'Strong Buy':
        return (
          <span className="text-xs font-bold text-[#089981] bg-[#E6F4F1] dark:bg-[#089981]/15 px-2.5 py-0.5 rounded-full whitespace-nowrap">
            Strong Buy
          </span>
        );
      case 'Buy':
        return (
          <span className="text-xs font-bold text-[#089981] bg-[#E6F4F1] dark:bg-[#089981]/15 px-2.5 py-0.5 rounded-full whitespace-nowrap">
            Buy
          </span>
        );
      case 'Neutral':
        return (
          <span className="text-xs font-semibold text-[#787B86] bg-[#F0F3FA] dark:bg-[#2A2E39] px-2.5 py-0.5 rounded-full whitespace-nowrap">
            Neutral
          </span>
        );
      case 'Sell':
      case 'Strong Sell':
        return (
          <span className="text-xs font-bold text-[#F23645] bg-[#FDF0F1] dark:bg-[#F23645]/15 px-2.5 py-0.5 rounded-full whitespace-nowrap">
            {rating}
          </span>
        );
    }
  };

  return (
    <section data-purpose="stocks-overview" id="stocks">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onSelectAsset(currentList[0])}
          className="group inline-flex items-center gap-1 text-2xl font-bold text-[#131722] dark:text-white hover:text-[#2962FF] dark:hover:text-[#2962FF] transition cursor-pointer"
        >
          Stocks
          <ChevronRight className="w-5 h-5 text-[#131722] dark:text-white group-hover:text-[#2962FF] group-hover:translate-x-1 transition" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveRegion('us')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeRegion === 'us'
                ? 'bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#131722] dark:text-white font-bold'
                : 'text-[#787B86] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
            }`}
          >
            United States
          </button>
          <button
            onClick={() => setActiveRegion('world')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeRegion === 'world'
                ? 'bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#131722] dark:text-white font-bold'
                : 'text-[#787B86] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
            }`}
          >
            World
          </button>
        </div>
      </div>

      {/* Stocks Sub-tabs and Table Layout */}
      <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl overflow-hidden shadow-xs transition-colors">
        {/* Table Filters / Tabs */}
        {activeRegion === 'us' ? (
          <div className="flex items-center border-b border-[#E0E3EB] dark:border-[#2A2E39] px-4 overflow-x-auto no-scrollbar gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('large-cap')}
              className={`py-3 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'large-cap'
                  ? 'text-[#2962FF] border-b-2 border-[#2962FF]'
                  : 'text-[#787B86] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              Large-cap movers
            </button>
            <button
              onClick={() => setActiveTab('most-active')}
              className={`py-3 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'most-active'
                  ? 'text-[#2962FF] border-b-2 border-[#2962FF]'
                  : 'text-[#787B86] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              Most active
            </button>
            <button
              onClick={() => setActiveTab('gainers')}
              className={`py-3 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'gainers'
                  ? 'text-[#2962FF] border-b-2 border-[#2962FF]'
                  : 'text-[#787B86] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              Top gainers
            </button>
            <button
              onClick={() => setActiveTab('losers')}
              className={`py-3 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'losers'
                  ? 'text-[#2962FF] border-b-2 border-[#2962FF]'
                  : 'text-[#787B86] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              Top losers
            </button>
            <button
              onClick={() => setActiveTab('52-week-high')}
              className={`py-3 whitespace-nowrap transition cursor-pointer ${
                activeTab === '52-week-high'
                  ? 'text-[#2962FF] border-b-2 border-[#2962FF]'
                  : 'text-[#787B86] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              52-week high
            </button>
          </div>
        ) : (
          <div className="border-b border-[#E0E3EB] dark:border-[#2A2E39] px-4 py-3 text-xs font-semibold text-[#787B86]">
            Showing premier international market leaders across Europe & Asia
          </div>
        )}

        {/* Stock Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase text-[#787B86] border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8F9FD] dark:bg-[#181B24]">
                <th className="py-3 px-4 font-semibold">Ticker / Name</th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-[#131722] dark:hover:text-white select-none"
                >
                  <span className="inline-flex items-center gap-1 justify-end">
                    Price (USD)
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </span>
                </th>
                <th
                  onClick={() => handleSort('changePercent')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-[#131722] dark:hover:text-white select-none"
                >
                  <span className="inline-flex items-center gap-1 justify-end">
                    Change %
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </span>
                </th>
                <th className="py-3 px-4 font-semibold text-right hidden sm:table-cell">
                  Change
                </th>
                <th className="py-3 px-4 font-semibold text-right hidden md:table-cell">
                  Volume
                </th>
                <th className="py-3 px-4 font-semibold text-right">
                  Market Cap
                </th>
                <th className="py-3 px-4 font-semibold text-center hidden lg:table-cell">
                  Technical Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] text-sm">
              {sortedList.map((stock) => {
                const isPos = stock.changePercent >= 0;
                const isStarred = watchlist.includes(stock.id);

                return (
                  <tr
                    key={stock.id}
                    onClick={() => onSelectAsset(stock)}
                    className="group hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]/50 transition cursor-pointer"
                  >
                    {/* Ticker & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => onToggleWatchlist(stock.id, e)}
                          title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
                          className="opacity-0 group-hover:opacity-100 hover:scale-110 p-0.5 text-[#787B86] hover:text-[#2962FF] transition"
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              isStarred
                                ? 'fill-[#2962FF] text-[#2962FF] opacity-100'
                                : ''
                            }`}
                          />
                        </button>
                        <div
                          style={{ backgroundColor: stock.badge.bg }}
                          className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                        >
                          {stock.badge.text}
                        </div>
                        <div>
                          <div className="font-bold text-[#131722] dark:text-white flex items-center gap-1.5">
                            {stock.symbol}
                            <span className="text-[10px] font-normal text-[#787B86] border border-[#E0E3EB] dark:border-[#2A2E39] px-1 rounded">
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
                    <td className="py-3.5 px-4 text-right font-semibold tabular-numbers text-[#131722] dark:text-white">
                      {stock.price.toFixed(2)}
                    </td>

                    {/* Change % */}
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tabular-numbers ${
                          isPos
                            ? 'bg-[#E6F4F1] dark:bg-[#089981]/15 text-[#089981]'
                            : 'bg-[#FDF0F1] dark:bg-[#F23645]/15 text-[#F23645]'
                        }`}
                      >
                        {isPos ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </td>

                    {/* Change absolute */}
                    <td
                      className={`py-3.5 px-4 text-right text-xs font-medium tabular-numbers hidden sm:table-cell ${
                        isPos ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPos ? '+' : ''}
                      {stock.change.toFixed(2)}
                    </td>

                    {/* Volume */}
                    <td className="py-3.5 px-4 text-right text-xs text-[#787B86] tabular-numbers hidden md:table-cell">
                      {stock.volume || '-'}
                    </td>

                    {/* Market Cap */}
                    <td className="py-3.5 px-4 text-right font-medium text-xs text-[#131722] dark:text-white tabular-numbers">
                      {stock.marketCap || '-'}
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

        {/* Table Footer link */}
        <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] border-t border-[#E0E3EB] dark:border-[#2A2E39] text-center">
          <button
            onClick={onOpenScreener}
            className="text-xs font-bold text-[#2962FF] hover:underline cursor-pointer"
          >
            Launch Stock Screener (8,429 stocks) →
          </button>
        </div>
      </div>
    </section>
  );
};
