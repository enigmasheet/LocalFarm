import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../firebase-config'; // Import Firebase auth and database
import GHcard from './GHcard';

const GHlist = () => {
  const [GHs, setGHs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // To store the current user

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchGreenhouses(authUser.uid); // Fetch greenhouses for the current user
      } else {
        setUser(null);
        setGHs([]); // Reset greenhouses if user logs out
        setLoading(false);
      }
    });

    return () => unsubscribeAuth(); // Cleanup the auth listener
  }, []);

  const fetchGreenhouses = (userId) => {
    const greenhouseRef = ref(database, 'greenhouses'); // Reference to the 'greenhouses' node

    onValue(greenhouseRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const filteredGHs = Object.keys(data)
            .map(key => ({
              id: key,
              ...data[key]
            }))
            .filter(greenhouse => greenhouse.createdBy === userId);

          setGHs(filteredGHs);
        } else {
          setGHs([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-lg font-medium dark:text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-lg font-medium text-red-500 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-2  dark:bg-gray-900">
      {GHs.length > 0 ? (
        <ul className="space-y-2">
          {GHs.map((GH) => (
            <li key={GH.id} className="border rounded-lg p-1 shadow-md bg-white dark:bg-gray-800 dark:text-white">
              <GHcard GH={GH} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-screen dark:bg-gray-900">
          <p className="text-lg font-medium dark:text-white">No greenhouses found for this user</p>
        </div>
      )}
    </div>
  );
};

export default GHlist;
