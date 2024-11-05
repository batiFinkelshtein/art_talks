import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/DiscussionPage.css';

function DiscussionPage() {
  const { id } = useParams();
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const fetchPicture = async () => {
      try {
        const response = await fetch(`https://art-talks.onrender.com/api/pictures/${id}`);
        if (!response.ok) {
          throw new Error('Picture not found');
        }
        const data = await response.json();
        setPicture(data);
      } catch (error) {
        console.error(error);
        setPicture(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPicture();

    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);

    socket.onmessage = async (event) => {
      let message;
      if (event.data instanceof Blob) {
        message = await event.data.text(); 
      } else {
        message = event.data;
      }
      setMessages((prevMessages) => [...prevMessages, { text: message }]);
    };

    return () => {
      socket.close(); 
    };
  }, [id]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && ws && ws.readyState === WebSocket.OPEN && username) {
      ws.send(`${username}: ${newMessage}`);
      setNewMessage("");
    } else {
      console.error("WebSocket is not open or username is missing. Current state: ", ws?.readyState);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!picture) return <div>Picture not found</div>;

  return (
    <div className="discussion-page">
      <div className="picture-details">
        {/* נציג את התמונה כ-base64 */}
        <img src={`data:image/jpeg;base64,${picture.imageUrl}`} alt={picture.title} className="picture-image" />
        <h3>{picture.title}</h3>
        <p><strong>{picture.artist}</strong></p>
        <p>{picture.description}</p>
      </div>
      <div className="chat-container">
        <div className="username-input">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input-field"
          />
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index} className="chat-message">{msg.text}</p>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
