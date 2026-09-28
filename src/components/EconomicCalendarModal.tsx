import React, { useState } from 'react';
import { EconomicEvent } from '../types';
import { ECONOMIC_EVENTS } from '../data/mockData';
import { X, Calendar, Filter, Clock } from 'lucide-react';

interface EconomicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EconomicCalendarModal: React.FC<EconomicCalendarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'Tomorrow' | 'This Week'>('All');
  const [highImpactOnly, setHighImpactOnly] = useState(false);

  if (!isOpen) return null;

  const filteredEvents = ECONOMIC_EVENTS.filter((evt) => {
    const matchesDate = dateFilter === 'All' || evt.date === dateFilter;
    const matchesImpact = !highImpactOnly || evt.impact === 'HIGH';
    return matchesDate && matchesImpact;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#E0E3EB] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2962FF] text-white flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#131722]">Economic Calendar</h2>
              <p className="text-xs text-[#787B86]">Macroeconomic releases, central bank decisions, and global key indicators</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-[#E0E3EB] bg-[#F8F9FD] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E0E3EB]">
            {(['All', 'Today', 'Tomorrow', 'This Week'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDateFilter(d)}
                className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                  dateFilter === d ? 'bg-[#131722] text-white' : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <button
            onClick={() => setHighImpactOnly(!highImpactOnly)}
            className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              highImpactOnly
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-white text-[#787B86] border-[#E0E3EB] hover:text-[#131722]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>High Impact Only</span>
          </button>
        </div>

        {/* Event List */}
        <div className="overflow-y-auto divide-y divide-[#E0E3EB] flex-1">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="p-4 hover:bg-[#F8F9FD] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="flex flex-col items-center justify-center w-12 text-center text-xs text-[#787B86] shrink-0">
                  <span className="font-semibold text-[#131722]">{evt.time.split(' ')[0]}</span>
                  <span className="text-[10px]">GMT</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-3.5 h-2.5 rounded-xs inline-block ${evt.countryFlag}`} />
                    <span className="text-xs font-bold text-[#131722]">{evt.country}</span>
                    <span className="text-[10px] bg-[#F0F3FA] text-[#787B86] px-1.5 py-0.2 rounded font-semibold">
                      {evt.currency}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        evt.impact === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {evt.impact}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#131722]">{evt.title}</h4>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 text-xs tabular-numbers pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E0E3EB]">
                {evt.actual && (
                  <div className="text-right">
                    <p className="text-[#787B86] text-[10px]">Actual</p>
                    <p className="font-bold text-emerald-600">{evt.actual}</p>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-[#787B86] text-[10px]">Forecast</p>
                  <p className="font-semibold text-[#131722]">{evt.forecast}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#787B86] text-[10px]">Prior</p>
                  <p className="font-semibold text-[#787B86]">{evt.prior}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F9FD] border-t border-[#E0E3EB] text-center text-xs text-[#787B86]">
          Times are shown in GMT • Economic indicators updated in real-time as released
        </div>
      </div>
    </div>
  );
};
