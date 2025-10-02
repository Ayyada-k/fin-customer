// app/customers/add/page.js
import CustomerForm from '../../components/CustomerForm';

export default function AddCustomer() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CustomerForm />
    </div>
  );
}