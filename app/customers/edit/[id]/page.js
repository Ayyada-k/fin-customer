// app/customers/edit/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CustomerForm from '../../../components/CustomerForm';

export default function EditCustomer() {
  const params = useParams();
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

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!customer) return <div className="text-center p-4">Customer not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CustomerForm customer={customer} isEdit={true} />
    </div>
  );
}