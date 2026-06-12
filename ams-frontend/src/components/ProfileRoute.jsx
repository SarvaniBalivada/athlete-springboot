import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

const ProfileRoute = ({ athleteProfile, coachProfile }) => {
  const { role } = useContext(AuthContext);
  if (role === "COACH" || role === "ADMIN") {
    return coachProfile;
  }
  return athleteProfile;
};

export default ProfileRoute;
