import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext'
import Rodex_Logo from '../../assets/images/rodex-logo.png';
import Headphone from '../../assets/images/headphone-2.png';
import Person_one from '../../assets/images/abt-8.jpg';
import Person_two from '../../assets/images/abt-9.jpg';
import Person_three from '../../assets/images/abt-7.jpg';
import Person_four from '../../assets/images/abt-6.jpg';
import Person_five from '../../assets/images/abt-10.jpg';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import useAuth from '../useAuth';


const About = () => {

    const { theme, defaultEnabled, handleToggleDefault, handleToggleTheme } = useTheme();
    const { rodexAppToken, firstName, setRodexAppToken, setFirstName } = useAuth();

  useEffect(() => {
    const handleAuthChange = () => {
      setRodexAppToken(localStorage.getItem('rodexAppToken'));
      setFirstName(localStorage.getItem('userFirstName'));
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

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
            duration: 0.8,
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
            duration: 0.5,
          },
        }
      };


      const [scrollNav, setScrollNav] = useState(0);

        useEffect(() => {
            const handleScrollNav = () => {
            setScrollNav(window.scrollY);
            };

            window.addEventListener('scroll', handleScrollNav);

            return () => {
            window.removeEventListener('scroll', handleScrollNav);
            };
        }, []);


        const [showNav, setShowNav] = useState(false);

        const handleNavClick = () => {

            setShowNav(!showNav);

        }


  return (
    <React.Fragment>

    <div className="download-container about-box">
    
    
    
    <div className={`download-flex-header about-flex-header ${scrollNav > 100 ? 'scrolled' : ''}`}>
    
    <div className="download-box-img">
    <NavLink to="/" className="logo">
    <div className="logo-text download-logo-txt">RODEX</div>
    <img src={Rodex_Logo} className="rodex-logo"/>    
    </NavLink>    
    </div>
        
        
    <div className={`download-menu about-menu ${showNav ? 'download-active-menu' : ''} `}>

    <NavLink to="/about" className='sign-up-btn signupbtn-2 active-screen'>About</NavLink>     
    {/* <NavLink to="/services" className='sign-up-btn signupbtn-2'>Services</NavLink> */}

    {!rodexAppToken ? (

    <>  

    <NavLink to="/signup" className='sign-up-btn signupbtn-2'>Create Account</NavLink>    
    <NavLink to="/login" className='log-in-btn loginbtn'>Log In</NavLink>
    
    </>
    ) : (
   
    <>

    <NavLink to="/profile" className='sign-up-btn'>{firstName}</NavLink>
    <NavLink to="/profile" className='user-profile-btn fas fa-user'></NavLink>

    </>

    )}
        
    </div>
        
        
    <div className="fas fa-bars download-menu-close" onClick={handleNavClick}></div>    
        
    </div>
        
       
    <div className="about-container">
        
    <div className="about-col abt-img-col">
    
    <img src={Headphone} className="abt-img" alt="headphone image"/>    
        
    </div>    
        
    <div className="about-col">
    
    <motion.div className="abt-large-text"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >The ultimate music destination for artists.
    </motion.div>
    
    <motion.div className="abt-small-text"
    variants={fadeInRight}
    initial="hidden"
    animate="show"
    >Rodex, a music platform that prioritizes artists, enabling them to <span className="abt-span-text">connect with fans worldwide and enhance their reach</span> and engagement.
    </motion.div>

    <motion.div className="abt-textlink"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    transition={{ duration: 0.8, delay: 50000 }}
    ><NavLink to="/download" className='abt-nav-textlink'>Download for free <span className="fab fa-google-play download-icon"></span> <span className="fab fa-apple download-icon"></span></NavLink></motion.div>    
        
        
    </div>
            
        
    </div>
    
        
        
    <section className="about-wrapper">
    
        
    <div className="abt-wrapper-icon-box">
    
    <span className="fas fa-headphones awib-icon"></span>    
    <span className="fas fa-music awib-icon"></span>    
    <span className="fas fa-play awib-icon"></span>    
    <span className="fas fa-pause awib-icon"></span>    
    <span className="fas fa-stop awib-icon"></span>    
        
    </div>
        
        
    <motion.div className="about-wrapper-col abt-imgwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <img src={Person_one} alt="abt-img" className="abt-wrapimg wow fadeInUp"/>    
        
    </motion.div>
        
    <motion.div className="about-wrapper-col abt-textwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <div className="abt-wraptext">
    <span className="abt-wrapspan">Absolutely FREE</span> - No need for premium creator accounts on Rodex.    
    </div> 
        
    <div className="abt-maintext">
    Say goodbye to the burden of paying for limitless uploads. Rodex ensures that whether you have just one song or a thousand, you can host them all without any cost. No premium creator accounts are necessary!
    </div>    
        
    </motion.div>    
        
    </section>    
            
        
    <section className="about-wrapper abt-wrapper-reverse">
            
    <motion.div className="about-wrapper-col abt-textwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <div className="abt-wraptext">
    <span className="abt-wrapspan">Showcase your music</span> to millions of engaged listeners globally.    
    </div> 
        
    <div className="abt-maintext">
    Discover trending music daily on Rodex with millions of engaged fans. Submit your music for free and get the chance to reach a massive new audience.
    </div>    
        
    </motion.div>    
    
        
    
    <motion.div className="about-wrapper-col abt-imgwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <img src={Person_two} alt="abt-img" className="abt-wrapimg"/>    
        
    </motion.div>    
        
    
    <div className="abt-wib-right">
    
    <span className="fas fa-headphones awib-icon"></span>    
    <span className="fas fa-music awib-icon"></span>    
    <span className="fas fa-play awib-icon"></span>    
    <span className="fas fa-pause awib-icon"></span>    
    <span className="fas fa-stop awib-icon"></span>    
        
    </div>    
        
        
        
    </section>    
    
     
    <section className="about-wrapper">
    
        
    <div className="abt-wrapper-icon-box">
    
    <span className="fas fa-headphones awib-icon"></span>    
    <span className="fas fa-music awib-icon"></span>    
    <span className="fas fa-play awib-icon"></span>    
    <span className="fas fa-pause awib-icon"></span>    
    <span className="fas fa-stop awib-icon"></span>    
        
    </div>    
        
    <motion.div className="about-wrapper-col abt-imgwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <img src={Person_three} alt="abt-img" className="abt-wrapimg abtimg-small wow fadeInUp"/>    
        
    </motion.div>
        
    <motion.div className="about-wrapper-col abt-textwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <div className="abt-wraptext">
    <span className="abt-wrapspan">Empowering artist insights with a</span> - robust dashboard and comprehensive statistics.    
    </div> 
        
    <div className="abt-maintext">
    Unlock comprehensive insights into your content's consumption on Rodex's Artist Dashboard. No need for premium accounts—experience free analytics on fan engagement and detailed release data.
    </div>    
        
    </motion.div>    
        
    </section>    
        
        
     
        
    <section className="about-wrapper abt-wrapper-reverse">
    
    <motion.div className="about-wrapper-col abt-textwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <div className="abt-wraptext">
    <span className="abt-wrapspan">Earn money from your audio on</span> Rodex by leveraging monetization features. 
    </div> 
        
    <div className="abt-maintext">
    Our Earnings Boost program is utilized by numerous creators, providing artists with a competitive per-stream rate for their Rodex uploads.<br/>
    Currently in an advanced beta phase, Earnings Boost is set to be available to all Rodex creators in 2024.
    </div>    
        
    </motion.div>    
    
        
    
    <motion.div className="about-wrapper-col abt-imgwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <img src={Person_four} alt="abt-img" className="abt-wrapimg abtimg-small"/>    
        
    </motion.div>    
      
        
    <div className="abt-wib-right">
    
    <span className="fas fa-headphones awib-icon"></span>    
    <span className="fas fa-music awib-icon"></span>    
    <span className="fas fa-play awib-icon"></span>    
    <span className="fas fa-pause awib-icon"></span>    
    <span className="fas fa-stop awib-icon"></span>    
        
    </div>    
        
        
    </section>
        
        
    <section className="about-wrapper">
    
    <div className="abt-wrapper-icon-box">
    
    <span className="fas fa-headphones awib-icon"></span>    
    <span className="fas fa-music awib-icon"></span>    
    <span className="fas fa-play awib-icon"></span>    
    <span className="fas fa-pause awib-icon"></span>    
    <span className="fas fa-stop awib-icon"></span>    
        
    </div>    
        
        
    <motion.div className="about-wrapper-col abt-imgwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <img src={Person_five} alt="abt-img" className="abt-wrapimg abtimg-small wow fadeInUp"/>    
        
    </motion.div>
        
    <motion.div className="about-wrapper-col abt-textwrap-col"
    variants={fadeInUp}
    initial="hidden"
    animate="show"
    >
    
    <div className="abt-wraptext">
    <span className="abt-wrapspan">Endless features</span> - Completely free of charge.   
    </div> 
        
    <div className="abt-maintext">
    We passionately support your music's universal presence, extending beyond Rodex. All uploads on Rodex seamlessly connect with the Trend Pulse network.
    </div>    
        
    </motion.div>    
        
    </section>    
    
    
    <Footer />    
        
        
        
        
    </div>

    {/* <style>{`
        .about-flex-header {
          transition: background-color 0.3s linear;
          background-color: rgba(${scroll >= 50 ? "white" : "transparent"});
        }
        body.dark .about-flex-header {
          transition: background-color 0.3s linear;
          background-color: ${scroll >= 50 ? '#000' : 'transparent'};
        }
      `}</style> */}

    </React.Fragment>
  )
}

export default About