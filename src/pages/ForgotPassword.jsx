// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { auth } from '../firebase-config'; // Import the initialized auth object
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent successfully. Please check your inbox.');
    } catch (err) {
      setError('Failed to send password reset email. Please check the email address.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="h-[90vh] flex justify-center items-center px-4">
      <div className="border shadow-md p-4 rounded-xl max-w-lg w-full">
        <h1 className="text-teal-500 text-4xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}
          <button 
            type="submit" 
            className={`bg-teal-400 text-white p-2 my-4 w-full rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
        <div className="text-center">
          <p className="mt-2">Remember your password?</p>
          <button 
            onClick={handleLogin}
            className="bg-teal-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-teal-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
