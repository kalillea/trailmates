import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  const activeStyle = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive && "active"}`;

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      className={
        isSmallScreen
          ? "container-nav-links-mobile"
          : "container-nav-links-desktop"
      }
    >
      <NavLink className={activeStyle} end to="/" onClick={onClick}>
        Utforsk
      </NavLink>
      <NavLink className={activeStyle} end to="/mytrips" onClick={onClick}>
        Mine Reiser
      </NavLink>
      <NavLink className={activeStyle} end to="/favorites" onClick={onClick}>
        Favoritter
      </NavLink>
    </div>
  );
};

export default NavLinks;
