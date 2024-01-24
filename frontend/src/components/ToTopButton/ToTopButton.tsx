import "./ToTopButton.css";
import { ReactComponent as Icon } from "../assets/totop-arrow.svg";
import { useState } from "react";

export const ToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <button
      className="to-top-button"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      <Icon className="to-top-icon" />
    </button>
  );
};
