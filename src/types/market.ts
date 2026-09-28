export type MarketCategory =
  | 'overview'
  | 'indices'
  | 'stocks'
  | 'crypto'
  | 'forex'
  | 'futures'
  | 'bonds'
  | 'etfs'
  | 'economy';

export type StockTab =
  | 'large-cap'
  | 'most-active'
  | 'gainers'
  | 'losers'
  | '52-week-high';

export type StockRegion = 'us' | 'world';

export type TechnicalRating =
  | 'Strong Buy'
  | 'Buy'
  | 'Neutral'
  | 'Sell'
  | 'Strong Sell';

export interface ChartPoint {
  time: string;
  value: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  assetType: 'index' | 'stock' | 'crypto' | 'future' | 'forex' | 'bond' | 'etf';
  price: number;
  change: number;
  changePercent: number;
  badge: {
    text: string;
    bg: string;
    textColor: string;
    fontSize?: string;
  };
  volume?: string;
  marketCap?: string;
  technicalRating?: TechnicalRating;
  sparkline: number[];
  high52w?: number;
  low52w?: number;
  open?: number;
  highToday?: number;
  lowToday?: number;
  prevClose?: number;
  peRatio?: number;
  dividendYield?: string;
  sector?: string;
  region?: StockRegion;
  description?: string;
  news?: NewsItem[];
}

export interface EconomicEvent {
  id: string;
  country: string;
  countryCode: 'US' | 'EU' | 'UK' | 'JP' | 'CN' | 'DE';
  time: string;
  impact: 'HIGH' | 'MED' | 'LOW';
  title: string;
  forecast: string;
  prior: string;
  actual?: string;
}
