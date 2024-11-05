import React, { useState } from 'react';
import '../css/pictureCard.css'; 

function PictureCard({ title, artist, imageUrl, resolution, fileSize }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div 
      className="picture-card" 
      onMouseEnter={() => setShowInfo(true)} 
      onMouseLeave={() => setShowInfo(false)}
    >
      <img src={`data:image/jpeg;base64,${imageUrl}`} alt={title} className="picture-image" />
      <h4>{title}</h4>
      <p>By {artist}</p>
      {showInfo && (
        <div className="image-info">
          <p>resolution: {resolution}</p>
          <p>file size: {fileSize}</p>
        </div>
      )}
    </div>
  );
}

export default PictureCard;
