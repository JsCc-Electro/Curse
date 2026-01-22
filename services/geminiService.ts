
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (history: { role: 'user' | 'model', text: string }[], currentMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const systemInstruction = `Eres un experto profesor de electrónica básica llamado 'Sparky'. 
  Tu objetivo es explicar conceptos de electrónica (voltaje, corriente, ley de ohm, componentes) de forma sencilla, 
  utilizando analogías (como el agua fluyendo por tuberías) y animando al estudiante. 
  Mantén tus respuestas concisas y utiliza Markdown para dar formato. 
  Si el estudiante pregunta algo fuera de la electrónica, redirígelo amablemente al curso.
  Usa emojis relacionados con la electricidad ocasionalmente ⚡🔋🔌.`;

  try {
    // We map our internal message format to the Gemini API format
    const geminiHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        history: geminiHistory,
        temperature: 0.8,
      },
    });

    const result = await chat.sendMessage({ message: currentMessage });
    return result.text || "Lo siento, tuve un pequeño cortocircuito. ¿Puedes repetir la pregunta?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ups, parece que hubo una caída de tensión en mis servidores. Inténtalo de nuevo en un momento.";
  }
};
