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
    <div className="h-[90vh] flex justify-center items-center px-4">
      <div className="border shadow-md p-4 rounded-xl max-w-lg w-full">
        <h1 className="text-teal-500 text-4xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-md p-2"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button 
            type="submit" 
            className={`bg-teal-400 text-white p-2 my-4 w-full rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center">
          <button 
            onClick={handleForgotPassword}
            className="text-teal-500 hover:underline"
          >
            Forgot Password?
          </button>
          <p className="mt-2">Don&apos;t have an account?</p>
          <button 
            onClick={handleRegister}
            className="bg-teal-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-teal-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
