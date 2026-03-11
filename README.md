# Digital Certificate System

A full-stack web application for issuing, storing, and verifying digital certificates. Built with React (Vite), Node.js, Express, and MongoDB.

## Features

- **Issue Certificates** – Admins can create certificates for students
- **Secure Storage** – Certificates stored in MongoDB
- **PDF Generation** – Students can download certificates as PDF
- **Search & Verify** – Public verification by Certificate ID or student name
- **Role-Based Access** – Admin, Student, and Verifier (public) roles
- **Session Authentication** – express-session with MongoDB store

## Tech Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Frontend  | React 18, Vite, React Router  |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB (Mongoose)            |
| Auth      | express-session, connect-mongo |
| PDF       | pdfkit                        |

## Project Structure

```
Digital_Certificate_System/
├── client/                 # Vite React frontend
│   ├── src/
│   │   ├── components/     # ProtectedRoute, etc.
│   │   ├── layouts/        # Navbar
│   │   ├── pages/          # Login, Verify, Admin, Student pages
│   │   ├── services/       # API calls
│   │   ├── styles/         # index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── server/                 # Node Express backend
│   ├── config/             # db.js
│   ├── controllers/        # auth, certificate, user
│   ├── middleware/         # auth (protect, adminOnly, studentOnly)
│   ├── models/             # User, Certificate
│   ├── routes/             # auth, certificate, user
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── .env.example
└── README.md
```

## Setup Guide

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone and Install

```bash
cd Digital_Certificate_System

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Variables

Create `server/.env` from `.env.example`:

```bash
cp .env.example server/.env
```

Edit `server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/digital-certificate-system
SESSION_SECRET=your-super-secret-session-key
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

This creates:
- **Admin:** admin@dcs.com / Admin@123
- **Student 1:** student1@dcs.com / Student@123
- **Student 2:** student2@dcs.com / Student@123
- **3 sample certificates** (e.g. DCS-000001ABC, DCS-000002DEF, DCS-000003GHI)

### 4. Run the Application

**Terminal 1 – Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 – Frontend:**
```bash
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | - | Login |
| POST | /api/auth/logout | - | Logout |
| GET | /api/auth/session | - | Get current session |
| GET | /api/certificates/verify | - | Verify by certificateId or studentName (query) |
| POST | /api/certificates | Admin | Issue certificate |
| GET | /api/certificates | Admin | Get all certificates |
| GET | /api/certificates/:id | Admin | Get certificate by ID |
| PUT | /api/certificates/:id/revoke | Admin | Revoke certificate |
| GET | /api/certificates/student | Student | Get own certificates |
| GET | /api/certificates/student/:id | Student | Get own certificate by ID |
| GET | /api/certificates/:id/download | Student | Download PDF |
| GET | /api/users/profile | Any | Get profile |

## User Flows

### Issue a Certificate (Admin)

1. Login as admin@dcs.com / Admin@123
2. Go to **Issue Certificate**
3. Enter student email (must be registered student), name, course, date, grade
4. Click **Issue Certificate**
5. A unique Certificate ID is auto-generated

### Download PDF (Student)

1. Login as student1@dcs.com / Student@123
2. Go to **My Certificates**
3. Click **View** on a certificate
4. Click **Download PDF**

### Verify Certificate (Public / Verifier)

1. Go to **Verify** (no login required)
2. Enter Certificate ID (e.g. DCS-000001ABC) or Student Name
3. Click **Verify**
4. View results with validity status

## Routes

| Path | Access | Description |
|------|--------|-------------|
| / | Public | Redirects to /verify |
| /login | Public | Login page |
| /verify | Public | Certificate verification |
| /admin/dashboard | Admin | Admin dashboard |
| /admin/issue-certificate | Admin | Issue new certificate |
| /admin/certificates | Admin | All certificates |
| /admin/certificate/:id | Admin | Certificate detail, revoke |
| /admin/profile | Admin | Admin profile |
| /student/dashboard | Student | Student dashboard |
| /student/certificates | Student | My certificates |
| /student/certificate/:id | Student | Certificate detail, download PDF |
| /student/profile | Student | Student profile |
| /404 | Public | Not found page |

## License

MIT
