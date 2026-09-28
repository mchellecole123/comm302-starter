import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface CryptoSectionProps {
  cryptoAssets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string, e: React.MouseEvent) => void;
}

export const CryptoSection: React.FC<CryptoSectionProps> = ({
  cryptoAssets,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
}) => {
  return (
    <section className="space-y-4" data-purpose="crypto-overview" id="crypto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectAsset(cryptoAssets[0])}
          className="group inline-flex items-center gap-1 text-2xl font-bold text-[#131722] dark:text-white hover:text-[#2962FF] dark:hover:text-[#2962FF] transition cursor-pointer"
        >
          Crypto
          <ChevronRight className="w-5 h-5 text-[#131722] dark:text-white group-hover:text-[#2962FF] group-hover:translate-x-1 transition" />
        </button>
        <span className="text-xs text-[#787B86] font-medium">24h Vol: $89.4B</span>
      </div>

      {/* Crypto List */}
      <div className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] overflow-hidden shadow-xs transition-colors">
        {cryptoAssets.map((crypto) => {
          const isPos = crypto.changePercent >= 0;
          const isStarred = watchlist.includes(crypto.id);

          return (
            <div
              key={crypto.id}
              onClick={() => onSelectAsset(crypto)}
              className="group p-4 flex items-center justify-between hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => onToggleWatchlist(crypto.id, e)}
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
                    background: crypto.badge.bg,
                    color: crypto.badge.textColor,
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-xs"
                >
                  {crypto.badge.text}
                </div>
                <div>
                  <div className="font-bold text-[#131722] dark:text-white flex items-center gap-1.5">
                    {crypto.symbol}
                    <span className="text-[10px] text-[#787B86] font-normal uppercase">
                      {crypto.name}
                    </span>
                  </div>
                  <div className="text-xs text-[#787B86]">{crypto.exchange}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold tabular-numbers text-[#131722] dark:text-white">
                  {crypto.price > 10
                    ? crypto.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : crypto.price.toFixed(4)}
                </div>
                <span
                  className={`inline-flex items-center px-1.5 py-0.2 rounded text-xs font-semibold tabular-numbers ${
                    isPos
                      ? 'bg-[#E6F4F1] dark:bg-[#089981]/15 text-[#089981]'
                      : 'bg-[#FDF0F1] dark:bg-[#F23645]/15 text-[#F23645]'
                  }`}
                >
                  {isPos ? '+' : ''}
                  {crypto.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
