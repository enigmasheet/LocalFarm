import React from 'react';
import GHlist from './GHlist';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 mt-10 fixed left-0 top-0 overflow-y-auto">
     <div className='ml-5 block py-2 my-10 px-4 rounded'>
       <GHlist/>
     </div>
     <a href="http://localhost:5173/setting"><button className='ml-5 block py-2 px-4 rounded hover:bg-gray-700'>
            Add GreenHouse
        </button>
        </a>
    </div>
  );
};

export default Sidebar;
