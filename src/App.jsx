import { Routes, Route, Link, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import Planning from './pages/Planning';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import Vitals from './pages/Vitals';
import Login from './pages/Login';
import Register from './pages/Register';

// Composant pour protéger les routes
function ProtectedRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="app-container">
      {/* Navbar - Affichée que si authentifié */}
      {isAuthenticated && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <h1 className="navbar-brand mb-0">Ma Santé ++</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-3">
                <li className="nav-item"><Link to="/" className="nav-link">Dashboard</Link></li>
                <li className="nav-item"><Link to="/planning" className="nav-link">Planning</Link></li>
                <li className="nav-item"><Link to="/documents" className="nav-link">Documents</Link></li>
                <li className="nav-item"><Link to="/profile" className="nav-link">Profil</Link></li>
                <li className="nav-item"><Link to="/vitals" className="nav-link">Constantes</Link></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                    {user?.email}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li><Link to="/profile" className="dropdown-item">Mon Profil</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>Déconnexion</button></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Contenu qui change selon la route */}
      <main className="main-content">
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes protégées */}
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
          <Route path="/planning" element={<ProtectedRoute element={<Planning />} isAuthenticated={isAuthenticated} />} />
          <Route path="/documents" element={<ProtectedRoute element={<Documents />} isAuthenticated={isAuthenticated} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} isAuthenticated={isAuthenticated} />} />
          <Route path="/vitals" element={<ProtectedRoute element={<Vitals />} isAuthenticated={isAuthenticated} />} />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;