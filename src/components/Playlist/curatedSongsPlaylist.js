import { useState, useEffect } from 'react';
import axios from 'axios';

const RodexPlaylist = (playlistId) => {
  const [rodexSongsPlaylist, setRodexSongsPlaylist] = useState([]);
  const [isRodexPlaylistSongLoading, setIsRodexPlaylistSongLoading] = useState(false);
  const [isRodexError, setIsRodexError] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');

  useEffect(() => {

    //if (!playlistId) return;

    setIsRodexPlaylistSongLoading(true);

    axios.get('https://rodex-server.vercel.app/api/music/rodexmix', {headers: { Authorization: `Bearer ${rodexAppToken}` }}).then(response => {
      const mainPlaylist = response.data.find(playlist => playlist._id === playlistId);
    
      if(mainPlaylist){

        const playlistData = mainPlaylist.tracks.map(song => ({
            _id: song._id,
            songId: song._id,
            title: song.title,
            artist: song.artist,
            genre: song.genre,
            duration: song.duration,
            image: song.image,
            url: song.url
        }));

        setRodexSongsPlaylist(playlistData);
        setIsRodexPlaylistSongLoading(false);
        // console.log(playlistData);
      }else {
        setIsRodexError('Artist not found.');
        setIsRodexPlaylistSongLoading(false);
        }
    })
    .catch(error => {
      console.error(error);
      setIsRodexError('Failed to load music. Please check your network and try again later.');
      setIsRodexPlaylistSongLoading(false);
    });

  }, [rodexAppToken, playlistId]);

  return { rodexSongsPlaylist, isRodexPlaylistSongLoading, isRodexError };
}

export default RodexPlaylist;
