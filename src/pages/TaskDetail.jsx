import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  // Placeholder data for a task
  const task = {
    id: id,
    title: 'Follow up with Acme Corp',
    description: 'Call to discuss the new contract terms and next steps.',
    due_date: '2023-11-05',
    status: 'Pending',
    assigned_to: 'You',
    related_to: { type: 'Customer', name: 'Acme Corp', id: '1' },
    createdAt: '2023-10-28',
  };

  if (!task) {
    return <div className="p-6 text-gray-700">Task not found.</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task: {task.title}</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Title</p>
            <p className="mt-1 text-lg text-gray-900">{task.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="mt-1 text-lg text-gray-900">{task.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Due Date</p>
            <p className="mt-1 text-lg text-gray-900">{task.due_date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="mt-1 text-lg text-gray-900">{task.status}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Assigned To</p>
            <p className="mt-1 text-lg text-gray-900">{task.assigned_to}</p>
          </div>
          {task.related_to && (
            <div>
              <p className="text-sm font-medium text-gray-500">Related To</p>
              <Link to={`/${task.related_to.type.toLowerCase()}s/${task.related_to.id}`} className="mt-1 text-lg text-blue-600 hover:text-blue-800">
                {task.related_to.name} ({task.related_to.type})
              </Link>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Created At</p>
            <p className="mt-1 text-lg text-gray-900">{task.createdAt}</p>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <Link
            to={`/tasks/${task.id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Edit Task
          </Link>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            onClick={() => alert(`Deleting task ${task.title}`)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;