// Product Management System
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.maxPrice = 1000;
        this.searchQuery = '';
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.bindProductEvents();
        this.renderProducts();
    }

    loadProducts() {
        this.products = [
            {
                id: 1,
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
                id: 7,
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
                id: 8,
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
                id: 9,
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
                id: 10,
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
                id: 11,
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
                id: 12,
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
        
        this.filteredProducts = [...this.products];
    }

    bindProductEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch(searchInput.value));
        }

        // Category filtering
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCategoryFilter(e.target.dataset.category);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Sorting
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.applyFilters();
            });
        }

        // Price range filter
        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');
        
        if (priceRange && priceValue) {
            priceRange.addEventListener('input', (e) => {
                this.maxPrice = parseInt(e.target.value);
                priceValue.textContent = `$0 - $${this.maxPrice}`;
                this.applyFilters();
            });
        }
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.applyFilters();
    }

    handleCategoryFilter(category) {
        this.currentCategory = category;
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.products];

        // Category filter
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentCategory);
        }

        // Search filter
        if (this.searchQuery) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(this.searchQuery) ||
                product.description.toLowerCase().includes(this.searchQuery)
            );
        }

        // Price filter
        filtered = filtered.filter(product => product.price <= this.maxPrice);

        // Sort
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

        this.filteredProducts = filtered;
        this.renderProducts();
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const loading = document.getElementById('loading');
        
        if (loading) {
            loading.style.display = 'block';
        }
        if (productsGrid) {
            productsGrid.innerHTML = '';
        }

        // Simulate loading delay
        setTimeout(() => {
            if (this.filteredProducts.length === 0) {
                if (productsGrid) {
                    productsGrid.innerHTML = `
                        <div class="no-products">
                            <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                            <h3>No products found</h3>
                            <p>Try adjusting your search or filters</p>
                        </div>
                    `;
                }
            } else {
                this.filteredProducts.forEach(product => {
                    const productCard = this.createProductCard(product);
                    if (productsGrid) {
                        productsGrid.appendChild(productCard);
                    }
                });
            }
            
            if (loading) {
                loading.style.display = 'none';
            }
        }, 500);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        
        const isInWishlist = wishlistManager.isInWishlist(product.id);
        const wishlistIcon = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
        const wishlistClass = isInWishlist ? 'active' : '';
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                <button class="wishlist-btn ${wishlistClass}" data-product-id="${product.id}" onclick="wishlistManager.addToWishlist(${product.id})">
                    <i class="${wishlistIcon}"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">${this.generateStars(product.rating)}</div>
                    <span class="rating-text">(${product.rating})</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="cartManager.addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;

        // Add click event for product details
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart-btn') && 
                !e.target.classList.contains('wishlist-btn') &&
                !e.target.closest('.wishlist-btn')) {
                this.showProductModal(product);
            }
        });

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    showProductModal(product) {
        const modal = document.getElementById('productModal');
        const modalBody = document.getElementById('modalBody');
        
        const isInWishlist = wishlistManager.isInWishlist(product.id);
        const wishlistIcon = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
        const wishlistClass = isInWishlist ? 'active' : '';
        
        modalBody.innerHTML = `
            <div class="product-modal-content">
                <div class="product-modal-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                </div>
                <div class="product-modal-info">
                    <div class="product-modal-header">
                        <h2>${product.name}</h2>
                        <button class="wishlist-btn ${wishlistClass}" onclick="wishlistManager.addToWishlist(${product.id})">
                            <i class="${wishlistIcon}"></i>
                        </button>
                    </div>
                    <div class="product-rating">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span class="rating-text">(${product.rating})</span>
                    </div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="cartManager.addToCart(${product.id}); this.closeProductModal();">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            ${reviewManager.renderReviews(product.id)}
        `;
        
        modal.style.display = 'block';
    }

    closeProductModal() {
        document.getElementById('productModal').style.display = 'none';
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getProductsByCategory(category) {
        return this.products.filter(product => product.category === category);
    }

    searchProducts(query) {
        return this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
    }
}

// Initialize product manager
const productManager = new ProductManager();
