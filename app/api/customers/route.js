// app/api/customers/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

// GET /api/customers - Get all customers
export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find({}).sort({ memberNumber: 1 });
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

// POST /api/customers - Create a new customer
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, dateOfBirth, memberNumber, interests } = body;

    // Validate required fields
    if (!name || !dateOfBirth || !memberNumber || !interests) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if member number already exists
    const existingCustomer = await Customer.findOne({ memberNumber });
    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Member number already exists' },
        { status: 400 }
      );
    }

    const customer = new Customer({
      name,
      dateOfBirth: new Date(dateOfBirth),
      memberNumber: parseInt(memberNumber),
      interests
    });

    await customer.save();
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}