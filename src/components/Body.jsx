import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, remove, get, update } from "firebase/database";
import { database } from "../firebase-config";
import RealTimeChart from "./RealTimeChart";
import { FaWater, FaFan } from 'react-icons/fa';

const Body = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [greenhouse, setGreenhouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestData, setLatestData] = useState(null);
  const [thresholds, setThresholds] = useState({});
  const [deleting, setDeleting] = useState(false);
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
          } else {
            setLatestData({
              temperature: "N/A",
              humidity: "N/A",
              moisture: "N/A",
              timestamp: "N/A",
            });
          }

          // Fetch current system state
          const systemStateRef = ref(database, `systemState/${id}`);
          const systemStateSnapshot = await get(systemStateRef);
          const systemStateData = systemStateSnapshot.val() || {};
          setSystemState({
            ventilation: systemStateData.ventilation?.status || 'N/A',
            waterPump: systemStateData.waterPump?.status || 'N/A',
          });

        } else {
          setGreenhouse(null);
          setLatestData({
            temperature: "N/A",
            humidity: "N/A",
            moisture: "N/A",
            timestamp: "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching greenhouse data:", error);
        setGreenhouse(null);
        setLatestData({
          temperature: "Error",
          humidity: "Error",
          moisture: "Error",
          timestamp: "Error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGreenhouseData();
    const intervalId = setInterval(fetchGreenhouseData, 60000);
    return () => clearInterval(intervalId);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this greenhouse? This action cannot be undone.")) {
      setDeleting(true);
      try {
        await Promise.all([
          remove(ref(database, `greenhouses/${id}`)),
          remove(ref(database, `sensorData/${id}`)),
          remove(ref(database, `systemState/${id}`)),
        ]);
        alert("Greenhouse and related data deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting greenhouse data:", error);
        alert("Error deleting greenhouse. Please try again later.");
      } finally {
        setDeleting(false);
      }
    }
  };

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center">
          <svg className="animate-spin h-8 w-8 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0H4z"></path>
          </svg>
          <p className="text-lg font-medium">Loading greenhouse data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 flex flex-col lg:flex-row">
      <div className="lg:w-2/3 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {greenhouse?.name || `Greenhouse ${id}`} - {greenhouse?.plantname || "Unknown Plant"}
        </h1>
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800 mb-6">
          <RealTimeChart greenhouseId={id} />
        </div>
      </div>

      <div className="lg:w-1/3 lg:pl-6 flex flex-col gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-xl font-semibold mb-4">Thresholds</h2>
          <div className="flex flex-col gap-2">
            <p className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">Temperature:</span> {thresholds.temperature} °C
            </p>
            <p className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">Humidity:</span> {thresholds.humidity} %
            </p>
            <p className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">Moisture:</span> {thresholds.moisture} %
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-xl font-semibold mb-4">Latest Sensor Data</h2>
          {latestData ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <p className="text-gray-700 dark:text-gray-300 mr-4">Temperature: {latestData.temperature} °C</p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-700 dark:text-gray-300 mr-4">Humidity: {latestData.humidity} %</p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-700 dark:text-gray-300 mr-4">Moisture: {latestData.moisture} %</p>
                
              </div>
              <div className="text-gray-500 mt-2 text-sm dark:text-gray-400">
                Last updated: {latestData.timestamp !== "N/A" ? new Date(latestData.timestamp).toLocaleString() : "N/A"}
              </div>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No sensor data available</p>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-xl font-semibold mb-4">Current System State</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <FaFan className={`text-2xl mr-2 ${systemState.ventilation === 'On' ? 'text-green-500' : 'text-red-500'}`} title={`Ventilation ${systemState.ventilation}`} />
              <p className={`font-semibold text-lg ${systemState.ventilation === 'On' ? 'text-green-500' : 'text-red-500'}`}>
                Ventilation: {systemState.ventilation}
              </p>
            </div>
            <div className="flex items-center">
              <FaWater className={`text-2xl mr-2 ${systemState.waterPump === 'On' ? 'text-green-500' : 'text-red-500'}`} title={`Water Pump ${systemState.waterPump}`} />
              <p className={`font-semibold text-lg ${systemState.waterPump === 'On' ? 'text-green-500' : 'text-red-500'}`}>
                Water Pump: {systemState.waterPump}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            className={`bg-red-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Greenhouse"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
