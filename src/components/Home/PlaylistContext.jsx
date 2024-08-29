// PlaylistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const PlaylistContext = createContext();

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlistTitle, setPlaylistTitle] = useState(() => JSON.parse(localStorage.getItem('playlistTitle')) || '');
  const [cplaylistId, setcPlaylistId] = useState(() => JSON.parse(localStorage.getItem('playlistId')) || '');

  const [personalPlaylistTitle, setPersonalPlaylistTitle] = useState(() => JSON.parse(localStorage.getItem('personalPlaylistTitle')) || '');
  const [personalPlaylistId, setPersonalPlaylistId] = useState(() => JSON.parse(localStorage.getItem('personalPlaylistId')) || '');

  useEffect(() => {
    localStorage.setItem('playlistTitle', JSON.stringify(playlistTitle));
    localStorage.setItem('playlistId', JSON.stringify(cplaylistId));
    localStorage.setItem('personalPlaylistTitle', JSON.stringify(personalPlaylistTitle));
    localStorage.setItem('personalPlaylistId', JSON.stringify(personalPlaylistId));
  }, [playlistTitle, cplaylistId, personalPlaylistTitle, personalPlaylistId, 
    setPersonalPlaylistTitle, setPersonalPlaylistId, setPlaylistTitle, setcPlaylistId]);

  return (
    <PlaylistContext.Provider value={{ 
      playlistTitle, setPlaylistTitle, cplaylistId, setcPlaylistId,
      personalPlaylistTitle, setPersonalPlaylistTitle, personalPlaylistId, setPersonalPlaylistId
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};
