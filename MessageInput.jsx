import React, { useState } from 'react';

function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div style={{ display: 'flex', marginTop: 16 }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Message"
        style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} style={{ marginLeft: 8, padding: '8px 16px' }}>Send</button>
    </div>
  );
}

export default MessageInput;
