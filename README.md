# AnnaMitra – NGO Assistance & Donation Management Platform

AnnaMitra is a web-based platform designed to connect NGOs, donors, and volunteers in a unified ecosystem.  
It streamlines food donation management, user onboarding, NGO verification, volunteer activity tracking, and admin monitoring.

---

## 🚀 Features

### 👥 User Roles
- **Donor Dashboard** – Manage donations & contribution history  
- **NGO Dashboard** – View requests, manage inventory, verify donors  
- **Volunteer Dashboard** – Assist NGOs, update activity, receive tasks  
- **Admin Dashboard** – Platform oversight, access hierarchy, user control  

### 🧩 Frontend
- EJS templating
- Responsive UI for dashboards & pages
- Clean form structure for all roles

### ⚙ Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **Passport.js Authentication**
- **Joi Validations**
- **Multer for File Uploads**
- **bcrypt for Password Hashing**

---

## 🧪 Testing & Quality Assurance

### ✔ Validation  
- All forms validated using **Joi** to ensure strong & secure input handling.

### ✔ Security  
- Authentication handled using **Passport Local Strategy**
- Passwords encrypted using **bcrypt**

### ✔ Workflow-Based QA  
Branches:
- **Feature Branch** → Development
- **Prototype Branch** → Staging / Manual QA Testing
- **Main Branch** → Final & Stable Build (deployment-ready)

Manual QA is performed before merging to the main branch.

---

## 🛠 Deployment Plan

Currently:
- Not yet hosted

Ready For:
- Node hosting (Render, Railway, or VPS)
- Integration with CI/CD & Docker in future phases

Main branch will always contain the most stable version for hosting.

---

## 📑 Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Templating | EJS |
| Authentication | Passport.js, bcrypt |
| Validation | Joi |
| File Uploads | Multer |
| Future Ops | Docker, CI/CD |

---

## 📂 Folder Structure (Expected)

```
project/
│── app.js / server.js
│── package.json
│── /views        → EJS templates
│── /routes       → Route controllers
│── /public       → CSS, JS, images
│── /models       → Mongoose schemas
│── /middleware   → auth & validation
│── /uploads      → Multer files
│── /config       → Passport & DB config
```

---

## 📸 UI Highlights

- Contact Page  
- About Page  
- NGO Dashboard  
- Donor Dashboard  
- Volunteer Dashboard  
- Profile Page  
- Admin Dashboard  

*(as shown in the PPT)*

---

## 📌 Future Enhancements

- Add automated tests (Jest + Supertest)
- Deploy with CI/CD + Docker
- Improve dashboard analytics
- Integrate SMS/email notifications

---

## 🧑‍💻 Contributors
Team: **Group Project – AnnaMitra b3**

---

If you want, I can also generate:
✅ `CONTRIBUTING.md`  
✅ `API Documentation.md`  
✅ `Installation & Setup Guide`  
Or a fully formatted **GitHub release description**.

Just tell me!
