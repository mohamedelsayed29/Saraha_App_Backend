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
- **morgan** morgan v1.10.1


## Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher) - Local installation or MongoDB Atlas account

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
   
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) section below)

4. **Verify MongoDB connection**
   
   Ensure MongoDB is running locally or your MongoDB Atlas connection string is correct

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/saraha_db
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/saraha_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (for email verification)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Application Configuration
BASE_URL=http://localhost:3000

# Security
BCRYPT_SALT_ROUNDS=10
```

> **Note:** Never commit your `.env` file to version control. Make sure it's listed in `.gitignore`.

### Running the Application

#### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your configured PORT) with hot-reloading enabled.

#### Production Mode

```bash
npm start
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### API Routes
All API endpoints are prefixed with `/api`

### Authentication Endpoints

#### Register New User (Sign Up)
```http
POST /api/auth/signup
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "P@ssw0rd123!",
  "phone": "01234567890",
  "gender": "male",
  "role": "USER"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully. Please check your email to verify your account.",
  "data": {
    "user_id": "user_id_here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "P@ssw0rd123!"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_access_token_here",
  "refresh_token": "jwt_refresh_token_here",
  "user": {
    "id": "user_id",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### Confirm Email (OTP Verification)
```http
PATCH /api/auth/confirm-email
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email confirmed successfully"
}
```

#### Refresh Access Token
```http
GET /api/auth/refresh-token
Authorization: User {refresh_token}
```

**Response:**
```json
{
  "success": true,
  "access_token": "new_jwt_access_token_here"
}
```

### User Profile Endpoints

#### Get User Profile
```http
GET /api/users/get-user-profile
Authorization: Admin {access_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "01234567890",
    "gender": "male",
    "role": "USER",
    "is_email_confirmed": true
  }
}
```

### Message Endpoints

#### Send Anonymous Message
```http
POST /api/messages/send/:userId
Content-Type: application/json

{
  "content": "Your anonymous message here"
}
```

#### Get Received Messages
```http
GET /api/messages/received
Authorization: User {access_token}
```

#### Delete Message
```http
DELETE /api/messages/:messageId
Authorization: User {access_token}
```

### Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

### Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Project Structure

```
Saraha_App_Backend/
│
├── Src/                          # Source code directory
│   ├── modules/                  # Feature-based modules
│   │   ├── auth/                 # Authentication module
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── user/                 # User module
│   │   │   ├── user.controller.js
│   │   │   ├── user.routes.js
│   │   │   └── user.model.js
│   │   │
│   │   └── message/              # Message module
│   │       ├── message.controller.js
│   │       ├── message.routes.js
│   │       └── message.model.js
│   │
│   ├── middleware/               # Custom middleware
│   │   ├── auth.middleware.js    # JWT authentication
│   │   ├── error.middleware.js   # Error handling
│   │   └── validation.middleware.js
│   │
│   ├── config/                   # Configuration files
│   │   ├── database.js           # Database connection
│   │   └── email.js              # Email configuration
│   │
│   └── utils/                    # Utility functions
│       ├── generateToken.js
│       ├── sendEmail.js
│       └── helpers.js
│
├── node_modules/                 # Dependencies
│
├── index.js                      # Application entry point
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Locked versions of dependencies
├── .env                          # Environment variables (not in repo)
├── .gitignore                    # Git ignore file
├── note.md                       # Development notes
└── README.md                     # Project documentation
```

### Key Directories

- **`Src/modules/`** - Contains feature-specific code organized by domain (auth, user, message)
- **`Src/middleware/`** - Express middleware for authentication, validation, and error handling
- **`Src/config/`** - Configuration files for database, email, and other services
- **`Src/utils/`** - Reusable utility functions and helpers

## Postman Collection

For easier API testing and integration, we provide a comprehensive Postman collection with all available endpoints, request examples, and environment variables.

**[Download Postman Collection](https://mohamedelsayed-7560914.postman.co/workspace/1b7a1fd1-ca1a-447a-89f2-3a7a335f60cd/collection/45782247-0ec609d7-afc2-4f6b-ad49-641e1c679a5e?action=share&source=collection_link&creator=45782247)**

### Collection Structure

The Postman collection includes the following groups:

1. **Auth** - Authentication endpoints
   - Create Account (Sign Up)
   - Login
   - Confirm Email (OTP Verification)
   - Refresh Token

2. **User** - User profile management
   - Get User Profile

3. **Message** - Anonymous messaging (coming soon)

### Using the Collection

1. Import the collection into Postman using the link above
2. Set up environment variables:
   - `base_url`: Your API base URL (e.g., `http://localhost:3000`)
3. Start with the authentication endpoints to create an account
4. Use the returned access token for protected endpoints
5. Set the Authorization header format: `User {access_token}` or `Admin {access_token}` depending on the role

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing code style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Mohamed Elsayed**

- GitHub: [@mohamedelsayed29](https://github.com/mohamedelsayed29)
- Project Link: [https://github.com/mohamedelsayed29/Saraha_App_Backend](https://github.com/mohamedelsayed29/Saraha_App_Backend)

---

## Acknowledgments

- Node.js and Express.js communities
- MongoDB team for excellent documentation
- All contributors who help improve this project

---