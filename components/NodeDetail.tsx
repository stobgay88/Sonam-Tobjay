
import React from 'react';
import { Actor, IoTData, InsightResponse } from '../types';

interface Props {
  actor: Actor | null;
  iot: IoTData | null;
  insight: InsightResponse | null;
  loading: boolean;
}

const NodeDetail: React.FC<Props> = ({ actor, iot, insight, loading }) => {
  if (!actor) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-3xl border border-dashed border-slate-300 p-8 text-center">
        <div className="space-y-4">
          <div className="text-4xl">🌱</div>
          <p className="text-slate-500 font-medium">Select a value chain node to view real-time metrics and AI forecasts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-600">{actor.type}</div>
          <h3 className="text-2xl font-display text-slate-900">{actor.name}</h3>
          <p className="text-sm text-slate-500 flex items-center">
            <span className="mr-1">📍</span> {actor.location}
          </p>
        </div>
        <div className="text-4xl bg-emerald-50 p-3 rounded-2xl">{actor.icon}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Temperature</div>
          <div className="text-2xl font-semibold text-slate-800">{iot?.temperature}°C</div>
          <div className="w-full h-1 bg-slate-200 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${(iot?.temperature || 0) * 3}%` }} />
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Humidity</div>
          <div className="text-2xl font-semibold text-slate-800">{iot?.humidity}%</div>
          <div className="w-full h-1 bg-slate-200 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${iot?.humidity}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-emerald-700">
          <span className="text-xl">✨</span>
          <h4 className="font-bold text-sm uppercase tracking-wide">AI Demand Insight</h4>
        </div>
        
        {loading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-3/4" />
          </div>
        ) : insight ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
              <p className="text-sm text-slate-700 leading-relaxed italic">"{insight.insight}"</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase">Recommended Action</p>
              <p className="text-sm text-slate-600">{insight.recommendation}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No current AI insights generated.</p>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px]">
        <span className="text-slate-400">IoT SYNC: {iot?.lastUpdated}</span>
        <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${iot?.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {iot?.status}
        </span>
      </div>
    </div>
  );
};

export default NodeDetail;
