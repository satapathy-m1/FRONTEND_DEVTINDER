import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      console.log("Fetched connections:", response.data.connections);
      dispatch(addConnection(response.data.connections));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className='flex justify-center items-center min-h-[70vh] text-gray-400 text-lg'>
        No connections found
      </div>
    );
  }

  return (
    <div className="p-6 min-h-[80vh] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
    <h2 className="text-3xl font-extrabold mb-8 text-center text-cyan-400 drop-shadow-lg tracking-wider">
        🌟 Your Connections 🌟
    </h2>

    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((conn) => (
        <div
            key={conn._id}
            className="bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-900 rounded-xl p-5 shadow-xl hover:shadow-cyan-500/50 transition-shadow flex flex-col justify-between"
        >
            <div className="flex items-center gap-4">
            <img
                src={conn.user.profilePicture || 'https://via.placeholder.com/60'}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-4 border-cyan-400 shadow-md"
            />
            <div>
                <h3 className="text-lg font-bold text-cyan-300">
                {conn.user.firstName} {conn.user.lastName}
                </h3>
                <p className="text-sm text-gray-300">{conn.user.email}</p>
            </div>
            </div>

            <div className="mt-5 flex justify-between items-center">
            <span className="text-sm text-gray-400 italic">
                Connected on: {new Date(conn.createdAt).toLocaleDateString()}
            </span>
            <button
                onClick={() =>
                console.log('Start chatting with', conn.user.firstName)
                }
                className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-1.5 px-4 rounded-full text-sm shadow-lg transition-all duration-200"
            >
                Message
            </button>
            </div>
        </div>
        ))}
    </div>
    </div>
  );
};

export default Connections;
