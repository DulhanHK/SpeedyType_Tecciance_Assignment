import React, { useState } from "react";
import axios from "axios";
import Practice from "./components/Practice";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [user, setUser] = useState(null); // user object: { username, userId, history }
  const [view, setView] = useState("login"); // login / register / practice / dashboard

  // Handle login success
  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/users/login", { username, password });
      setUser(res.data); // res.data should have { userId, username, history }
      setView("practice");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Server error or network issue");
      }
    }
  };

  // Handle register success (redirect to login)
  const handleRegister = () => {
    setView("login");
  };

  // Save typing result
  const handleFinish = async (result) => {
    if (!user) return;

    try {
      await axios.post(`http://localhost:4000/api/users/history/${user.userId}`, result);
      const updatedHistory = [...(user.history || []), result];
      setUser({ ...user, history: updatedHistory });
      setView("dashboard");
    } catch (err) {
      alert("Failed to save history");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      {!user && view === "login" && <Login onLogin={handleLogin} onSwitch={() => setView("register")} />}
      {!user && view === "register" && <Register onRegister={handleRegister} onSwitch={() => setView("login")} />}
      
      {user && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Typing Speed Improvement Platform
          </h1>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setView("practice")}
              className={`px-4 py-2 rounded ${view === "practice" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
            >
              Practice
            </button>
            <button
              onClick={() => setView("dashboard")}
              className={`px-4 py-2 rounded ${view === "dashboard" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => { setUser(null); setView("login"); }}
              className={`px-4 py-2 rounded 
                ${view === "login" 
                  ? "bg-blue-500 text-white hover:bg-blue-600"   // darker blue on hover
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-900" // slightly darker gray
                }`}
            >
  Logout
</button>

          </div>

          {view === "practice" && <Practice onFinish={handleFinish} />}
          {view === "dashboard" && <Dashboard username={user.username} history={user.history || []} />}
        </>
      )}
    </div>
  );
}
