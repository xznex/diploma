import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Learning Platform</Link>
        <nav>
          <Link to="/" className="mr-4 text-gray-600 hover:text-blue-600">Courses</Link>
          {user ? (
            <>
              <Link to="/profile" className="mr-4 text-gray-600 hover:text-blue-600">
                {user.full_name} (Level {user.level}, {user.xp} XP)
              </Link>
              <button onClick={onLogout} className="text-gray-600 hover:text-blue-600">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;