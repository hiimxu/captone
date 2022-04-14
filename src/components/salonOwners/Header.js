import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";

export default function Navigation() {
  

  return (
    <div>
    <nav
      className="navbar navbar-expand-lg is-fixed-top fixed-top font-weight-bold"
      style={{ backgroundColor: "rgb(0,0,0,90%)" }}
    >
      <div className="justify-content-center navbar-collapse text">
        <ul className="menu navbar-nav ml-5">
          <li className="nav-item">
            <Link to="../components/about">
              <img
                src={logoImg}
                alt="logo"
                style={{ width: "100%", height: "90px" }}
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>

  );
}
