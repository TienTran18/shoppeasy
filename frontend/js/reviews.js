// Reviews and Comments System
class ReviewManager {
    constructor() {
        this.reviews = this.loadReviews();
        this.init();
    }

    init() {
        this.bindReviewEvents();
    }

    loadReviews() {
        // Sample reviews - in a real app, this would come from a database
        return [
            {
                id: 1,
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
                id: 2,
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
            },
            {
                id: 3,
                productId: 2,
                userId: 1,
                userName: 'John Doe',
                userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                rating: 5,
                title: 'Perfect fitness companion',
                comment: 'This watch has everything I need for tracking my workouts. GPS is accurate, heart rate monitoring is reliable, and the battery lasts for days.',
                date: '2024-01-15',
                helpful: 15,
                verified: true
            },
            {
                id: 4,
                productId: 3,
                userId: 2,
                userName: 'Jane Smith',
                userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                rating: 4,
                title: 'Comfortable and soft',
                comment: 'Very comfortable t-shirt. The cotton is soft and the fit is perfect. Would definitely buy again.',
                date: '2024-01-12',
                helpful: 6,
                verified: true
            }
        ];
    }

    bindReviewEvents() {
        // Review modal events
        const reviewModal = document.getElementById('reviewModal');
        const closeReviewModal = document.getElementById('closeReviewModal');
        const reviewForm = document.getElementById('reviewForm');

        if (closeReviewModal) {
            closeReviewModal.addEventListener('click', () => this.hideReviewModal());
        }

        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => this.handleReviewSubmit(e));
        }

        // Star rating events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star-rating')) {
                this.handleStarClick(e.target);
            }
        });
    }

    getReviewsForProduct(productId) {
        return this.reviews.filter(review => review.productId === productId);
    }

    getAverageRating(productId) {
        const productReviews = this.getReviewsForProduct(productId);
        if (productReviews.length === 0) return 0;
        
        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / productReviews.length).toFixed(1);
    }

    renderReviews(productId) {
        const reviews = this.getReviewsForProduct(productId);
        const averageRating = this.getAverageRating(productId);
        const totalReviews = reviews.length;

        return `
            <div class="reviews-section">
                <div class="reviews-header">
                    <h3>Customer Reviews</h3>
                    <div class="rating-summary">
                        <div class="average-rating">
                            <span class="rating-number">${averageRating}</span>
                            <div class="stars">${this.generateStars(averageRating)}</div>
                            <span class="total-reviews">(${totalReviews} reviews)</span>
                        </div>
                        <button class="btn btn-primary" onclick="reviewManager.showReviewModal(${productId})">
                            <i class="fas fa-plus"></i> Write Review
                        </button>
                    </div>
                </div>
                
                <div class="reviews-list">
                    ${reviews.map(review => this.renderReviewItem(review)).join('')}
                </div>
            </div>
        `;
    }

    renderReviewItem(review) {
        return `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.userAvatar}" alt="${review.userName}" class="reviewer-avatar">
                        <div class="reviewer-details">
                            <h4>${review.userName}</h4>
                            <div class="review-meta">
                                <div class="stars">${this.generateStars(review.rating)}</div>
                                <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                                ${review.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified Purchase</span>' : ''}
                            </div>
                        </div>
                    </div>
                    <div class="review-actions">
                        <button class="helpful-btn" onclick="reviewManager.markHelpful(${review.id})">
                            <i class="fas fa-thumbs-up"></i> Helpful (${review.helpful})
                        </button>
                    </div>
                </div>
                <div class="review-content">
                    <h5>${review.title}</h5>
                    <p>${review.comment}</p>
                </div>
            </div>
        `;
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

    showReviewModal(productId) {
        if (!authManager.isLoggedIn()) {
            authManager.showNotification('Please login to write a review', 'error');
            authManager.showLoginModal();
            return;
        }

        const modal = document.getElementById('reviewModal');
        const modalBody = document.getElementById('reviewModalBody');
        const product = app.products.find(p => p.id === productId);
        
        modalBody.innerHTML = `
            <div class="review-form-header">
                <h3>Write a Review</h3>
                <p>for ${product.name}</p>
            </div>
            <form id="reviewForm" data-product-id="${productId}">
                <div class="form-group">
                    <label>Rating *</label>
                    <div class="star-rating-input">
                        <input type="hidden" id="reviewRating" name="rating" required>
                        <div class="star-rating">
                            <i class="far fa-star" data-rating="1"></i>
                            <i class="far fa-star" data-rating="2"></i>
                            <i class="far fa-star" data-rating="3"></i>
                            <i class="far fa-star" data-rating="4"></i>
                            <i class="far fa-star" data-rating="5"></i>
                        </div>
                        <span class="rating-text">Click to rate</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="reviewTitle">Review Title *</label>
                    <input type="text" id="reviewTitle" name="title" required placeholder="Summarize your review">
                </div>
                
                <div class="form-group">
                    <label for="reviewComment">Your Review *</label>
                    <textarea id="reviewComment" name="comment" required rows="5" placeholder="Tell others about your experience with this product"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="reviewManager.hideReviewModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Review</button>
                </div>
            </form>
        `;
        
        modal.style.display = 'block';
    }

    hideReviewModal() {
        document.getElementById('reviewModal').style.display = 'none';
    }

    handleStarClick(star) {
        const rating = parseInt(star.dataset.rating);
        const stars = star.parentElement.querySelectorAll('.fa-star');
        const ratingText = star.parentElement.nextElementSibling;
        const ratingInput = document.getElementById('reviewRating');
        
        // Update visual stars
        stars.forEach((s, index) => {
            if (index < rating) {
                s.className = 'fas fa-star';
            } else {
                s.className = 'far fa-star';
            }
        });
        
        // Update hidden input
        ratingInput.value = rating;
        
        // Update text
        const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
        ratingText.textContent = ratingTexts[rating];
    }

    handleReviewSubmit(e) {
        e.preventDefault();
        
        if (!authManager.isLoggedIn()) {
            authManager.showNotification('Please login to submit a review', 'error');
            return;
        }

        const formData = new FormData(e.target);
        const productId = parseInt(e.target.dataset.productId);
        const user = authManager.getCurrentUser();
        
        const newReview = {
            id: this.reviews.length + 1,
            productId: productId,
            userId: user.id,
            userName: `${user.firstName} ${user.lastName}`,
            userAvatar: user.avatar,
            rating: parseInt(formData.get('rating')),
            title: formData.get('title'),
            comment: formData.get('comment'),
            date: new Date().toISOString().split('T')[0],
            helpful: 0,
            verified: true
        };

        this.reviews.push(newReview);
        this.hideReviewModal();
        authManager.showNotification('Review submitted successfully!', 'success');
        
        // Refresh product details if modal is open
        if (document.getElementById('productModal').style.display === 'block') {
            app.showProductModal(app.products.find(p => p.id === productId));
        }
    }

    markHelpful(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
            review.helpful += 1;
            authManager.showNotification('Thank you for your feedback!', 'success');
        }
    }

    getReviewStats(productId) {
        const reviews = this.getReviewsForProduct(productId);
        const stats = {
            total: reviews.length,
            average: this.getAverageRating(productId),
            distribution: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        };

        reviews.forEach(review => {
            stats.distribution[review.rating]++;
        });

        return stats;
    }
}

// Initialize review manager
const reviewManager = new ReviewManager();
