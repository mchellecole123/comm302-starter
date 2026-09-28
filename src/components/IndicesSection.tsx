import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface IndicesSectionProps {
  primaryIndices: MarketAsset[];
  secondaryIndices: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string, e: React.MouseEvent) => void;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  primaryIndices,
  secondaryIndices,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
}) => {
  return (
    <section data-purpose="indices-overview" id="indices">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onSelectAsset(primaryIndices[0])}
          className="group inline-flex items-center gap-1 text-2xl font-bold text-[#131722] dark:text-white hover:text-[#2962FF] dark:hover:text-[#2962FF] transition cursor-pointer"
        >
          Indices
          <ChevronRight className="w-5 h-5 text-[#131722] dark:text-white group-hover:text-[#2962FF] group-hover:translate-x-1 transition" />
        </button>
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#787B86]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
          <span>Markets open</span>
        </div>
      </div>

      {/* Major Indices Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {primaryIndices.map((asset) => {
          const isPositive = asset.changePercent >= 0;
          const isStarred = watchlist.includes(asset.id);

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              className="group relative bg-[#F8F9FD] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] hover:border-[#B2B5BE] dark:hover:border-[#4B5061] rounded-2xl p-4 transition-all hover:shadow-md cursor-pointer"
            >
              {/* Star bookmark on hover */}
              <button
                onClick={(e) => onToggleWatchlist(asset.id, e)}
                title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
                className="absolute top-3.5 right-3 opacity-0 group-hover:opacity-100 hover:scale-110 p-1 text-[#787B86] hover:text-[#2962FF] transition z-10"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    isStarred ? 'fill-[#2962FF] text-[#2962FF] opacity-100' : ''
                  }`}
                />
              </button>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      backgroundColor: asset.badge.bg,
                      color: asset.badge.textColor,
                      fontSize: asset.badge.fontSize || '12px',
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-black shrink-0 shadow-xs"
                  >
                    {asset.badge.text}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#131722] dark:text-white">
                      {asset.name}
                    </h3>
                    <span className="text-xs text-[#787B86]">
                      {asset.symbol} • {asset.exchange}
                    </span>
                  </div>
                </div>

                {/* Sparkline Chart */}
                <svg
                  className={`w-20 h-8 fill-none stroke-[2] ${
                    isPositive
                      ? 'stroke-[#089981]'
                      : 'stroke-[#F23645]'
                  }`}
                  viewBox="0 0 80 32"
                >
                  <path
                    d={
                      isPositive
                        ? 'M0,24 Q15,22 25,18 T45,12 T65,8 T80,4'
                        : 'M0,6 Q20,8 35,16 T55,14 T70,24 T80,28'
                    }
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-xl font-bold tracking-tight tabular-numbers text-[#131722] dark:text-white">
                  {asset.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tabular-numbers ${
                    isPositive
                      ? 'bg-[#E6F4F1] dark:bg-[#089981]/15 text-[#089981]'
                      : 'bg-[#FDF0F1] dark:bg-[#F23645]/15 text-[#F23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Indices Quick Strip */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        {secondaryIndices.map((item) => {
          const isPos = item.changePercent >= 0;
          return (
            <div
              key={item.id}
              onClick={() => onSelectAsset(item)}
              className="p-2.5 rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between bg-white dark:bg-[#1E222D] hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39] transition cursor-pointer"
            >
              <span className="font-medium text-[#787B86]">{item.symbol}</span>
              <span className="font-semibold text-[#131722] dark:text-white tabular-numbers">
                {item.price.toLocaleString('en-US', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                className={`font-semibold tabular-numbers ${
                  isPos ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                {isPos ? '+' : ''}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
