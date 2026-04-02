# ☕ Coffee House Authentication System

A secure full-stack authentication app for a coffee house menu. Users can sign up, login, and view protected menu items.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React 18 + Vite | Node.js + Express | PostgreSQL |
| Chakra UI | Prisma ORM | |
| React Router | JWT + bcrypt | |
| Formik + Yup | express-validator | |

---

## ✨ Features

- ✅ User signup with strong password validation
- ✅ Login with username, email, or phone
- ✅ JWT token-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected routes (redirect if not logged in)
- ✅ Input sanitization & validation
- ✅ Rate limiting & CORS security
- ✅ Responsive coffee menu UI

---

## 📁 Project Structure
authappfinal/
├── client/ # React Frontend
├── server/ # Node.js Backend
│ ├── .env.example # Environment template (safe to commit)
│ └── .env # Actual secrets (NEVER commit)
├── .gitignore
└── README.md

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/continental-bb/coffee-auth-app.git
cd coffee-auth-app

2. Install Dependencies
# Backend
cd server
npm install
npx prisma generate
npx prisma db push

# Frontend (new terminal)
cd ../client
npm install
3. Setup Environment Variables
# In server folder, create .env from example
cp .env.example .env
# Then edit .env with your actual database credentials
4. Run Application
# Backend (server folder)
npm run dev

# Frontend (client folder, new terminal)
npm run dev
 Open: http://localhost:5173


🔐 Security Implemented
Password hashing with bcrypt
JWT token authentication
Input sanitization (XSS protection)
Rate limiting (100 req/15min)
CORS policy
Helmet security headers

environment
👨‍💻 Author
 Name BTS 
GitHub: @continental-bb

📄 License
MIT License
