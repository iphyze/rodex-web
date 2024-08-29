import React, { useState } from 'react';
import Home from './Home/Home';
import Trending from './Trending/Trending';
import Rodex from './Rodex/Rodex';
import Playlist from './Playlist/Playlist';
import RodexPlaylistSongs from './Rodex/RodexPlaylistSongs';
import Songs from './Songs/Songs';
import Artist from './Artist/Artist';
import ArtistSingle from './Artist/ArtistSingle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContentNavContainer from './ContentNavContainer';
import Footer from './Footer';
import { useMusicPlayer } from './MusicPlayerContext';
import CuratedPlaylistSongs from './Playlist/CuratedPlaylistSongs';
import PersonalPlaylistSongs from './Playlist/PersonalPlaylistSongs';

const ContentContainer = ({ openHandler, onMusicClick, isAdmin, handlePlaylistAdd, showPlaylistAdd, setShowMusicPlayer}) => {
  const [scroll, setScroll] = useState(0);

  const { currentSong, isPlaying } = useMusicPlayer();

  const handleScroll = (event) => {
    setScroll(event.target.scrollTop);
  };

  return (
    <React.Fragment>
      <div className="content-container" onScroll={handleScroll}>
        <ContentNavContainer onOpen={openHandler} isAdmin={isAdmin}/>
        <div className="view-container" id="view-container">
          <Routes>
            <Route path="/" exact element={<Home onMusicClick={onMusicClick}/>} />
            <Route path="/trending" element={<Trending/>} />
            <Route path="/rodex" element={<Rodex />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/rodex/:playlistId" element={<RodexPlaylistSongs handlePlaylistAdd={handlePlaylistAdd}/>} />
            <Route path="/playlist/:curatedId" element={<CuratedPlaylistSongs />} />
            <Route path="/playlist/userplaylist/:personalId" element={<PersonalPlaylistSongs />} />
            <Route path="/songs/:id" element={<Songs />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/artist/:id" element={<ArtistSingle />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <style>{`
        .top-menu-container {
          transition: background-color 0.3s linear;
          background-color: rgba(255, 255, 255, ${scroll >= 50 ? 1 : 0.1});
        }
        body.dark .top-menu-container {
          transition: background-color 0.3s linear;
          background-color: ${scroll >= 50 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)'};
        }
      `}</style>
    </React.Fragment>
  );
};

export default ContentContainer;
