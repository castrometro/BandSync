import React from 'react';
import { Song } from '../../types';
import { Music, Mic2, Disc, FileAudio } from 'lucide-react';

interface SongsProps {
  songs: Song[];
}

const Songs: React.FC<SongsProps> = ({ songs }) => {
  const getStatusColor = (status: Song['status']) => {
    switch (status) {
      case 'Ready': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Polishing': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Demo': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Repertorio</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Nueva Canción
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map(song => (
          <div key={song.id} className="bg-slate-800 rounded-xl border border-slate-700 p-5 group hover:border-slate-500 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-900 transition-colors">
                <Music size={20} />
              </div>
              <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getStatusColor(song.status)}`}>
                {song.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">{song.title}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
              <span>{song.bpm} BPM</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              <span>{song.key}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-slate-700 pt-4">
              <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
                <FileAudio size={18} />
                <span className="text-[10px]">Demo</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
                <Mic2 size={18} />
                <span className="text-[10px]">Letra</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
                <Disc size={18} />
                <span className="text-[10px]">Versiones</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Songs;