// src/components/HeaderSmaller.tsx
import { Link, useNavigate } from "react-router-dom";
import { SearchButton } from "./button/search";
import "../../css/header.css";
import "../../css/search.css";
import { useEffect, useState } from "react";
import AuthService from "../../service/AuthService";
import header2 from "../../images/header3.png";
import { JobList } from "../JobPage/JobList";
import { useToast } from "../../context/ToastContext";

export const HeaderSmaller: React.FC = () => {
  const [user, setUser] = useState<{ fullName: string } | null>(null);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    const storedUser = localStorage.getItem("user");
    console.log("HeaderSmaller "+storedUser);
    navigate("/");
    setUser(null);
    showToast("Logout successful!", 'success');
  };
  const handleViewProfile = ()=>{
    navigate("/profile");
  }
  return (
    <div>
      <header role="banner" id="headerSmallerHeight">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
          <svg
              width="50"
              height="50"
              viewBox="0 0 146 146"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M131.607 67.7562C131.524 67.1687 131.403 66.5875 131.242 66.0164L130.104 67.4521C129.907 64.8282 129.442 62.2314 128.717 59.7019C127.809 56.5322 126.605 53.4547 125.122 50.51C124.217 48.5393 123.116 46.6643 121.837 44.9133C121.174 43.8792 120.602 43.1127 120.492 42.9545C118.29 39.3714 115.827 37.1936 112.894 33.0934C111.037 29.9446 109.769 26.4833 109.153 22.8795C108.332 25.0416 107.715 27.2758 107.31 29.5529C104.372 26.5782 101.756 24.4064 100.205 22.9829C92.497 15.7863 93.4338 12.0938 93.4338 12.0938C93.4338 12.0938 79.0528 28.1233 85.27 44.8038C87.4246 50.4822 91.1456 55.4329 96.001 59.0814C102.017 64.0272 108.484 67.9144 111.872 77.9458C109.153 72.6759 105.006 68.2766 99.9065 65.2499C101.446 68.9121 102.218 72.7446 102.163 76.7109C102.161 80.2829 101.455 83.8193 100.085 87.118C98.7145 90.4168 96.7076 93.4131 94.1788 95.9357C91.6499 98.4584 88.6487 100.458 85.3466 101.82C82.0445 103.182 78.5063 103.879 74.9344 103.873C72.9181 103.885 70.9072 103.662 68.9423 103.21C66.5992 102.766 64.3316 101.99 62.208 100.904C59.0149 99.0082 56.2513 96.4683 54.0929 93.4462V93.4036C54.2394 93.4683 54.3923 93.5172 54.5491 93.5496C55.6867 93.9572 56.8121 94.2674 57.9984 94.4803C62.6036 95.4457 67.398 94.884 71.6555 92.8804C75.9625 90.4714 78.5844 88.7133 80.6831 89.3886C82.8001 90.0517 84.3818 88.0502 82.9522 85.9515C81.6944 84.3227 80.0146 83.0692 78.0951 82.3272C76.1755 81.5851 74.0894 81.3827 72.063 81.7418C67.7378 82.3563 63.7897 85.3857 58.193 82.4536C57.7855 82.2589 57.4813 82.0521 57.1224 81.8392C56.7574 81.5837 58.3512 82.1494 57.9375 81.8939C56.7017 81.2883 55.5175 80.5822 54.397 79.783C54.3423 79.7282 55.2791 80.0446 55.1635 79.9837C53.6994 78.9911 52.4431 77.7224 51.4649 76.2486C50.9805 75.3442 50.707 74.342 50.6649 73.3169C50.6228 72.2919 50.8131 71.2706 51.2215 70.3295C51.7466 69.3865 52.5555 68.633 53.5332 68.176L54.7012 68.7843C54.7012 68.7843 54.3423 68.176 54.1841 67.8658C54.245 67.8171 54.2997 67.8657 54.397 67.8171C55.0176 68.0726 56.3985 68.7843 57.165 69.2528C57.6787 69.5221 58.1208 69.91 58.4546 70.3843C58.4546 70.3843 58.7162 70.2808 58.5094 69.7273C58.2593 69.0548 57.7843 68.4895 57.165 68.1273H57.2745C57.8402 68.4376 58.3573 68.7478 58.8622 69.1433C59.3245 68.0118 59.5861 66.9046 59.5435 65.7183C59.5798 65.0727 59.491 64.4262 59.282 63.8143C59.069 63.4067 59.3854 63.2485 59.7382 63.6622C59.6809 63.3403 59.5764 63.0287 59.428 62.7375C59.428 62.7375 59.6348 62.4273 59.7382 62.3603C59.9998 62.117 60.2492 61.8615 60.5656 61.7094C62.348 60.584 64.2095 59.5985 66.1622 58.8259C67.226 58.4089 68.2713 57.9462 69.2951 57.4389C69.7027 57.1834 70.0677 56.9279 70.4266 56.6116C71.765 55.4862 72.641 53.9471 72.939 52.2438C72.9999 52.0004 72.9999 51.7936 72.9999 51.5928V51.1731C72.793 50.2971 71.3026 49.6827 63.5525 48.9101C62.2139 48.7056 60.9684 48.1012 59.9794 47.1762C58.9904 46.2513 58.3041 45.049 58.0106 43.7271V43.7697C57.8959 44.0617 57.7924 44.358 57.7003 44.6578C57.7976 44.3354 57.9011 44.086 58.0106 43.7697V43.7271C59.4939 39.8614 62.151 36.5575 65.6086 34.2797C65.7972 34.1276 64.8421 34.3223 65.0429 34.1763C65.6634 33.866 66.3265 33.5497 67.0443 33.2942C67.4032 33.1847 65.5539 32.479 63.9114 32.625C62.923 32.695 61.9518 32.9208 61.034 33.2942C61.4415 32.9961 62.567 32.5763 62.3115 32.5763C60.2257 32.9441 58.2254 33.6927 56.4106 34.7846C56.4106 34.5838 56.4715 34.4196 56.5201 34.2797C55.0781 34.8861 53.8197 35.8592 52.8701 37.1023V36.421C52.2301 36.943 51.6302 37.5123 51.0755 38.1243H51.0269C46.7559 36.4709 42.0991 36.0823 37.6131 37.005L37.5645 36.9503H37.6131C36.6785 36.2043 35.8818 35.3004 35.2589 34.2797L35.198 34.3223L35.1068 34.2249C34.7844 33.8113 34.541 33.3003 34.2125 32.7284C33.9692 32.3634 33.7624 31.9011 33.5069 31.4509C33.5069 31.4509 33.5069 31.4023 33.4582 31.4023C33.3974 31.4023 33.3 31.8707 33.2575 31.7003C32.4664 29.6603 32.096 27.4814 32.1685 25.2946H32.1199C30.8317 26.1457 29.8708 27.409 29.3945 28.8777C29.1451 29.4008 28.987 29.6563 28.8349 29.9666V29.7962L28.9809 29.0358C28.9444 29.0906 28.9444 29.1392 28.8775 29.1879C28.5139 29.6128 28.2072 30.0831 27.965 30.5871C27.6984 31.0533 27.4881 31.5496 27.3384 32.0653V31.8098C27.3384 31.603 27.3931 31.2928 27.3384 31.4023L27.2836 31.5422C25.6243 35.2021 24.5841 39.1121 24.2055 43.1127C24.1081 43.8305 24.1081 44.4997 24.1081 45.1628V45.2723C22.9341 46.553 21.887 47.9445 20.9813 49.4272C17.9974 54.4628 15.779 59.9144 14.3991 65.6028C15.3785 63.4493 16.5526 61.3383 17.9457 59.3917C15.29 66.0783 13.9296 73.2088 13.9368 80.4035C14.3991 78.2987 14.9649 76.2425 15.628 74.1863C15.2223 82.6877 16.8642 91.1621 20.4155 98.8968C25.1801 109.6 33.1181 118.581 43.155 124.623C47.2087 127.398 51.6567 129.547 56.3498 130.999C56.9703 131.199 57.6455 131.449 58.2539 131.662C58.0471 131.552 57.895 131.449 57.6942 131.406C63.2578 133.065 69.0316 133.911 74.837 133.919C95.4413 133.919 102.218 126.059 102.881 125.292C103.855 124.374 104.724 123.279 105.29 122.001C105.704 121.855 106.063 121.697 106.476 121.49L106.726 121.393C107.036 121.235 107.182 121.186 107.182 121.186C110.303 119.724 113.238 117.894 115.924 115.735C119.914 112.841 122.768 108.643 123.99 103.867C124.751 102.127 124.751 100.217 124.136 98.4284C124.441 97.9174 124.708 97.449 124.751 97.3456C129.179 90.2486 131.693 82.1246 132.045 73.7666V73.0609C132.057 71.2832 131.91 69.5079 131.607 67.7562Z"
                fill="#006ACC"
              />
            </svg>
            <Link className="navbar-brand" to="/home">InternBridge</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample05"
              aria-controls="navbarsExample05"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse ms-5" id="navbarsExample05">
              <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link active" to="/home">Home</Link>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <Link className="nav-link" to="/jobs">Jobs</Link>
                </li>
                <li className="nav-item dropdown" style={{ paddingRight: "2rem" }}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="dropdown04"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Workplace
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdown04">
                    <Link className="dropdown-item" to="/Workplace/Manager">Manager</Link>
                    <Link className="dropdown-item" to="/coordinator/course">Internship Coordinator</Link>
                    <Link className="dropdown-item" to="/intern">Internship</Link>
                    <Link className="dropdown-item" to="/mentor">Mentor</Link>
                  </div>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <a className="nav-link" href="#">About us</a>
                </li>
                <li className="nav-item" style={{ paddingRight: "2rem" }}>
                  <a className="nav-link" href="#">Helps</a>
                </li>
                <div>
                  {user && (
                    <div>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="dropdown04"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Hello, {user.fullName}
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdown04" id="dropdown">
                        <li
                            style={{marginBottom: "1em"}}
                            onClick={handleViewProfile}
                            className="nav-item cta-btn dropdown-item btn btn-mod btn-border btn-circle btn-large"
                            id="button-sign-out">
                          View Profile
                        </li>
                        <li
                            onClick={handleLogout}
                            className="nav-item cta-btn dropdown-item btn btn-mod btn-border btn-circle btn-large"
                            id="button-sign-out">
                          Logout
                        </li>
                      </div>
                    </div>
                  )}
                </div>
              </ul>

              <ul className="navbar-nav ml-auto">
                {!user && (
                    <li className="nav-item cta-btn">
                      <Link
                          type="button"
                          className="btn btn-mod btn-border btn-circle btn-large"
                      id="button-sign-in"
                      to="/login"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid d-flex justify-content-center">
          <div className="title-header">
            <h1>Find Your Job Now</h1>
            <div>
              <SearchButton search={search} setSearch={setSearch} />
            </div>
          </div>
        </div>
      </header>

      <div>
        <img className="stricky-top" src={header2} alt="" id="img-header-2" />
      </div>

      {/* Truyền giá trị tìm kiếm và hàm cập nhật xuống JobList */}
    </div>
  );
};
