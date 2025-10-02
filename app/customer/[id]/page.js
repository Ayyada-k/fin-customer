"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await fetch(`${API_BASE}/customer/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Customer not found');
        }
        
        const customerData = await response.json();
        setCustomer(customerData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchCustomer();
    }
  }, [params.id]);

  async function deleteCustomer() {
    if (!confirm(`Are you sure you want to delete customer [${customer.name}]?`)) return;

    try {
      const response = await fetch(`${API_BASE}/customer/${customer._id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Error deleting customer');
        return;
      }

      alert('Customer deleted successfully!');
      router.push('/customer');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Error deleting customer');
    }
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center">Loading customer details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center text-red-600">Error: {error}</div>
        <div className="text-center mt-4">
          <Link href="/customer">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to Customer List
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="p-4">
      <div className="max-w-2xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/customer">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              ← Back to Customer List
            </button>
          </Link>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Customer Details</h1>
            <div className="flex space-x-2">
              <Link href={`/customer/edit/${customer._id}`}>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  📝 Edit
                </button>
              </Link>
              <button 
                onClick={deleteCustomer}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <label className="block text-sm font-medium text-gray-600">Member Number</label>
                <p className="text-lg font-semibold text-gray-800">#{customer.memberNumber}</p>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-lg font-semibold text-gray-800">{customer.name}</p>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(customer.dateOfBirth).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <label className="block text-sm font-medium text-gray-600">Age</label>
                <p className="text-lg font-semibold text-gray-800">
                  {Math.floor((new Date() - new Date(customer.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} years old
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <label className="block text-sm font-medium text-gray-600">Interests</label>
                <p className="text-lg font-semibold text-gray-800">{customer.interests}</p>
              </div>

              {customer.createdAt && (
                <div className="border-b border-gray-200 pb-2">
                  <label className="block text-sm font-medium text-gray-600">Member Since</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(customer.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {customer.updatedAt && (
                <div className="border-b border-gray-200 pb-2">
                  <label className="block text-sm font-medium text-gray-600">Last Updated</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(customer.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Summary</h3>
            <p className="text-gray-600">
              {customer.name} is a valued member of our community with member number #{customer.memberNumber}. 
              They are interested in {customer.interests.toLowerCase()} and have been with us since{' '}
              {customer.createdAt ? new Date(customer.createdAt).getFullYear() : 'they joined'}.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}