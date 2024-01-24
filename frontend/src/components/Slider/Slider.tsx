import { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./Slider.css";
import { ReactComponent as RightArrow } from "../../resources/media/arrow-right-icon.svg";

interface Props {
  items: React.ReactNode[];
  numItems?: number;
}

export const Slider = ({ items, numItems }: Props) => {
  const { width } = useWindowDimensions();
  const [startIdx, setStartIdx] = useState(0);

  const availableSpots = Math.round((width - 500) / 320) || 1;
  const endIdx = startIdx + (numItems || availableSpots);

  const handleNext = () => {
    if (endIdx >= items.length) return;
    setStartIdx((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (startIdx <= 0) return;
    setStartIdx((prev) => prev - 1);
  };

  return (
    <div className="slider-container">
      <button onClick={handlePrev} className="icon-button">
        <RightArrow className="nav-icon left" />
      </button>
      <div className="slider">{items.slice(startIdx, endIdx)}</div>
      <button onClick={handleNext} className="icon-button">
        <RightArrow className="nav-icon" />
      </button>
    </div>
  );
};
