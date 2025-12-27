
import React, { useState, useEffect } from 'react';
import { generateValueChainVideo } from '../services/videoService';

const VideoGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Proceed assuming success as per instructions to avoid race conditions
    }

    setLoading(true);
    setError(null);
    setVideoUrl(null);
    
    try {
      const url = await generateValueChainVideo(setProgressMsg);
      setVideoUrl(url);
    } catch (err: any) {
      setError("Failed to generate animation. Please ensure you have a valid paid API key selected.");
      if (err?.message?.includes("Requested entity was not found")) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative border border-slate-800">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <span className="text-9xl">🎥</span>
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>GMC Mindfulness Simulation</span>
        </div>
        
        <h2 className="text-3xl font-display font-bold mb-4">Visualize the GMC Value Chain</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Generate a high-fidelity AI animation of the organic flow from <span className="text-white font-medium">Trongsa Dzongkhag</span> to 
          the heart of <span className="text-white font-medium">Gelephu Mindfulness City</span>. 
          See IoT tracking and AI forecasting in a futuristic Bhutanese context.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        {!videoUrl && !loading && (
          <button
            onClick={handleGenerate}
            className="group flex items-center space-x-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all active:scale-95 shadow-xl"
          >
            <span>Generate Simulation</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        )}

        {loading && (
          <div className="space-y-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
              <div>
                <div className="font-bold text-lg animate-pulse">{progressMsg}</div>
                <div className="text-slate-500 text-sm">This may take 1-2 minutes...</div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-[loading_30s_ease-in-out_infinite]" style={{ width: '60%' }} />
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
                className="bg-black/50 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-500 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-[10px] text-slate-500 uppercase tracking-widest font-medium">
        Powered by Veo 3.1 & Gemini Pro • Paid API Key Required
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default VideoGenerator;
