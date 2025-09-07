import React, { Suspense, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Song type definition
interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  duration: string;
}

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
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load songs from localStorage on component mount
  useEffect(() => {
    const savedSongs = localStorage.getItem('musicLibrarySongs');
    if (savedSongs) {
      try {
        setSongs(JSON.parse(savedSongs));
      } catch (error) {
        console.error('Error loading songs from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save songs to localStorage whenever songs change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('musicLibrarySongs', JSON.stringify(songs));
    }
  }, [songs, isLoading]);

  const handleAddSong = (newSong: Omit<Song, 'id'>) => {
    const song: Song = {
      ...newSong,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    setSongs(prevSongs => [...prevSongs, song]);
    
    // Show success message
    const event = new CustomEvent('showNotification', {
      detail: {
        message: `Song "${song.title}" added successfully!`,
        type: 'success'
      }
    });
    window.dispatchEvent(event);
  };

  const handleDeleteSong = (songId: string) => {
    const songToDelete = songs.find(song => song.id === songId);
    
    setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
    
    // Show success message
    if (songToDelete) {
      const event = new CustomEvent('showNotification', {
        detail: {
          message: `Song "${songToDelete.title}" deleted successfully!`,
          type: 'success'
        }
      });
      window.dispatchEvent(event);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-96 p-4">
          <div className="text-center max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="spinner mx-auto mb-6"></div>
            <h3 className="text-gray-800 text-xl font-semibold mb-2">Loading Music Library</h3>
            <p className="text-gray-600 mb-4">Connecting to micro frontend...</p>
          </div>
        </div>
      }
    >
      <RemoteMusicLibrary 
        isAdmin={isAdmin}
        songs={songs}
        onAddSong={handleAddSong}
        onDeleteSong={handleDeleteSong}
      />
    </Suspense>
  );
};

export default MusicLibraryWrapper; 