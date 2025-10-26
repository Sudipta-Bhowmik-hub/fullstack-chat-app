import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Fetch message history on load
  useEffect(() => {
    fetch('http://localhost:3000/messages')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(() => setError('Failed to load message history'));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      setText('');
      setHistory(data.messages); // update history from response
    } catch (err) {
      setError('Error sending message');
    }
    setLoading(false);
  };
  return (
    <div className="App">
      <h1>Send a Message</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>

      {loading && <p>Sending message...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Server Response:</h3>
      <pre>{response}</pre>

      <h3>Message History:</h3>
      <ul>
        {history.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;


