import React, { useState } from 'react';
import { generateBandAdvice } from '../../services/geminiService';
import { CalendarEvent, Song } from '../../types';
import { Bot, Send, Sparkles, Loader } from 'lucide-react';

interface AIManagerProps {
  events: CalendarEvent[];
  songs: Song[];
}

const AIManager: React.FC<AIManagerProps> = ({ events, songs }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResponse(null);
    
    const result = await generateBandAdvice(events, songs, input);
    
    setResponse(result);
    setLoading(false);
  };

  const suggestions = [
    "¿Qué deberíamos ensayar esta semana?",
    "Ayúdame a armar el setlist para el show del 15",
    "¿Cómo organizamos mejor el tiempo de ensayo?",
    "¿Qué tema necesita más trabajo?"
  ];

  return (
    <div className="p-6 h-full flex flex-col max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
          <Bot size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">AI Band Manager</h2>
        <p className="text-slate-400 mt-2">Tu asistente inteligente para optimizar la banda.</p>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 space-y-6">
        {/* Intro / Suggestions */}
        {!response && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-indigo-500 hover:bg-slate-800/80 transition-all text-slate-300 text-sm flex items-center gap-3"
              >
                <Sparkles size={16} className="text-yellow-500 flex-shrink-0" />
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader size={32} className="animate-spin text-indigo-500" />
            <p className="text-slate-500 animate-pulse">Analizando cronograma y canciones...</p>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-indigo-500/30 shadow-xl shadow-black/20">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700">
               <Bot className="text-indigo-400" />
               <h3 className="font-semibold text-white">Estrategia Sugerida</h3>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-line leading-relaxed">
              {response}
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => { setResponse(null); setInput(''); }}
                className="text-sm text-slate-400 hover:text-white"
              >
                Hacer otra consulta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 flex gap-2 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
          placeholder="Pregúntale algo al manager..."
          className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder-slate-500"
        />
        <button
          onClick={handleAskAI}
          disabled={loading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIManager;