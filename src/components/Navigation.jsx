import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MENU_LOGO from '../assets/images/rodex-logo.png';
import { useTheme } from '../ThemeContext';
import useAuth from './useAuth';

const Navigation = ({ visible, closeHandler }) => {
  const { theme, defaultEnabled, handleToggleDefault, handleToggleTheme } = useTheme();
  const { rodexAppToken, logout } = useAuth();
  const navRef = useRef();
  const showClass = visible ? 'show' : '';
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)
        && !event.target.classList.contains('menu-button-open') || event.target.classList.contains('menu-link')
        || event.target.classList.contains('menu-icon')
        || event.target.classList.contains('menu-text')
        && window.innerWidth <= 960) {
        closeHandler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeHandler]);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <React.Fragment>
      <div className={`nav-container ${showClass}`} ref={navRef} role="navigation" aria-label="Main Navigation">
        <NavLink to="/" className="logo">
          <div className="logo-text">RODEX</div>
          <img src={MENU_LOGO} className="rodex-logo" />
        </NavLink>

        <div className="browse-music">Browse Music</div>

        <div className="menu-container">
          <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
            <span className="menu-icon fas fa-home"></span>
            <span className="menu-text">Home</span>
          </NavLink>

          <NavLink to="/rodex" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
            <span className="menu-icon fas fa-headphones"></span>
            <span className="menu-text">Rodex Mix</span>
          </NavLink>

          <NavLink to="/trending" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
            <span className="menu-icon fas fa-fire"></span>
            <span className="menu-text">Trending</span>
          </NavLink>

          <NavLink to="/artist" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
            <span className="menu-icon fas fa-microphone"></span>
            <span className="menu-text">Artist</span>
          </NavLink>

          <NavLink to="/playlist" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
            <span className="menu-icon fas fa-list-ul"></span>
            <span className="menu-text">Playlist</span>
          </NavLink>

          <NavLink to="/spotlight" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
            <span className="menu-icon fas fa-bullseye"></span>
            <span className="menu-text">Spotlight</span>
          </NavLink>

          {rodexAppToken &&
            <a className={'menu-link menu-link menu-hover'} onClick={handleLogout}>
              <span className="menu-icon fas fa-sign-out"></span>
              <span className="menu-text">Logout</span>
            </a>
          }
        </div>

        <div className="browse-music">Pages</div>

        <div className="menu-container menu-container-two">
          <NavLink to="/about" className="menu-nav-link">About</NavLink>
          {/* <NavLink to="#" className="menu-nav-link">Services</NavLink> */}
          <NavLink to="/download" className="menu-nav-link">Download</NavLink>
          <NavLink to="/privacy" className="menu-nav-link">Privacy</NavLink>
        </div>

        <div className="dark-mode-toggle">
          <label className='dark-mode-label' htmlFor="darkModeToggle">Dark Mode</label>
          <input type="checkbox" checked={theme === 'dark'}
            onChange={handleToggleTheme}
            disabled={defaultEnabled}
            className="darkcheckbox"
            id="darkModeToggle" />
        </div>

        <div className="dark-mode-toggle-2">
          <label className='dark-mode-label' htmlFor="systemDefault">System's Default</label>
          <input type="checkbox"
            checked={defaultEnabled}
            onChange={handleToggleDefault}
            className="darkcheckbox"
            id="systemDefault"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navigation;
