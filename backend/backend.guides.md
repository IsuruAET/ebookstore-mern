# 📚 Book Marketplace – Backend (TypeScript)

This is the **backend service** for the Book Marketplace platform, enabling users to upload and sell books in PDF format, manage user accounts, process Stripe payments, and perform admin operations. Built using **Node.js, Express.js, MongoDB**, and **TypeScript**, it ensures secure and scalable handling of user data, files, and transactions.

---

## 🚀 Tech Stack

- **Node.js** + **Express.js** – Server framework
- **MongoDB** + **Mongoose** – Database and ODM
- **TypeScript** – Strongly typed JavaScript
- **JWT Authentication** – Secure token-based user authentication
- **Bcrypt** – Secure password hashing
- **Stripe API** – Payment processing
- **Cloudinary / AWS S3** – File (PDF) uploads and storage
- **Multer** – File handling middleware
- **Express Validator** – Input validation and sanitization
- **CORS** – Cross-Origin Resource Sharing

---

## 📁 Folder Structure

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

</pre>

---

## ✨ Features

### 🔐 User Authentication

- JWT-based login and registration
- Password encryption using bcrypt
- Token verification middleware
- User roles for Admin/User

### 📘 Book Management

- Upload books in PDF format
- Store files on Cloudinary or AWS S3
- CRUD operations for books
- Attach metadata: title, description, price

### 💳 Stripe Integration

- Initiate secure Stripe Checkout Sessions
- Handle Stripe webhooks for payment events
- Record successful transactions in the database

### 🛡️ Data Validation & Security

- Validate incoming requests using Express Validator
- Secure HTTP headers (optionally using Helmet)
- CORS setup for frontend integration

### 🧑‍💼 Admin Controls

- View/manage all users
- View/manage uploaded books
- View/manage transactions

---

## 🔗 Resources

### Backend & Tools

- [Multer](https://www.npmjs.com/package/multer)
- [Cloudinary](https://cloudinary.com/documentation)
- [Stripe](https://docs.stripe.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

---

Test
