// Environment Configuration Example
// Copy this file to config.js and update with your actual values

module.exports = {
    // MongoDB Configuration
    // Replace with your actual MongoDB Atlas connection string
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://USERNAME:PASSWORD@CLUSTER-NAME.mongodb.net/DATABASE-NAME?retryWrites=true&w=majority',
    
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
};
