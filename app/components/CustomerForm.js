// app/components/CustomerForm.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerForm({ customer = null, isEdit = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    dateOfBirth: customer?.dateOfBirth ? customer.dateOfBirth.split('T')[0] : '',
    memberNumber: customer?.memberNumber || '',
    interests: customer?.interests || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/customers/${customer._id}` : '/api/customers';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save customer');
      }
    } catch (error) {
      setError('Error saving customer');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Customer' : 'Add New Customer'}
      </h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter customer name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="memberNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Member Number *
          </label>
          <input
            type="number"
            id="memberNumber"
            name="memberNumber"
            value={formData.memberNumber}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter member number"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
            Interests *
          </label>
          <textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., movies, football, gym, gaming"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Customer' : 'Add Customer')}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}