import React from 'react';
import { X, Star, Trash2, ArrowUpRight } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface WatchlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistItems: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({
  isOpen,
  onClose,
  watchlistItems,
  onSelectAsset,
  onRemoveItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-[#1E222D] h-full shadow-2xl border-l border-[#E0E3EB] dark:border-[#2A2E39] flex flex-col transition-colors animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#2962FF] fill-[#2962FF]" />
            <h3 className="font-bold text-base text-[#131722] dark:text-white">
              My Watchlist ({watchlistItems.length})
            </h3>
          </div>
          <div className="flex items-center gap-1">
            {watchlistItems.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-[#F23645] hover:underline px-2 py-1"
                title="Clear all watchlist items"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded text-[#787B86] hover:text-[#131722] dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
          {watchlistItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#787B86] space-y-2">
              <Star className="w-8 h-8 text-[#787B86] mx-auto opacity-40" />
              <p className="font-semibold text-[#131722] dark:text-white">Your watchlist is empty</p>
              <p className="text-xs">
                Hover over any index, stock, crypto, or commodity and click the star icon to track it here.
              </p>
            </div>
          ) : (
            watchlistItems.map((item) => {
              const isPos = item.changePercent >= 0;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectAsset(item);
                    onClose();
                  }}
                  className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]/60 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      style={{
                        background: item.badge.bg,
                        color: item.badge.textColor,
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                    >
                      {item.badge.text}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#131722] dark:text-white flex items-center gap-1">
                        {item.symbol}
                        <span className="text-[9px] text-[#787B86] font-normal uppercase">
                          {item.assetType}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#787B86] truncate max-w-[120px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs font-bold tabular-numbers text-[#131722] dark:text-white">
                        {item.price > 10
                          ? item.price.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : item.price.toFixed(4)}
                      </div>
                      <span
                        className={`text-[10px] font-semibold tabular-numbers ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#787B86] hover:text-[#F23645] transition"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] border-t border-[#E0E3EB] dark:border-[#2A2E39] text-center text-[11px] text-[#787B86]">
          Real-time synchronized across your session
        </div>
      </div>
    </div>
  );
};
