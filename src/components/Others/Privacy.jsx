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


const Privacy = () => {

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


    <div className='privacy-header-container'>
        <div className='privacy-page-title'>Privacy Policy</div>
        <div className='privacy-page-time'>Last Updated: July, 2024</div>
    </div>   


    <div className='privacy-container'>
        <div className='privacy-box-col'>
            <motion.div className='privacy-textbox' variants={fadeInUp} initial="hidden" animate="show">
                <div className='privacy-heading-text'>1.0 Introduction</div>

                Welcome to Rodex! This is a music platform aimed at prioritizing artists, encouraging them to network with fans all over the world, 
                improve their reach, and engage with their audience. Here, we value your privacy and are committed to protecting your personal information.<br/> 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://rodex-stream.com">www.rodex-stream.com</a> and 
                use our services. Please read this privacy policy carefully.

            </motion.div>

            <div className='privacy-heading-text'>2.0 The Information We Require</div>

            <div className='privacy-heading-2'>2.1 Personal Data from users</div>
            <motion.div className='privacy-main-text' variants={fadeInUp} initial="hidden" animate="show">   
                We may collect personal information that you voluntarily provide to us when registering for an account, uploading content, 
                or otherwise interacting with our services. This information may include:

                <div className='privacy-list-box'>
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Name</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Email Address</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Username</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Password</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Profile Information (e.g., biography, profile picture)</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Payment Information for Monitization Purpose</div>
                    </div>
                </div>
                    
            </motion.div>

            <div className='privacy-heading-2'>2.2 Non-Personal Information</div>

            <motion.div className='privacy-main-text' variants={fadeInUp} initial="hidden" animate="show">   
            Some other information we may also collect are non-personal and are automatically collected when you access our services, including:

                <div className='privacy-list-box'>
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Device information (e.g., IP address, browser type, operating system)</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Usage data (e.g., pages visited, time spent on pages, clicks)</div>
                    </div>

                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Location data (if you enable location services)</div>
                    </div>
                    
                </div>
                    
            </motion.div>

        </div>

        <div className='privacy-box-col privacy-col-box'>
            <motion.img src={PrivacyImage} className='privacy-image' variants={fadeInUp} initial="hidden" animate="show"/>
        </div>
    </div>
    


    <div className='privacy-container privacy-container-2'>

        <div className='privacy-box-col privacy-col-box'>
            <motion.img src={PrivacyImage2} className='privacy-image' variants={fadeInUp} initial="hidden" animate="show"/>
        </div>


        <div className='privacy-box-col'>
            <motion.div className='privacy-textbox' variants={fadeInUp} initial="hidden" animate="show">
                <div className='privacy-heading-text'>3.0 How do we use your information?</div>
                The information collected from you is used for the below mentioned purposes:
            </motion.div>

            {/* <div className='privacy-heading-text'>2.0 The Information We Require</div> */}

            {/* <div className='privacy-heading-2'>2.1 Personal Data from users</div> */}
            <motion.div className='privacy-main-text' variants={fadeInUp} initial="hidden" animate="show">   

                <div className='privacy-list-box'>
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>To provide, operate, and maintain our services</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>To manage your account and provide customer support</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>To improve our services, personalize your experience, and analyze how our services are used</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>To detect, prevent, and address technical issues and security breaches</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>To monitor and analyze trends, usage, and activities in connection with our services</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>To communicate with you, including sending updates and promotional materials</div>
                    </div>
                </div>
                    
            </motion.div>

            <div className='privacy-heading-text'>4.0 Sharing Your Information</div>

            <motion.div className='privacy-main-text' variants={fadeInUp} initial="hidden" animate="show">
            Sales or rental of personal information to third parties is highly prohibited as we do not indulge in such, although there are
            circumstances that may require that we share your information, the following are the circumstances: 

                <div className='privacy-list-box'>
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>With service providers and partners who assist us in operating our services, conducting our business, or servicing you, so long as those parties agree to keep this information confidential</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process</div>
                    </div>

                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Rodex or others</div>
                    </div>

                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company</div>
                    </div>
                    
                </div>
                    
            </motion.div>

        </div>

    </div>



    <div className='privacy-container privacy-container-2 privacy-container-3'>
        <div className='privacy-box-col'>
            <motion.div className='privacy-textbox' variants={fadeInUp} initial="hidden" animate="show">
                <div className='privacy-heading-text'>5.0 Security of Your Information</div>

                We implement a variety of security measures to maintain the safety of your personal information. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%. In the event of a data breach, we will notify you and the relevant authorities promptly as required by applicable law.

            </motion.div>

            <div className='privacy-heading-text'>6.0 User's Option</div>

            <div className='privacy-heading-2'>6.1 Account Information</div>
            <motion.div className='privacy-main-text' variants={fadeInUp} initial="hidden" animate="show">   
            You may update or correct your account information at any time by logging into your account. If you wish to delete your account, please contact us at <a href="https://support@rodex-stream.com">support@rodex-stream.com</a>, but note that we may retain certain information as required by law or for legitimate business purposes.
            </motion.div>



            <div className='privacy-heading-text'>7.0 International Data Transfers</div>

            <motion.div className='privacy-main-text' variants={fadeInUp} initial="hidden" animate="show">   
            Rodex is based in Nigeria, and the information we collect is governed by 
            Nigeria's law. By accessing or using our services or otherwise providing information to us, you consent to the 
            processing and transfer of information in and to Nigeria and other countries where we operate, which may have different data protection laws than your country of residence.
                <div className='privacy-list-box'>
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Device information (e.g., IP address, browser type, operating system)</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Usage data (e.g., pages visited, time spent on pages, clicks)</div>
                    </div>

                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Location data (if you enable location services)</div>
                    </div>
                    
                </div>
                    
            </motion.div>



            <div className='privacy-heading-text'>8.0 Changes to This Privacy Policy</div>

            <motion.div className='privacy-main-text' variants={fadeInUp} initial="hidden" animate="show">   
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy

                <div className='privacy-list-box'>
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Device information (e.g., IP address, browser type, operating system)</div>
                    </div>
                    
                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Usage data (e.g., pages visited, time spent on pages, clicks)</div>
                    </div>

                    <div className='privacy-li'>
                        <div className='priv-icon fas fa-check'></div>
                        <div className='priv-text'>Location data (if you enable location services)</div>
                    </div>
                    
                </div>
                    
            </motion.div>

        </div>

        <div className='privacy-box-col privacy-col-box'>
            <motion.img src={PrivacyImage3} className='privacy-image' variants={fadeInUp} initial="hidden" animate="show"/>
        </div>
    </div>

    
    <Footer />    
        
        
        
        
    </div>


    </React.Fragment>
  )
}

export default Privacy;