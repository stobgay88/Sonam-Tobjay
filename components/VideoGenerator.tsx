
import React, { useState, useEffect } from 'react';
import { generateValueChainVideo } from '../services/videoService';

const VideoGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => setLoadingTime(prev => prev + 1), 1000);
    } else {
      setLoadingTime(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

    setLoading(true);
    setError(null);
    setVideoUrl(null);
    
    try {
      const url = await generateValueChainVideo(setProgressMsg);
      setVideoUrl(url);
    } catch (err: any) {
      setError("Failed to generate animation. Please ensure you have a valid paid API key and stable connection.");
      if (err?.message?.includes("Requested entity was not found")) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
    } finally {
      setLoading(false);
    }
  };

  const getSubMessage = () => {
    if (loadingTime < 15) return "Aligning GIS data from Trongsa Dzongkhag...";
    if (loadingTime < 30) return "Synthesizing cold-chain IoT tracking nodes...";
    if (loadingTime < 45) return "Rendering Gelephu Mindfulness City infrastructure...";
    if (loadingTime < 60) return "Finalizing AI demand forecast holographic layers...";
    return "Optimizing cinematic resolution for your view...";
  };

  return (
    <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative border border-slate-800">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <span className="text-9xl">🎬</span>
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>GMC Mindfulness Simulation Engine</span>
        </div>
        
        <h2 className="text-3xl font-display font-bold mb-4 tracking-tight">Animate the GMC Value Chain</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Experience the journey of organic harvest from the <span className="text-emerald-400 font-medium">Trongsa Highlands</span> to the sustainable markets of <span className="text-emerald-400 font-medium">Gelephu Mindfulness City</span>. 
          Powered by Veo 3.1, this simulation visualizes IoT tracking and AI predictive logistics in high fidelity.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        {!videoUrl && !loading && (
          <button
            onClick={handleGenerate}
            className="group flex items-center space-x-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all active:scale-95 shadow-xl shadow-emerald-900/20"
          >
            <span>Generate Simulation</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        )}

        {loading && (
          <div className="space-y-6 py-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <div className="w-14 h-14 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-emerald-500">
                  {loadingTime}s
                </div>
              </div>
              <div>
                <div className="font-bold text-lg text-emerald-50 animate-pulse">{progressMsg}</div>
                <div className="text-slate-500 text-sm italic">{getSubMessage()}</div>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-500/20 animate-pulse" />
              <div className="h-full bg-emerald-500 relative transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                   style={{ width: `${Math.min(loadingTime * 2, 98)}%` }} />
            </div>
          </div>
        )}

        {videoUrl && (
          <div className="mt-8 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-black aspect-video group relative">
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setVideoUrl(null)}
                className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-red-500 transition-colors text-xs font-bold flex items-center space-x-2"
              >
                <span>Reset Simulation</span>
                <span>✕</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
          Powered by Veo 3.1 • 1080p Cinematic Engine
        </div>
        <div className="flex space-x-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-help" title="Mindful Tech Stack">
          <span className="text-xl">🏔️</span>
          <span className="text-xl">⚡</span>
          <span className="text-xl">🧠</span>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
