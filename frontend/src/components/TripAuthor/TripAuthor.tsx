import { Button } from "../Button/Button";
import Edit from "../assets/Edit.svg";
import Remove from "../assets/Trashcan.svg";
import "./TripAuthor.css";
import { Trip } from "../../trips/trip";
import { useContext, useState } from "react";
import { DeleteTripPopup } from "../DeleteTripPopup/DeleteTripPopup";
import { UserContext } from "../../authentication/UserProvider";
import useNavigate from "../../hooks/useNavigate";

interface Props {
  author: string;
  trips: number;
  profilePic: string;
  authorUID: string;
  trip?: Trip;
}

export const TripAuthor = ({
  author,
  trips,
  profilePic,
  authorUID,
  trip,
}: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const handleProfileClick = () => {
    navigate(`/profile/${authorUID}`);
  };
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="trippage-profile-container flex-row">
      <div className="trippage-profile-left flex-column">
        <h2>SKREVET AV</h2>
        <img src={profilePic} alt="" id="trippage-profile" />
        <h3>{author}</h3>
        <p>{trips} reiser</p>
        <Button
          text={"Vis profil"}
          styling={"accent-outline"}
          width={"70%"}
          height={"3vh"}
          onClick={handleProfileClick}
        ></Button>
      </div>
      {trip &&
      (currentUser?.userUid === authorUID ||
        currentUser?.userType === "Admin") ? (
        <>
          <div className="flex-column trippage-profile-buttons">
            <img
              src={Edit}
              onClick={() => navigate("/edittrip/" + trip.tripId)}
              alt=""
            />
            <img src={Remove} onClick={handleOpenPopup} alt="" />
          </div>
          <DeleteTripPopup
            tripId={trip.tripId}
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
          />
        </>
      ) : (
        <div
          className="flex-column trippage-profile-buttons"
          style={{ width: "0" }}
        />
      )}
    </div>
  );
};
