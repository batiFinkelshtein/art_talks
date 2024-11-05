// src/components/DiscussionPage.js
import React, { useState, useEffect } from 'react';

function DiscussionPage({ picture }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://art-talks.onrender.com`);
    setWs(socket);

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, { text: event.data }]);
    };

    return () => socket.close();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && ws) {
      ws.send(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="discussion-page">
      <div className="picture-details">
        <img src={picture.imageUrl} alt={picture.title} />
        <h3>{picture.title}</h3>
        <p><strong>{picture.artist}</strong></p>
        <p>{picture.description}</p>
      </div>
      <div className="chat">
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index}>{msg.text}</p>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>שלח</button>
      </div>
    </div>
  );
}

export default DiscussionPage;
