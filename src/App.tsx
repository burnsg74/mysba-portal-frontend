// src/App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import DashboardContainer from './views/DashboardContainer';
import LoginPage from './components/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/login">
              <DashboardContainer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
