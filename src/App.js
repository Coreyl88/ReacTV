import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@mui/system';

function App() {
  return (
    <Router>
      <Header />
        <div className="App">
          <Container>
            <Route exact path='/' component={Trending} /> 
              <Route path='/movies' component={Movies} /> 
              <Route path='/shows' component={Shows} /> 
              <Route path='/search' component={Search} /> 
          </Container>
        </div>
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
