
import React from 'react';
const ActiveSongContext = React.createContext();

function ActiveSongProvider({ children }) {
  const [activeSong, setActiveSong] = React.useState(null);

  return (
    <ActiveSongContext.Provider value={[activeSong, setActiveSong]}>
      {children}
    </ActiveSongContext.Provider>
  );
}

function useActiveSong() {
  const context = React.useContext(ActiveSongContext)
  if (context === undefined) {
    throw new Error('useActiveSong must be used within a ActiveSongProvider')
  }
  return context
}

export { ActiveSongProvider, useActiveSong }
