import { Link } from "react-router-dom";
import "../../../css/navbarManager.css";
export const NavbarAdmin = () => {
    return (
        <div>
      <div className="nav-workplace" role="banner" id="headerSmallerHeight">
        <nav className="navbar navbar-expand-md navbar-dark nav-custom" id="nav-workplace">
          <div className="container-fluid">
            <div className="collapse navbar-collapse ms-5" id="navbarsExample05">
              <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link active" to="/Admin">Manage pending user</Link>
                </li>

                <li
                  className="nav-item dropdown"
                  style={{ paddingRight: "2rem" }}
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="dropdown04"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Manage company
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown-inAdmin">
                    <Link className="dropdown-item" to="/Admin/CreateCompany" id="dropdown-inAdmin-item">
                      Create company
                    </Link>
                    <Link className="dropdown-item" to="/Admin/ViewAllCompany" id="dropdown-inAdmin-item">
                      View All Company
                    </Link>
                  </div>
                </li>
                <li
                  className="nav-item dropdown"
                  style={{ paddingRight: "2rem" }}
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="dropdown04"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Manage account
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown-inAdmin">
                    <Link className="dropdown-item" to="/Admin/ViewUser" id="dropdown-inAdmin-item">
                      View User
                    </Link>
                    <Link className="dropdown-item" to="/Admin/CreateUser" id="dropdown-inAdmin-item">
                      Register User
                    </Link>
                  </div>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link" to="/Workplace/Manager/Report">Helps</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
    );
}