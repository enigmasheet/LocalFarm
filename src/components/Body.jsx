import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "../firebase-config";
import RealTimeChart from "./RealTimeChart";

const Body = () => {
  const { id } = useParams();
  const [greenhouse, setGreenhouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestData, setLatestData] = useState(null);
  const [thresholds, setThresholds] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [autoControl, setAutoControl] = useState({ ventilation: false, waterPump: false });

  useEffect(() => {
    const fetchGreenhouseData = () => {
      const greenhouseRef = ref(database, `greenhouses/${id}`);
      onValue(greenhouseRef, (snapshot) => {
        const greenhouseData = snapshot.val();

        if (greenhouseData) {
          setGreenhouse(greenhouseData);
          setThresholds({
            temperature: greenhouseData.temp,
            humidity: greenhouseData.humidity,
            moisture: greenhouseData.moisture,
          });

          const realTimeDataRef = ref(database, `sensorData/${id}`);
          onValue(realTimeDataRef, (snapshot) => {
            const data = snapshot.val() || {};
            const entries = Object.values(data);

            if (entries.length > 0) {
              const latest = entries.reduce(
                (latest, current) =>
                  new Date(current.timestamp) > new Date(latest.timestamp)
                    ? current
                    : latest,
                entries[0]
              );

              setLatestData(latest);
              updateSystemState(latest);
            } else {
              setLatestData({
                temperature: "N/A",
                humidity: "N/A",
                moisture: "N/A",
                water_pump: { status: "N/A" },
                ventilation: { status: "N/A" },
              });
            }

            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
    };

    fetchGreenhouseData();
    const intervalId = setInterval(fetchGreenhouseData, 60000); // Refresh data every 60 seconds
    return () => clearInterval(intervalId);
  }, [id]);

  const updateSystemState = (latestData) => {
    const { temperature, humidity, moisture } = latestData;
    const { temperature: tempThreshold, humidity: humidityThreshold, moisture: moistureThreshold } = thresholds;

    let ventilationStatus = autoControl.ventilation;
    let waterPumpStatus = autoControl.waterPump;

    if (parseFloat(temperature) > parseFloat(tempThreshold)) {
      ventilationStatus = true;
    } else if (parseFloat(temperature) < parseFloat(tempThreshold) - 1) {
      ventilationStatus = false;
    }

    if (parseFloat(moisture) < parseFloat(moistureThreshold)) {
      waterPumpStatus = true;
    } else if (parseFloat(moisture) > parseFloat(moistureThreshold) + 5) {
      waterPumpStatus = false;
    }

    if (parseFloat(humidity) > parseFloat(humidityThreshold)) {
      ventilationStatus = true;
    } else if (parseFloat(humidity) < parseFloat(humidityThreshold) - 5) {
      ventilationStatus = false;
    }

    setAutoControl({ ventilation: ventilationStatus, waterPump: waterPumpStatus });

    // Update the system state in the database
    const systemStateRef = ref(database, `systemState/${id}`);
    update(systemStateRef, {
      ventilation: { status: ventilationStatus ? 'On' : 'Off' },
      water_pump: { status: waterPumpStatus ? 'On' : 'Off' }
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this greenhouse and its sensor data?")) {
      return;
    }

    setDeleting(true);
    try {
      const greenhouseRef = ref(database, `greenhouses/${id}`);
      const sensorDataRef = ref(database, `sensorData/${id}`);

      await remove(greenhouseRef);
      await remove(sensorDataRef);

      setAlertMessage("Greenhouse and sensor data deleted successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error deleting greenhouse or sensor data:", error);
      setAlertMessage("Error deleting greenhouse or sensor data. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8 text-xl dark:text-gray-200">Loading...</div>;
  }

  if (!greenhouse) {
    return <div className="text-center p-8 text-xl dark:text-gray-200">Greenhouse not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {alertMessage && (
        <div
          className={`mb-4 p-2 rounded-lg ${
            alertMessage.includes("Error")
              ? "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100"
              : "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
          }`}
        >
          {alertMessage}
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Chart */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
          <div className="flex-1 mb-6">
            <RealTimeChart greenhouseId={id} />
          </div>
        </div>

        {/* Details and Controls */}
        <div className="flex flex-col lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              {greenhouse.name}
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-300">
              {greenhouse.plantname}
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-2">
                Current Data
              </h3>
              <div className="space-y-2">
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Temperature:{" "}
                  <span className="font-bold">{latestData?.temperature} °C</span>
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Humidity:{" "}
                  <span className="font-bold">{latestData?.humidity} %</span>
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Moisture:{" "}
                  <span className="font-bold">{latestData?.moisture} %</span>
                </p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-2">
                Threshold Data
              </h3>
              <div className="space-y-2">
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Temperature Threshold:{" "}
                  <span className="font-bold">{thresholds.temperature} °C</span>
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Humidity Threshold:{" "}
                  <span className="font-bold">{thresholds.humidity} %</span>
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Moisture Threshold:{" "}
                  <span className="font-bold">{thresholds.moisture} %</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-white font-bold py-3 px-6 rounded-md bg-gray-600">
              Water Pump Status:{" "}
              <span className="font-bold">{autoControl.waterPump ? "On" : "Off"}</span>
            </div>
            <div className="text-white font-bold py-3 px-6 rounded-md bg-gray-600">
              Ventilation Status:{" "}
              <span className="font-bold">{autoControl.ventilation ? "On" : "Off"}</span>
            </div>
            <button
              className={`text-white font-bold py-3 px-6 rounded-md transition duration-300 transform bg-red-600 hover:bg-red-700 ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Greenhouse"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
