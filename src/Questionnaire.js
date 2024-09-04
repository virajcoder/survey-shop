import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Question from './Question';
import Confirmation from './Confirmation';

const questions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', scale: 5 },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', scale: 5 },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', scale: 5 },
  { id: 4, text: 'On a scale of 1-10, how would you recommend us to your friends and family?', type: 'rating', scale: 10 },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' },
];

const generateSessionId = () => 'session-' + new Date().getTime();

const Questionnaire = ({ completeSurvey }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const id = generateSessionId();
    setSessionId(id);
  }, []);

  const handleAnswer = (questionId, answer) => {
    setResponses({ ...responses, [questionId]: answer });
    localStorage.setItem(sessionId, JSON.stringify({ ...responses, [questionId]: answer }));
  };

  const handleNext = () => {
    if (!responses[questions[currentQuestionIndex].id] && questions[currentQuestionIndex].type !== 'text') {
      setError('Please provide an answer before proceeding.');
      return;
    }
    setError('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handlePrevious = () => {
    setError('');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    setError('');
    handleNext();
  };

  const handleSubmit = async () => {
    try {
      
      await axios.post('https://survey-backend-1.onrender.com/api/submit-survey', {
        sessionId,
        responses: { ...responses, status: 'COMPLETED' },
      });
      localStorage.setItem(sessionId, JSON.stringify({ ...responses, status: 'COMPLETED' }));
      completeSurvey();
    } catch (err) {
      setError('Failed to submit the survey. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 justify-center bg-gray-100 min-h-screen">
      {!showConfirmation ? (
        <>
        <h1 className="text-4xl font-bold mb-20">
            Customer Servey
          </h1>
          <h2 className="text-xl font-semibold mb-4">
            Question {currentQuestionIndex + 1} / {questions.length}
          </h2>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            answer={responses[questions[currentQuestionIndex].id]}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="mt-4 space-x-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={handleSkip}
            >
              Skip
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleNext}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <Confirmation onSubmit={handleSubmit} onCancel={() => setShowConfirmation(false)} />
      )}
    </div>
  );
};

export default Questionnaire;
