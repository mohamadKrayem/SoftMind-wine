import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUserAlt,
  FaSignOutAlt,
  FaWineGlassAlt,
} from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import "./Sidebar.scss";
import AuthContext from "../../context/AuthProvider";

const Sidebar = ({ children }) => {

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/",
      name: "Reds",
      icon: <FaWineGlassAlt style={{color: 'red', fontSize: '1.2rem'}}/>,
    },
    {
      path: "/whites",
      name: "Whites",
      icon: <FaWineGlassAlt style={{fontSize: '1.2rem'}}/>,
    },
    {
      path: "/sparkling",
      name: "Sparkling",
      icon: <FaWineGlassAlt style={{color:'sparkling',fontSize: '1.2rem'}}/>,
    },
    {
      path: "/rose",
      name: "Rose",
      icon: <FaWineGlassAlt style={{fontSize: '1.2rem'}}/>,
    },
    {
      path: "/search",
      name: "Search",
      icon: <ImSearch style={{fontSize: '1.2rem'}}/>,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
  ];
  return (
    <div className="container-sidebar">
      <div
        style={{
          width: isOpen ? "200px" : "50px",
        }}
        className="sidebar"
      >
        <div
          className="top_section-sidebar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            // transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <h1
            style={{
              display: isOpen ? "block" : "none",
              marginTop: "20px",
            }}
            className="logo-sidebar"
          >
            SoftMind
          </h1>
          <div
            style={{
              marginLeft: isOpen ? "50px" : "0px",
            }}
            className="bars-sidebar"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link-sidebar">
            <div className="icon-sidebar">
              {item.icon}
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text-sidebar"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <button onClick={handleLogout} className="link-sidebar logout-btn-sidebar">
          <div className="icon-sidebar">
            <FaSignOutAlt />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text-sidebar"
          >
            Logout
          </div>
        </button>
      </div>
            <main>{children}</main>
    </div>
  );
};

export default Sidebar;
