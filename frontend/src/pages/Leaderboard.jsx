import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../api';

function Leaderboard({ user }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [sortBy, setSortBy] = useState('score');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(user.token); // Предполагаем API-метод
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    };
    if (user) fetchLeaderboard();
  }, [user]);

  const sortedLeaderboard = [...leaderboard].sort((a, b) =>
    sortBy === 'score' ? b.score - a.score : a.name.localeCompare(b.name)
  );

  const paginatedData = sortedLeaderboard.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="score">Score</option>
          <option value="name">Name</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((entry, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border">{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td className="p-2 border">{entry.name}</td>
              <td className="p-2 border">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * itemsPerPage >= leaderboard.length}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;