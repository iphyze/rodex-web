import React, { useEffect, useState } from 'react';
import RodexSearchContainer from './RodexSearchContainer';
import Album_Image from '../../assets/images/music-placeholder.webp';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMusicPlayer } from '../MusicPlayerContext';
import { useActiveSong } from '../ActiveSongContext';
import RodexPlaylist from './rodexSongsPlaylist';
import { useArtistId } from '../ArtistIdContext';
import NewFeature from '../NewFeature';

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

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const RodexPlaylistSongs = ({handlePlaylistAdd, showPlaylistAdd, setShowMusicPlayer}) => {
  const { playlistId } = useParams();
  const { setPlaylistId } = useArtistId(); // Get the setter function from the context
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const [artist, setArtist] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeSong, setActiveSong] = useActiveSong();
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongSource, togglePlayPause, pauseSong } = useMusicPlayer();
  const { rodexSongsPlaylist: songs, isRodexPlaylistSongLoading, isRodexError: songsError } = RodexPlaylist(playlistId);
  const [isError, setIsError] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://rodex-server.vercel.app/api/music/rodexmix/`, { headers: { Authorization: `Bearer ${rodexAppToken}` } })
      .then(response => {
        const mainPlaylist = response.data.find(playlist => playlist._id === playlistId);
        setArtist(mainPlaylist);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [playlistId, rodexAppToken]);

  useEffect(() => {
    if (playlistId) {
      setPlaylistId(playlistId); // Set the artistId in the context
    }
  }, [playlistId, setPlaylistId]);

  useEffect(() => {
    if (songs && !isRodexPlaylistSongLoading) {
      setFilteredSongs(songs.slice(0, 10));
    }
  }, [songs, isRodexPlaylistSongLoading]);

  const handleSongClick = (song) => {
    if (currentSong && currentSong?._id === song?._id) {
      togglePlayPause();
    } else {
      if (isPlaying) {
        pauseSong();
      }
      setCurrentSong(song);
      setIsPlaying(true);
      setSongSource('rodexsingle');
    }
  };

  useEffect(() => {
    if (isPlaying) {
      setActiveSong(currentSong);
    } else {
      setActiveSong();
    }
  }, [isPlaying, currentSong]);



  const loadMoreSongs = () => {
    setLoadingMore(true);
    setTimeout(() => {
    const nextBatch = currentBatch + 1;
    const newSongs = songs.slice(0, nextBatch * 10);
    setFilteredSongs(newSongs);
    setCurrentBatch(nextBatch);
    setLoadingMore(false);
    }, 1000); // Simulate loading delay
  };

  return (
    <React.Fragment>
      <div className="home-container home-container-image" style={{backgroundImage: `url(${activeSong?.image})`, backgroundSize: 'cover'}}>
        <div className="home-container-image-overlay">
          <div className="home-container-col lg-home-container">
            <div className="page-title">Rodex Mix</div>

            <RodexSearchContainer />

            <div className="home-welcome-box wow fadeIn rodex-hw" data-wow-duration='0.8s'>    
              <div className="album-cover">
                <div className="album-cover-imgbox">
                  <img src={activeSong?.image || Album_Image} alt="album-img" className="album-cimg"/>    
                </div>
                <div className="album-cover-textbox">
                  <div className="album-cover-artist">{activeSong?.title}</div>    
                  <div className="album-cover-description">{artist.name}</div>    
                  <div className="album-cover-title">{artist.__v}</div>    
                </div>
              </div>    
            </div> 
            <div className="playlist-songs-header">
              <div className="playlist-number">#</div>
              <div className="playlist-title">Title</div>    
              <div className="playlist-time hide-time">Time</div>    
              <div className="playlist-action">Action</div>        
            </div> 
            {isLoading || isRodexPlaylistSongLoading ?
              <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                <span className='fas fa-spinner fa-spin'></span>
              </motion.div> :
              (isError || songsError) ? (
                <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '12px'}} variants={fadeInUp} initial="hidden" animate="show">
                  {isError || songsError}
                </motion.div>
              ) : (
                filteredSongs.length === 0 ? (
                  <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                    No songs available for this artist.
                  </motion.div>
                ) : (
                    filteredSongs.map((song, index) => {
                    const isActiveSong = song?._id === activeSong?._id;
                    return (
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
                          <div className={`fas fa-plus-circle action-icons playlist-btn ${isActiveSong ? 'active-ps-text' : ''}`} onClick={handlePlaylistAdd}></div>
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
                    )
                  })
                )
              )
            }

              {filteredSongs.length > 0 && filteredSongs.length < songs.length && (
                <motion.div style={{ textAlign: 'center', marginTop: '20px' }} variants={fadeInUp} initial="hidden" animate="show" onClick={loadMoreSongs} className="load-more-btn">
                  Load More
                </motion.div>
              )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RodexPlaylistSongs;
