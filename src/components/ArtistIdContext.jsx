import React, { createContext, useContext, useState, useEffect } from 'react';

const ArtistIdContext = createContext();

export const ArtistIdProvider = ({ children }) => {
  const [id, setId] = useState(localStorage.getItem('artistId') || '');
  const [playlistId, setPlaylistId] = useState(localStorage.getItem('playlistId') || '');
  const [personalId, setPersonalId] = useState(localStorage.getItem('personalId') || '');

  return (
    <ArtistIdContext.Provider value={{ id, setId, playlistId, setPlaylistId, personalId, setPersonalId }}>
      {children}
    </ArtistIdContext.Provider>
  );
};

export const useArtistId = () => {
  const context = useContext(ArtistIdContext);
  if (!context) {
    throw new Error('useArtistId must be used within an ArtistIdProvider');
  }
  return context;
};
