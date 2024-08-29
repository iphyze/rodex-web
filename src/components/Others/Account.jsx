import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext'
import Rodex_Logo from '../../assets/images/rodex-logo.png';
import PrivacyImage from '../../assets/images/privacy-img.png';
import PrivacyImage2 from '../../assets/images/privacy-img-2.png';
import PrivacyImage3 from '../../assets/images/privacy-img-3.png';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import useAuth from '../useAuth';


const Account = () => {

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


        const list = [
            {
                id: <div className='adcs-number'>1.</div>,
                text: <div className='adcs-text'>Open the Rodex app on your device.</div>
            },
            {
                id: <div className='adcs-number'>2.</div>,
                text: <div className='adcs-text'>Tap on the <span className='adcs-theme-color'>"Menu Bar Icon".</span></div>
            },
            {
                id: <div className='adcs-number'>3.</div>,
                text: <div className='adcs-text'>Tap on <span className='adcs-theme-color'>"Profile Menu".</span></div>
            },
            {
                id: <div className='adcs-number'>4.</div>,
                text: <div className='adcs-text'>Scroll down to the bottom of the screen.</div>
            },
            {
                id: <div className='adcs-number'>5.</div>,
                text: <div className='adcs-text'>Tap on <span className='adcs-theme-color'>"Delete Your Account".</span></div>
            },
            {
                id: <div className='adcs-number'>6.</div>,
                text: <div className='adcs-text'>Confirm your decision by selecting proceed when it asks if you're sure of your action.</div>
            },
            {
                id: <div className='adcs-number'>7.</div>,
                text: <div className='adcs-text'><span className='adcs-theme-color'>"Tap Proceed."</span></div>
            }
        ]


        const data = [
            {
                id: <div className='fas fa-circle adcs-number-2'></div>,
                text: <div className='adcs-text'>Your account information will be permanently deleted from our servers.</div>
            },
            {
                id: <div className='fas fa-circle adcs-number-2'></div>,
                text: <div className='adcs-text'>All personal data associated with your account will be removed.</div>
            },
            {
                id: <div className='fas fa-circle adcs-number-2'></div>,
                text: <div className='adcs-text'>Your trip history and preferences will be erased.</div>
            },
            {
                id: <div className='fas fa-circle adcs-number-2'></div>,
                text: <div className='adcs-text'>Any reviews or ratings you've submitted will be anonymized.</div>
            }
        ]


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


    <div className='privacy-header-container'>
        <div className='privacy-page-title'>Account Deletion</div>
        <div className='privacy-page-time'>Last Updated: July, 2024</div>
    </div>   


    <div className='account-deletion-container'>
        
        <div className='adc-heading-text'>We value your privacy and make it easy for you to request the deletion of your Rodex account and its associated data.</div>

        <div className='adc-steps-box'>
            <div className='adcs-header'>Steps To Request Account Deletion</div>

            {list.map((fetched) => {

                const {id, text} = fetched;

                return(
                    <div className='adcs-flexbox' key={id}>
                        {id}
                        {text}
                    </div>
                )
            })}
        </div>


        <div className='adcs-header'>Data Deletion Information</div>
        
        <div className='adc-heading-text'>When you request account deletion, the following actions will be taken:</div>

        {data.map((fetched) => {

            const {id, text} = fetched;

            return(
                <div className='adcs-flexbox' key={id}>
                    {id}
                    {text}
                </div>
            )
        })}


        <div className='adcs-header'>Data Retention</div>
        <div className='adcs-wrapper'>
        Some information may be retained for a period of 14 days after deletion for backup purposes and to comply with legal obligations. After this period, all remaining data will be permanently deleted. <br/><br/>
        If you have any questions or concerns about the account deletion process, please contact our support team at <a href="mailto:support@rodex.com" className='adcs-theme-color'>support@rodex.com</a>
        </div>


    </div>
    
    
    <Footer />    
        
        
        
        
    </div>


    </React.Fragment>
  )
}

export default Account;