// Database Initialization Script
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://USERNAME:PASSWORD@CLUSTER-NAME.mongodb.net/DATABASE-NAME?retryWrites=true&w=majority';

// MongoDB Schemas
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
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');

        // Check if data already exists
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            console.log('Database already contains data. Skipping initialization.');
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
                name: "Gaming Mechanical Keyboard",
                description: "RGB backlit mechanical keyboard with customizable keys and anti-ghosting technology.",
                price: 149.99,
                category: "electronics",
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
                inStock: true,
                features: ["RGB Backlight", "Mechanical Switches", "Anti-Ghosting", "Customizable"]
            },
            {
                name: "Denim Jeans",
                description: "Classic fit denim jeans made from premium cotton with stretch for comfort.",
                price: 79.99,
                category: "clothing",
                rating: 4.2,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Premium Cotton", "Stretch Denim", "Classic Fit", "Machine Washable"]
            },
            {
                name: "Coffee Maker",
                description: "Programmable coffee maker with built-in grinder and thermal carafe.",
                price: 129.99,
                category: "home",
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
                inStock: true,
                features: ["Programmable", "Built-in Grinder", "Thermal Carafe", "Auto Shut-off"]
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
        console.log('Inserting sample products...');
        const products = await Product.insertMany(sampleProducts);
        console.log(`Inserted ${products.length} products`);

        console.log('Inserting sample users...');
        const users = await User.insertMany(sampleUsers);
        console.log(`Inserted ${users.length} users`);

        // Create sample reviews
        const sampleReviews = [
            {
                productId: products[0]._id,
                userId: users[0]._id,
                userName: 'John Doe',
                userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                rating: 5,
                title: 'Excellent headphones!',
                comment: 'These headphones are amazing! The sound quality is incredible and the noise cancellation works perfectly. Battery life is as advertised.',
                helpful: 12,
                verified: true
            },
            {
                productId: products[0]._id,
                userId: users[1]._id,
                userName: 'Jane Smith',
                userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                rating: 4,
                title: 'Great quality, minor issues',
                comment: 'Overall great headphones. The build quality is solid and the sound is clear. Only downside is they can be a bit tight after long use.',
                helpful: 8,
                verified: true
            }
        ];

        console.log('Inserting sample reviews...');
        const reviews = await Review.insertMany(sampleReviews);
        console.log(`Inserted ${reviews.length} reviews`);

        console.log('Database initialization completed successfully!');
        console.log('\nSample data created:');
        console.log(`- ${products.length} products`);
        console.log(`- ${users.length} users`);
        console.log(`- ${reviews.length} reviews`);

    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run initialization
initializeDatabase();
