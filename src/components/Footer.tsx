import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="border-t border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8F9FD] dark:bg-[#131722] text-[#787B86] mt-16 pt-12 pb-8 transition-colors"
      data-purpose="tradingview-footer"
    >
      <div className="max-w-[1380px] mx-auto px-4">
        {/* Footer Nav Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] dark:text-white mb-3">
              Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#indices">
                  Supercharts
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#stocks">
                  Pine Script™
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#stocks">
                  Stock Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#indices">
                  ETF Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#crypto">
                  Crypto Heatmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] dark:text-white mb-3">
              Markets
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#indices">
                  Indices
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#stocks">
                  Stocks
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#crypto">
                  Crypto
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#futures">
                  Forex
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#futures">
                  Futures
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] dark:text-white mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Ideas
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Scripts
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Streams
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  House Rules
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Moderators
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] dark:text-white mb-3">
              Brokers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Integrated Brokers
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Broker Awards
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Open an account
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Partner program
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] dark:text-white mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#131722] dark:text-white mb-3">
              Apps &amp; More
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Desktop app
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Mobile app
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Widgets
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition" href="#">
                  Market data status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Market Attribution Disclaimer */}
        <div className="mt-8 text-[11px] leading-relaxed text-[#787B86] space-y-3">
          <p>
            Select market data provided by ICE Data Services, BATS, CME Group, and other world exchanges. Quotes are delayed unless otherwise indicated.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] gap-2">
            <span>© 2024 TradingView, Inc. All rights reserved. Look first / Then leap.</span>
            <div className="flex space-x-4">
              <a className="hover:underline" href="#">
                Terms of use
              </a>
              <a className="hover:underline" href="#">
                Privacy policy
              </a>
              <a className="hover:underline" href="#">
                Security
              </a>
              <a className="hover:underline" href="#">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
