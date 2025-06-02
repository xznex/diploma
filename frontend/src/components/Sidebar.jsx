import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, BookOpenIcon, TrophyIcon } from '@heroicons/react/24/solid';

function Sidebar() {
  return (
    <div className="fixed w-56 bg-white shadow-lg h-screen p-3">
      <div className="text-lg font-semibold mb-4 text-stepik-blue">Learning Platform</div>
      <nav className="space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md text-sm ${
              isActive ? 'bg-stepik-blue text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <HomeIcon className="w-4 h-4 mr-2" />
          Главная
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md text-sm ${
              isActive ? 'bg-stepik-blue text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <UserIcon className="w-4 h-4 mr-2" />
          Профиль
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md text-sm ${
              isActive ? 'bg-stepik-blue text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <BookOpenIcon className="w-4 h-4 mr-2" />
          Курсы
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md text-sm ${
              isActive ? 'bg-stepik-blue text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <TrophyIcon className="w-4 h-4 mr-2" />
          Рейтинг
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;