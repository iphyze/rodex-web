import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useMusicPlayer } from '../MusicPlayerContext';
import { Link, NavLink } from 'react-router-dom';

const ArtistSearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSongLoading, setIsSongLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  const rodexAppToken = localStorage.getItem('rodexAppToken');

  const fetchResults = async () => {
    setIsSongLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://rodex-server.vercel.app/api/artist/getArtists', {
        headers: { Authorization: `Bearer ${rodexAppToken}` },
      });

      setAllResults(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSongLoading(false);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

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
      const filteredResults = allResults.filter(
        (track) =>
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
        setSearchTerm('');
        setSearchResults([]);
        setInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to close search result field when NavLink is clicked
  const handleNavLinkClick = () => {
    setSearchTerm('');
    setSearchResults([]);
    setInputFocused(false);
  };

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
      {error && <div className="search-results search-results-two">{error}</div>}
      {searchTerm && searchResults.length === 0 && !isSongLoading && (
        <div className="search-results search-results-two">No results found</div>
      )}
      {searchResults.length > 0 && (
        <div className="search-results search-results-two" ref={searchRef}>
          {searchResults.map((track, index) => (
            <NavLink
              to={`/artist/${track._id}`}
              key={track._id}
              className="search-link-box"
              onClick={handleNavLinkClick} // Call function to close search result field when NavLink is clicked
            >
              <div className="search-link-number">{index + 1}</div>
              <img className="search-link-img" src={track.image} alt="track-img" />
              <div className="search-link-title">{track.artist}</div>
            </NavLink>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default ArtistSearchContainer;
