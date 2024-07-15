import { Link } from "react-router-dom";
import "../../../css/navbarManager.css";

export const NavbarManager = () => {
  return (
    <div>
      <div className="nav-workplace" role="banner" id="headerSmallerHeight">
        <nav className="navbar navbar-expand-md navbar-dark nav-custom" id="nav-workplace">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample06"
              aria-controls="navbarsExample06"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ms-5" id="navbarsExample06">
              <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link active" to="/Workplace/Manager">
                    View Application
                  </Link>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link active" to="/Workplace/Manager/createAccount">
                    Create Employee Account
                  </Link>
                </li>
                <li className="nav-item dropdown" style={{ paddingRight: "2rem" }}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="dropdown04"
                    data-bs-toggle="dropdown"
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
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link" to="/Workplace/Manager/Report">
                    View Report
                  </Link>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link" to="/Workplace/Manager/schedule">
                    View Schedule
                  </Link>
                </li>
                <li className="nav-item dropdown" style={{ paddingRight: "2rem" }}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="dropdown04"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Manage Employees
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown-inAdmin">
                    <Link className="dropdown-item" to="/Workplace/Manager/viewEmployee" id="dropdown-inAdmin-item">
                      Manage all employees
                    </Link>
                    <Link className="dropdown-item" to="/Workplace/Manager/viewIntern" id="dropdown-inAdmin-item">
                      View Intern & Certificate
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
