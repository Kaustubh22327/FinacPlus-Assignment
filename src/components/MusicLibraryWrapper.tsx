import React, { Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';

const RemoteMusicLibrary = React.lazy(() => 
  import('musicLibrary/MusicLibrary').catch(() => {
    // Fallback when remote is unavailable
    return { 
      default: () => (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Music Library Unavailable</h3>
          <p className="text-red-600 mb-4">The music library microfrontend is not running.</p>
          <div className="bg-red-100 p-4 rounded text-sm text-red-700">
            <p>To fix this:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Navigate to the music-library-mf directory</li>
              <li>Run: <code className="bg-red-200 px-1 rounded">pnpm dev</code></li>
              <li>Refresh this page</li>
            </ol>
          </div>
        </div>
      )
    };
  })
);

const MusicLibraryWrapper: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-96 p-4">
          <div className="text-center max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-6"></div>
            <h3 className="text-gray-800 text-xl font-semibold mb-2">Loading Music Library</h3>
            <p className="text-gray-600 mb-4">Connecting to micro frontend...</p>
          </div>
        </div>
      }
    >
      <RemoteMusicLibrary 
        isAdmin={isAdmin}
        onAddSong={(song: any) => {
          console.log('Adding song:', song);
        }}
        onDeleteSong={(id: string) => {
          console.log('Deleting song:', id);
        }}
      />
    </Suspense>
  );
};

export default MusicLibraryWrapper; 