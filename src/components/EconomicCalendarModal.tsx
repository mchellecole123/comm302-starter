import React, { useState } from 'react';
import { X, Calendar, Filter } from 'lucide-react';
import { EconomicEvent } from '../types/market';

interface EconomicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EconomicEvent[];
}

export const EconomicCalendarModal: React.FC<EconomicCalendarModalProps> = ({
  isOpen,
  onClose,
  events,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedImpact, setSelectedImpact] = useState<string>('ALL');

  if (!isOpen) return null;

  const filtered = events.filter((evt) => {
    const matchCountry = selectedCountry === 'ALL' || evt.countryCode === selectedCountry;
    const matchImpact = selectedImpact === 'ALL' || evt.impact === selectedImpact;
    return matchCountry && matchImpact;
  });

  const getFlag = (code: string) => {
    switch (code) {
      case 'US':
        return <span className="w-4 h-3 bg-red-600 rounded-xs inline-block shrink-0 shadow-xs" />;
      case 'EU':
        return <span className="w-4 h-3 bg-blue-700 rounded-xs inline-block shrink-0 shadow-xs" />;
      case 'UK':
        return <span className="w-4 h-3 bg-indigo-800 rounded-xs inline-block shrink-0 shadow-xs" />;
      case 'JP':
        return (
          <span className="w-4 h-3 bg-white border border-gray-300 rounded-xs inline-flex items-center justify-center shrink-0 shadow-xs">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          </span>
        );
      default:
        return <span className="w-4 h-3 bg-gray-500 rounded-xs inline-block shrink-0" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#2962FF]" />
            <div>
              <h2 className="text-lg font-black text-[#131722] dark:text-white">
                Global Economic Calendar
              </h2>
              <p className="text-xs text-[#787B86]">
                Track key macro announcements, central bank decisions, and inflation prints
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

        {/* Filter Bar */}
        <div className="p-3.5 bg-[#F8F9FD] dark:bg-[#181B24] border-b border-[#E0E3EB] dark:border-[#2A2E39] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#787B86] font-semibold">Region:</span>
            {['ALL', 'US', 'EU', 'UK', 'JP'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  selectedCountry === c
                    ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722]'
                    : 'bg-white dark:bg-[#1E222D] text-[#787B86] hover:text-[#131722] dark:hover:text-white border border-[#E0E3EB] dark:border-[#2A2E39]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#787B86] font-semibold">Impact:</span>
            {['ALL', 'HIGH', 'MED'].map((imp) => (
              <button
                key={imp}
                onClick={() => setSelectedImpact(imp)}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  selectedImpact === imp
                    ? 'bg-[#2962FF] text-white'
                    : 'bg-white dark:bg-[#1E222D] text-[#787B86] hover:text-[#131722] dark:hover:text-white border border-[#E0E3EB] dark:border-[#2A2E39]'
                }`}
              >
                {imp}
              </button>
            ))}
          </div>
        </div>

        {/* Events Table */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
          {filtered.map((evt) => (
            <div
              key={evt.id}
              className="p-4 hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#787B86]">
                  <span className="flex items-center gap-1 font-semibold text-[#131722] dark:text-white">
                    {getFlag(evt.countryCode)} {evt.country}
                  </span>
                  <span>•</span>
                  <span>{evt.time}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                      evt.impact === 'HIGH'
                        ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {evt.impact}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#131722] dark:text-white">
                  {evt.title}
                </h4>
              </div>

              <div className="flex items-center gap-4 text-xs tabular-numbers self-end sm:self-auto">
                <div className="text-right">
                  <div className="text-[#787B86]">Forecast</div>
                  <div className="font-bold text-[#131722] dark:text-white">{evt.forecast}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#787B86]">Prior</div>
                  <div className="font-bold text-[#131722] dark:text-white">{evt.prior}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] border-t border-[#E0E3EB] dark:border-[#2A2E39] text-xs text-[#787B86] flex items-center justify-between">
          <span>Times shown in GMT (Coordinated Universal Time)</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#131722] dark:bg-white text-white dark:text-[#131722] font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
