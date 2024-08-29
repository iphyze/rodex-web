import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import AdekunleGold from '../../assets/images/adekunle-gold.jpg';
import Nice from '../../assets/images/9ice.jpg';
import Asake from '../../assets/images/asake.jpg';
import BurnaBoy from '../../assets/images/burna-boy.jpg';
import Ayra from '../../assets/images/ayra.jpg';
import Chandler from '../../assets/images/chandler.jpg';
import Chike from '../../assets/images/chike.jpeg';
import Falz from '../../assets/images/falz.jpg';
import fireboyImage from '../../assets/images/fireboy.jpg';
import joeboyImage from '../../assets/images/joeboy.jpg';
import mosesBlissImage from '../../assets/images/moses-bliss.jpg';
import johnImage from '../../assets/images/john.jpg';
import wandeCoalImage from '../../assets/images/wande-coal.jpg';
import lilKeshImage from '../../assets/images/lil-kesh.jpg';
import nathImage from '../../assets/images/nath.jpg';
import wizkidImage from '../../assets/images/wizkid.jpg';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';


const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    show: { 
    opacity: 1, 
    y: 0,
    transition: {
    duration: 0.8
    } 
}
};

const fadeIn = {
    hidden: { opacity: 0 },
    show: { 
    opacity: 1, 
    transition: {
    delay: 1
    },
}
};

const SwiperCoverlowSlides = () => {
  const { theme } = useContext(ThemeContext);

  return (
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={4}
        spaceBetween={0}
        breakpoints={{
            768: {
                slidesPerView: 3,
            },
            320: {
              slidesPerView: 1.7,
            },
          }}
        coverflowEffect={
            {
                rotate: 5,
                stretch: 10,
                depth: 100,
                modifier: 3,
            }
        }
        pagination={{el:'.home-swiper-pagination', clickable: true}}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className='home-swiper-container'
      >
        <SwiperSlide className='main-swipe-box' style={{backgroundImage: `url(${mosesBlissImage})`}}>

            <NavLink className='swipe-trending-link'>

                <div className='swipe-trend-imgbox'>
                    <img src={mosesBlissImage} alt="artist-img" className='swipe-trend-img'/>
                </div>  
                <div className='swipe-trend-textBox'>
                    <div className='swipe-trend-artistName'>Moses Bliss</div>
                    <div className='swipe-trend-songTitle'>Daddy wey dey pamper</div>
                </div>

            </NavLink>

        </SwiperSlide>

        <SwiperSlide className='main-swipe-box' style={{backgroundImage: `url(${Falz})`}}>
            <NavLink className='swipe-trending-link'>

                <div className='swipe-trend-imgbox'>
                    <img src={Falz} alt="artist-img" className='swipe-trend-img'/>
                </div>  
                <div className='swipe-trend-textBox'>
                    <div className='swipe-trend-artistName'>Moses Bliss</div>
                    <div className='swipe-trend-songTitle'>Daddy wey dey pamper</div>
                </div>

            </NavLink>
        </SwiperSlide>

        <SwiperSlide className='main-swipe-box' style={{backgroundImage: `url(${wandeCoalImage})`}}>
            <NavLink className='swipe-trending-link'>

                <div className='swipe-trend-imgbox'>
                    <img src={wandeCoalImage} alt="artist-img" className='swipe-trend-img'/>
                </div>  
                <div className='swipe-trend-textBox'>
                    <div className='swipe-trend-artistName'>Moses Bliss</div>
                    <div className='swipe-trend-songTitle'>Daddy wey dey pamper</div>
                </div>

            </NavLink>
        </SwiperSlide>

        <SwiperSlide className='main-swipe-box' style={{backgroundImage: `url(${AdekunleGold})`}}>
            <NavLink className='swipe-trending-link'>

                <div className='swipe-trend-imgbox'>
                    <img src={AdekunleGold} alt="artist-img" className='swipe-trend-img'/>
                </div>  
                <div className='swipe-trend-textBox'>
                    <div className='swipe-trend-artistName'>Moses Bliss</div>
                    <div className='swipe-trend-songTitle'>Daddy wey dey pamper</div>
                </div>

            </NavLink>
        </SwiperSlide>

        <SwiperSlide className='main-swipe-box' style={{backgroundImage: `url(${Nice})`}}>
            <NavLink className='swipe-trending-link'>

                <div className='swipe-trend-imgbox'>
                    <img src={Nice} alt="artist-img" className='swipe-trend-img'/>
                </div>  
                <div className='swipe-trend-textBox'>
                    <div className='swipe-trend-artistName'>Moses Bliss</div>
                    <div className='swipe-trend-songTitle'>Daddy wey dey pamper</div>
                </div>

            </NavLink>
        </SwiperSlide>

        {/* Add more slides here */}
        <div className='home-swiper-pagination'></div>
      </Swiper>
  );
};

export default SwiperCoverlowSlides;
