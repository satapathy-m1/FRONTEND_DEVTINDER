import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector(state => state.feed); // Grab feed array from Redux
  const fullReduxState = useSelector(state => state); // For debugging full state
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (Array.isArray(feed) && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true
      });

      console.log("🌐 Fetched feed from API:", res.data.feed);
      dispatch(addFeed(res.data.feed));
    } catch (error) {
      console.error('❌ Error fetching feed:', error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    console.log("📦 Updated feed from Redux:", feed);
  }, [feed]);

  useEffect(() => {
    console.log("🧠 Full Redux state:", fullReduxState);
  }, [fullReduxState]);

  return (
    <div className="flex flex-col items-center justify-center m-10">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p className="text-white">Loading feed or no users found.</p>
      )}
    </div>
  );
};

export default Feed;
