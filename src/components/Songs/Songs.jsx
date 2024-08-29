import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchFormContainer from '../SearchFormContainer';
import Album_Image from '../../assets/images/music-placeholder.webp';
import { motion } from 'framer-motion';
import { useActiveSong } from '../ActiveSongContext';
import { useMusicPlayer } from '../MusicPlayerContext';
import {rodexPlaylistSongs, fadeInUp, fadeIn, fadeInRight, fadeInUpTwo} from './RodexPlayListData';


const Songs = () => {


  const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongSource, togglePlayPause, pauseSong } = useMusicPlayer();
  const [activeSong, setActiveSong] = useActiveSong();
  const [filteredSongs, setFilteredSongs] = useState(rodexPlaylistSongs);
  const [songLength, setSongLength] = useState(null);

  const handleSongClick = (song) => {
    if (currentSong && currentSong?._id === song?._id) {
      // Toggle play/pause for the same song
      togglePlayPause();
    } else {
      if (isPlaying) {
        // Pause the currently playing song if any
        pauseSong();
      }
  
      // Set the new song and play it
      setCurrentSong(song);
      setIsPlaying(true);
      setSongSource('rodex');
    }
  };


  useEffect(() => {
    if (isPlaying) {
      setActiveSong(currentSong);
    }else{
      setActiveSong();
    }
  }, [isPlaying, currentSong]);



  const [activeGenre, setActiveGenre] = useState('All Genres');
  const genres = ['All Genres', 'Afrosounds', 'Gospel', 'HipHop', 'Latin', 'Jazz/Blues', 'Carribean', 'Pop', 'R&B', 'Electronic', 'Rock', 'Country', 'Instrumental'];


  function filterSongs(genre) {
    const filtered = rodexPlaylistSongs.filter(song => genre === "All Genres" || song.genre === genre);
    setActiveGenre(genre);
    setFilteredSongs(filtered);

    if (filtered.length === 0) {
      document.getElementById("no-trend-message").style.display = "block";
    } else {
        document.getElementById("no-trend-message").style.display = "none";
    }

  }


  return (

    <React.Fragment>    
        <div className="home-container home-container-image">
        <div className="home-container-image-overlay">
            <div className="home-container-col lg-home-container">
                
            <div className="page-title">Search Results</div>   
                
            <SearchFormContainer />    
                
            <div className="home-welcome-box wow fadeIn rodex-hw" data-wow-duration='0.8s'>    
            
            <div className="album-cover">
                
            <div className="album-cover-imgbox">
            <img src={activeSong ? activeSong?.image : Album_Image} alt="album-img" className="album-cimg"/>    
            </div>
                
            <div className="album-cover-textbox">
            
            <div className="album-cover-artist">{activeSong ? activeSong?.title : 'Now Playing'}</div>    
            <div className="album-cover-description">{activeSong ? activeSong?.description : 'Brief Description'}</div>    
            <div className="album-cover-title">{activeSong ? activeSong?.artist : 'Artist'}</div>    
                
            </div>
                
            </div>    
                
                
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
                
                
            {filteredSongs.map(song => {

              const isActiveSong = song?._id === activeSong?._id;

              return(
                <motion.div 
                  key={song?._id}
                  className={`playlist-songs-flexbox ${isActiveSong ? 'active-playlist-songs' : ''}`}
                  role="button"
                  aria-label={`Select ${song.title} by ${song.artist}`}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="show"
                >
                  <div className={`playlist-number ${isActiveSong ? 'active-ps-text' : ''}`}>{song.songId}</div>
                  <div className="playlist-title">
                    <div className="playlist-imagebox">
                      <img src={song.image} className="playlist-img" alt={`Cover of ${song.title} by ${song.artist}`} />
                    </div>
                    <div className="playlist-songs-wrapper">
                      <div className={`playlist-name-data ${isActiveSong ? 'active-ps-text' : ''}`}>
                        <div className={`playlist-stitle ${isActiveSong ? 'active-ps-text' : ''}`}>{song.title}</div> 
                        <span className={`track-separator ${isActiveSong ? 'active-ps-text' : ''}`}> - </span> 
                        <div className={`playlist-aname ${isActiveSong ? 'active-ps-text' : ''}`}>{song.artist}</div>
                      </div>
                      <div className={`playlist-genre ${isActiveSong ? 'active-playlist-genre' : ''}`}>{song.genre}</div>
                      <div className='playlist-description'>{song.description}</div>
                    </div>
                  </div>
                  <div className={`playlist-time hide-time ${isActiveSong ? 'active-ps-text' : ''}`}>{song.time}</div>
                  <div className="playlist-action">
                    <div className={`fas fa-share-alt action-icons share-btn ${isActiveSong ? 'active-ps-text' : ''}`}></div>
                    <div className={`fas fa-heart action-icons favorite-btn ${isActiveSong ? 'active-ps-text' : ''}`}></div>
                    <div className={`fas fa-plus-circle action-icons playlist-btn ${isActiveSong ? 'active-ps-text' : ''}`}></div>
                  </div>
                  <div className={`fas ${isActiveSong ? 'fa-pause' : 'fa-play'} playlist-play-btn ${isActiveSong ? 'active-pbtn-text' : ''}`} onClick={() => handleSongClick(song)}></div>
                  <audio id={`audio_${song?._id}`} controls className="audioSong" onLoadedMetadata={(event) => {setSongLength(event.target.duration)}}>
                    <source src={song.audioSong} type="audio/mp3"/>
                  </audio>
                </motion.div>
              )
              })}
                
                
                
                <motion.div 
                id="no-trend-message" style={{display: 'none'}}
                variants={fadeInUp}
                initial="hidden"
                animate="show"
                >There are no songs found for the selected genre!
                </motion.div>
                              
            </div>
            


          </div>
  
        </div>    
    </React.Fragment>        
    
  )
}

export default Songs;