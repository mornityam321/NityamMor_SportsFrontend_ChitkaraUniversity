import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import './App.css'; 
import NewsDashboard from './Components/NewsDashboard';
import Charts from './Components/Charts';
import Analytics from './Components/Analytics';
import { DataProvider } from './Components/DataContext';
import PayoutDetails from './Components/PayoutDetails';
import Login from './Components/Login'; 
import { useAuth0 } from '@auth0/auth0-react';
import Auth0ProviderWithHistory from './Components/authOprovider'; // Ensure Auth0 provider is added

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Optional: Loading indicator
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Auth0ProviderWithHistory>
      <DataProvider>
        <div className="app-container">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Routes>
              <Route path="/" element={<ProtectedRoute><NewsDashboard /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/payoutdetail" element={<ProtectedRoute><PayoutDetails /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><h1>Messages</h1></ProtectedRoute>} />
              <Route path="/login" element={<Login />} /> {/* Login route is public */}
            </Routes>
          </div>
        </div>
      </DataProvider>
    </Auth0ProviderWithHistory>
  );
};

export default App;
