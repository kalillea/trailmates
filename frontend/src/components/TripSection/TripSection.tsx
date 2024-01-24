import { Trip } from "../../trips/trip";
import { Slider } from "../Slider/Slider";
import { TripCard } from "../TripCard/TripCard";
import "./TripSection.css";

interface Props {
  text: string;
  trips: Trip[];
  textColor: "black" | "white";
  line?: "no";
}

export const TripSection = ({ text, trips, textColor, line }: Props) => {
  const items = trips.map((trip) => (
    <TripCard trip={trip} key={trip.tripId} color={textColor} />
  ));

  return (
    <div className="trip-section">
      <h1 className="section-header-text">{text}</h1>
      <svg className="trip-section-divider">
        <rect
          x="0"
          y="0"
          rx="5"
          overflow={"visible"}
          className={line == "no" ? "hide" : ""}
        />
      </svg>
      <div id="slider-container">
        <Slider items={items} />
      </div>
    </div>
  );
};
