import  { useState } from 'react';
import GHlist from './GHlist';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Get authentication status

  if (!user) {
    return null; // Return null or a placeholder if not authenticated
  }

  return (
    <div>
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden p-4 text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-0 bg-gray-800 text-white min-h-[92vh] md:w-64 w-full overflow-y-auto flex flex-col shadow-lg border-r border-gray-700 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-center py-4 bg-gray-900 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Greenhouse Manager</h1>
        </div>

        {/* GH List and Add Greenhouse Button */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <GHlist />
          </div>

          {/* Add Greenhouse Button */}
          <div className="p-4 bg-gray-800">
            <Link to="/settings">
              <button className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300">
                Add Greenhouse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
