
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-morphism border-b border-slate-200 py-4 px-6 lg:px-12 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-200">
          🏔️
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-emerald-950 tracking-tight leading-none">Organic Bhutan</h1>
          <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">IoT & AI Powered Value Chain</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
        <a href="#" className="hover:text-emerald-600 transition-colors">Overview</a>
        <a href="#" className="hover:text-emerald-600 transition-colors">IoT Dashboard</a>
        <a href="#" className="hover:text-emerald-600 transition-colors">Forecasts</a>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95">
          Generate Report
        </button>
      </nav>
    </header>
  );
};

export default Header;
