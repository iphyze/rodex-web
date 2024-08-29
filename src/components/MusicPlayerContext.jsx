import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import PlayList from './Trending/PlaylistData';
import { localPlaylistSongs } from './Trending/LocalPlayListData';
import { rodexPlaylistSongs } from './Rodex/RodexPlayListData'; // Import other local playlists
import SongsPlaylist from './AllSongs/allSongsPlaylist';
import ArtistPlaylist from './Artist/artistSongsPlaylist';
import RodexPlaylist from './Rodex/rodexSongsPlaylist';
import { useArtistId } from './ArtistIdContext';
import CuratedSongPlaylist from './Home/CuratedSongPlaylist';
import GospelSongPlaylist from './Home/GospelSongPlaylist';
import PersonalSongPlaylist from './Home/PersonalSongPlaylist';


const MusicPlayerContext = createContext([{}, () => {}]);

export const MusicPlayerProvider = ({ children }) => {
  const { id, playlistId } = useArtistId();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const { playlistSongs: trendingSongs } = PlayList();
  const { allSongsPlaylist } = SongsPlaylist();
  const { curatedPlaylist } = CuratedSongPlaylist();
  const { allPersonalPlaylist } = PersonalSongPlaylist();
  const { gospelPlaylist } = GospelSongPlaylist();
  const { artistSongsPlaylist: singlePlaylistSongs } = ArtistPlaylist(id);
  const { rodexSongsPlaylist: singlePlaylistTracks } = RodexPlaylist(playlistId);
  const audioElement = useRef(new Audio()).current;
  const [songSource, setSongSource] = useState(localStorage.getItem('playlistName') || '');
  const [playlist, setPlaylist] = useState([]);
  const audioRef = useRef(audioElement);
  

  const rodexAppToken = localStorage.getItem('rodexAppToken');

  // Define your playlists
  const allPlaylists = {
    trending: { main: trendingSongs, local: localPlaylistSongs },
    rodex: { main: rodexPlaylistSongs, local: rodexPlaylistSongs },
    allsongs: { main: allSongsPlaylist, local: allSongsPlaylist },
    artistsingle: { main: singlePlaylistSongs, local: singlePlaylistSongs },
    rodexsingle: { main: singlePlaylistTracks, local: singlePlaylistTracks },
    curated: { main: curatedPlaylist, local: curatedPlaylist },
    personal: { main: allPersonalPlaylist, local: allPersonalPlaylist },
    gospel: { main: gospelPlaylist, local: gospelPlaylist },
  };

  // Function to get the correct playlist based on rodexAppToken
  const getPlaylist = (source) => {
    if (source && allPlaylists[source]) {
      return rodexAppToken ? allPlaylists[source].main : allPlaylists[source].local;
    }
    return [];
  };




  useEffect(() => {
    const storedSong = JSON.parse(localStorage.getItem('currentSong'));
    const storedIsPlaying = JSON.parse(localStorage.getItem('isPlaying'));
    const storedPlaylistName = localStorage.getItem('playlistName');
    const storedIsShuffle = JSON.parse(localStorage.getItem('isShuffle'));
    const storedIsRepeat = JSON.parse(localStorage.getItem('isRepeat'));

    if (storedSong && storedIsPlaying !== null) {
      setCurrentSong(storedSong);
      setIsPlaying(storedIsPlaying);
      audioElement.src = storedSong.url;
      if (storedIsPlaying) audioElement.play();
    }

    if (storedPlaylistName) {
      setSongSource(storedPlaylistName);
      setPlaylist(getPlaylist(storedPlaylistName));
    }

    if (storedIsShuffle !== null) {
      setIsShuffle(storedIsShuffle);
    }

    if (storedIsRepeat !== null) {
      setIsRepeat(storedIsRepeat);
    }
  }, [audioElement, id]);

  useEffect(() => {
    localStorage.setItem('currentSong', JSON.stringify(currentSong));
    localStorage.setItem('isPlaying', JSON.stringify(isPlaying));
    localStorage.setItem('playlistName', songSource);
    localStorage.setItem('isShuffle', JSON.stringify(isShuffle));
    localStorage.setItem('isRepeat', JSON.stringify(isRepeat));

    if (songSource) {
      setPlaylist(getPlaylist(songSource));
    }

    if (currentSong) audioElement.src = currentSong.url;
  }, [currentSong, isPlaying, songSource, audioElement, rodexAppToken, isShuffle, isRepeat]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    //console.log(curatedPlaylist);
  }, [isPlaying, audioRef]);

  useEffect(() => {
    const handleSongEnd = () => {
      if (isRepeat) {
        audioElement.currentTime = 0;
        audioElement.play().catch(error => {
          console.error("Failed to play audio:", error);
        });
      } else if (isShuffle) {
        playNextSong(true);
      } else {
        playNextSong();
      }
    };

    audioElement.addEventListener('ended', handleSongEnd);
    return () => {
      audioElement.removeEventListener('ended', handleSongEnd);
    };
  }, [isRepeat, isShuffle, audioElement, playlist, currentSong]);

  const playSong = (song, source) => {
    setSongSource(source);
    if (currentSong && currentSong._id === song._id) {
      togglePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const pauseSong = () => {
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(prevState => {
      const newState = !prevState;
      localStorage.setItem('isShuffle', JSON.stringify(newState));
      return newState;
    });
  };

  const toggleRepeat = () => {
    setIsRepeat(prevState => {
      const newState = !prevState;
      localStorage.setItem('isRepeat', JSON.stringify(newState));
      return newState;
    });
  };

  const playNextSong = (shuffle = false) => {
    if (!playlist || playlist.length === 0) {
      console.error("The playlist is not defined or is empty");
      return;
    }

    const currentSongIndex = playlist.findIndex(song => song?._id === currentSong?._id);

    if (currentSongIndex === -1) {
      console.error("The current song is not in the playlist");
      return;
    }

    let nextSongIndex;
    if (shuffle || isShuffle) {
      do {
        nextSongIndex = Math.floor(Math.random() * playlist.length);
      } while (nextSongIndex === currentSongIndex);
    } else {
      nextSongIndex = (currentSongIndex + 1) % playlist.length;
    }

    const nextSong = playlist[nextSongIndex];

    setCurrentSong(nextSong);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    if (!playlist || playlist.length === 0) {
      console.error("The playlist is not defined or is empty");
      return;
    }

    const currentSongIndex = playlist.findIndex(song => song?._id === currentSong?._id);

    if (currentSongIndex === -1) {
      console.error("The current song is not in the playlist");
      return;
    }

    let prevSongIndex;
    if (isShuffle) {
      do {
        prevSongIndex = Math.floor(Math.random() * playlist.length);
      } while (prevSongIndex === currentSongIndex);
    } else {
      prevSongIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    }

    const prevSong = playlist[prevSongIndex];

    setCurrentSong(prevSong);
    setIsPlaying(true);
  };


  // const playNextSong = (shuffle = false) => {
  //   if (!playlist || playlist.length === 0) {
  //     console.error("The playlist is not defined or is empty");
  //     return;
  //   }
  
  //   const currentSongIndex = playlist.findIndex(song => song?._id === currentSong?._id);
  
  //   if (currentSongIndex === -1) {
  //     console.error("The current song is not in the playlist");
  //     return;
  //   }
  
  //   let nextSongIndex;
  //   if (shuffle || isShuffle) {
  //     do {
  //       nextSongIndex = Math.floor(Math.random() * playlist.length);
  //     } while (nextSongIndex === currentSongIndex);
  //   } else {
  //     nextSongIndex = (currentSongIndex + 1) % playlist.length;
  //   }
  
  //   const nextSong = playlist[nextSongIndex];
  
  //   if (isRepeat) {
  //     audioElement.currentTime = 0;
  //     audioElement.play().catch(error => {
  //       console.error("Failed to play audio:", error);
  //     });
  //   } else {
  //     setCurrentSong(nextSong);
  //     setIsPlaying(true);
  //   }
  // };
  
  // const playPreviousSong = () => {
  //   if (!playlist || playlist.length === 0) {
  //     console.error("The playlist is not defined or is empty");
  //     return;
  //   }
  
  //   const currentSongIndex = playlist.findIndex(song => song?._id === currentSong?._id);
  
  //   if (currentSongIndex === -1) {
  //     console.error("The current song is not in the playlist");
  //     return;
  //   }
  
  //   let prevSongIndex;
  //   if (isShuffle) {
  //     do {
  //       prevSongIndex = Math.floor(Math.random() * playlist.length);
  //     } while (prevSongIndex === currentSongIndex);
  //   } else {
  //     prevSongIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
  //   }
  
  //   const prevSong = playlist[prevSongIndex];
  
  //   if (isRepeat) {
  //     audioElement.currentTime = 0;
  //     audioElement.play().catch(error => {
  //       console.error("Failed to play audio:", error);
  //     });
  //   } else {
  //     setCurrentSong(prevSong);
  //     setIsPlaying(true);
  //   }
  // };



  const value = {
    audioElement,
    currentSong,
    isPlaying,
    playSong,
    pauseSong,
    togglePlayPause,
    setIsPlaying,
    setCurrentSong,
    playlist,
    setPlaylist,
    songSource,
    setSongSource,
    audioRef,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    playNextSong,
    playPreviousSong
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }

  return context;
};
