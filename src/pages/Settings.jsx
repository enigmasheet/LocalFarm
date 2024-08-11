import { useState, useEffect } from "react";
import { ref, set, update, remove, onValue } from "firebase/database";
import { database } from '../firebase-config'; // Import Firebase config

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
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const greenhouseRef = ref(database, 'greenhouses');

    const unsubscribe = onValue(greenhouseRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const greenhouseArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setGreenhouses(greenhouseArray);
      } else {
        setGreenhouses([]);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleSelectChange = (e) => {
    const greenhouseId = e.target.value;
    if (greenhouseId) {
      const greenhouse = greenhouses.find(
        (g) => g.id === greenhouseId
      );
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

    // Check for empty fields
    if (
      !formData.name ||
      !formData.plantname ||
      !formData.temp ||
      !formData.humidity ||
      !formData.moisture
    ) {
      setAlertMessage("Please fill in all fields before saving.");
      return;
    }

    const greenhouseRef = ref(database, `greenhouses/${selectedGreenhouse ? selectedGreenhouse.id : Date.now()}`);

    const updateData = {
      name: formData.name,
      plantname: formData.plantname,
      temp: formData.temp,
      humidity: formData.humidity,
      moisture: formData.moisture,
    };

    const action = selectedGreenhouse ? update(greenhouseRef, updateData) : set(greenhouseRef, updateData);

    action
      .then(() => {
        if (selectedGreenhouse) {
          setGreenhouses(
            greenhouses.map((g) =>
              g.id === selectedGreenhouse.id ? { ...g, ...formData } : g
            )
          );
          setAlertMessage("Greenhouse updated successfully!");
        } else {
          setGreenhouses([...greenhouses, { id: Date.now().toString(), ...formData }]);
          setAlertMessage("Greenhouse added successfully!");
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
      .catch((error) => {
        console.error("Error saving greenhouse:", error);
        setAlertMessage("Error saving greenhouse. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Greenhouse Settings</h1>
      {alertMessage && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
          {alertMessage}
        </div>
      )}
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
