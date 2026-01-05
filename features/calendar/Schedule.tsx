import React, { useState } from 'react';
import { CalendarEvent, EventType } from '../../types';
import { MapPin, Target, Clock, PlusCircle, X, Calendar as CalendarIcon } from 'lucide-react';

interface ScheduleProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ events, onAddEvent }) => {
  const [filter, setFilter] = useState<EventType | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    type: EventType.REHEARSAL,
    location: '',
    objective: '',
    date: '',
    attendees: []
  });

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.type === filter);

  const getBadgeColor = (type: EventType) => {
    switch(type) {
      case EventType.REHEARSAL: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case EventType.GIG: return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case EventType.RECORDING: return 'bg-red-500/20 text-red-300 border-red-500/30';
      case EventType.MEETING: return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case EventType.LISTENING: return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      const eventToAdd: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: newEvent.date, // Input datetime-local returns ISO format compatible string
        type: newEvent.type as EventType,
        location: newEvent.location || 'TBD',
        objective: newEvent.objective || '',
        attendees: ['1', '2', '3', '4'] // Default to all for now
      };
      onAddEvent(eventToAdd);
      setIsModalOpen(false);
      // Reset
      setNewEvent({
        title: '',
        type: EventType.REHEARSAL,
        location: '',
        objective: '',
        date: '',
        attendees: []
      });
    }
  };

  return (
    <div className="p-6 h-full flex flex-col relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Cronograma</h2>
          <p className="text-slate-400">Ensayos, fechas y reuniones importantes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
        >
          <PlusCircle size={18} />
          Nuevo Evento
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setFilter('All')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'All' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          Todos
        </button>
        {Object.values(EventType).map(type => (
          <button 
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === type ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Timeline List */}
      <div className="space-y-4 overflow-y-auto pr-2 pb-10">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
             <CalendarIcon size={48} className="mx-auto mb-4 opacity-50" />
            No hay eventos programados con este filtro.
          </div>
        ) : (
          filteredEvents.map(event => (
            <div key={event.id} className="bg-slate-800 rounded-xl border border-slate-700 p-5 flex flex-col md:flex-row gap-6 hover:border-slate-600 transition-colors group">
              {/* Date Box */}
              <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-slate-900/50 rounded-lg p-4 w-full md:w-24 border border-slate-800">
                <span className="text-2xl font-bold text-white">{new Date(event.date).getDate()}</span>
                <span className="text-xs uppercase font-bold text-slate-500 ml-2 md:ml-0 md:mt-1">
                  {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                </span>
              </div>

              {/* Info */}
              <div className="flex-grow space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                   <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-indigo-400" />
                      {new Date(event.date).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})} hs
                   </div>
                   <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-indigo-400" />
                      {event.location}
                   </div>
                </div>

                {event.objective && (
                  <div className="pt-2 border-t border-slate-700/50 mt-2">
                    <div className="flex items-start gap-2">
                      <Target size={16} className="text-emerald-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-slate-300 italic">"{event.objective}"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD EVENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-lg relative z-10 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Agendar Nuevo Evento</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Título</label>
                <input 
                  type="text" 
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Ej: Ensayo General"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Tipo de Evento</label>
                  <select 
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value as EventType})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    {Object.values(EventType).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Fecha y Hora</label>
                  <input 
                    type="datetime-local"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 appearance-none"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Ubicación</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Ej: Sala 4, Studio A"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Objetivo Principal (Opcional)</label>
                <textarea 
                  value={newEvent.objective}
                  onChange={(e) => setNewEvent({...newEvent, objective: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors h-20 resize-none"
                  placeholder="¿Qué se busca lograr en esta sesión?"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;