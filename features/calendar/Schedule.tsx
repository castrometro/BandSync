import React, { useState } from 'react';
import { CalendarEvent, EventType } from '../../types';
import { MapPin, Target, Clock, PlusCircle } from 'lucide-react';

interface ScheduleProps {
  events: CalendarEvent[];
}

const Schedule: React.FC<ScheduleProps> = ({ events }) => {
  const [filter, setFilter] = useState<EventType | 'All'>('All');

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.type === filter);

  const getBadgeColor = (type: EventType) => {
    switch(type) {
      case EventType.REHEARSAL: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case EventType.GIG: return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case EventType.RECORDING: return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Cronograma</h2>
          <p className="text-slate-400">Ensayos, fechas y reuniones importantes.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <PlusCircle size={18} />
          Nuevo Evento
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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

                <div className="pt-2 border-t border-slate-700/50 mt-2">
                  <div className="flex items-start gap-2">
                    <Target size={16} className="text-emerald-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-slate-300 italic">"{event.objective}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Schedule;