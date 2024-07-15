import { Link } from "react-router-dom";
import "../../../css/navbarManager.css";
export const NavbarMentor = () => {
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
                <li className="nav-item" style={{paddingRight: "2rem"}}>
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
                      Manage Course
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown-inAdmin">
                      <Link className="dropdown-item" to="/mentor" id="dropdown-inAdmin-item">
                        Course
                      </Link>
                      <Link className="dropdown-item" to="/mentor/ViewCourse" id="dropdown-inAdmin-item">
                        View Course By Table
                      </Link>
                    </div>
                  </li>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
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
                      Manage Activities
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown-inAdmin">
                      <Link className="dropdown-item" to="/mentor" id="dropdown-inAdmin-item">
                        Activites
                      </Link>
                      <Link className="dropdown-item" to="/mentor/viewactivities" id="dropdown-inAdmin-item">
                        View Activities By Table
                      </Link>
                      <Link className="dropdown-item" to="/mentor/createActivities" id="dropdown-inAdmin-item">
                        Create Activities
                      </Link>
                    </div>
                  </li>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <Link className="nav-link" to="/mentor/report">View Report</Link>
                </li>
                <li className="nav-item" style={{paddingRight: "2rem"}}>
                  <Link className="nav-link" to="/mentor/feedback">Send Feedback</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
        </div>
    );
}