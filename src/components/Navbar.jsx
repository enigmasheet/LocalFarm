// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import { auth } from '../firebase-config'; // Import auth for signOut

const Navbar = () => {
  const authContext = useAuth(); // Get the auth context
  if (!authContext) {
    // Handle the case where useAuth might not be available
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      console.log('User logged out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="border-b shadow-md p-4 sticky top-0 z-50 bg-white">
      <div className="flex flex-col md:flex-row md:justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-bold mb-2 md:mb-0">
          <Link to="/">Local.Farm</Link>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 text-lg font-semibold w-full md:w-auto">
          <ul className="flex flex-col md:flex-row md:gap-4 mb-2 md:mb-0">
            <li>
              <Link to="/contact" className="block py-1 px-2 md:px-4 hover:bg-gray-200 rounded-md">Contact Us</Link>
            </li>
            <li>
              <Link to="/settings" className="block py-1 px-2 md:px-4 hover:bg-gray-200 rounded-md">Settings</Link>
            </li>
          </ul>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            {user ? (
              <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-md">
                Logout
              </button>
            ) : (
              <>
                <Link to="/register">
                  <button className="bg-teal-400 text-white p-2 rounded-md">Register</button>
                </Link>
                <Link to="/login">
                  <button className="bg-teal-400 text-white p-2 rounded-md">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
