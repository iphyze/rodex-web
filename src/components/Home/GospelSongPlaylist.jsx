import { useState, useEffect } from 'react';
import axios from 'axios';


const GospelSongPlaylist = () => {

  const [gospelPlaylist, setGospelPlaylist] = useState([]);
  const [isGospelLoading, setIsGospelLoading] = useState(false);
  const [isGospelError, setIsGospelError] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');


  useEffect(() => {
    setIsGospelLoading(true);

      axios.get('https://rodex-server.vercel.app/api/music/getAllPlaylists', {
          headers: { Authorization: `Bearer ${rodexAppToken}` }
        }).then(response => {


            const adminUser = response.data.find(user => user._id === '6659bea62bbc40c218c7fcca');  

            if (adminUser) {
                const gospelPlaylist = adminUser.playlists.find(playlist => playlist.title === 'Gospel');

                if (gospelPlaylist) {

                    const validTracks = gospelPlaylist.tracks.filter(track => track && track._id);
                    
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

                    setGospelPlaylist(formattedData);
                    setIsGospelError(false);

                }
            }
        })
        .catch(err => {
          //console.log(err);
          setIsGospelError('Failed to load music. Please check your network and try again later..');
          setIsGospelLoading(false);
        })
        .finally(() => {
          setIsGospelLoading(false);
        });
    }, [rodexAppToken]);

  return { gospelPlaylist, isGospelLoading, isGospelError };
}

export default GospelSongPlaylist;
