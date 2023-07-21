import React, { useState } from "react";

const LoginPage = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // checks if the entered username and password are correct
  const handleLogin = () => {
    if (username === "Bret" && password === "92988-3874") {
      // Set authenticated state to true upon successful login
      setAuthenticated(true);

      setUsername("");
      setPassword("");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
