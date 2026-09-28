import React from 'react';
import { Instrument } from '../types';
import { ChevronRight } from 'lucide-react';

interface CryptoAndCommoditiesSectionProps {
  cryptoData: Instrument[];
  futuresForexData: Instrument[];
  onSelectInstrument: (instrument: Instrument) => void;
  onViewCategory?: (cat: string) => void;
}

export const CryptoAndCommoditiesSection: React.FC<CryptoAndCommoditiesSectionProps> = ({
  cryptoData,
  futuresForexData,
  onSelectInstrument,
  onViewCategory,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Crypto Section */}
      <section className="space-y-4" data-purpose="crypto-overview">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onViewCategory?.('Crypto')}
            className="group inline-flex items-center gap-1 text-2xl font-bold text-[#131722] hover:text-[#2962FF] transition cursor-pointer"
          >
            <span>Crypto</span>
            <ChevronRight className="w-5 h-5 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-xs text-[#787B86] font-medium">24h Vol: $89.4B</span>
        </div>

        <div className="bg-white border border-[#E0E3EB] rounded-2xl divide-y divide-[#E0E3EB] overflow-hidden shadow-xs">
          {cryptoData.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectInstrument(item)}
                className="p-4 flex items-center justify-between hover:bg-[#F8F9FD] transition cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
                      item.symbol === 'SOLUSD'
                        ? 'bg-gradient-to-tr from-[#9945FF] to-[#14F195]'
                        : ''
                    }`}
                    style={{ backgroundColor: item.symbol !== 'SOLUSD' ? item.badgeBg : undefined }}
                  >
                    {item.badgeLabel}
                  </div>
                  <div>
                    <div className="font-bold text-[#131722] flex items-center gap-1.5 group-hover:text-[#2962FF] transition-colors">
                      {item.symbol}
                      <span className="text-[10px] text-[#787B86] font-normal uppercase">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-xs text-[#787B86]">{item.exchange}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold tabular-numbers text-[#131722]">
                    {item.price > 100
                      ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : item.price.toFixed(4)}
                  </div>
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold tabular-numbers ${
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
      </section>

      {/* Right Column: Futures, Commodities & Forex */}
      <section className="space-y-4" data-purpose="futures-forex-overview">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onViewCategory?.('Futures')}
            className="group inline-flex items-center gap-1 text-2xl font-bold text-[#131722] hover:text-[#2962FF] transition cursor-pointer"
          >
            <span>Futures & Currencies</span>
            <ChevronRight className="w-5 h-5 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-xs text-[#787B86] font-medium">Real-time / Delayed</span>
        </div>

        <div className="bg-white border border-[#E0E3EB] rounded-2xl divide-y divide-[#E0E3EB] overflow-hidden shadow-xs">
          {futuresForexData.map((item) => {
            const isPositive = item.change >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectInstrument(item)}
                className="p-4 flex items-center justify-between hover:bg-[#F8F9FD] transition cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                    style={{ backgroundColor: item.badgeBg || '#131722' }}
                  >
                    {item.badgeLabel}
                  </div>
                  <div>
                    <div className="font-bold text-[#131722] flex items-center gap-1.5 group-hover:text-[#2962FF] transition-colors">
                      {item.symbol}
                      {item.subCategory && (
                        <span className="text-[10px] text-[#787B86] font-normal uppercase">
                          {item.subCategory}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#787B86]">{item.exchange}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold tabular-numbers text-[#131722]">
                    {item.category === 'Bonds'
                      ? `${item.price.toFixed(3)}%`
                      : item.price > 100
                      ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : item.price.toFixed(4)}
                  </div>
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold tabular-numbers ${
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
      </section>
    </div>
  );
};
