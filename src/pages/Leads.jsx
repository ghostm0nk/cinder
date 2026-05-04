import React from 'react';
import { Link } from 'react-router-dom';

const Leads = () => {
  const leads = [
    { id: '101', contact_name: 'Jane Doe', company: 'FutureTech', status: 'New', source: 'Website' },
    { id: '102', contact_name: 'John Smith', company: 'InnovateX', status: 'Qualified', source: 'Referral' },
    { id: '103', contact_name: 'Alice Brown', company: 'DataCorp', status: 'Contacted', source: 'LinkedIn' },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Leads</h1>
      <Link to="/leads/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 mb-6 inline-block">
        Add New Lead
      </Link>
      <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.contact_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lead.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lead.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lead.source}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/leads/${lead.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                  <Link to={`/leads/${lead.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;