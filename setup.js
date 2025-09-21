#!/usr/bin/env node

// ShopEasy Setup Script
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Welcome to ShopEasy Setup!');
console.log('================================\n');

// Check if Node.js is installed
function checkNodeVersion() {
    try {
        const version = process.version;
        console.log(`✅ Node.js version: ${version}`);
        
        const majorVersion = parseInt(version.slice(1).split('.')[0]);
        if (majorVersion < 14) {
            console.log('⚠️  Warning: Node.js 14+ is recommended');
        }
    } catch (error) {
        console.log('❌ Node.js is not installed. Please install Node.js first.');
        process.exit(1);
    }
}

// Check if npm is available
function checkNpm() {
    try {
        const version = execSync('npm --version', { encoding: 'utf8' }).trim();
        console.log(`✅ npm version: ${version}`);
    } catch (error) {
        console.log('❌ npm is not available. Please install npm first.');
        process.exit(1);
    }
}

// Create .env file from template
function createEnvFile() {
    const envTemplate = `# Environment Variables
# Update these values with your actual configuration

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
RATE_LIMIT_MAX_REQUESTS=100`;

    if (!fs.existsSync('.env')) {
        fs.writeFileSync('.env', envTemplate);
        console.log('✅ Created .env file from template');
        console.log('📝 Please update .env with your actual configuration');
    } else {
        console.log('✅ .env file already exists');
    }
}

// Install dependencies
function installDependencies() {
    console.log('\n📦 Installing dependencies...');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully');
    } catch (error) {
        console.log('❌ Failed to install dependencies');
        console.log('Please run: npm install');
    }
}

// Check MongoDB connection
async function checkMongoConnection() {
    console.log('\n🔍 Checking MongoDB connection...');
    
    // Check if .env exists and has MongoDB URI
    if (!fs.existsSync('.env')) {
        console.log('⚠️  .env file not found. Please create it first.');
        return;
    }
    
    const envContent = fs.readFileSync('.env', 'utf8');
    if (!envContent.includes('mongodb+srv://') || envContent.includes('USERNAME:PASSWORD')) {
        console.log('⚠️  Please update .env with your actual MongoDB connection string');
        return;
    }
    
    try {
        // Try to run the connection test
        execSync('node test-connection.js', { stdio: 'inherit' });
        console.log('✅ MongoDB connection successful');
    } catch (error) {
        console.log('⚠️  MongoDB connection test failed');
        console.log('Please check your connection string in .env file');
    }
}

// Display next steps
function displayNextSteps() {
    console.log('\n🎉 Setup completed!');
    console.log('==================\n');
    
    console.log('📋 Next steps:');
    console.log('1. Update .env file with your MongoDB connection string');
    console.log('2. Test connection: npm run test-connection');
    console.log('3. Initialize database: npm run init-db');
    console.log('4. Start backend: npm run server');
    console.log('5. Start frontend: npm start');
    
    console.log('\n📚 Documentation:');
    console.log('- README.md - Project overview');
    console.log('- MONGODB_SETUP.md - MongoDB setup guide');
    console.log('- ATLAS_SETUP.md - Atlas-specific setup');
    console.log('- TROUBLESHOOTING.md - Connection troubleshooting');
    console.log('- GITHUB_SETUP.md - GitHub setup guide');
    
    console.log('\n🔗 Useful commands:');
    console.log('- npm run server - Start backend server');
    console.log('- npm start - Start frontend');
    console.log('- npm run init-db - Initialize database');
    console.log('- npm run test-connection - Test MongoDB connection');
    
    console.log('\n🎯 Sample login credentials (after init-db):');
    console.log('- Email: john@example.com, Password: password123');
    console.log('- Email: jane@example.com, Password: password123');
}

// Main setup function
async function setup() {
    try {
        checkNodeVersion();
        checkNpm();
        createEnvFile();
        installDependencies();
        await checkMongoConnection();
        displayNextSteps();
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        process.exit(1);
    }
}

// Run setup
setup();
