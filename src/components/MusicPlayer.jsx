import React, { useState, useEffect, useRef } from 'react';
import { useMusicPlayer } from './MusicPlayerContext';
import Music_Pix from '../assets/images/music-placeholder.webp';
import { NavLink } from 'react-router-dom';
import { useActiveSong } from '../components/ActiveSongContext';

const formatTime = (time) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const MusicPlayer = () => {
  const [musicRange, setMusicRange] = useState(0);
  const { currentSong, isPlaying, togglePlayPause, setIsPlaying, playlist, setCurrentSong, audioRef, isShuffle, toggleShuffle, isRepeat, toggleRepeat } = useMusicPlayer();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSong, setActiveSong] = useActiveSong();
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    localStorage.setItem('isShuffle', JSON.stringify(isShuffle));
    localStorage.setItem('isRepeat', JSON.stringify(isRepeat));
  }, [isShuffle, isRepeat]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentSong && audioRef.current.src !== currentSong.url) {
      setIsLoading(true);
      audioRef.current.src = currentSong.url;
      audioRef.current.onloadeddata = () => {
        setIsLoading(false);
        if (isPlaying) {
          audioRef.current.play().catch(error => {
            console.error("Failed to play audio:", error);
          });
        }
      };
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      const handleWaiting = () => setIsBuffering(true);
      const handlePlaying = () => setIsBuffering(false);
      
      audioRef.current.addEventListener('waiting', handleWaiting);
      audioRef.current.addEventListener('playing', handlePlaying);
      
      return () => {
        audioRef.current.removeEventListener('waiting', handleWaiting);
        audioRef.current.removeEventListener('playing', handlePlaying);
      };
    }
  }, [audioRef]);
  
  useEffect(() => {
    const updatePlayerTime = () => {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      const percentage = (time / duration) * 100;
      setPercentage(percentage);
      const inputElement = document.getElementById('progress');
      if (inputElement) {
        inputElement.style.background = `linear-gradient(to right, #ff9900 0%, #ff9900 ${percentage}%, #dbdbdb ${percentage}%, #dbdbdb 100%)`;
      }
    };

    const setAudioData = () => {
      setDuration(audioRef.current.duration);
    };

    const handleSongEnd = () => {
      if (isRepeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.error("Failed to play audio:", error);
        });
      } else {
        playNextSong();
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updatePlayerTime);
      audioRef.current.addEventListener('loadedmetadata', setAudioData);
      audioRef.current.addEventListener('ended', handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updatePlayerTime);
        audioRef.current.removeEventListener('loadedmetadata', setAudioData);
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [audioRef, duration, isRepeat]);

  const handleChange = (e) => {
    const newTime = e.target.value;
    setMusicRange(newTime);
    audioRef.current.currentTime = newTime;
    const percentage = (newTime / duration) * 100;
    const inputElement = document.getElementById('progress');
    inputElement.style.background = `linear-gradient(to right, #ff9900 0%, #ff9900 ${percentage}%, #efefef ${percentage}%, #efefef 100%)`;
  };

  useEffect(() => {
    const input = document.getElementById('progress');
    if (input) {
      input.style.background = `linear-gradient(90deg, orange ${percentage}%, grey ${percentage}%)`;
    }
  }, [percentage, duration]);

  const playNextSong = () => {

    if (isRepeat) {
      // If repeat is active, just restart the current song
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Failed to play audio:", error);
        setIsLoadingError(true);
      });
      return;
    }


    if (!playlist || playlist.length === 0) {
      console.error("The playlist is not defined or is empty");
      return;
    }

    const currentSongIndex = playlist.findIndex(song => song?._id === currentSong?._id);

    if (currentSongIndex === -1) {
      console.error("The current song is not in the playlist");
      return;
    }

    let nextSongIndex;
    if (isShuffle) {
      do {
        nextSongIndex = Math.floor(Math.random() * playlist.length);
      } while (nextSongIndex === currentSongIndex);
    } else {
      nextSongIndex = (currentSongIndex + 1) % playlist.length;
    }

    const nextSong = playlist[nextSongIndex];

    setIsLoading(true);
    setIsLoadingError(false); // Reset the error state
    audioRef.current.src = nextSong ? nextSong.url : '';

    audioRef.current.onloadeddata = () => {
      setIsLoading(false);
      audioRef.current.play().catch(error => {
        console.error("Failed to play audio:", error);
        setIsLoadingError(true);
      });
    };

    setCurrentSong(nextSong);
    setActiveSong(nextSong?._id);
  };
  
  const playPreviousSong = () => {

    if (isRepeat) {
      // If repeat is active, just restart the current song
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Failed to play audio:", error);
        setIsLoadingError(true);
      });
      return;
    }

    if (!playlist || !playlist.length) {
      console.error("The playlist is not defined or is empty");
      return;
    }

    const currentSongIndex = playlist.findIndex(song => song?._id === currentSong?._id);

    if (currentSongIndex === -1) {
      console.error("The current song is not in the playlist");
      return;
    }

    let prevSongIndex;
    if (isShuffle) {
      do {
        prevSongIndex = Math.floor(Math.random() * playlist.length);
      } while (prevSongIndex === currentSongIndex);
    } else {
      prevSongIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    }

    const prevSong = playlist[prevSongIndex];

    setIsLoading(true);
    setIsLoadingError(false); // Reset the error state
    audioRef.current.src = prevSong ? prevSong.url : '';

    audioRef.current.onloadeddata = () => {
      setIsLoading(false);
      audioRef.current.play().catch(error => {
        console.error("Failed to play audio:", error);
        setIsLoadingError(true);
      });
    };

    setCurrentSong(prevSong);
    setActiveSong(prevSong?._id);
  };
  

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };


  return (
    <div className="music-placeholder-box">
      <div className="music-placholder-overlay">
        <div className="range-box-hold range-box-hold-two">
        <input type="range" value={currentTime} max={duration} id="progress" className="range-input" onChange={handleChange} />
        </div>
        <div className="mp-col-one">
          <div className="mp-col-img-box">
            <img src={currentSong?.image || Music_Pix} alt="now-playing-img" className="now-playing-img" />
          </div>
          <div className="mp-textbox">
            <div className="title-title">{currentSong?.title || 'Song Title'}</div>
            <div className="mp-artist">{currentSong?.artist || 'Artist'}</div>
          </div>
        </div>
        <div className="mp-col-two">
          <div className="mp-play-box">
            <div className={`fas fa-shuffle play-shuffle ${isShuffle ? 'play-shuffle-active' : ''}`} onClick={toggleShuffle}></div>
            <div className={`fas fa-repeat play-repeat ${isRepeat ? 'play-repeat-active' : ''}`} onClick={toggleRepeat}></div>
            <div className="fas fa-step-backward play-backward" onClick={playPreviousSong}></div>
            <div className="play-play" onClick={togglePlayPause}>
              {isLoading || isBuffering || isLoadingError ? (
                <span className='fas fa-spinner fa-spin'></span>
              ) : (
                <span className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></span>
              )}
            </div>
            <div className="fas fa-step-forward play-forward" onClick={playNextSong} role="button" aria-label="Play next song"></div>
            <div className="fas fa-heart play-heart"></div>
            <div className="fas fa-plus-circle play-volume-up"></div>
          </div>
        </div>
        <div className="mp-col-three">
          <div className="range-box">
            <span className="range-start">{formatTime(currentTime)}</span> - <span className="range-stop">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <audio ref={audioRef} controls style={{ display: 'none' }}>
        <source src={currentSong?.url.replace('.mp3', '.ogg')} type="audio/ogg" />
        <source src={currentSong?.url.replace('.mp3', '.wav')} type="audio/wav" />
        <source src={currentSong?.url.replace('.mp3', '.aac')} type="audio/aac" />
        <source src={currentSong?.url.replace('.mp3', '.flac')} type="audio/flac" />
        <source src={currentSong?.url.replace('.mp3', '.m4a')} type="audio/m4a" />
        <source src={currentSong?.url.replace('.mp3', '.mp3')} type="audio/mpeg" />
        <source src={currentSong?.url.replace('.mp3', '.webm')} type="audio/webm" />
        <source src={currentSong?.url.replace('.mp3', '.aiff')} type="audio/aiff" />
      </audio>
    </div>
  );
};

export default MusicPlayer;
