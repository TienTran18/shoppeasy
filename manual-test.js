// Manual MongoDB Atlas Connection Test
const mongoose = require('mongoose');

// IMPORTANT: Replace YOUR-CLUSTER-NAME with your actual cluster name from MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@YOUR-CLUSTER-NAME.mongodb.net/test1?retryWrites=true&w=majority';

async function testConnection() {
    try {
        console.log('🔄 Testing MongoDB Atlas connection...');
        console.log('📝 Make sure to replace YOUR-CLUSTER-NAME with your actual cluster name!');
        console.log('🔗 Connection string:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
        
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });
        
        console.log('✅ Connected successfully to MongoDB Atlas!');
        console.log('📊 Database name: test1');
        
        // Test basic operations
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('📁 Collections:', collections.map(c => c.name));
        
        // Test insert
        const testCollection = db.collection('connection_test');
        const testDoc = {
            message: 'Manual test successful',
            timestamp: new Date(),
            database: 'test1'
        };
        
        const result = await testCollection.insertOne(testDoc);
        console.log('✅ Test document inserted:', result.insertedId);
        
        // Clean up
        await testCollection.deleteOne({ _id: result.insertedId });
        console.log('✅ Test document cleaned up');
        
        console.log('\n🎉 Connection test successful! You can now:');
        console.log('1. Update your config files with this connection string');
        console.log('2. Run: npm run init-db');
        console.log('3. Run: npm run server');
        
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('\n🔍 Troubleshooting steps:');
        console.error('1. Make sure you replaced YOUR-CLUSTER-NAME with your actual cluster name');
        console.error('2. Check your MongoDB Atlas dashboard for the correct connection string');
        console.error('3. Ensure your IP address is whitelisted in Atlas');
        console.error('4. Verify your username and password are correct');
        console.error('5. Check if your cluster is running');
        
        if (error.message.includes('ENODATA')) {
            console.error('\n💡 ENODATA error usually means:');
            console.error('- Wrong cluster name');
            console.error('- DNS resolution issues');
            console.error('- Network connectivity problems');
        }
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('🔌 Connection closed');
        }
    }
}

// Instructions
console.log('📋 INSTRUCTIONS:');
console.log('1. Go to MongoDB Atlas dashboard');
console.log('2. Click "Connect" on your cluster');
console.log('3. Choose "Connect your application"');
console.log('4. Copy the connection string');
console.log('5. Replace YOUR-CLUSTER-NAME in this file with your actual cluster name');
console.log('6. Run: node manual-test.js\n');

testConnection();
