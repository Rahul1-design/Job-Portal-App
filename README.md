# 🧑‍💻 DevBoard — Job Portal App

A full-stack job portal web application built with the **MERN stack**, where recruiters can post jobs and manage applicants, while students can browse, search, and apply for jobs.

**Live Demo:** [job-portal-app-aggx.vercel.app](https://job-portal-app-aggx.vercel.app)

## ✨ Features
### 👨‍🎓 Student
- Register and log in with role-based access
- Browse and search jobs by title, description, or location
- Filter jobs by location, industry, and salary range
- View detailed job descriptions
- Apply to jobs with one click
- Track application status (Pending / Accepted / Rejected)
- Update profile — bio, skills, resume (PDF), and profile photo

### 🧑‍💼 Recruiter (Admin)
- Register and manage companies with logo upload
- Post new job listings with full details
- View all applicants for each job
- Accept or reject applicants
- Delete job listings
- Filter companies and jobs by name

### 🔐 Auth & Security
- JWT-based authentication stored in HTTP-only cookies
- Role-based route protection (student vs recruiter)
- Protected admin routes on the frontend

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Redux Toolkit | Global state management |
| Redux Persist | Persist auth state across sessions |
| React Router v7 | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS v4 | Styling |
| shadcn/ui + Radix UI | UI components |
| Framer Motion | Animations |
| Sonner | Toast notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Cloudinary | Image and file uploads |
| Multer | Multipart form handling |
| Cookie Parser | HTTP cookie handling |
| CORS | Cross-origin resource sharing |

---

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/Rahul1-design/Job-Portal-App.git
cd Job-Portal-App
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
PORT=8000
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_BACKEND_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🌐 API Endpoints

### User
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/user/register` | Register a new user | ❌ |
| POST | `/api/v1/user/login` | Login | ❌ |
| GET | `/api/v1/user/logout` | Logout | ❌ |
| POST | `/api/v1/user/profile/update` | Update profile | ✅ |
| GET | `/api/v1/user/get` | Get current user | ✅ |

### Company
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/company/register` | Register company | ✅ |
| GET | `/api/v1/company/get` | Get all companies | ✅ |
| GET | `/api/v1/company/get/:id` | Get company by ID | ✅ |
| PUT | `/api/v1/company/update/:id` | Update company | ✅ |

### Job
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/job/post` | Post a new job | ✅ |
| GET | `/api/v1/job/get` | Get all jobs (with search) | ✅ |
| GET | `/api/v1/job/get/:id` | Get job by ID | ✅ |
| GET | `/api/v1/job/getadminjobs` | Get recruiter's jobs | ✅ |
| GET | `/api/v1/job/delete/:id` | Delete a job | ✅ |

### Application
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/application/apply/:id` | Apply to a job | ✅ |
| GET | `/api/v1/application/get` | Get applied jobs | ✅ |
| GET | `/api/v1/application/:id/applicants` | Get applicants for a job | ✅ |
| POST | `/api/v1/application/status/:id/update` | Update application status | ✅ |

---

## ☁️ Deployment

This project is deployed on **Vercel** with the frontend and backend as separate projects.

- **Frontend:** Vercel (Vite)
- **Backend:** Vercel (Serverless Functions)
- **Database:** MongoDB Atlas
- **File Storage:** Cloudinary

### Environment Variables on Vercel

**Backend project:**
MONGO_URI
SECRET_KEY
CLOUD_NAME
API_KEY
API_SECRET
FRONTEND_URL

**Frontend project:**
VITE_BACKEND_URL

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 👨‍💻 Author

**Rahul Shrestha**
- GitHub: [@Rahul1-design](https://github.com/Rahul1-design)
