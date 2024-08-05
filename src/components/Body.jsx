import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RealTimeChart from "./RealTimeChart";

const Body = () => {
  const { id } = useParams();
  const [greenhouse, setGreenhouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestData, setLatestData] = useState(null);
  const [thresholds, setThresholds] = useState({});

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const greenhouseResponse = await axios.get(`http://localhost:3000/greenhouses/${id}`);
        setGreenhouse(greenhouseResponse.data);
        setThresholds({
          temperature: greenhouseResponse.data.temp,
          humidity: greenhouseResponse.data.humidity,
          moisture: greenhouseResponse.data.moisture,
        });

        const statusResponse = await axios.get(`http://localhost:3000/realTimeData?greenhouseId=${id}`);
        const statusData = statusResponse.data;

        const latest = statusData.reduce((latest, current) =>
          new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest,
          statusData[0]
        );

        setLatestData(latest);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchGreenhouseData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/greenhouses/${id}`);
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting greenhouse:", error);
    }
  };

  const toggleWaterPump = () => {
    setLatestData((prevData) => ({
      ...prevData,
      water_pump: {
        status: prevData.water_pump.status === 'on' ? 'off' : 'on',
      },
    }));
  };

  const toggleVentilation = () => {
    setLatestData((prevData) => ({
      ...prevData,
      ventilation: {
        status: prevData.ventilation.status === 'on' ? 'off' : 'on',
      },
    }));
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!greenhouse || !latestData) {
    return <div className="text-center p-8">Greenhouse not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 lg:p-8 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Chart */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="flex-1 mb-6">
            <RealTimeChart greenhouseId={id} thresholds={thresholds} />
          </div>
        </div>

        {/* Details and Controls */}
        <div className="flex flex-col lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{greenhouse.name}</h1>
            <h2 className="text-xl font-semibold mb-4">{greenhouse.plantname}</h2>
            <p className="text-lg mb-2">Temperature: {latestData.temperature.value} {latestData.temperature.unit}</p>
            <p className="text-lg mb-2">Humidity: {latestData.humidity.value} {latestData.humidity.unit}</p>
            <p className="text-lg">Moisture: {latestData.moisture.value} {latestData.moisture.unit}</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              className={`text-white font-bold py-2 px-4 rounded-md ${latestData.water_pump.status === 'on' ? 'bg-red-500' : 'bg-green-500'} transition duration-300`}
              onClick={toggleWaterPump}
            >
              {latestData.water_pump.status === 'on' ? 'Turn Water Pump Off' : 'Turn Water Pump On'}
            </button>
            <button
              className={`text-white font-bold py-2 px-4 rounded-md ${latestData.ventilation.status === 'on' ? 'bg-red-500' : 'bg-green-500'} transition duration-300`}
              onClick={toggleVentilation}
            >
              {latestData.ventilation.status === 'on' ? 'Turn Ventilation Off' : 'Turn Ventilation On'}
            </button>
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-md w-full transition duration-300"
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
