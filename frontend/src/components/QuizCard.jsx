import React, { useState } from 'react';
import { submitQuizResult } from '../api';
import { motion } from 'framer-motion';

function QuizCard({ quiz, token }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    try {
      const score = selectedAnswer === quiz.correct_answer ? 100 : 0;
      await submitQuizResult(quiz.id, score, token);
      setResult(score === 100 ? 'Correct!' : 'Incorrect');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>
      {quiz.image && (
        <img src={quiz.image} alt="Quiz" className="w-full h-48 object-cover rounded mb-4" />
      )}
      <div className="space-y-2">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            disabled={isSubmitted}
            className={`w-full p-2 rounded text-left ${
              selectedAnswer === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            } ${isSubmitted && index === quiz.correct_answer ? 'border-2 border-green-500' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Submit
        </button>
      ) : (
        <p className={`mt-4 font-semibold ${result === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
          {result}
        </p>
      )}
    </motion.div>
  );
}

export default QuizCard;