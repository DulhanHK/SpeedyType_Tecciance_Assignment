import React, { useState } from "react";
import axios from "axios";

export default function Register({ onRegister, onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/users/register", { username, password });
      alert(res.data.message);
      onRegister();
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-4" />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded w-full mb-2">Register</button>
      </form>
      <p className="text-sm">
        Already have an account? <button onClick={onSwitch} className="text-blue-500 underline">Login</button>
      </p>
    </div>
  );
}
