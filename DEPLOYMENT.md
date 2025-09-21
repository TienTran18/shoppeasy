# ShopEasy Deployment Guide

This guide will help you deploy your ShopEasy application to various platforms.

## 🚀 Quick Deployment Options

### Option 1: Full Stack on Heroku (Recommended)
Deploy both frontend and backend together on Heroku.

### Option 2: Separate Deployment
- Frontend: Netlify/Vercel
- Backend: Heroku/Railway
- Database: MongoDB Atlas

## 📋 Prerequisites

- GitHub repository with your code
- MongoDB Atlas account
- Heroku account (for full-stack deployment)
- Netlify/Vercel account (for frontend-only deployment)

## 🎯 Option 1: Full Stack on Heroku

### Step 1: Prepare Your Repository

1. **Update package.json** (already done)
2. **Create Procfile** for Heroku:
   ```bash
   echo "web: cd backend && npm start" > Procfile
   ```

3. **Update backend/server.js** to serve frontend:
   ```javascript
   // Add this line in server.js
   app.use(express.static(path.join(__dirname, '../frontend')));
   ```

### Step 2: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # Windows (using Chocolatey)
   choco install heroku-cli
   
   # Or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set NODE_ENV="production"
   heroku config:set PORT="3000"
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

6. **Initialize Database**
   ```bash
   heroku run npm run backend:init
   ```

### Step 3: Access Your App
Your app will be available at: `https://your-app-name.herokuapp.com`

## 🎯 Option 2: Separate Deployment

### Frontend Deployment (Netlify)

1. **Build Frontend**
   ```bash
   # No build step needed for vanilla JS
   # Just ensure all files are in frontend/ folder
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Set build settings:
     - Build command: `echo "No build needed"`
     - Publish directory: `frontend`
   - Deploy

3. **Update API URLs**
   - Update `frontend/js/database.js` to use your backend URL
   - Change API calls from `/api/` to `https://your-backend-url.herokuapp.com/api/`

### Backend Deployment (Heroku)

1. **Create Backend-Only App**
   ```bash
   heroku create your-backend-name
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set NODE_ENV="production"
   heroku config:set CORS_ORIGIN="https://your-frontend-url.netlify.app"
   ```

3. **Deploy Backend**
   ```bash
   cd backend
   git subtree push --prefix backend heroku main
   ```

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Configure Database Access**
   - Go to Database Access
   - Add new database user
   - Set username and password
   - Grant read/write permissions

4. **Configure Network Access**
   - Go to Network Access
   - Add IP address (0.0.0.0/0 for all IPs)
   - Or add specific IPs for security

5. **Get Connection String**
   - Go to Clusters
   - Click Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password

## 🔧 Environment Variables

### Required Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
NODE_ENV=production
PORT=3000
```

### Optional Variables
```env
CORS_ORIGIN=https://your-frontend-domain.com
JWT_SECRET=your-secret-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🚀 Deployment Commands

### Heroku Commands
```bash
# Create app
heroku create app-name

# Set environment variables
heroku config:set KEY=value

# View logs
heroku logs --tail

# Run commands
heroku run npm run backend:init

# Open app
heroku open
```

### Netlify Commands
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string format
   - Verify network access in MongoDB Atlas
   - Ensure credentials are correct

2. **CORS Errors**
   - Update CORS_ORIGIN environment variable
   - Check frontend URL configuration

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

4. **Environment Variables Not Working**
   - Restart the application after setting variables
   - Check variable names are correct
   - Verify no extra spaces or quotes

### Debugging Commands

```bash
# Check Heroku logs
heroku logs --tail

# Check environment variables
heroku config

# Run shell on Heroku
heroku run bash

# Test database connection
heroku run npm run backend:test
```

## 📊 Monitoring

### Heroku Monitoring
- Use Heroku dashboard for app metrics
- Set up alerts for errors
- Monitor database connections

### MongoDB Atlas Monitoring
- Use Atlas dashboard for database metrics
- Set up alerts for connection issues
- Monitor query performance

## 🔄 Updates and Maintenance

### Updating Your App
```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push heroku main

# Restart app if needed
heroku restart
```

### Database Maintenance
```bash
# Backup database
heroku run mongodump

# Restore database
heroku run mongorestore
```

## 💰 Cost Considerations

### Free Tiers
- **Heroku**: 550-1000 free dyno hours/month
- **MongoDB Atlas**: 512MB free storage
- **Netlify**: 100GB bandwidth/month

### Paid Options
- **Heroku**: $7/month for always-on dyno
- **MongoDB Atlas**: $9/month for 2GB storage
- **Netlify**: $19/month for Pro features

## 🎉 Success Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend API responding
- [ ] Database connected and initialized
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Sample data loaded
- [ ] All features working
- [ ] Error handling in place
- [ ] Monitoring set up

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review Heroku/Netlify documentation
3. Check MongoDB Atlas status
4. Create an issue in the GitHub repository

---

**Happy Deploying! 🚀**
