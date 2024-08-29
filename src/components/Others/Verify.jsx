import React, { useRef } from 'react';
import Logo_png from '../../assets/images/logo.png';
import Logo_png_2 from '../../assets/images/logo-trans-2.png';
import {useTheme} from '../../ThemeContext';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';


const Verify = () => {

    const {theme} = useTheme();

    const main_logo_img = theme === "dark" ? Logo_png_2 : Logo_png;

    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];


    const handleInput = (index, e) => {
        let inputValue = e.target.value;
    
        // Check if the input is a number
        if (isNaN(inputValue)) {
          // If not a number, remove non-numeric characters
          inputValue = inputValue.replace(/\D/g, '');
          inputRefs[index].current.value = inputValue;
          // Don't move to the next field if a non-numeric character is entered
          return;
        }
    
        // Move to the next input field if the current input is filled
        if (inputValue.length >= 1) {
          if (index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
          }
        }
      };


      const handleBackspace = (index, e) => {
        // Check if the backspace key is pressed and the input is empty
        if (e.key === 'Backspace' && e.target.value.length === 0) {
          if (index > 0) {
            // Move focus to the previous input field and clear its content
            inputRefs[index - 1].current.focus();
            inputRefs[index - 1].current.value = '';
          }
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
            
            <div className="login-wrapper-col login-form-col v-login-form-col">
                
                
            <motion.div className="login-logo-box"
            variants={fadeIn}
            initial="hidden"
            animate="show"
            ><img src={main_logo_img} alt="logo" className="login-logo"/>
            </motion.div>    
            
            <motion.div className="login-brief-text"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >Enter the verification code sent to your email
            </motion.div>
            
            <form className="form-container-wrapper">
                
            <motion.div className="form-group-number"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >
            {inputRefs.map((ref, index) => (
                <input
                key={index}
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                className="number-input"
                maxLength="1"
                required={true}
                ref={ref}
                onInput={(e) => handleInput(index, e)}
                onKeyDown={(e) => handleBackspace(index, e)}
                />
            ))}

            </motion.div>
                
            <motion.div className="form-group" 
            variants={fadeInUp}
            initial="hidden"
            animate="show">
            <button className="submit-login-btn">Submit</button>
            </motion.div>    
                
                
            </form>
            </div>
                
            <div className="login-wrapper-col verify-overlay-box">
            
            <div className="login-overlay">
                
            <motion.div className="rodex-text"
                variants={fadeIn}
                initial="hidden"
                animate="show"
            >
                Unlock the rhythm of your day!
            </motion.div>    
            <motion.div className="rodex-text-2"
                variants={fadeInUp}
                initial="hidden"
                animate="show"
            >Dive into Rodex, your personalized music sanctuary.
            </motion.div>
            <NavLink to="/" className="rodex-home-link-2 wow fadeInUp">Home</NavLink>
                
            </div>    
                
            </div>    
                
            </div>    
                
                
            </div>        
    

    </React.Fragment>
  )
}

export default Verify