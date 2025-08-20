📝 Blogging Website Backend
This is the backend implementation of a Blogging Website, built using Node.js, Express.js, and MongoDB. It handles user authentication, session management, and secure data storage.

🚀 Features
- User Authentication using JWT (JSON Web Tokens)
- Session & Cookie Management for persistent login
- Password Hashing with Bcrypt for secure credential storage
- RESTful API endpoints for user and blog operations
- MongoDB integration for scalable data storage
- 
🛠️ Tech Stack:
 Runtime : Node.js
 Framework : Express.js 
 Database : MongoDB  
 Auth : JWT, Bcrypt 
 Session : Express-session, Cookies

🔐 Authentication Flow
- User Signup/Login → JWT token generated
- Token Stored in cookies/session
- Protected Routes verify token using middleware
- Password Security ensured via Bcrypt hashing





