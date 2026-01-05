import React from 'react';
import { LayoutDashboard, Calendar, Users, Music, Bot, Settings, Menu, X, LogOut } from 'lucide-react';
import { APP_NAME } from '../constants';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, toggleSidebar, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'calendar', label: 'Cronograma', icon: <Calendar size={20} /> },
    { id: 'members', label: 'Integrantes', icon: <Users size={20} /> },
    { id: 'songs', label: 'Repertorio', icon: <Music size={20} /> },
    { id: 'ai-manager', label: 'AI Manager', icon: <Bot size={20} />, special: true },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-800 z-50 transition-transform duration-300 w-64 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="p-6 flex items-center justify-between flex-shrink-0">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {APP_NAME}
          </h1>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-2 px-4 space-y-2 flex-grow overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${currentView === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                ${item.special ? 'border border-indigo-500/30' : ''}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {item.special && <span className="ml-auto text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">New</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-4">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-400 mb-2">Próximo Ensayo</p>
            <p className="text-sm font-semibold text-white">Mañana, 19:00hs</p>
            <p className="text-xs text-indigo-400 truncate">Estudio A</p>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-colors border-t border-slate-800/50"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;