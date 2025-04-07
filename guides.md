# 📚 Book Marketplace Platform

A full-stack Book Marketplace where users can upload and sell books in PDF format. Built entirely with TypeScript for both frontend and backend using the MERN stack. Styled with Material UI and integrated with Stripe for secure transactions.

---

## 🚀 Tech Stack

**Frontend:**

- React + Vite (⚡️ Super fast)
- TypeScript
- MUI (Material UI)
- React Router DOM
- Redux Toolkit + **RTK Query**
- React Hook Form + **Yup**
- React Toastify

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose
- TypeScript
- Cloudinary / AWS S3
- Stripe
- JWT + Bcrypt

---

## 🔐 Backend Features

### 🧑‍💻 User Authentication

- JWT-based auth
- Password hashing with bcrypt
- Auth middleware for protecting routes

### 📚 Book Management

- Upload, read, update, and delete books
- Store files securely on cloud storage (e.g., Cloudinary)

### 💳 Stripe Payments

- Secure payments via Stripe
- Webhook integration to track transactions

### 🔒 Security & Validation

- Express-validator for backend validation
- CORS enabled for frontend-backend communication

---

## 💻 Frontend Features

### 🔐 Authentication

- Register, Login, Logout
- JWT stored in local storage or cookies
- Protected routes using React Router

### 📋 Forms

- **React Hook Form** for performant forms
- **Yup** for form-level validation schemas

### 📚 Book Upload & Management

- Drag-and-drop file upload (react-dropzone)
- PDF upload with metadata (title, price, description)

### 💰 Payments

- Stripe integration for book purchase
- Receipt & confirmation display after successful checkout

### 📊 Dashboards

- **User Dashboard** for managing uploads and purchases
- **Admin Dashboard** for managing users, books, and transactions

### 🧠 State Management

- **Redux Toolkit**
- **RTK Query** for API fetching, caching, and error handling

### 🎨 UI/UX

- MUI Components (Forms, Buttons, Dialogs)
- Toast alerts with React Toastify
- Fully responsive

---

## 📁 Project Folder Structure

<pre>

book-marketplace/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── types/                        # TypeScript types for backend
│   ├── .env
│   ├── server.ts
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Books/
│   │   │   ├── Dashboard/
│   │   │   ├── Admin/
│   │   │   └── Shared/
│   │   ├── features/                     # Redux Slices + RTK Query endpoints
│   │   │   ├── auth/
│   │   │   ├── books/
│   │   │   ├── payments/
│   │   │   ├── users/
│   │   │   └── apiSlice.ts              # Base RTK Query API setup
│   │   ├── forms/                       # RHF logic + Yup schemas
│   │   │   ├── schemas/
│   │   │   └── controllers/
│   │   ├── hooks/                       # Custom React Hooks
│   │   ├── layouts/                     # Page layout wrappers
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/                       # Redux Store setup
│   │   │   └── index.ts
│   │   ├── types/                       # Shared frontend types
│   │   ├── utils/                       # Helper functions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
└── README.md

</pre>

---

## 🔗 Resources

### MERN + TypeScript

- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)

### Frontend Libraries

- [Vite](https://vitejs.dev/)
- [MUI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

### Backend & Tools

- [Multer](https://www.npmjs.com/package/multer)
- [Cloudinary](https://cloudinary.com/documentation)
- [Stripe](https://docs.stripe.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

---
