import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {//yahi run ho rha 400 errror code k saath achha ek baat bata kya mujhe iss file mai userSlice ko laana chahiye?
    return (
      <div className="text-white text-center mt-10">
        Loading user data...
      </div>
    );
  }

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
