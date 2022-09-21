import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Single from '../../components/Single/Single'
import './Trending.css'
import MyPagination from '../../components/Pagination/MyPagination'

const Trending = () => {
    
    const [page, setPage] = useState(1)
    const [flick, setFlick] = useState([])

    const fetchT = async () => {
        // destructuring the return variable
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        // console.log(data)
        setFlick(data.results);
    };

    useEffect(() => {
      fetchT();
      // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <span className='page-name'>Trending</span>
            <div className='trending'>
                {
                    flick && flick.map((f) => (
                        <Single 
                            key={f.id} 
                            id={f.id} 
                            poster={f.poster_path} 
                            title={f.title || f.name} 
                            date={f.first_air_date || f.release_date} 
                            media_type={f.media_type} 
                            vote_average={f.vote_average}
                        />
                    ))}
            </div>
            <MyPagination setPage={setPage}/>
        </div>
    )
}

export default Trending