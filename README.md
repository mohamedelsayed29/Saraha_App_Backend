# Saraha App Backend

A robust and secure backend application for the Saraha anonymous messaging platform. This RESTful API enables users to create accounts, share their profile links, and receive anonymous messages from others while maintaining complete sender anonymity.

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Postman Collection](#postman-collection)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project

Saraha (meaning "honesty" in Arabic) is an anonymous messaging application that allows users to receive candid feedback and messages from friends, colleagues, or anyone with access to their unique profile link. This backend API handles user authentication, message management, and secure data storage while preserving sender anonymity.

## Key Features

- **User Authentication & Authorization**
  - Secure user registration with email verification (OTP)
  - Login with JWT access and refresh tokens
  - Role-based access control (USER/ADMIN)
  - Token refresh mechanism for extended sessions
  - Phone number and gender information

- **Profile Management**
  - Unique user profile links
  - Profile customization options
  - User account management

- **Anonymous Messaging**
  - Send anonymous messages to any user via their profile link
  - Receive and manage incoming messages
  - Message filtering and moderation capabilities

- **Security Features**
  - JWT token-based authentication
  - Google OAuth integration support
  - Password hashing with bcryptjs
  - Data encryption using crypto-js
  - Input validation and sanitization
  - CORS configuration
  - Rate limiting for API endpoints

- **Additional Capabilities**
  - Message favorites/bookmarking
  - Account privacy settings
  - Email notifications

## Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js v5.1.0
- **Database:** MongoDB with Mongoose ODM v9.0.0
- **Authentication:** 
  - JWT (JSON Web Tokens) v9.0.2
  - Google Auth Library v10.5.0
- **Password Encryption:** bcryptjs v3.0.3
- **Data Encryption:** crypto-js v4.2.0
- **Email Service:** Nodemailer v7.0.11
- **Unique ID Generation:** nanoid v5.1.6
- **CORS:** cors v2.8.5
- **joi**   joi v18.0.2


## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **MongoDB** (v4.x or higher) or MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohamedelsayed29/Saraha_App_Backend.git
   cd Saraha_App_Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   BASE_URL=http://localhost:3000

   # Database
   MONGODB_URI=mongodb://localhost:27017/saraha_db
   # Or MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/saraha_db

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
   REFRESH_TOKEN_EXPIRE=30d

   # Email Service (Gmail example)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_specific_password

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Security
   BCRYPT_SALT_ROUNDS=10

   # Cloudinary (for file uploads)
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the server**
   
   **Development mode:**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

5. **Verify the server is running**
   ```bash
   curl http://localhost:3000
   ```

---

## 📁 Project Structure

```
Saraha_App_Backend/
│
├── Src/
│   ├── modules/              # Feature modules
│   │   ├── auth/            # Authentication logic
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── user/            # User management
│   │   │   ├── user.controller.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.model.js
│   │   │   └── user.validation.js
│   │   │
│   │   └── message/         # Message handling
│   │       ├── message.controller.js
│   │       ├── message.routes.js
│   │       ├── message.model.js
│   │       └── message.validation.js
│   │
│   ├── middleware/          # Custom middleware
│   │   ├── authentication.js
│   │   ├── authorization.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── fileUpload.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── generateToken.js
│   │   ├── sendEmail.js
│   │   ├── apiResponse.js
│   │   └── constants.js
│   │
│   └── config/              # Configuration
│       ├── database.js
│       └── cloudinary.js
│
├── .env                     # Environment variables (not committed)
├── .gitignore
├── index.js                 # Application entry point
├── package.json
└── README.md
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### 📝 Register User

```http
POST /api/auth/signup
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "SecureP@ss123",
  "phone": "01234567890",
  "gender": "male",
  "role": "USER"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully. Please verify your email.",
  "data": {
    "user_id": "507f1f77bcf86cd799439011"
  }
}
```

---

#### ✅ Confirm Email

```http
PATCH /api/auth/confirm-email
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

#### 🔑 Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecureP@ss123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "role": "USER"
    }
  }
}
```

---

#### 🔄 Refresh Token

```http
GET /api/auth/refresh-token
Authorization: User {refresh_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### User Endpoints

#### 👤 Get User Profile

```http
GET /api/users/get-user-profile
Authorization: Admin {access_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "01234567890",
    "gender": "male",
    "role": "USER",
    "is_email_confirmed": true,
    "created_at": "2025-01-15T10:30:00.000Z"
  }
}
```

---

### Message Endpoints

#### 💌 Send Anonymous Message

```http
POST /api/messages/:receiver_id/sender
Authorization: User {access_token}
Content-Type: multipart/form-data

{
  "content": "Your honest feedback message here",
  "attachments": [file1, file2]  // Optional (max 3 files)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "message_id": "507f191e810c19729de860ea"
  }
}
```

---

#### 📬 Get Received Messages

```http
GET /api/messages/:userId/get-messages
Authorization: User {access_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "507f191e810c19729de860ea",
        "content": "Great job on the project!",
        "attachments": [],
        "created_at": "2025-02-10T14:20:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 20
  }
}
```

---

### Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

---

## 📮 Postman Collection

Test all endpoints easily with our Postman collection:

**[📥 Download Postman Collection](https://mohamedelsayed-7560914.postman.co/workspace/1b7a1fd1-ca1a-447a-89f2-3a7a335f60cd/collection/45782247-0ec609d7-afc2-4f6b-ad49-641e1c679a5e?action=share&source=collection_link&creator=45782247)**

### Collection Includes:

- ✅ All authentication flows
- ✅ User management endpoints
- ✅ Message operations
- ✅ Pre-configured environment variables
- ✅ Example requests and responses

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v14+ | Runtime environment |
| **Express.js** | v5.1.0 | Web framework |
| **MongoDB** | v4+ | Database |
| **Mongoose** | v9.0.0 | ODM for MongoDB |
| **JWT** | v9.0.2 | Authentication |
| **bcryptjs** | v3.0.3 | Password hashing |
| **crypto-js** | v4.2.0 | Data encryption |
| **Joi** | v18.0.2 | Input validation |
| **Nodemailer** | v7.0.11 | Email service |
| **Cloudinary** | - | File storage |
| **nanoid** | v5.1.6 | Unique ID generation |

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 🔒 Security Best Practices

This project implements:

- ✅ **JWT token authentication** with short-lived access tokens
- ✅ **Password hashing** using bcryptjs (10 rounds)
- ✅ **Input validation** with Joi schemas
- ✅ **SQL injection prevention** via Mongoose
- ✅ **XSS protection** through input sanitization
- ✅ **CORS configuration** for controlled access
- ✅ **Rate limiting** on sensitive endpoints
- ✅ **Environment variables** for secrets
- ✅ **HTTPS enforcement** in production
- ✅ **Email verification** for account activation

---

## 🚀 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create saraha-app-backend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### Deploy to Railway

1. Connect your GitHub repository
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Deploy to Render

1. Connect repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

---

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Mohamed Elsayed**

- GitHub: [@mohamedelsayed29](https://github.com/mohamedelsayed29)
- LinkedIn: [Connect with me](https://linkedin.com/in/mohamedelsayed29)
- Email: mohamedelsayed@example.com

---

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Postman](https://www.postman.com/)
- All contributors who helped improve this project

---

## 📊 Project Status

🟢 **Active Development** - This project is actively maintained and accepting contributions.

---

## 🐛 Known Issues

- [ ] Add WebSocket support for real-time notifications
- [ ] Implement message read receipts
- [ ] Add multi-language support

See the [open issues](https://github.com/mohamedelsayed29/Saraha_App_Backend/issues) for a full list of proposed features and known issues.

---

## 📞 Support

If you have any questions or need help, feel free to:

- Open an [issue](https://github.com/mohamedelsayed29/Saraha_App_Backend/issues)
- Contact via email
- Join our community discussions

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Mohamed Elsayed](https://github.com/mohamedelsayed29)

</div>
