import React from 'react';
import { FaQuestionCircle, FaCheckCircle, FaEdit, FaTrashAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-teal-600 dark:text-teal-400 text-4xl md:text-5xl font-extrabold text-center mb-10">
        Frequently Asked Questions
      </h1>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-300 mb-8">
          FAQs
        </h2>
        <div className="space-y-8">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaQuestionCircle className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                What is Local.Farm?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Local.Farm is a Greenhouse Management System designed to help you monitor and control your greenhouse environments in real-time.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaCheckCircle className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                How do I add a new greenhouse?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                To add a new greenhouse, click the "Add Greenhouse" option from the sidebar in the dashboard or navigate to the Settings page and fill in the form there.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaEdit className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                How do I view real-time data for my greenhouse?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                To view real-time data, go to the greenhouse list on the dashboard, select the greenhouse you want to monitor, and the data will be displayed in a graph format.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaCog className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Can I automate controls for my greenhouse?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Yes, the system allows you to set up automated controls for temperature, humidity, and moisture levels based on predefined thresholds.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaTrashAlt className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                How do I delete a greenhouse?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                To delete a greenhouse, go to the specific greenhouse from the sidebar in the dashboard, and click the "Delete Greenhouse" button. Confirm the deletion to remove it permanently.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaSignOutAlt className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Is there a way to view historical data?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Currently, Local.Farm focuses on real-time data monitoring. Historical data features may be added in future updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Section */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-300 mb-8">
          Simple Tutorial
        </h2>
        <div className="space-y-8">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaSignOutAlt className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Step 1: Register and Login
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Start by registering for an account. Once registered, log in to access your dashboard.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaEdit className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Step 2: Add a New Greenhouse
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Navigate to the "Settings" page and click "Add Greenhouse". Fill in the necessary details like name, location, and initial thresholds, then save.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaCog className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Step 3: Monitor Real-Time Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Go to your dashboard and select a greenhouse to view its real-time data. You can monitor temperature, humidity, and moisture levels through the graphs displayed.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaCog className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Step 4: Set Up Automated Controls
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                To automate your greenhouse, go to the settings of your selected greenhouse and set the desired thresholds. The system will automatically manage the conditions based on these settings.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaCog className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Step 5: Edit Greenhouse Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                To edit a greenhouse, navigate to the Settings page, select the greenhouse you want to update, make the necessary changes, and save your updates.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaTrashAlt className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Step 6: Delete a Greenhouse
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                If you need to remove a greenhouse, go to the specific greenhouse from the sidebar in the dashboard, click the "Delete Greenhouse" button, and confirm the action.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start">
            <FaSignOutAlt className="text-teal-500 dark:text-teal-300 text-2xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-300">
                Step 7: Log Out When Done
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                For security reasons, always log out of your account when you're done managing your greenhouses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
