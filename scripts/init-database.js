// Database Initialization Script
const mongoose = require('mongoose');

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster0.mongodb.net/test1?retryWrites=true&w=majority';

// Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String },
    joinDate: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    features: [String]
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userAvatar: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    helpful: { type: Number, default: 0 },
    verified: { type: Boolean, default: false }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    },
    paymentInfo: {
        cardNumber: { type: String, required: true },
        expiryDate: { type: String, required: true },
        cvv: { type: String, required: true }
    }
}, { timestamps: true });

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Review = mongoose.model('Review', reviewSchema);
const Order = mongoose.model('Order', orderSchema);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

async function initializeDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Check if data already exists
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            console.log('Database already initialized with data');
            return;
        }

        console.log('Initializing database with sample data...');

        // Sample products
        const sampleProducts = [
            {
                name: "Wireless Bluetooth Headphones",
                description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
                price: 199.99,
                category: "electronics",
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Noise Cancellation", "30h Battery", "Wireless", "Premium Sound"]
            },
            {
                name: "Smart Fitness Watch",
                description: "Advanced fitness tracking with heart rate monitor, GPS, and water resistance.",
                price: 299.99,
                category: "electronics",
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Heart Rate Monitor", "GPS", "Water Resistant", "7-day Battery"]
            },
            {
                name: "Premium Cotton T-Shirt",
                description: "Soft, comfortable cotton t-shirt available in multiple colors and sizes.",
                price: 29.99,
                category: "clothing",
                rating: 4.3,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
                inStock: true,
                features: ["100% Cotton", "Machine Washable", "Multiple Colors", "Various Sizes"]
            },
            {
                name: "Designer Jeans",
                description: "Classic fit jeans made from premium denim with modern styling.",
                price: 89.99,
                category: "clothing",
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Premium Denim", "Classic Fit", "Modern Styling", "Durable"]
            },
            {
                name: "Smart Home Speaker",
                description: "Voice-controlled smart speaker with built-in virtual assistant and premium sound.",
                price: 149.99,
                category: "electronics",
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Voice Control", "Smart Assistant", "Premium Sound", "WiFi Connected"]
            },
            {
                name: "Garden Tool Set",
                description: "Complete set of professional gardening tools for all your outdoor needs.",
                price: 79.99,
                category: "home",
                rating: 4.2,
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Professional Grade", "Complete Set", "Durable Materials", "Ergonomic Design"]
            },
            {
                name: "Running Shoes",
                description: "Lightweight running shoes with advanced cushioning and breathable material.",
                price: 129.99,
                category: "sports",
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Lightweight", "Advanced Cushioning", "Breathable", "Durable"]
            },
            {
                name: "Programming Book",
                description: "Comprehensive guide to modern web development with practical examples.",
                price: 49.99,
                category: "books",
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Comprehensive Guide", "Practical Examples", "Modern Techniques", "Expert Authors"]
            },
            {
                name: "Yoga Mat",
                description: "Premium non-slip yoga mat with carrying strap and alignment lines.",
                price: 39.99,
                category: "sports",
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Non-slip Surface", "Carrying Strap", "Alignment Lines", "Premium Material"]
            },
            {
                name: "Coffee Maker",
                description: "Programmable coffee maker with built-in grinder and thermal carafe.",
                price: 179.99,
                category: "home",
                rating: 4.3,
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Programmable", "Built-in Grinder", "Thermal Carafe", "Auto Shut-off"]
            },
            {
                name: "Winter Jacket",
                description: "Warm, waterproof winter jacket with insulated lining and multiple pockets.",
                price: 159.99,
                category: "clothing",
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Waterproof", "Insulated", "Multiple Pockets", "Warm Lining"]
            },
            {
                name: "Cookbook Collection",
                description: "Set of 3 cookbooks featuring international cuisine and cooking techniques.",
                price: 69.99,
                category: "books",
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                inStock: true,
                features: ["3 Books", "International Cuisine", "Cooking Techniques", "Beautiful Photos"]
            }
        ];

        // Sample users
        const sampleUsers = [
            {
                username: 'john_doe',
                email: 'john@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                joinDate: new Date('2024-01-15'),
                isAdmin: false
            },
            {
                username: 'jane_smith',
                email: 'jane@example.com',
                password: 'password123',
                firstName: 'Jane',
                lastName: 'Smith',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                joinDate: new Date('2024-02-20'),
                isAdmin: true
            }
        ];

        // Insert sample data
        const insertedProducts = await Product.insertMany(sampleProducts);
        const insertedUsers = await User.insertMany(sampleUsers);

        console.log(`Inserted ${insertedProducts.length} products`);
        console.log(`Inserted ${insertedUsers.length} users`);

        // Create sample reviews
        const sampleReviews = [
            {
                productId: insertedProducts[0]._id,
                userId: insertedUsers[0]._id,
                userName: 'John Doe',
                userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                rating: 5,
                title: 'Excellent headphones!',
                comment: 'These headphones are amazing! The sound quality is incredible and the noise cancellation works perfectly. Battery life is as advertised.',
                helpful: 12,
                verified: true
            },
            {
                productId: insertedProducts[0]._id,
                userId: insertedUsers[1]._id,
                userName: 'Jane Smith',
                userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                rating: 4,
                title: 'Great quality, minor issues',
                comment: 'Overall great headphones. The build quality is solid and the sound is clear. Only downside is they can be a bit tight after long use.',
                helpful: 8,
                verified: true
            },
            {
                productId: insertedProducts[1]._id,
                userId: insertedUsers[0]._id,
                userName: 'John Doe',
                userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                rating: 5,
                title: 'Perfect fitness companion',
                comment: 'This watch has everything I need for tracking my workouts. GPS is accurate, heart rate monitoring is reliable, and the battery lasts for days.',
                helpful: 15,
                verified: true
            }
        ];

        const insertedReviews = await Review.insertMany(sampleReviews);
        console.log(`Inserted ${insertedReviews.length} reviews`);

        console.log('Database initialization completed successfully!');
        console.log('\nSample login credentials:');
        console.log('Email: john@example.com, Password: password123');
        console.log('Email: jane@example.com, Password: password123');

    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run initialization
initializeDatabase();
