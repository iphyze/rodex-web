import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from './useAuth';
import Menu_LOGO from '../assets/images/rodex-logo.png';

const ContentNavContainer = ({ onOpen }) => {
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

  return (
    <div className="top-menu-container">
      <div className="top-menu-box">
        <NavLink to="/" className="logo hidden-logo">
          <div className="logo-text">RODEX</div>
          <img src={Menu_LOGO} className="rodex-logo" />
        </NavLink>
      </div>

      <div className="top-menu-box-two">
        {!rodexAppToken ? (
          <>
            <NavLink to="/signup" className='sign-up-btn'>Create Account</NavLink>
            <NavLink to="/login" className='log-in-btn'>Log In</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile" className='user-profile-btn theme-color fas fa-user-circle'></NavLink>
            <NavLink to="/settings" className='user-profile-btn fas fa-cog'></NavLink>
            {/* <NavLink to="/profile" className='sign-up-btn'>{firstName}</NavLink> */}
          </>
        )}
        <div className="menu-button-open fas fa-bars" onClick={onOpen}></div>
      </div>
    </div>
  );
}

export default ContentNavContainer;
