import "./Header.css";
import logo from "../../assets/Immerrock_logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <img src={logo} alt="Immerock Logo" className="logo-image" />
          <h1 className="logo">
            <span className="logo-text-flame">Custom Songs</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
