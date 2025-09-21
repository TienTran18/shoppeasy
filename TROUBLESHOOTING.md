# MongoDB Atlas Connection Troubleshooting

The error `querySrv ENODATA _mongodb._tcp.cluster0.mongodb.net` indicates a DNS resolution issue. Here's how to fix it:

## 🔍 Step 1: Get the Correct Connection String

### From MongoDB Atlas Dashboard:

1. **Login to MongoDB Atlas**
   - Go to [cloud.mongodb.com](https://cloud.mongodb.com)
   - Login with your credentials

2. **Navigate to Your Cluster**
   - Click on your project
   - Click on your cluster name

3. **Get Connection String**
   - Click "Connect" button
   - Choose "Connect your application"
   - Select "Node.js" as driver
   - Copy the connection string

4. **Update Connection String**
   - Replace `<password>` with your actual password: `En81P7DOmL3ckPjY`
   - Replace `<dbname>` with: `test1`

## 🔧 Step 2: Common Connection String Formats

Try these formats (replace with your actual cluster name):

```bash
# Format 1: Standard SRV
mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@YOUR-CLUSTER-NAME.mongodb.net/test1?retryWrites=true&w=majority

# Format 2: Alternative cluster names
mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster1.mongodb.net/test1?retryWrites=true&w=majority
mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster2.mongodb.net/test1?retryWrites=true&w=majority

# Format 3: Standard connection (if SRV doesn't work)
mongodb://Adamnef18:En81P7DOmL3ckPjY@YOUR-CLUSTER-NAME-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/test1?ssl=true&replicaSet=atlas-XXXXXX-shard-0&authSource=admin&retryWrites=true&w=majority
```

## 🛠️ Step 3: Manual Connection Test

Create a file called `manual-test.js`:

```javascript
const mongoose = require('mongoose');

// Replace with your actual connection string from Atlas
const MONGODB_URI = 'mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@YOUR-CLUSTER-NAME.mongodb.net/test1?retryWrites=true&w=majority';

async function testConnection() {
    try {
        console.log('Testing connection...');
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        console.log('✅ Connected successfully!');
        await mongoose.connection.close();
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
    }
}

testConnection();
```

## 🔒 Step 4: Check Atlas Settings

### IP Whitelist:
1. Go to "Network Access" in Atlas
2. Add your current IP address
3. Or add `0.0.0.0/0` for all IPs (less secure)

### Database User:
1. Go to "Database Access" in Atlas
2. Ensure user `Adamnef18` exists
3. Check password is correct: `En81P7DOmL3ckPjY`
4. Ensure user has "Read and write to any database" permissions

### Cluster Status:
1. Check if your cluster is running
2. Look for any maintenance notifications
3. Ensure cluster is not paused

## 🚀 Step 5: Run the Enhanced Test

```bash
npm run test-connection
```

This will try multiple connection formats and update your config files automatically.

## 🔄 Step 6: Alternative Solutions

### If SRV doesn't work, try standard connection:

1. Get the standard connection string from Atlas
2. It will look like:
```
mongodb://Adamnef18:En81P7DOmL3ckPjY@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/test1?ssl=true&replicaSet=atlas-XXXXXX-shard-0&authSource=admin&retryWrites=true&w=majority
```

### If still having issues:

1. **Check DNS**: Try using Google DNS (8.8.8.8, 8.8.4.4)
2. **Firewall**: Ensure port 27017 is not blocked
3. **VPN**: Try without VPN if you're using one
4. **Network**: Try from a different network

## 📞 Step 7: Get Help

If nothing works:

1. **Atlas Support**: Contact MongoDB Atlas support
2. **Community**: Ask on MongoDB Community Forums
3. **Documentation**: Check [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## 🎯 Quick Fix Commands

```bash
# Test with different cluster names
node test-connection.js

# If successful, initialize database
npm run init-db

# Start the server
npm run server
```

## 💡 Pro Tips

1. **Always get connection string from Atlas dashboard**
2. **Double-check cluster name and password**
3. **Ensure IP is whitelisted**
4. **Try both SRV and standard connection formats**
5. **Check Atlas status page for outages**

---

**The most common issue is using the wrong cluster name. Make sure to get the exact connection string from your MongoDB Atlas dashboard!**
