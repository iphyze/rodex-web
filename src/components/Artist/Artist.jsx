import React, { useEffect, useState } from 'react';
import SearchFormContainer from '../SearchFormContainer';
import AdekunleGold from '../../assets/images/adekunle-gold.jpg';
import TU_FACE from '../../assets/images/tu-face.jpg';
import Nice from '../../assets/images/9ice.jpg';
import Asake from '../../assets/images/asake.jpg';
import Beyonce from '../../assets/images/beyonce.jpg';
import BurnaBoy from '../../assets/images/burna-boy.jpg';
import Ayra from '../../assets/images/ayra.jpg';
import Chandler from '../../assets/images/chandler.jpg';
import Davido from '../../assets/images/davido.jpg';
import Dare from '../../assets/images/dare.jpg';
import Chike from '../../assets/images/chike.jpeg';
import Falz from '../../assets/images/falz.jpg';
import fireboyImage from '../../assets/images/fireboy.jpg';
import joeboyImage from '../../assets/images/joeboy.jpg';
import ChrisBrown from '../../assets/images/chris-brown.png';
import Yemi from '../../assets/images/yemi-alade.jpeg';
import mosesBlissImage from '../../assets/images/moses-bliss.jpg';
import johnImage from '../../assets/images/john.jpg';
import wandeCoalImage from '../../assets/images/wande-coal.jpg';
import lilKeshImage from '../../assets/images/lil-kesh.jpg';
import nathImage from '../../assets/images/nath.jpg';
import wizkidImage from '../../assets/images/wizkid.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import ArtistSearchContainer from './ArtistSearchContainer';

const ArtistGenre = [
  {
    id: 1,
    bgImg: Chandler,
    filterGenre: 'All Genres',
  },
  {
    id: 2,
    bgImg: AdekunleGold,
    filterGenre: 'Afrosounds',
  },
  {
    id: 3,
    bgImg: Nice,
    filterGenre: 'Gospel',
  },
  {
    id: 4,
    bgImg: Asake,
    filterGenre: 'HipHop',
  },
  {
    id: 5,
    bgImg: joeboyImage,
    filterGenre: 'Latins',
  },
  {
    id: 6,
    bgImg: johnImage,
    filterGenre: 'Jazz/Blues',
  },
  {
    id: 7,
    bgImg: fireboyImage,
    filterGenre: 'Carribean',
  },
  {
    id: 8,
    bgImg: Falz,
    filterGenre: 'Pop',
  },
  {
    id: 9,
    bgImg: Ayra,
    filterGenre: 'R&B',
  },
  {
    id: 10,
    bgImg: Davido,
    filterGenre: 'Electronic',
  },
  {
    id: 11,
    bgImg: Dare,
    filterGenre: 'Rock',
  },
  {
    id: 12,
    bgImg: Beyonce,
    filterGenre: 'Country',
  },
  {
    id: 13,
    bgImg: Chike,
    filterGenre: 'Instrumental',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const Artist = () => {
  const [activeGenre, setActiveGenre] = useState('All Genres');
  const genres = [
    'All Genres',
    'Afrosounds',
    'Gospel',
    'HipHop',
    'Latin',
    'Jazz/Blues',
    'Carribean',
    'Pop',
    'R&B',
    'Electronic',
    'Rock',
    'Country',
    'Instrumental',
  ];
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState([]);
  const [filteredArtistSongs, setFilteredArtistSongs] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setIsLoading(true); // set loading to true before starting the request
  
    let sortedArtist = [];
  
    axios
      .get('https://rodex-server.vercel.app/api/artist/getArtists', {
        headers: { Authorization: `Bearer ${rodexAppToken}` },
      })
      .then((response) => {
        // Sort the artists by name
        sortedArtist = response.data.sort((a, b) =>
          a.artist.localeCompare(b.artist)
        );
        setArtist(sortedArtist);
  
        // Fetch all songs
        return axios.get('https://rodex-server.vercel.app/api/music/tracks/admin', {
          headers: { Authorization: `Bearer ${rodexAppToken}` },
        });
      })
      .then((response) => {
        const allSongs = response.data;
  
        // Match songs with their respective artists and calculate totalSize
        const artistsWithSongs = sortedArtist.map((artist) => {
          const artistSongs = allSongs.filter(
            (song) => song.artist === artist.artist
          );
  
          // Calculate the total duration for the artist
          const totalDuration = artistSongs.reduce((acc, curr) => {
            const duration = curr.duration;
            if (typeof duration === 'string') {
              const bytes = convertDurationToBytes(duration);
              return acc + bytes;
            }
            return acc;
          }, 0);
  
          // Convert total duration to size
          const totalSize = convertSize(totalDuration);
  
          return { ...artist, songs: artistSongs, totalSize };
        });
  
        setArtist(artistsWithSongs);
        setFilteredArtistSongs(artistsWithSongs.slice(0, 12));
        setIsLoading(false); // set loading to false when the request is successful
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // also set loading to false if an error occurred
      });
  }, [rodexAppToken]);
  

  function convertDurationToBytes(duration) {
    const parts = duration.split(':').map((part) => parseInt(part, 10));
    let totalSeconds = 0;

    if (parts.length === 2) {
      totalSeconds = parts[0] * 60 + parts[1]; // MM:SS format
    } else if (parts.length === 3) {
      totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS format
    }

    // Assuming 128 kbps bitrate
    const bytesPerSecond = 16000; // 128,000 bits per second / 8 bits per byte
    const totalBytes = totalSeconds * bytesPerSecond;

    return totalBytes;
  }

  function convertSize(sizeInBytes) {
    if (!sizeInBytes || isNaN(sizeInBytes)) return '0 B';

    let size = sizeInBytes;
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    // Format the size to remove trailing zeros
    return `${parseFloat(size.toFixed(2))} ${units[unitIndex]}`;
  }

  function filterArtistSongs(title) {
    const filteredArtist = artist.filter(
      (song) => title === 'All Genres' || song.title === title
    );
    setActiveGenre(title);
    setFilteredArtistSongs(filteredArtist.slice(0, 12));
    setCurrentBatch(1);

    if (filteredArtist.length === 0) {
      document.getElementById('no-artist-message').style.display = 'block';
    } else {
      document.getElementById('no-artist-message').style.display = 'none';
    }
  }

  const loadMoreArtists = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = currentBatch + 1;
      const newArtists = artist.slice(0, nextBatch * 12);
      setFilteredArtistSongs(newArtists);
      setCurrentBatch(nextBatch);
      setLoadingMore(false);
    }, 1000); // Simulate loading delay
  };
  


  

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <React.Fragment>
      <div className="home-container home-container-image">
        <div className="home-container-image-overlay">
          <div className="home-container-col lg-home-container">
            <div className="page-title">Artist</div>

            <ArtistSearchContainer />

            <div className="artist-swiper-container">
              <Swiper
                modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                slidesPerView={5}
                spaceBetween={30}
                navigation={{
                  prevEl: '.artist-swiper-button-prev',
                  nextEl: '.artist-swiper-button-next',
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                className="swiper-container"
                aria-live="polite"
              >
                {ArtistGenre.map((artGenre, key) => {
                  const { bgImg, filterGenre } = artGenre;
                  return (
                    <SwiperSlide
                      className="swiper-slide artistic--swiper"
                      key={key}
                      style={{ backgroundImage: `url(${bgImg})` }}
                      onClick={() => {
                        filterArtistSongs(filterGenre);
                      }}
                      role="button"
                      aria-label={`Filter by ${filterGenre}`}
                    >
                      <div className="artist-swiper-overlay">{filterGenre}</div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Add Arrows */}
              <div
                className="artist-swiper-button-next"
                role="button"
                aria-label="Next slide"
              >
                <div className="fas fa-angle-right art-swiper-icon"></div>
              </div>
              <div
                className="artist-swiper-button-prev"
                role="button"
                aria-label="Previous slide"
              >
                <div className="fas fa-angle-left art-swiper-icon"></div>
              </div>
            </div>

            <div className="artist-flexbox">
              <div className="artist-flexbox-genre">{activeGenre}</div>

              {isLoading ? (
                <motion.div
                  id="no-songs-message"
                  style={{ textAlign: 'center', fontSize: '18px' }}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="show"
                  aria-live="polite"
                >
                  <span className="fas fa-spinner fa-spin"></span>
                </motion.div>
              ) : (
                filteredArtistSongs.map((artistData, index) => {
                  const { _id, image, title, artist, totalSize } = artistData;

                  return (
                    <motion.div
                      key={_id}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="show"
                      className="artist-wrapper"
                    >
                      <NavLink
                        to={`/artist/${_id}`}
                        className="main-artist-wrapper"
                        data-menu-id="artist"
                        data-genre={title}
                      >
                        <div className="artist-imgbox">
                          <img
                            src={image}
                            alt={`${artist} image`}
                            className="artist--img"
                          />
                          <div className='rodexmix-shadow'></div>
                        </div>
                        <div className="artists-songsizebox">
                          <div className="artis-ico-flex">
                            <div className="fas fa-headphones artists--icon"></div>
                            <div className="artists--songsize">{totalSize}</div>
                          </div>
                          <div className="artists-name">
                            {truncateText(artist, 10)}
                          </div>
                        </div>
                      </NavLink>
                    </motion.div>
                  );
                })
              )}
            </div>

            {loadingMore && (
              <motion.div style={{ textAlign: 'center', fontSize: '18px' }} variants={fadeInUp} initial="hidden" animate="show">
                <span className="fas fa-spinner fa-spin"></span>
              </motion.div>
            )}
            {filteredArtistSongs.length > 0 && filteredArtistSongs.length < artist.length && (
              <motion.div style={{ textAlign: 'center', marginTop: '20px' }} variants={fadeInUp} initial="hidden" animate="show" onClick={loadMoreArtists} className="load-more-btn">
                Load More
              </motion.div>
            )}

            <div id="no-artist-message" style={{ display: 'none' }}>
              There are no songs found for the selected genre!
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Artist;