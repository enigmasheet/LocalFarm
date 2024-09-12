import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the useAuth hook
import { auth } from "../firebase-config"; // Import auth for signOut
import ThemeToggle from "./ThemeToggle";
import {
  FaSignOutAlt,
  FaUserPlus,
  FaSignInAlt,
  FaQuestionCircle,
  FaCog,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  const authContext = useAuth(); // Get the auth context
  const navigate = useNavigate(); // Hook to navigate programmatically

  if (!authContext) {
    // Handle the case where useAuth might not be available
    return (
      <div className="flex justify-center items-center h-16">
        <svg
          className="animate-spin h-8 w-8 text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
          ></path>
        </svg>
      </div>
    );
  }

  const { user } = authContext;

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      console.log("User logged out");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
      alert("There was an error logging out. Please try again.");
    }
  };

  return (
    <nav className="border-b shadow-md p-4 sticky top-0 z-50 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center w-full px-4">
        {/* Left Side - Local.Farm */}
        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          <Link to="/">Local.Farm</Link>
        </div>

        {/* Right Side - Links and Buttons */}
        <div className="flex items-center gap-4 text-lg font-semibold">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                to="/contact"
                className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md py-2 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600"
                aria-label="Contact Us"
              >
                <FaEnvelope className="mr-2" />
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md py-2 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600"
                aria-label="FAQ"
              >
                <FaQuestionCircle className="mr-2" />
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md py-2 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600"
                aria-label="Settings"
              >
                <FaCog className="mr-2" />
                Settings
              </Link>
            </li>
          </ul>
          <ThemeToggle />
          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105 flex items-center focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Logout"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            ) : (
              <>
                <Link to="/register">
                  <button
                    className="bg-teal-400 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105 flex items-center focus:outline-none focus:ring-2 focus:ring-teal-300"
                    aria-label="Register"
                  >
                    <FaUserPlus className="mr-2" />
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    className="bg-teal-400 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105 flex items-center focus:outline-none focus:ring-2 focus:ring-teal-300"
                    aria-label="Login"
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
