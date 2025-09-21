# MongoDB Atlas Setup for ShopEasy

Your MongoDB Atlas credentials have been configured! Here's how to get started:

## 🔑 Your Configuration

- **Username**: Adamnef18
- **Password**: En81P7DOmL3ckPjY
- **Database**: test1
- **Connection String**: `mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster0.mongodb.net/test1?retryWrites=true&w=majority`

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Test Connection
```bash
node test-connection.js
```

### 3. Initialize Database
```bash
npm run init-db
```

### 4. Start Backend Server
```bash
npm run server
```

### 5. Start Frontend
```bash
npm start
```

## 📊 What Happens Next

1. **Database Initialization**: Creates collections and sample data
2. **Sample Data**: 12 products, 2 users, sample reviews
3. **API Ready**: Full REST API available at `http://localhost:3001`

## 🔍 Verify Setup

### Check MongoDB Atlas Dashboard
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Login with your credentials
3. Navigate to your cluster
4. Click "Browse Collections"
5. You should see the `test1` database with collections

### Test API Endpoints
```bash
# Test products
curl http://localhost:3001/api/products

# Test users
curl http://localhost:3001/api/users

# Initialize database (if needed)
curl -X POST http://localhost:3001/api/init
```

## 🎯 Sample Login Credentials

After initialization, you can login with:
- **Email**: john@example.com
- **Password**: password123

Or:
- **Email**: jane@example.com  
- **Password**: password123

## 🛠️ Troubleshooting

### Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check if the cluster is running
- Verify credentials are correct

### Database Not Found
- The database will be created automatically
- Run `npm run init-db` to create collections

### API Not Working
- Ensure backend server is running on port 3001
- Check console for error messages
- Verify MongoDB connection in server logs

## 📁 Collections Created

- **users** - User accounts and profiles
- **products** - Product catalog
- **reviews** - Product reviews and ratings
- **orders** - Customer orders
- **wishlists** - User wishlists

## 🔒 Security Notes

- Your credentials are now in the code files
- For production, use environment variables
- Consider rotating passwords regularly
- Enable IP whitelisting in Atlas

## 🎉 You're Ready!

Your ShopEasy application is now connected to MongoDB Atlas and ready to use with persistent data storage!
