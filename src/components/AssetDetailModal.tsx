import React, { useState } from 'react';
import { Instrument, ChartDataPoint } from '../types';
import { X, Star, Share2, TrendingUp, TrendingDown, ArrowUpRight, Check, AlertCircle, BarChart3, LineChart } from 'lucide-react';

interface AssetDetailModalProps {
  instrument: Instrument;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  instrument,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '1Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [tradeAction, setTradeAction] = useState<'BUY' | 'SELL' | null>(null);
  const [tradeShares, setTradeShares] = useState('10');
  const [orderExecuted, setOrderExecuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const series = instrument.chartData?.[timeframe] || instrument.chartData?.['1D'] || [];
  const isPositive = instrument.changePercent >= 0;

  // Compute SVG dimensions and points
  const svgWidth = 680;
  const svgHeight = 240;
  const paddingX = 20;
  const paddingY = 20;

  const prices = series.map((p) => p.price);
  const minPrice = Math.min(...prices, instrument.dayLow || instrument.price * 0.98);
  const maxPrice = Math.max(...prices, instrument.dayHigh || instrument.price * 1.02);
  const priceRange = maxPrice - minPrice || 1;

  const points = series.map((pt, idx) => {
    const x = paddingX + (idx / Math.max(series.length - 1, 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - ((pt.price - minPrice) / priceRange) * (svgHeight - 2 * paddingY);
    return { ...pt, x, y };
  });

  const pathD = points.reduce((acc, curr, i) => {
    return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`
    : '';

  const activeDisplayPrice = hoveredPoint ? hoveredPoint.price : instrument.price;

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderExecuted(true);
    setTimeout(() => {
      setOrderExecuted(false);
      setTradeAction(null);
    }, 2400);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full border border-[#E0E3EB] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95"
        role="dialog"
      >
        {/* Top Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#E0E3EB] flex flex-wrap items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm"
              style={{ backgroundColor: instrument.badgeBg || '#131722' }}
            >
              {instrument.badgeLabel || instrument.symbol.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#131722]">{instrument.symbol}</h2>
                <span className="text-xs text-[#787B86] border border-[#E0E3EB] px-1.5 py-0.5 rounded font-medium">
                  {instrument.exchange}
                </span>
                <span className="text-xs bg-[#F0F3FA] text-[#131722] px-2 py-0.5 rounded-full font-medium">
                  {instrument.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#787B86]">{instrument.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(instrument.symbol)}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
              className={`p-2 rounded-xl border transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                isWatchlisted
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-white text-[#787B86] border-[#E0E3EB] hover:bg-[#F8F9FD]'
              }`}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isWatchlisted ? 'Watchlisted' : 'Watchlist'}</span>
            </button>

            <button
              onClick={handleShare}
              title="Share symbol"
              className="p-2 rounded-xl border border-[#E0E3EB] hover:bg-[#F8F9FD] text-[#787B86] hover:text-[#131722] transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Price Bar & Controls */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#131722] tabular-numbers">
                  {activeDisplayPrice > 100
                    ? activeDisplayPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : activeDisplayPrice.toFixed(4)}
                </span>
                <span className="text-sm text-[#787B86] font-semibold">USD</span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold tabular-numbers ${
                    isPositive ? 'bg-[#E6F4F1] text-[#089981]' : 'bg-[#FDF0F1] text-[#F23645]'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {isPositive ? `+${instrument.changePercent.toFixed(2)}%` : `${instrument.changePercent.toFixed(2)}%`}
                  <span className="opacity-75 font-normal">
                    ({isPositive ? `+${instrument.change.toFixed(2)}` : instrument.change.toFixed(2)})
                  </span>
                </span>
              </div>
              <p className="text-xs text-[#787B86] mt-1">
                {hoveredPoint ? `Time: ${hoveredPoint.time}` : 'Real-time quotes • Market open'}
              </p>
            </div>

            {/* Timeframe & Chart Style Selectors */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#F0F3FA] p-1 rounded-xl text-xs font-semibold">
                {(['1D', '5D', '1M', '1Y', 'ALL'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      timeframe === tf ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86] hover:text-[#131722]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="flex items-center bg-[#F0F3FA] p-1 rounded-xl text-xs">
                <button
                  onClick={() => setChartType('area')}
                  title="Line Area Chart"
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    chartType === 'area' ? 'bg-white text-[#2962FF] shadow-xs' : 'text-[#787B86]'
                  }`}
                >
                  <LineChart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType('candles')}
                  title="Candlestick Chart"
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    chartType === 'candles' ? 'bg-white text-[#2962FF] shadow-xs' : 'text-[#787B86]'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div className="relative bg-[#F8F9FD] border border-[#E0E3EB] rounded-2xl p-4 overflow-hidden">
            <div className="w-full h-60">
              <svg
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="none"
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isPositive ? '#089981' : '#F23645'} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={isPositive ? '#089981' : '#F23645'} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
                  <line
                    key={ratio}
                    x1="0"
                    y1={svgHeight * ratio}
                    x2={svgWidth}
                    y2={svgHeight * ratio}
                    stroke="#E0E3EB"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                ))}

                {chartType === 'area' ? (
                  <>
                    {/* Fill Area */}
                    <path d={areaD} fill="url(#chartGradient)" />
                    {/* Stroke Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isPositive ? '#089981' : '#F23645'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </>
                ) : (
                  // Simulated Candlesticks
                  points.map((pt, i) => {
                    const candleOpen = pt.open ?? pt.price * 0.998;
                    const candleClose = pt.close ?? pt.price;
                    const candleHigh = pt.high ?? Math.max(candleOpen, candleClose) * 1.002;
                    const candleLow = pt.low ?? Math.min(candleOpen, candleClose) * 0.998;

                    const isUp = candleClose >= candleOpen;
                    const candleColor = isUp ? '#089981' : '#F23645';

                    const highY = svgHeight - paddingY - ((candleHigh - minPrice) / priceRange) * (svgHeight - 2 * paddingY);
                    const lowY = svgHeight - paddingY - ((candleLow - minPrice) / priceRange) * (svgHeight - 2 * paddingY);
                    const openY = svgHeight - paddingY - ((candleOpen - minPrice) / priceRange) * (svgHeight - 2 * paddingY);
                    const closeY = svgHeight - paddingY - ((candleClose - minPrice) / priceRange) * (svgHeight - 2 * paddingY);

                    const boxTop = Math.min(openY, closeY);
                    const boxHeight = Math.max(Math.abs(openY - closeY), 2);

                    return (
                      <g key={i}>
                        {/* Wick */}
                        <line x1={pt.x} y1={highY} x2={pt.x} y2={lowY} stroke={candleColor} strokeWidth="1.2" />
                        {/* Body */}
                        <rect
                          x={pt.x - 3}
                          y={boxTop}
                          width="6"
                          height={boxHeight}
                          fill={candleColor}
                          rx="1"
                        />
                      </g>
                    );
                  })
                )}

                {/* Hover interactive vertical line and dot */}
                {hoveredPoint && (
                  <>
                    <line
                      x1={hoveredPoint.price ? points.find(p => p.time === hoveredPoint.time)?.x || 0 : 0}
                      y1="0"
                      x2={hoveredPoint.price ? points.find(p => p.time === hoveredPoint.time)?.x || 0 : 0}
                      y2={svgHeight}
                      stroke="#2962FF"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <circle
                      cx={points.find(p => p.time === hoveredPoint.time)?.x || 0}
                      cy={points.find(p => p.time === hoveredPoint.time)?.y || 0}
                      r="5"
                      fill="#2962FF"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </>
                )}

                {/* Transparent hover capture rects */}
                {points.map((pt, i) => (
                  <rect
                    key={i}
                    x={pt.x - 10}
                    y="0"
                    width="20"
                    height={svgHeight}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoveredPoint(pt)}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8F9FD] p-4 rounded-2xl border border-[#E0E3EB]">
            <div>
              <p className="text-xs text-[#787B86]">Day Range</p>
              <p className="text-sm font-bold text-[#131722] tabular-numbers">
                {instrument.dayLow ? instrument.dayLow.toFixed(2) : (instrument.price * 0.985).toFixed(2)} - {instrument.dayHigh ? instrument.dayHigh.toFixed(2) : (instrument.price * 1.015).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#787B86]">52-Week Range</p>
              <p className="text-sm font-bold text-[#131722] tabular-numbers">
                {instrument.low52w || (instrument.price * 0.7).toFixed(2)} - {instrument.high52w || (instrument.price * 1.15).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#787B86]">Volume</p>
              <p className="text-sm font-bold text-[#131722] tabular-numbers">{instrument.volume}</p>
            </div>
            <div>
              <p className="text-xs text-[#787B86]">Market Cap</p>
              <p className="text-sm font-bold text-[#131722] tabular-numbers">{instrument.marketCap}</p>
            </div>
            {instrument.peRatio && (
              <div>
                <p className="text-xs text-[#787B86]">P/E Ratio</p>
                <p className="text-sm font-bold text-[#131722] tabular-numbers">{instrument.peRatio}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-[#787B86]">Open Price</p>
              <p className="text-sm font-bold text-[#131722] tabular-numbers">
                {(instrument.openPrice || instrument.price * 0.995).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#787B86]">Technical Rating</p>
              <p className="text-sm font-bold text-[#089981]">{instrument.technicalRating}</p>
            </div>
            <div>
              <p className="text-xs text-[#787B86]">Exchange</p>
              <p className="text-sm font-bold text-[#131722]">{instrument.exchange}</p>
            </div>
          </div>

          {/* Description & Technical Gauge Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#787B86] mb-1">About {instrument.symbol}</h4>
              <p className="text-xs leading-relaxed text-[#131722]">
                {instrument.description || `${instrument.name} is actively traded across global financial exchanges with comprehensive liquidity and real-time order depth.`}
              </p>
            </div>

            {/* Simulated Technical Meter */}
            <div className="bg-[#F8F9FD] p-3 rounded-xl border border-[#E0E3EB]">
              <p className="text-xs font-bold text-[#131722] mb-1.5 flex items-center justify-between">
                <span>Technical Outlook</span>
                <span className="text-[#089981] font-semibold">{instrument.technicalRating}</span>
              </p>
              <div className="grid grid-cols-5 gap-1 h-2 rounded-full overflow-hidden bg-neutral-200">
                <div className={`h-full ${instrument.technicalRating === 'Strong Sell' ? 'bg-[#F23645]' : 'bg-red-200'}`} />
                <div className={`h-full ${instrument.technicalRating === 'Sell' ? 'bg-[#F23645]' : 'bg-orange-200'}`} />
                <div className={`h-full ${instrument.technicalRating === 'Neutral' ? 'bg-neutral-500' : 'bg-neutral-200'}`} />
                <div className={`h-full ${instrument.technicalRating === 'Buy' ? 'bg-[#089981]' : 'bg-emerald-200'}`} />
                <div className={`h-full ${instrument.technicalRating === 'Strong Buy' ? 'bg-[#089981]' : 'bg-emerald-200'}`} />
              </div>
              <div className="flex justify-between text-[9px] text-[#787B86] mt-1 font-semibold uppercase">
                <span>Sell</span>
                <span>Neutral</span>
                <span>Buy</span>
              </div>
            </div>
          </div>

          {/* Simulated Trading Action Bar */}
          <div className="pt-2 border-t border-[#E0E3EB]">
            {orderExecuted ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Simulated {tradeAction} order for {tradeShares} units of {instrument.symbol} placed at ${(activeDisplayPrice * parseFloat(tradeShares || '1')).toFixed(2)} USD!</span>
              </div>
            ) : tradeAction ? (
              <form onSubmit={handleExecuteTrade} className="bg-[#F0F3FA] p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white ${tradeAction === 'BUY' ? 'bg-[#089981]' : 'bg-[#F23645]'}`}>
                    {tradeAction} {instrument.symbol}
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-[#787B86]">Units:</span>
                    <input
                      type="number"
                      min="1"
                      value={tradeShares}
                      onChange={(e) => setTradeShares(e.target.value)}
                      className="w-16 px-2 py-1 bg-white border border-[#E0E3EB] rounded text-xs font-semibold tabular-numbers text-[#131722]"
                    />
                  </div>
                  <span className="text-xs text-[#787B86] tabular-numbers font-medium">
                    Total: <b className="text-[#131722]">${(activeDisplayPrice * (parseFloat(tradeShares) || 0)).toFixed(2)}</b>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTradeAction(null)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#787B86] hover:text-[#131722]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-1.5 text-xs font-bold text-white rounded-lg cursor-pointer ${
                      tradeAction === 'BUY' ? 'bg-[#089981] hover:bg-[#067a67]' : 'bg-[#F23645] hover:bg-[#d42735]'
                    }`}
                  >
                    Confirm {tradeAction}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#787B86]">
                  Paper Trading Simulator • Real-time broker connectivity
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTradeAction('SELL')}
                    className="px-4 py-2 text-xs font-bold text-[#F23645] bg-[#FDF0F1] hover:bg-red-100 rounded-xl transition cursor-pointer"
                  >
                    Sell {instrument.symbol}
                  </button>
                  <button
                    onClick={() => setTradeAction('BUY')}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#089981] hover:bg-[#067a67] rounded-xl transition cursor-pointer"
                  >
                    Buy {instrument.symbol}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
