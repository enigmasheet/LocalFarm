import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CustomReferenceLine from './CustomReferenceLine'; // Import the custom wrapper
import CustomXAxis from './CustomXAxis'; // Import the custom wrapper
import CustomYAxis from './CustomYAxis'; // Import the custom wrapper

// Fetch real-time data
const fetchRealTimeData = async (greenhouseId) => {
  try {
    const response = await axios.get(`http://localhost:3000/realTimeData`);
    return response.data.filter(entry => entry.greenhouseId === greenhouseId) || [];
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    return [];
  }
};

// Fetch greenhouse thresholds
const fetchGreenhouseThresholds = async (greenhouseId) => {
  try {
    const response = await axios.get(`http://localhost:3000/greenhouses/${greenhouseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching greenhouse thresholds:", error);
    return {};
  }
};

const RealTimeChart = ({ greenhouseId }) => {
  const [data, setData] = useState([]);
  const [thresholds, setThresholds] = useState({});
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchRealTimeData(greenhouseId);
      const processedData = fetchedData.map(entry => ({
        timestamp: new Date(entry.timestamp).toLocaleTimeString(),
        temperature: entry.temperature.value,
        humidity: entry.humidity.value,
        moisture: entry.moisture.value,
        waterPumpStatus: entry.water_pump.status,
        ventilationStatus: entry.ventilation.status
      }));
      setData(processedData);
    };

    const getThresholds = async () => {
      const fetchedThresholds = await fetchGreenhouseThresholds(greenhouseId);
      setThresholds(fetchedThresholds);
    };

    // Fetch initial data and thresholds
    getData();
    getThresholds();

    // Polling interval for data
    const id = setInterval(getData, 60000); // Update data every 60 seconds
    setIntervalId(id);

    // Cleanup on component unmount
    return () => clearInterval(id);
  }, [greenhouseId]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <CustomXAxis dataKey="timestamp" />
          <CustomYAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
          <Line type="monotone" dataKey="moisture" stroke="#ffc658" name="Moisture (%)" />

          {/* Threshold lines using the custom wrapper */}
          <CustomReferenceLine y={thresholds.humidity} stroke="#82ca9d" strokeDasharray="3 3" label="Humidity Threshold" />
          <CustomReferenceLine y={thresholds.moisture} stroke="#ffc658" strokeDasharray="3 3" label="Moisture Threshold" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeChart;
