import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useMusicPlayer } from '../MusicPlayerContext';
import SongsPlaylist from '../AllSongs/allSongsPlaylist';
import PlayList from '../Trending/PlaylistData';
import { useActiveSong } from '../ActiveSongContext';
import { useArtistId } from '../ArtistIdContext';

const HomeSearchFormContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSongLoading, setIsSongLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [error, setError] = useState(null);
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongSource, togglePlayPause, pauseSong } = useMusicPlayer();
  const searchRef = useRef(null);
  const { playlistId, setPlaylistId } = useArtistId();

  const rodexAppToken = localStorage.getItem('rodexAppToken');

  const fetchResults = async () => {
    setIsSongLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://rodex-server.vercel.app/api/music/rodexmix', {
        headers: { Authorization: `Bearer ${rodexAppToken}` },
      });

      const mainPlaylist = response.data.find(playlist => playlist._id === playlistId);
    
        const playlistData = mainPlaylist.tracks.map(song => ({
            _id: song._id,
            songId: song._id,
            title: song.title,
            artist: song.artist,
            genre: song.genre,
            duration: song.duration,
            image: song.image,
            url: song.url
        }));

      setAllResults(playlistData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSongLoading(false);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

  const handleSongClick = (track) => {
    if (currentSong && currentSong?._id === track?._id) {
      togglePlayPause();
    } else {
      if (isPlaying) {
        pauseSong();
      }
  
      setCurrentSong(track);
      setIsPlaying(true);
      setSongSource('allsongs');
    }
    clearSearch(); // Clear search when a song is clicked
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setInputFocused(false);
  };

  useEffect(() => {
    debouncedFetchResults();
  }, [debouncedFetchResults]);

  useEffect(() => {
    if (searchTerm) {
      const filteredResults = allResults.filter((track) =>
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        track.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allResults]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        clearSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <React.Fragment>
      <form className="search-form-wrapper" onSubmit={(e) => e.preventDefault()} method="post">
        <div className="search-form-group wow fadeInDown" data-wow-delay=".5s" ref={searchRef}>
          <input
            type="text"
            placeholder="Search for songs"
            required
            className="sf-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setInputFocused(true)}
          />
        </div>
      </form>

      {inputFocused && isSongLoading && <span className="fas fa-spinner fa-spin"></span>}
      {error && <div className="search-results search-result-four">{error}</div>}
      {searchTerm && searchResults.length === 0 && !isSongLoading && (
        <div className="search-results search-result-four">No results found</div>
      )}
      {searchResults.length > 0 && (
        <div className="search-results search-result-four" ref={searchRef}>
          {searchResults.map((track, index) => (
            <div key={track._id} className='search-link-box' onClick={() => handleSongClick(track)}>
              <div className='search-link-number'>{index + 1}</div>
              <img className='search-link-img' src={track.image} alt="track-img"/>
              <div className='search-link-title'>{track.title} <span className='search-link-separator'>-</span> <span className='search-link-artist'>{truncateText(track.artist, 15)}</span></div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default HomeSearchFormContainer;
