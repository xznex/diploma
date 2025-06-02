import React, { useState, useEffect } from 'react';
import { getCourses } from '../api';

function Home({ user }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchCourses = async () => {
        try {
          const data = await getCourses(user.token);
          setCourses(data);
        } catch (error) {
          console.error('Failed to fetch courses:', error);
        }
      };
      fetchCourses();
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <h1>Available Courses</h1>
        <p>Please log in to view courses.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Available Courses</h1>
      {courses.length ? (
        courses.map((course) => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}

export default Home;