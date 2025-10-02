# Customer API Documentation

## Overview
This document describes the CRUD (Create, Read, Update, Delete) operations for the Customer management system.

## Customer Model Schema
```javascript
{
  name: String (required),
  dateOfBirth: Date (required),
  memberNumber: Number (required, unique),
  interests: String (required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## API Endpoints

### 1. Create Customer

**Route:** `POST /api/customer`

**Payload (body):**
```json
{
  "name": "John Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1001,
  "interests": "movies, football, gaming"
}
```

**Response:**
```json
{
  "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
  "name": "John Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1001,
  "interests": "movies, football, gaming",
  "createdAt": "2023-10-02T10:30:00.000Z",
  "updatedAt": "2023-10-02T10:30:00.000Z"
}
```

**File:** `/app/api/customer/route.js`

**Test curl:**
```bash
curl -X POST http://localhost:3000/api/customer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "memberNumber": 1001,
    "interests": "movies, football, gaming"
  }'
```

---

### 2. Read All Customers

**Route:** `GET /api/customer`

**Payload (body):** - (none)

**Response:**
```json
[
  {
    "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "memberNumber": 1001,
    "interests": "movies, football, gaming",
    "createdAt": "2023-10-02T10:30:00.000Z",
    "updatedAt": "2023-10-02T10:30:00.000Z"
  },
  {
    "_id": "60f5b3b3b3b3b3b3b3b3b3b4",
    "name": "Jane Smith",
    "dateOfBirth": "1985-12-20T00:00:00.000Z",
    "memberNumber": 1002,
    "interests": "gym, reading, travel",
    "createdAt": "2023-10-02T11:00:00.000Z",
    "updatedAt": "2023-10-02T11:00:00.000Z"
  }
]
```

**File:** `/app/api/customer/route.js`

**Test curl:**
```bash
curl -X GET http://localhost:3000/api/customer
```

---

### 3. Read Single Customer

**Route:** `GET /api/customer/[id]`

**Payload (body):** - (none)

**Response:**
```json
{
  "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
  "name": "John Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1001,
  "interests": "movies, football, gaming",
  "createdAt": "2023-10-02T10:30:00.000Z",
  "updatedAt": "2023-10-02T10:30:00.000Z"
}
```

**File:** `/app/api/customer/[id]/route.js`

**Test curl:**
```bash
curl -X GET http://localhost:3000/api/customer/60f5b3b3b3b3b3b3b3b3b3b3
```

---

### 4. Update Customer (PUT method for main route)

**Route:** `PUT /api/customer`

**Payload (body):**
```json
{
  "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
  "name": "John Updated",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1001,
  "interests": "movies, football, gaming, reading"
}
```

**Response:**
```json
{
  "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
  "name": "John Updated",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1001,
  "interests": "movies, football, gaming, reading",
  "createdAt": "2023-10-02T10:30:00.000Z",
  "updatedAt": "2023-10-02T12:00:00.000Z"
}
```

**File:** `/app/api/customer/route.js`

**Test curl:**
```bash
curl -X PUT http://localhost:3000/api/customer \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
    "name": "John Updated",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "memberNumber": 1001,
    "interests": "movies, football, gaming, reading"
  }'
```

---

### 5. Update Customer (PUT method for specific ID)

**Route:** `PUT /api/customer/[id]`

**Payload (body):**
```json
{
  "name": "John Updated Again",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1001,
  "interests": "movies, football, gaming, reading, cooking"
}
```

**Response:**
```json
{
  "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
  "name": "John Updated Again",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1001,
  "interests": "movies, football, gaming, reading, cooking",
  "createdAt": "2023-10-02T10:30:00.000Z",
  "updatedAt": "2023-10-02T13:00:00.000Z"
}
```

**File:** `/app/api/customer/[id]/route.js`

**Test curl:**
```bash
curl -X PUT http://localhost:3000/api/customer/60f5b3b3b3b3b3b3b3b3b3b3 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated Again",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "memberNumber": 1001,
    "interests": "movies, football, gaming, reading, cooking"
  }'
```

---

### 6. Delete Customer

**Route:** `DELETE /api/customer/[id]`

**Payload (body):** - (none)

**Response:**
```json
{
  "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
  "name": "John Updated Again",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "memberNumber": 1001,
  "interests": "movies, football, gaming, reading, cooking",
  "createdAt": "2023-10-02T10:30:00.000Z",
  "updatedAt": "2023-10-02T13:00:00.000Z"
}
```

**File:** `/app/api/customer/[id]/route.js`

**Test curl:**
```bash
curl -X DELETE http://localhost:3000/api/customer/60f5b3b3b3b3b3b3b3b3b3b3
```

---

### 7. Search Customers

**Route:** `GET /api/customer?s={search_term}`

**Payload (body):** - (none)

**Response:**
```json
[
  {
    "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "memberNumber": 1001,
    "interests": "movies, football, gaming",
    "createdAt": "2023-10-02T10:30:00.000Z",
    "updatedAt": "2023-10-02T10:30:00.000Z"
  }
]
```

**File:** `/app/api/customer/route.js`

**Test curl:**
```bash
curl -X GET "http://localhost:3000/api/customer?s=john"
curl -X GET "http://localhost:3000/api/customer?s=football"
```

---

### 8. Paginated Customers

**Route:** `GET /api/customer?pno={page_number}`

**Payload (body):** - (none)

**Response:**
```json
[
  {
    "_id": "60f5b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "memberNumber": 1001,
    "interests": "movies, football, gaming",
    "createdAt": "2023-10-02T10:30:00.000Z",
    "updatedAt": "2023-10-02T10:30:00.000Z"
  }
]
```

**File:** `/app/api/customer/route.js`

**Test curl:**
```bash
curl -X GET "http://localhost:3000/api/customer?pno=1"
curl -X GET "http://localhost:3000/api/customer?pno=2"
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error

Error responses include a JSON object with an error message:
```json
{
  "error": "Error message description"
}
```

## Features Implemented

### Database Features:
- MongoDB integration using Mongoose
- Unique member number validation
- Automatic timestamp generation (createdAt, updatedAt)
- Proper data validation

### API Features:
- Full CRUD operations
- Search functionality (by name and interests)
- Pagination support
- Error handling and validation
- Member number uniqueness enforcement

### UI Features:
- Responsive design using Tailwind CSS
- Material-UI DataGrid for customer listing
- Form validation using react-hook-form
- Search functionality
- Customer detail page with comprehensive information
- Edit customer page with dedicated form
- Delete confirmation dialogs
- Success/error notifications