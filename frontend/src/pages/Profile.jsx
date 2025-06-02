import React from 'react';

function Profile({ user }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold">{user.full_name}</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Role: {user.role}</p>
        <p className="text-gray-600">Level: {user.level}</p>
        <p className="text-gray-600">XP: {user.xp}</p>
        <p className="text-gray-600">Joined: {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Profile;