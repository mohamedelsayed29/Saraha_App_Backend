<div align="center">

# 💬 Saraha App Backend

[![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A robust, scalable backend API for anonymous messaging with enterprise-grade security**

[Features](#-features) • [Quick Start](#-quick-start) • [API Docs](#-api-documentation) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## 📖 About

Saraha (صراحة - meaning "honesty" in Arabic) is a modern anonymous messaging platform that enables users to receive candid, honest feedback from friends, colleagues, or anyone with access to their unique profile link. Built with scalability and security in mind, this backend API provides a solid foundation for anonymous communication.

### 🎯 Why Saraha?

- **🔒 Privacy First**: Complete anonymity for message senders
- **⚡ Fast & Scalable**: Optimized for high performance
- **🛡️ Enterprise Security**: JWT authentication, encryption, rate limiting
- **📱 Modern Stack**: Built with latest Node.js and Express.js
- **🔌 Easy Integration**: RESTful API with comprehensive documentation

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ Secure user registration with email verification (OTP)
- ✅ JWT-based authentication with access & refresh tokens
- ✅ Google OAuth integration support
- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ Data encryption using crypto-js
- ✅ Role-based access control (USER/ADMIN)
- ✅ Rate limiting on sensitive endpoints
- ✅ CORS protection

### 💬 Messaging
- ✅ Send completely anonymous messages
- ✅ Unique shareable profile links
- ✅ Message attachments support (up to 3 files)
- ✅ Message filtering and moderation
- ✅ Favorites/bookmarking system

### 👤 User Management
- ✅ Profile customization
- ✅ Privacy settings
- ✅ Account management
- ✅ Email notifications
- ✅ Phone and gender information

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher) - [Download](https://nodejs.org/)
- **npm** (v6.x or higher)
- **MongoDB** (v4.x or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

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

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   BASE_URL=http://localhost:3000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/saraha_db
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/saraha_db
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
   JWT_EXPIRE=7d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here_min_32_chars
   REFRESH_TOKEN_EXPIRE=30d
   
   # Email Service (Gmail example)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_specific_password
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Security
   BCRYPT_SALT_ROUNDS=10
   
   # Cloudinary (for file uploads)
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   
   # Rate Limiting
   RATE_LIMIT_WINDOW=900000
   RATE_LIMIT_MAX=100
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Verify the server**
   ```bash
   curl http://localhost:3000
   # or visit http://localhost:3000 in your browser
   ```

You should see: `✅ Server is running successfully!`

---

## 📁 Project Structure

```
Saraha_App_Backend/
│
├── Src/
│   ├── modules/                 # Feature modules
│   │   ├── auth/               # Authentication & authorization
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── user/               # User management
│   │   │   ├── user.controller.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.model.js
│   │   │   └── user.validation.js
│   │   │
│   │   └── message/            # Anonymous messaging
│   │       ├── message.controller.js
│   │       ├── message.routes.js
│   │       ├── message.model.js
│   │       └── message.validation.js
│   │
│   ├── middleware/             # Custom middleware
│   │   ├── authentication.js   # JWT verification
│   │   ├── authorization.js    # Role-based access
│   │   ├── validation.js       # Input validation
│   │   ├── errorHandler.js     # Global error handler
│   │   ├── rateLimiter.js      # API rate limiting
│   │   └── fileUpload.js       # File upload handling
│   │
│   ├── utils/                  # Utility functions
│   │   ├── generateToken.js    # JWT token generation
│   │   ├── sendEmail.js        # Email service
│   │   ├── apiResponse.js      # Standardized responses
│   │   ├── constants.js        # App constants
│   │   └── encryption.js       # Data encryption helpers
│   │
│   └── config/                 # Configuration files
│       ├── database.js         # MongoDB connection
│       ├── cloudinary.js       # Cloudinary setup
│       └── cors.js             # CORS configuration
│
├── .env                        # Environment variables (gitignored)
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── index.js                    # Application entry point
├── package.json                # Dependencies & scripts
├── package-lock.json           # Locked dependencies
└── README.md                   # You are here!
```

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

### 🔐 Authentication Endpoints

<details>
<summary><b>POST</b> <code>/auth/signup</code> - Register new user</summary>

**Request:**
```json
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

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully. Please verify your email.",
  "data": {
    "user_id": "507f1f77bcf86cd799439011"
  }
}
```
</details>

<details>
<summary><b>PATCH</b> <code>/auth/confirm-email</code> - Verify email with OTP</summary>

**Request:**
```json
{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```
</details>

<details>
<summary><b>POST</b> <code>/auth/login</code> - User login</summary>

**Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecureP@ss123"
}
```

**Response (200):**
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
</details>

<details>
<summary><b>GET</b> <code>/auth/refresh-token</code> - Refresh access token</summary>

**Headers:**
```
Authorization: User {refresh_token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
</details>

### 👤 User Endpoints

<details>
<summary><b>GET</b> <code>/users/get-user-profile</code> - Get user profile</summary>

**Headers:**
```
Authorization: Admin {access_token}
```

**Response (200):**
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
    "profile_link": "https://saraha.app/u/john-doe-abc123",
    "created_at": "2025-01-15T10:30:00.000Z"
  }
}
```
</details>

### 💌 Message Endpoints

<details>
<summary><b>POST</b> <code>/messages/:receiver_id/sender</code> - Send anonymous message</summary>

**Headers:**
```
Authorization: User {access_token}
Content-Type: multipart/form-data
```

**Request:**
```json
{
  "content": "Your honest feedback message here",
  "attachments": [/* files - max 3 */]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "message_id": "507f191e810c19729de860ea",
    "sent_at": "2025-02-14T14:20:00.000Z"
  }
}
```
</details>

<details>
<summary><b>GET</b> <code>/messages/:userId/get-messages</code> - Get received messages</summary>

**Headers:**
```
Authorization: User {access_token}
```

**Query Parameters:**
```
?page=1&limit=20&sort=-created_at
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "507f191e810c19729de860ea",
        "content": "Great job on the project!",
        "attachments": [
          {
            "url": "https://cloudinary.com/...",
            "type": "image/png"
          }
        ],
        "is_favorite": false,
        "created_at": "2025-02-10T14:20:00.000Z"
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "pages": 3,
      "limit": 20
    }
  }
}
```
</details>

### ⚠️ Error Responses

All error responses follow this standardized format:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

### 📊 HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200  | OK | Request successful |
| 201  | Created | Resource created successfully |
| 400  | Bad Request | Invalid input data |
| 401  | Unauthorized | Authentication required |
| 403  | Forbidden | Insufficient permissions |
| 404  | Not Found | Resource not found |
| 409  | Conflict | Resource already exists |
| 429  | Too Many Requests | Rate limit exceeded |
| 500  | Internal Server Error | Server error |

---

## 🧪 Testing with Postman

We've prepared a comprehensive Postman collection with all API endpoints pre-configured.

### 📥 Import Collection

**[Download Postman Collection](https://mohamedelsayed-7560914.postman.co/workspace/1b7a1fd1-ca1a-447a-89f2-3a7a335f60cd/collection/45782247-0ec609d7-afc2-4f6b-ad49-641e1c679a5e?action=share&source=collection_link&creator=45782247)**

### What's Included?

- ✅ All authentication flows (signup, login, refresh)
- ✅ User management endpoints
- ✅ Message operations (send, receive, manage)
- ✅ Pre-configured environment variables
- ✅ Example requests with sample data
- ✅ Expected responses for each endpoint
- ✅ Error handling scenarios

### Quick Setup

1. Import the collection into Postman
2. Create a new environment with variables:
   - `base_url`: `http://localhost:3000/api`
   - `access_token`: (auto-populated after login)
   - `refresh_token`: (auto-populated after login)
3. Run requests in sequence: Signup → Confirm Email → Login → Use API

---

## 🛠️ Technology Stack

<table>
<tr>
<td>

### Core
- **Runtime**: Node.js v14+
- **Framework**: Express.js v5.1.0
- **Language**: JavaScript (ES6+)

</td>
<td>

### Database
- **Database**: MongoDB v4+
- **ODM**: Mongoose v9.0.0
- **Schema Validation**: Built-in

</td>
</tr>
<tr>
<td>

### Authentication
- **JWT**: jsonwebtoken v9.0.2
- **OAuth**: Google Auth Library v10.5.0
- **Hashing**: bcryptjs v3.0.3
- **Encryption**: crypto-js v4.2.0

</td>
<td>

### Utilities
- **Email**: Nodemailer v7.0.11
- **Validation**: Joi v18.0.2
- **File Upload**: Cloudinary
- **ID Generation**: nanoid v5.1.6

</td>
</tr>
<tr>
<td>

### Security
- **CORS**: cors v2.8.5
- **Helmet**: helmet v8.0.0
- **Rate Limiting**: express-rate-limit v7.5.0

</td>
<td>

### Development
- **Process Manager**: PM2
- **Linting**: ESLint
- **Testing**: Jest (coming soon)

</td>
</tr>
</table>

---

## 🔒 Security Features

### Implemented Security Measures

| Feature | Implementation | Status |
|---------|---------------|--------|
| Password Hashing | bcryptjs (10 rounds) | ✅ |
| JWT Authentication | Access & Refresh tokens | ✅ |
| Email Verification | OTP-based verification | ✅ |
| Input Validation | Joi schemas | ✅ |
| Data Encryption | crypto-js | ✅ |
| Rate Limiting | express-rate-limit | ✅ |
| CORS Protection | Configurable origins | ✅ |
| SQL Injection Prevention | Mongoose ODM | ✅ |
| XSS Protection | Input sanitization | ✅ |
| HTTPS Enforcement | Production only | ✅ |
| Environment Variables | Sensitive data isolation | ✅ |
| Helmet Security Headers | HTTP headers protection | ✅ |

### Best Practices

```javascript
// ✅ DO: Use environment variables
const secret = process.env.JWT_SECRET;

// ❌ DON'T: Hardcode secrets
const secret = "my-secret-key-123";

// ✅ DO: Validate all inputs
const schema = Joi.object({
  email: Joi.string().email().required()
});

// ✅ DO: Hash passwords
const hashedPassword = await bcrypt.hash(password, 10);

// ✅ DO: Use rate limiting
app.use('/api/auth', limiter);
```

---

## 🚀 Deployment

### Deploy to Render (Recommended)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Choose "Node" environment
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set environment variables** in Render dashboard

4. **Deploy** - Your API will be live in minutes!

### Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set MONGODB_URI=your_mongodb_uri
railway variables set JWT_SECRET=your_jwt_secret

# Deploy
railway up
```

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create saraha-backend-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Open app
heroku open
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build image
docker build -t saraha-backend .

# Run container
docker run -p 3000:3000 --env-file .env saraha-backend
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- auth.test.js
```

### Test Structure

```javascript
describe('Auth API', () => {
  describe('POST /auth/signup', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          password: 'SecureP@ss123'
        });
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });
  });
});
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### 1. Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/Saraha_App_Backend.git
cd Saraha_App_Backend
```

### 2. Create a Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Changes

- Write clean, readable code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Commit Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add user profile picture upload"
git commit -m "fix: resolve token expiration issue"
git commit -m "docs: update API documentation"
```

**Commit Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting (no functional changes)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### 5. Push & Create PR

```bash
git push origin feature/amazing-feature
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Screenshots (if UI changes)
- Link to related issues

### Code Style Guidelines

```javascript
// ✅ DO: Use descriptive variable names
const userEmail = req.body.email;

// ❌ DON'T: Use single letters
const e = req.body.email;

// ✅ DO: Use async/await
const user = await User.findById(id);

// ❌ DON'T: Use nested callbacks
User.findById(id, (err, user) => { ... });

// ✅ DO: Handle errors properly
try {
  await sendEmail(user.email);
} catch (error) {
  logger.error('Email failed:', error);
}
```

---

## 🐛 Known Issues & Roadmap

### Known Issues

- [ ] WebSocket support for real-time notifications
- [ ] Message read receipts functionality
- [ ] Multi-language support (i18n)

See [open issues](https://github.com/mohamedelsayed29/Saraha_App_Backend/issues) for more.

### Roadmap

#### Q1 2026
- [ ] Real-time notifications via Socket.io
- [ ] Message search functionality
- [ ] Advanced message filtering

#### Q2 2026
- [ ] GraphQL API support
- [ ] Message analytics dashboard
- [ ] Two-factor authentication (2FA)

#### Q3 2026
- [ ] Multi-language support
- [ ] Message reactions/emoji
- [ ] User blocking system

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Mohamed Elsayed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Author

<div align="center">

### Mohamed Elsayed

**Full Stack Developer | Node.js Specialist**

[![GitHub](https://img.shields.io/badge/GitHub-mohamedelsayed29-181717?style=for-the-badge&logo=github)](https://github.com/mohamedelsayed29)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/mohamedelsayed29)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mohamedelsayed@example.com)

</div>

---

## 🙏 Acknowledgments

Special thanks to:

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [MongoDB](https://www.mongodb.com/) - Flexible NoSQL database
- [JWT.io](https://jwt.io/) - Industry-standard authentication
- [Cloudinary](https://cloudinary.com/) - Media management solution
- [Postman](https://www.postman.com/) - API development platform
- All contributors who helped improve this project 🚀

---

## 📞 Support

Need help? We're here for you:

- 📧 **Email**: [mohamedelsayed@example.com](mailto:mohamedelsayed@example.com)
- 💬 **Issues**: [GitHub Issues](https://github.com/mohamedelsayed29/Saraha_App_Backend/issues)
- 📖 **Docs**: [API Documentation](#-api-documentation)
- 💼 **LinkedIn**: [Connect with me](https://linkedin.com/in/mohamedelsayed29)

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/mohamedelsayed29/Saraha_App_Backend?style=social)
![GitHub forks](https://img.shields.io/github/forks/mohamedelsayed29/Saraha_App_Backend?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/mohamedelsayed29/Saraha_App_Backend?style=social)

**⭐ Star this repository if you find it helpful!**

</div>

---

<div align="center">

### 🚀 Built with ❤️ by [Mohamed Elsayed](https://github.com/mohamedelsayed29)

**Made in Egypt 🇪🇬**

</div>
