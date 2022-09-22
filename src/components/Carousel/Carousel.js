import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { noPicture, img_300 } from '../config/config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({ media_type, id }) => {

    const [cast, setCast] = useState()

    const items = cast?.map((c) => (
        <div className="carousel-container">
            <img 
                src= {c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt= {c?.name}
                onDragStart={handleDragStart}
                className="carousel-img" />
                <b className='carousel-text'>{c?.name}</b>
        </div>
    ))

    // Depends on screen size of how many cast members will show
    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchC = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        
        setCast(data.cast);
    };

    useEffect(() => {
      fetchC()
    }, [])
    

  return (
    <AliceCarousel autoPlay responsive={responsive} infinite disableDotsControls disableButtonsControls mouseTracking items={items} />
  );
}

export default Carousel;