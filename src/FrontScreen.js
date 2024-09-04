import React from 'react';

const FrontScreen = ({ startSurvey }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
        <h1 className="text-4xl font-bold mb-8">Welcome to Viraj Shop Survey</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={startSurvey}
        >
          Start Survey
        </button>
      </div>
    );
  };

export default FrontScreen;
