import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">

    
        <div className="footer-links">
        <a href="#" className="fab fa-facebook-f icon-link-text"></a>    
        <a href="#" className="fab fa-instagram icon-link-text"></a>    
        <a href="#" className="fab fa-twitter icon-link-text"></a>    
        </div>    

        <div className="footer-links">
        <NavLink to="/about" className="footer-link-text">About</NavLink>    
        {/* <NavLink to="/service" className="footer-link-text">Services</NavLink>*/}
        <NavLink to="/download" className="footer-link-text">Download</NavLink>    
        <NavLink to="/privacy" className="footer-link-text">Privacy</NavLink>    
        </div>    
            
        <div className="rights-reserved">&copy; 2024 Rodex - All Rights Reserved</div>    
    
    </div>
  )
}

export default Footer