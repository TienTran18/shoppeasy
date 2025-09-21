# ShopEasy - Modern Shopping Web Application

A full-stack e-commerce web application built with modern web technologies, featuring a modular frontend and a robust backend API.

## 🚀 Features

### Frontend Features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **User Authentication** - Login, register, and profile management
- **Product Catalog** - Browse products with search and filtering
- **Shopping Cart** - Add, remove, and manage cart items
- **Wishlist** - Save favorite products for later
- **Product Reviews** - Rate and review products with comments
- **Modern UI** - Beautiful, intuitive interface with smooth animations
- **Modular Architecture** - Clean, maintainable code structure

### Backend Features
- **RESTful API** - Complete API for all operations
- **MongoDB Integration** - Scalable database with Mongoose ODM
- **User Management** - Secure user authentication and profiles
- **Product Management** - CRUD operations for products
- **Order Processing** - Complete order management system
- **Review System** - Product reviews and ratings
- **Wishlist Management** - User wishlist functionality
- **Security** - CORS, rate limiting, and input validation

## 📁 Project Structure

```
shoppeasy/
├── frontend/                 # Frontend application
│   ├── index.html           # Main HTML file
│   ├── styles.css           # CSS styles
│   └── js/                  # JavaScript modules
│       ├── app.js           # Main application controller
│       ├── auth.js          # Authentication system
│       ├── products.js      # Product management
│       ├── cart.js          # Shopping cart
│       ├── reviews.js       # Review system
│       ├── wishlist.js      # Wishlist management
│       └── database.js      # Database operations
├── backend/                 # Backend server
│   ├── server.js           # Express.js server
│   ├── package.json        # Backend dependencies
│   ├── scripts/            # Database scripts
│   │   └── init-database.js
│   ├── env.example         # Environment variables template
│   └── README.md           # Backend documentation
├── package.json            # Root package.json
└── README.md              # This file
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **Vanilla JavaScript** - No frameworks, pure JS
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TienTran18/shoppeasy.git
   cd shoppeasy
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Configure MongoDB**
   ```bash
   # Copy environment template
   cp backend/env.example backend/.env
   
   # Edit backend/.env with your MongoDB credentials
   # Update MONGODB_URI with your connection string
   ```

4. **Initialize Database**
   ```bash
   cd backend
   npm run init-db
   cd ..
   ```

5. **Start the Application**
   ```bash
   # Start backend server (Terminal 1)
   cd backend
   npm run dev
   
   # Start frontend server (Terminal 2)
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📖 Usage

### Frontend Development
```bash
# Start development server with live reload
npm run dev

# Start production server
npm start
```

### Backend Development
```bash
# Start backend with nodemon (auto-restart)
cd backend
npm run dev

# Start backend in production mode
npm start
```

### Database Operations
```bash
# Initialize database with sample data
cd backend
npm run init-db

# Test database connection
npm run test-connection
```

## 🔧 Configuration

### MongoDB Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env` with your credentials

### Environment Variables
```env
# backend/.env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER-NAME.mongodb.net/DATABASE-NAME?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
```

## 📱 Features Overview

### User Authentication
- User registration and login
- Profile management
- Secure session handling
- User avatars and information

### Product Management
- Product catalog with categories
- Search and filtering
- Product details and images
- Stock management
- Product ratings and reviews

### Shopping Experience
- Add products to cart
- Quantity management
- Cart persistence
- Checkout process
- Order history

### Wishlist
- Save favorite products
- Remove from wishlist
- Wishlist persistence
- Quick add to cart

### Reviews & Ratings
- Star rating system
- Written reviews
- Review helpfulness voting
- Verified purchase badges
- Review moderation

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Modern Interface** - Clean, professional design
- **Smooth Animations** - Enhanced user experience
- **Loading States** - Visual feedback for operations
- **Error Handling** - User-friendly error messages
- **Accessibility** - WCAG compliant design

## 🔒 Security Features

- **CORS Protection** - Secure cross-origin requests
- **Rate Limiting** - Prevent API abuse
- **Input Validation** - Sanitize user inputs
- **Error Handling** - Secure error responses
- **Helmet.js** - Security headers

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/users` - Register new user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)

### Cart & Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:id` - Update order status

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews` - Get product reviews
- `PUT /api/reviews/:id` - Update review

### Wishlist
- `POST /api/wishlists` - Add to wishlist
- `GET /api/wishlists` - Get user wishlist
- `DELETE /api/wishlists/:id` - Remove from wishlist

## 🚀 Deployment

### Frontend Deployment
- **Netlify** - Easy static site deployment
- **Vercel** - Modern frontend deployment
- **GitHub Pages** - Free hosting option

### Backend Deployment
- **Heroku** - Easy Node.js deployment
- **Railway** - Modern backend hosting
- **DigitalOcean** - VPS deployment

### Database
- **MongoDB Atlas** - Cloud database (recommended)
- **MongoDB Compass** - Local development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Tien Tran** - *Initial work* - [TienTran18](https://github.com/TienTran18)

## 🙏 Acknowledgments

- Unsplash for beautiful product images
- Font Awesome for icons
- Google Fonts for typography
- MongoDB for database services
- Express.js community for excellent documentation

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/TienTran18/shoppeasy/issues) page
2. Create a new issue with detailed description
3. Contact: [Your Email]

## 🔄 Version History

- **v2.0.0** - Full-stack application with MongoDB integration
- **v1.0.0** - Initial frontend-only version

---

**Happy Shopping! 🛒✨**