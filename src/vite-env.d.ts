/// <reference types="vite/client" />

declare module 'musicLibrary/MusicLibrary' {
  import { ComponentType } from 'react';
  
  interface MusicLibraryProps {
    isAdmin?: boolean;
    onAddSong?: (song: any) => void;
    onDeleteSong?: (id: string) => void;
  }
  
  const MusicLibrary: ComponentType<MusicLibraryProps>;
  export default MusicLibrary;
}
