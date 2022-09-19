import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Single from '../components/Single/Single'

const Trending = () => {

    const [flick, setFlick] = useState([])

    const fetchT = async () => {
        // destructuring the return variable
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`);

        // console.log(data)
        setFlick(data.results);
    };

    useEffect(() => {
      fetchT();
    }, [])
    

    

    return (
        <div>
            <span className='trending'>Trending</span>
            <div className='trending'>
                {
                    flick && flick.map((f) => (
                        <Single 
                            key={f.id} 
                            id={f.id} 
                            poster={f.poster_path} 
                            title={f.title || f.name} 
                            date={f.first_air_date || f.release_date} 
                            media_type={f.media_type} vote_average={f.vote_average}
                            />
                    ))
                }
            </div>
        </div>
    )
}

export default Trending