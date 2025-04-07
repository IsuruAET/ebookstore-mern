# E-Bookstore MERN Stack Deployment Guide

This guide provides step-by-step instructions for deploying the E-Bookstore MERN stack application using Vercel for both frontend and backend.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for database)
- Vercel account
- GitHub account
- Git

## Vercel Project Setup

### Backend Project Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Node.js
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `.`
   - Install Command: `npm install`

### Frontend Project Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Environment Variables Setup in Vercel

### Backend Environment Variables

1. Go to your backend project in Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

### Frontend Environment Variables

1. Go to your frontend project in Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add the following variable:
   ```
   VITE_API_URL=your_backend_url
   ```

## GitHub Repository Setup

1. Create a new repository on GitHub
2. Initialize your local repository:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

3. Create `.gitignore` file:
   ```
   node_modules/
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   dist/
   ```

## GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
    paths:
      - "backend/**"
      - "frontend/**"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build and Deploy Backend
        if: contains(github.event.head_commit.modified, 'backend/')
        run: |
          cd backend
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build and Deploy Frontend
        if: contains(github.event.head_commit.modified, 'frontend/')
        run: |
          cd frontend
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Vercel Token Setup in GitHub

1. Go to Vercel Dashboard → Settings → Tokens
2. Create a new token
3. Go to GitHub repository → Settings → Secrets
4. Add new secret:
   - Name: `VERCEL_TOKEN`
   - Value: Your Vercel token

## Deployment Process

### Backend Changes Only

1. Make changes to backend code
2. Commit and push to main branch
3. GitHub Actions will automatically:
   - Detect backend changes
   - Build and deploy only the backend
   - Skip frontend deployment

### Frontend Changes Only

1. Make changes to frontend code
2. Commit and push to main branch
3. GitHub Actions will automatically:
   - Detect frontend changes
   - Build and deploy only the frontend
   - Skip backend deployment

## Post-Deployment Checklist

1. Verify backend API endpoints are working
2. Test frontend functionality
3. Check database connections
4. Test authentication flow
5. Verify file uploads (if applicable)
6. Test all CRUD operations
7. Check error handling
8. Verify CORS settings

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure CORS is properly configured in the backend
   - Check if the frontend URL is whitelisted in Vercel

2. **Database Connection Issues**

   - Verify MongoDB connection string in Vercel environment variables
   - Check network access settings in MongoDB Atlas

3. **Authentication Problems**

   - Verify JWT secret is correctly set in Vercel environment variables
   - Check token expiration settings

4. **Environment Variables**
   - Ensure all required variables are set in Vercel
   - Check for typos in variable names

## Maintenance

1. Regular backups of the database
2. Monitor application logs in Vercel
3. Keep dependencies updated
4. Regular security audits
5. Performance monitoring

## Security Considerations

1. Use HTTPS for all connections (automatically handled by Vercel)
2. Implement rate limiting
3. Regular security updates
4. Input validation
5. Proper error handling
6. Secure storage of sensitive data in Vercel environment variables

## Support

For additional support or questions, please refer to the project documentation or contact the development team.
