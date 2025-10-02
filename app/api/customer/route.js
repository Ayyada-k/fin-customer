import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET(request) {
  await dbConnect();
  
  // console.log('GET /api/customer', request.nextUrl.searchParams.get("pno"))
  const pno = request.nextUrl.searchParams.get("pno")
  if (pno) {
    const size = 10 // Pagination size
    const startIndex = (pno - 1) * size
    const customers = await Customer.find()
      .sort({ memberNumber: 1 })
      .skip(startIndex)
      .limit(size)
    return Response.json(customers)
  }

  // Search functionality
  const s = request.nextUrl.searchParams.get("s")
  if (s) {
    const customers = await Customer
      .find({ 
        $or: [
          { name: { $regex: s, $options: 'i' } },
          { interests: { $regex: s, $options: 'i' } }
        ]
      })
      .sort({ memberNumber: 1 })
    return Response.json(customers)
  }

  // Get all customers
  const customers = await Customer.find().sort({ memberNumber: 1 })
  return Response.json(customers)
}

export async function POST(request) {
  await dbConnect();
  
  try {
    const body = await request.json()
    
    // Check if member number already exists
    const existingCustomer = await Customer.findOne({ memberNumber: body.memberNumber })
    if (existingCustomer) {
      return Response.json(
        { error: "Member number already exists" }, 
        { status: 400 }
      )
    }
    
    const customer = new Customer(body)
    await customer.save()
    return Response.json(customer)
  } catch (error) {
    return Response.json(
      { error: error.message }, 
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  await dbConnect();
  
  try {
    const body = await request.json()
    
    // Check if member number already exists for another customer
    const existingCustomer = await Customer.findOne({ 
      memberNumber: body.memberNumber,
      _id: { $ne: body._id }
    })
    if (existingCustomer) {
      return Response.json(
        { error: "Member number already exists" }, 
        { status: 400 }
      )
    }
    
    const customer = await Customer.findByIdAndUpdate(body._id, body, { new: true })
    return Response.json(customer)
  } catch (error) {
    return Response.json(
      { error: error.message }, 
      { status: 500 }
    )
  }
}