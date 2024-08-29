import React, { useState, useEffect } from 'react';
import Logo_png from '../../assets/images/logo.png';
import Logo_png_2 from '../../assets/images/logo-trans-2.png';
import { useTheme } from '../../ThemeContext';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const { theme } = useTheme();
    const main_logo_img = theme === 'dark' ? Logo_png_2 : Logo_png;
    const rodexAppToken = localStorage.getItem('rodexAppToken');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();




    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cpassword: '',
        countries: '',
        gender: '',
        terms: false
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleCPasswordVisibility = () => {
        setIsCPasswordVisible(!isCPasswordVisible);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const validate = (values) => {
      const errors = {};
      if (!values.email) {
          errors.email = 'This field cannot be empty';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = 'Email address is invalid';
      }
      if (!values.firstName) {
          errors.firstName = 'This field cannot be empty';
      }
      if (!values.lastName) {
        errors.lastName = 'This field cannot be empty';
    }
      if (!values.password) {
          errors.password = 'This field cannot be empty';
      } else if (values.password.length < 6 || values.password.length > 16) {
          errors.password = 'Password must be between 6 and 16 characters';
      }
      if (!values.cpassword) {
          errors.cpassword = 'This field cannot be empty';
      } else if (values.cpassword !== values.password) {
          errors.cpassword = 'Passwords do not match';
      }
      if (!values.gender) {
          errors.gender = 'This field cannot be empty';
      }
      if (!values.country) {
        errors.country = 'This field cannot be empty';
      }
      if (!values.terms) {
          errors.terms = 'You must accept the terms and conditions';
      }
      return errors;
  }
  

  useEffect(() => {
    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countryList = response.data.map(country => country.name.common).sort();
            setCountries(countryList);
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    };
    fetchCountries();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmitting(true);
    setIsLoading(true);

    if (Object.keys(errors).length === 0) {
        try {
            const response = await axios.post('https://rodex-server.vercel.app/api/auth/register', 
            {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                password: formValues.password,
                gender: formValues.gender,
                country: formValues.country
            },
            {
                headers: { Authorization: `Bearer ${rodexAppToken}` }
            });

            setMessage(response.data.message || 'Form submitted successfully! Redirecting...');
            setTimeout(() => {
                navigate('/verify', { state: { email: formValues.email } });
            }, 5000); // Redirect after 5 seconds
        } catch (error) {
            setMessage(error.response?.data?.message || 'There was an error submitting the form.');
            console.error('There was an error submitting the form:', error);
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    } else {
        setIsSubmitting(false);
        setIsLoading(false);
    }
}




    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            // Submit the form
            console.log('Form submitted successfully');
        }
    }, [formErrors]);




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
                <div className="login-form-wrapper signup-form-wrapper">
                    <div className="login-wrapper-col login-form-col s-login-form-col">
                        <motion.div className="login-logo-box"
                            variants={fadeIn}
                            initial="hidden"
                            animate="show"
                        >
                            <img src={main_logo_img} alt="logo" className="login-logo" />
                        </motion.div>
                        
                        <motion.div className="login-brief-text"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="show"
                        >
                            Sign Up and let the melodies begin
                        </motion.div>


                        {message && <motion.div className="message-display" variants={fadeInUp} initial="hidden" animate="show">{message}</motion.div>}

                        <form className="form-container-wrapper" onSubmit={handleSubmit}>

                            <motion.div className="form-group"
                              variants={fadeInUp}
                              initial="hidden"
                              animate="show"
                            >
                              <input 
                                  type="text" 
                                  name="firstName" 
                                  id="firstName" 
                                  placeholder="First Name"  
                                  className="input-input"
                                  value={formValues.firstName}
                                  onChange={handleChange}
                              />
                              <label htmlFor="firstName" className="fas fa-user form-label"></label>
                              {formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}
                          </motion.div>

                          <motion.div className="form-group"
                              variants={fadeInUp}
                              initial="hidden"
                              animate="show"
                          >
                              <input 
                                  type="text" 
                                  name="lastName" 
                                  id="lastName" 
                                  placeholder="Last Name"  
                                  className="input-input"
                                  value={formValues.lastName}
                                  onChange={handleChange}
                              />
                              <label htmlFor="lastName" className="fas fa-user form-label"></label>
                              {formErrors.lastName && <p className="error-message">{formErrors.lastName}</p>}
                          </motion.div>
    
                            

                          <motion.div className="form-group"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Email"  
                                    className="input-input"
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email" className="fas fa-envelope form-label"></label>
                                {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                            </motion.div>


                            <motion.div className="form-group"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >
                                <select 
                                    name="country" 
                                    id="country" 
                                    className="input-input" 
                                    value={formValues.country} 
                                    onChange={handleChange}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                                <label htmlFor="country" className="fas fa-globe form-label"></label>
                                {formErrors.country && <p className="error-message">{formErrors.country}</p>}
                            </motion.div>


                            <motion.div className="form-group"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >
                                <input 
                                    type={isPasswordVisible ? 'text' : 'password'} 
                                    name="password" 
                                    id="password" 
                                    placeholder="Password (6-16 Characters)"  
                                    className="input-input" 
                                    autoComplete='off'
                                    value={formValues.password}
                                    onChange={handleChange}
                                />
                                <label htmlFor="password" className="fas fa-lock form-label"></label>
                                <span className={`far ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'} password-lock-icon`} onClick={togglePasswordVisibility}></span>
                                {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                            </motion.div>
                            
                            <motion.div className="form-group"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >
                                <input 
                                    type={isCPasswordVisible ? 'text' : 'password'} 
                                    name="cpassword" 
                                    id="cpassword" 
                                    placeholder="Confirm Password"  
                                    className="input-input" 
                                    autoComplete='off'
                                    value={formValues.cpassword}
                                    onChange={handleChange}
                                />
                                <label htmlFor="cpassword" className="fas fa-key form-label"></label>
                                <span className={`far ${isCPasswordVisible ? 'fa-eye' : 'fa-eye-slash'} cpassword-lock-icon`} onClick={toggleCPasswordVisibility}></span>
                                {formErrors.cpassword && <p className="error-message">{formErrors.cpassword}</p>}
                            </motion.div>
                            
                            <motion.div className="form-group"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >
                                <div className="checkbox-wrapper">
                                    <div className="checkbox-col">    
                                        <input 
                                            type="radio" 
                                            id="male_gender" 
                                            value="Male" 
                                            name="gender"  
                                            className="radio-input"
                                            checked={formValues.gender === 'Male'}
                                            onChange={handleChange}
                                        />
                                        <label className="radio-label" htmlFor="male_gender">Male</label>
                                    </div>
                                    
                                    <div className="checkbox-col">    
                                        <input 
                                            type="radio" 
                                            id="female_gender" 
                                            value="Female" 
                                            name="gender"  
                                            className="radio-input"
                                            checked={formValues.gender === 'Female'}
                                            onChange={handleChange}
                                        />
                                        <label className="radio-label" htmlFor="female_gender">Female</label>
                                    </div>
                                </div>
                                {formErrors.gender && <p className="error-message">{formErrors.gender}</p>}
                            </motion.div>
                            
                            <motion.div className="form-group"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >    
                                <motion.div className="create-text"
                                    variants={fadeIn}
                                    initial="hidden"
                                    animate="show"
                                >
                                    <div className="checkbox-col">    
                                        <input 
                                            type="checkbox" 
                                            id="terms" 
                                            name="terms"  
                                            className="radio-input"
                                            checked={formValues.terms}
                                            onChange={handleChange}
                                        />
                                        <label className="radio-label" htmlFor="terms">
                                            I have read & I accept the <NavLink to="/terms" className="create-link">Terms & Conditions</NavLink>
                                        </label>
                                    </div>
                                </motion.div>
                                {formErrors.terms && <p className="error-message">{formErrors.terms}</p>}
                            </motion.div>    
                            
                            <motion.div className="form-group"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >
                                <button className="submit-login-btn" disabled={isLoading}>{isLoading ? <span className='fas fa-spinner spin'></span> : 'Sign Up'}</button>
                            </motion.div>    
                            
                            <motion.div className="create-text"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >or</motion.div>
                            
                            <motion.div className="create-text"
                                variants={fadeIn}
                                initial="hidden"
                                animate="show"
                            >
                                <NavLink to="/login" className="create-link">Log In</NavLink> | Continue with social media
                            </motion.div>    
                            
                            <motion.div className="login-socials"
                                variants={fadeIn}
                                initial="hidden"
                                animate="show"
                            >
                                <a href="#" className="fab fa-facebook-f l-socials-icon"></a>
                                <a href="#" className="fab fa-instagram l-socials-icon"></a>
                                <a href="#" className="fab fa-google l-socials-icon"></a>
                            </motion.div>    
                        </form>
                    </div>
                    
                    <div className="login-wrapper-col login-overlay-box signup-overlay-box">
                        <div className="login-overlay">
                            <motion.div className="rodex-text"
                                variants={fadeInDown}
                                initial="hidden"
                                animate="show"
                            >
                                Rodex Music Platform
                            </motion.div>    
                            <motion.div className="rodex-text-2"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >
                                Explore Limitless Possibilities
                            </motion.div>
                            <NavLink to="/" className="rodex-home-link-2 wow fadeInUp">Home</NavLink>         
                        </div>    
                    </div>    
                </div>    
            </div>
        </React.Fragment>
    )
}

export default SignUp
