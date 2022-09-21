import { TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import Single from '../components/Single/Single';
import MyPagination from '../components/Pagination/MyPagination';

const Search = () => {

  const [motionPicture, setMotionPicture] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [flick, setFlick] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const fetchS = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${motionPicture ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`)

    setFlick(data.results);
  };

  useEffect(() => {
    window.scroll(0,0)
    fetchS();
    // eslint-disable-next-line
  }, [motionPicture, page])
  
  
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display: "flex", margin: "15px 0"}}>
          <TextField
          style={{ flex: 1 }}
          className='search'
          label='Search'
          variant='filled'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='contained' style={{marginLeft: 10}} onClick={fetchS}><SearchIcon /></Button>
        </div>

        <Tabs 
          value={motionPicture} 
          indicatorColor="primary" 
          textColor="primary"
          onChange={(event, newValue) => {
            setMotionPicture(newValue);
            setPage(1)
          }}
          style={{ paddingBottom: 5 }}
          >
          <Tab style={{ width: '50%' }} label="Movie Search" />
          <Tab style={{ width: '50%' }} label="Series Search" />
        </Tabs>
      </ThemeProvider>
      <div className='trending'>
                {
                    flick && flick.map((f) => (
                        <Single 
                            key={f.id} 
                            id={f.id} 
                            poster={f.poster_path} 
                            title={f.title || f.name} 
                            date={f.first_air_date || f.release_date} 
                            media_type={motionPicture ? "tv" : "movie"} 
                            vote_average={f.vote_average}
                        />
                    ))}
            </div>
            <MyPagination setPage={setPage} />
    </div>
  )
}

export default Search