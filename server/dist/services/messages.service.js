import { config } from "dotenv";
import { AnthropicService } from "./anthropic.service";
import { XAIService } from "./xai.service";
config();
const API_KEY = process.env.XAI_API_KEY;
const BASE_URL = process.env.XAI_BASE_URL;
const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL;
if (!API_KEY) {
    throw new Error("Failed to load API key from .env file, plz double check the file.");
}
// init the Anthropic service
const anthropic = new AnthropicService(API_KEY, ANTHROPIC_BASE_URL);
// init the XAI service
const xai = new XAIService(API_KEY, BASE_URL);
export const promptForTextReply = async (text) => {
    try {
        if (ANTHROPIC_BASE_URL) {
            return anthropic.promptForTextReply(text);
        }
        return xai.promptForTextReply(text);
    }
    catch (error) {
        console.error("error details", error);
        console.error(error);
        throw new Error("Failed to call Anthropic API");
    }
};
