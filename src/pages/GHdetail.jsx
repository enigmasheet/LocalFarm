// src/pages/GHdetail.jsx
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

const GHdetail = () => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="md:w-64 w-full bg-gray-800 dark:bg-gray-900 text-white md:sticky md:top-0 md:min-h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
        <Body />
      </div>
    </div>
  );
};

export default GHdetail;
