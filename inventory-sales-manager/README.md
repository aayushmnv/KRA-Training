# Inventory Sales Manager

A comprehensive NestJS-based inventory and sales management system with role-based access control and multi-user functionality.

## Features=>

### User Management
- Role-based authentication (Admin, Customer, Supplier, Seller)
- JWT-based authentication
- User profile management
- Address management for users
- Credit limit management for customers

### Product Management 
- Product CRUD operations
- Product variants (size, color)
- Price management
- Discount management
- Batch lot tracking
- Stock movement tracking
- Product categorization and filtering

### Purchase Management
- Purchase order creation
- Supplier order management
- Order status tracking
- Receipt generation
- Quality check tracking
- Batch lot creation
- Supplier payment processing
- Stock movement tracking for purchases

### Sales Management
- Sales order creation
- Order status tracking
- Invoice generation
- Payment processing
- Multiple payment methods support
- Credit limit validation

### Return/Refund Management
- Return request creation
- Return approval workflow
- Refund processing
- Stock adjustment for returns
- Return reason tracking

### Inventory Control
- Real-time stock tracking
- Stock movement history
- Low stock alerts
- Batch lot tracking
- Stock adjustment tracking

## Technology Stack

- NestJS
- PostgreSQL
- TypeORM
- JWT Authentication
- Class Validator

## Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm/yarn
## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with following variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres 
DB_PASSWORD=Aayush1209
DB_NAME=inventory_sales
JWT_SECRET=
JWT_EXPIRES_IN=1D
```

4. Start the application:
```bash
npm run start:dev
```

## API Testing Guide

### Authentication

#### Login Credentials
```
Customer:
- Email: customera@gmail.com
- Password: 12345678

Admin:
- Email: superadmin@gmail.com  
- Password: 12345678

Supplier:
- Email: supplier@gmail.com
- Password: 12345678

Seller:
- Email: aayush.seller@gmail.com
- Password: 12345678
```

#### Auth Endpoints

```
POST /auth/register
- Register new customer
Body: {
  "name": "string",
  "email": "string",
  "password": "string",
  "contact_no": "string",
  "gst_no": "string" (optional)
}

POST /auth/login
Body: {
  "email": "string",
  "password": "string"
}
```

### Product Management (Seller Access)

```
POST /product/create
- Create new product with variants
Body: {
  "name": "string",
  "description": "string",
  "category": "string",
  "brand": "string",
  "price": number,
  "variants": [
    {
      "color": "string",
      "size": "string",
      "stock_quantity": number
    }
  ]
}

GET /product
- Get all products
Query params: category, brand, minPrice, maxPrice, search

PATCH /product/:id
- Update product

POST /product/:id/discounts
- Add product discount
```

### Purchase Module (Seller/Supplier)

```
POST /purchase
- Create purchase order (Seller)
Body: {
  "supplier_id": number,
  "items": [
    {
      "variant_id": number,
      "quantity": number,
      "unit_price": number
    }
  ]
}

PATCH /purchase/:id/status
- Update order status (Supplier)
Body: {
  "status": "pending" | "completed" | "cancelled"
}

POST /purchase/payment
- Process supplier payment (Seller)
Body: {
  "orderId": number,
  "method": "string"
}
```

### Customer Operations

```
POST /customer/create
- Create sales order
Body: {
  "items": [
    {
      "variant_id": number,
      "quantity": number
    }
  ]
}

POST /customer/payment
- Process payment
Body: {
  "invoiceId": number,
  "method": "cash" | "card" | "credit"
}

POST /customer/return
- Create return request
Body: {
  "sales_order_id": number,
  "variant_id": number,
  "quantity": number,
  "reason": "string",
  "type": "refund" | "exchange"
}
```

### User Management (Admin)

```
GET /user
- Get all users
Query params: role

PATCH /user/:id/role
- Update user role
Body: {
  "role": "customer" | "seller" | "supplier"
}

PATCH /user/:id/credit-limit
- Update customer credit limit
Body: {
  "credit_limit": number
}
```

## Authentication

For protected routes, include the JWT token in request headers:
```
Authorization: Bearer <token>
```

## Testing Flow

1. Login with appropriate credentials to get JWT token
2. Set token in request Authorization header
3. Test endpoints based on role permissions:
   - Admin can manage users and view all data
   - Seller can manage products and purchase orders
   - Supplier can update purchase order status
   - Customer can place orders and create returns

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Server Error
