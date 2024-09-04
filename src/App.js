// App.js
import React, { useState } from 'react';
import FrontScreen from './FrontScreen'; // Corrected path
import Questionnaire from './Questionnaire'; // Corrected path
import ThankYou from './ThankYou'; // Import ThankYou component

const App = () => {
  const [isSurveyStarted, setIsSurveyStarted] = useState(false);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  const startSurvey = () => {
    setIsSurveyStarted(true);
  };

  const completeSurvey = () => {
    setIsSurveyCompleted(true);
    setTimeout(() => {
      setIsSurveyStarted(false);
      setIsSurveyCompleted(false);
    }, 5000); // Show Thank You screen for 5 seconds
  };

  return (
    <div>
      {!isSurveyStarted && !isSurveyCompleted && <FrontScreen startSurvey={startSurvey} />}
      {isSurveyStarted && !isSurveyCompleted && <Questionnaire completeSurvey={completeSurvey} />}
      {isSurveyCompleted && <ThankYou />}
    </div>
  );
};

export default App;
