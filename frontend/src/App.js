import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Login/login';
import AgentDashboard from './AgentView/agent';
import ManagerDashboard from './ManagerView/manager';
import CustomerView from './CustomerView/customer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/agent" element={<AgentDashboard />} />
       <Route path="/manager" element={<ManagerDashboard />} />
       <Route path="/customer" element={<CustomerView />} />
      </Routes>
    </Router>
  );
 
}

export default App;
