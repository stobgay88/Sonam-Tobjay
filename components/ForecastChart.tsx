
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ForecastData } from '../types';

interface Props {
  data: ForecastData[];
}

const ForecastChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 h-full min-h-[400px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-2 md:space-y-0">
        <div>
          <h3 className="text-xl font-display text-slate-900">AI-Driven Demand Forecasting</h3>
          <p className="text-sm text-slate-500">Aggregated predictive analytics for organic seasonal production.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Supply</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Demand</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                fontSize: '12px'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="demand" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorDemand)" 
            />
            <Area 
              type="monotone" 
              dataKey="supply" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSupply)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-slate-50 rounded-xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Current Variance</div>
          <div className="text-lg font-semibold text-amber-600">-8.4% Shortfall</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Projected Peak</div>
          <div className="text-lg font-semibold text-emerald-600">June 2024</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Growth Factor</div>
          <div className="text-lg font-semibold text-blue-600">+14% YoY</div>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;
