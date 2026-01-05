import React, { useState, useEffect } from 'react';
import { Song, Album, SongStatus } from '../../types';
import { ArrowLeft, Save, Music, Clock, Activity, FileText, Link as LinkIcon, ExternalLink, PlayCircle } from 'lucide-react';

interface SongDetailProps {
  song: Song;
  album?: Album;
  onBack: () => void;
  onUpdate: (song: Song) => void;
}

const SongDetail: React.FC<SongDetailProps> = ({ song, album, onBack, onUpdate }) => {
  const [editedSong, setEditedSong] = useState<Song>(song);
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState<'lyrics' | 'notes'>('lyrics');

  useEffect(() => {
    setEditedSong(song);
    setIsDirty(false);
  }, [song]);

  const handleChange = (field: keyof Song, value: any) => {
    setEditedSong(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    onUpdate(editedSong);
    setIsDirty(false);
  };

  const getStatusColor = (status: SongStatus) => {
    switch (status) {
      case 'Ready': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Polishing': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Demo': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 animate-fade-in">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver al Repertorio</span>
        </button>
        
        {isDirty && (
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/20 animate-pulse"
          >
            <Save size={18} />
            Guardar Cambios
          </button>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel: Metadata */}
        <div className="w-full md:w-80 bg-slate-800/50 border-r border-slate-800 p-6 overflow-y-auto">
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${getStatusColor(editedSong.status)}`}>
              {editedSong.status}
            </span>
            <h1 className="text-3xl font-bold text-white mb-1">{editedSong.title}</h1>
            {editedSong.type === 'Cover' && (
              <p className="text-slate-400 text-sm">Original de <span className="text-white font-medium">{editedSong.originalArtist}</span></p>
            )}
            {editedSong.albumId && album && (
              <p className="text-indigo-400 text-sm mt-1 flex items-center gap-1">
                <Music size={14} /> {album.title}
              </p>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">Detalles Técnicos</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Activity size={16} className="text-indigo-400" />
                    <span>BPM</span>
                  </div>
                  <input 
                    type="number"
                    value={editedSong.bpm || ''}
                    onChange={(e) => handleChange('bpm', parseInt(e.target.value))}
                    className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-right text-white text-sm focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Music size={16} className="text-indigo-400" />
                    <span>Key</span>
                  </div>
                  <input 
                    type="text"
                    value={editedSong.key || ''}
                    onChange={(e) => handleChange('key', e.target.value)}
                    className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-right text-white text-sm focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock size={16} className="text-indigo-400" />
                    <span>Duración</span>
                  </div>
                  <span className="text-slate-400 text-sm">--:--</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider flex justify-between items-center">
                <span>Recursos</span>
                <button className="text-indigo-400 hover:text-white" title="Agregar link">+</button>
              </h3>
              <div className="space-y-2">
                {editedSong.links && editedSong.links.length > 0 ? (
                  editedSong.links.map(link => (
                    <a 
                      key={link.id} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-lg transition-all group"
                    >
                      <div className="p-2 bg-slate-900 rounded-md text-indigo-400 group-hover:text-white transition-colors">
                        {link.type === 'spotify' ? <Music size={16} /> : link.type === 'youtube' ? <PlayCircle size={16} /> : <LinkIcon size={16} />}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm text-white font-medium truncate">{link.label}</p>
                        <p className="text-xs text-slate-500 truncate">{link.type}</p>
                      </div>
                      <ExternalLink size={14} className="text-slate-600 group-hover:text-white" />
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 italic">No hay enlaces.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Content */}
        <div className="flex-1 flex flex-col bg-slate-900 relative">
          {/* Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900">
            <button
              onClick={() => setActiveTab('lyrics')}
              className={`flex-1 py-4 text-center font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'lyrics' 
                  ? 'border-indigo-500 text-white bg-slate-800/30' 
                  : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/10'
              }`}
            >
              <FileText size={18} />
              Letra
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-4 text-center font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'notes' 
                  ? 'border-indigo-500 text-white bg-slate-800/30' 
                  : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/10'
              }`}
            >
              <Activity size={18} />
              Notas de Producción
            </button>
          </div>

          <div className="flex-1 relative">
            {activeTab === 'lyrics' ? (
              <textarea
                value={editedSong.lyrics || ''}
                onChange={(e) => handleChange('lyrics', e.target.value)}
                placeholder="Escribe la letra aquí... (soporta Markdown básico)"
                className="w-full h-full bg-slate-900 text-slate-300 p-8 resize-none focus:outline-none leading-relaxed font-mono text-base"
                spellCheck={false}
              />
            ) : (
              <textarea
                value={editedSong.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Notas sobre estructura, instrumentación, ideas pendientes..."
                className="w-full h-full bg-slate-900 text-amber-100/80 p-8 resize-none focus:outline-none leading-relaxed font-sans text-base"
                spellCheck={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;