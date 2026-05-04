import React from 'react';
import { Link } from 'react-router-dom';

const Customers = () => {
  const customers = [
    { id: '1', name: 'Acme Corp', email: 'contact@acmecorp.com', status: 'Active' },
    { id: '2', name: 'Globex Inc', email: 'info@globex.com', status: 'Inactive' },
    { id: '3', name: 'Soylent Corp', email: 'sales@soylent.com', status: 'Active' },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customers</h1>
      <Link to="/customers/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 mb-6 inline-block">
        Add New Customer
      </Link>
      <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/customers/${customer.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                  <Link to={`/customers/${customer.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;