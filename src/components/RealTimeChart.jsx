import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CustomReferenceLine from './CustomReferenceLine';
import CustomXAxis from './CustomXAxis';
import CustomYAxis from './CustomYAxis';

const fetchRealTimeData = async (greenhouseId) => {
  try {
    const response = await axios.get(`http://localhost:3000/realTimeData`);
    return response.data.filter(entry => String(entry.greenhouseId) === String(greenhouseId)) || [];
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

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const fetchedData = await fetchRealTimeData(greenhouseId);
      if (isMounted) {
        const processedData = fetchedData.map(entry => ({
          timestamp: new Date(entry.timestamp).toLocaleTimeString(),
          temperature: entry.temperature.value,
          humidity: entry.humidity.value,
          moisture: entry.moisture.value,
          waterPumpStatus: entry.water_pump.status,
          ventilationStatus: entry.ventilation.status
        }));
        setData(processedData);
      }
    };

    const getThresholds = async () => {
      const fetchedThresholds = await fetchGreenhouseThresholds(greenhouseId);
      setThresholds({
        humidity: Number(fetchedThresholds.humidity) || 0,
        moisture: Number(fetchedThresholds.moisture) || 0,
        temperature: Number(fetchedThresholds.temp) || 0
      });
    };

    getData();
    getThresholds();

    const id = setInterval(getData, 60000); // Update data every 60 seconds

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [greenhouseId]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6"> {/* Increase max-width and padding */}
      <ResponsiveContainer width="100%" height={500}> {/* Increase height */}
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}> {/* Adjust margins */}
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

RealTimeChart.propTypes = {
  greenhouseId: PropTypes.string.isRequired,
};

export default RealTimeChart;
