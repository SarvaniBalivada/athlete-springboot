import './App.css'

import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import DashboardComponent from './components/DashboardComponent'

import ListAthleteComponent from './components/ListAthleteComponent'
import AthleteComponent from './components/AthleteComponent'

import ListCoachComponent from './components/ListCoachComponent'
import CoachComponent from './components/CoachComponent'

import ListCompetitionComponent from './components/ListCompetitionComponent'
import CompetitionComponent from './components/CompetitionComponent'

import ListTrainingComponent from './components/ListTrainingComponent'
import TrainingComponent from './components/TrainingComponent'

import LoginComponent from './components/LoginComponent'
import RegistrationComponent from './components/RegistrationComponent'

import AthleteProfileComponent from './components/AthleteProfileComponent'
import CoachProfileComponent from './components/CoachProfileComponent'
import ProfileRoute from './components/ProfileRoute'

import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './components/AuthContext'

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';



function AppContent() {

  const location = useLocation();

    // Hide navbar on login and registration pages
    const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>

      {!hideNavbar && <HeaderComponent />}

        <Routes>

          {/* Dashboard - public read-only, shows full data when authenticated */}
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/dashboard" element={<DashboardComponent />} />

          {/* Registration */}
          <Route path="/register" element={<RegistrationComponent />} />

          {/* Login */}
          <Route path="/login" element={<LoginComponent />} />

          {/* Athlete - protected */}
          <Route
            path="/athletes"
            element={
              <ProtectedRoute>
                <ListAthleteComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-athlete"
            element={
              <ProtectedRoute>
                <AthleteComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-athlete/:id"
            element={
              <ProtectedRoute>
                <AthleteComponent />
              </ProtectedRoute>
            }
          />

          {/* Coach - protected */}
          <Route
            path="/coaches"
            element={
              <ProtectedRoute>
                <ListCoachComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-coach"
            element={
              <ProtectedRoute>
                <CoachComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-coach/:id"
            element={
              <ProtectedRoute>
                <CoachComponent />
              </ProtectedRoute>
            }
          />

          {/* Competition - protected */}
          <Route
            path="/competitions"
            element={
              <ProtectedRoute>
                <ListCompetitionComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-competition"
            element={
              <ProtectedRoute>
                <CompetitionComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-competition/:id"
            element={
              <ProtectedRoute>
                <CompetitionComponent />
              </ProtectedRoute>
            }
          />

          {/* Training - protected */}
          <Route
            path="/trainings"
            element={
              <ProtectedRoute>
                <ListTrainingComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-training"
            element={
              <ProtectedRoute>
                <TrainingComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-training/:id"
            element={
              <ProtectedRoute>
                <TrainingComponent />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileRoute
                  athleteProfile={<AthleteProfileComponent />}
                  coachProfile={<CoachProfileComponent />}
                />
              </ProtectedRoute>
            }
          />

        </Routes>

      {!hideNavbar && <FooterComponent />}

    </>
  );
}



function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <AppContent />

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;