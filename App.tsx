
import React, { useState, useEffect } from 'react';
import { ACTORS, MOCK_FORECAST } from './constants';
import { Actor, IoTData, InsightResponse } from './types';
import Header from './components/Header';
import ValueChainVisualizer from './components/ValueChainVisualizer';
import NodeDetail from './components/NodeDetail';
import ForecastChart from './components/ForecastChart';
import VideoGenerator from './components/VideoGenerator';
import { getSupplyChainInsight } from './services/geminiService';

const App: React.FC = () => {
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [iotData, setIotData] = useState<Record<string, IoTData>>({});
  const [insight, setInsight] = useState<InsightResponse | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Simulate real-time IoT data stream
  useEffect(() => {
    const generateIot = () => {
      const newData: Record<string, IoTData> = {};
      ACTORS.forEach(actor => {
        newData[actor.id] = {
          temperature: Math.floor(Math.random() * 10) + 15,
          humidity: Math.floor(Math.random() * 20) + 60,
          status: Math.random() > 0.8 ? 'warning' : 'optimal',
          lastUpdated: new Date().toLocaleTimeString(),
        };
      });
      setIotData(newData);
    };

    generateIot();
    const interval = setInterval(generateIot, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleActorClick = async (actor: Actor) => {
    setSelectedActor(actor);
    setLoadingInsight(true);
    setInsight(null);
    
    const currentIot = iotData[actor.id];
    const statusMsg = `Temp: ${currentIot.temperature}°C, Humidity: ${currentIot.humidity}%, Status: ${currentIot.status}`;
    
    const aiInsight = await getSupplyChainInsight(actor, statusMsg);
    setInsight(aiInsight);
    setLoadingInsight(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 lg:p-8 space-y-8">
        {/* Mindfulness City Animation Section */}
        <section className="mb-12">
          <VideoGenerator />
        </section>

        <section className="relative h-[400px] lg:h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50/30 -z-10" />
          <ValueChainVisualizer 
            actors={ACTORS} 
            selectedId={selectedActor?.id || null}
            iotData={iotData}
            onActorClick={handleActorClick} 
          />
          
          <div className="absolute top-6 left-6 max-w-xs space-y-2 pointer-events-none">
            <h2 className="text-2xl font-display text-emerald-900">Digital Twin Map</h2>
            <p className="text-sm text-slate-600 bg-white/60 p-2 rounded-lg backdrop-blur-sm">
              Sourcing organic produce from Trongsa for Gelephu Mindfulness City.
              Click nodes to view AI insights.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <NodeDetail 
              actor={selectedActor} 
              iot={selectedActor ? iotData[selectedActor.id] : null}
              insight={insight}
              loading={loadingInsight}
            />
          </div>
          
          <div className="lg:col-span-2">
            <ForecastChart data={MOCK_FORECAST} />
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-slate-500 text-sm">
        Gelephu Mindfulness City Value Chain Digital Twin &copy; {new Date().getFullYear()} — Empowering GNH through Tech
      </footer>
    </div>
  );
};

export default App;
