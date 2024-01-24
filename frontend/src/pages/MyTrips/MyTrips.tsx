import { useContext, useState, useEffect } from "react";
import "./MyTrips.css";
import { UserContext } from "../../authentication/UserProvider";
import { Navigate } from "react-router-dom";
import { TripCollection } from "../../components/TripCollection/TripCollection";
import { Trip } from "../../trips/trip";
import { getUserTrips } from "../../trips/access";
import { LoginContext } from "../../components/LoginPopup/LoginPopup";

export const MyTrips = () => {
  const { currentUser } = useContext(UserContext);
  const [userTrips, setUserTrips] = useState<Trip[]>([]);
  const { showLoginModal } = useContext(LoginContext);

  useEffect(() => {
    if (currentUser) {
      getUserTrips(currentUser.userUid).then(setUserTrips);
    } else {
      showLoginModal();
    }
  }, [currentUser]);

  if (!currentUser) return <Navigate to="/" />;

  return (
    <div className="my-trips">
      <TripCollection trips={userTrips} />
    </div>
  );
};
