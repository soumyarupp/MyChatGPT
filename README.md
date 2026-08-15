# 🤖 MyChatGPT

A backend API for a ChatGPT-style application built with **Node.js, Express.js, MongoDB, JWT, and OpenRouter**.

The project provides user authentication, chat management, message handling, protected routes, and AI integration through OpenRouter.

## ✨ Features

* 🔐 User Signup & Login
* 🔑 JWT-based Authentication
* 🍪 HTTP Cookie-based Token Storage
* 🔒 Password Hashing with bcrypt
* ✅ Request Validation with Zod
* 👤 User Profile Management
* 💬 Create and Manage Chats
* 📨 Send and Retrieve Messages
* 🗑️ Delete Chats
* ❌ Delete User Account
* 🤖 AI Integration using OpenRouter
* 🗄️ MongoDB Database with Mongoose
* 🛡️ Protected API Routes
* ⚙️ Environment Variable Support with dotenv

## 🛠️ Tech Stack

| Technology    | Purpose               |
| ------------- | --------------------- |
| Node.js       | Backend runtime       |
| Express.js    | REST API framework    |
| MongoDB       | Database              |
| Mongoose      | MongoDB ODM           |
| OpenRouter    | AI model integration  |
| JWT           | Authentication        |
| bcrypt        | Password hashing      |
| Zod           | Input validation      |
| Cookie Parser | Cookie handling       |
| dotenv        | Environment variables |

## 📁 Project Structure

```text
MyChatGPT/
│
├── aiTester/
│
├── config/
│   └── mdDatabase.js
│
├── controllers/
│   ├── chatController.js
│   ├── messageController.js
│   ├── userController.js
│   └── userProfile.js
│
├── middlewares/
│   └── authUser.js
│
├── model/
│   ├── chatSchema.js
│   ├── messageSchema.js
│   └── userSchema.js
│
├── routes/
│   ├── chatRouter.js
│   ├── messageRouter.js
│   └── userRouter.js
│
├── service/
│
├── utils/
│
├── validators/
│   └── userValidators.js
│
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/soumyarupp/MyChatGPT.git
```

### 2. Navigate to the Project

```bash
cd MyChatGPT
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key
```

> ⚠️ Never upload your `.env` file or API keys to GitHub.

### 5. Start the Server

```bash
node index.js
```

For development, you can also use:

```bash
node --watch index.js
```

The server will start on the port specified in your `.env` file.

## 🔌 API Endpoints

### 👤 User APIs

Base URL:

```text
/user
```

| Method | Endpoint            | Description                | Authentication |
| ------ | ------------------- | -------------------------- | -------------- |
| POST   | `/user/signup`      | Create a new account       | ❌              |
| GET    | `/user/login`       | Login user                 | ❌              |
| GET    | `/user/logout`      | Logout user                | ❌              |
| GET    | `/user/profile`     | Get logged-in user profile | ✅              |
| GET    | `/user/userprofile` | Get user profile           | ❌              |
| DELETE | `/user/delete`      | Delete user account        | ✅              |

The authentication routes use validation, bcrypt password comparison/hashing, JWT generation, and cookies.

### 💬 Chat APIs

Base URL:

```text
/chat
```

All chat routes are protected by authentication middleware.

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/chat/getrecentchat` | Get recent chats  |
| POST   | `/chat/createchat`    | Create a new chat |
| GET    | `/chat/:chatId`       | Get a single chat |
| DELETE | `/chat/:chatId`       | Delete a chat     |

### 📨 Message APIs

Base URL:

```text
/msg
```

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| POST   | `/msg/`        | Send a message                  |
| GET    | `/msg/:chatId` | Get messages of a chat          |
| POST   | `/msg/:chatId` | Send message to a specific chat |

Message routes are protected by authentication middleware.

## 🔐 Authentication Flow

```text
User
 │
 ├── Signup
 │     ↓
 │   Validate input
 │     ↓
 │   Hash password with bcrypt
 │     ↓
 │   Save user in MongoDB
 │     ↓
 │   Generate JWT
 │     ↓
 │   Store JWT in Cookie
 │
 └── Login
       ↓
     Validate input
       ↓
     Find user
       ↓
     Compare password
       ↓
     Generate JWT
       ↓
     Store JWT in Cookie
```

Protected routes use the authentication middleware to verify the JWT before allowing access.

## 🤖 AI Architecture

The application is designed around an AI chat flow:

```text
Client
  │
  ▼
Express API
  │
  ├── Authentication
  │
  ├── Chat Controller
  │
  └── Message Controller
          │
          ▼
      OpenRouter
          │
          ▼
       AI Model
          │
          ▼
      AI Response
          │
          ▼
       MongoDB
```

The project includes the `@openrouter/sdk` dependency for OpenRouter integration.

## 🗄️ Database

MongoDB is used to store application data.

The project uses Mongoose for database interaction and separates models for:

* 👤 Users
* 💬 Chats
* 📨 Messages

Typical relationship:

```text
User
 │
 └── Chat
      │
      └── Messages
```

## 🛡️ Security

The project implements several security-related practices:

* Passwords are hashed using `bcrypt`
* JWT is used for authentication
* Authentication tokens are stored in HTTP cookies
* Protected routes use authentication middleware
* User input is validated using Zod
* Sensitive configuration is stored using environment variables

## 📦 Dependencies

Main dependencies include:

```text
@openrouter/sdk
bcrypt
cookie-parser
dotenv
express
jsonwebtoken
mongoose
zod
```

## 🧪 Testing

The current project does not yet include an automated test suite.

You can test the API using tools such as:

* Postman
* Thunder Client
* Insomnia
* REST Client

## 🔮 Future Improvements

Possible improvements for the project:

* [ ] Add streaming AI responses
* [ ] Add conversation history
* [ ] Add message pagination
* [ ] Add rate limiting
* [ ] Add refresh tokens
* [ ] Improve cookie security for production
* [ ] Add automated tests
* [ ] Add API documentation with Swagger
* [ ] Add frontend interface
* [ ] Add multiple AI model selection
* [ ] Add chat search
* [ ] Add message editing and regeneration
* [ ] Deploy backend to a cloud platform

## 👨‍💻 Author

**Soumyarup Samanta**

GitHub: [soumyarupp](https://github.com/soumyarupp)

## 📄 License

This project is currently licensed under the **ISC License** as specified in `package.json`.

---

⭐ If you found this project useful, consider giving it a star!

**Built with ❤️ using Node.js, Express.js, MongoDB & AI**
