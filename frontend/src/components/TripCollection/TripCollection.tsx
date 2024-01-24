import { Trip } from "../../trips/trip";
import { TripCard } from "../TripCard/TripCard";
import "./TripCollection.css";

interface Props {
  trips: Trip[];
}

export const TripCollection = ({ trips }: Props) => {
  return (
    <div className="trip-collection">
      <div className="flex-container">
        {trips.map((trip) => {
          return <TripCard trip={trip} color="black" key={trip.tripId} />;
        })}
      </div>
    </div>
  );
};
