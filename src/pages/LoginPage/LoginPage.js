import React, { useState } from 'react';
import './LoginPage.css';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    // Clear any previous error message
    setErrorMessage('');

    try {
      const response = await fetch('https://g3thlcx24g.execute-api.us-east-1.amazonaws.com/prod/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(response.status)

      if (data.statusCode === 201) {
        // Login successful, navigate to movies page
        console.log(data.body)
        console.log(data.statusCode)
        history.push(`/movies?username=${encodeURIComponent(username)}`);
      } else if (data.statusCode === 401) {
        // Unauthorized, incorrect username or password
        console.log(data.body)
        console.log(data.statusCode)
        setErrorMessage(data.body);
      } else {
        // Handle other error cases
        setErrorMessage('Failed to connect to the server. Please try again later.');
      }
    } catch (error) {
      // Handle network or server errors
      setErrorMessage('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>BookMyMovies</h1>
      </div>
      <p className="login-tagline">Quick and hassle-free booking</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="login-button" onClick={handleLogin}>LOGIN</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
