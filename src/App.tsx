import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PollCreatePage from './pages/PollCreate';
import PollPage from './pages/Poll';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-poll" element={<PollCreatePage />} />
          <Route path="/poll/:pollId" element={<PollPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
