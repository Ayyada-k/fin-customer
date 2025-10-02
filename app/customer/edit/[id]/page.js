"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await fetch(`${API_BASE}/customer/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Customer not found');
        }
        
        const customer = await response.json();
        
        // Format date for input field
        const formattedCustomer = {
          ...customer,
          dateOfBirth: new Date(customer.dateOfBirth).toISOString().split('T')[0]
        };
        
        reset(formattedCustomer);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchCustomer();
    }
  }, [params.id, reset]);

  async function handleUpdateCustomer(data) {
    try {
      // Convert date of birth to proper format
      data.dateOfBirth = new Date(data.dateOfBirth).toISOString();
      data.memberNumber = parseInt(data.memberNumber);
      data._id = params.id;

      const response = await fetch(`${API_BASE}/customer/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Error updating customer');
        return;
      }

      alert('Customer updated successfully!');
      router.push(`/customer/${params.id}`);
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error updating customer');
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
          <Link href={`/customer/${params.id}`}>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
              ← Back to Customer Details
            </button>
          </Link>
          <Link href="/customer">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Customer List
            </button>
          </Link>
        </div>

        {/* Edit Form */}
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Customer</h1>

          <form onSubmit={handleSubmit(handleUpdateCustomer)}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
                {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Number *
                </label>
                <input
                  type="number"
                  {...register("memberNumber", { 
                    required: "Member number is required",
                    min: { value: 1, message: "Member number must be positive" }
                  })}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
                {errors.memberNumber && <span className="text-red-500 text-sm">{errors.memberNumber.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests *
                </label>
                <textarea
                  placeholder="e.g., movies, football, gym, gaming"
                  {...register("interests", { required: "Interests are required" })}
                  rows="3"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
                {errors.interests && <span className="text-red-500 text-sm">{errors.interests.message}</span>}
              </div>

              <div className="flex justify-end space-x-4">
                <Link href={`/customer/${params.id}`}>
                  <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    Cancel
                  </button>
                </Link>
                <input
                  type="submit"
                  value="Update Customer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}