import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import SearchFormContainer from '../SearchFormContainer';
import Pexel_Img from '../../assets/images/pexel-img.jpg';
import Playlist_Img from '../../assets/images/playlist-img.jpg';

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

const Playlist = () => {

  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const userId = localStorage.getItem('userAdminId');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allAdminPlaylists, setAllAdminPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [adminPlaylistTitles, setAdminPlaylistTitles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [isPersonalLoading, setIsPersonalLoading] = useState(false);
  const [isPersonalError, setIsPersonalError] = useState(false);
  const [allPersonalPlaylists, setAllPersonalPlaylists] = useState([]);
  const [personalFilteredPlaylists, setPersonalFilteredPlaylists] = useState([]);
  const [personalSelectedFilter, setPersonalSelectedFilter] = useState('All');
  const [personalPlaylistTitles, setPersonalPlaylistTitles] = useState([]);
  

  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://rodex-server.vercel.app/api/music/getAllPlaylists', {
          headers: { Authorization: `Bearer ${rodexAppToken}` },
        });

        const adminUser = response.data.find(user => user.role === 'admin');
        if (adminUser) {
          
          // const curatedPlaylist = adminUser.playlists.find(playlist => playlist._id === curatedId);
          
          const curatedPlaylist = adminUser.playlists;
          setAllAdminPlaylists(curatedPlaylist);
          setFilteredPlaylists(curatedPlaylist);
          setAdminPlaylistTitles(['All', ...curatedPlaylist.map(playlist => playlist.title)]);

          // if (curatedPlaylist) {
          //   const curatedTracks = curatedPlaylist.tracks.reverse();
          // }

        }
      } catch (error) {
        setIsError('Failed to load music. Please check your network and try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [rodexAppToken]);



  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredPlaylists(allAdminPlaylists);
    } else {
      setFilteredPlaylists(allAdminPlaylists.filter(playlist => playlist.title.includes(selectedFilter)));
    }
  }, [selectedFilter, allAdminPlaylists]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };



  useEffect(() => {
    const fetchPersonalPlaylists = async () => {
      setIsPersonalLoading(true);
      try {
        const response = await axios.get('https://rodex-server.vercel.app/api/music/getAllPlaylists', {
          headers: { Authorization: `Bearer ${rodexAppToken}` },
        });

        const personalUser = response.data.find(user => user.role === 'user' && user.userId === userId);
        if (personalUser) {
          
          // const curatedPlaylist = adminUser.playlists.find(playlist => playlist._id === curatedId);
          
          const personalPlaylist = personalUser.playlists;
          setAllPersonalPlaylists(personalPlaylist);
          setPersonalFilteredPlaylists(personalPlaylist);
          setPersonalPlaylistTitles(['All', ...personalPlaylist.map(playlist => playlist.title)]);

          //console.log(personalPlaylist)

          // if (curatedPlaylist) {
          //   const curatedTracks = curatedPlaylist.tracks.reverse();
          // }

        }
      } catch (error) {
        setIsPersonalError('Failed to load music. Please check your network and try again later.');
      } finally {
        setIsPersonalLoading(false);
      }
    };

    fetchPersonalPlaylists();
  }, [rodexAppToken]);




  useEffect(() => {
    if (personalSelectedFilter === 'All') {
      setPersonalFilteredPlaylists(allPersonalPlaylists);
    } else {
      setPersonalFilteredPlaylists(allPersonalPlaylists.filter(playlist => playlist.title.includes(personalSelectedFilter)));
    }
  }, [personalSelectedFilter, allPersonalPlaylists]);

  const handlePersonalFilterChange = (filter) => {
    setPersonalSelectedFilter(filter);
  };




  return (
    <React.Fragment>    
      <div className="home-container home-container-image" style={{backgroundImage: `url(${Playlist_Img})`, backgroundSize: 'cover'}}>
        <div className="home-container-image-overlay home-container-image-overlay-3">
          <div className="home-container-col lg-home-container">
            <div className="page-title">Playlist</div>
            
            {/* <div className='main-playlist-box-wrapper'></div> */}  

            <div className='main-playlist-flexbox-container'>

            <div className='main-made'>Playlists made for you</div>

            {filteredPlaylists.length === 0 ? 
            <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
              There are currently no playlists
            </motion.div>

            :

            <>

              {/* Filter Box */}
            <div className="genre-flexbox">
              {adminPlaylistTitles.map((filter) => (
                <a 
                  key={filter} 
                  className={`genre-btn ${selectedFilter === filter ? 'active-genre' : ''}`} 
                  onClick={() => handleFilterChange(filter)}
                  role="tab"
                  aria-selected={selectedFilter === filter}
                  aria-controls={`panel-${filter}`}
                  id={`tab-${filter}`}
                >
                  {filter}
                </a>
              ))}
            </div>

              {isLoading ?
              
              <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                <span className='fas fa-spinner fa-spin'></span>
              </motion.div>
              
              : isError ?

              <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '12px'}} variants={fadeInUp} initial="hidden" animate="show">
                  {isError}
              </motion.div>
              :

              filteredPlaylists.map((adminPlaylists) => {
                const {_id, title} = adminPlaylists;

                return(
                  <motion.div className='main-p-box' variants={fadeInUp} initial="hidden" animate="show" key={_id}>
                    <NavLink className='main-p-box-inner' to={`/playlist/${_id}`}>
                      <div className="main-p-box-effect-2"></div>
                      <div className="main-p-box-effect-1"></div>
                      <div className='main-p-box-img-box'>
                        <img src={Playlist_Img} alt='mainpb-img' className='mainpb-img'/>
                      </div>
                      <div className='main-pname'>{title} Playlist</div>
                      <div className='main-picon fas fa-microphone'></div>
                    </NavLink>
                  </motion.div>

                )

              })}

              </>
              }
            </div>


            <div className='main-playlist-flexbox-container'>


              <div className='main-made'>Personal Playlists</div>

              {personalFilteredPlaylists.length === 0 ?

                <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                There are currently no playlists
                </motion.div>

              :
              
              <>

              <div className="genre-flexbox">
              {personalPlaylistTitles.map((filter, index) => (
                <a 
                  key={index} 
                  className={`genre-btn ${personalSelectedFilter === filter ? 'active-genre' : ''}`} 
                  onClick={() => handlePersonalFilterChange(filter)}
                  role="tab"
                  aria-selected={personalSelectedFilter === filter}
                  aria-controls={`panel-${index}`}
                  id={`tab-${index}`}
                >
                  {filter}
                </a>
              ))}
              </div>  

              {isPersonalLoading ?
              
              <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '18px'}} variants={fadeInUp} initial="hidden" animate="show">
                <span className='fas fa-spinner fa-spin'></span>
              </motion.div>
              
              : isPersonalError ?

              <motion.div id="no-songs-message" style={{textAlign: 'center', fontSize: '12px'}} variants={fadeInUp} initial="hidden" animate="show">
                  {isPersonalError}
              </motion.div>
              :

              personalFilteredPlaylists.map((personalPlaylists) => {
                const {_id, title} = personalPlaylists;

                return(
                  <motion.div className='main-p-box' variants={fadeInUp} initial="hidden" animate="show" key={_id}>
                    <NavLink className='main-p-box-inner' to={`/playlist/userplaylist/${title}`}>
                      <div className="main-p-box-effect-2"></div>
                      <div className="main-p-box-effect-1"></div>
                      <div className='main-p-box-img-box'>
                        <img src={Playlist_Img} alt='mainpb-img' className='mainpb-img'/>
                      </div>
                      <div className='main-pname'>{title} Playlist</div>
                      <div className='main-picon fas fa-microphone'></div>
                    </NavLink>
                  </motion.div>

                )



              })}

                </>
              }

            </div>


          </div>
        </div>
      </div>    
    </React.Fragment>        
  )
}

export default Playlist;