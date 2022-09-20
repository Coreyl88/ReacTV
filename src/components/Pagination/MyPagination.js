import { Pagination } from '@mui/material/'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const MyPagination = ({setPage}) => {

    const handleChange = (page) => {
        // Page goes to the top when you change the page
        setPage(page);
        window.scroll(0,0)
    }
  return (
    // some inline styles for our pages
    <div 
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 15,
        }}
    >
        <ThemeProvider theme={darkTheme}>
        <Pagination count={10} color="info" shape="rounded" onChange={(e) => handleChange(e.target.textContent)} />
        </ThemeProvider>
    </div>
  )
}

export default MyPagination