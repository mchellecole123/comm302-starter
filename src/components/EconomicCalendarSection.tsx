import React from 'react';
import { EconomicEvent } from '../types';

interface EconomicCalendarSectionProps {
  events: EconomicEvent[];
  onOpenFullCalendar: () => void;
}

export const EconomicCalendarSection: React.FC<EconomicCalendarSectionProps> = ({
  events,
  onOpenFullCalendar,
}) => {
  const topEvents = events.slice(0, 3);

  return (
    <section
      className="bg-[#F8F9FD] border border-[#E0E3EB] rounded-2xl p-6"
      data-purpose="economic-calendar-summary"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E0E3EB]">
        <div>
          <h2 className="text-xl font-bold text-[#131722]">Economic Calendar Highlights</h2>
          <p className="text-xs text-[#787B86] mt-0.5">
            High impact macroeconomic events tracked across global markets
          </p>
        </div>
        <button
          onClick={onOpenFullCalendar}
          className="text-xs font-semibold text-[#2962FF] hover:underline self-start md:self-auto cursor-pointer inline-flex items-center gap-1"
        >
          <span>View full calendar</span>
          <span>→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {topEvents.map((evt) => (
          <div
            key={evt.id}
            onClick={onOpenFullCalendar}
            className="p-4 rounded-xl bg-white border border-[#E0E3EB] hover:border-[#B2B5BE] transition-all hover:shadow-sm cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-[#787B86] mb-1.5">
              <span className="font-semibold text-[#131722] flex items-center gap-1.5">
                <span className={`w-3.5 h-2.5 rounded-xs inline-block ${evt.countryFlag}`} />
                <span>{evt.country} • {evt.time}</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">
                {evt.impact}
              </span>
            </div>

            <p className="text-sm font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors line-clamp-1">
              {evt.title}
            </p>

            <div className="mt-3 flex items-center justify-between text-xs tabular-numbers">
              <span className="text-[#787B86]">
                Forecast: <b className="text-[#131722] font-semibold">{evt.forecast}</b>
              </span>
              <span className="text-[#787B86]">
                Prior: <b className="text-[#131722] font-semibold">{evt.prior}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
