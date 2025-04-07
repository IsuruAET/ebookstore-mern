# EbookStore MERN Monorepo

A full-stack ebook store application built with Vite (React), Node.js, Express, and MongoDB using a monorepo structure.

## Project Structure

```
ebookstore-mern/
├── frontend/          # Vite + React frontend application
├── backend/           # Node.js + Express backend application
└── .github/          # GitHub Actions workflows
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- MongoDB

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/ebookstore-mern.git
cd ebookstore-mern
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:

   - Create `.env` files in both frontend and backend directories
   - Copy the respective `.env.example` files and fill in the values

4. Start development servers:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

## Development Scripts

### Frontend (Vite)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

### Backend (Node/Express)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Deployment

This project uses GitHub Actions for CI/CD and Vercel for hosting. The deployment is configured to:

- Deploy frontend changes to Vercel frontend project
- Deploy backend changes to Vercel backend project
- Deploy both if changes are made to both

### Vercel Configuration

#### Frontend Project

- Framework Preset: Vite
- Build Command: `cd frontend && npm install && npm run build`
- Output Directory: `frontend/dist`
- Install Command: `cd frontend && npm install`

#### Backend Project

- Framework Preset: Node.js
- Build Command: `cd backend && npm install && npm run build`
- Output Directory: `backend/dist`
- Install Command: `cd backend && npm install`

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Push to your branch
4. Create a pull request

## License

[MIT License](LICENSE)
