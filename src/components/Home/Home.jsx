import React, { useState, useEffect, useContext } from 'react';
import LocalHome from './LocalHome';
import LiveHome from './LiveHome';
import useAuth from '../useAuth';


const Home = ({ onMusicClick }) => {
  const { rodexAppToken } = useAuth();

  return (
 
  <React.Fragment> 
    {rodexAppToken ?  <LiveHome /> : <LocalHome onMusicClick={onMusicClick}/>}
  </React.Fragment>        
    
  )
}

export default Home;