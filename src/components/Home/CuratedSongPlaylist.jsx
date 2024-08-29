import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePlaylist } from './PlaylistContext';


const CuratedSongPlaylist = () => {
  const [curatedPlaylist, setCuratedPlaylist] = useState([]);
  const [isCuratedLoading, setIsCuratedLoading] = useState(false);
  const [isCuratedError, setIsCuratedError] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');
  const { playlistTitle, setPlaylistTitle, cplaylistId, setcPlaylistId } = usePlaylist();

  useEffect(() => {
    
    if (playlistTitle && cplaylistId) {
      setIsCuratedLoading(true);

      axios.get('https://rodex-server.vercel.app/api/music/getAllPlaylists', {
        headers: { Authorization: `Bearer ${rodexAppToken}` }
      })
      .then(response => {
        const adminUser = response.data.find(user => user.role === 'admin');

        if (adminUser) {
          const curatedPlaylist = adminUser.playlists.find(playlist => playlist.title === playlistTitle && playlist._id === cplaylistId);

          if (curatedPlaylist) {
            const validTracks = curatedPlaylist.tracks.filter(track => track && track._id);
            
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

            setCuratedPlaylist(formattedData);
            setIsCuratedError(false);
          }
        }
      })
      .catch(err => {
        setIsCuratedError('Failed to load music. Please check your network and try again later.');
        setIsCuratedLoading(false);
      })
      .finally(() => {
        setIsCuratedLoading(false);
      });
    }

    //console.log(curatedPlaylist);


  }, [rodexAppToken, playlistTitle, cplaylistId, setCuratedPlaylist]);

  return { curatedPlaylist, isCuratedLoading, isCuratedError };
};

export default CuratedSongPlaylist;
