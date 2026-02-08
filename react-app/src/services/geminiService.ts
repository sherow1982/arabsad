
import { GoogleGenerativeAI } from "@google/genai";

const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const MODEL_NAME = "gemini-pro";

const genAI = new GoogleGenerativeAI(API_KEY);

export const createChatSession = () => {
    const chat = genAI.getGenerativeModel({ model: MODEL_NAME }).startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });
    return chat;
};
