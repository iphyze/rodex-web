import { useState, useEffect } from 'react';
import axios from 'axios';


const PlayListData = () => {

  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const rodexAppToken = localStorage.getItem('rodexAppToken');


  useEffect(() => {
    setIsLoading(true);

      axios.get('https://rodex-server.vercel.app/api/music/tracks/admin', {
          headers: { Authorization: `Bearer ${rodexAppToken}` }
        }).then(response => {


          // const data = response.data
          //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          // const formattedData = data.map(item => ({
          //   _id: item._id,
          //   songId: item._id,
          //   title: item.title,
          //   artist: item.artist,
          //   genre: item.genre,
          //   duration: item.duration,
          //   image: item.image,
          //   url: item.url
          // }));

          // const data = response.data
          // .filter(song => new Date(song.createdAt) >= twoWeeksAgo)
          // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
          // const formattedData = data.map(item => ({
          //   _id: item._id,
          //   songId: item._id,
          //   title: item.title,
          //   artist: item.artist,
          //   genre: item.genre,
          //   duration: item.duration,
          //   image: item.image,
          //   url: item.url
          // }));


          const now = new Date();
          const twoWeeksAgo = new Date(now.setDate(now.getDate() - 20000));

          const data = response.data
          .filter(song => new Date(song.createdAt) >= twoWeeksAgo)
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); 
          const formattedData = data.map(item => ({
            _id: item._id,
            songId: item._id,
            title: item.title,
            artist: item.artist,
            genre: item.genre,
            duration: item.duration,
            image: item.image,
            url: item.url
          }));

          //const dataSlice = formattedData.slice(0, 10); 


          setPlaylistSongs(formattedData);
          setIsError(false);
        })
        .catch(err => {
          //console.log(err);
          setIsError('Failed to load music. Please check your network and try again later..');
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [rodexAppToken]);

  return { playlistSongs, isLoading, isError };
}

export default PlayListData;
