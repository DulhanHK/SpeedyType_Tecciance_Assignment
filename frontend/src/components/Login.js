import React, { useState } from "react";

export default function Login({ onLogin, onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) onLogin(username, password);
    else alert("Enter username and password");
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-4" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full mb-2">Login</button>
      </form>
      <p className="text-sm">
        Don't have an account? <button onClick={onSwitch} className="text-blue-500 underline">Register</button>
      </p>
    </div>
  );
}
