import React, { useState } from 'react';
import { useMusicPlayer } from '../MusicPlayerContext';

const AddSong = ({ openHandler, onMusicClick, isAdmin}) => {
  const [scroll, setScroll] = useState(0);

  const { currentSong, isPlaying } = useMusicPlayer();

  const handleScroll = (event) => {
    setScroll(event.target.scrollTop);
  };

  return (
    <React.Fragment>
      Add Songs
    </React.Fragment>
  );
};

export default AddSong;
