import { title } from "process";
import "./TripDetailsItem.css";

interface Props {
  title: string;
  content: string;
}

export const TripDetailsItem = ({ title, content }: Props) => {
  return (
    <div className="trip-details-item-container flex-column">
      <h3>{title}</h3>
      <div className="trip-detail-item-seperator"></div>
      <p>{content}</p>
    </div>
  );
};
