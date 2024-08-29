import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMusicPlayer } from './MusicPlayerContext';
import Ahome from './Admin/Home';
import AddSong from './Admin/AddSong';
import ContentNavContainer from './ContentNavContainer';

const AdminContentContainer = ({ openHandler, onMusicClick, isAdmin, setIsAdmin}) => {
  const [scroll, setScroll] = useState(0);

  const { currentSong, isPlaying } = useMusicPlayer();

  const handleScroll = (event) => {
    setScroll(event.target.scrollTop);
  };

  return (
    <React.Fragment>
      <div className="content-container" onScroll={handleScroll}>
      <ContentNavContainer onOpen={openHandler} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
        <div className="view-container" id="view-container">
          <Routes>
            <Route path="/admin/home" exact element={<Ahome />} />
            <Route path="/admin/add" element={<AddSong />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminContentContainer;
