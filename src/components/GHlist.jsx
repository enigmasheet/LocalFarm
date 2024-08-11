// src/components/GHlist.jsx
import { useState, useEffect } from 'react';
import GHcard from './GHcard';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase-config'; // Import the initialized database

const GHlist = () => {
  const [GHs, setGHs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const greenhouseRef = ref(database, 'greenhouses'); // Reference to the 'greenhouses' node

    const unsubscribe = onValue(greenhouseRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          // Convert object to array
          const greenhouseArray = Object.keys(data).map(key => ({
            id: key, // Firebase keys are used as IDs
            ...data[key]
          }));
          setGHs(greenhouseArray);
        } else {
          setGHs([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, {
      onlyOnce: false, // Listen for updates continuously
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {GHs.length > 0 ? (
        GHs.map(GH => (
          <GHcard key={GH.id} GH={GH} />
        ))
      ) : (
        <div>No greenhouses found</div>
      )}
    </div>
  );
};

export default GHlist;
