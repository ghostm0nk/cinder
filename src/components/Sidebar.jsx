import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { session } = useAuth();

  if (!session) return null; // Only show sidebar if authenticated

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white p-4 space-y-4 shadow-lg min-h-screen">
      <div className="text-2xl font-bold mb-6 text-gray-100">Cinder</div>
      <nav className="flex flex-col space-y-2">
        <Link
          to="/"
          className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Dashboard
        </Link>
        <Link
          to="/customers"
          className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Customers
        </Link>
        <Link
          to="/leads"
          className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Leads
        </Link>
        <Link
          to="/tasks"
          className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Tasks
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;