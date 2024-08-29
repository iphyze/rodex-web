import React, { useEffect, useState } from 'react';
import CuratedSearchContainer from './CuratedSearchContainer';
import Album_Image from '../../assets/images/music-placeholder.webp';
import Playlist_Image from '../../assets/images/playlist-img.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMusicPlayer } from '../MusicPlayerContext';
import { useActiveSong } from '../ActiveSongContext';
import { usePlaylist } from '../Home/PlaylistContext';
import PersonalSongPlaylist from '../Home/PersonalSongPlaylist';


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

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const PersonalPlaylistSongs = () => {
  const { personalId } = useParams();
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSong, setActiveSong] = useActiveSong();
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongSource, togglePlayPause, pauseSong } = useMusicPlayer();
  const [isError, setIsError] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [displayedSongs, setDisplayedSongs] = useState([]);
  const {allPersonalSongPlaylist} = PersonalSongPlaylist(personalId);
  const [playlistName, setPlaylistsName] = useState();
  const [playlistData, setPlaylistsData] = useState();
  const { setPersonalPlaylistTitle, setPersonalPlaylistId } = usePlaylist();
  const userId = localStorage.getItem('userAdminId');

  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://rodex-server.vercel.app/api/music/getAllPlaylists', {
          headers: { Authorization: `Bearer ${rodexAppToken}` },
        });

        const personalUser = response.data.find(user => user.role === 'user' && user.userId === userId);

        if (personalUser) {
          
        const personalPlaylist = personalUser.playlists.find(playlist => playlist.title === personalId);

          if (personalPlaylist) {

            const playlistNamer = personalPlaylist.title;
            const personalTracks = personalPlaylist.tracks.reverse();

            setAllSongs(personalTracks);
            setPlaylistsName(playlistNamer);
            setDisplayedSongs(personalTracks.slice(0, 10));
            setPlaylistsData(personalPlaylist);

          } else {
            setDisplayedSongs([]); // Or handle the case where no playlist matches the personalId
          }
          setIsError(false);
        }
      } catch (error) {
        setIsError('Failed to load music. Please check your network and try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [rodexAppToken, personalId, userId]);



  // Function to check if currentSong is in the playlist
  const isSongInPlaylist = () => {
    return allSongs.some(song => song._id === currentSong?._id);
  };

  // Determine if actively playing based on currentSong in playlist
  const ActivelyPlaying = isPlaying && isSongInPlaylist();

  const handleSongClick = (song) => {

    setPersonalPlaylistTitle(playlistName);
    setPersonalPlaylistId(playlistData?._id);


    if (currentSong && currentSong?._id === song?._id) {
      togglePlayPause();
    } else {
      if (isPlaying) {
        pauseSong();
      }
      setCurrentSong(song);
      setIsPlaying(true);
      setSongSource('personal');
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
      const newSongs = allSongs.slice(0, nextBatch * 10);
      setDisplayedSongs(newSongs);
      setCurrentBatch(nextBatch);
      setLoadingMore(false);
    }, 1000); // Simulate loading delay
  }; 


  return (
    <React.Fragment>
      <div className="home-container home-container-image" style={{backgroundImage: `url(${ActivelyPlaying ? activeSong?.image : Playlist_Image})`, backgroundSize: 'cover'}}>
        <div className="home-container-image-overlay">
          <div className="home-container-col lg-home-container">
            {/* <div className="page-title">Curated Playlist</div> */}

            {/* <CuratedSearchContainer /> */}

            <div className="home-welcome-box wow fadeIn rodex-hw" data-wow-duration='0.8s'>    
              <div className="album-cover">
                <div className="album-cover-imgbox">
                  <img src={ActivelyPlaying ? activeSong?.image : Playlist_Image} alt="album-img" className="album-cimg"/>    
                </div>
                <div className="album-cover-textbox">
                  <div className="album-cover-artist">{playlistData?.title} Playlist</div>    
                  <div className="album-cover-description">{ActivelyPlaying ? activeSong?.artist : 'Artist Name'}</div>    
                  <div className="album-cover-title">{ActivelyPlaying ? activeSong?.genre : 'Song Genre'}</div>    
                </div>
              </div>    
            </div> 
            <div className="playlist-songs-header">
              <div className="playlist-number">#</div>
              <div className="playlist-title">Title</div>    
              <div className="playlist-time hide-time">Time</div>    
              <div className="playlist-action">Action</div>        
            </div> 
            {isLoading ?
              <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                <span className='fas fa-spinner fa-spin'></span>
              </motion.div> :
              (isError) ? (
                <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '12px'}} variants={fadeInUp} initial="hidden" animate="show">
                  {isError}
                </motion.div>
              ) : (
                displayedSongs.length === 0 ? (
                  <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                    No songs available for this artist.
                  </motion.div>
                ) : (
                    displayedSongs.map((song, index) => {
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
                          <div className={`fas fa-plus-circle action-icons playlist-btn ${isActiveSong ? 'active-ps-text' : ''}`}></div>
                        </div>
                        <div className={`fas ${isActiveSong ? 'fa-pause' : 'fa-play'} playlist-play-btn ${isActiveSong ? 'active-pbtn-text' : ''}`} onClick={() => handleSongClick(song, )}></div>
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

              {displayedSongs.length > 0 && displayedSongs.length < allSongs.length && (
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

export default PersonalPlaylistSongs;
