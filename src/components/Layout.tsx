import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Music, LogOut, User, Crown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Music className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Music Library</h1>
                  <p className="text-sm text-gray-500">Your personal collection</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-3 border border-blue-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${isAdmin ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    {isAdmin ? (
                      <Crown className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <User className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-800">
                      {user?.username}
                    </span>
                    <span className={`block text-xs font-medium ${
                      isAdmin 
                        ? 'text-yellow-600' 
                        : 'text-blue-600'
                    }`}>
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-all duration-200 px-4 py-3 rounded-2xl hover:bg-red-50 hover:shadow-sm group"
                title="Sign out"
              >
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
