// App.jsx

import './App.css';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMessage(data.message); // Update message state with server response
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Failed to connect to server.'); // Provide feedback for connection error
      });
  }

  return (
    <>
      <h1>Crud Using MongoDB</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="text" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>

      {message && <p>{message}</p>} {/* Display message if available */}
    </>
  )
}

export default App;
