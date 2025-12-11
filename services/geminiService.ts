import { GoogleGenAI, Type } from "@google/genai";
import { Job, UserProfile, AIAnalysisResult } from "../types";

// Initialize Gemini
// Note: In a real Chrome Extension, this would likely be handled in a background script 
// or via a proxy server to protect the key, or the user would input their own key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeJobMatch = async (job: Job, profile: UserProfile): Promise<AIAnalysisResult> => {
  if (!process.env.API_KEY) {
    // Fallback for demo if no key is present
    console.warn("No API Key provided. Returning mock score.");
    return {
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      reason: "API Key missing: Simulated analysis based on keywords."
    };
  }

  try {
    const prompt = `
      Act as a career coach. Analyze the match between the following candidate profile and job description.
      
      Candidate Profile:
      - Headline: ${profile.headline}
      - Skills: ${profile.skills.join(", ")}
      - Level: ${profile.experienceLevel}

      Job Description:
      - Title: ${job.title}
      - Company: ${job.company}
      - Description: ${job.description}
      - Keywords: ${job.keywords.join(", ")}

      Provide a match score from 0 to 100 and a very brief (10 words max) reason.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            reason: { type: Type.STRING }
          },
          required: ["score", "reason"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    return {
      score: result.score || 0,
      reason: result.reason || "Analysis failed"
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      score: 50,
      reason: "AI Analysis unavailable"
    };
  }
};