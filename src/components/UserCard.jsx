import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}
        , {
          withCredentials: true,
        }
      )
      dispatch(removeUserFromFeed(userId));
    }catch(error) {
      console.error("Error sending request:", error);
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-800 to-black text-white border border-yellow-400 rounded-2xl shadow-xl w-full max-w-md">
      <figure className="p-4">
        <img
          src={user.profilePicture || "https://via.placeholder.com/150"}
          alt="profile"
          className="rounded-xl w-full h-60 object-cover border border-yellow-500"
        />
      </figure>
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          {user.firstName} {user.lastName}
        </h2>

        {user.age && (
          <p className="text-sm text-gray-300 mb-1">
            <span className="font-semibold text-white">Age:</span> {user.age}
          </p>
        )}

        {user.gender && (
          <p className="text-sm text-gray-300 mb-1">
            <span className="font-semibold text-white">Gender:</span> {user.gender}
          </p>
        )}

        {user.skills?.length > 0 && (
          <p className="text-sm text-gray-300 mb-1">
            <span className="font-semibold text-white">Skills:</span> {user.skills.join(", ")}
          </p>
        )}

        {user.about && (
          <p className="text-sm text-gray-300 mb-4">
            <span className="font-semibold text-white">About:</span> {user.about}
          </p>
        )}

        <div className="flex gap-3 justify-end">
          <button className="btn btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black"
            onClick={() => handleSendRequest('ignore', user._id)}
          >
            Ignore
          </button>
          <button className="btn bg-yellow-500 text-black hover:bg-yellow-600 font-semibold"
            onClick={() => handleSendRequest('interested', user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
