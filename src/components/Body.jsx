import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Body = ({}) => {
  const { id } = useParams();
  const [GHs, setGHs] = useState({});
  console.log(GHs);
  useEffect(() => {
    const getGHs = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/greenhouses/${id.toString()}`);
        setGHs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGHs();
  }, [id]);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/greenhouses/${id}`);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ml-72 p-8">
      {" "}
      {/* Adjust ml-72 to match your Sidebar width */}
      <div className="h-[75vh]">
        <h1 className="text-4xl font-bold">{GHs.name}</h1>
        <h2 className="text-2xl font-bold">{GHs.plantname}</h2>
        <p className="mt-4 text-lg">
          This is where your main content goes, excluding the Navbar and Sidebar
          styling.
        </p>
      </div>
      <div className="flex justify-end ">
        {" "}
        <button
          className="bg-red-500 border-0 text-white font-bold p-2 rounded-md "
          onClick={handleDelete}
        >
          Delete GreenHouse{" "}
        </button>
      </div>
    </div>
  );
};

export default Body;
