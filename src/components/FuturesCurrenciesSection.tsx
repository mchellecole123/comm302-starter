import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface FuturesCurrenciesSectionProps {
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string, e: React.MouseEvent) => void;
}

export const FuturesCurrenciesSection: React.FC<FuturesCurrenciesSectionProps> = ({
  assets,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
}) => {
  return (
    <section className="space-y-4" data-purpose="futures-forex-overview" id="futures">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectAsset(assets[0])}
          className="group inline-flex items-center gap-1 text-2xl font-bold text-[#131722] dark:text-white hover:text-[#2962FF] dark:hover:text-[#2962FF] transition cursor-pointer"
        >
          Futures &amp; Currencies
          <ChevronRight className="w-5 h-5 text-[#131722] dark:text-white group-hover:text-[#2962FF] group-hover:translate-x-1 transition" />
        </button>
        <span className="text-xs text-[#787B86] font-medium">Real-time / Delayed</span>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] overflow-hidden shadow-xs transition-colors">
        {assets.map((item) => {
          const isPos = item.changePercent >= 0;
          const isStarred = watchlist.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => onSelectAsset(item)}
              className="group p-4 flex items-center justify-between hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => onToggleWatchlist(item.id, e)}
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
                  style={{
                    backgroundColor: item.badge.bg,
                    color: item.badge.textColor,
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                >
                  {item.badge.text}
                </div>
                <div>
                  <div className="font-bold text-[#131722] dark:text-white flex items-center gap-1.5">
                    {item.name}
                    <span className="text-[10px] text-[#787B86] font-normal uppercase">
                      {item.symbol}
                    </span>
                  </div>
                  <div className="text-xs text-[#787B86]">{item.exchange}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold tabular-numbers text-[#131722] dark:text-white">
                  {item.assetType === 'bond'
                    ? `${item.price.toFixed(3)}%`
                    : item.price > 100
                    ? item.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : item.price.toFixed(4)}
                </div>
                <span
                  className={`inline-flex items-center px-1.5 py-0.2 rounded text-xs font-semibold tabular-numbers ${
                    isPos
                      ? 'bg-[#E6F4F1] dark:bg-[#089981]/15 text-[#089981]'
                      : 'bg-[#FDF0F1] dark:bg-[#F23645]/15 text-[#F23645]'
                  }`}
                >
                  {isPos ? '+' : ''}
                  {item.assetType === 'bond'
                    ? item.change > 0
                      ? `+${item.change.toFixed(3)}`
                      : item.change.toFixed(3)
                    : `${item.changePercent.toFixed(2)}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
