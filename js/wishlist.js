// Wishlist Management System
class WishlistManager {
    constructor() {
        this.wishlist = this.loadWishlist();
        this.init();
    }

    init() {
        this.bindWishlistEvents();
        this.updateWishlistUI();
    }

    loadWishlist() {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    bindWishlistEvents() {
        // Wishlist modal events
        const wishlistBtn = document.getElementById('wishlistBtn');
        const wishlistModal = document.getElementById('wishlistModal');
        const closeWishlistModal = document.getElementById('closeWishlistModal');

        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => this.showWishlistModal());
        }

        if (closeWishlistModal) {
            closeWishlistModal.addEventListener('click', () => this.hideWishlistModal());
        }
    }

    addToWishlist(productId) {
        if (!authManager.isLoggedIn()) {
            authManager.showNotification('Please login to add items to wishlist', 'error');
            authManager.showLoginModal();
            return;
        }

        const product = app.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.wishlist.find(item => item.id === productId);
        
        if (existingItem) {
            authManager.showNotification('Item already in wishlist', 'info');
            return;
        }

        this.wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            addedDate: new Date().toISOString().split('T')[0]
        });

        this.saveWishlist();
        this.updateWishlistUI();
        authManager.showNotification('Added to wishlist!', 'success');
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.saveWishlist();
        this.updateWishlistUI();
        authManager.showNotification('Removed from wishlist', 'info');
    }

    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    }

    updateWishlistUI() {
        const wishlistCount = document.getElementById('wishlistCount');
        if (wishlistCount) {
            wishlistCount.textContent = this.wishlist.length;
        }

        // Update wishlist buttons on product cards
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            const icon = btn.querySelector('i');
            
            if (this.isInWishlist(productId)) {
                icon.className = 'fas fa-heart';
                btn.classList.add('active');
            } else {
                icon.className = 'far fa-heart';
                btn.classList.remove('active');
            }
        });
    }

    showWishlistModal() {
        if (!authManager.isLoggedIn()) {
            authManager.showNotification('Please login to view wishlist', 'error');
            authManager.showLoginModal();
            return;
        }

        const modal = document.getElementById('wishlistModal');
        const modalBody = document.getElementById('wishlistModalBody');
        
        if (this.wishlist.length === 0) {
            modalBody.innerHTML = `
                <div class="empty-wishlist">
                    <i class="fas fa-heart" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <h3>Your wishlist is empty</h3>
                    <p>Start adding items you love to your wishlist!</p>
                    <button class="btn btn-primary" onclick="wishlistManager.hideWishlistModal()">Continue Shopping</button>
                </div>
            `;
        } else {
            modalBody.innerHTML = `
                <div class="wishlist-header">
                    <h3>My Wishlist (${this.wishlist.length} items)</h3>
                </div>
                <div class="wishlist-items">
                    ${this.wishlist.map(item => this.renderWishlistItem(item)).join('')}
                </div>
            `;
        }
        
        modal.style.display = 'block';
    }

    hideWishlistModal() {
        document.getElementById('wishlistModal').style.display = 'none';
    }

    renderWishlistItem(item) {
        return `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}" class="wishlist-item-image" onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'">
                <div class="wishlist-item-info">
                    <h4>${item.name}</h4>
                    <p class="wishlist-item-price">$${item.price.toFixed(2)}</p>
                    <p class="wishlist-item-date">Added on ${new Date(item.addedDate).toLocaleDateString()}</p>
                </div>
                <div class="wishlist-item-actions">
                    <button class="btn btn-primary btn-sm" onclick="app.addToCart(${item.id}); wishlistManager.removeFromWishlist(${item.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="wishlistManager.removeFromWishlist(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    }

    getWishlistCount() {
        return this.wishlist.length;
    }

    clearWishlist() {
        this.wishlist = [];
        this.saveWishlist();
        this.updateWishlistUI();
        authManager.showNotification('Wishlist cleared', 'info');
    }
}

// Initialize wishlist manager
const wishlistManager = new WishlistManager();
