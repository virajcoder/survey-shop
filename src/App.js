
import React, { useState } from 'react';
import FrontScreen from './FrontScreen';
import Questionnaire from './Questionnaire'; 
import ThankYou from './ThankYou'; 

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
    }, 5000); 
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
