import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './features/dashboard/Dashboard';
import Schedule from './features/calendar/Schedule';
import Members from './features/members/Members';
import Songs from './features/songs/Songs';
import AIManager from './features/ai/AIManager';
import Login from './features/auth/Login';
import { MOCK_EVENTS, MOCK_MEMBERS, MOCK_SONGS, MOCK_ALBUMS } from './constants';
import { Song, Album, CalendarEvent, Member } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data State
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [songs, setSongs] = useState<Song[]>(MOCK_SONGS);
  const [albums, setAlbums] = useState<Album[]>(MOCK_ALBUMS);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard'); // Reset view on logout
  };

  // Handlers
  const handleAddSong = (newSong: Song) => {
    setSongs(prevSongs => [...prevSongs, newSong]);
  };

  const handleUpdateSong = (updatedSong: Song) => {
    setSongs(prevSongs => prevSongs.map(s => s.id === updatedSong.id ? updatedSong : s));
  };

  const handleAddAlbum = (newAlbum: Album) => {
    setAlbums(prevAlbums => [...prevAlbums, newAlbum]);
  };

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const handleUpdateMember = (updatedMember: Member) => {
    setMembers(prevMembers => prevMembers.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard events={events} songs={songs} />;
      case 'calendar':
        return <Schedule events={events} onAddEvent={handleAddEvent} />;
      case 'members':
        return <Members members={members} onUpdateMember={handleUpdateMember} />;
      case 'songs':
        return (
          <Songs 
            songs={songs} 
            albums={albums} 
            onAddSong={handleAddSong} 
            onUpdateSong={handleUpdateSong}
            onAddAlbum={handleAddAlbum} 
          />
        );
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