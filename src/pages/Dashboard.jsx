import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <p className="text-gray-600">Welcome to Cinder! This is your central hub for all activities.</p>
      {/* Placeholder for key metrics, recent activities, etc. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Open Leads</h3>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">Pending Tasks</h3>
          <p className="text-3xl font-bold text-yellow-600">30</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;