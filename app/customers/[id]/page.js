// app/customers/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CustomerDetail() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setCustomer(data);
        } else {
          setError('Customer not found');
        }
      } catch (error) {
        setError('Error fetching customer');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCustomer();
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      try {
        const response = await fetch(`/api/customers/${params.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          router.push('/');
        } else {
          setError('Failed to delete customer');
        }
      } catch (error) {
        setError('Error deleting customer');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="text-center p-8">Loading customer details...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;
  if (!customer) return <div className="text-center p-8">Customer not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto p-6">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Customer List
          </Link>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
            <div className="flex gap-3">
              <Link
                href={`/customers/edit/${customer._id}`}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Member Number */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Member Number
              </h3>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                #{customer.memberNumber}
              </p>
            </div>

            {/* Date of Birth */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Date of Birth
              </h3>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                {formatDate(customer.dateOfBirth)}
              </p>
            </div>

            {/* Interests */}
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Interests
              </h3>
              <p className="mt-2 text-lg text-gray-900">
                {customer.interests}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">Created:</span> {formatDate(customer.createdAt)}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span> {formatDate(customer.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}