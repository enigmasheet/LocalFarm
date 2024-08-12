import { useState } from 'react';
import { auth, database } from '../firebase-config'; // Import the initialized auth object and db
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database'; // Import ref, set, and get for database operations
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    adminEmail: '' // New field for admin email
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdminEmail, setShowAdminEmail] = useState(false); // State to toggle admin email input
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'role' && e.target.value === 'Manager') {
      setShowAdminEmail(true);
    } else if (e.target.name === 'role' && e.target.value !== 'Manager') {
      setShowAdminEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { name, email, password, confirmPassword, role, adminEmail } = formData;

    if (!name || !email || !password || !confirmPassword || !role || (role === 'Manager' && !adminEmail)) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Initialize user data
      const userData = {
        name: name,
        email: email,
        role: role,
        uid: user.uid,
        createdGreenhouses: [], // Initialize as empty array
        managingGreenhouses: [] // Initialize as empty array
      };

      // Save user data to the Realtime Database
      await set(ref(database, 'users/' + user.uid), userData);

      // If role is Manager, update the admin association
      if (role === 'Manager') {
        // Fetch the UID of the admin based on the admin email
        const adminSnapshot = await get(ref(database, 'users'));
        let adminUID = null;
        adminSnapshot.forEach((admin) => {
          if (admin.val().email === adminEmail) {
            adminUID = admin.val().uid;
          }
        });

        if (adminUID) {
          // Update the admin with managingGreenhouses
          const adminRef = ref(database, `users/${adminUID}/managingGreenhouses`);
          const adminData = (await get(adminRef)).val() || [];
          adminData.push(user.uid); // Add the new manager's UID to the managingGreenhouses array
          await set(adminRef, adminData);

          // Update the manager with the associated admin UID
          await set(ref(database, `users/${user.uid}/associatedAdmin`), adminUID);
        } else {
          setError('Admin email not found.');
          setLoading(false);
          return;
        }
      }

      // Redirect user to the login page or dashboard
      navigate('/login'); // Redirect to login page or dashboard
    } catch (err) {
      // Handle different types of Firebase Auth errors
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/email-already-in-use':
          setError('Email already in use.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please choose a stronger password.');
          break;
        default:
          setError('Failed to register. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-4 bg-gray-50 dark:bg-gray-800">
      <div className="border shadow-md p-6 rounded-xl max-w-lg w-full bg-white dark:bg-gray-900">
        <h1 className="text-teal-500 text-4xl font-bold text-center mb-4 dark:text-teal-400">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your name"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your email"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your password"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              placeholder="Confirm your password"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              required
              aria-required="true"
            >
              <option value="" disabled>Select your role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          {showAdminEmail && (
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin Email</label>
              <input
                type="email"
                name="adminEmail"
                id="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                placeholder="Enter admin's email"
                required={showAdminEmail}
                aria-required={showAdminEmail}
              />
            </div>
          )}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <button 
            type="submit" 
            className={`bg-teal-500 text-white py-2 px-4 rounded-md w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
            aria-live="polite"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-300">Already have an account?</p>
          <button 
            onClick={() => navigate('/login')}
            className="text-teal-500 hover:underline mt-2 dark:text-teal-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
