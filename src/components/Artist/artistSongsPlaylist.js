import { useState, useEffect } from 'react';
import axios from 'axios';

const ArtistPlaylist = (artistId) => {
  const [artistSongsPlaylist, setArtistSongsPlaylist] = useState([]);
  const [isPlaylistSongLoading, setIsPlaylistSongLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');

  useEffect(() => {

    if (!artistId) return;

    setIsPlaylistSongLoading(true);

    axios.get('https://rodex-server.vercel.app/api/artist/getArtists/', {
      headers: { Authorization: `Bearer ${rodexAppToken}` }
    })
    .then(artistResponse => {
      const mainArtist = artistResponse.data.find(artist => artist._id === artistId);

      if (mainArtist) {
        return axios.get('https://rodex-server.vercel.app/api/music/tracks/admin', {
          headers: { Authorization: `Bearer ${rodexAppToken}` }
        }).then(songsResponse => {
          const artistSongs = songsResponse.data.filter(song => song.artist === mainArtist.artist);
          const formattedData = artistSongs.map(song => ({
            _id: song._id,
            songId: song._id,
            title: song.title,
            artist: song.artist,
            genre: song.genre,
            duration: song.duration,
            image: song.image,
            url: song.url
          }));
          setArtistSongsPlaylist(formattedData);
          setIsPlaylistSongLoading(false);
        }).catch(error => {
          console.error(error);
          setIsError('Failed to load music. Please check your network and try again later.');
          setIsPlaylistSongLoading(false);
        });
      } else {
        setIsError('Artist not found.');
        setIsPlaylistSongLoading(false);
      }
    })
    .catch(error => {
      console.error(error);
      setIsError('Failed to load music. Please check your network and try again later.');
      setIsPlaylistSongLoading(false);
    });

  }, [rodexAppToken, artistId]);

  return { artistSongsPlaylist, isPlaylistSongLoading, isError };
}

export default ArtistPlaylist;
