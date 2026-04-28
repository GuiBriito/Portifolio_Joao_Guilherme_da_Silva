import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface SafetyResult {
  isSafe: boolean;
  reason: string;
  rating: 'safe' | 'suspicious' | 'malicious';
}

export const checkUrlSafety = async (url: string): Promise<SafetyResult> => {
  if (!url || !url.startsWith('http')) {
    return { isSafe: true, reason: 'Invalid URL', rating: 'safe' };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following URL for potential security risks (phishing, malware, scams, or suspicious behavior). 
      URL: ${url}
      
      Return a JSON object with:
      - isSafe: boolean
      - reason: a short explanation in Portuguese
      - rating: 'safe', 'suspicious', or 'malicious'`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
            rating: { type: Type.STRING, enum: ['safe', 'suspicious', 'malicious'] }
          },
          required: ['isSafe', 'reason', 'rating']
        }
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error('Error checking URL safety:', error);
    // Fallback to safe if API fails to avoid blocking the user unnecessarily, 
    // but in a real app we might want to be more cautious.
    return { isSafe: true, reason: 'Check unavailable', rating: 'safe' };
  }
};
