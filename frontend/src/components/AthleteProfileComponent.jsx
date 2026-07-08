import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContextProvider";
import axiosInstance from "../axiosConfig";

const AthleteProfileComponent = () => {
  const { user } = useContext(AuthContext);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axiosInstance
      .get(`http://localhost:8080/api/athletes/${user.id}/trainings`)
      .then((response) => {
        setTrainings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card h-100 profile-card">
            <div className="card-body text-center">
              <h5 className="card-title">My Profile</h5>
              <div className="profile-avatar mt-3">
                <i className="bi bi-person-circle fs-1 text-muted"></i>
              </div>
              <h6 className="mt-3">
                {user?.firstName} {user?.lastName}
              </h6>
              <p className="text-muted mb-1">{user?.email}</p>
              <span className="badge rounded-pill text-bg-info mt-2">
                {user?.role || "ATHLETE"}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Performance Overview</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <p className="text-muted">Loading...</p>
              ) : (
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="card border-0 bg-light">
                      <div className="card-body text-center">
                        <h3 className="text-primary fw-bold">{trainings.length}</h3>
                        <small className="text-muted">Joined Trainings</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0 bg-light">
                      <div className="card-body text-center">
                        <h3 className="text-success fw-bold">
                          {trainings.length > 0
                            ? Math.round(
                                trainings.reduce(
                                  (acc, t) => acc + (Number(t.duration) || 0),
                                  0
                                ) / trainings.length
                              )
                            : 0}
                        </h3>
                        <small className="text-muted">Avg Duration (mins)</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0 bg-light">
                      <div className="card-body text-center">
                        <h3 className="text-warning fw-bold">
                          {new Set(trainings.map((t) => t.coachName)).size}
                        </h3>
                        <small className="text-muted">Coaches Trained Under</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Joined Trainings</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : trainings.length === 0 ? (
            <p className="text-muted">No trainings joined yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Training Id</th>
                    <th>Type</th>
                    <th>Coach</th>
                    <th>Duration</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.map((training) => (
                    <tr key={training.id}>
                      <td>{training.id}</td>
                      <td>{training.trainingType}</td>
                      <td>{training.coachName}</td>
                      <td>{training.duration}</td>
                      <td>{training.trainingDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AthleteProfileComponent;
