import React, { useState } from 'react';
import Logo_png from '../../assets/images/logo.png';
import Logo_png_2 from '../../assets/images/logo-trans-2.png';
import {useTheme} from '../../ThemeContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminLogin = ({isAdmin, setIsAdmin}) => {

  const { theme, defaultEnabled, handleToggleDefault, handleToggleTheme } = useTheme();

  const main_Logo_img = theme === 'dark' ? Logo_png_2 : Logo_png;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isSuccessful, setIsSuccessful] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {

    setIsPasswordVisible(!isPasswordVisible);
    
  }


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username === 'Admin' && password === 'admin_123'){
      setIsAdmin(true);
      localStorage.setItem('isAdmin', true);
      localStorage.setItem('username', username);
      navigate('/admin/home');
    }else{
        setIsSuccessful(true);
        // Set isSuccessful to false after a delay of 5 seconds (5000 milliseconds)
        setTimeout(() => {
        setIsSuccessful(false);
      }, 5000);  // Adjust this time as necessary.
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

        {
        isSuccessful && 
        <motion.div 
        className='failedMsg'
        variants={fadeInDown}
        initial="hidden"
        animate="show"
        >
        Wrong Login Credentials!
        </motion.div>}

        <motion.div 
        className="login-welcome-text"
        variants={fadeInDown}
        initial="hidden"
        animate="show"
        >
          Admin Area
        </motion.div>
            
        <motion.div className="login-logo-box"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        ><img src={main_Logo_img} alt="logo" className="login-logo"/></motion.div><br />
        
        <form className="form-container-wrapper" onSubmit={handleSubmit}>
            
        <motion.div className="form-group"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        >
        <input type="text" name="username" id="username" placeholder="Username" required className="input-input" onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="username" className="fas fa-user form-label"></label>
        </motion.div>
            
        <motion.div className="form-group"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        >
        <input type={`${isPasswordVisible ? 'text' : 'password'}`} name="password" id="password" placeholder="Password" required className="input-input" autoComplete='off' onChange={(e) => setPassword(e.target.value)}/>
        <label htmlFor="password" className="fas fa-lock form-label"></label>
        <span className={`far ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'} password-lock-icon`} onClick={togglePasswordVisibility}></span>
        </motion.div>
            
            
        <motion.div className="form-group"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        >
        <button className="submit-login-btn">Log In</button>
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

export default AdminLogin