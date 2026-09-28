import React, { useState, useMemo } from 'react';
import { X, Star, TrendingUp, TrendingDown, Volume2, Globe, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface SymbolDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  isStarred: boolean;
  onToggleWatchlist: (id: string) => void;
}

type Timeframe = '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';
type ChartStyle = 'line' | 'candles';

export const SymbolDetailModal: React.FC<SymbolDetailModalProps> = ({
  asset,
  onClose,
  isStarred,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1M');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('line');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Generate synthetic points based on timeframe and asset price
  const chartPoints = useMemo(() => {
    if (!asset) return [];
    const basePrice = asset.price;
    const isBullish = asset.changePercent >= 0;
    const count = timeframe === '1D' ? 24 : timeframe === '5D' ? 30 : 40;
    const volatility = asset.assetType === 'crypto' ? 0.04 : 0.015;

    const points: { label: string; price: number; high: number; low: number; open: number; close: number }[] = [];
    let current = isBullish ? basePrice * 0.94 : basePrice * 1.05;

    for (let i = 0; i < count; i++) {
      const stepChange = (Math.sin(i / 3) + (Math.random() - 0.48)) * (basePrice * volatility);
      current = Math.max(current * 0.8, current + stepChange);
      if (i === count - 1) current = basePrice; // ensure last point matches current price

      const high = current * (1 + Math.random() * 0.01);
      const low = current * (1 - Math.random() * 0.01);
      const open = i > 0 ? points[i - 1].close : current;
      const close = current;

      points.push({
        label: timeframe === '1D' ? `${i}:00` : `Day ${i + 1}`,
        price: current,
        high,
        low,
        open,
        close,
      });
    }

    return points;
  }, [asset, timeframe]);

  if (!asset) return null;

  const isPos = asset.changePercent >= 0;
  const activePoint = hoverIndex !== null ? chartPoints[hoverIndex] : chartPoints[chartPoints.length - 1];
  const displayPrice = activePoint ? activePoint.price : asset.price;

  // Compute SVG viewBox coordinate scaling
  const prices = chartPoints.map((p) => p.price);
  const minP = Math.min(...prices) * 0.995;
  const maxP = Math.max(...prices) * 1.005;
  const rangeP = maxP - minP || 1;

  const width = 720;
  const height = 240;

  const polylineCoords = chartPoints
    .map((p, idx) => {
      const x = (idx / (chartPoints.length - 1)) * width;
      const y = height - ((p.price - minP) / rangeP) * (height - 30) - 15;
      return `${x},${y}`;
    })
    .join(' ');

  const areaCoords = `${polylineCoords} ${width},${height} 0,${height}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-white dark:bg-[#1E222D] z-20 px-6 py-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              style={{
                background: asset.badge.bg,
                color: asset.badge.textColor,
              }}
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs"
            >
              {asset.badge.text}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-[#131722] dark:text-white">
                  {asset.symbol}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#787B86] font-medium">
                  {asset.exchange}
                </span>
                <span className="text-xs uppercase font-semibold text-[#787B86]">
                  {asset.assetType}
                </span>
              </div>
              <p className="text-xs text-[#787B86]">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(asset.id)}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                isStarred
                  ? 'border-[#2962FF] text-[#2962FF] bg-[#2962FF]/10'
                  : 'border-[#E0E3EB] dark:border-[#2A2E39] text-[#787B86] hover:text-[#131722] dark:hover:text-white'
              }`}
              title="Add to Watchlist"
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#787B86] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Price Header & Metric Badge */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black tabular-numbers text-[#131722] dark:text-white">
                  {displayPrice > 10
                    ? displayPrice.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : displayPrice.toFixed(4)}
                </span>
                <span className="text-xs font-semibold text-[#787B86]">USD</span>
                <span
                  className={`inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded text-sm font-bold tabular-numbers ${
                    isPos
                      ? 'bg-[#E6F4F1] dark:bg-[#089981]/15 text-[#089981]'
                      : 'bg-[#FDF0F1] dark:bg-[#F23645]/15 text-[#F23645]'
                  }`}
                >
                  {isPos ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {isPos ? '+' : ''}
                  {asset.change.toFixed(2)} ({isPos ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%)
                </span>
              </div>
              <p className="text-xs text-[#787B86] mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Real-time market feed • At close
              </p>
            </div>

            {/* Technical Gauge Indicator */}
            {asset.technicalRating && (
              <div className="flex items-center gap-2 bg-[#F8F9FD] dark:bg-[#181B24] border border-[#E0E3EB] dark:border-[#2A2E39] px-3.5 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#2962FF]" />
                <div>
                  <div className="text-[10px] text-[#787B86] uppercase font-bold tracking-wider">
                    Technical Rating
                  </div>
                  <div className={`text-xs font-bold ${
                    asset.technicalRating.includes('Buy')
                      ? 'text-[#089981]'
                      : asset.technicalRating.includes('Sell')
                      ? 'text-[#F23645]'
                      : 'text-[#787B86]'
                  }`}>
                    {asset.technicalRating}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Chart Container */}
          <div className="bg-[#F8F9FD] dark:bg-[#181B24] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl p-4">
            {/* Chart Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
              {/* Timeframes */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {(['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'ALL'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                      timeframe === tf
                        ? 'bg-[#2962FF] text-white'
                        : 'text-[#787B86] hover:text-[#131722] dark:hover:text-white hover:bg-white dark:hover:bg-[#2A2E39]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Chart Style Toggle */}
              <div className="flex items-center gap-1 bg-white dark:bg-[#1E222D] p-1 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
                <button
                  onClick={() => setChartStyle('line')}
                  className={`px-2 py-0.5 text-xs font-semibold rounded transition cursor-pointer ${
                    chartStyle === 'line'
                      ? 'bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#131722] dark:text-white'
                      : 'text-[#787B86]'
                  }`}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartStyle('candles')}
                  className={`px-2 py-0.5 text-xs font-semibold rounded transition cursor-pointer ${
                    chartStyle === 'candles'
                      ? 'bg-[#F0F3FA] dark:bg-[#2A2E39] text-[#131722] dark:text-white'
                      : 'text-[#787B86]'
                  }`}
                >
                  Candles
                </button>
              </div>
            </div>

            {/* SVG Chart Canvas */}
            <div
              className="relative w-full h-60 pt-4 select-none cursor-crosshair"
              onMouseLeave={() => setHoverIndex(null)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, x / rect.width));
                const index = Math.round(ratio * (chartPoints.length - 1));
                setHoverIndex(index);
              }}
            >
              {chartStyle === 'line' ? (
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox={`0 0 ${width} ${height}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={isPos ? '#089981' : '#F23645'}
                        stopOpacity="0.28"
                      />
                      <stop
                        offset="100%"
                        stopColor={isPos ? '#089981' : '#F23645'}
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="#E0E3EB" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="#E0E3EB" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#E0E3EB" strokeDasharray="3 3" opacity="0.5" />

                  {/* Area fill */}
                  <polygon
                    points={areaCoords}
                    fill="url(#chartGradient)"
                  />

                  {/* Main stroke line */}
                  <polyline
                    fill="none"
                    stroke={isPos ? '#089981' : '#F23645'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={polylineCoords}
                  />

                  {/* Crosshair indicator */}
                  {hoverIndex !== null && (
                    <g>
                      <line
                        x1={(hoverIndex / (chartPoints.length - 1)) * width}
                        y1="0"
                        x2={(hoverIndex / (chartPoints.length - 1)) * width}
                        y2={height}
                        stroke="#2962FF"
                        strokeDasharray="2 2"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx={(hoverIndex / (chartPoints.length - 1)) * width}
                        cy={height - ((chartPoints[hoverIndex].price - minP) / rangeP) * (height - 30) - 15}
                        r="5"
                        fill="#2962FF"
                        stroke="#FFF"
                        strokeWidth="2"
                      />
                    </g>
                  )}
                </svg>
              ) : (
                /* Candlestick Style */
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox={`0 0 ${width} ${height}`}
                  preserveAspectRatio="none"
                >
                  {chartPoints.map((p, idx) => {
                    const cx = (idx / (chartPoints.length - 1)) * width;
                    const isGreen = p.close >= p.open;
                    const color = isGreen ? '#089981' : '#F23645';

                    const highY = height - ((p.high - minP) / rangeP) * (height - 30) - 15;
                    const lowY = height - ((p.low - minP) / rangeP) * (height - 30) - 15;
                    const openY = height - ((p.open - minP) / rangeP) * (height - 30) - 15;
                    const closeY = height - ((p.close - minP) / rangeP) * (height - 30) - 15;

                    const bodyTop = Math.min(openY, closeY);
                    const bodyHeight = Math.max(3, Math.abs(openY - closeY));

                    return (
                      <g key={idx}>
                        <line x1={cx} y1={highY} x2={cx} y2={lowY} stroke={color} strokeWidth="1.5" />
                        <rect
                          x={cx - 4}
                          y={bodyTop}
                          width="8"
                          height={bodyHeight}
                          fill={color}
                          rx="1"
                        />
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* Hover Tooltip readout */}
              {hoverIndex !== null && (
                <div
                  style={{
                    left: `${(hoverIndex / (chartPoints.length - 1)) * 100}%`,
                  }}
                  className="absolute top-2 -translate-x-1/2 pointer-events-none bg-[#131722] text-white text-[11px] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap font-medium z-10"
                >
                  <span className="text-[#787B86] mr-1.5">{chartPoints[hoverIndex].label}</span>
                  <b>${chartPoints[hoverIndex].price.toFixed(2)}</b>
                </div>
              )}
            </div>
          </div>

          {/* Key Fundamentals & Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39]">
              <div className="text-xs text-[#787B86]">Open</div>
              <div className="text-sm font-bold text-[#131722] dark:text-white tabular-numbers mt-0.5">
                ${asset.open?.toFixed(2) || (asset.price * 0.99).toFixed(2)}
              </div>
            </div>
            <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39]">
              <div className="text-xs text-[#787B86]">Day Range</div>
              <div className="text-sm font-bold text-[#131722] dark:text-white tabular-numbers mt-0.5">
                ${(asset.lowToday || asset.price * 0.985).toFixed(2)} - ${(asset.highToday || asset.price * 1.012).toFixed(2)}
              </div>
            </div>
            <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39]">
              <div className="text-xs text-[#787B86]">52-Week Range</div>
              <div className="text-sm font-bold text-[#131722] dark:text-white tabular-numbers mt-0.5">
                ${(asset.low52w || asset.price * 0.65).toFixed(2)} - ${(asset.high52w || asset.price * 1.15).toFixed(2)}
              </div>
            </div>
            <div className="p-3 bg-[#F8F9FD] dark:bg-[#181B24] rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39]">
              <div className="text-xs text-[#787B86]">Volume / Cap</div>
              <div className="text-sm font-bold text-[#131722] dark:text-white tabular-numbers mt-0.5">
                {asset.volume || '18.4M'} / {asset.marketCap || '$2.1T'}
              </div>
            </div>
          </div>

          {/* Description & Sector */}
          {asset.description && (
            <div className="space-y-1.5">
              <h4 className="text-xs uppercase font-bold text-[#787B86] tracking-wider">
                About {asset.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#131722] dark:text-[#D1D4DC] leading-relaxed">
                {asset.description}
              </p>
              {asset.sector && (
                <div className="pt-1 flex items-center gap-2 text-xs">
                  <span className="text-[#787B86]">Sector:</span>
                  <span className="font-semibold text-[#2962FF]">{asset.sector}</span>
                </div>
              )}
            </div>
          )}

          {/* Latest News Feed */}
          {asset.news && asset.news.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#E0E3EB] dark:border-[#2A2E39]">
              <h4 className="text-xs uppercase font-bold text-[#787B86] tracking-wider">
                Related Market News
              </h4>
              <div className="space-y-2">
                {asset.news.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-[#F8F9FD] dark:bg-[#181B24] border border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between gap-4 hover:border-[#2962FF] transition cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-bold text-[#131722] dark:text-white">
                        {n.title}
                      </div>
                      <div className="text-xs text-[#787B86] mt-1 flex items-center gap-2">
                        <span>{n.source}</span>
                        <span>•</span>
                        <span>{n.time}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#787B86] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="sticky bottom-0 bg-[#F8F9FD] dark:bg-[#181B24] border-t border-[#E0E3EB] dark:border-[#2A2E39] px-6 py-3 flex items-center justify-between">
          <div className="text-xs text-[#787B86]">
            Select market data provided by ICE Data Services, BATS, CME Group.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#131722] dark:bg-white text-white dark:text-[#131722] hover:opacity-90 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
