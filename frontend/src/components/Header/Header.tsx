import "./Header.css";
import img from "../assets/cover.svg";
import Searchbar from "../Searchbar/Searchbar";

export const Header = () => {
  const scrolldown = () => {
    window.scrollTo({
      top: window.innerHeight - 10,
      behavior: "smooth",
    });
  };
  return (
    <header className="cover" style={{ backgroundImage: `url(${img})` }}>
      <h1>
        Hva er ditt
        <br /> neste reisemål?
      </h1>
      <div className="search-bar-container">
        <Searchbar type="header" />
      </div>
      <div className="scrolldown-indicator">
        <a onClick={scrolldown}>╲╱</a>
      </div>
    </header>
  );
};
