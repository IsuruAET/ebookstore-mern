# 📘 Book Marketplace - Frontend

A modern frontend for the Book Marketplace platform built with **React + TypeScript** using **Vite**. It allows users to upload, manage, and purchase books (PDFs). Fully styled with **Material UI** and integrated with **Stripe** for payments.

---

## 🚀 Tech Stack

- React + Vite (⚡️ Super fast)
- TypeScript
- MUI (Material UI)
- React Router DOM
- Redux Toolkit + RTK Query
- React Hook Form + Yup
- React Toastify

---

## 💻 Features

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

## 📁 Folder Structure

<pre>

frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Books/
│   │   ├── Dashboard/
│   │   ├── Admin/
│   │   └── Shared/
│   ├── features/                     # Redux Slices + RTK Query endpoints
│   │   ├── auth/
│   │   ├── books/
│   │   ├── payments/
│   │   ├── users/
│   │   └── apiSlice.ts              # Base RTK Query API setup
│   ├── forms/                       # RHF logic + Yup schemas
│   │   ├── schemas/
│   │   └── controllers/
│   ├── hooks/                       # Custom React Hooks
│   ├── layouts/                     # Page layout wrappers
│   ├── pages/
│   ├── routes/
│   ├── store/                       # Redux Store setup
│   │   └── index.ts
│   ├── types/                       # Shared frontend types
│   ├── utils/                       # Helper functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tsconfig.json
└── package.json

</pre>

---

## 🔗 Useful Links

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Stripe](https://docs.stripe.com/)

---
