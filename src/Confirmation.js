import React from 'react';

const Confirmation = ({ onSubmit, onCancel }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Are you sure you want to submit the survey?</h2>
      <div className="space-x-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={onSubmit}
        >
          Yes, Submit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onCancel}
        >
          No, Go Back
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
