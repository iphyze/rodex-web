import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import AdekunleGold from '../../assets/images/adekunle-gold.jpg';
import Nice from '../../assets/images/9ice.jpg';
import Asake from '../../assets/images/asake.jpg';
import BurnaBoy from '../../assets/images/burna-boy.jpg';
import Ayra from '../../assets/images/ayra.jpg';
import Chandler from '../../assets/images/chandler.jpg';
import Chike from '../../assets/images/chike.jpeg';
import Falz from '../../assets/images/falz.jpg';
import fireboyImage from '../../assets/images/fireboy.jpg';
import joeboyImage from '../../assets/images/joeboy.jpg';
import mosesBlissImage from '../../assets/images/moses-bliss.jpg';
import johnImage from '../../assets/images/john.jpg';
import wandeCoalImage from '../../assets/images/wande-coal.jpg';
import lilKeshImage from '../../assets/images/lil-kesh.jpg';
import nathImage from '../../assets/images/nath.jpg';
import wizkidImage from '../../assets/images/wizkid.jpg';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useMusicPlayer } from '../MusicPlayerContext';
import { useActiveSong } from '../ActiveSongContext';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';


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

const SwiperCoverlowSlides = () => {
  const { theme } = useContext(ThemeContext);
  const [songs, setSongs] = useState([]);
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongSource, togglePlayPause, pauseSong } = useMusicPlayer();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const [activeSong, setActiveSong] = useActiveSong();



  useEffect(() => {
    setIsLoading(true);
  
    axios.get('https://rodex-server.vercel.app/api/music/tracks/admin', {
      headers: { Authorization: `Bearer ${rodexAppToken}` }
    })
    .then(response => {
      const data = response.data;
  
      // Sort the data by played_frequency in descending order
      const sortedData = data.sort((a, b) => b.played_frequency - a.played_frequency);
  
      // Get the top 10 songs
      const topSongs = sortedData.slice(0, 10);
  
      // Fetch artist data
      axios.get('https://rodex-server.vercel.app/api/artist/getArtists', {
        headers: { Authorization: `Bearer ${rodexAppToken}` },
      })
      .then(artistResponse => {
        const artistData = artistResponse.data;
        
        // Map through topSongs to find and add the corresponding artistId
        const topSongsWithArtistId = topSongs.map(song => {
          const artist = artistData.find(a => a.artist === song.artist);
          return {
            ...song,
            artistId: artist ? artist._id : null
          };
        });
  
        // Update the state with the sorted and sliced data
        setSongs(topSongsWithArtistId);
        setIsError(false);
      })
      .catch(err => {
        setIsError('Failed to load artist data. Please check your network and try again later.');
        setIsLoading(false);
      });
    })
    .catch(err => {
      setIsError('Failed to load music. Please check your network and try again later.');
      setIsLoading(false);
    })
    .finally(() => {
      setIsLoading(false);
    });
  
  }, [rodexAppToken]);  
    
    
      const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
      };


//console.log(songs);  



  return (
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={songs.length > 5}
        slidesPerView={4}
        spaceBetween={0}
        breakpoints={{
            768: {
                slidesPerView: 3,
            },
            320: {
              slidesPerView: 1.4,
            },
          }}
        coverflowEffect={
            {
                rotate: 5,
                stretch: 0,
                depth: 100,
                modifier: 3,
            }
        }
        pagination={{el:'.home-swiper-pagination', clickable: true}}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className='home-swiper-container'
      >

            {isLoading 
            
            ?

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

            const {_id, title, artist, image, genre, duration, url, artistId} = tracks;
            const isActiveSong = tracks?._id === activeSong?._id;

            return(

            <SwiperSlide className='main-swipe-box' style={{backgroundImage: `url(${image})`}} key={index + 1}>

            <NavLink to={`/artist/${artistId}`} className='swipe-trending-link'>

                <div className='swipe-trend-imgbox'>
                    <img src={image} alt="artist-img" className='swipe-trend-img'/>
                </div>  
                <div className='swipe-trend-textBox'>
                    <div className='swipe-trend-artistName'>{artist}</div>
                    <div className='swipe-trend-songTitle'>{title}</div>
                </div>

            </NavLink>
            </SwiperSlide>

                    )
                })
            )         
        }   
        <div className='home-swiper-pagination'></div>
      </Swiper>
  );
};

export default SwiperCoverlowSlides;
