import React, { useState } from 'react';
import Logo_png from '../../assets/images/logo.png';
import Logo_png_2 from '../../assets/images/logo-trans-2.png';
import {useTheme} from '../../ThemeContext';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword = () => {


    const theme = useTheme();

    const main_logo_img = theme === "dark" ? Logo_png : Logo_png_2;

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



  return (
    <React.Fragment>
        

    
        <div className="login-container">
            

            <div className="login-form-wrapper">
            
            <div className="login-wrapper-col login-form-col f-login-form-col">
                
            <motion.div className="login-logo-box"
            variants={fadeIn}
            initial="hidden"
            animate="show"
            >
            <img src={main_logo_img} alt="logo" className="login-logo"/>
            </motion.div>    
            <motion.div className="login-brief-text"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >Forgot your password? Enter your email in the field below to reset your password!
            </motion.div>
            
            <form className="form-container-wrapper">
                
            <motion.div className="form-group"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >
            <input type="email" name="email" id="email" placeholder="Email" required={true} className="input-input"/>
            <label for="email" className="fas fa-envelope form-label"></label>
            </motion.div>
                
            <motion.div className="form-group"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >
            <button className="submit-login-btn">Reset Password</button>
            </motion.div>    
            
                
            <motion.div className="create-text"
            variants={fadeIn}
            initial="hidden"
            animate="show"><NavLink to="/signup" className="create-link">Sign Up Now</NavLink> If you don't already have an account</motion.div>    
            
            <motion.div className="create-text"
            variants={fadeIn}
            initial="hidden"
            animate="show">or</motion.div>
                
            <motion.div className="create-text"
            variants={fadeIn}
            initial="hidden"
            animate="show"
            >Continue with social media</motion.div>
                
            <motion.div className="login-socials" 
            variants={fadeInUp}
            initial="hidden"
            animate="show">
                
            <a href="#" className="fab fa-facebook-f l-socials-icon"></a>
            <a href="#" className="fab fa-instagram l-socials-icon"></a>
            <a href="#" className="fab fa-google l-socials-icon"></a>
                
            </motion.div>    
                
                
            </form>
            </div>
                
            <div className="login-wrapper-col forgot-overlay-box">
            
            <div className="login-overlay">
                
            <motion.div className="rodex-text"
            variants={fadeInDown}
            initial="hidden"
            animate="show"
            >Rodex Music Platform
            </motion.div>    
            <motion.div className="rodex-text-2"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >Explore Limitless Possibilities</motion.div>
            <NavLink to="/" className="rodex-home-link-2">Home</NavLink>
                
            </div>    
                
            </div>    
                
            </div>    
                
                
            </div>    
    
        
        
        
        
        
        
    
    </React.Fragment>
  )
}

export default ForgotPassword