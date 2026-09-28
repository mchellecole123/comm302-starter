export type Category = 
  | 'Overview' 
  | 'Indices' 
  | 'Stocks' 
  | 'Crypto' 
  | 'Forex' 
  | 'Futures' 
  | 'Bonds' 
  | 'ETFs' 
  | 'Economy';

export type TechnicalRating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export interface ChartDataPoint {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface Instrument {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  category: Category;
  subCategory?: string;
  region: 'US' | 'World';
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  peRatio?: string;
  high52w?: string;
  low52w?: string;
  dayHigh?: number;
  dayLow?: number;
  openPrice?: number;
  technicalRating: TechnicalRating;
  badgeLabel?: string;
  badgeBg?: string;
  badgeColor?: string;
  sparkline: number[];
  chartData: {
    '1D': ChartDataPoint[];
    '5D': ChartDataPoint[];
    '1M': ChartDataPoint[];
    '1Y': ChartDataPoint[];
    'ALL': ChartDataPoint[];
  };
  description?: string;
}

export interface EconomicEvent {
  id: string;
  country: string;
  countryFlag: string;
  time: string;
  impact: 'HIGH' | 'MED' | 'LOW';
  title: string;
  forecast: string;
  prior: string;
  actual?: string;
  currency: string;
  date: string;
}
