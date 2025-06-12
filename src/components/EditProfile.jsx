import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) {
    return <p className="text-white text-center mt-10">Loading profile...</p>;
  }

  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [age, setAge] = useState(user.age?.toString() || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          profilePicture,
          age: age? Number(age) : undefined,
          gender,
          about,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 gap-6 flex-wrap">
      {/* Edit Form Card */}
      {/* Two-Column Edit Form Card */}
        <div className="bg-gradient-to-b from-gray-800 to-black p-6 rounded-2xl shadow-xl border border-yellow-400 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl text-center font-bold text-yellow-400 mb-6">Edit Profile</h2>

          <div className="flex flex-wrap md:flex-nowrap gap-6">
            {/* Left Section */}
            <div className="w-full md:w-1/2">
              {/* First Name */}
              <label className="block mb-4">
                <span className="text-white font-medium">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="mt-1 input input-bordered w-full bg-black text-white border-yellow-400"
                />
              </label>

              {/* Last Name */}
              <label className="block mb-4">
                <span className="text-white font-medium">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 input input-bordered w-full bg-black text-white border-yellow-400"
                />
              </label>

              {/* Age */}
              <label className="block mb-4">
                <span className="text-white font-medium">Age</span>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 input input-bordered w-full bg-black text-white border-yellow-400"
                />
              </label>

              {/* Gender Dropdown */}
              <label className="block mb-4">
                <span className="text-white font-medium">Gender</span>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn w-full bg-yellow-500 text-black hover:bg-yellow-600">
                    {gender || "Select gender"}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-gray-800 text-white rounded-box w-full z-10"
                  >
                    <li><button onClick={() => setGender("Male")}>Male</button></li>
                    <li><button onClick={() => setGender("Female")}>Female</button></li>
                    <li><button onClick={() => setGender("Other")}>Other</button></li>
                    <li><button onClick={() => setGender("Prefer not to say")}>Prefer not to say</button></li>
                  </ul>
                </div>
              </label>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2">
              {/* Profile Picture URL */}
              <label className="block mb-4">
                <span className="text-white font-medium">Photo URL</span>
                <input
                  type="text"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  className="mt-1 input input-bordered w-full bg-black text-white border-yellow-400"
                />
              </label>

              {/* Skills */}
              <label className="block mb-4">
                <span className="text-white font-medium">Skills (comma separated)</span>
                <input
                  type="text"
                  value={skills.join(",")}
                  onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
                  className="mt-1 input input-bordered w-full bg-black text-white border-yellow-400"
                />
              </label>

              {/* About */}
              <label className="block mb-4">
                <span className="text-white font-medium">About</span>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered w-full bg-black text-white border-yellow-400"
                  placeholder="Write something about yourself"
                />
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Save Button */}
          <div className="flex justify-center mt-4">
            <button className="btn bg-yellow-500 hover:bg-yellow-600 text-black px-6 font-bold" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>

      
      
      </div>
      
      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center pt-20 z-50">
          <div className="alert alert-success bg-green-500 text-white font-semibold">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}


    </>
  );
};

export default EditProfile;
