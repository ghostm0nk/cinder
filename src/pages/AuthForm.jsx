import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                navigate('/');
            }
        };
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                navigate('/');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (isLogin) {
            const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
            if (authError) {
                setError(authError.message);
            }
        } else {
            const { data, error: authError } = await supabase.auth.signUp({ email, password });
            if (authError) {
                setError(authError.message);
            } else if (data.user) {
                // Insert profile data after successful signup
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({ id: data.user.id, email: data.user.email, username });
                if (profileError) {
                    setError('Signup successful, but failed to create profile: ' + profileError.message);
                    // Optionally, delete the user from auth.users if profile creation fails
                    await supabase.auth.admin.deleteUser(data.user.id); // This requires service role key, might not be suitable for client-side
                } else {
                    alert('Check your email for the confirmation link!');
                    setIsLogin(true); // Switch to login view after successful signup
                }
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    {isLogin ? 'Login to Cinder' : 'Sign Up for Cinder'}
                </h2>
                {error && (
                    <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 border border-red-200 transition-opacity duration-300 animate-fade-in">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="you@example.com"
                        />
                    </div>
                    {!isLogin && (
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Your Username"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (isLogin ? 'Logging In...' : 'Signing Up...') : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-blue-600 hover:text-blue-500 ml-2 focus:outline-none"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;