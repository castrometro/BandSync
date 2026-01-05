import React, { useState } from 'react';
import { Song, SongStatus, SongType, Album } from '../../types';
import { Music, Mic2, Disc, FileAudio, Plus, X, Disc3, User, Search, Filter, Album as AlbumIcon, ArrowRight } from 'lucide-react';
import SongDetail from './SongDetail';

interface SongsProps {
  songs: Song[];
  albums: Album[];
  onAddSong: (song: Song) => void;
  onUpdateSong: (song: Song) => void;
  onAddAlbum: (album: Album) => void;
}

const Songs: React.FC<SongsProps> = ({ songs, albums, onAddSong, onUpdateSong, onAddAlbum }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  
  // Modal States
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  
  // Filters
  const [filterText, setFilterText] = useState('');
  const [filterAlbum, setFilterAlbum] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Form State - Song
  const [newSong, setNewSong] = useState<Partial<Song>>({
    title: '',
    status: 'Idea',
    type: 'Original',
    bpm: 120,
    key: '',
    albumId: '',
    originalArtist: ''
  });

  // Form State - Album
  const [newAlbum, setNewAlbum] = useState<Partial<Album>>({
    title: '',
    description: '',
    releaseDate: ''
  });

  if (selectedSong) {
    const activeAlbum = albums.find(a => a.id === selectedSong.albumId);
    return (
      <SongDetail 
        song={selectedSong} 
        album={activeAlbum}
        onBack={() => setSelectedSong(null)}
        onUpdate={(updatedSong) => {
          onUpdateSong(updatedSong);
          setSelectedSong(updatedSong); // Keep local state in sync
        }}
      />
    );
  }

  const getStatusColor = (status: SongStatus) => {
    switch (status) {
      case 'Ready': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Polishing': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Demo': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  // Filter Logic
  const filteredSongs = songs.filter(song => {
    const matchesText = song.title.toLowerCase().includes(filterText.toLowerCase()) || 
                        song.originalArtist?.toLowerCase().includes(filterText.toLowerCase());
    
    const matchesAlbum = filterAlbum === 'all' 
      ? true 
      : filterAlbum === 'single' ? !song.albumId : song.albumId === filterAlbum;

    const matchesStatus = filterStatus === 'all' 
      ? true 
      : song.status === filterStatus;

    return matchesText && matchesAlbum && matchesStatus;
  });

  const getAlbumName = (albumId?: string) => {
    if (!albumId) return null;
    return albums.find(a => a.id === albumId)?.title || 'Desconocido';
  };

  const handleSongSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSong.title) {
      const songToAdd: Song = {
        id: Date.now().toString(),
        title: newSong.title,
        status: newSong.status as SongStatus,
        type: newSong.type as SongType,
        bpm: newSong.bpm,
        key: newSong.key,
        albumId: newSong.albumId || undefined,
        originalArtist: newSong.originalArtist
      };
      onAddSong(songToAdd);
      setIsSongModalOpen(false);
      // Reset form
      setNewSong({
        title: '',
        status: 'Idea',
        type: 'Original',
        bpm: 120,
        key: '',
        albumId: '',
        originalArtist: ''
      });
    }
  };

  const handleAlbumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAlbum.title) {
      const albumToAdd: Album = {
        id: 'a' + Date.now().toString(),
        title: newAlbum.title,
        description: newAlbum.description,
        releaseDate: newAlbum.releaseDate
      };
      onAddAlbum(albumToAdd);
      setIsAlbumModalOpen(false);
      setNewAlbum({ title: '', description: '', releaseDate: '' });
    }
  };

  return (
    <div className="p-6 relative h-full flex flex-col">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 flex-shrink-0">
        <div>
           <h2 className="text-3xl font-bold text-white">Repertorio</h2>
           <p className="text-slate-400 text-sm mt-1">{filteredSongs.length} canciones encontradas</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAlbumModalOpen(true)}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-slate-700"
          >
            <Disc size={18} />
            Crear Álbum
          </button>
          <button 
            onClick={() => setIsSongModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <Plus size={18} />
            Nueva Canción
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 mb-6 flex flex-col md:flex-row gap-4 items-center flex-shrink-0">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar canción..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500 placeholder-slate-600"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <select 
              value={filterAlbum}
              onChange={(e) => setFilterAlbum(e.target.value)}
              className="w-full md:w-48 appearance-none bg-slate-900 border border-slate-700 rounded-lg pl-4 pr-10 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">Todos los Álbumes</option>
              <option value="single">Sin Álbum / Singles</option>
              {albums.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
            <AlbumIcon size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          <div className="relative flex-1 md:flex-none">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-40 appearance-none bg-slate-900 border border-slate-700 rounded-lg pl-4 pr-10 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">Todos los estados</option>
              <option value="Idea">Idea</option>
              <option value="Demo">Demo</option>
              <option value="Polishing">En Pulido</option>
              <option value="Ready">Listas</option>
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6">
        {filteredSongs.length > 0 ? (
          filteredSongs.map(song => (
            <div key={song.id} className="bg-slate-800 rounded-xl border border-slate-700 p-5 group hover:border-slate-500 transition-all hover:translate-y-[-2px] hover:shadow-xl flex flex-col">
              {/* Header: Icon + Status */}
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${song.type === 'Original' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {song.type === 'Original' ? <Music size={20} /> : <Disc3 size={20} />}
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getStatusColor(song.status)}`}>
                  {song.status}
                </span>
              </div>
              
              {/* Title & Metadata */}
              <div className="mb-4 flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 truncate" title={song.title}>{song.title}</h3>
                
                {song.type === 'Cover' && song.originalArtist && (
                  <p className="text-xs text-rose-300 flex items-center gap-1 mb-2">
                     <User size={12} /> by {song.originalArtist}
                  </p>
                )}
                
                {song.albumId && song.type === 'Original' ? (
                   <p className="text-xs text-indigo-300 flex items-center gap-1 mb-2">
                      <Disc size={12} /> {getAlbumName(song.albumId)}
                   </p>
                ) : (
                   <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                      <Music size={12} /> Single
                   </p>
                )}

                <div className="flex items-center gap-3 text-sm text-slate-400 mt-3">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700/50">{song.bpm || '?'} BPM</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700/50">Key: {song.key || '?'}</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-700 pt-4 mt-auto">
                <button 
                  onClick={() => setSelectedSong(song)}
                  className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors group/btn"
                >
                  <FileAudio size={18} className="group-hover/btn:text-indigo-400" />
                  <span className="text-[10px]">Demo</span>
                </button>
                <button 
                  onClick={() => setSelectedSong(song)}
                  className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors group/btn"
                >
                  <Mic2 size={18} className="group-hover/btn:text-indigo-400" />
                  <span className="text-[10px]">Letra</span>
                </button>
                <button 
                  onClick={() => setSelectedSong(song)}
                  className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors group/btn col-span-1"
                >
                   <span className="flex items-center gap-1">
                      <ArrowRight size={18} className="group-hover/btn:text-indigo-400" />
                   </span>
                   <span className="text-[10px]">Ver Detalles</span>
                </button>
              </div>
            </div>
          ))
        ) : (
           <div className="col-span-full py-20 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
              <Music size={48} className="mx-auto mb-4 opacity-50" />
              <p>No se encontraron canciones con estos filtros.</p>
           </div>
        )}
      </div>

      {/* --- ADD SONG MODAL --- */}
      {isSongModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSongModalOpen(false)}></div>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-lg relative z-10 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Agregar Nueva Canción</h3>
              <button onClick={() => setIsSongModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSongSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Título</label>
                <input 
                  type="text" 
                  required
                  value={newSong.title}
                  onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Ej: Bohemian Rhapsody"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Tipo</label>
                  <select 
                    value={newSong.type}
                    onChange={(e) => setNewSong({...newSong, type: e.target.value as SongType})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Original">Original</option>
                    <option value="Cover">Cover</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Estado</label>
                  <select 
                    value={newSong.status}
                    onChange={(e) => setNewSong({...newSong, status: e.target.value as SongStatus})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Demo">Demo</option>
                    <option value="Polishing">En Pulido</option>
                    <option value="Ready">Lista (Ready)</option>
                  </select>
                </div>
              </div>

              {newSong.type === 'Original' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Álbum / Proyecto</label>
                  <select 
                    value={newSong.albumId || ''}
                    onChange={(e) => setNewSong({...newSong, albumId: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Seleccionar Álbum (Opcional)</option>
                    {albums.map(a => (
                      <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-300">Artista Original</label>
                   <input 
                     type="text" 
                     value={newSong.originalArtist || ''}
                     onChange={(e) => setNewSong({...newSong, originalArtist: e.target.value})}
                     className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                     placeholder="Ej: Queen"
                   />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">BPM</label>
                  <input 
                    type="number" 
                    value={newSong.bpm}
                    onChange={(e) => setNewSong({...newSong, bpm: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Tonalidad (Key)</label>
                  <input 
                    type="text" 
                    value={newSong.key}
                    onChange={(e) => setNewSong({...newSong, key: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Ej: Am"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsSongModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20"
                >
                  Guardar Canción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD ALBUM MODAL --- */}
      {isAlbumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAlbumModalOpen(false)}></div>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md relative z-10 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Crear Nuevo Álbum</h3>
              <button onClick={() => setIsAlbumModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAlbumSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nombre del Álbum / EP</label>
                <input 
                  type="text" 
                  required
                  value={newAlbum.title}
                  onChange={(e) => setNewAlbum({...newAlbum, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Ej: Greatest Hits"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Descripción (Opcional)</label>
                <textarea 
                  value={newAlbum.description || ''}
                  onChange={(e) => setNewAlbum({...newAlbum, description: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors h-24 resize-none"
                  placeholder="Breve descripción del concepto..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Fecha de Lanzamiento</label>
                <input 
                  type="date"
                  value={newAlbum.releaseDate || ''}
                  onChange={(e) => setNewAlbum({...newAlbum, releaseDate: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAlbumModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20"
                >
                  Crear Álbum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Songs;