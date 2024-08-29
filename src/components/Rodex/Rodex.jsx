import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import SearchFormContainer from '../SearchFormContainer';

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

const Rodex = () => {
  const [rodexMix, setRodexMix] = useState([]);
  const [filteredMix, setFilteredMix] = useState([]);
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const [activeMixList, setActiveMixList] = useState([]);
  const [activeMix, setActiveMix] = useState("All");
  const [currentBatch, setCurrentBatch] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios.get('https://rodex-server.vercel.app/api/music/rodexmix', {
      headers: { Authorization: `Bearer ${rodexAppToken}` }
    }).then(response => {
      const rodexData = response.data;
      const rodexMixData = rodexData.map(mix => mix.title);

      // Prepend "All" to the rodexMixData array
      const activeMixData = ["All", ...rodexMixData];

      setIsLoading(false);
      setRodexMix(rodexData);
      setFilteredMix(rodexData.slice(0, 10));  // Initially, show first 10 mixes
      setActiveMixList(activeMixData);
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
      setIsError('Failed to load data');
    });
  }, [rodexAppToken]);

  function filterMix(title) {
    setActiveMix(title);
    if (title === "All") {
      setFilteredMix(rodexMix.slice(0, 10));
    } else {
      const filtered = rodexMix.filter(mix => mix.title === title);
      setFilteredMix(filtered.slice(0, 10));
    }
    setCurrentBatch(1);

    if (filteredMix.length === 0) {
      document.getElementById("no-trend-message").style.display = "block";
    } else {
      document.getElementById("no-trend-message").style.display = "none";
    }
  }

  const loadMoreSongs = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = currentBatch + 1;
      const newMix = rodexMix.slice(0, nextBatch * 10);
      setFilteredMix(newMix);
      setCurrentBatch(nextBatch);
      setLoadingMore(false);
    }, 1000); // Simulate loading delay
  };

  return (
    <React.Fragment>    
      <div className="home-container home-container-image-two">
        <div className="home-container-image-overlay">
          <div className="home-container-col lg-home-container">

            {/* <SearchFormContainer /> */}

            <div className="page-title">Rodex Mix</div>   
            <div className="genre-flexbox" role="tablist">
              {activeMixList.map((title, index) => (
                <a
                  key={index}
                  className={`genre-btn ${title === activeMix ? 'active-genre' : ''}`}
                  onClick={() => filterMix(title)}
                  role="tab"
                  aria-selected={title === activeMix}
                  aria-controls={`panel-${index}`}
                  id={`tab-${index}`}
                >
                  {title}
                </a>
              ))}
            </div>    

            <div className='rodexmix-container' variants={containerVariants} initial="hidden" animate="show">
              {isLoading ? (
                <motion.div id="no-songs-message" style={{ textAlign: 'center', fontSize: '18px' }} variants={fadeInUp} initial="hidden" animate="show">
                  <span className='fas fa-spinner fa-spin' aria-hidden="true"></span>
                  <span className="sr-only">Loading...</span>
                </motion.div>
              ) : isError ? (
                <motion.div id="no-songs-message" style={{ textAlign: 'center', fontSize: '12px' }} variants={fadeInUp} initial="hidden" animate="show">
                  {isError}
                </motion.div>
              ) : (
                filteredMix.map((mixes, index) => {
                  const {_id, title, image, tracks} = mixes;
                  return (
                    <motion.div className='main-rodexmix-box' variants={fadeInUp} initial="hidden" animate="show" key={_id}>
                    <NavLink to={`/rodex/${_id}`} className='rodexmix-boxes'>
                      <div className='rodexmix-img-box'>
                        <img src={image} alt={`Cover of ${title}`} className='rodexmix-img'/>
                        <div className='rodexmix-shadow'></div>
                      </div>
                      <div className='rodexmixcontent-box'>
                        <div className='rodexmix-text-box'>
                          <div className='rodexmix-icon fas fa-microphone' aria-hidden="true"></div>
                          <div className='rodexmix-title'>{title}</div>
                        </div>
                        <div className='rodexmix-size'>{tracks.length} Mix</div> 
                      </div>
                    </NavLink>
                    </motion.div>
                  )
                })
              )}
            </div>
                
            {loadingMore && (
                <motion.div style={{ textAlign: 'center', fontSize: '18px' }} variants={fadeInUp} initial="hidden" animate="show">
                  <span className='fas fa-spinner fa-spin' aria-hidden="true"></span>
                  <span className="sr-only">Loading more...</span>
                </motion.div>
              )}
              {filteredMix.length > 0 && filteredMix.length < rodexMix.length && filteredMix.length % 10 === 0 && (
                <motion.div style={{ textAlign: 'center', marginTop: '20px' }} variants={fadeInUp} initial="hidden" animate="show" onClick={loadMoreSongs} className="load-more-btn" role="button" tabIndex="0">
                  Load More
                </motion.div>
              )}
              <motion.div id="no-songs-message" style={{ display: 'none' }} variants={fadeInUp} initial="hidden" animate="show">
                There are no songs found for the selected genre!
              </motion.div>
          </div>
        </div>
      </div>    
    </React.Fragment>        
  )
}

export default Rodex;