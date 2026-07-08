import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

const HeaderComponent = () => {

  const { isAuthenticated, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header>
        <nav
          className="navbar navbar-expand-lg px-4"
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e4e7"
          }}
        >
          <Link
            className="navbar-brand fw-bold"
            to="/"
            style={{ color: "#000000" }}
          >
            Athlete Management System
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <>
                  <Link className="nav-link" to="/athletes">Athletes</Link>
                  <Link className="nav-link" to="/coaches">Coaches</Link>
                  <Link className="nav-link" to="/competitions">Competitions</Link>
                  <Link className="nav-link" to="/trainings">Trainings</Link>
                  <Link className="nav-link" to="/profile">My Profile</Link>
                  <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="btn btn-primary me-2" to="/login">Login</Link>
                  <Link className="btn btn-success" to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
