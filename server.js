// Express.js Server with MongoDB Connection
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster0.mongodb.net/test1?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

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

// API Routes

// User Routes
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Product Routes
app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search } = req.query;
        let query = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Review Routes
app.post('/api/reviews', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        const { productId, userId } = req.query;
        let query = {};

        if (productId) query.productId = productId;
        if (userId) query.userId = userId;

        const reviews = await Review.find(query).populate('productId', 'name').populate('userId', 'firstName lastName');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Order Routes
app.post('/api/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const { userId } = req.query;
        let query = {};

        if (userId) query.userId = userId;

        const orders = await Order.find(query).populate('items.productId', 'name image').populate('userId', 'firstName lastName');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Wishlist Routes
app.post('/api/wishlists', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        // Check if item already exists in wishlist
        const existingItem = await Wishlist.findOne({ userId, productId });
        if (existingItem) {
            return res.status(400).json({ error: 'Item already in wishlist' });
        }

        const wishlistItem = new Wishlist({ userId, productId });
        await wishlistItem.save();
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/wishlists', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const wishlistItems = await Wishlist.find({ userId }).populate('productId');
        res.json(wishlistItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/wishlists/:id', async (req, res) => {
    try {
        const wishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
        if (!wishlistItem) {
            return res.status(404).json({ error: 'Wishlist item not found' });
        }
        res.json({ message: 'Wishlist item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Database initialization route
app.post('/api/init', async (req, res) => {
    try {
        // Check if data already exists
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            return res.json({ message: 'Database already initialized' });
        }

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
        await Product.insertMany(sampleProducts);
        await User.insertMany(sampleUsers);

        res.json({ message: 'Database initialized with sample data' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`MongoDB URI: ${MONGODB_URI}`);
});
