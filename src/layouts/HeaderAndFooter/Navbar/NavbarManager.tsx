import { Link } from "react-router-dom";
import "../../../css/navbarManager.css";
export const NavbarManager = () => {
    return (
        <div>
      <div className="nav-workplace" role="banner" id="headerSmallerHeight">
        <nav className="navbar navbar-expand-md navbar-dark nav-custom" id="nav-workplace">
          <div className="container-fluid">
            <div className="collapse navbar-collapse ms-5" id="navbarsExample05">
              <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link active" to="/Workplace/Manager">View Application</Link>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link active" to="/Workplace/Manager/createAccount">Create Employee Account</Link>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <li
                  className="nav-item dropdown"
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="dropdown04"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Manage Recruitment
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown-inAdmin">
                    <Link className="dropdown-item" to="/Workplace/Manager/postJob" id="dropdown-inAdmin-item">
                    Post Recruitment News
                    </Link>
                    <Link className="dropdown-item" to="/Workplace/Manager/viewJob" id="dropdown-inAdmin-item">
                    View Recruitment News
                    </Link>
                  </div>
                </li>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link" to="/Workplace/Manager/Report">View Report</Link>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link" to="/Workplace/Manager/Report">Helps</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <h1 id="h1-welcome">Welcome </h1>
      </div>
    </div>
    );
}