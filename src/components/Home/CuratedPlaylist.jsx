import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useMusicPlayer } from '../MusicPlayerContext';
import { useActiveSong } from '../ActiveSongContext';
import CuratedSongPlaylist from './CuratedSongPlaylist';
import { usePlaylist } from './PlaylistContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8
    } 
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: {
      delay: 1
    },
  }
};

const CuratedPlaylist = () => {
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongSource, togglePlayPause, pauseSong } = useMusicPlayer();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeSong, setActiveSong] = useActiveSong();
  const { playlistTitle, setPlaylistTitle, cplaylistId, setcPlaylistId } = usePlaylist();
  const {curatedPlaylist} = CuratedSongPlaylist();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://rodex-server.vercel.app/api/music/getAllPlaylists', {
          headers: { Authorization: `Bearer ${rodexAppToken}` },
        });

        const adminUser = response.data.find(user => user.role === 'admin');
        if (adminUser) {
          const adminPlaylists = adminUser.playlists.map(playlist => ({
            ...playlist,
            tracks: playlist.tracks.slice(-20).reverse(),
          }));
          setPlaylists(adminPlaylists);
          setIsError(false);
        }
      } catch (error) {
        setIsError('Failed to load music. Please check your network and try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [rodexAppToken]);


  const handleSongClick = (song, playlist) => {

    setPlaylistTitle(playlist.title);
    setcPlaylistId(playlist._id);
    // localStorage.setItem('playlistTitle', JSON.stringify(playlist.title));

    if (currentSong && currentSong?._id === song?._id) {
      togglePlayPause();
    } else {
      if (isPlaying) {
        pauseSong();
      }
      setCurrentSong(song);
      setIsPlaying(true);
      setSongSource('curated');
    }
  };

  

  useEffect(() => {
    if (isPlaying) {
      setActiveSong(currentSong);
    } else {
      setActiveSong();
    }
  }, [isPlaying, currentSong]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className='curated-playlistBox'>
      {playlists.map((playlist) => (
        <div key={playlist._id} className='playlist-section'>
          <div className='curated-playlist-header'>{playlist.title} Playlist</div>
          <NavLink to={`/playlist/${playlist._id}`} className='curated-playlist-sellall'>See All</NavLink>
          <div className='curated-playlist-flexbox'>
            <Swiper
              spaceBetween={40}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              slidesPerView={5}
              breakpoints={{
                768: {
                  slidesPerView: 5,
                  spaceBetween: 40
                },
                320: {
                  slidesPerView: 3,
                  spaceBetween: 0
                },
              }}
              navigation={{
                prevEl: '.curated-swiper-button-next',
                nextEl: '.curated-swiper-button-prev',
              }}
              modules={[Navigation, Autoplay]}
            >
              {isLoading ? (
                <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                  <span className='fas fa-spinner fa-spin'></span>
                </motion.div>
              ) : isError ? (
                <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '12px'}} variants={fadeInUp} initial="hidden" animate="show">
                  {isError}
                </motion.div>
              ) : (
                playlist.tracks.map((track) => {
                  const { _id, title, artist, image, genre, duration, url } = track;
                  const isActiveSong = track?._id === activeSong?._id;

                  return (
                    <SwiperSlide className='curated-swiper-slide' key={_id}>
                      <div className='curated-simage-box'>
                        <img src={image} alt="curated-image" className='curated-simg'/>
                        <div className='rodexmix-shadow'></div>
                      </div>
                      <div className='curated-sartist-name'>{truncateText(artist, 20)}</div>
                      <div className='curated-ssong-title'>{truncateText(title, 20)}</div>
                      <div className='curated-sduration'>{duration}</div>
                      <div className='curated-play-buttonbox' onClick={() => handleSongClick(track, playlist)}>
                        <span className={`fas ${isActiveSong ? 'fa-pause' : 'fa-play'} curated-play-btn`}></span>
                      </div>
                    </SwiperSlide>
                  );
                })
              )}
            </Swiper>
            <div className="curated-swiper-button-next fas fa-angle-left"></div>
            <div className="curated-swiper-button-prev fas fa-angle-right"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CuratedPlaylist;
