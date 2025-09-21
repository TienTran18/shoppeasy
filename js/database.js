// MongoDB Database Connection and Operations
class DatabaseManager {
    constructor() {
        this.connectionString = 'mongodb+srv://Adamnef18:En81P7DOmL3ckPjY@cluster0.mongodb.net/test1?retryWrites=true&w=majority';
        this.db = null;
        this.isConnected = false;
        this.useLocalStorage = true; // Start with localStorage, switch to MongoDB when backend is available
        this.init();
    }

    async init() {
        try {
            await this.connect();
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection failed:', error);
            // Fallback to localStorage for development
            this.useLocalStorage = true;
        }
    }

    async connect() {
        // For browser environment, we'll use a REST API approach
        // In a real application, you'd have a backend server handling MongoDB connections
        
        // Simulate connection check
        this.isConnected = true;
        this.db = {
            users: this.getLocalStorageCollection('users'),
            products: this.getLocalStorageCollection('products'),
            reviews: this.getLocalStorageCollection('reviews'),
            orders: this.getLocalStorageCollection('orders'),
            wishlists: this.getLocalStorageCollection('wishlists')
        };
    }

    // Local Storage fallback for development
    getLocalStorageCollection(collectionName) {
        const data = localStorage.getItem(`db_${collectionName}`);
        return data ? JSON.parse(data) : [];
    }

    setLocalStorageCollection(collectionName, data) {
        localStorage.setItem(`db_${collectionName}`, JSON.stringify(data));
    }

    // Generic CRUD operations
    async create(collection, data) {
        try {
            if (this.useLocalStorage) {
                const collectionData = this.getLocalStorageCollection(collection);
                const newItem = {
                    _id: this.generateId(),
                    ...data,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                collectionData.push(newItem);
                this.setLocalStorageCollection(collection, collectionData);
                return newItem;
            } else {
                // In a real app, this would be an API call to your backend
                return await this.apiCall('POST', `/${collection}`, data);
            }
        } catch (error) {
            console.error(`Error creating ${collection}:`, error);
            throw error;
        }
    }

    async read(collection, query = {}) {
        try {
            if (this.useLocalStorage) {
                const collectionData = this.getLocalStorageCollection(collection);
                return this.filterData(collectionData, query);
            } else {
                return await this.apiCall('GET', `/${collection}`, query);
            }
        } catch (error) {
            console.error(`Error reading ${collection}:`, error);
            throw error;
        }
    }

    async update(collection, id, data) {
        try {
            if (this.useLocalStorage) {
                const collectionData = this.getLocalStorageCollection(collection);
                const index = collectionData.findIndex(item => item._id === id);
                if (index !== -1) {
                    collectionData[index] = {
                        ...collectionData[index],
                        ...data,
                        updatedAt: new Date().toISOString()
                    };
                    this.setLocalStorageCollection(collection, collectionData);
                    return collectionData[index];
                }
                return null;
            } else {
                return await this.apiCall('PUT', `/${collection}/${id}`, data);
            }
        } catch (error) {
            console.error(`Error updating ${collection}:`, error);
            throw error;
        }
    }

    async delete(collection, id) {
        try {
            if (this.useLocalStorage) {
                const collectionData = this.getLocalStorageCollection(collection);
                const filteredData = collectionData.filter(item => item._id !== id);
                this.setLocalStorageCollection(collection, filteredData);
                return true;
            } else {
                return await this.apiCall('DELETE', `/${collection}/${id}`);
            }
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            throw error;
        }
    }

    // User operations
    async createUser(userData) {
        return await this.create('users', userData);
    }

    async findUserByEmail(email) {
        const users = await this.read('users', { email });
        return users.length > 0 ? users[0] : null;
    }

    async findUserByUsername(username) {
        const users = await this.read('users', { username });
        return users.length > 0 ? users[0] : null;
    }

    async updateUser(userId, userData) {
        return await this.update('users', userId, userData);
    }

    // Product operations
    async createProduct(productData) {
        return await this.create('products', productData);
    }

    async getProducts(filters = {}) {
        return await this.read('products', filters);
    }

    async getProductById(id) {
        const products = await this.read('products', { _id: id });
        return products.length > 0 ? products[0] : null;
    }

    async updateProduct(productId, productData) {
        return await this.update('products', productId, productData);
    }

    // Review operations
    async createReview(reviewData) {
        return await this.create('reviews', reviewData);
    }

    async getReviewsByProduct(productId) {
        return await this.read('reviews', { productId });
    }

    async getReviewsByUser(userId) {
        return await this.read('reviews', { userId });
    }

    async updateReview(reviewId, reviewData) {
        return await this.update('reviews', reviewId, reviewData);
    }

    async deleteReview(reviewId) {
        return await this.delete('reviews', reviewId);
    }

    // Order operations
    async createOrder(orderData) {
        return await this.create('orders', orderData);
    }

    async getOrdersByUser(userId) {
        return await this.read('orders', { userId });
    }

    async updateOrderStatus(orderId, status) {
        return await this.update('orders', orderId, { status });
    }

    // Wishlist operations
    async addToWishlist(userId, productId) {
        const wishlist = await this.read('wishlists', { userId, productId });
        if (wishlist.length === 0) {
            return await this.create('wishlists', { userId, productId });
        }
        return wishlist[0];
    }

    async removeFromWishlist(userId, productId) {
        const wishlist = await this.read('wishlists', { userId, productId });
        if (wishlist.length > 0) {
            return await this.delete('wishlists', wishlist[0]._id);
        }
        return false;
    }

    async getUserWishlist(userId) {
        return await this.read('wishlists', { userId });
    }

    // Utility methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    filterData(data, query) {
        return data.filter(item => {
            return Object.keys(query).every(key => {
                if (typeof query[key] === 'object' && query[key] !== null) {
                    // Handle complex queries
                    if (query[key].$in) {
                        return query[key].$in.includes(item[key]);
                    }
                    if (query[key].$gt) {
                        return item[key] > query[key].$gt;
                    }
                    if (query[key].$lt) {
                        return item[key] < query[key].$lt;
                    }
                }
                return item[key] === query[key];
            });
        });
    }

    // API simulation for backend integration
    async apiCall(method, endpoint, data = null) {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`/api${endpoint}`, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    // Database initialization with sample data
    async initializeSampleData() {
        try {
            // Check if data already exists
            const existingProducts = await this.getProducts();
            if (existingProducts.length > 0) {
                console.log('Sample data already exists');
                return;
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
                    joinDate: '2024-01-15',
                    isAdmin: false
                },
                {
                    username: 'jane_smith',
                    email: 'jane@example.com',
                    password: 'password123',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                    joinDate: '2024-02-20',
                    isAdmin: true
                }
            ];

            // Sample reviews
            const sampleReviews = [
                {
                    productId: 1,
                    userId: 1,
                    userName: 'John Doe',
                    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                    rating: 5,
                    title: 'Excellent headphones!',
                    comment: 'These headphones are amazing! The sound quality is incredible and the noise cancellation works perfectly. Battery life is as advertised.',
                    date: '2024-01-20',
                    helpful: 12,
                    verified: true
                },
                {
                    productId: 1,
                    userId: 2,
                    userName: 'Jane Smith',
                    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                    rating: 4,
                    title: 'Great quality, minor issues',
                    comment: 'Overall great headphones. The build quality is solid and the sound is clear. Only downside is they can be a bit tight after long use.',
                    date: '2024-01-18',
                    helpful: 8,
                    verified: true
                }
            ];

            // Insert sample data
            for (const product of sampleProducts) {
                await this.createProduct(product);
            }

            for (const user of sampleUsers) {
                await this.createUser(user);
            }

            for (const review of sampleReviews) {
                await this.createReview(review);
            }

            console.log('Sample data initialized successfully');
        } catch (error) {
            console.error('Error initializing sample data:', error);
        }
    }

    // Database statistics
    async getStats() {
        try {
            const [users, products, reviews, orders, wishlists] = await Promise.all([
                this.read('users'),
                this.read('products'),
                this.read('reviews'),
                this.read('orders'),
                this.read('wishlists')
            ]);

            return {
                users: users.length,
                products: products.length,
                reviews: reviews.length,
                orders: orders.length,
                wishlists: wishlists.length
            };
        } catch (error) {
            console.error('Error getting database stats:', error);
            return null;
        }
    }
}

// Initialize database manager
const dbManager = new DatabaseManager();

// Initialize sample data when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    dbManager.initializeSampleData();
});

// Export for use in other modules
window.dbManager = dbManager;
