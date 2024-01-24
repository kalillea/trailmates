import "./LoadingIndicator.css";
import { useEffect } from "react";

interface Props {
  isLoading: boolean;
}

export const LoadingIndicator = ({ isLoading }: Props) => {
  useEffect(() => {
    window.document.body.style.overflow = isLoading ? "hidden" : "visible";
    return () => {
      window.document.body.style.overflow = "visible";
    };
  }, [isLoading]);

  return (
    <div
      className="loading-indicator"
      style={{ display: isLoading ? "flex" : "none" }}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
