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

---

## Courses

### 1. Get All Approved Courses (Public)
* **URL:** `/courses`
* **Method:** `GET`
* **Query Parameters (Optional for filtering):**
  * `?subject=Math`
  * `?language=English`
* **Headers:** None required
* **Success Response (200 OK):** Returns an array of approved course objects.
  ```json
  [
    {
      "_id": "64b9f2...a1",
      "title": "Introduction to Algebra",
      "description": "Learn the basics of equations.",
      "teacherId": {
        "_id": "64b9f1...b2",
        "name": "John Doe",
        "email": "teacher@learn2grow.rw"
      },
      "status": "approved",
      "subject": "Math",
      "language": "English",
      "contentUrls": ["[https://example.com/algebra.pdf](https://example.com/algebra.pdf)"]
    }
  ]