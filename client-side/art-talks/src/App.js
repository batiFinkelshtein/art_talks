
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PictureCard from './components/pictureCard';
import DiscussionPage from './components/DiscussionPage';
import './App.css';

function App() {
  const [pictures, setPictures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/pictures');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPictures(data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  const filteredPictures = pictures.filter(picture =>
    picture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    picture.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <input
          type="text"
          placeholder="search picture or artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Routes>
          <Route path="/" element={
            <div className="gallery">
              {filteredPictures.map(picture => (
                <Link to={`/discussion/${picture.id}`} key={picture.id}>
                  <PictureCard {...picture} />
                </Link>
              ))}
            </div>
          } />
          <Route path="/discussion/:id" element={<DiscussionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
