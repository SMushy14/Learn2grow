# Learn2Grow API Documentation

Base URL: `http://localhost:5000/api`

---

## Authentication

### 1. Register a User
* **URL:** `/auth/register`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "student@learn2grow.rw",
    "password": "securepassword123",
    "role": "student" // roles: 'student', 'teacher', 'admin'
  }