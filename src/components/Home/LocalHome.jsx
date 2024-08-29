import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import Phone_White from '../../assets/images/phone-white.png';
import Phone_Dark from '../../assets/images/phone-dark.png';
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
import HomeSpotLight from '../HomeSpotLight';
  
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



const LocalHome = ({onMusicClick}) => {

    const { theme } = useContext(ThemeContext);
    
    const Phone_Image = theme === 'light' ? Phone_Dark : Phone_White;



    const musicData = [
      {
        title: 'Sade',
        author: 'Adekunle Gold',
        imageSrc: AdekunleGold,
      },
      {
        title: 'Gongo Aso',
        author: '9ice',
        imageSrc: Nice,
      },
      {
        title: 'Trabaye',
        author: 'Asake',
        imageSrc: Asake,
      },
      {
        title: 'Burna Boy Ft Lad...',
        author: 'Glory',
        imageSrc: BurnaBoy,
      },
    ];
  
  
  
    const rodexMusic = [
      {
        title: 'Ayra Starr',
        author: 'Away',
        imageSrc: Ayra,
      },
      {
        title: 'Chandler Moore',
        author: 'New Horizon',
        imageSrc: Chandler,
      },
      {
        title: 'Chike',
        author: 'Tell',
        imageSrc: Chike,
      },
      {
        title: 'Falz',
        author: 'Pull',
        imageSrc: Falz,
      },
    ];
    
  
  
    const sidebarData = [
      {
        title: 'Glory',
        artist: 'Fire Boy',
        imageSrc: fireboyImage,
      },
      {
        title: 'Body and Soul',
        artist: 'Joeboy',
        imageSrc: joeboyImage,
      },
      {
        title: 'Daddy Wey Dey Pamper',
        artist: 'Moses Bliss',
        imageSrc: mosesBlissImage,
      },
    ];
  
  
  
    const rodexSidebarData = [
      {
        title: 'All of Me',
        artist: 'John Legend',
        imageSrc: johnImage,
      },
      {
        title: 'Come My Way',
        artist: 'Wande Coal',
        imageSrc: wandeCoalImage,
      },
      {
        title: 'Cause Trouble',
        artist: 'Lil Kesh Ft. Ycee',
        imageSrc: lilKeshImage,
      },
      {
        title: 'Imela',
        artist: 'Nathaniel Bassey',
        imageSrc: nathImage,
      },
      {
        title: 'Money and Love',
        artist: 'Wizkid',
        imageSrc: wizkidImage,
      },
    ]; 
    

  return (
    <div className="home-container">
    
    <div className="home-container-col">
        
    <motion.div className="home-welcome-box"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <motion.img src={Phone_Image} className="screen-img" 
    variants={fadeIn}/>    
        
    <div className="home-welcome-text">
        <div className="hwt-col-one">Rodex Music Platform</div>
        <div className="hwt-col-two">
            <span className="hwt-wraps">Explore Limitless Melodies</span>
            <span className="hwt-wraps">Concert halls tailored for you</span>
            <span className="hwt-wraps">Enjoy Music Without Boundaries</span>
            <span className="hwt-wraps">Create Personalized Playlist</span>
            <span className="hwt-wraps">Enjoy Curated Experience</span>
        </div>  
    </div>    
    
    <div className="home-welc-txt">Dive into a world of stories through curated genres, harmonous beats, where every beat matters. Personalized playlists that evolve with <span className="home-welc-txt-span">your taste, your concert hall, your curated experience.</span></div>    
        
    <NavLink to="/download" className="download-btn">Download App <span className="fab fa-google-play download-icon"></span> <span className="fab fa-apple download-icon"></span> 
    </NavLink>    
        
    </motion.div>    
      
        
    <div className="music-container">
    
    <div className="mus-flex">    
    <div className="music-genre">Trending Songs</div>
    <NavLink to="/trending" className="mus-side-header-link" data-menu-id="trending">More</NavLink>
    </div>    
        
        
    <div className="music-flexbox">
    
      {musicData.map((music, index) => (
          <div className="music-col" key={index} onClick={() => onMusicClick(music)}>
            <div className="music-img-box">
              <img src={music.imageSrc} className="music-image" alt={music.title} />
            </div>
            <div className="music-title">{music.title}</div>
            <div className="music-author">{music.author}</div>
            <a href="#" className="fas fa-play play-btn"></a>
          </div>
      ))}    
        
    </div>
        
    </div>
        
    
    <div className="music-container">
        
    <div className="mus-flex">    
    <div className="music-genre">Rodex Mix</div>
    <NavLink to={"/rodex"} className="mus-side-header-link" data-menu-id="rodex">More</NavLink>
    </div>
        
    <div className="music-flexbox">
    
        {rodexMusic.map((rodexMix, index) => (
        <div className="music-col" key={index} onClick={() => onMusicClick(rodexMix)}>
          <div className="music-img-box">
            <img src={rodexMix.imageSrc} className="music-image" alt={rodexMix.title} />
          </div>
          <div className="music-title">{rodexMix.title}</div>
          <div className="music-author">{rodexMix.author}</div>
          <a href="#" className="fas fa-play play-btn"></a>
        </div>
      ))} 
        
    </div>
        
    </div>    
        
        
        
    </div>
        
        
        
    <div className="home-container-col hc-col">
        
    
    <div className="side-header-flexbox">
        
    <div className="side-header-text">New Release</div>    
    <NavLink to="/new" className="side-header-link">See all</NavLink>    
        
    </div>    
    
        
    {sidebarData.map((item, index) => (
        <div className="sidebar-flexbox" key={index} onClick={() => onMusicClick(item)}>
          <div className="sidebar-col-img-box">
            <img src={item.imageSrc} className="sidebar-img" alt="side-bar-image" />
          </div>
          <div className="sidebar-col-txt-box">
            <div className="sidebar-songtitle">{item.title}</div>
            <div className="sidebar-songartist">{item.artist}</div>
          </div>
          <a href="#" className="fas fa-play play-btn sidebar-plybtn"></a>
        </div>
      ))}
      
        
        
    
    <div className="side-header-flexbox shf-m20">
        
    <div className="side-header-text">Rodex Mix</div>    
    <NavLink to="/rodex" className="side-header-link">See all</NavLink>    
        
    </div>    
    
        
    {rodexSidebarData.map((item, index) => (
        <div className="sidebar-flexbox" key={index} onClick={() => onMusicClick(item)}>
          <div className="sidebar-col-img-box">
            <img src={item.imageSrc} className="sidebar-img" alt="side-bar-image" />
          </div>
          <div className="sidebar-col-txt-box">
            <div className="sidebar-songtitle">{item.title}</div>
            <div className="sidebar-songartist">{item.artist}</div>
          </div>
          <a href="#" className="fas fa-play play-btn sidebar-plybtn"></a>
        </div>
      ))}    
        
      
        
        
       {/* Spotlight Trending Component Below  */}
        
        <HomeSpotLight />

        
        
    </div>    
        
        
    </div>
  )
}

export default LocalHome;