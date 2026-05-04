import React from 'react';
import { Link } from 'react-router-dom';

const Tasks = () => {
  const tasks = [
    { id: '201', title: 'Follow up with Acme Corp', due_date: '2023-11-05', status: 'Pending', assigned_to: 'You' },
    { id: '202', title: 'Prepare proposal for FutureTech', due_date: '2023-11-10', status: 'In Progress', assigned_to: 'You' },
    { id: '203', title: 'Call John Smith (InnovateX)', due_date: '2023-11-03', status: 'Completed', assigned_to: 'You' },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tasks</h1>
      <Link to="/tasks/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 mb-6 inline-block">
        Add New Task
      </Link>
      <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.due_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.assigned_to}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/tasks/${task.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                  <Link to={`/tasks/${task.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;