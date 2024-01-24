import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as RightButton } from "../assets/caro/carousel_right.svg";
import { ReactComponent as LeftButton } from "../assets/caro/carousel_left.svg";
import { ReactComponent as CloseButton } from "../assets/caro/caro_close.svg";
import "./PopupImageCarousel.css";
import { title } from "process";

interface Props {
  images: string[];
  titles: string[];
  dates: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const PopupImageCarousel: React.FC<Props> = ({
  images,
  isOpen,
  onClose,
  dates,
  titles,
}) => {
  const useOutsideAlerter = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handleCloseClick();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useOutsideAlerter(wrapperRef);

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="image-carousel-overlay">
      <div className="image-carousel-content" ref={wrapperRef}>
        <LeftButton
          className="image-carousel-button"
          onClick={handlePrevClick}
        />

        <div
          className="image-carousel-image"
          style={{ backgroundImage: `url(${images[activeIndex]})` }}
        >
          <h2>{titles[activeIndex]}</h2>
          <br />
          <h3>{dates[activeIndex]}</h3>
          <CloseButton
            onClick={handleCloseClick}
            className="carousel-close-btn"
          />
        </div>
        <RightButton
          className="image-carousel-button"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};
