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
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                {/* First Name */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                {/* Last Name */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                {/* Age */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="Number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                {/* Photo URL */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                {/* Gender */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                      {gender || "Select gender"}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li><button onClick={() => setGender("Male")}>Male</button></li>
                      <li><button onClick={() => setGender("Female")}>Female</button></li>
                      <li><button onClick={() => setGender("Other")}>Other</button></li>
                      <li><button onClick={() => setGender("Prefer not to say")}>Prefer not to say</button></li>
                    </ul>
                  </div>
                </label>

                {/* Skills */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <input
                    type="text"
                    value={skills.join(",")}
                    onChange={(e) =>
                      setSkills(e.target.value.split(",").map(skill => skill.trim()))
                    }
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                {/* About */}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea textarea-bordered w-full max-w-xs"
                  />
                </label>
              </div>

              <p className="text-red-500 text-center">{error}</p>

              <div className="card-actions justify-center mt-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{
            firstName,
            lastName,
            profilePicture,
            about,
            age,
            gender,
            skills,
          }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center pt-20">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
