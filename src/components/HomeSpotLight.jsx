import React from 'react'
import jonathanImage from '../assets/images/jonathan.jpg';
import davidoImage from '../assets/images/davido.jpg';
import oritsefemiImage from '../assets/images/oritsefemi.jpeg';
import dareImage from '../assets/images/dare.jpg';
import olamideImage from '../assets/images/olamide.jpg';
import rihannaImage from '../assets/images/rihanna.jpg';
import beyonceImage from '../assets/images/beyonce.jpg';
import { NavLink } from 'react-router-dom';

const HomeSpotLight = () => {

    const spotlightData = [
        {
          number: 1,
          artist: 'Jonathan MacReynold',
          songTitle: 'Cycles',
          imageSrc: jonathanImage,
        },
        {
          number: 2,
          artist: 'Davido',
          songTitle: 'Unavailable',
          imageSrc: davidoImage,
        },
        {
          number: 3,
          artist: 'Oritse Femi',
          songTitle: 'Mercies of the Lord',
          imageSrc: oritsefemiImage,
        },
        {
          number: 4,
          artist: 'Dare',
          songTitle: 'Not the girl',
          imageSrc: dareImage,
        },
        {
          number: 5,
          artist: 'Olamide',
          songTitle: 'Eni Duro',
          imageSrc: olamideImage,
        },
        {
          number: 6,
          artist: 'Rihanna',
          songTitle: 'Unfaithful',
          imageSrc: rihannaImage,
        },
        {
          number: 7,
          artist: 'Beyonce',
          songTitle: 'Radio',
          imageSrc: beyonceImage,
        },
      ];

  return (
    <React.Fragment>

    <div className="trender-spot-heading">Spotlight</div>    
        
        <div className="trender-spot-subtext">
        These are 7 of the best upcoming artists in the music industry!    
        </div>    
                
        <div className="t-spotlight-wrapper">
        
        {spotlightData.map((item, index) => (
            <NavLink to={`/spotlight/${item.number}`} className="t-spotlight-box" key={index}>
            <div className="t-spotlight-number">{item.number}</div>
            <div className="t-spotlight-imgbox">
                <img src={item.imageSrc} className="t-spotlight-img" alt="t-spotlight-img" />
            </div>
            <div className="t-spotlight-textbox">
                <div className="t-st-artistname">{item.artist}</div>
                <div className="t-st-song-title">{item.songTitle}</div>
            </div>
            <div className="t-st-music-icon fas fa-headphones"></div>
            </NavLink>
        ))}    
            
            
        </div> 

    </React.Fragment>
  )
}

export default HomeSpotLight