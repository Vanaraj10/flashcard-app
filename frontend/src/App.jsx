import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getToken } from './services/api';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import GeneratePage from './pages/GeneratePage';
import FlashcardSetPage from './pages/FlashcardSetPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [token, setToken] = useState(getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = () => {
      const userToken = getToken();
      setToken(userToken);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const PrivateRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      );
    }
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  const PublicRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      );
    }
    return !isAuthenticated() ? children : <Navigate to="/dashboard" />;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated() && <Navbar onLogout={handleLogout} />}
        <main className={isAuthenticated() ? 'main-content' : 'main-content-full'}>
          <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage onLogin={handleLogin} />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/generate"
              element={
                <PrivateRoute>
                  <GeneratePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/set/:setId"
              element={
                <PrivateRoute>
                  <FlashcardSetPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
