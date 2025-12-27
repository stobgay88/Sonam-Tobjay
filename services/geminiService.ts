
import { GoogleGenAI, Type } from "@google/genai";
import { Actor, InsightResponse } from "../types";

export const getSupplyChainInsight = async (actor: Actor, iotStatus: string): Promise<InsightResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Context: Bhutan's Organic Agriculture Value Chain.
    Actor: ${actor.name} (${actor.type}) located in ${actor.location}.
    Current IoT System Status: ${iotStatus}.
    
    Task: Provide a short AI-driven demand forecasting insight and a storage recommendation for this specific stage in the chain. 
    Focus on sustainability and organic standards.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING, description: "A forecasting insight based on regional trends." },
            recommendation: { type: Type.STRING, description: "Actionable storage or tracking advice." },
          },
          required: ["insight", "recommendation"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      insight: result.insight || "Forecast showing stable demand for high-value organic crops.",
      recommendation: result.recommendation || "Ensure cold-chain sensors are calibrated for the monsoon season."
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      insight: "Data-driven forecasting currently unavailable.",
      recommendation: "Maintain standard organic handling protocols."
    };
  }
};
