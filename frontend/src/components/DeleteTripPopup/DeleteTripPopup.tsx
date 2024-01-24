import useNavigate from "../../hooks/useNavigate";
import { deleteTrip } from "../../trips/access";
import { Button } from "../Button/Button";
import "./DeleteTripPopup.css";

interface Props {
  tripId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteTripPopup = ({ tripId, isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  if (!isOpen) {
    return null;
  }

  return (
    <div className="image-carousel-overlay center">
      <div className="delete-trip-popup-confirm flex-column">
        <h2>Vil du virkelig slette denne reisen?</h2>
        <p>Virkelig?</p>
        <div className="delete-trip-button-container flex-row">
          <Button
            text={"Avbryt"}
            width={"10vw"}
            height={"2.5vh"}
            fontSize={"1vw"}
            styling={"accent-outline"}
            onClick={onClose}
          />
          <Button
            text={"Slett"}
            width={"10vw"}
            height={"3vh"}
            fontSize={"1vw"}
            styling={"accent-fill"}
            onClick={() => {
              deleteTrip(tripId).then(() => navigate("/"));
            }}
          />
        </div>
      </div>
    </div>
  );
};
