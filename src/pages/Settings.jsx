import { useState, useEffect } from "react";
import { ref, set, update, onValue } from "firebase/database";
import { auth, database } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const TEMPERATURE_RANGE = { min: 15, max: 35 };
const HUMIDITY_RANGE = { min: 20, max: 90 };
const MOISTURE_RANGE = { min: 10, max: 100 };

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
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set the theme based on localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        fetchGreenhouses(user.uid);
      } else {
        setCurrentUser(null);
        setGreenhouses([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchGreenhouses = (uid) => {
    const greenhouseRef = ref(database, 'greenhouses');

    onValue(greenhouseRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userGreenhouses = Object.keys(data)
          .map(key => ({
            id: key,
            ...data[key],
          }))
          .filter(g => g.createdBy === uid);
        setGreenhouses(userGreenhouses);
      } else {
        setGreenhouses([]);
      }
    });
  };

  const handleSelectChange = (e) => {
    const greenhouseId = e.target.value;
    if (greenhouseId) {
      const greenhouse = greenhouses.find((g) => g.id === greenhouseId);
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Greenhouse name is required.";
    if (!formData.plantname) newErrors.plantname = "Plant name is required.";
    if (!formData.temp || formData.temp < TEMPERATURE_RANGE.min || formData.temp > TEMPERATURE_RANGE.max) 
      newErrors.temp = `Temperature must be between ${TEMPERATURE_RANGE.min}°C and ${TEMPERATURE_RANGE.max}°C.`;
    if (!formData.humidity || formData.humidity < HUMIDITY_RANGE.min || formData.humidity > HUMIDITY_RANGE.max) 
      newErrors.humidity = `Humidity must be between ${HUMIDITY_RANGE.min}% and ${HUMIDITY_RANGE.max}%.`;
    if (!formData.moisture || formData.moisture < MOISTURE_RANGE.min || formData.moisture > MOISTURE_RANGE.max) 
      newErrors.moisture = `Moisture must be between ${MOISTURE_RANGE.min}% and ${MOISTURE_RANGE.max}%.`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    if (!validateForm()) return;

    const greenhouseRef = ref(database, `greenhouses/${selectedGreenhouse ? selectedGreenhouse.id : Date.now()}`);
    const updateData = {
      name: formData.name,
      plantname: formData.plantname,
      temp: formData.temp,
      humidity: formData.humidity,
      moisture: formData.moisture,
      createdBy: currentUser.uid,
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
        navigate("/"); // Redirect to homepage
      })
      .catch((error) => {
        console.error("Error saving greenhouse:", error);
        setAlertMessage("Error saving greenhouse. Please try again.");
      });
  };

  return (
    <div className=" p-6 max-w-7xl mx-auto justify-center flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 lg:pr-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-4">Greenhouse Settings</h1>
        {alertMessage && (
          <div className={`mb-4 p-2 rounded ${alertMessage.includes("successfully") ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Select Greenhouse</label>
            <select
              onChange={handleSelectChange}
              value={selectedGreenhouse ? selectedGreenhouse.id : ""}
              className={`w-full p-3 border ${selectedGreenhouse ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-black'} rounded-md`}
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
            <label className="block font-semibold">Greenhouse Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter greenhouse name"
              className={`w-full p-3 border ${errors.name ? 'bg-red-100 border-red-500' : 'bg-gray-100 border-gray-300'} rounded-md`}
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Plant Name</label>
            <input
              type="text"
              name="plantname"
              value={formData.plantname}
              onChange={handleChange}
              placeholder="Enter plant name"
              className={`w-full p-3 border ${errors.plantname ? 'bg-red-100 border-red-500' : 'bg-gray-100 border-gray-300'} rounded-md`}
            />
            {errors.plantname && <p className="text-red-600">{errors.plantname}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Threshold Temperature ({TEMPERATURE_RANGE.min}°C - {TEMPERATURE_RANGE.max}°C)</label>
            <input
              type="number"
              name="temp"
              value={formData.temp}
              onChange={handleChange}
              placeholder={`Range: ${TEMPERATURE_RANGE.min}°C - ${TEMPERATURE_RANGE.max}°C`}
              className={`w-full p-3 border ${errors.temp ? 'bg-red-100 border-red-500' : 'bg-gray-100 border-gray-300'} rounded-md`}
            />
            {errors.temp && <p className="text-red-600">{errors.temp}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Threshold Humidity ({HUMIDITY_RANGE.min}% - {HUMIDITY_RANGE.max}%)</label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              placeholder={`Range: ${HUMIDITY_RANGE.min}% - ${HUMIDITY_RANGE.max}%`}
              className={`w-full p-3 border ${errors.humidity ? 'bg-red-100 border-red-500' : 'bg-gray-100 border-gray-300'} rounded-md`}
            />
            {errors.humidity && <p className="text-red-600">{errors.humidity}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Threshold Soil Moisture ({MOISTURE_RANGE.min}% - {MOISTURE_RANGE.max}%)</label>
            <input
              type="number"
              name="moisture"
              value={formData.moisture}
              onChange={handleChange}
              placeholder={`Range: ${MOISTURE_RANGE.min}% - ${MOISTURE_RANGE.max}%`}
              className={`w-full p-3 border ${errors.moisture ? 'bg-red-100 border-red-500' : 'bg-gray-100 border-gray-300'} rounded-md`}
            />
            {errors.moisture && <p className="text-red-600">{errors.moisture}</p>}
          </div>
          <button
            type="submit"
            className={`p-3 rounded-md ${selectedGreenhouse ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold`}
          >
            {selectedGreenhouse ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
