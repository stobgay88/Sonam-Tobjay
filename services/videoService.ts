
import { GoogleGenAI } from "@google/genai";

export const generateValueChainVideo = async (onProgress: (msg: string) => void) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `A cinematic 4K animation of the organic fruits and vegetable value chain in Bhutan. 
  Step 1: Lush green terraced farms in Trongsa Dzongkhag where farmers harvest vibrant organic carrots and apples. 
  Step 2: Produce crates are tagged with glowing blue IoT sensors for real-time tracking and cold storage monitoring. 
  Step 3: A sleek, white electric transport truck drives through a scenic mountain pass towards the horizon. 
  Step 4: The truck enters the futuristic, circular, and eco-sustainable Gelephu Mindfulness City (GMC) with its distinctive Bhutanese architecture. 
  Step 5: Inside a GMC organic hub, holographic AI dashboards display rising demand forecasts. 
  Step 6: Smiling Bhutanese citizens enjoy fresh produce in a sunlit, wooden marketplace. 
  The lighting is warm and hopeful, reflecting the Mindfulness City concept.`;

  onProgress("Initializing GMC Simulation Engine...");
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });

    onProgress("Synthesizing Trongsa sourcing data and IoT layers...");

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      onProgress("Simulating Gelephu Mindfulness City architecture and AI forecast overlays...");
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed");
    
    return `${downloadLink}&key=${process.env.API_KEY}`;
  } catch (error) {
    console.error("Video Generation Error:", error);
    throw error;
  }
};
