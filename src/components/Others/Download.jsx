import React, {useEffect, useState} from 'react'
import Rodex_Logo from '../../assets/images/rodex-logo.png';
import Phone_one from '../../assets/images/phone-white.png';
import Phone_two from '../../assets/images/phone-dark.png';
import Google_Play from '../../assets/images/google-play.png';
import Apple_trans from '../../assets/images/apple-trans.png';
import { useTheme } from '../../ThemeContext';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../Footer';


const Download = () => {

    useEffect(() => {
        document.title = 'Download';
      }, []);

    const theme = useTheme();
    
    const phone_image = theme === "dark" ? Phone_two : Phone_one;


    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        show: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8
          } 
        },
      };
    
      const fadeInDown = {
        hidden: { opacity: 0, y: -50 },
        show: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8
          } 
        },
      };
    
      const fadeIn = {
        hidden: { opacity: 0, x: 0 },
        show: { 
          opacity: 1,
          x: 0, 
          transition: {
            delay: 1,
            duration: 1.5,
          },
        }
      };

      const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        show: { 
          opacity: 1,
          x: 0, 
          transition: {
            delay: 1,
            duration: 0.8,
          },
        }
      };

      const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        show: { 
          opacity: 1,
          x: 0, 
          transition: {
            delay: 1,
            duration: 0.8,
          },
        }
      };


      const [showNav, setShowNav] = useState(false);

      const handleNavClick = () => {

            setShowNav(!showNav);

      }


  return (
    <React.Fragment>

        
    
<div className="download-container">
    
    
    
    <div className="download-flex-header">
    
    <div className="download-box-img">
    <NavLink to="/" className="logo">
    <div className="logo-text download-logo-txt">RODEX</div>
    <img src={Rodex_Logo} className="rodex-logo"/>    
    </NavLink>    
    </div>
        
        
    <div className={`download-menu ${showNav ? 'download-active-menu' : ''} `}>
    <NavLink to="/about" className='sign-up-btn signupbtn-2'>About</NavLink>     
    <NavLink to="/services" className='sign-up-btn signupbtn-2'>Services</NavLink>   
    <NavLink to="/signup" className='sign-up-btn signupbtn-2'>Create Account</NavLink>    
    <NavLink to="/login" className='log-in-btn loginbtn'>Log In</NavLink>    
    </div>
            
        
    <div className="fas fa-bars download-menu-close" onClick={handleNavClick}></div>
        
    </div>
        
       
        
    <div className="download-wrapper">
        
    <div className="download-wrapper-imgbox">    
    <motion.img src={phone_image} className="screen-img down-img"
    variants={fadeIn}
    initial="hidden"
    animate="show"
    />
    </div>    
        
    <motion.div className="downloader-text"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
        Download Rodex
    </motion.div>

    <motion.div className="downloader-text-2"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >Experience musical bliss with Rodex!</motion.div>    
    
    <div className="download--btn-wrapper">
    
    <motion.a href="#" className="dl-flexbox"
    variants={fadeInLeft}
    initial="hidden"
    animate="show"
    >
    <div className="dl-flexbox-icon">
    <img src={Apple_trans} className="brand-logo"/>    
    </div>
    <div className="dl-flexbox-txt">
    <span className="dl-flexbox-txt-1">Download on the</span>
    <span className="dl-flexbox-txt-2">App Store</span>
    </div>        
    </motion.a>
        
        
    <motion.a href="#" className="dl-flexbox"
    variants={fadeInRight}
    initial="hidden"
    animate="show"
    >
    <div className="dl-flexbox-icon">
    <img src={Google_Play} className="brand-logo" />    
    </div>
    <div className="dl-flexbox-txt">
    <span className="dl-flexbox-txt-1">Get it on</span>
    <span className="dl-flexbox-txt-2">Google Play</span>
    </div>        
    </motion.a>       
    
    </div>    
        
        
    <div className="downloader-text-2 dt-2"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >Click to download the app for seamless streaming and endless tunes. Your sound, your way!</div>    
        
    
    <Footer />    
        
        
    </div>
            
        
    </div>
        
        
    

    </React.Fragment>
  )
}

export default Download