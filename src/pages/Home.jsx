import React from 'react';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 dark:bg-gray-900">
        <h1 className="mt-5 text-teal-500 text-3xl md:text-4xl font-bold text-center dark:text-teal-300">Local.Farm</h1>
        <h2 className="text-teal-500 text-xl md:text-2xl font-bold text-center dark:text-teal-300">Greenhouse Management System</h2>

        <div className="mt-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6 dark:text-gray-200">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-time Data */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 min-h-[300px]">
              <img src="/assets/RealTime.PNG" alt="Real-time Data" className="w-full h-64 object-cover mb-4 p-2" />
              <h4 className="text-lg md:text-xl font-bold text-teal-500 mb-2 dark:text-teal-300">Real-time Data</h4>
              <p className="text-center text-gray-700 dark:text-gray-300">Monitor your greenhouse conditions in real-time, ensuring optimal growth conditions at all times.</p>
            </div>

            {/* Automated Control */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 min-h-[300px]">
              <img src="/assets/Automated.avif" alt="Automated Control" className="w-full h-64 object-cover mb-4 p-2" />
              <h4 className="text-lg md:text-xl font-bold text-teal-500 mb-2 dark:text-teal-300">Automated Control</h4>
              <p className="text-center text-gray-700 dark:text-gray-300">Automate your greenhouse systems for watering, temperature, and humidity control, making management effortless.</p>
            </div>

            {/* Data Visualization */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 min-h-[300px]">
              <img src="/assets/data.avif" alt="Data Visualization" className="w-full h-64 object-cover mb-4 p-2" />
              <h4 className="text-lg md:text-xl font-bold text-teal-500 mb-2 dark:text-teal-300">Data Visualization</h4>
              <p className="text-center text-gray-700 dark:text-gray-300">Visualize your greenhouse data with charts and graphs for better analysis and decision-making.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
