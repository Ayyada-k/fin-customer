// app/page.js
import CustomerList from './components/CustomerList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CustomerList />
    </main>
  );
}
