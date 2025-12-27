
import React from 'react';
import { Actor, IoTData } from '../types';

interface Props {
  actors: Actor[];
  selectedId: string | null;
  iotData: Record<string, IoTData>;
  onActorClick: (actor: Actor) => void;
}

const ValueChainVisualizer: React.FC<Props> = ({ actors, selectedId, iotData, onActorClick }) => {
  return (
    <div className="relative w-full h-full p-8 lg:p-16">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Filter for the glowing cargo dot */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection Paths and Moving Cargo */}
        {actors.slice(0, -1).map((actor, i) => {
          const next = actors[i + 1];
          const pathId = `path-${actor.id}`;
          const pathD = `M ${actor.x} ${actor.y} C ${actor.x + (next.x - actor.x)/2} ${actor.y}, ${actor.x + (next.x - actor.x)/2} ${next.y}, ${next.x} ${next.y}`;
          
          return (
            <React.Fragment key={pathId}>
              <path
                id={pathId}
                d={pathD}
                fill="none"
                stroke="url(#gradient-path)"
                strokeWidth="0.4"
                className="opacity-40"
              />
              {/* Animated Cargo Pulse */}
              <circle r="0.6" fill="#10b981" filter="url(#glow)">
                <animateMotion 
                  dur={`${3 + i}s`} 
                  repeatCount="indefinite" 
                  path={pathD} 
                />
              </circle>
            </React.Fragment>
          );
        })}
      </svg>

      {actors.map((actor) => {
        const isSelected = selectedId === actor.id;
        const iot = iotData[actor.id];

        return (
          <button
            key={actor.id}
            onClick={() => onActorClick(actor)}
            className={`absolute group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-10`}
            style={{ left: `${actor.x}%`, top: `${actor.y}%` }}
          >
            {/* Mindful Ripple Effect for selected node */}
            {isSelected && (
              <>
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-20 scale-150" />
                <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-100 opacity-30 scale-125" />
              </>
            )}
            
            <div className={`
              relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300
              ${isSelected ? 'bg-emerald-600 scale-125 shadow-2xl ring-4 ring-emerald-100' : 'bg-white hover:bg-emerald-50 shadow-lg scale-100'}
            `}>
              <span className="text-2xl mb-1">{actor.icon}</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm transition-colors duration-500"
                   style={{ backgroundColor: iot?.status === 'warning' ? '#f59e0b' : '#10b981' }} />
            </div>

            <div className={`
              absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-300 pointer-events-none
              ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}>
              <div className="bg-slate-900/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                {actor.name}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ValueChainVisualizer;
