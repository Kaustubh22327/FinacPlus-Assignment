export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  duration: string;
}

export type SortField = 'title' | 'artist' | 'album' | 'year';
export type GroupByField = 'album' | 'artist' | 'genre';
export type SortOrder = 'asc' | 'desc';
