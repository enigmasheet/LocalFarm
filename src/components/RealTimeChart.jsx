import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CustomReferenceLine from './CustomReferenceLine';
import CustomXAxis from './CustomXAxis';
import CustomYAxis from './CustomYAxis';

const fetchRealTimeData = async (greenhouseId) => {
  try {
    const response = await axios.get(`http://localhost:3000/realTimeData`);
    const filteredData = response.data.filter(entry => String(entry.greenhouseId) === String(greenhouseId)) || [];
    return filteredData;
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    return [];
  }
};

const fetchGreenhouseThresholds = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/greenhouses/${id}`);
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
      const humidityThreshold = Number(fetchedThresholds.humidity) || 0;
      const moistureThreshold = Number(fetchedThresholds.moisture) || 0;
      const temperatureThreshold = Number(fetchedThresholds.temp) || 0;
    
      console.log('Fetched thresholds:', {
        humidity: humidityThreshold,
        moisture: moistureThreshold,
        temperature: temperatureThreshold
      });
    
      setThresholds({
        humidity: humidityThreshold,
        moisture: moistureThreshold,
        temperature: temperatureThreshold
      });
    };
    

    getData();
    getThresholds();

    const id = setInterval(getData, 60000); // Update data every 60 seconds
    setIntervalId(id);

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

          {/* Threshold lines */}
          {thresholds.temperature > 0 && (
            <CustomReferenceLine
              y={thresholds.temperature}
              stroke="#8884d8"
              strokeDasharray="3 3"
              label="Temperature Threshold"
            />
          )}
          {thresholds.humidity > 0 && (
            <CustomReferenceLine
              y={thresholds.humidity}
              stroke="#82ca9d"
              strokeDasharray="3 3"
              label="Humidity Threshold"
            />
          )}
          {thresholds.moisture > 0 && (
            <CustomReferenceLine
              y={thresholds.moisture}
              stroke="#ffc658"
              strokeDasharray="3 3"
              label="Moisture Threshold"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeChart;
