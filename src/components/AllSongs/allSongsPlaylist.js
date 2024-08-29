import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllSongs = () => {
  const [allSongsPlaylist, setAllSongsPlaylist] = useState([]);
  const [isSongLoading, setIsSongLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');

  useEffect(() => {
    setIsSongLoading(true);

    axios.get('https://rodex-server.vercel.app/api/music/tracks/admin', {
      headers: { Authorization: `Bearer ${rodexAppToken}` }
    })
    .then(response => {
      const formattedData = response.data.map(item => ({
        _id: item._id,
        songId: item._id,
        title: item.title,
        artist: item.artist,
        genre: item.genre,
        duration: item.duration,
        image: item.image,
        url: item.url
      }));
      setAllSongsPlaylist(formattedData);
      setIsError(false);
    })
    .catch(err => {
      setIsError('Failed to load music. Please check your network and try again later.');
      setIsSongLoading(false);
    })
    .finally(() => {
      setIsSongLoading(false);
    });
  }, [rodexAppToken]);

  return { allSongsPlaylist, isSongLoading, isError };
}

export default useAllSongs;
