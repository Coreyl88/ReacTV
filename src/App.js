import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Trending from './pages/Trending';
import Movies from './pages/Movies';
import Search from './pages/Search';
import Shows from './pages/Shows';
import { Container } from '@mui/system';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <div className="App">
          <Container>
            <Routes>
              <Route exact path='/' element={<Trending />} />
                <Route path='/movies' element={<Movies />} /> 
                <Route path='/shows' element={<Shows />} /> 
                <Route path='/search' element={<Search />} />
            </Routes>
          </Container>
        </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
