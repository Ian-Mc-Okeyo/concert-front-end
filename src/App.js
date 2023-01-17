import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateAttendee from './components/createAttendee';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/buy' element={<CreateAttendee/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </Router>
  );
}

export default App;
