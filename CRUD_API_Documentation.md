# Customer Management API Documentation

## CRUD Operations for Customer Management System

### 1. Create Customer

**Route:** `POST /api/customers`

**Payload (body):**
```json
{
  "name": "John Doe",
  "dateOfBirth": "1990-05-15",
  "memberNumber": 1,
  "interests": "movies, football, gym, gaming"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1,
  "interests": "movies, football, gym, gaming",
  "createdAt": "2025-10-02T10:30:00.000Z",
  "updatedAt": "2025-10-02T10:30:00.000Z"
}
```

**File:** `/app/api/customers/route.js`

**Test curl:**
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

---

### 2. Read All Customers

**Route:** `GET /api/customers`

**Payload (body):** None

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "memberNumber": 1,
    "interests": "movies, football, gym, gaming",
    "createdAt": "2025-10-02T10:30:00.000Z",
    "updatedAt": "2025-10-02T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "dateOfBirth": "1985-08-22",
    "memberNumber": 2,
    "interests": "reading, yoga, cooking",
    "createdAt": "2025-10-02T11:00:00.000Z",
    "updatedAt": "2025-10-02T11:00:00.000Z"
  }
]
```

**File:** `/app/api/customers/route.js`

**Test curl:**
```bash
curl -X GET http://localhost:3000/api/customers
```

---

### 3. Read Single Customer

**Route:** `GET /api/customers/{id}`

**Payload (body):** None

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1,
  "interests": "movies, football, gym, gaming",
  "createdAt": "2025-10-02T10:30:00.000Z",
  "updatedAt": "2025-10-02T10:30:00.000Z"
}
```

**File:** `/app/api/customers/[id]/route.js`

**Test curl:**
```bash
curl -X GET http://localhost:3000/api/customers/507f1f77bcf86cd799439011
```

---

### 4. Update Customer

**Route:** `PUT /api/customers/{id}`

**Payload (body):**
```json
{
  "name": "John Smith",
  "dateOfBirth": "1990-05-15",
  "memberNumber": 1,
  "interests": "movies, football, gym, gaming, reading"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Smith",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1,
  "interests": "movies, football, gym, gaming, reading",
  "createdAt": "2025-10-02T10:30:00.000Z",
  "updatedAt": "2025-10-02T12:15:00.000Z"
}
```

**File:** `/app/api/customers/[id]/route.js`

**Test curl:**
```bash
curl -X PUT http://localhost:3000/api/customers/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "interests": "movies, football, gym, gaming, reading"
  }'
```

---

### 5. Delete Customer

**Route:** `DELETE /api/customers/{id}`

**Payload (body):** None

**Response:**
```json
{
  "message": "Customer deleted successfully"
}
```

**File:** `/app/api/customers/[id]/route.js`

**Test curl:**
```bash
curl -X DELETE http://localhost:3000/api/customers/507f1f77bcf86cd799439011
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

### 404 Not Found
```json
{
  "error": "Customer not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch customers"
}
```

---

## Notes

- All dates should be in ISO 8601 format
- Member numbers must be unique
- All fields are required when creating a customer
- Partial updates are supported when updating a customer
- The API uses MongoDB ObjectId for customer identification