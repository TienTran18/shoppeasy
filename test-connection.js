// Test MongoDB Connection
const mongoose = require('mongoose');

// MongoDB Atlas Connection String - Let's try different cluster names
const MONGODB_URIS = [
    'mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster0.mongodb.net/test1?retryWrites=true&w=majority',
    'mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster1.mongodb.net/test1?retryWrites=true&w=majority',
    'mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster2.mongodb.net/test1?retryWrites=true&w=majority',
    'mongodb://Adamnef18:En81P7DOmL3ckPjY@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/test1?ssl=true&replicaSet=atlas-123456-shard-0&authSource=admin&retryWrites=true&w=majority'
];

async function testConnection() {
    for (let i = 0; i < MONGODB_URIS.length; i++) {
        const MONGODB_URI = MONGODB_URIS[i];
        try {
            console.log(`\n🔄 Testing connection ${i + 1}/${MONGODB_URIS.length}...`);
            console.log('Connection string:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in log
            
            await mongoose.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000, // 10 second timeout
                connectTimeoutMS: 10000,
            });
            
            console.log('✅ Successfully connected to MongoDB Atlas!');
            console.log('Database name: test1');
            
            // Test basic operations
            const db = mongoose.connection.db;
            const collections = await db.listCollections().toArray();
            console.log('📁 Collections in database:', collections.map(c => c.name));
            
            // Test creating a simple document
            const testCollection = db.collection('connection_test');
            const testDoc = {
                message: 'Connection test successful',
                timestamp: new Date(),
                database: 'test1'
            };
            
            await testCollection.insertOne(testDoc);
            console.log('✅ Test document inserted successfully');
            
            // Clean up test document
            await testCollection.deleteOne({ _id: testDoc._id });
            console.log('✅ Test document cleaned up');
            
            // If successful, update the config files
            console.log('\n🎉 Working connection found! Updating config files...');
            await updateConfigFiles(MONGODB_URI);
            
            return; // Exit on success
            
        } catch (error) {
            console.error(`❌ Connection ${i + 1} failed:`, error.message);
            if (i === MONGODB_URIS.length - 1) {
                console.error('\n🔍 All connection attempts failed. Please check:');
                console.error('1. Your MongoDB Atlas cluster is running');
                console.error('2. Your IP address is whitelisted');
                console.error('3. Your credentials are correct');
                console.error('4. Your cluster name is correct');
                console.error('\n💡 Try getting the correct connection string from MongoDB Atlas dashboard');
            }
        } finally {
            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.close();
                console.log('🔌 Connection closed');
            }
        }
    }
}

async function updateConfigFiles(workingURI) {
    const fs = require('fs');
    
    // Update config.js
    const configContent = `// Environment Configuration
module.exports = {
    // MongoDB Configuration
    MONGODB_URI: process.env.MONGODB_URI || '${workingURI}',
    
    // Server Configuration
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // JWT Configuration (for future authentication)
    JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    
    // CORS Configuration
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
    
    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 900000, // 15 minutes
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
    
    // Database Settings
    DB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    }
};`;
    
    fs.writeFileSync('config.js', configContent);
    console.log('✅ Updated config.js');
    
    // Update server.js
    let serverContent = fs.readFileSync('server.js', 'utf8');
    serverContent = serverContent.replace(
        /const MONGODB_URI = process\.env\.MONGODB_URI \|\| '.*?';/,
        `const MONGODB_URI = process.env.MONGODB_URI || '${workingURI}';`
    );
    fs.writeFileSync('server.js', serverContent);
    console.log('✅ Updated server.js');
    
    // Update init-database.js
    let initContent = fs.readFileSync('scripts/init-database.js', 'utf8');
    initContent = initContent.replace(
        /const MONGODB_URI = process\.env\.MONGODB_URI \|\| '.*?';/,
        `const MONGODB_URI = process.env.MONGODB_URI || '${workingURI}';`
    );
    fs.writeFileSync('scripts/init-database.js', initContent);
    console.log('✅ Updated scripts/init-database.js');
}

// Run the test
testConnection();
