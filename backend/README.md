# ShopEasy Backend

Backend server for the ShopEasy shopping application built with Express.js and MongoDB.

## Features

- **RESTful API** for all application operations
- **MongoDB Integration** with Mongoose ODM
- **User Management** with authentication
- **Product Catalog** with search and filtering
- **Review System** for products
- **Order Management** with payment processing
- **Wishlist Functionality**
- **CORS Support** for frontend integration
- **Error Handling** and validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shoppeasy/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your MongoDB credentials
   nano .env
   ```

4. **Configure MongoDB**
   - Update `MONGODB_URI` in `.env` with your MongoDB Atlas connection string
   - Format: `mongodb+srv://USERNAME:PASSWORD@CLUSTER-NAME.mongodb.net/DATABASE-NAME?retryWrites=true&w=majority`

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Initialize Database
```bash
npm run init-db
```

### Test Connection
```bash
npm run test-connection
```

## API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Reviews
- `POST /api/reviews` - Create a new review
- `GET /api/reviews` - Get reviews (with filtering)
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get orders (with filtering)
- `PUT /api/orders/:id` - Update order status

### Wishlist
- `POST /api/wishlists` - Add item to wishlist
- `GET /api/wishlists` - Get user's wishlist
- `DELETE /api/wishlists/:id` - Remove item from wishlist

### Database
- `POST /api/init` - Initialize database with sample data

## Query Parameters

### Products Filtering
- `category` - Filter by product category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `search` - Search in name and description

### Reviews Filtering
- `productId` - Get reviews for specific product
- `userId` - Get reviews by specific user

### Orders Filtering
- `userId` - Get orders for specific user

### Wishlist Filtering
- `userId` - Get wishlist for specific user

## Data Models

### User
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String,
  firstName: String,
  lastName: String,
  avatar: String,
  joinDate: Date,
  isAdmin: Boolean
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  rating: Number,
  image: String,
  inStock: Boolean,
  features: [String]
}
```

### Review
```javascript
{
  productId: ObjectId (ref: Product),
  userId: ObjectId (ref: User),
  userName: String,
  userAvatar: String,
  rating: Number (1-5),
  title: String,
  comment: String,
  helpful: Number,
  verified: Boolean
}
```

### Order
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: String,
  shippingAddress: {
    fullName: String,
    email: String,
    address: String
  },
  paymentInfo: {
    cardNumber: String,
    expiryDate: String,
    cvv: String
  }
}
```

### Wishlist
```javascript
{
  userId: ObjectId (ref: User),
  productId: ObjectId (ref: Product)
}
```

## Environment Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER-NAME.mongodb.net/DATABASE-NAME?retryWrites=true&w=majority

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```

## CORS Configuration

The server is configured to accept requests from:
- `http://localhost:3000` (development)
- Configure `CORS_ORIGIN` in `.env` for production

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables

## Security Features

- **Helmet.js** for security headers
- **CORS** protection
- **Rate limiting** to prevent abuse
- **Input validation** and sanitization
- **Error handling** without sensitive data exposure

## Development

### Project Structure
```
backend/
├── scripts/
│   ├── init-database.js
│   └── test-connection.js
├── server.js
├── package.json
├── env.example
└── README.md
```

### Adding New Features

1. **Create new schema** in `server.js`
2. **Add API routes** for CRUD operations
3. **Update documentation** with new endpoints
4. **Test with sample data**

### Testing

Use tools like Postman or curl to test API endpoints:

```bash
# Test server health
curl http://localhost:3001/api/products

# Test database initialization
curl -X POST http://localhost:3001/api/init
```

## Deployment

### Heroku
1. Create Heroku app
2. Set environment variables
3. Deploy with Git

### Vercel
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string format
   - Verify network access in MongoDB Atlas
   - Ensure credentials are correct

2. **CORS Errors**
   - Update `CORS_ORIGIN` in environment variables
   - Check frontend URL configuration

3. **Port Already in Use**
   - Change `PORT` in environment variables
   - Kill existing process: `lsof -ti:3001 | xargs kill`

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - see LICENSE file for details
