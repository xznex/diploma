import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="block bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      {course.cover_url ? (
        <img src={course.cover_url} alt={course.title} className="w-full h-40 object-cover rounded-t-lg" />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
          <span>No Cover</span>
        </div>
      )}
      <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
      <p className="text-gray-600">{course.description || 'No description'}</p>
      <p className="text-sm text-gray-500 mt-2">Author: {course.author.full_name}</p>
    </Link>
  );
}

export default CourseCard;