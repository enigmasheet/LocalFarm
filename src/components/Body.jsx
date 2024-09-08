import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, remove, get } from "firebase/database";
import { database } from "../firebase-config";
import RealTimeChart from "./RealTimeChart";
import Report from "./Report"; // Import the Report component
import { FaEdit, FaTrash } from 'react-icons/fa';

const Body = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [greenhouse, setGreenhouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestData, setLatestData] = useState(null);
  const [pastData, setPastData] = useState([]);
  const [thresholds, setThresholds] = useState({});
  const [systemState, setSystemState] = useState({ ventilation: 'N/A', waterPump: 'N/A' });

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      setLoading(true);
      try {
        const greenhouseRef = ref(database, `greenhouses/${id}`);
        const greenhouseSnapshot = await get(greenhouseRef);
        const greenhouseData = greenhouseSnapshot.val();

        if (greenhouseData) {
          setGreenhouse(greenhouseData);
          setThresholds({
            temperature: greenhouseData.temp || "N/A",
            humidity: greenhouseData.humidity || "N/A",
            moisture: greenhouseData.moisture || "N/A",
          });

          const realTimeDataRef = ref(database, `sensorData/${id}`);
          const dataSnapshot = await get(realTimeDataRef);
          const data = dataSnapshot.val() || {};
          const entries = Object.values(data);
          
          if (entries.length > 0) {
            const latest = entries.reduce((latest, current) =>
              new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest,
              entries[0]
            );
            setLatestData(latest);
            setPastData(entries);
          } else {
            setLatestData({
              temperature: "N/A",
              humidity: "N/A",
              moisture: "N/A",
              timestamp: "N/A",
            });
          }

          const systemStateRef = ref(database, `systemState/${id}`);
          const systemStateSnapshot = await get(systemStateRef);
          const systemStateData = systemStateSnapshot.val() || {};
          setSystemState({
            ventilation: systemStateData.ventilation?.status || 'N/A',
            waterPump: systemStateData.waterPump?.status || 'N/A',
          });
        }
      } catch (error) {
        console.error("Error fetching greenhouse data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGreenhouseData();
    const intervalId = setInterval(fetchGreenhouseData, 60000);
    return () => clearInterval(intervalId);
  }, [id]);

  const handleEdit = () => navigate(`/settings`);

  const handleDelete = async () => {
    try {
      await remove(ref(database, `greenhouses/${id}`));
      navigate('/');  // Redirect to the homepage or greenhouses list after deletion
    } catch (error) {
      console.error("Error deleting greenhouse:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading greenhouse data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0">{greenhouse?.name || `Greenhouse ${id}`} - {greenhouse?.plantname || "Unknown Plant"}</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={handleEdit}>
            <FaEdit className="mr-2" />
            Edit Greenhouse
          </button>
          <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={handleDelete}>
            <FaTrash className="mr-2" />
            Delete Greenhouse
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md dark:bg-gray-800">
          <RealTimeChart greenhouseId={id} />
        </div>

        <div className="flex-none w-full lg:w-1/3 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Thresholds & Data</h2>
          
          <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-700 mb-4">
            <h3 className="text-lg font-medium mb-2">Thresholds</h3>
            <p className="flex justify-between mb-2"><span>Temperature:</span><span>{thresholds.temperature} °C</span></p>
            <p className="flex justify-between mb-2"><span>Humidity:</span><span>{thresholds.humidity} %</span></p>
            <p className="flex justify-between"><span>Moisture:</span><span>{thresholds.moisture} %</span></p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-700 mb-4">
            <h3 className="text-lg font-medium mb-2">Latest Sensor Data</h3>
            <p className="flex justify-between mb-2"><span>Temperature:</span><span>{latestData?.temperature || "N/A"} °C</span></p>
            <p className="flex justify-between mb-2"><span>Humidity:</span><span>{latestData?.humidity || "N/A"} %</span></p>
            <p className="flex justify-between mb-2"><span>Moisture:</span><span>{latestData?.moisture || "N/A"} %</span></p>
            <p className="flex justify-between"><span>Timestamp:</span><span>{latestData?.timestamp !== "N/A" ? new Date(latestData.timestamp).toLocaleString() : "N/A"}</span></p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-700 mb-4">
            <h3 className="text-lg font-medium mb-2">System State</h3>
            <p className="flex justify-between mb-2"><span>Ventilation:</span><span>{systemState.ventilation}</span></p>
            <p className="flex justify-between"><span>Water Pump:</span><span>{systemState.waterPump}</span></p>
          </div>

          <div className="flex justify-end mt-6">
            <Report 
              greenhouse={greenhouse} 
              latestData={latestData} 
              pastData={pastData} 
              thresholds={thresholds} 
              systemState={systemState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
