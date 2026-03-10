import { GoogleGenAI } from "@google/genai";
import env from "./env.js";

// Initialize Gemini AI
const genAI = env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })
  : null;

const main = async (prompt) => {
  if (!genAI || !env.GEMINI_API_KEY || env.GEMINI_API_KEY.trim() === "") {
    throw new Error("Gemini API key not configured");
  }
  const response = await genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  return response.text;
};

export default main;
