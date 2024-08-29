import React, { useState, useEffect, useRef } from 'react';
import Placeholder_Img from '../assets/images/placeholder-image.jpg';
import { NavLink } from 'react-router-dom';


const ModalBox = ({ isModalVisible, handleModalClose, music }) => {

    // const modalRef = useRef();

    // useEffect(() => {
    //     function handleClickOutsideModal(event) {
    //       if (modalRef.current && !modalRef.current.contains(event.target)) {
    //           handleModalClose();
    //       }
    //     }
      
    //     document.addEventListener('mousedown', handleClickOutsideModal);
    //     return () => document.removeEventListener('mousedown', handleClickOutsideModal);  
    //   }, [handleModalClose]);


  return (
    <div className={`modal ${isModalVisible ? 'show-modal' : ''}`} id="myModal">
        <div className="modal-content">
            <div className="modal-flexbox">
                <div className="modal-imgbox wow fadeIn">
                    <img src={isModalVisible ? music?.imageSrc : Placeholder_Img} className="modal-img" alt="Modal Image"/>
                </div>
                <div className="modal-textbox wow fadeIn">
                    <div className="modal-text-1">Create a free Rodex account and dive into the world of music</div>
                    <NavLink className="modal-text-2" to="/signup">Free Sign Up</NavLink>
                    <NavLink className="modal-text-3" to="/download">Download Mobile App</NavLink>
                    <div className="modal-text-4">Do you already have an account? <NavLink className="modal-txtlink" to="/login">Log In</NavLink></div>
                </div>
            </div>
            <div className="close-modal" onClick={handleModalClose}>Close</div>
        </div>
    </div>
  )
}

export default ModalBox