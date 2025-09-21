// Authentication System
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.bindAuthEvents();
        this.checkLoginStatus();
    }

    loadUsers() {
        // Sample users - in a real app, this would come from a database
        return [
            {
                id: 1,
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
                id: 2,
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
    }

    bindAuthEvents() {
        // Login modal events
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeLoginModal = document.getElementById('closeLoginModal');
        const loginForm = document.getElementById('loginForm');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showLoginModal());
        }

        if (closeLoginModal) {
            closeLoginModal.addEventListener('click', () => this.hideLoginModal());
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register modal events
        const registerBtn = document.getElementById('registerBtn');
        const registerModal = document.getElementById('registerModal');
        const closeRegisterModal = document.getElementById('closeRegisterModal');
        const registerForm = document.getElementById('registerForm');

        if (registerBtn) {
            registerBtn.addEventListener('click', () => this.showRegisterModal());
        }

        if (closeRegisterModal) {
            closeRegisterModal.addEventListener('click', () => this.hideRegisterModal());
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Logout event
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Profile events
        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => this.showProfileModal());
        }
    }

    checkLoginStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateAuthUI();
        }
    }

    showLoginModal() {
        document.getElementById('loginModal').style.display = 'block';
    }

    hideLoginModal() {
        document.getElementById('loginModal').style.display = 'none';
    }

    showRegisterModal() {
        document.getElementById('registerModal').style.display = 'block';
    }

    hideRegisterModal() {
        document.getElementById('registerModal').style.display = 'none';
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateAuthUI();
            this.hideLoginModal();
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid email or password', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('regFirstName').value;
        const lastName = document.getElementById('regLastName').value;
        const email = document.getElementById('regEmail').value;
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        // Validation
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showNotification('Email already exists', 'error');
            return;
        }

        if (this.users.find(u => u.username === username)) {
            this.showNotification('Username already exists', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            username,
            email,
            password,
            firstName,
            lastName,
            avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=667eea&color=fff`,
            joinDate: new Date().toISOString().split('T')[0],
            isAdmin: false
        };

        this.users.push(newUser);
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.updateAuthUI();
        this.hideRegisterModal();
        this.showNotification('Registration successful!', 'success');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateAuthUI();
        this.showNotification('Logged out successfully', 'info');
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const userMenu = document.getElementById('userMenu');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userAvatar) userAvatar.src = this.currentUser.avatar;
            if (userName) userName.textContent = this.currentUser.firstName;
        } else {
            // User is not logged in
            if (loginBtn) loginBtn.style.display = 'block';
            if (registerBtn) registerBtn.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    showProfileModal() {
        if (!this.currentUser) return;

        const modal = document.getElementById('profileModal');
        const modalBody = document.getElementById('profileModalBody');
        
        modalBody.innerHTML = `
            <div class="profile-header">
                <img src="${this.currentUser.avatar}" alt="Profile" class="profile-avatar">
                <div class="profile-info">
                    <h2>${this.currentUser.firstName} ${this.currentUser.lastName}</h2>
                    <p>@${this.currentUser.username}</p>
                    <p>Member since ${new Date(this.currentUser.joinDate).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="profile-stats">
                <div class="stat">
                    <h3>Orders</h3>
                    <p>12</p>
                </div>
                <div class="stat">
                    <h3>Reviews</h3>
                    <p>8</p>
                </div>
                <div class="stat">
                    <h3>Wishlist</h3>
                    <p>5</p>
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-primary" onclick="authManager.editProfile()">Edit Profile</button>
                <button class="btn btn-secondary" onclick="authManager.logout()">Logout</button>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    editProfile() {
        // Implementation for editing profile
        this.showNotification('Profile editing feature coming soon!', 'info');
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize auth manager
const authManager = new AuthManager();
