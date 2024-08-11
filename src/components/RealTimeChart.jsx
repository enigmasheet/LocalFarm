import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase-config';

const fetchRealTimeData = (greenhouseId, callback) => {
  const dataRef = ref(database, `sensorData/${greenhouseId}`);
  onValue(dataRef, (snapshot) => {
    try {
      const data = snapshot.val() || [];
      const filteredData = Object.values(data);
      callback(filteredData);
    } catch (error) {
      console.error("Error processing real-time data:", error);
    }
  });
};

const fetchThresholds = (greenhouseId, callback) => {
  const thresholdsRef = ref(database, `greenhouses/${greenhouseId}`);
  onValue(thresholdsRef, (snapshot) => {
    try {
      const greenhouseData = snapshot.val();
      if (greenhouseData) {
        callback({
          temperature: greenhouseData.temp,
          humidity: greenhouseData.humidity,
          moisture: greenhouseData.moisture
        });
      }
    } catch (error) {
      console.error("Error fetching thresholds:", error);
    }
  });
};

const RealTimeChart = ({ greenhouseId }) => {
  const [data, setData] = useState([]);
  const [thresholds, setThresholds] = useState({
    temperature: 30, // Default threshold values
    humidity: 70,
    moisture: 50
  });

  const numericGreenhouseId = Number(greenhouseId); // Convert to number

  useEffect(() => {
    const getData = () => {
      fetchRealTimeData(numericGreenhouseId, (fetchedData) => {
        const processedData = fetchedData.map(entry => ({
          timestamp: new Date(entry.timestamp).toLocaleTimeString(),
          temperature: parseFloat(entry.temperature),
          humidity: parseFloat(entry.humidity),
          moisture: parseFloat(entry.moisture),
        }));
        setData(processedData);
      });
    };

    const getThresholds = () => {
      fetchThresholds(numericGreenhouseId, (fetchedThresholds) => {
        setThresholds(fetchedThresholds);
      });
    };

    getData();
    getThresholds();
    const id = setInterval(() => {
      getData();
      getThresholds();
    }, 60000); // Refresh data every minute

    return () => {
      clearInterval(id); // Clear interval on component unmount
    };
  }, [numericGreenhouseId]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#82ca9d"
        />
        <Line
          type="monotone"
          dataKey="moisture"
          stroke="#ffc658"
        />
        <ReferenceLine
          y={thresholds.temperature}
          label="Temp Threshold"
          stroke="#8884d8"
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={thresholds.humidity}
          label="Humidity Threshold"
          stroke="#82ca9d"
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={thresholds.moisture}
          label="Moisture Threshold"
          stroke="#ffc658"
          strokeDasharray="3 3"
        />
      </LineChart>
    </div>
  );
};

RealTimeChart.propTypes = {
  greenhouseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // Allow both number and string
};

export default RealTimeChart;
