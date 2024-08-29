import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext';
import Music_Girl from '../../assets/images/music-girl-2.png';
import HomeSpotLight from '../HomeSpotLight';
import MainSong from '../../assets/audio/faded.mp3';
import { motion } from 'framer-motion';
import SearchFormContainer from '../SearchFormContainer';
import { NavLink } from 'react-router-dom';
import { useMusicPlayer } from '../MusicPlayerContext';
import PlayList from './PlaylistData';
import { localPlaylistSongs } from './LocalPlayListData';
import { useActiveSong } from '../ActiveSongContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8
    },
  }
};

const fadeIn = {
  hidden: { opacity: 0, x: 50 },
  show: { 
    opacity: 1,
    x: 0, 
    transition: {
      delay: 1,
      duration: 0.8,
    },
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: '50px' },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 1,
    } 
  },
};

const fadeInUpTwo = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay: 1,
    } 
  }
};

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const Trending = () => {
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongSource, togglePlayPause, pauseSong } = useMusicPlayer();
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const [activeSong, setActiveSong] = useActiveSong();
  const { playlistSongs, isLoading, isError } = PlayList();
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [songLengths, setSongLengths] = useState({});
  const [allSongs, setAllSongs] = useState();
  const [isBuffering, setIsBuffering] = useState(false);
  const [songLoadingState, setSongLoadingState] = useState({});
  const [currentBatch, setCurrentBatch] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (rodexAppToken) {
      setAllSongs(playlistSongs);
    } else {
      setAllSongs(localPlaylistSongs);
    }

    if (allSongs && !isLoading) {
      setFilteredSongs(allSongs.slice(0, 10));
    }
  }, [allSongs, rodexAppToken, playlistSongs]);

  const handleSongClick = (song) => {
    if (currentSong && currentSong?._id === song?._id) {
      togglePlayPause();
    } else {
      if (isPlaying) {
        pauseSong();
      }
      setCurrentSong(song);
      setIsPlaying(true);
      setSongSource('trending');
    }
  };

  useEffect(() => {
    const audioElement = document.getElementById(`audio_${currentSong?._id}`);
    if (audioElement) {
      const handleWaiting = () => setIsBuffering(true);
      const handlePlaying = () => setIsBuffering(false);

      audioElement.addEventListener('waiting', handleWaiting);
      audioElement.addEventListener('playing', handlePlaying);

      return () => {
        audioElement.removeEventListener('waiting', handleWaiting);
        audioElement.removeEventListener('playing', handlePlaying);
      };
    }
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      setActiveSong(currentSong);
    } else {
      setActiveSong();
    }
  }, [isPlaying, currentSong]);

  const [activeGenre, setActiveGenre] = useState('All Genres');
  const genres = ['All Genres', 'Afrosounds', 'Gospel', 'HipHop', 'Latin', 'Jazz/Blues', 'Carribean', 'Pop', 'R&B', 'Electronic', 'Rock', 'Country', 'Instrumental'];

  function filterSongs(genre) {
    const filtered = allSongs.filter(song => genre === "All Genres" || song.genre === genre);
    setActiveGenre(genre);
    setFilteredSongs(filtered.slice(0, 10));
    setCurrentBatch(1);

    if (filtered.length === 0) {
      document.getElementById("no-songs-message").style.display = "block";
    } else {
      document.getElementById("no-songs-message").style.display = "none";
    }
  }

  const loadMoreSongs = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = currentBatch + 1;
      const newSongs = allSongs.slice(0, nextBatch * 10);
      setFilteredSongs(newSongs);
      setCurrentBatch(nextBatch);
      setLoadingMore(false);
    }, 1000); // Simulate loading delay
  };

  return (
    <React.Fragment>
      <div className="home-container">
        <div className="home-container-col">
          <div className="home-welcome-box">
            <SearchFormContainer />
            <motion.div className="trending-box-container" variants={fadeInUp} initial="hidden" animate="show">
              <div className="trending-boxer-header wow fadeInDown">Trending Playlist</div>
              <div className="trending-boxer-text wow fadeInLeft">Hot Tracks!</div>
              <div className="trending-boxer-subtext wow fadeInLeft">
                Discover the hottest tracks igniting the airwaves! Stay ahead with our curated collection of trending songs, sure to keep your playlists fresh and your ears delighted.
              </div>
              <div className="trending-boxer-flex wow fadeInUp">
                <span className="fas fa-headphones tracks-icon"></span>
                <span className="number-of-tracks">20,000 Tracks</span>
              </div>
              <motion.img src={Music_Girl} alt="music-girl-2" className="trender-img" variants={fadeIn} />
            </motion.div>
          </div>
          <div className="genre-flexbox">
            {genres.map((genre, index) => (
              <a
                key={index}
                className={`genre-btn ${genre === activeGenre ? 'active-genre' : ''}`}
                onClick={() => {
                  filterSongs(genre);
                  setActiveGenre(genre);
                }}
              >
                {genre}
              </a>
            ))}
          </div>
          <div className="playlist-songs-header">
            <div className="playlist-number">#</div>
            <div className="playlist-title">Title</div>
            <div className="playlist-time hide-time">Time</div>
            <div className="playlist-action">Action</div>
          </div>
          {isLoading ? (
            <motion.div id="no-songs-message" style={{ textAlign: 'center', fontSize: '18px' }} variants={fadeInUp} initial="hidden" animate="show">
              <span className='fas fa-spinner fa-spin'></span>
            </motion.div>
          ) : isError && rodexAppToken ? (
            <motion.div id="no-songs-message" style={{ textAlign: 'center', fontSize: '12px' }} variants={fadeInUp} initial="hidden" animate="show">
              {isError}
            </motion.div>
          ) : (
            filteredSongs.map((song, index) => {
              const isActiveSong = song?._id === activeSong?._id;
              const isSongLoading = isLoading[song._id];

              return isSongLoading ? (
                <motion.div key={song._id} className='fas fa-spinner fa-spin' id="no-songs-message" style={{ textAlign: 'center', fontSize: '12px' }} variants={fadeInUp} initial="hidden" animate="show"></motion.div>
              ) : (
                <motion.div
                  key={song._id}
                  className={`playlist-songs-flexbox ${isActiveSong ? 'active-playlist-songs' : ''}`}
                  role="button"
                  aria-label={`Select ${song.title} by ${song.artist}`}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="show"
                >
                  <div className={`playlist-number ${isActiveSong ? 'active-ps-text' : ''}`}>{index + 1}</div>
                  <div className="playlist-title">
                    <div className="playlist-imagebox">
                      <img src={song.image} className="playlist-img" alt={`Cover of ${song.title} by ${song.artist}`} />
                    </div>
                    <div className="playlist-songs-wrapper">
                      <div className={`playlist-name-data ${isActiveSong ? 'active-ps-text' : ''}`}>
                        <div className={`playlist-stitle ${isActiveSong ? 'active-ps-text' : ''}`}>{truncateText(song.title, 15)}</div>
                        <span className={`track-separator ${isActiveSong ? 'active-ps-text' : ''}`}> - </span>
                        <div className={`playlist-aname ${isActiveSong ? 'active-ps-text' : ''}`}>{song.artist}</div>
                      </div>
                      <div className={`playlist-genre ${isActiveSong ? 'active-playlist-genre' : ''}`}>{song.genre}</div>
                    </div>
                  </div>
                  <div className={`playlist-time hide-time ${isActiveSong ? 'active-ps-text' : ''}`}>
                    {song.duration}
                  </div>
                  <div className="playlist-action">
                    <div className={`fas fa-share-alt action-icons share-btn ${isActiveSong ? 'active-ps-text' : ''}`}></div>
                    <div className={`fas fa-heart action-icons favorite-btn ${isActiveSong ? 'active-ps-text' : ''}`}></div>
                    <div className={`fas fa-plus-circle action-icons playlist-btn ${isActiveSong ? 'active-ps-text' : ''}`}></div>
                  </div>
                  <div className={`fas ${isActiveSong ? 'fa-pause' : 'fa-play'} playlist-play-btn ${isActiveSong ? 'active-pbtn-text' : ''}`} onClick={() => handleSongClick(song)}></div>
                  <audio id={`audio_${song._id}`} className="audioSong"></audio>
                  <audio id={`audio_${song._id}`} className="audioSong">
                    <source src={song.url} type="audio/mp3" />
                    <source src={currentSong?.url.replace('.mp3', '.ogg')} type="audio/ogg" />
                    <source src={currentSong?.url.replace('.mp3', '.wav')} type="audio/wav" />
                    <source src={currentSong?.url.replace('.mp3', '.aac')} type="audio/aac" />
                    <source src={currentSong?.url.replace('.mp3', '.flac')} type="audio/flac" />
                    <source src={currentSong?.url.replace('.mp3', '.m4a')} type="audio/m4a" />
                    <source src={currentSong?.url.replace('.mp3', '.mp3')} type="audio/mpeg" />
                    <source src={currentSong?.url.replace('.mp3', '.webm')} type="audio/webm" />
                    <source src={currentSong?.url.replace('.mp3', '.aiff')} type="audio/aiff" />
                    Your browser does not support the audio element.
                  </audio>
                </motion.div>
              );
            })
          )}
          {loadingMore && (
            <motion.div style={{ textAlign: 'center', fontSize: '18px' }} variants={fadeInUp} initial="hidden" animate="show">
              <span className='fas fa-spinner fa-spin'></span>
            </motion.div>
          )}
          {filteredSongs.length > 0 && filteredSongs.length < allSongs.length && (
            <motion.div style={{ textAlign: 'center', marginTop: '20px' }} variants={fadeInUp} initial="hidden" animate="show" onClick={loadMoreSongs} className="load-more-btn">
              Load More
            </motion.div>
          )}
          <motion.div id="no-songs-message" style={{ display: 'none' }} variants={fadeInUp} initial="hidden" animate="show">
            There are no songs found for the selected genre!
          </motion.div>
        </div>
        <div className="home-container-col hc-col hide-home-container-col">
          <motion.div className="trender-spot-box" variants={fadeInRight} initial="hidden" animate="visible">
            <div className="trender-unlock">Unlock Your Soundtrack</div>
            <div className="trender-unleash">
              Unleash endless melodies on-the-go! Dive into curated playlists, discover new tunes, and enjoy seamless listening anytime, anywhere with our cutting-edge music streaming app
            </div>
            <NavLink to="/download" className="trender-download">Download App</NavLink>
          </motion.div>
          <HomeSpotLight />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Trending;