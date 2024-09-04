import React from 'react';

const Question = ({ question, onAnswer, answer }) => {
  const handleChange = (e) => {
    onAnswer(question.id, e.target.value);
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-medium mb-2">{question.text}</h3>
      {question.type === 'rating' ? (
        <input
          type="number"
          min="1"
          max={question.scale}
          value={answer || ''}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
      ) : (
        <textarea
          value={answer || ''}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
      )}
    </div>
  );
};

export default Question;
