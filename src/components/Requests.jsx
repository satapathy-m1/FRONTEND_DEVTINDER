import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRequests = async () => {
    
    try {
      const response = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      });
      if(response.data.requests.length === 0) {
        console.log('No pending requests found.');
        return;
      }
      dispatch(addRequest(response.data.requests));
    } catch (err) {
      dispatch(addRequest([]));
      return;
      console.error('Error fetching requests:', err);
      
    }
  };

  const handleAction = async (requestId, action) => {
    setLoadingId(requestId);
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${action}/${requestId}`,
        {},
        { withCredentials: true }
      );

      console.log(res.data.message);
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error(`Error ${action} request:`, err);
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-gray-800 to-black min-h-screen">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">💌 Pending Requests</h2>
      {!requests || requests.length === 0 ? (
        <p className="text-gray-300 text-center">No pending requests right now, you're too cool 😎</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {requests.map((req) => (
            <div
              key={req._id}
              className="flex items-start gap-4 p-6 bg-black border border-yellow-400 rounded-2xl shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
            >
              <img
                src={req.fromUserId?.profilePicture}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-yellow-400 mb-1">
                  {req.fromUserId?.firstName} {req.fromUserId?.lastName}
                </h3>

                <div className="mb-1">
                  <span className="font-medium text-white">Skills:</span>{' '}
                  {req?.skills?.length ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {req.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400">Not specified</span>
                  )}
                </div>

                <p className="text-sm text-white mt-2">
                  <span className="font-medium">Status:</span> {req.status}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Sent: {new Date(req.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    className="px-5 py-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm font-bold disabled:opacity-50"
                    onClick={() => handleAction(req._id, 'accepted')}
                    disabled={loadingId === req._id}
                  >
                    {loadingId === req._id ? 'Processing...' : 'Accept'}
                  </button>
                  <button
                    className="px-5 py-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 text-sm font-bold disabled:opacity-50"
                    onClick={() => handleAction(req._id, 'rejected')}
                    disabled={loadingId === req._id}
                  >
                    {loadingId === req._id ? 'Processing...' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
