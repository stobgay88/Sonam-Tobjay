
import { GoogleGenAI } from "@google/genai";

export const generateValueChainVideo = async (onProgress: (msg: string) => void) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `A cinematic, high-definition 3D animation showing the organic fruit and vegetable value chain in Bhutan. 
  Starting from the lush, terraced organic farms of Trongsa Dzongkhag with glowing IoT sensors on produce crates. 
  A smart electric truck carries these crates towards the futuristic, circular, and sustainable Gelephu Mindfulness City (GMC). 
  Inside GMC, a high-tech retail hub uses AI holographic dashboards to show demand forecasts. 
  Local consumers interact with vibrant fresh produce. 
  The aesthetic is eco-futuristic, vibrant, and reflects Bhutanese architecture and Mindfulness philosophy.`;

  onProgress("Initializing GMC Simulation Engine...");
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    onProgress("Synthesizing Trongsa sourcing data and IoT layers...");

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      onProgress("Rendering Gelephu Mindfulness City architecture and AI forecast overlays...");
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
