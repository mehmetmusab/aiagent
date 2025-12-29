
import React, { useState } from 'react';
import MessageInput from './MessageInput';
import TuitionCard from './TuitionCard';
import { sendChatMessage } from '../api';

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Hello! How can I help you with your tuition today?' }
  ]);
  const [tuitionInfo, setTuitionInfo] = useState(null);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    // Call backend/chat API
    try {
      const response = await sendChatMessage(text);
      if (response.tuition) {
        setTuitionInfo(response.tuition);
      }
      if (response.message) {
        setMessages((prev) => [...prev, { sender: 'agent', text: response.message }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'agent', text: 'Sorry, there was an error.' }]);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, background: '#fff' }}>
      <div style={{ minHeight: 200 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <div style={{ display: 'inline-block', background: msg.sender === 'user' ? '#e0f7fa' : '#f1f8e9', borderRadius: 8, padding: 8, margin: 4 }}>
              {msg.text}
            </div>
          </div>
        ))}
        {tuitionInfo && <TuitionCard tuition={tuitionInfo} />}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}

export default ChatWindow;
