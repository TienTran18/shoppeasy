// Shopping Cart Application
class ShoppingApp {
    constructor() {
        this.products = [];
        this.cart = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.maxPrice = 1000;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.bindEvents();
        this.renderProducts();
        this.updateCartUI();
    }

    // Sample product data
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
                inStock: true
            },
            {
                id: 2,
                name: "Smart Fitness Watch",
                description: "Advanced fitness tracking with heart rate monitor, GPS, and water resistance.",
                price: 299.99,
                category: "electronics",
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 3,
                name: "Premium Cotton T-Shirt",
                description: "Soft, comfortable cotton t-shirt available in multiple colors and sizes.",
                price: 29.99,
                category: "clothing",
                rating: 4.3,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 4,
                name: "Designer Jeans",
                description: "Classic fit jeans made from premium denim with modern styling.",
                price: 89.99,
                category: "clothing",
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 5,
                name: "Smart Home Speaker",
                description: "Voice-controlled smart speaker with built-in virtual assistant and premium sound.",
                price: 149.99,
                category: "electronics",
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 6,
                name: "Garden Tool Set",
                description: "Complete set of professional gardening tools for all your outdoor needs.",
                price: 79.99,
                category: "home",
                rating: 4.2,
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 7,
                name: "Running Shoes",
                description: "Lightweight running shoes with advanced cushioning and breathable material.",
                price: 129.99,
                category: "sports",
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 8,
                name: "Programming Book",
                description: "Comprehensive guide to modern web development with practical examples.",
                price: 49.99,
                category: "books",
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 9,
                name: "Yoga Mat",
                description: "Premium non-slip yoga mat with carrying strap and alignment lines.",
                price: 39.99,
                category: "sports",
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 10,
                name: "Coffee Maker",
                description: "Programmable coffee maker with built-in grinder and thermal carafe.",
                price: 179.99,
                category: "home",
                rating: 4.3,
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 11,
                name: "Winter Jacket",
                description: "Warm, waterproof winter jacket with insulated lining and multiple pockets.",
                price: 159.99,
                category: "clothing",
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
                inStock: true
            },
            {
                id: 12,
                name: "Cookbook Collection",
                description: "Set of 3 cookbooks featuring international cuisine and cooking techniques.",
                price: 69.99,
                category: "books",
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                inStock: true
            }
        ];
        
        this.filteredProducts = [...this.products];
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        searchBtn.addEventListener('click', () => this.handleSearch(searchInput.value));

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
        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });

        // Price range filter
        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');
        
        priceRange.addEventListener('input', (e) => {
            this.maxPrice = parseInt(e.target.value);
            priceValue.textContent = `$0 - $${this.maxPrice}`;
            this.applyFilters();
        });

        // Cart functionality
        const cartBtn = document.getElementById('cartBtn');
        const closeCart = document.getElementById('closeCart');
        const cartOverlay = document.getElementById('cartOverlay');
        
        cartBtn.addEventListener('click', () => this.toggleCart());
        closeCart.addEventListener('click', () => this.toggleCart());
        cartOverlay.addEventListener('click', () => this.toggleCart());

        // Checkout functionality
        const checkoutBtn = document.getElementById('checkoutBtn');
        const checkoutModal = document.getElementById('checkoutModal');
        const closeCheckoutModal = document.getElementById('closeCheckoutModal');
        const checkoutForm = document.getElementById('checkoutForm');
        
        checkoutBtn.addEventListener('click', () => this.openCheckoutModal());
        closeCheckoutModal.addEventListener('click', () => this.closeCheckoutModal());
        checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));

        // Modal functionality
        const productModal = document.getElementById('productModal');
        const closeModal = document.getElementById('closeModal');
        
        closeModal.addEventListener('click', () => this.closeProductModal());
        window.addEventListener('click', (e) => {
            if (e.target === productModal) this.closeProductModal();
            if (e.target === checkoutModal) this.closeCheckoutModal();
        });
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
        
        loading.style.display = 'block';
        productsGrid.innerHTML = '';

        // Simulate loading delay
        setTimeout(() => {
            if (this.filteredProducts.length === 0) {
                productsGrid.innerHTML = `
                    <div class="no-products">
                        <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                `;
            } else {
                this.filteredProducts.forEach(product => {
                    const productCard = this.createProductCard(product);
                    productsGrid.appendChild(productCard);
                });
            }
            
            loading.style.display = 'none';
        }, 500);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.rating})</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;

        // Add click event for product details
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart-btn')) {
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

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.updateCartUI();
        this.showCartNotification();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartUI();
    }

    updateCartQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.updateCartUI();
            }
        }
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-item" onclick="app.removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `).join('');
        }

        // Update cart total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('active');
    }

    showCartNotification() {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1004;
            animation: slideIn 0.3s ease-out;
        `;
        notification.innerHTML = '<i class="fas fa-check"></i> Item added to cart!';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showProductModal(product) {
        const modal = document.getElementById('productModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div style="display: flex; gap: 2rem; align-items: flex-start;">
                <img src="${product.image}" alt="${product.name}" style="width: 300px; height: 300px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
                <div style="flex: 1;">
                    <h2 style="margin-bottom: 1rem; color: #1f2937;">${product.name}</h2>
                    <div class="product-rating" style="margin-bottom: 1rem;">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span class="rating-text">(${product.rating})</span>
                    </div>
                    <div class="product-price" style="font-size: 1.5rem; margin-bottom: 1rem;">$${product.price.toFixed(2)}</div>
                    <p style="color: #6b7280; margin-bottom: 2rem; line-height: 1.6;">${product.description}</p>
                    <button class="add-to-cart-btn" onclick="app.addToCart(${product.id}); app.closeProductModal();" style="width: auto; padding: 1rem 2rem;">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    closeProductModal() {
        document.getElementById('productModal').style.display = 'none';
    }

    openCheckoutModal() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        document.getElementById('checkoutModal').style.display = 'block';
    }

    closeCheckoutModal() {
        document.getElementById('checkoutModal').style.display = 'none';
    }

    handleCheckout(e) {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            cardNumber: document.getElementById('cardNumber').value,
            expiryDate: document.getElementById('expiryDate').value,
            cvv: document.getElementById('cvv').value
        };

        // Simulate order processing
        this.processOrder(formData);
    }

    processOrder(formData) {
        // Simulate API call
        const loadingBtn = document.querySelector('.submit-order-btn');
        const originalText = loadingBtn.textContent;
        
        loadingBtn.textContent = 'Processing...';
        loadingBtn.disabled = true;

        setTimeout(() => {
            // Clear cart
            this.cart = [];
            this.updateCartUI();
            
            // Close modals
            this.closeCheckoutModal();
            this.toggleCart();
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            document.getElementById('checkoutForm').reset();
            
            // Reset button
            loadingBtn.textContent = originalText;
            loadingBtn.disabled = false;
            
        }, 2000);
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}

// Initialize the application
const app = new ShoppingApp();

// Add some utility functions for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            app.closeProductModal();
            app.closeCheckoutModal();
        }
        
        // Enter key in search input triggers search
        if (e.key === 'Enter' && e.target.id === 'searchInput') {
            app.handleSearch(e.target.value);
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards for animation
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});

// Add responsive image loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);
