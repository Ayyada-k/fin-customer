# Customer Management System

A comprehensive customer management system built with Next.js, MongoDB, and Tailwind CSS featuring full CRUD operations.

## Features

- ✅ Customer model with Name, Date of Birth, Member Number, and Interests
- ✅ Complete CRUD API endpoints
- ✅ Responsive UI for all operations
- ✅ Customer listing with search and sort capabilities
- ✅ Add new customers
- ✅ Edit existing customers
- ✅ Delete customers with confirmation
- ✅ Detailed customer view page
- ✅ Form validation and error handling

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fin-customer
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/fin-customer
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Customer CRUD Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | Get all customers |
| POST | `/api/customers` | Create a new customer |
| GET | `/api/customers/[id]` | Get customer by ID |
| PUT | `/api/customers/[id]` | Update customer by ID |
| DELETE | `/api/customers/[id]` | Delete customer by ID |

### API Usage Examples

#### Create a Customer
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "dateOfBirth": "1990-05-15",
    "memberNumber": 1,
    "interests": "movies, football, gym, gaming"
  }'
```

#### Get All Customers
```bash
curl -X GET http://localhost:3000/api/customers
```

#### Get Customer by ID
```bash
curl -X GET http://localhost:3000/api/customers/{customer_id}
```

#### Update Customer
```bash
curl -X PUT http://localhost:3000/api/customers/{customer_id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "interests": "movies, football, gym, gaming, reading"
  }'
```

#### Delete Customer
```bash
curl -X DELETE http://localhost:3000/api/customers/{customer_id}
```

## Project Structure

```
fin-customer/
├── app/
│   ├── api/
│   │   └── customers/
│   │       ├── route.js          # GET all, POST new
│   │       └── [id]/
│   │           └── route.js      # GET, PUT, DELETE by ID
│   ├── components/
│   │   ├── CustomerList.js       # Main listing component
│   │   └── CustomerForm.js       # Add/Edit form component
│   ├── customers/
│   │   ├── add/
│   │   │   └── page.js          # Add customer page
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.js      # Edit customer page
│   │   └── [id]/
│   │       └── page.js          # Customer detail page
│   ├── globals.css
│   ├── layout.js
│   └── page.js                  # Home page
├── lib/
│   └── db.js                    # Database connection
├── models/
│   └── Customer.js              # Customer Mongoose model
└── CRUD_API_Documentation.md    # Complete API documentation
```

## Features Breakdown

### 1. Customer Model
- **Name**: String (required, trimmed)
- **Date of Birth**: Date (required)
- **Member Number**: Number (required, unique, minimum 1)
- **Interests**: String (required, trimmed)
- **Timestamps**: Automatically managed (createdAt, updatedAt)

### 2. UI Components

#### Customer List (`/`)
- Displays all customers in a responsive table
- Clickable customer names that navigate to detail page
- Edit and Delete buttons for each customer
- Add New Customer button
- Loading states and error handling

#### Add Customer (`/customers/add`)
- Form with all required fields
- Client-side validation
- Member number uniqueness checking
- Success/error feedback

#### Edit Customer (`/customers/edit/[id]`)
- Pre-populated form with existing customer data
- Partial updates supported
- Member number uniqueness checking (excluding current customer)
- Cancel and save options

#### Customer Detail (`/customers/[id]`)
- Comprehensive view of customer information
- Edit and Delete actions
- Formatted date display
- Metadata (created/updated timestamps)
- Navigation back to list

### 3. Error Handling
- Database connection errors
- Validation errors
- Not found errors
- Network errors
- User-friendly error messages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
