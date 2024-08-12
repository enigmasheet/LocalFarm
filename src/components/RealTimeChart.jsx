import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
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
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
          <XAxis dataKey="timestamp" tick={{ fill: '#4a4a4a', fontSize: 14 }} />
          <YAxis tick={{ fill: '#4a4a4a', fontSize: 14 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', borderColor: '#8884d8', color: '#fff' }} 
            itemStyle={{ color: '#fff' }} 
            labelStyle={{ color: '#8884d8' }}
          />
          <Legend wrapperStyle={{ top: -10 }} />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#82ca9d"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="moisture"
            stroke="#ffc658"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <ReferenceLine
            y={thresholds.temperature}
            label={{ position: 'insideTopRight', fill: '#8884d8', fontWeight: 'bold' }}
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <ReferenceLine
            y={thresholds.humidity}
            label={{ position: 'insideTopRight', fill: '#82ca9d', fontWeight: 'bold' }}
            stroke="#82ca9d"
            strokeDasharray="5 5"
          />
          <ReferenceLine
            y={thresholds.moisture}
            label={{ position: 'insideTopRight', fill: '#ffc658', fontWeight: 'bold' }}
            stroke="#ffc658"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

RealTimeChart.propTypes = {
  greenhouseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // Allow both number and string
};

export default RealTimeChart;
