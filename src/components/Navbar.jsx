import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the useAuth hook
import { auth } from "../firebase-config"; // Import auth for signOut

const Navbar = () => {
  const authContext = useAuth(); // Get the auth context
  const navigate = useNavigate(); // Hook to navigate programmatically

  if (!authContext) {
    // Handle the case where useAuth might not be available
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      console.log("User logged out");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="border-b shadow-md p-4 sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-center w-full px-4">
        {/* Left Side - Local.Farm */}
        <div className="text-2xl font-bold text-teal-600">
          <Link to="/">Local.Farm</Link>
        </div>

        {/* Right Side - Links and Buttons */}
        <div className="flex items-center gap-4 text-lg font-semibold">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                to="/contact"
                className="hover:bg-gray-200 rounded-md py-2 px-4 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:bg-gray-200 rounded-md py-2 px-4 transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="hover:bg-gray-200 rounded-md py-2 px-4 transition-colors"
              >
                Settings
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/register">
                  <button className="bg-teal-400 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-teal-400 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                    Login
                  </button>
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
