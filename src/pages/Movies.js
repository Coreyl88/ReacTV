import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import MyPagination from '../components/Pagination/MyPagination';
import Single from '../components/Single/Single';

const Movies = () => {

    const [page, setPage] = useState(1);
    const [flick, setFlick] = useState([]);
    
    const fetchM = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);

        // console.log(data);
        setFlick(data.results)
    };

    useEffect(() => {
        window.scroll(0,0)
        fetchM();
        // eslint-disable-next-line
    }, [page])
    
    return (
        <div>
            <span className='page-name'>Movies</span>
    
            <div className='trending'>
                {
                    flick && flick.map((f) => (
                        <Single 
                            key={f.id} 
                            id={f.id} 
                            poster={f.poster_path} 
                            title={f.title || f.name} 
                            date={f.first_air_date || f.release_date} 
                            media_type="movie" 
                            vote_average={f.vote_average}
                        />
                    ))}
            </div>
            <MyPagination setPage={setPage} />
        </div>
    )
}

export default Movies