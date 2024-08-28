import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
// import "../styles/navbar.css";
function Navbar1() {
  const history = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserName(user);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    history("/");
  };

  return (
    <>
      <nav className="navbar nabar-bg navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <div className="navbar-brand">
              <h2 className="nav_name">GSK Tech</h2>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page">
                  {userName}
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  aria-current="page"
                  style={{ background: "none", border: "none" }}
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar1;
