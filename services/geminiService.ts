import { GoogleGenAI } from "@google/genai";
import { CalendarEvent, Song } from "../types";

// In a real app, this would be validated closer to app start, but for this demo:
const apiKey = process.env.API_KEY || ''; 

// Initialize GenAI
const ai = new GoogleGenAI({ apiKey });

export const generateBandAdvice = async (
  events: CalendarEvent[],
  songs: Song[],
  query: string
): Promise<string> => {
  if (!apiKey) {
    return "API Key no configurada. Por favor configura process.env.API_KEY.";
  }

  try {
    const context = `
      Actúa como un Manager de Banda Musical experimentado y experto en producción.
      
      Aquí está el estado actual de la banda:
      
      Próximos Eventos:
      ${events.map(e => `- ${e.date.split('T')[0]}: ${e.title} (${e.type}) @ ${e.location}. Objetivo: ${e.objective}`).join('\n')}
      
      Repertorio/Canciones:
      ${songs.map(s => `- ${s.title} (Estado: ${s.status}, Key: ${s.key}, BPM: ${s.bpm})`).join('\n')}
      
      El usuario pregunta: "${query}"
      
      Responde de manera concisa, motivadora y práctica. Usa formato Markdown si es necesario.
      Si te piden sugerencias de ensayo, basate en los objetivos y canciones que no están 'Ready'.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-latest',
      contents: context,
    });

    return response.text || "No pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Hubo un error consultando a tu manager virtual.";
  }
};

export const generateLyricsIdea = async (theme: string, genre: string): Promise<string> => {
  if (!apiKey) return "Configura tu API KEY.";

  try {
    const prompt = `Escribe un coro corto y pegadizo para una canción de género ${genre} sobre: "${theme}". Incluye los acordes sugeridos.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-latest',
      contents: prompt,
    });
    
    return response.text || "Sin ideas por ahora.";
  } catch (error) {
    return "Error generando letras.";
  }
};