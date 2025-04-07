# EbookStore MERN Monorepo

A full-stack ebook store application built with MERN stack (MongoDB, Express, React, Node.js) using a monorepo structure.

## Project Structure

```
ebookstore-mern/
├── frontend/          # React frontend application
├── backend/           # Node.js backend application
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

## Deployment

This project uses GitHub Actions for CI/CD and Vercel for hosting. The deployment is configured to:

- Deploy frontend changes to Vercel frontend project
- Deploy backend changes to Vercel backend project
- Deploy both if changes are made to both

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Push to your branch
4. Create a pull request

## License

[MIT License](LICENSE)
