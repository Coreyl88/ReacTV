import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { img_500, unavailable } from '../config/config'
import './SingleModal.css';
import Carousel from '../Carousel/Carousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: "70%",
  height: "65%",
  transform: 'translate(-50%, -50%)',
  bgcolor: 'steelblue',
  border: '1px solid #282c34',
  borderRadius: 5,
  p: 4, 
};
// Passing from Single.js 
export default function SingleModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const [flick, setFlick] = useState()
  
  const handleOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  }

  const fetchModal = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

    setFlick(data)
  };

  useEffect(() => {
    fetchModal();
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      {/* was originally a button, but we want the card from Single.js */}
      <div 
        className='card'
        style={{ cursor: 'pointer' }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {flick && (
          <Box sx={style}>
            <div className='SingleModal'>
              <img src={
                flick.poster_path
                ? `${img_500}/${flick.poster_path}`
                : unavailable
                }
                alt={flick.name || flick.title}
                className="SingleModal_picture"
              />
              <div className="SingleModal_about">
                <span className="SingleModal_title">
                  {flick.name || flick.title} (
                    {(
                      flick.first_air_date || 
                      flick.release_date || 
                      "-----"
                    )}
                  )
                </span>
                {flick.tagline && (
                  <i className="tagline">{flick.tagline}</i>
                )}
                <span className="SingleModal_description">
                  {flick.overview}
                </span>
                <div>
                  {/* Passing these to Carousel */}
                  <Carousel media_type={media_type} id={id}/>
                </div>
              </div>
            </div>
          </Box>
        )}
        </Fade>
      </Modal>
    </>
  );
}
