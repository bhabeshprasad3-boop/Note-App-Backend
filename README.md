# 📝 Notes App - Backend


Website Link : https://note-app-frontend-sage.vercel.app

This is the server-side implementation of the Notes Application, built using Node.js, Express, and MongoDB.

## 🚀 Features
- **Secure Authentication:** Implements JWT-based authentication using HTTP-only cookies.
- **CRUD Functionality:** Full support for Creating, Reading, Updating, and Deleting notes.
- **CORS Configured:** Securely connected to the production frontend domain.
- **Environment Management:** Uses `dotenv` for managing sensitive credentials.

## 🛠️ Tech Stack
- **Node.js** (Runtime Environment)
- **Express.js** (Web Framework)
- **MongoDB & Mongoose** (Database & ODM)
- **JSON Web Tokens (JWT)** (Secure Auth)
- **Cookie-Parser** (Middleware for handling cookies)

## 🔑 Environment Variables
To run this project, you will need to add the following variables to your environment:
- `MONGO_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: A secure random string for signing tokens.
- `PORT`: Default is 3000.

## 📡 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive authentication cookie |
| GET | `/api/show-notes` | Fetch all notes for the logged-in user |
| POST | `/api/upload-note` | Create a new note |
| DELETE| `/api/delete-note/:id`| Remove a specific note |
| PUT | `/api/update-note/:id`| Edit an existing note |
