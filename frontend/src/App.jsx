import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Course from './pages/Course';
import Profile from './pages/Profile';
import AuthForm from './components/AuthForm';
import Leaderboard from './pages/Leaderboard';
import { getCurrentUser } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('learning_access_token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          setToken(null);
          localStorage.removeItem('learning_access_token');
        }
      }
    };
    fetchUser();
  }, [token]);

  const handleLogin = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('learning_access_token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('learning_access_token');
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header user={user} onLogout={handleLogout} />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/courses/:id" element={<Course user={user} />} />
              <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
              <Route path="/leaderboard" element={user ? <Leaderboard user={user} /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <AuthForm onLogin={handleLogin} /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;