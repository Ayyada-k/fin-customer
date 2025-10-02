import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET(request, { params }) {
    await dbConnect();
    
    try {
        const id = params.id;
        const customer = await Customer.findById(id)
        if (!customer) {
            return Response.json(
                { error: "Customer not found" }, 
                { status: 404 }
            )
        }
        return Response.json(customer);
    } catch (error) {
        return Response.json(
            { error: error.message }, 
            { status: 500 }
        )
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    
    try {
        const id = params.id;
        const customer = await Customer.findByIdAndDelete(id)
        if (!customer) {
            return Response.json(
                { error: "Customer not found" }, 
                { status: 404 }
            )
        }
        return Response.json(customer);
    } catch (error) {
        return Response.json(
            { error: error.message }, 
            { status: 500 }
        )
    }
}

export async function PUT(request, { params }) {
    await dbConnect();
    
    try {
        const id = params.id;
        const body = await request.json()
        
        // Check if member number already exists for another customer
        const existingCustomer = await Customer.findOne({ 
            memberNumber: body.memberNumber,
            _id: { $ne: id }
        })
        if (existingCustomer) {
            return Response.json(
                { error: "Member number already exists" }, 
                { status: 400 }
            )
        }
        
        const customer = await Customer.findByIdAndUpdate(id, body, { new: true })
        if (!customer) {
            return Response.json(
                { error: "Customer not found" }, 
                { status: 404 }
            )
        }
        return Response.json(customer);
    } catch (error) {
        return Response.json(
            { error: error.message }, 
            { status: 500 }
        )
    }
}