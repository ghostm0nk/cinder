import React from 'react';
import { useParams, Link } from 'react-router-dom';

const LeadDetail = () => {
  const { id } = useParams();
  // Placeholder data for a lead
  const lead = {
    id: id,
    contact_name: 'Jane Doe',
    company: 'FutureTech',
    status: 'New',
    source: 'Website',
    notes: 'Expressed interest in AI solutions.',
    createdAt: '2023-09-01',
  };

  if (!lead) {
    return <div className="p-6 text-gray-700">Lead not found.</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lead: {lead.contact_name}</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Contact Name</p>
            <p className="mt-1 text-lg text-gray-900">{lead.contact_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Company</p>
            <p className="mt-1 text-lg text-gray-900">{lead.company}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="mt-1 text-lg text-gray-900">{lead.status}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Source</p>
            <p className="mt-1 text-lg text-gray-900">{lead.source}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Created At</p>
            <p className="mt-1 text-lg text-gray-900">{lead.createdAt}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-500">Notes</p>
            <p className="mt-1 text-lg text-gray-900">{lead.notes}</p>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <Link
            to={`/leads/${lead.id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Edit Lead
          </Link>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            onClick={() => alert(`Deleting lead ${lead.contact_name}`)}
          >
            Delete Lead
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity Log</h2>
        <ul className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <li className="p-2 border-b border-gray-200 last:border-b-0 text-gray-700">
            2023-09-01: Lead created from website.
          </li>
          <li className="p-2 border-b border-gray-200 last:border-b-0 text-gray-700">
            2023-09-05: Initial email sent.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeadDetail;