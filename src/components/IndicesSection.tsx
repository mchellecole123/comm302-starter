import React from 'react';
import { Instrument } from '../types';
import { INDICES_DATA, SECONDARY_INDICES } from '../data/mockData';
import { ChevronRight } from 'lucide-react';

interface IndicesSectionProps {
  indices: Instrument[];
  onSelectInstrument: (instrument: Instrument) => void;
  onViewCategory?: (cat: string) => void;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  onSelectInstrument,
  onViewCategory,
}) => {
  return (
    <section data-purpose="indices-overview" className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onViewCategory?.('Indices')}
          className="group inline-flex items-center gap-1 text-2xl font-bold text-[#131722] hover:text-[#2962FF] transition cursor-pointer"
        >
          <span>Indices</span>
          <ChevronRight className="w-5 h-5 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#787B86]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
          <span>Markets open</span>
        </div>
      </div>

      {/* Major Indices Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((item) => {
          const isPositive = item.changePercent >= 0;
          return (
            <div
              key={item.id}
              onClick={() => onSelectInstrument(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectInstrument(item)}
              className="bg-[#F8F9FD] border border-[#E0E3EB] hover:border-[#B2B5BE] rounded-2xl p-4 transition-all hover:shadow-md cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#2962FF]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs"
                    style={{ backgroundColor: item.badgeBg || '#2962FF' }}
                  >
                    {item.badgeLabel}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {item.symbol}
                    </h3>
                    <span className="text-xs text-[#787B86]">{item.exchange}</span>
                  </div>
                </div>

                {/* Dynamic Sparkline Chart */}
                <div className="w-20 h-8 flex items-center justify-end">
                  <svg className="w-20 h-8 fill-none stroke-[2]" viewBox="0 0 80 32">
                    {isPositive ? (
                      <path
                        d="M0,24 Q18,21 30,16 T55,11 T70,8 T80,3"
                        className="stroke-[#089981]"
                      />
                    ) : (
                      <path
                        d="M0,6 Q20,8 35,16 T55,14 T70,24 T80,28"
                        className="stroke-[#F23645]"
                      />
                    )}
                  </svg>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-xl font-bold tracking-tight tabular-numbers text-[#131722]">
                  {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tabular-numbers ${
                    isPositive
                      ? 'bg-[#E6F4F1] text-[#089981]'
                      : 'bg-[#FDF0F1] text-[#F23645]'
                  }`}
                >
                  {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Indices Quick Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        {SECONDARY_INDICES.map((sec) => (
          <div
            key={sec.symbol}
            onClick={() => {
              // Create transient instrument object to show modal
              const fakeInst: Instrument = {
                id: sec.symbol.toLowerCase().replace(/\s+/g, '-'),
                symbol: sec.symbol,
                name: sec.name,
                exchange: 'GLOBAL • INDEX',
                category: 'Indices',
                region: 'World',
                price: parseFloat(sec.price.replace(/,/g, '')),
                change: parseFloat(sec.change) * 10,
                changePercent: parseFloat(sec.change),
                volume: '1.2B',
                marketCap: '5.2T',
                technicalRating: sec.isPositive ? 'Buy' : 'Neutral',
                sparkline: sec.isPositive ? [20, 16, 12, 8, 4] : [4, 8, 12, 16, 20],
                chartData: INDICES_DATA[0].chartData,
              };
              onSelectInstrument(fakeInst);
            }}
            className="p-2.5 rounded-xl border border-[#E0E3EB] flex items-center justify-between bg-white hover:bg-[#F8F9FD] hover:border-[#B2B5BE] cursor-pointer transition"
          >
            <span className="font-medium text-[#787B86]">{sec.symbol}</span>
            <span className="font-semibold text-[#131722] tabular-numbers">{sec.price}</span>
            <span
              className={`font-semibold tabular-numbers ${
                sec.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {sec.change}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
