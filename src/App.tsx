// src/App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import DashboardContainer from './views/DashboardContainer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LandingPage from './components/LandingPage/LandingPage'

const App: React.FC = () => {
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route 
          path="/user" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/">
              <DashboardContainer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
