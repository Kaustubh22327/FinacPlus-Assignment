import React, { useState, useMemo } from 'react';
import { Song, SortField, GroupByField, SortOrder } from '../types';
import { mockSongs } from '../data/mockSongs';
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  Plus, 
  Trash2, 
  Music, 
  Clock,
  User,
  Disc
} from 'lucide-react';

interface MusicLibraryProps {
  isAdmin?: boolean;
  onAddSong?: (song: Omit<Song, 'id'>) => void;
  onDeleteSong?: (id: string) => void;
}

const MusicLibrary: React.FC<MusicLibraryProps> = ({ 
  isAdmin = false, 
  onAddSong, 
  onDeleteSong 
}) => {
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [groupBy, setGroupBy] = useState<GroupByField | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
    genre: '',
    duration: ''
  });

  const filteredSongs = useMemo(() => {
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [songs, searchTerm]);

  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredSongs, sortField, sortOrder]);

  const groupedSongs = useMemo(() => {
    if (!groupBy) return { 'All Songs': sortedSongs };
    
    return sortedSongs.reduce((groups, song) => {
      const key = song[groupBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(song);
      return groups;
    }, {} as Record<string, Song[]>);
  }, [sortedSongs, groupBy]);

  const stats = useMemo(() => {
    return songs.reduce((acc, song) => {
      acc.totalSongs++;
      acc.totalDuration += parseFloat(song.duration.replace(':', '.'));
      acc.genres[song.genre] = (acc.genres[song.genre] || 0) + 1;
      acc.artists[song.artist] = (acc.artists[song.artist] || 0) + 1;
      return acc;
    }, {
      totalSongs: 0,
      totalDuration: 0,
      genres: {} as Record<string, number>,
      artists: {} as Record<string, number>
    });
  }, [songs]);

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddSong) {
      onAddSong(newSong);
    } else {
      const song: Song = {
        ...newSong,
        id: Date.now().toString()
      };
      setSongs(prev => [...prev, song]);
    }
    setNewSong({
      title: '',
      artist: '',
      album: '',
      year: new Date().getFullYear(),
      genre: '',
      duration: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteSong = (id: string) => {
    if (onDeleteSong) {
      onDeleteSong(id);
    } else {
      setSongs(prev => prev.filter(song => song.id !== id));
    }
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-3xl shadow-lg p-8 border border-blue-50 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Music Library</h2>
            <p className="text-gray-600">Discover and manage your favorite music</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
              <span className="font-medium">Add Song</span>
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Music className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-700 mb-1">Total Songs</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalSongs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-indigo-700 mb-1">Total Duration</p>
                <p className="text-3xl font-bold text-indigo-900">
                  {Math.floor(stats.totalDuration / 60)}h {Math.round(stats.totalDuration % 60)}m
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl p-6 border border-sky-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Disc className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-sky-700 mb-1">Genres</p>
                <p className="text-3xl font-bold text-sky-900">
                  {Object.keys(stats.genres).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border border-cyan-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <User className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-cyan-700 mb-1">Artists</p>
                <p className="text-3xl font-bold text-cyan-900">
                  {Object.keys(stats.artists).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Song Form */}
      {showAddForm && (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-blue-50 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Add New Song</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleAddSong} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                placeholder="Enter song title"
                value={newSong.title}
                onChange={(e) => setNewSong(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Artist</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                placeholder="Enter artist name"
                value={newSong.artist}
                onChange={(e) => setNewSong(prev => ({ ...prev, artist: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Album</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                placeholder="Enter album name"
                value={newSong.album}
                onChange={(e) => setNewSong(prev => ({ ...prev, album: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
              <input
                type="number"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                placeholder="2024"
                value={newSong.year}
                onChange={(e) => setNewSong(prev => ({ ...prev, year: parseInt(e.target.value) }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Genre</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                placeholder="Enter genre"
                value={newSong.genre}
                onChange={(e) => setNewSong(prev => ({ ...prev, genre: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (mm:ss)</label>
              <input
                type="text"
                required
                pattern="\d+:\d{2}"
                placeholder="3:45"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                value={newSong.duration}
                onChange={(e) => setNewSong(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            
            <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Add Song
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white rounded-3xl shadow-lg p-8 border border-blue-50">
        <div className="space-y-6">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search songs, artists, albums, or genres..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sort Controls */}
            <div className="space-y-3">
              <span className="text-sm font-semibold text-gray-700">Sort by:</span>
              <div className="flex flex-wrap gap-3">
                {(['title', 'artist', 'album', 'year'] as SortField[]).map(field => (
                  <button
                    key={field}
                    onClick={() => toggleSort(field)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      sortField === field
                        ? 'bg-blue-100 text-blue-700 shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    <span className="capitalize">{field}</span>
                    {sortField === field && (
                      sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Group By */}
            <div className="space-y-3">
              <span className="text-sm font-semibold text-gray-700">Group by:</span>
              <select
                value={groupBy || ''}
                onChange={(e) => setGroupBy(e.target.value as GroupByField | null || null)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
              >
                <option value="">No grouping</option>
                <option value="album">Group by Album</option>
                <option value="artist">Group by Artist</option>
                <option value="genre">Group by Genre</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-6">
        {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
          <div key={groupName} className="bg-white rounded-3xl shadow-lg border border-blue-50 overflow-hidden">
            {groupBy && (
              <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <h3 className="text-xl font-bold text-gray-900">{groupName}</h3>
                <p className="text-sm text-blue-600 font-medium">{groupSongs.length} songs</p>
              </div>
            )}
            
            <div className="divide-y divide-blue-50">
              {groupSongs.map((song) => (
                <div key={song.id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-blue-25 hover:to-blue-50 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                            <Music className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors mb-1">
                            {song.title}
                          </h4>
                          <p className="text-base font-semibold text-gray-600 group-hover:text-gray-800 transition-colors mb-3">{song.artist}</p>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                              {song.album}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-xl text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                              {song.year}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-xl text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">
                              {song.genre}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-xl text-sm font-medium bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors">
                              <Clock className="h-4 w-4 mr-1" />
                              {song.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteSong(song.id)}
                        className="ml-6 p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-200 hover:scale-110 hover:shadow-lg group/delete"
                        title="Delete song"
                      >
                        <Trash2 className="h-6 w-6 group-hover/delete:scale-110 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(groupedSongs).length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-blue-50">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mb-8 animate-pulse-soft">
            <Music className="h-16 w-16 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No songs found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
            Try adjusting your search terms or filter criteria to find the music you're looking for.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-2xl hover:bg-blue-200 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Clear Search
            </button>
            <button
              onClick={() => setGroupBy(null)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicLibrary;