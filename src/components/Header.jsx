import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            navigate('/auth');
        } else {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                Cinder
            </Link>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transform hover:scale-105 transition-all duration-200"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;