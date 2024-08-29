import React, { useState, useEffect, useContext } from 'react';
import SwiperCoverlowSlides from './SwiperCoverflowSlides';
import CuratedPlaylist from './CuratedPlaylist';
import GospelPlaylist from './GospelPlaylist';
import HomeSearchFormContainer from '../HomeSearchFormContainer';

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

const LiveHome = () => {

  return (
    <div className="home-container">
        <HomeSearchFormContainer />
        <SwiperCoverlowSlides />
        <CuratedPlaylist />
        {/* <GospelPlaylist /> */}
    </div>
  );
};

export default LiveHome;
