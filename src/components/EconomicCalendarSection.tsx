import React from 'react';
import { EconomicEvent } from '../types/market';

interface EconomicCalendarSectionProps {
  events: EconomicEvent[];
  onOpenFullCalendar: () => void;
}

export const EconomicCalendarSection: React.FC<EconomicCalendarSectionProps> = ({
  events,
  onOpenFullCalendar,
}) => {
  const previewEvents = events.slice(0, 3);

  const getFlag = (code: string) => {
    switch (code) {
      case 'US':
        return <span className="w-4 h-3 bg-red-600 rounded-xs inline-block shrink-0 shadow-xs" />;
      case 'EU':
        return <span className="w-4 h-3 bg-blue-700 rounded-xs inline-block shrink-0 shadow-xs" />;
      case 'UK':
        return <span className="w-4 h-3 bg-indigo-800 rounded-xs inline-block shrink-0 shadow-xs" />;
      case 'JP':
        return <span className="w-4 h-3 bg-white border border-gray-300 rounded-xs inline-flex items-center justify-center shrink-0 shadow-xs"><span className="w-1.5 h-1.5 bg-red-600 rounded-full" /></span>;
      default:
        return <span className="w-4 h-3 bg-gray-500 rounded-xs inline-block shrink-0" />;
    }
  };

  return (
    <section
      className="bg-[#F8F9FD] dark:bg-[#181B24] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl p-6 transition-colors"
      data-purpose="economic-calendar-summary"
      id="economy"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
        <div>
          <h2 className="text-xl font-bold text-[#131722] dark:text-white">
            Economic Calendar Highlights
          </h2>
          <p className="text-xs text-[#787B86] mt-0.5">
            High impact macroeconomic events tracked across global markets
          </p>
        </div>
        <button
          onClick={onOpenFullCalendar}
          className="text-xs font-semibold text-[#2962FF] hover:underline self-start md:self-auto cursor-pointer"
        >
          View full calendar →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {previewEvents.map((evt) => (
          <div
            key={evt.id}
            onClick={onOpenFullCalendar}
            className="p-4 rounded-xl bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] hover:border-[#B2B5BE] dark:hover:border-[#4B5061] transition cursor-pointer hover:shadow-xs"
          >
            <div className="flex items-center justify-between text-xs text-[#787B86] mb-1.5">
              <span className="font-semibold text-[#131722] dark:text-white flex items-center gap-1.5">
                {getFlag(evt.countryCode)} {evt.countryCode} • {evt.time}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${
                  evt.impact === 'HIGH'
                    ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                }`}
              >
                {evt.impact}
              </span>
            </div>
            <p className="text-sm font-bold text-[#131722] dark:text-white">
              {evt.title}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs tabular-numbers">
              <span className="text-[#787B86]">
                Forecast: <b className="text-[#131722] dark:text-white">{evt.forecast}</b>
              </span>
              <span className="text-[#787B86]">
                Prior: <b className="text-[#131722] dark:text-white">{evt.prior}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
