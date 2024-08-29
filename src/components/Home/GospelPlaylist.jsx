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


const GospelPlaylist = () => {
const rodexAppToken = localStorage.getItem('rodexAppToken');
const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongSource, togglePlayPause, pauseSong } = useMusicPlayer();
const [songs, setSongs] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [mixer, setMixer] = useState();
const [isError, setIsError] = useState(false);
const [activeSong, setActiveSong] = useActiveSong();


useEffect(() => {
    setIsLoading(true); // Set loading to true before starting the request

    axios.get('https://rodex-server.vercel.app/api/music/getAllPlaylists', {headers: {Authorization: `Bearer ${rodexAppToken}`}})
        .then(response => {

            const adminUser = response.data.find(user => user._id === '6659bea62bbc40c218c7fcca');

            if (adminUser) {
                const GospelPlaylist = adminUser.playlists.find(playlist => playlist.title === 'Gospel');

                if (GospelPlaylist) {

                    const validTracks = GospelPlaylist.tracks.filter(track => track && track._id);
                    setSongs(validTracks);
                }
            }

            setIsLoading(false); // Set loading to false when the request is successful
            setIsError(false);
        })
        .catch(err => {
            console.log(err);
            setIsError('Failed to load music. Please check your network and try again later.');
            setIsLoading(false); // Also set loading to false if an error occurred
        });

}, []);



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
      setSongSource('gospel');
    }
  };



  useEffect(() => {
    if (isPlaying) {
      setActiveSong(currentSong);
    } else {
      setActiveSong(null);
    }
  }, [isPlaying, currentSong]);  


  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };


  return (
    <div className='curated-playlistBox'>
        <div className='curated-playlist-header'>Gospel Playlist</div>
        <NavLink to="/playlist" className='curated-playlist-sellall'>See All</NavLink>
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
                      spaceBetween: 10
                    },
                  }}
                navigation={{
                    prevEl: '.gospel-swiper-button-next',
                    nextEl: '.gospel-swiper-button-prev',
                }}
                modules={[Navigation, Autoplay]}
            >


                {isLoading ?

                    <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                    <span className='fas fa-spinner fa-spin'></span>
                    </motion.div>
                    :

                isError ? (
                <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '12px'}} variants={fadeInUp} initial="hidden" animate="show">
                {isError}
                </motion.div>
                ) : (

                songs.map((tracks, index) => {

                const {_id, title, artist, image, genre, duration, url} = tracks;
                const isActiveSong = tracks?._id === activeSong?._id;

                return(

              <SwiperSlide className='curated-swiper-slide' key={_id}>
                <div className='curated-simage-box'>
                    <img src={image} alt="curated-image" className='curated-simg'/>
                    <div className='curated-play-buttonbox' onClick={() => handleSongClick(tracks)}>
                        <span className={`fas ${isActiveSong ? 'fa-pause' : 'fa-play'} curated-play-btn`}></span>
                    </div>
                    <div className='rodexmix-shadow'></div>
                </div>
                <div className='curated-sartist-name'>{truncateText(artist, 20)}</div>
                <div className='curated-ssong-title'>{truncateText(title, 20)}</div>
                <div className='curated-sduration'>{duration}</div>
              </SwiperSlide>   
                    )
                })
            )         
        }   
            </Swiper>
            <div className="gospel-swiper-button-next fas fa-angle-left"></div>
            <div className="gospel-swiper-button-prev fas fa-angle-right"></div>
        </div>
    </div>
  )
}

export default GospelPlaylist;
