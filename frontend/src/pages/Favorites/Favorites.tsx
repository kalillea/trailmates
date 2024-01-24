import { useContext, useState, useEffect } from "react";
import "./Favorites.css";
import { UserContext } from "../../authentication/UserProvider";
import { Navigate } from "react-router-dom";
import { TripCollection } from "../../components/TripCollection/TripCollection";
import { Trip } from "../../trips/trip";
import { FavoritesContext } from "../../trips/favorites/FavoritesProvider";
import { LoginContext } from "../../components/LoginPopup/LoginPopup";

export const Favorites = () => {
  const { currentUser } = useContext(UserContext);
  const [trips, setTrips] = useState<Trip[]>([]);
  const { currentUserFavorites } = useContext(FavoritesContext);
  const { showLoginModal } = useContext(LoginContext);

  useEffect(() => {
    if (currentUser) {
      setTrips(currentUserFavorites);
    } else {
      showLoginModal();
    }
  }, [currentUser, currentUserFavorites]);

  if (!currentUser) return <Navigate to="/" />;

  return (
    <div className="favorite">
      <TripCollection trips={trips} />
    </div>
  );
};
