import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-0"> {/* Main content area takes remaining width, no extra padding here */}
              <Routes>
                <Route path="/login" element={<AuthForm />} />
                <Route path="/signup" element={<AuthForm />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/customers/:id" element={<CustomerDetail />} />
                  <Route path="/customers/:id/edit" element={<CustomerDetail />} /> {/* Placeholder for edit form */}
                  <Route path="/customers/new" element={<CustomerDetail />} /> {/* Placeholder for new form */}

                  <Route path="/leads" element={<Leads />} />
                  <Route path="/leads/:id" element={<LeadDetail />} />
                  <Route path="/leads/:id/edit" element={<LeadDetail />} /> {/* Placeholder for edit form */}
                  <Route path="/leads/new" element={<LeadDetail />} /> {/* Placeholder for new form */}

                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/tasks/:id" element={<TaskDetail />} />
                  <Route path="/tasks/:id/edit" element={<TaskDetail />} /> {/* Placeholder for edit form */}
                  <Route path="/tasks/new" element={<TaskDetail />} /> {/* Placeholder for new form */}

                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;