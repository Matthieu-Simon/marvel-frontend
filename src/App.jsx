import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/layouts/Header/Header';
import Footer from './assets/layouts/Footer/Footer';

import Home from './assets/pages/Home/Home';
import Personnages from './assets/pages/Personnages/Personnages';
import Comic from './assets/pages/Comic/Comic';
import Comics from "./assets/pages/Comics/Comics";
import Collection from "./assets/pages/CollectionsComics/Collections";

import './App.css';

function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Personnages />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/comics/:characterId" element={<Collection />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
