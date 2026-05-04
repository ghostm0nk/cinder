import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { session, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Cinder
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        {session && (
          <>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Dashboard
            </Link>
            <Link to="/customers" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Customers
            </Link>
            <Link to="/leads" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Leads
            </Link>
            <Link to="/tasks" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Tasks
            </Link>
            <Link to="/settings" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Settings
            </Link>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        )}
        {!session && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
              Sign Up
            </Link>
          </>
        )}
      </nav>
      {/* Mobile menu button will go here */}
    </header>
  );
};

export default Header;