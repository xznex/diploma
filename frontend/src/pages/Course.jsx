import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getCourse, getLessons, getQuizzes, trackProgress} from '../api';
import ProgressBar from '../components/ProgressBar';
import QuizCard from '../components/QuizCard';

function Course({user}) {
    const {id} = useParams();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const [courseData, lessonsData, quizData] = await Promise.all([
                    getCourse(id, user.token),
                    getLessons(id, user.token),
                    getQuizzes(id, user.token),
                ]);
                setCourse(courseData);
                setLessons(lessonsData);
                setQuizzes(quizData);
                // Прогресс рассчитывается на основе завершенных уроков
                const completed = lessonsData.filter((lesson) => lesson.is_completed).length;
                setProgress(lessonsData.length ? (completed / lessonsData.length) * 100 : 0);
            } catch (error) {
                console.error('Failed to fetch course data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, user]);

    const handleLessonComplete = async (lessonId) => {
        try {
            await trackProgress(lessonId, 100, true, user.token);
            const lessonsData = await getLessons(id, user.token);
            setLessons(lessonsData);
            const completed = lessonsData.filter((lesson) => lesson.is_completed).length;
            setProgress(lessonsData.length ? (completed / lessonsData.length) * 100 : 0);
        } catch (error) {
            console.error('Failed to track progress:', error);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (!user) return <div className="p-6 text-center">Please log in to view this course.</div>;
    if (!course) return <div className="p-6 text-center">Course not found.</div>;

    const [activeTab, setActiveTab] = useState('lessons');

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <ProgressBar progress={progress}/>
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('lessons')}
                    className={`px-4 py-2 rounded ${activeTab === 'lessons' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Lessons
                </button>
                <button
                    onClick={() => setActiveTab('quizzes')}
                    className={`px-4 py-2 rounded ${activeTab === 'quizzes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Quizzes
                </button>
            </div>
            {activeTab === 'lessons' ? (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
                    {lessons.length ? (
                        <div className="space-y-4">
                            {lessons.map((lesson) => (
                                <div key={lesson.id} className="p-4 bg-white rounded-lg shadow">
                                    <h3 className="text-lg font-medium">{lesson.title}</h3>
                                    <button
                                        onClick={() => handleLessonComplete(lesson.id)}
                                        disabled={lesson.is_completed}
                                        className={`mt-2 px-4 py-2 rounded text-white ${
                                            lesson.is_completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                    >
                                        {lesson.is_completed ? 'Completed' : 'Mark as Completed'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No lessons available.</p>
                    )}
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
                    {quizzes.length ? (
                        <div className="space-y-4">
                            {quizzes.map((quiz) => (
                                <QuizCard key={quiz.id} quiz={quiz} token={user.token}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No quizzes available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Course;