// app/api/customers/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';
import mongoose from 'mongoose';

// GET /api/customers/[id] - Get customer by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    const customer = await Customer.findById(id);
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}

// PUT /api/customers/[id] - Update customer by ID
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    const { name, dateOfBirth, memberNumber, interests } = body;

    // If memberNumber is being updated, check for duplicates
    if (memberNumber) {
      const existingCustomer = await Customer.findOne({ 
        memberNumber,
        _id: { $ne: id }
      });
      if (existingCustomer) {
        return NextResponse.json(
          { error: 'Member number already exists' },
          { status: 400 }
        );
      }
    }

    const updatedData = {};
    if (name) updatedData.name = name;
    if (dateOfBirth) updatedData.dateOfBirth = new Date(dateOfBirth);
    if (memberNumber) updatedData.memberNumber = parseInt(memberNumber);
    if (interests) updatedData.interests = interests;

    const customer = await Customer.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/[id] - Delete customer by ID
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    );
  }
}