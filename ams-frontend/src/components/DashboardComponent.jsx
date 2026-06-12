import {useState,useEffect} from 'react'
import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import { useNavigate } from 'react-router-dom';
import { listAthletes } from '../services/AthleteService';
import { listCoaches } from '../services/CoachService';
import { listCompetitions } from '../services/CompetitionService';
import { listTrainings, deleteTraining } from '../services/TrainingService';

const DashboardComponent = () => {
  const { isAuthenticated, role, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    athletes: 0,
    coaches: 0,
    competitions: 0,
    trainings: 0,
    upcomingTrainings: 0
  });
  const [myTrainings, setMyTrainings] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    listAthletes().then(response => setCounts(prev => ({ ...prev, athletes: response.data.length }))).catch(() => {});
    listCoaches().then(response => setCounts(prev => ({ ...prev, coaches: response.data.length }))).catch(() => {});
    listCompetitions().then(response => setCounts(prev => ({ ...prev, competitions: response.data.length }))).catch(() => {});
    listTrainings().then(response => {
      const allTrainings = response.data || [];
      setCounts(prev => ({ ...prev, trainings: allTrainings.length }));
      setMyTrainings(allTrainings);
    }).catch(() => {});
  }, [isAuthenticated]);

  const isCoach = role === "COACH";

  const coachTrainings = isCoach && user
    ? myTrainings.filter(t => t.coachName === `${user.firstName} ${user.lastName}`)
    : [];

  useEffect(() => {
    if (!isCoach) return;
    const today = new Date().toISOString().split('T')[0];
    const upcoming = coachTrainings.filter(t => t.trainingDate && t.trainingDate >= today).length;
    setCounts(prev => ({ ...prev, upcomingTrainings: upcoming }));
  }, [coachTrainings, isCoach]);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this training?")) {
      deleteTraining(id).then(() => {
        setMyTrainings(prev => prev.filter(t => t.id !== id));
      }).catch(() => {});
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-training/${id}`);
  };

  const renderCoachDashboard = () => (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <h3 className="welcome-heading">
            Welcome Coach, {user?.firstName || 'User'} 👋
          </h3>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 dashboard-card">
            <div className="card-body text-center">
              <h5 className="card-title">Total Trainings Created</h5>
              <p className="card-count">{counts.trainings}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 dashboard-card">
            <div className="card-body text-center">
              <h5 className="card-title">Total Athletes Enrolled</h5>
              <p className="card-count">{counts.athletes}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 dashboard-card">
            <div className="card-body text-center">
              <h5 className="card-title">Upcoming Trainings</h5>
              <p className="card-count">{counts.upcomingTrainings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>My Trainings</h4>
        <button className="btn btn-success" onClick={() => navigate('/add-training')}>
          ➕ Create Training
        </button>
      </div>

      {coachTrainings.length === 0 ? (
        <div className="alert alert-info">No trainings created yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Training Name</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coachTrainings.map((training) => (
                <tr key={training.id}>
                  <td>{training.trainingType}</td>
                  <td>{training.trainingDate}</td>
                  <td>{training.duration}</td>
                  <td>{training.location || '-'}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleUpdate(training.id)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(training.id, e)}>
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  return (
    <div className="container mt-4">
      {isCoach ? renderCoachDashboard() : (
        <>
          <h1 className="text-center mb-4 dashboard-heading" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Athlete Management System</h1>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="card h-100 dashboard-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Athletes</h5>
                  <p className="card-count">{counts.athletes}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card h-100 dashboard-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Coaches</h5>
                  <p className="card-count">{counts.coaches}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card h-100 dashboard-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Competitions</h5>
                  <p className="card-count">{counts.competitions}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card h-100 dashboard-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Trainings</h5>
                  <p className="card-count">{counts.trainings}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardComponent;
