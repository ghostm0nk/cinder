import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import AuthForm from './pages/AuthForm';

// Placeholder components for future development
const Dashboard = () => <div className="p-8 text-2xl font-semibold text-gray-800">Cinder Dashboard - Your Tasks Here</div>;
const TaskDetailView = () => <div className="p-8 text-2xl font-semibold text-gray-800">Task Detail View</div>;
const Settings = () => <div className="p-8 text-2xl font-semibold text-gray-800">Application Settings</div>;

const App = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl font-medium text-gray-700">Loading application...</div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {session && <Header />}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/auth" element={!session ? <AuthForm /> : <Navigate to="/" />} />
                        <Route
                            path="/"
                            element={session ? <Dashboard /> : <Navigate to="/auth" />}
                        />
                        <Route
                            path="/task/:id"
                            element={session ? <TaskDetailView /> : <Navigate to="/auth" />}
                        />
                        <Route
                            path="/settings"
                            element={session ? <Settings /> : <Navigate to="/auth" />}
                        />
                        {/* Catch-all for unknown routes */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;