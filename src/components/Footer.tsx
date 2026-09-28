import React from 'react';

interface FooterProps {
  onOpenCategory?: (cat: string) => void;
  onOpenScreener?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCategory, onOpenScreener }) => {
  return (
    <footer
      className="border-t border-[#E0E3EB] bg-[#F8F9FD] text-[#787B86] mt-16 pt-12 pb-8 select-none"
      data-purpose="tradingview-footer"
    >
      <div className="max-w-[1380px] mx-auto px-4">
        {/* Footer Nav Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-[#E0E3EB]">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] mb-3">
              Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenScreener} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Supercharts
                </button>
              </li>
              <li>
                <button onClick={onOpenScreener} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Pine Script™
                </button>
              </li>
              <li>
                <button onClick={onOpenScreener} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Stock Screener
                </button>
              </li>
              <li>
                <button onClick={onOpenScreener} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  ETF Screener
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory?.('Crypto')} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Crypto Heatmap
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] mb-3">
              Markets
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenCategory?.('Indices')} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Indices
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory?.('Stocks')} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Stocks
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory?.('Crypto')} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Crypto
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory?.('Forex')} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Forex
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory?.('Futures')} className="hover:text-[#2962FF] transition cursor-pointer text-left">
                  Futures
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#ideas">
                  Ideas
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#scripts">
                  Scripts
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#streams">
                  Streams
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#rules">
                  House Rules
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#moderators">
                  Moderators
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] mb-3">
              Brokers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#integrated">
                  Integrated Brokers
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#awards">
                  Broker Awards
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#account">
                  Open an account
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#partner">
                  Partner program
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#blog">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#careers">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] mb-3">
              Apps & More
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#desktop">
                  Desktop app
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#mobile">
                  Mobile app
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#widgets">
                  Widgets
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#status">
                  Market data status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Market Attribution Disclaimer */}
        <div className="mt-8 text-[11px] leading-relaxed text-[#787B86] space-y-3">
          <p>
            Select market data provided by ICE Data Services, BATS, CME Group, and other world
            exchanges. Quotes are delayed unless otherwise indicated.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#E0E3EB] gap-2">
            <span>© 2024 TradingView, Inc. All rights reserved. Look first / Then leap.</span>
            <div className="flex space-x-4">
              <a className="hover:underline hover:text-[#131722]" href="#terms">
                Terms of use
              </a>
              <a className="hover:underline hover:text-[#131722]" href="#privacy">
                Privacy policy
              </a>
              <a className="hover:underline hover:text-[#131722]" href="#security">
                Security
              </a>
              <a className="hover:underline hover:text-[#131722]" href="#cookies">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
