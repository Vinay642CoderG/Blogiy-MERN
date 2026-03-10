import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const listGeminiModels = async () => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === "") {
      console.error(
        "❌ Error: GEMINI_API_KEY not found in environment variables",
      );
      console.log("\nPlease set your API key in the .env file:");
      console.log("GEMINI_API_KEY=your_api_key_here");
      process.exit(1);
    }

    console.log("🔍 Fetching available Gemini AI models...\n");

    const genAI = new GoogleGenAI({ apiKey });

    // Debug: Let's see what the response looks like
    const response = await genAI.models.list();
    console.log(
      "Debug - Response structure:",
      JSON.stringify(response, null, 2),
    );

    // Try different possible response structures
    const models = response.models || response || [];

    if (!Array.isArray(models) && models.length === undefined) {
      console.log("\n⚠️  Response is not in expected format");
      console.log("Response:", response);
      process.exit(1);
    }

    console.log(`\n✅ Found ${models.length} models:\n`);
    console.log("=".repeat(80));

    models.forEach((model, index) => {
      console.log(`\n${index + 1}. Model: ${model.name}`);
      console.log(`   Display Name: ${model.displayName || "N/A"}`);
      console.log(`   Description: ${model.description || "N/A"}`);
      console.log(
        `   Supported Methods: ${model.supportedGenerationMethods?.join(", ") || "N/A"}`,
      );
      console.log(`   Input Token Limit: ${model.inputTokenLimit || "N/A"}`);
      console.log(`   Output Token Limit: ${model.outputTokenLimit || "N/A"}`);
      console.log("-".repeat(80));
    });

    console.log("\n📝 Recommended models for your use case:");
    console.log("   • gemini-1.5-flash - Fast and efficient for most tasks");
    console.log("   • gemini-1.5-pro - More capable for complex tasks");
    console.log("   • gemini-2.0-flash-exp - Latest experimental model\n");
  } catch (error) {
    console.error("❌ Error fetching models:", error.message);
    console.error("\nFull error:", error);

    if (error.message.includes("API key") || error.message.includes("401")) {
      console.log("\n💡 Tip: Make sure your GEMINI_API_KEY is valid");
      console.log("Get your API key from: https://aistudio.google.com/apikey");
    }

    process.exit(1);
  }
};

listGeminiModels();
