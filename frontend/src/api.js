const API_BASE_URL = 'http://localhost:8000';

export async function loginUser(email, password, full_name) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, full_name }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function registerUser(email, password, full_name) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, full_name }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}

export async function getCurrentUser(token) {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

export async function getCourses(token) {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
}

export async function getCourse(courseId, token) {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch course');
  return response.json();
}

export async function getLessons(courseId, token) {
  const response = await fetch(`${API_BASE_URL}/lessons?course_id=${courseId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch lessons');
  return response.json();
}

// export async function getQuizzes(courseId, token) {
//   const response = await fetch(`${API_BASE_URL}/quizzes?course_id=${courseId}`, {
//     headers: { 'Authorization': `Bearer ${token}` },
//   });
//   if (!response.ok) throw new Error('Failed to fetch quizzes');
//   return response.json();
// }

export async function getQuizzes(courseId, token) {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/quizzes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch quizzes');
  return response.json();
}

export async function submitQuizResult(quizId, score, token) {
  const response = await fetch(`${API_BASE_URL}/quiz-results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ quiz_id: quizId, score }),
  });
  if (!response.ok) throw new Error('Failed to submit quiz result');
  return response.json();
}

export async function trackProgress(lessonId, progress, is_completed, token) {
  const response = await fetch(`${API_BASE_URL}/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ lesson_id: lessonId, progress, is_completed }),
  });
  if (!response.ok) throw new Error('Failed to track progress');
  return response.json();
}

export async function getLeaderboard(token) {
  const response = await fetch(`${API_BASE_URL}/leaderboard`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch leaderboard');
  return response.json();
}
