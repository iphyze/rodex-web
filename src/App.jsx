import React, { useState, useEffect, useRef } from 'react';
import {useTheme} from './ThemeContext';
import './App.css';
import './Responsive.css';
import './assets/fontawesome/css/all.css';
import './assets/fontawesome/css/all.min.css';
import './assets/fontawesome/css/fontawesome.css';
import './assets/fontawesome/css/fontawesome.min.css';
import './assets/fontawesome/css/brands.css';
import './assets/fontawesome/css/brands.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { MusicPlayerProvider, useMusicPlayer } from './components/MusicPlayerContext';
import { ArtistIdProvider } from './components/ArtistIdContext';
import { ActiveSongProvider } from './components/ActiveSongContext';
import Navigation from './components/Navigation';
import ContentContainer from './components/ContentContainer';
import ModalBox from './components/ModalBox';
import MusicPlayer from './components/MusicPlayer';
import MainMusicPlayer from './components/MainMusicPlayer';
import Login from './components/Others/Login';
import SignUp from './components/Others/SignUp';
import ForgotPassword from './components/Others/ForgotPassword';
import Verify from './components/Others/Verify';
import About from './components/Others/About';
import Download from './components/Others/Download';
import NewFeature from './components/NewFeature';
import Privacy from './components/Others/Privacy';
import Account from './components/Others/Account';
import { PlaylistProvider } from './components/Home/PlaylistContext';
import useAuth from './components/useAuth';


const App = () => {

  const { theme, defaultEnabled, handleToggleDefault, handleToggleTheme } = useTheme();
  const [navVisible, setNavVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [showPlaylistAdd, setShowPlaylistAdd] = useState(false);
  const {rodexAppToken} = useAuth();

  // const [isPlayerVisible, setIsPlayerVisible] = useState(true);


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const onMusicClick = (music) => {
    setSelectedMusic(music);
    toggleModal();
  };


  const toggleMusicPlayer = () => {
    setShowMusicPlayer(!showMusicPlayer);
  }



  const handlePlaylistAdd = () => {
    setShowPlaylistAdd(true);
  
    setTimeout(() => {
      setShowPlaylistAdd(false);
    }, 2000); // 5000 milliseconds = 5 seconds
  };
  


  
  
  return (
    <ArtistIdProvider>
      <PlaylistProvider>
      <MusicPlayerProvider>
        <ActiveSongProvider>
            <Router basename="/">

              <div className={`new-feature ${showPlaylistAdd && 'show-new-feature'}`}>This feature will be out soon!</div>
                
                <div className='fas fa-angle-up music-player hide-music-show-btn' onClick={toggleMusicPlayer}></div>
                <MainMusicPlayer showMusicPlayer={showMusicPlayer} toggleShow={toggleMusicPlayer}/>
                <MusicPlayer/>
                <Routes>

                 {!rodexAppToken && 
                 
                  <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />}/>
                  <Route path="/verify" element={<Verify />} />
                  </>

                 } 

                  <Route path="/about" element={<About />} />
                  <Route path="/download" element={<Download />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={
                    <div className="container">
                          <div className="main-container">
                              <Navigation visible={navVisible} closeHandler={() => setNavVisible(false)}/>
                              <ContentContainer 
                                  openHandler={() => setNavVisible(currentNavVisible => !currentNavVisible)} 
                                  toggleModal={toggleModal}
                                  onMusicClick={onMusicClick}
                                  handlePlaylistAdd={handlePlaylistAdd}
                                  showPlaylistAdd={showPlaylistAdd}
                                  setShowMusicPlayer={setShowMusicPlayer}
                              />
                              <ModalBox isModalVisible={isModalVisible} handleModalClose={toggleModal} music={selectedMusic}/> 
                          </div>
                      </div>
                  } />


                  
                </Routes>
            </Router>
        </ActiveSongProvider>
      </MusicPlayerProvider>
      </PlaylistProvider>
    </ArtistIdProvider>
  );
}

export default App;