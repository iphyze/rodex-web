import adekunleGoldImg from '../../assets/images/adekunle-gold.jpg';
import chandlerImg from '../../assets/images/chandler.jpg';
import johnImg from '../../assets/images/john.jpg';
import mosesBlissImg from '../../assets/images/moses-bliss.jpg';
import tuFaceImg from '../../assets/images/tu-face.jpg';
import MainSong from '../../assets/audio/faded.mp3';

export const localPlaylistSongs = [
  {
    _id: 1,
    songid: 1,
    title: "Sade",
    artist: "Adekunle Gold",
    genre: "Afrosounds",
    time: "03:49",
    image: adekunleGoldImg,
    url: MainSong,
    //  url: 'https://m.naijapals.com/song.php?_id=46310&key=d4a1848dd3b3b51f3c84ba88c4cd96feca04c6a1&usemp3=1',
  },
  {
    _id: 2,
    songid: 2,
    title: "Olorun A'gbaye",
    artist: "Chandler M. ft.",
    genre: "Gospel",
    time: "03:30",
    image: chandlerImg,
    // url: MainSong,
    url: 'https://cdn.trendybeatz.com/audio/Nathaniel-Bassey-Olorun-Agbaye-You-Are-Mighty-(TrendyBeatz.com).mp3',
  },
  {
    _id: 3,
    songid: 3,
    title: "All of Me",
    artist: "John Legend",
    genre: "R&B",
    time: "02:15",
    image: johnImg,
    // url: MainSong,
    url: 'https://highlifeng.com.ng/swahilisongs/wp-content/uploads/2024/02/John_Legend_-_-_All_Of_Me.mp3',
  },
  {
    _id: 4,
    songid: 4,
    title: "Pamper",
    artist: "Moses Bliss",
    genre: "Gospel",
    time: "04:30",
    image: mosesBlissImg,
    // url: MainSong,
    url: 'https://www.gospelwheel.com/wp-content/uploads/2023/07/Moses-Bliss-Daddy-Wey-Dey-Pamper-Gbedu-Version-gospelwheel.com_.mp3?_=1',
  },
  {
    _id: 5,
    songid: 5,
    title: "African Queen",
    artist: "Tu Face",
    genre: "R&B",
    time: "07:23",
    image: tuFaceImg,
    // url: MainSong,
    url: 'https://cdn.trendybeatz.com/audio/2Baba-_Idibia-African-Queen-[TrendyBeatz.com].mp3',
  }
];