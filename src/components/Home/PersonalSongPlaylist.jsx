import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePlaylist } from './PlaylistContext';


const PersonalSongPlaylist = () => {
  const [allPersonalPlaylist, setAllPersonalPlaylist] = useState([]);
  const [isPersonalLoading, setIsPersonalLoading] = useState(false);
  const [isPersonalError, setIsPersonalError] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const userId = localStorage.getItem('userAdminId');
  const { personalPlaylistTitle, setPersonalPlaylistTitle, personalPlaylistId, setPersonalPlaylistId } = usePlaylist();

  useEffect(() => {
    
    if (personalPlaylistTitle && personalPlaylistId) {
      setIsPersonalLoading(true);

      axios.get('https://rodex-server.vercel.app/api/music/getAllPlaylists', {
        headers: { Authorization: `Bearer ${rodexAppToken}` }
      })
      .then(response => {
        const personalUser = response.data.find(user => user.role === 'user' && user.userId === userId);

        if (personalUser) {
          const personalPlaylist = personalUser.playlists.find(playlist => playlist.title === personalPlaylistTitle);

          if (personalPlaylist) {
            const validTracks = personalPlaylist.tracks.filter(track => track && track._id);
            
            const formattedData = validTracks.map(item => ({
              _id: item._id,
              songId: item._id,
              title: item.title,
              artist: item.artist,
              genre: item.genre,
              duration: item.duration,
              image: item.image,
              url: item.url
            }));

            formattedData.reverse(); // Reverse the array

            setAllPersonalPlaylist(formattedData);
            setIsPersonalError(false);
          }
        }
      })
      .catch(err => {
        setIsPersonalError('Failed to load music. Please check your network and try again later.');
        setIsPersonalLoading(false);
      })
      .finally(() => {
        setIsPersonalLoading(false);
      });
    }

    //console.log(personalPlaylist);


  }, [rodexAppToken, personalPlaylistTitle, personalPlaylistId, setAllPersonalPlaylist]);

  return { allPersonalPlaylist, isPersonalLoading, isPersonalError };
};

export default PersonalSongPlaylist;
