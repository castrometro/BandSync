import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './features/dashboard/Dashboard';
import Schedule from './features/calendar/Schedule';
import Members from './features/members/Members';
import Songs from './features/songs/Songs';
import AIManager from './features/ai/AIManager';
import Login from './features/auth/Login';
import { MOCK_EVENTS, MOCK_MEMBERS, MOCK_SONGS } from './constants';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // In a real app, these would come from an API context
  const [events] = useState(MOCK_EVENTS);
  const [members] = useState(MOCK_MEMBERS);
  const [songs] = useState(MOCK_SONGS);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard'); // Reset view on logout
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard events={events} songs={songs} />;
      case 'calendar':
        return <Schedule events={events} />;
      case 'members':
        return <Members members={members} />;
      case 'songs':
        return <Songs songs={songs} />;
      case 'ai-manager':
        return <AIManager events={events} songs={songs} />;
      default:
        return <Dashboard events={events} songs={songs} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 bg-slate-900 border-b border-slate-800 z-10">
          <button onClick={toggleSidebar} className="text-slate-300 hover:text-white mr-4">
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg">BandSync</span>
        </div>

        <main className="flex-1 overflow-y-auto bg-slate-900 relative">
          <div className="max-w-7xl mx-auto min-h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;