import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CustomerDetail = () => {
  const { id } = useParams();
  // Placeholder data for a customer
  const customer = {
    id: id,
    name: 'Acme Corp',
    email: 'contact@acmecorp.com',
    status: 'Active',
    notes: 'Long-standing client, good payment history.',
    createdAt: '2022-01-15',
  };

  if (!customer) {
    return <div className="p-6 text-gray-700">Customer not found.</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer: {customer.name}</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-1 text-lg text-gray-900">{customer.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1 text-lg text-gray-900">{customer.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="mt-1 text-lg text-gray-900">{customer.status}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Created At</p>
            <p className="mt-1 text-lg text-gray-900">{customer.createdAt}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-500">Notes</p>
            <p className="mt-1 text-lg text-gray-900">{customer.notes}</p>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <Link
            to={`/customers/${customer.id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Edit Customer
          </Link>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            onClick={() => alert(`Deleting customer ${customer.name}`)}
          >
            Delete Customer
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity Log</h2>
        <ul className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <li className="p-2 border-b border-gray-200 last:border-b-0 text-gray-700">
            2023-10-26: Initial contact made.
          </li>
          <li className="p-2 border-b border-gray-200 last:border-b-0 text-gray-700">
            2023-11-01: Proposal sent.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerDetail;