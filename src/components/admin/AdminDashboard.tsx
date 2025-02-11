import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Home, Users, Video, Calendar, Settings, LogOut } from 'lucide-react';
import ContentEditor from './ContentEditor';
import PodcastManager from './PodcastManager';
import ClientManager from './ClientManager';
import SettingsPanel from './SettingsPanel';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1a0000]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 backdrop-blur-sm min-h-screen p-4">
          <div className="mb-8">
            <img 
              src="https://i.postimg.cc/N0GQ5wL4/continuewhite.png"
              alt="Kontinue Creations Logo"
              className="w-20 h-auto mx-auto mb-4"
            />
            <h2 className="text-white text-center font-semibold">Admin Dashboard</h2>
          </div>
          
          <nav className="space-y-2">
            <Link to="/admin/dashboard" className="flex items-center text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded transition-colors">
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link to="/admin/dashboard/clients" className="flex items-center text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded transition-colors">
              <Users className="w-5 h-5 mr-3" />
              Clients
            </Link>
            <Link to="/admin/dashboard/podcasts" className="flex items-center text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded transition-colors">
              <Video className="w-5 h-5 mr-3" />
              Podcasts
            </Link>
            <Link to="/admin/dashboard/upcoming" className="flex items-center text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded transition-colors">
              <Calendar className="w-5 h-5 mr-3" />
              Upcoming
            </Link>
            <Link to="/admin/dashboard/settings" className="flex items-center text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </nav>

          <button
            onClick={handleSignOut}
            className="flex items-center text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded transition-colors mt-8 w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<ContentEditor />} />
            <Route path="/clients" element={<ClientManager />} />
            <Route path="/podcasts" element={<PodcastManager />} />
            <Route path="/upcoming" element={<ContentEditor />} />
            <Route path="/settings" element={<SettingsPanel />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;