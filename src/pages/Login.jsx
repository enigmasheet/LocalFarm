import { useState } from 'react';
import { auth } from '../firebase-config'; // Import the initialized auth object
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect user to the dashboard or home page
      navigate('/'); // Redirect to home page or dashboard
    } catch (err) {
      setError('Failed to login. Please check your email and password.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Redirect to forgot password page or open modal
    navigate('/forgot-password'); // Adjust route as needed
  };

  const handleRegister = () => {
    // Redirect to registration page
    navigate('/register');
  };

  return (
    <div className="h-screen flex justify-center items-center px-4 bg-gray-50 dark:bg-gray-800">
      <div className="border shadow-md p-6 rounded-xl max-w-lg w-full bg-white dark:bg-gray-900">
        <h1 className="text-teal-500 text-4xl font-bold text-center mb-4 dark:text-teal-400">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md p-3 w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 text-gray-900 dark:text-gray-300"
              placeholder="Enter your email"
              required
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
              className="border rounded-md p-3 w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 text-gray-900 dark:text-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <button 
            type="submit" 
            className={`bg-teal-500 text-white p-2 my-4 w-full rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-300`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button 
            onClick={handleForgotPassword}
            className="text-teal-500 hover:underline dark:text-teal-400"
          >
            Forgot Password?
          </button>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Don&apos;t have an account?</p>
          <button 
            onClick={handleRegister}
            className="bg-teal-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
