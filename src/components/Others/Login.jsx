import React, { useState } from 'react';
import Logo_png from '../../assets/images/logo.png';
import Logo_png_2 from '../../assets/images/logo-trans-2.png';
import {useTheme} from '../../ThemeContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../useAuth';

const Login = () => {

  const { theme, defaultEnabled, handleToggleDefault, handleToggleTheme } = useTheme();

  const main_Logo_img = theme === 'dark' ? Logo_png_2 : Logo_png;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {

    setIsPasswordVisible(!isPasswordVisible);
    
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://rodex-server.vercel.app/api/auth/login', { 
        email: email,
        password: password
      });
      
      setIsLoading(false);
      // If the responseponse contains a token, consider the login to be successful
      if(response.data.token) {
        localStorage.setItem('rodexAppToken', response.data.token);
        localStorage.setItem('userAdminId', response.data.user._id);
        localStorage.setItem('userFirstName', response.data.user.firstName);
        localStorage.setItem('userLastName', response.data.user.lastName);
        localStorage.setItem('userEmail', response.data.user.email);
        navigate('/');
      }else {
        setMessage(response.data.message || 'Login successful!');
      }
    } catch (error) {
      //setIsSuccessful(response.data);
      // setMessage(error.response?.data?.message || 'There was an error logging in.');

      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('User not found!');
      }

      console.log(error);
      setTimeout(() => {
        setIsSuccessful(false);
        setMessage(false);
      }, 5000);  
      setIsLoading(false);
    }
  }; 






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
        
        <div className="login-wrapper-col login-form-col l-login-form-col">

        <motion.div 
        className="login-welcome-text"
        variants={fadeInDown}
        initial="hidden"
        animate="show"
        >
          Welcome to
        </motion.div>
            
        <motion.div className="login-logo-box"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        ><img src={main_Logo_img} alt="logo" className="login-logo"/></motion.div>    
        <motion.div className="login-brief-text"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        >Your music, your way, access, create and enjoy uninterrupted tunes, anytime, anywhere
        </motion.div>

        {
        message && 
        <motion.div 
        className='failedMsg'
        variants={fadeInDown}
        initial="hidden"
        animate="show"
        >
        {message}
        </motion.div>}
        
        <form className="form-container-wrapper" onSubmit={handleSubmit}>
            
        <motion.div className="form-group"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        >
        <input type="email" name="email" id="email" placeholder="Email" required className="input-input" onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="email" className="fas fa-envelope form-label"></label>
        </motion.div>
            
        <motion.div className="form-group"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        >
        <input type={`${isPasswordVisible ? 'text' : 'password'}`} name="password" id="password" placeholder="Password" required className="input-input" autoComplete='off'
        onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password" className="fas fa-lock form-label"></label>
        <span className={`far ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'} password-lock-icon`} onClick={togglePasswordVisibility}></span>
        </motion.div>  

            
        <motion.div className="form-group"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        >
        {isLoading 
          ? <button className="submit-login-btn" disabled={isLoading}><span className='fas fa-spinner fa-spin'></span></button>
          : <button className="submit-login-btn">Log In</button>
        }
        
        </motion.div>    
        
        
        <motion.div className="create-text"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        ><NavLink to="/forgot-password" className="create-link">Forgot Password</NavLink>
        </motion.div>    
            
        <motion.div className="create-text"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        >Don't have an account? <NavLink to="/signup" className="create-link">Sign Up Now</NavLink></motion.div>    
        <motion.div className="create-text"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        >or</motion.div>
            
        <motion.div className="create-text"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        >Continue with social media</motion.div>    
            
        <motion.div className="login-socials"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        >
            
        <NavLink to="#" className="fab fa-facebook-f l-socials-icon"></NavLink>
        <NavLink to="#" className="fab fa-instagram l-socials-icon"></NavLink>
        <NavLink to="#" className="fab fa-google l-socials-icon"></NavLink>
            
        </motion.div>    
            
            
        </form>
        </div>
            
        <div className="login-wrapper-col login-overlay-box">
        
        <div className="login-overlay">
            
        <motion.div className="rodex-text"
        variants={fadeInDown}
        initial="hidden"
        animate="show"
        >Rodex Music Platform</motion.div>    
        <motion.div className="rodex-text-2"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        >Explore Limitless Possibilities</motion.div>
        <NavLink to="/" className="rodex-home-link-2 wow fadeInUp">Home</NavLink>
            
        </div>    
            
        </div>    
            
        </div>    
            
            
        </div>     

    </React.Fragment>
  )
}

export default Login