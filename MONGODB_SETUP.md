# MongoDB Setup Guide for ShopEasy

This guide will help you set up MongoDB for your ShopEasy shopping application.

## 📋 Prerequisites

- Node.js (version 14 or higher)
- MongoDB (version 4.4 or higher)
- npm or yarn package manager

## 🚀 Quick Setup

### 1. Install MongoDB

#### Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will be installed in `C:\Program Files\MongoDB\Server\<version>\bin\`

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### 2. Start MongoDB Service

#### Windows:
```bash
# Start MongoDB service
net start MongoDB

# Or run manually
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath="C:\data\db"
```

#### macOS:
```bash
# Start MongoDB service
brew services start mongodb-community
```

#### Linux:
```bash
# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 3. Install Backend Dependencies

```bash
# Install backend dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken helmet express-rate-limit

# Install development dependencies
npm install --save-dev nodemon
```

### 4. Initialize Database

```bash
# Run the database initialization script
node scripts/init-database.js
```

### 5. Start the Backend Server

```bash
# Start the server
node server.js

# Or for development with auto-restart
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/shoppeasy

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### MongoDB Connection String

The default connection string is:
```
mongodb://localhost:27017/shoppeasy
```

For production or remote MongoDB:
```
mongodb://username:password@host:port/database
```

## 📊 Database Schema

### Collections

1. **users** - User accounts and profiles
2. **products** - Product catalog
3. **reviews** - Product reviews and ratings
4. **orders** - Customer orders
5. **wishlists** - User wishlists

### Sample Data

The initialization script creates:
- 12 sample products across 6 categories
- 2 sample users (john@example.com, jane@example.com)
- Sample reviews for products

## 🛠️ API Endpoints

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `POST /api/products` - Create product
- `GET /api/products` - Get products (with filters)
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews` - Get reviews (with filters)
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get orders (with filters)
- `PUT /api/orders/:id` - Update order

### Wishlists
- `POST /api/wishlists` - Add to wishlist
- `GET /api/wishlists` - Get wishlist
- `DELETE /api/wishlists/:id` - Remove from wishlist

## 🔍 Testing the Connection

### 1. Check MongoDB Status
```bash
# Connect to MongoDB shell
mongosh

# List databases
show dbs

# Use your database
use shoppeasy

# Show collections
show collections

# Check sample data
db.products.find().limit(3)
db.users.find()
```

### 2. Test API Endpoints
```bash
# Test server health
curl http://localhost:3001/api/products

# Initialize database
curl -X POST http://localhost:3001/api/init
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB service is running
   - Check connection string in config
   - Verify MongoDB is accessible on port 27017

2. **Port Already in Use**
   - Change PORT in config.js
   - Kill existing process: `lsof -ti:3001 | xargs kill`

3. **Database Initialization Failed**
   - Check MongoDB permissions
   - Ensure database doesn't already exist
   - Check console for error messages

4. **CORS Issues**
   - Update CORS_ORIGIN in config
   - Ensure frontend and backend ports match

### Logs and Debugging

```bash
# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log

# Check server logs
node server.js

# Debug mode
DEBUG=* node server.js
```

## 🔒 Security Considerations

1. **Change Default Passwords**
   - Update JWT_SECRET
   - Use strong passwords for MongoDB users

2. **Environment Variables**
   - Never commit .env files
   - Use different configs for dev/prod

3. **MongoDB Security**
   - Enable authentication
   - Use SSL/TLS in production
   - Restrict network access

## 📈 Production Deployment

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in production config

### Self-Hosted
1. Set up MongoDB on production server
2. Configure authentication
3. Set up SSL certificates
4. Configure firewall rules

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review MongoDB and server logs
3. Ensure all dependencies are installed
4. Verify MongoDB service is running
5. Check network connectivity

---

**Happy coding! 🚀**
