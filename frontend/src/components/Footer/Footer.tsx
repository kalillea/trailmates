import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <section className="ft-main flex-row">
        <div className="ft-main-item flex-column">
          <img src={logo} alt="Trailmates Logo" className="ft-logo" />
        </div>

        <div className="ft-main-item flex-column footer-middle">
          <h2 className="ft-catchphrase">"Your backpacking companion."</h2>
          <p>Copyright @ Trailmates 2023</p>
        </div>

        <div className="ft-main-item flex-column footer-links">
          <Link to="/">Utforsk</Link>
          <Link to="/trips">Mine Reiser</Link>
          <Link to="/favorites">Favoritter</Link>
          <Link to="/profile">Profil</Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
