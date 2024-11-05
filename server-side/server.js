const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pictures = require('./data');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.get('/api/pictures', (req, res) => {
    res.json(pictures);
  });
  app.get('/api/pictures/:id', (req, res) => {
    const pictureId = parseInt(req.params.id);
    const picture = pictures.find(p => p.id === pictureId);
    
    if (!picture) {
      return res.status(404).send('Picture not found');
    }
    
    res.json(picture);
  });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {});
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
