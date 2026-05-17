# 🚀 Smart Leads Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/MERN-STACK-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-TypeScript-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-Express-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MongoDB-Database-darkgreen?style=for-the-badge" />
</p>

---

# 📌 Project Overview

Smart Leads Dashboard is a full-stack MERN application used to manage leads with secure authentication and user-based dashboards.

Users can:

✅ Register & Login  
✅ Add Leads  
✅ Search Leads  
✅ Filter Leads  
✅ Manage their own leads securely  

---

# 🛠️ Tech Stack

## 🎨 Frontend

- ⚛️ React
- 📘 TypeScript
- 🎨 Tailwind CSS
- 🔗 Axios
- 🛣️ React Router DOM

---

## ⚙️ Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- 🔐 JWT Authentication
- 🔑 bcryptjs

---

# ✨ Features

| Feature | Status |
|---|---|
| User Registration | ✅ |
| User Login | ✅ |
| JWT Authentication | ✅ |
| Protected Routes | ✅ |
| Lead Dashboard | ✅ |
| Search Leads | ✅ |
| Filter Leads | ✅ |
| User-wise Leads | ✅ |
| Logout | ✅ |

---

# 📂 Project Structure

```bash
SMART-LEADS-DASHBOARD/
│
├── client/
├── server/
└── README.md
```

---

# ⚡ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# ⚡ Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create `.env` file inside `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

# 🔗 API Routes

## 🔐 Authentication Routes

```bash
POST /api/auth/register
POST /api/auth/login
```

---

## 📊 Leads Routes

```bash
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id
```

---

# 🖼️ Screenshots

## 🔐 Login Page

- Secure authentication system



## 📊 Dashboard

- Search leads
- Filter leads
- Add new leads
- User-specific dashboard

---

# 🌟 Future Improvements

- Pagination
- Dark Mode
- Edit Lead Modal
- Charts & Analytics
- Deployment

---

# 👨‍💻 Author

## Rohit Yadav

📧 Email: rohityadavit45@gmail.com

---

# ⭐ If you like this project, give it a star on GitHub!