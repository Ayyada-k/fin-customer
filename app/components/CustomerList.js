// app/components/CustomerList.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        setError('Failed to fetch customers');
      }
    } catch (error) {
      setError('Error fetching customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const response = await fetch(`/api/customers/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setCustomers(customers.filter(customer => customer._id !== id));
        } else {
          setError('Failed to delete customer');
        }
      } catch (error) {
        setError('Error deleting customer');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="text-center p-4">Loading customers...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <Link 
          href="/customers/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Customer
        </Link>
      </div>

      {customers.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">No customers found</p>
          <Link 
            href="/customers/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Your First Customer
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Member #</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Date of Birth</th>
                <th className="py-2 px-4 border-b text-left">Interests</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{customer.memberNumber}</td>
                  <td className="py-2 px-4 border-b">
                    <Link 
                      href={`/customers/${customer._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {customer.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">{formatDate(customer.dateOfBirth)}</td>
                  <td className="py-2 px-4 border-b">{customer.interests}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center space-x-2">
                      <Link
                        href={`/customers/edit/${customer._id}`}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(customer._id, customer.name)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}