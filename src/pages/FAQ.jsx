// src/pages/FAQ.jsx
import React from 'react';

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-teal-500 text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      
      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">FAQs</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-teal-500">What is Local.Farm?</h3>
            <p className="text-gray-700">Local.Farm is a Greenhouse Management System designed to help you monitor and control your greenhouse environments in real-time.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">How do I add a new greenhouse?</h3>
            <p className="text-gray-700">You can add a new greenhouse by navigating to the Settings page and clicking the "Add Greenhouse" button. Fill in the required details and submit the form.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">How do I view real-time data for my greenhouse?</h3>
            <p className="text-gray-700">To view real-time data, go to the greenhouse list on the dashboard, select the greenhouse you want to monitor, and the data will be displayed in a graph format.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">Can I automate controls for my greenhouse?</h3>
            <p className="text-gray-700">Yes, the system allows you to set up automated controls for temperature, humidity, and moisture levels based on predefined thresholds.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">How do I edit greenhouse settings?</h3>
            <p className="text-gray-700">To edit greenhouse settings, go to the Settings page, select the greenhouse you want to modify, and update the desired parameters such as thresholds and location.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">How do I delete a greenhouse?</h3>
            <p className="text-gray-700">To delete a greenhouse, navigate to the Settings page, find the greenhouse you want to remove, and click the "Delete" button. Confirm the deletion to remove it permanently.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">Is there a way to view historical data?</h3>
            <p className="text-gray-700">Currently, Local.Farm focuses on real-time data monitoring. Historical data features may be added in future updates.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">What if my sensors stop working?</h3>
            <p className="text-gray-700">If your sensors stop working, ensure they are correctly connected and configured. If the issue persists, consult the support documentation or contact customer support.</p>
          </div>
        </div>
      </div>

      {/* Tutorial Section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Simple Tutorial</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-teal-500">Step 1: Register and Login</h3>
            <p className="text-gray-700">Start by registering for an account. Once registered, log in to access your dashboard.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">Step 2: Add a New Greenhouse</h3>
            <p className="text-gray-700">Navigate to the "Settings" page and click "Add Greenhouse". Fill in the necessary details like name, location, and initial thresholds, then save.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">Step 3: Monitor Real-Time Data</h3>
            <p className="text-gray-700">Go to your dashboard and select a greenhouse to view its real-time data. You can monitor temperature, humidity, and moisture levels through the graphs displayed.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">Step 4: Set Up Automated Controls</h3>
            <p className="text-gray-700">To automate your greenhouse, go to the settings of your selected greenhouse and set the desired thresholds. The system will automatically manage the conditions based on these settings.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">Step 5: Edit Greenhouse Settings</h3>
            <p className="text-gray-700">To edit a greenhouse, navigate to the Settings page, select the greenhouse you want to update, make the necessary changes, and save your updates.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">Step 6: Delete a Greenhouse</h3>
            <p className="text-gray-700">If you need to remove a greenhouse, go to the Settings page, find the greenhouse you wish to delete, click the "Delete" button, and confirm the action.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-500">Step 7: Log Out When Done</h3>
            <p className="text-gray-700">For security reasons, always log out of your account when you're done managing your greenhouses.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
