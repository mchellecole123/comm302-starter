import React from 'react';
import { Instrument } from '../types';
import { X, Trash2, ArrowRight, Star } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: string[];
  allInstruments: Instrument[];
  onSelectInstrument: (instrument: Instrument) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  allInstruments,
  onSelectInstrument,
  onRemoveFromWatchlist,
}) => {
  if (!isOpen) return null;

  const watchlistedItems = allInstruments.filter((inst) =>
    watchlistSymbols.includes(inst.symbol)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E0E3EB] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E0E3EB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <h2 className="text-lg font-bold text-[#131722]">Watchlist</h2>
              <span className="text-xs bg-[#F0F3FA] text-[#2962FF] px-2 py-0.5 rounded-full font-bold">
                {watchlistedItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E0E3EB]">
            {watchlistedItems.length > 0 ? (
              watchlistedItems.map((item) => {
                const isPos = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    className="p-3.5 hover:bg-[#F8F9FD] transition flex items-center justify-between group"
                  >
                    <div
                      onClick={() => {
                        onSelectInstrument(item);
                        onClose();
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div
                        className="w-8 h-8 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: item.badgeBg || '#131722' }}
                      >
                        {item.badgeLabel || item.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-sm text-[#131722] group-hover:text-[#2962FF]">
                          <span>{item.symbol}</span>
                          <span className="text-[10px] text-[#787B86] font-normal">{item.category}</span>
                        </div>
                        <p className="text-xs text-[#787B86] truncate max-w-[140px]">{item.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => {
                          onSelectInstrument(item);
                          onClose();
                        }}
                        className="text-right cursor-pointer"
                      >
                        <p className="text-sm font-bold text-[#131722] tabular-numbers">
                          {item.price.toFixed(2)}
                        </p>
                        <span
                          className={`text-xs font-semibold tabular-numbers ${
                            isPos ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          {isPos ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveFromWatchlist(item.symbol)}
                        title="Remove from Watchlist"
                        className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-[#787B86]">
                <Star className="w-10 h-10 mx-auto text-neutral-300 stroke-1 mb-2" />
                <p className="text-sm font-semibold text-[#131722]">Your watchlist is empty</p>
                <p className="text-xs mt-1">
                  Click the star icon on any asset card or chart to bookmark it here for fast tracking.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#F8F9FD] border-t border-[#E0E3EB]">
            <p className="text-xs text-[#787B86] text-center">
              Watchlist automatically syncs locally with your browser session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
