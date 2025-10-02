"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomerPage() {
  const columns = [
    { field: 'memberNumber', headerName: 'Member #', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { 
      field: 'dateOfBirth', 
      headerName: 'Date of Birth', 
      width: 150,
      renderCell: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    { field: 'interests', headerName: 'Interests', width: 250 },
    {
      field: 'Action', 
      headerName: 'Action', 
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Link href={`/customer/${params.row._id}`}>
              <button className="mr-2 text-blue-600 hover:text-blue-800">👁️ View</button>
            </Link>
            <button 
              onClick={() => startEditMode(params.row)}
              className="mr-2 text-green-600 hover:text-green-800"
            >
              📝 Edit
            </button>
            <button 
              onClick={() => deleteCustomer(params.row)}
              className="text-red-600 hover:text-red-800"
            >
              🗑️ Delete
            </button>
          </div>
        )
      }
    },
  ]

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

  const [customerList, setCustomerList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  async function fetchCustomers() {
    try {
      const url = searchTerm 
        ? `${API_BASE}/customer?s=${encodeURIComponent(searchTerm)}`
        : `${API_BASE}/customer`;
      
      const data = await fetch(url);
      const customers = await data.json();
      
      const customersWithId = customers.map((customer) => ({
        ...customer,
        id: customer._id
      }));
      
      setCustomerList(customersWithId);
    } catch (error) {
      console.error('Error fetching customers:', error);
      alert('Error fetching customers');
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm]);

  async function handleCustomerFormSubmit(data) {
    try {
      // Convert date of birth to proper format
      data.dateOfBirth = new Date(data.dateOfBirth).toISOString();
      data.memberNumber = parseInt(data.memberNumber);

      if (editMode) {
        // Updating a customer
        const response = await fetch(`${API_BASE}/customer`, {
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

        stopEditMode();
        fetchCustomers();
        alert('Customer updated successfully!');
      } else {
        // Creating a new customer
        const response = await fetch(`${API_BASE}/customer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error || 'Error creating customer');
          return;
        }

        reset();
        fetchCustomers();
        alert('Customer created successfully!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  }

  function startEditMode(customer) {
    // Format date for input field
    const formattedCustomer = {
      ...customer,
      dateOfBirth: new Date(customer.dateOfBirth).toISOString().split('T')[0]
    };
    reset(formattedCustomer);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: '',
      dateOfBirth: '',
      memberNumber: '',
      interests: ''
    });
    setEditMode(false);
  }

  async function deleteCustomer(customer) {
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

      fetchCustomers();
      alert('Customer deleted successfully!');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Error deleting customer');
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers by name or interests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      {/* Customer Form */}
      <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
        <div className="grid grid-cols-2 gap-4 w-fit mb-6 border border-gray-800 p-4 rounded-lg">
          <div>Customer Name:</div>
          <div>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>Date of Birth:</div>
          <div>
            <input
              type="date"
              {...register("dateOfBirth", { required: "Date of birth is required" })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
          </div>

          <div>Member Number:</div>
          <div>
            <input
              type="number"
              {...register("memberNumber", { 
                required: "Member number is required",
                min: { value: 1, message: "Member number must be positive" }
              })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.memberNumber && <span className="text-red-500 text-sm">{errors.memberNumber.message}</span>}
          </div>

          <div>Interests:</div>
          <div>
            <input
              type="text"
              placeholder="e.g., movies, football, gym, gaming"
              {...register("interests", { required: "Interests are required" })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.interests && <span className="text-red-500 text-sm">{errors.interests.message}</span>}
          </div>

          <div className="col-span-2 text-right">
            {editMode ? (
              <>
                <input
                  type="submit"
                  className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                  value="Update Customer"
                />
                <button
                  type="button"
                  onClick={stopEditMode}
                  className="italic bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <input
                type="submit"
                value="Add Customer"
                className="italic bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              />
            )}
          </div>
        </div>
      </form>

      {/* Customer List */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">All Customers ({customerList.length})</h2>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={customerList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </div>
      </div>
    </main>
  );
}