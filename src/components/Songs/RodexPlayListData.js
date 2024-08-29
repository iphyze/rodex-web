import adekunleGoldImg from '../../assets/images/adekunle-gold.jpg';
import chandlerImg from '../../assets/images/chandler.jpg';
import johnImg from '../../assets/images/john.jpg';
import mosesBlissImg from '../../assets/images/moses-bliss.jpg';
import tuFaceImg from '../../assets/images/tu-face.jpg';
import MainSong from '../../assets/audio/faded.mp3';

export const rodexPlaylistSongs = [
  {
    _id: 6,
    song_Id: 1,
    title: "Sade",
    artist: "Adekunle Gold",
    genre: "Afrosounds",
    time: "3:49",
    image: adekunleGoldImg,
    description: 'Brief Description',
    url: MainSong,
    // url: 'https://m.naijapals.com/song.php?_id=46310&key=d4a1848dd3b3b51f3c84ba88c4cd96feca04c6a1&usemp3=1',
  },
  {
    _id: 7,
    song_Id: 2,
    title: "Olorun A'gbaye",
    artist: "Chandler M. ft.",
    genre: "Gospel",
    time: "3:30",
    image: chandlerImg,
    description: 'Brief Description',
    url: MainSong,
    // url: 'https://cdn.trendybeatz.com/audio/Nathaniel-Bassey-Olorun-Agbaye-You-Are-Mighty-(TrendyBeatz.com).mp3',
  },
  {
    _id: 8,
    song_Id: 3,
    title: "All of Me",
    artist: "John Legend",
    genre: "R&B",
    time: "2:15",
    image: johnImg,
    description: 'Brief Description',
    url: MainSong,
    // url: 'https://highlifeng.com.ng/swahilisongs/wp-content/uploads/2024/02/John_Legend_-_-_All_Of_Me.mp3',
  },
  {
    _id: 9,
    song_Id: 4,
    title: "Pamper",
    artist: "Moses Bliss",
    genre: "Gospel",
    time: "4:30",
    image: mosesBlissImg,
    description: 'Brief Description',
    url: MainSong,
    // url: 'https://www.gospelwheel.com/wp-content/uploads/2023/07/Moses-Bliss-Daddy-Wey-Dey-Pamper-Gbedu-Version-gospelwheel.com_.mp3?_=1',
  },
  {
    _id: 10,
    song_Id: 5,
    title: "African Queen",
    artist: "Tu Face",
    genre: "R&B",
    time: "7:23",
    image: tuFaceImg,
    description: 'Brief Description',
    url: MainSong,
    // url: 'https://cdn.trendybeatz.com/audio/2Baba-_Idibia-African-Queen-[TrendyBeatz.com].mp3',
  }
];


export const fadeInUp = {
  h_idden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8
    } 
  },
};

export const fadeIn = {
  h_idden: { opacity: 0, x: 50 },
  show: { 
    opacity: 1,
    x: 0, 
    transition: {
      delay: 1,
      duration: 0.8
    },
  },
};

export const fadeInRight = {
  h_idden: { opacity: 0, x: '50px' },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 1
    } 
  },
};

export const fadeInUpTwo = {
  h_idden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay: 1,
    }, 
  },
};
