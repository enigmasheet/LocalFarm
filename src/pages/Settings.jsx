import { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [greenhouses, setGreenhouses] = useState([]);
  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    plantname: "",
    temp: "",
    humidity: "",
    moisture: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/greenhouses")
      .then((response) => {
        setGreenhouses(response.data);
      })
      .catch((error) => console.error("Error fetching greenhouses:", error));
  }, []);

  const handleSelectChange = (e) => {
    const greenhouseId = e.target.value;
    if (greenhouseId) {
      const greenhouse = greenhouses.find((g) => parseInt(g.id) === parseInt(greenhouseId));
      setSelectedGreenhouse(greenhouse);
      setFormData({
        name: greenhouse.name,
        plantname: greenhouse.plantname,
        temp: greenhouse.temp,
        humidity: greenhouse.humidity,
        moisture: greenhouse.moisture,
      });
    } else {
      setSelectedGreenhouse(null);
      setFormData({
        name: "",
        plantname: "",
        temp: "",
        humidity: "",
        moisture: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = selectedGreenhouse ? "put" : "post";
    const url = selectedGreenhouse
      ? `http://localhost:3000/greenhouses/${selectedGreenhouse.id}`
      : "http://localhost:3000/greenhouses";

    axios({
      method,
      url,
      data: {
        ...formData,
        ...(selectedGreenhouse ? { id: selectedGreenhouse.id } : {}),
      },
    })
      .then((response) => {
        if (selectedGreenhouse) {
          setGreenhouses(
            greenhouses.map((g) =>
              g.id === response.data.id ? response.data : g
            )
          );
        } else {
          setGreenhouses([...greenhouses, response.data]);
        }
        setSelectedGreenhouse(null);
        setFormData({
          name: "",
          plantname: "",
          temp: "",
          humidity: "",
          moisture: "",
        });
      })
      .catch((error) => console.error("Error updating greenhouse:", error));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Greenhouse Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Select Greenhouse</label>
          <select
            onChange={handleSelectChange}
            value={selectedGreenhouse ? selectedGreenhouse.id : ""}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">New Greenhouse</option>
            {greenhouses.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Greenhouse Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Plant Name</label>
          <input
            type="text"
            name="plantname"
            value={formData.plantname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Threshold Temperature</label>
          <input
            type="text"
            name="temp"
            value={formData.temp}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Threshold Humidity</label>
          <input
            type="text"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Threshold Soil Moisture</label>
          <input
            type="text"
            name="moisture"
            value={formData.moisture}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Settings;
