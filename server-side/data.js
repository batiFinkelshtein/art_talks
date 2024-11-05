
const fs = require('fs');
const path = require('path');

const getBase64Image = (filePath) => {
  const image = fs.readFileSync(filePath);
  return Buffer.from(image).toString('base64');
};

const pictures = [
    {
      id: 1,
      imageUrl: getBase64Image(path.join(__dirname, './images/pic1.jpg')),
      artist: "Vincent van Gogh",
      title: "Starry Night",
      description: "Lorem ipsum dolor sit amet.",
      resolution: '1280x720',
      fileSize: '800KB',
    },
    {
      id: 2,
      imageUrl: getBase64Image(path.join(__dirname, './images/pic2.jpg')),
      artist: "Claude Monet",
      title: "Water Lilies",
      description: "Lorem ipsum dolor sit amet.",
      resolution: '1280x720',
      fileSize: '800KB',
    },
    {
      id:3 ,
      imageUrl: getBase64Image(path.join(__dirname, './images/pic3.jpg')),
      artist: "Claude Monet",
      title: "Water Lilies",
      description: "Lorem ipsum dolor sit amet.",
      resolution: '1280x720',
      fileSize: '800KB',
    },
    {
      id: 4,
      imageUrl: getBase64Image(path.join(__dirname, './images/pic4.jpg')),
      artist: "Claude Monet",
      title: "Water Lilies",
      description: "Lorem ipsum dolor sit amet.",
      resolution: '1280x720',
      fileSize: '800KB',
    },
    {
      id: 5,
      imageUrl: getBase64Image(path.join(__dirname, './images/pic5.jpg')),
      artist: "Claude Monet",
      title: "Water Lilies",
      description: "Lorem ipsum dolor sit amet.",
      resolution: '1280x720',
      fileSize: '800KB',
    },
    {
      id: 6,
      imageUrl: getBase64Image(path.join(__dirname, './images/pic6.jpg')),
      artist: "Claude Monet",
      title: "Water Lilies",
      description: "Lorem ipsum dolor sit amet.",
      resolution: '1280x720',
      fileSize: '800KB',
    },
   
  ];
  
  module.exports = pictures;
  