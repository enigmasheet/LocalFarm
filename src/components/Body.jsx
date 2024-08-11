import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RealTimeChart from "./RealTimeChart";

const Body = () => {
  const { id } = useParams();
  const [greenhouse, setGreenhouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestData, setLatestData] = useState(null);
  const [thresholds, setThresholds] = useState({});
  const [autoControl, setAutoControl] = useState({
    waterPump: false,
    ventilation: false,
  });
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const greenhouseResponse = await axios.get(
          `http://localhost:3000/greenhouses/${id}`
        );
        setGreenhouse(greenhouseResponse.data);
        setThresholds({
          temperature: greenhouseResponse.data.temp,
          humidity: greenhouseResponse.data.humidity,
          moisture: greenhouseResponse.data.moisture,
        });

        const statusResponse = await axios.get(
          `http://localhost:3000/realTimeData?greenhouseId=${id}`
        );
        const statusData = statusResponse.data;

        if (statusData.length > 0) {
          const latest = statusData.reduce(
            (latest, current) =>
              new Date(current.timestamp) > new Date(latest.timestamp)
                ? current
                : latest,
            statusData[0]
          );

          setLatestData(latest);

          // Automatic control logic
          const shouldTurnOnVentilation =
            latest.temperature.value > greenhouseResponse.data.temp;
          const shouldTurnOnWaterPump =
            latest.moisture.value < greenhouseResponse.data.moisture;

          setAutoControl({
            waterPump: shouldTurnOnWaterPump,
            ventilation: shouldTurnOnVentilation,
          });
        } else {
          setLatestData({
            temperature: { value: "N/A", unit: "" },
            humidity: { value: "N/A", unit: "" },
            moisture: { value: "N/A", unit: "" },
            water_pump: { status: "N/A" },
            ventilation: { status: "N/A" },
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchGreenhouseData();

    // Update data every 60 seconds
    const intervalId = setInterval(fetchGreenhouseData, 60000);
    return () => clearInterval(intervalId);
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/greenhouses/${id}`);
      setAlertMessage("Greenhouse deleted successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error deleting greenhouse:", error);
      setAlertMessage("Error deleting greenhouse. Please try again.");
    }
  };

  const toggleWaterPump = () => {
    const newStatus = latestData.water_pump.status === "on" ? "off" : "on";
    setLatestData((prevData) => ({
      ...prevData,
      water_pump: {
        status: newStatus,
      },
    }));
    setAutoControl((prevControl) => ({
      ...prevControl,
      waterPump: !prevControl.waterPump,
    }));
    setAlertMessage(`Water Pump turned ${newStatus}`);
  };

  const toggleVentilation = () => {
    const newStatus = latestData.ventilation.status === "on" ? "off" : "on";
    setLatestData((prevData) => ({
      ...prevData,
      ventilation: {
        status: newStatus,
      },
    }));
    setAutoControl((prevControl) => ({
      ...prevControl,
      ventilation: !prevControl.ventilation,
    }));
    setAlertMessage(`Ventilation turned ${newStatus}`);
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
        <div className="mb-4 p-2 bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100 rounded">
          {alertMessage}
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Chart */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
          <div className="flex-1 mb-6">
            <RealTimeChart greenhouseId={id} thresholds={thresholds} />
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
                  <span className="font-bold">
                    {latestData.temperature.value} {latestData.temperature.unit}
                  </span>
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Humidity:{" "}
                  <span className="font-bold">
                    {latestData.humidity.value} {latestData.humidity.unit}
                  </span>
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Moisture:{" "}
                  <span className="font-bold">
                    {latestData.moisture.value} {latestData.moisture.unit}
                  </span>
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
            <button
              className={`text-white font-bold py-2 px-4 rounded-md ${
                autoControl.waterPump ? "bg-green-600" : "bg-red-600"
              } transition duration-300`}
              onClick={toggleWaterPump}
            >
              {autoControl.waterPump ? "Water Pump On" : "Water Pump Off"}
            </button>
            <button
              className={`text-white font-bold py-2 px-4 rounded-md ${
                autoControl.ventilation ? "bg-green-600" : "bg-red-600"
              } transition duration-300`}
              onClick={toggleVentilation}
            >
              {autoControl.ventilation ? "Ventilation On" : "Ventilation Off"}
            </button>
            <button
              className="bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full transition duration-300"
              onClick={handleDelete}
            >
              Delete Greenhouse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
