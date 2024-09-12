import { useState } from 'react';
import { auth, database } from '../firebase-config'; // Import the initialized auth object and db
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database'; // Import ref and set for database operations
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
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
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Initialize user data
      const userData = {
        name,
        email,
        uid: user.uid,
        createdGreenhouses: [],
        managingGreenhouses: []
      };

      // Save user data to the Realtime Database
      await set(ref(database, `users/${user.uid}`), userData);

      // Sign in the user immediately after registration
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to the homepage 
      navigate('/');
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/email-already-in-use':
        return 'Email already in use.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      default:
        return 'Failed to register. Please try again.';
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
              value={name}
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
              value={email}
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
              value={password}
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
              value={confirmPassword}
              onChange={handleChange}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              placeholder="Confirm your password"
              required
              aria-required="true"
            />
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <button 
            type="submit" 
            className={`bg-teal-500 text-white py-2 px-4 rounded-md w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
            aria-live="polite"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
                </svg>
                Registering...
              </span>
            ) : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-300">Already have an account?</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-teal-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
