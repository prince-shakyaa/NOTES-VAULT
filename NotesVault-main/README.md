# 📒 Notes Vault

**Notes Vault** is a full-stack note-taking application that allows users to securely create, manage, and organize their notes. It provides authentication, tagging, and a clean modern UI powered by **React (Vite), TailwindCSS, Node.js, and MongoDB**.

---

## ✨ Features
- 🔐 **User Authentication** (JWT based login & signup)
- 📝 **Create, Edit, Delete Notes**
- 📌 **Pin Notes** for quick access
- 🏷️ **Tag Management** – Add and remove tags easily
- 🔍 **Search & Filter Notes**
- 🎨 **Responsive UI** with Tailwind CSS
- ☁️ **MERN Full-stack App** (MongoDB, Express, React, Node.js)

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🎨 TailwindCSS
- 📡 Axios (API calls)

### Backend
- 🚀 Node.js + Express
- 📂 MongoDB (Mongoose ODM)
- 🔑 JWT Authentication & Middleware

---

## 📂 Project Structure
```
Notes-Vault/
│
├── Backend/               # Express + MongoDB backend
│   ├── controllers/       # Route controllers (auth, notes)
│   ├── models/            # Mongoose models (User, Note)
│   ├── routes/            # API routes
│   ├── utilities/         # Helpers (JWT, middleware, etc.)
│   ├── index.js           # Backend entry point
│   ├── package.json
│   └── .env.example
│
├── Frontend/Notes-Vault/  # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/        # Images & icons
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Login, Signup, Home, etc.
│   │   ├── utils/         # Axios instance, helpers
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```




⚡ With **Notes Vault**, your thoughts and ideas are always safe and organized.
