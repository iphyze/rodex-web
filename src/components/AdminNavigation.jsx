import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MENU_LOGO from '../assets/images/rodex-logo.png';
import {useTheme} from '../ThemeContext';

const AdminNavigation = ({ visible, closeHandler, setIsAdmin }) => {

  const { theme, defaultEnabled, handleToggleDefault, handleToggleTheme } = useTheme();
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


  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  }


  return (
    <React.Fragment>      

      <div className={`nav-container ${showClass}`} ref={navRef} role="navigation" aria-label="Main Navigation">
        <NavLink to="/admin/home" className="logo">
        <div className="logo-text">RODEX</div>
        <img src={MENU_LOGO} className="rodex-logo"/>    
        </NavLink>

        <div className="menu-container">

        <NavLink to="/admin/home" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
        <span className="menu-icon fas fa-home"></span>
        <span className="menu-text">Home</span>
        </NavLink>

        <NavLink to="/admin/add" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
        <span className="menu-icon fas fa-plus"></span>
        <span className="menu-text">Add Song</span>
        </NavLink>


        <NavLink to="/admin/category" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
        <span className="menu-icon fas fa-drum"></span>
        <span className="menu-text">Category</span>
        </NavLink>


        <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
        <span className="menu-icon fas fa-users"></span>
        <span className="menu-text">Users</span>
        </NavLink>


        <NavLink to="/admin/playlist" className={({ isActive }) => isActive ? 'menu-link active-menu' : 'menu-link'}>
        <span className="menu-icon fas fa-microphone"></span>
        <span className="menu-text">Playlist</span>
        </NavLink>


        <a className={'menu-link menu-link menu-hover'} onClick={logout}>
        <span className="menu-icon fas fa-sign-out"></span>
        <span className="menu-text">Logout</span>
        </a>


        </div>

        <div className="dark-mode-toggle">
        <label className='dark-mode-label' htmlFor="darkModeToggle">Dark Mode</label>
        <input type="checkbox" checked={theme === 'dark'} 
        onChange={handleToggleTheme} 
        disabled={defaultEnabled} 
        className="darkcheckbox"
        id="darkModeToggle"/>
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

export default AdminNavigation;