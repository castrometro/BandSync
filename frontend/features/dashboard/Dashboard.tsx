import React from 'react';
import { CalendarEvent, Song } from '../../types';
import { Activity, Star, Calendar as CalIcon, Mic2, CheckCircle2, Sparkles, Music2, FlaskConical } from 'lucide-react';

interface DashboardProps {
  events: CalendarEvent[];
  songs: Song[];
}

const Dashboard: React.FC<DashboardProps> = ({ events, songs }) => {
  // Compute basic stats
  const songsReady = songs.filter(s => s.status === 'Ready').length;
  const songsPolishing = songs.filter(s => s.status === 'Polishing').length;
  const songsDemo = songs.filter(s => s.status === 'Demo').length;
  const songsIdea = songs.filter(s => s.status === 'Idea').length;
  
  const nextEvent = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  const totalSongs = songs.length || 1;

  const pipelineStages = [
    {
      id: 'Ready',
      label: 'Listos para Show',
      count: songsReady,
      percentage: Math.round((songsReady / totalSongs) * 100),
      colorClass: 'bg-emerald-500',
      textClass: 'text-emerald-400',
      borderClass: 'border-emerald-500/30',
      bgClass: 'bg-emerald-500/10',
      icon: <CheckCircle2 size={20} className="text-emerald-400" />,
      description: "Temas cerrados. Solo requieren repaso de mantenimiento."
    },
    {
      id: 'Polishing',
      label: 'En Pulido',
      count: songsPolishing,
      percentage: Math.round((songsPolishing / totalSongs) * 100),
      colorClass: 'bg-indigo-500',
      textClass: 'text-indigo-400',
      borderClass: 'border-indigo-500/30',
      bgClass: 'bg-indigo-500/10',
      icon: <Sparkles size={20} className="text-indigo-400" />,
      description: "Estructura definida. Faltan ajustes de matices o solos."
    },
    {
      id: 'Demo',
      label: 'Maquetas / Demos',
      count: songsDemo,
      percentage: Math.round((songsDemo / totalSongs) * 100),
      colorClass: 'bg-amber-500',
      textClass: 'text-amber-400',
      borderClass: 'border-amber-500/30',
      bgClass: 'bg-amber-500/10',
      icon: <Music2 size={20} className="text-amber-400" />,
      description: "Ideas grabadas. Requieren trabajo grupal en sala."
    },
    {
      id: 'Idea',
      label: 'Banco de Ideas',
      count: songsIdea,
      percentage: Math.round((songsIdea / totalSongs) * 100),
      colorClass: 'bg-slate-500',
      textClass: 'text-slate-400',
      borderClass: 'border-slate-500/30',
      bgClass: 'bg-slate-500/10',
      icon: <FlaskConical size={20} className="text-slate-400" />,
      description: "Riffs, letras sueltas y conceptos iniciales."
    }
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-white">Hola, Equipo 👋</h2>
        <p className="text-slate-400">Aquí está el resumen del proyecto musical.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Próximo Evento</p>
              <h3 className="text-xl font-bold text-white mt-1">{nextEvent ? nextEvent.type : 'N/A'}</h3>
              <p className="text-xs text-indigo-400 mt-1">{nextEvent ? new Date(nextEvent.date).toLocaleDateString() : '-'}</p>
            </div>
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <CalIcon size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Repertorio Listo</p>
              <h3 className="text-xl font-bold text-white mt-1">{songsReady} Canciones</h3>
              <p className="text-xs text-emerald-400 mt-1">Listas para tocar</p>
            </div>
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <Star size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">En Desarrollo</p>
              <h3 className="text-xl font-bold text-white mt-1">{songsPolishing} Canciones</h3>
              <p className="text-xs text-amber-400 mt-1">Necesitan ensayo</p>
            </div>
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
              <Activity size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">Próximo Show</p>
              <h3 className="text-xl font-bold text-white mt-1">En 7 días</h3>
              <p className="text-xs text-purple-400 mt-1">Bar Rock</p>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <Mic2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Production Pipeline and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Production Pipeline */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Flujo de Producción</h3>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total: {songs.length} Temas</span>
          </div>
          
          <div className="space-y-5">
            {pipelineStages.map((stage) => (
              <div key={stage.id} className="group">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stage.bgClass}`}>
                      {stage.icon}
                    </div>
                    <div>
                      <h4 className="text-slate-200 font-medium">{stage.label}</h4>
                      <p className="text-xs text-slate-500">{stage.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-bold ${stage.textClass}`}>{stage.count}</span>
                    <span className="text-slate-600 text-sm ml-1">/ {songs.length}</span>
                  </div>
                </div>
                
                {/* Progress Bar Container */}
                <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${stage.colorClass} relative`}
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-white/10 w-full animate-[shimmer_2s_infinite] transform -skew-x-12 translate-x-[-100%]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity / Goals */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Objetivos Actuales</h3>
          <ul className="space-y-4 flex-1 overflow-y-auto">
             <li className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="min-w-[8px] h-2 mt-2 rounded-full bg-indigo-500"></div>
                <span className="text-sm text-slate-300">Cerrar estructura de "Neon Lights" para el show.</span>
             </li>
             <li className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="min-w-[8px] h-2 mt-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-slate-300">Definir fecha de grabación de baterías.</span>
             </li>
             <li className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="min-w-[8px] h-2 mt-2 rounded-full bg-amber-500"></div>
                <span className="text-sm text-slate-300">Actualizar riders técnicos para el Bar Rock.</span>
             </li>
             <li className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="min-w-[8px] h-2 mt-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-slate-300">Comprar parches nuevos de batería.</span>
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;