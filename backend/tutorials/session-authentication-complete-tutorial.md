# Complete Guide to Session & Authentication Methods in Express.js with Mongoose

## Table of Contents
1. [Introduction to Authentication](#introduction-to-authentication)
2. [Project Setup with ES Modules](#project-setup-with-es-modules)
3. [User Model Setup](#user-model-setup)
4. [Method 1: JSON Web Tokens (JWT) - Stateless](#method-1-json-web-tokens-jwt---stateless)
5. [Method 2: Opaque Tokens / Session IDs - Stateful](#method-2-opaque-tokens--session-ids---stateful)
6. [Method 3: Hybrid Approach (Access + Refresh Tokens)](#method-3-hybrid-approach-access--refresh-tokens)
7. [Method 4: Session-Based Authentication with express-session](#method-4-session-based-authentication-with-express-session)
8. [Method 5: Passport.js Integration](#method-5-passportjs-integration)
9. [Security Best Practices](#security-best-practices)
10. [Comparison Table](#comparison-table)

---

## Introduction to Authentication

Authentication is the process of verifying who a user is. In web applications, once a user logs in, we need a way to "remember" them for subsequent requests. There are several approaches to handle this:

### Understanding the Core Concepts

**Stateless Authentication**: The server doesn't remember anything. All necessary information is stored in the token itself. The server only needs to verify the token's signature.

**Stateful Authentication**: The server keeps a record of active sessions. Each time a user makes a request, the server looks up the session in its database or cache.

Let's explore each method in detail with practical, simple examples.

---

## Project Setup with ES Modules

### Step 1: Initialize the Project

```bash
mkdir auth-demo
cd auth-demo
npm init -y
```

### Step 2: Configure package.json for ES Modules

Open `package.json` and add `"type": "module"`:

```json
{
  "name": "auth-demo",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "express-session": "^1.17.3",
    "connect-mongo": "^5.1.0",
    "uuid": "^9.0.0",
    "dotenv": "^16.3.1"
  }
}
```

### Step 3: Install Dependencies

```bash
npm install express mongoose jsonwebtoken bcryptjs cookie-parser express-session connect-mongo uuid dotenv
```

### Step 4: Create Environment File

Create `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth-demo
JWT_SECRET=my-super-secret-jwt-key-change-in-production
SESSION_SECRET=my-session-secret-change-in-production
```

### Step 5: Basic Server Setup

Create `server.js`:

```javascript
// server.js - Basic Server Setup
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);
console.log('✅ Connected to MongoDB');

// Routes will be added here

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## User Model Setup

Before implementing authentication, we need a User model. This will be used across all authentication methods.

### Create the User Model

Create `models/User.js`:

```javascript
// models/User.js - User Schema for Authentication
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  // Used for refresh tokens (we'll see this later)
  refreshTokens: [{
    token: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  // Hash with cost factor of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
```

### Explanation of the User Model

**Schema Fields**:
- `email`: Unique identifier for the user, stored in lowercase
- `password`: Will be automatically hashed before saving
- `name`: Display name of the user
- `refreshTokens`: Array to store refresh tokens (for hybrid approach)

**Pre-save Hook**: This middleware runs before saving a user. It automatically hashes the password using bcrypt.

**comparePassword Method**: This instance method compares a plain text password with the hashed password in the database.

---

## Method 1: JSON Web Tokens (JWT) - Stateless

### What is JWT?

JWT (JSON Web Token) is a compact, URL-safe way to transmit information between parties. The token itself contains all the necessary data - the server doesn't need to look up anything in a database.

### JWT Structure

A JWT looks like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

It has three parts separated by dots:
1. **Header** (red): Algorithm and token type
2. **Payload** (purple): User data (claims)
3. **Signature** (blue): Verification signature

### How JWT Works

```
┌─────────┐                    ┌─────────┐
│  Client │                    │ Server  │
└────┬────┘                    └────┬────┘
     │                              │
     │  1. Login (email, password)  │
     │ ─────────────────────────────>
     │                              │
     │  2. Verify credentials       │
     │  3. Create JWT with user ID  │
     │                              │
     │  4. Return JWT token         │
     │ <─────────────────────────────
     │                              │
     │  5. Store token              │
     │                              │
     │  6. Request with JWT         │
     │ ─────────────────────────────>
     │                              │
     │  7. Verify JWT signature     │
     │  8. Extract user ID          │
     │  9. Return data              │
     │ <─────────────────────────────
```

### Implementation

Create `controllers/jwtAuthController.js`:

```javascript
// controllers/jwtAuthController.js - JWT Stateless Authentication
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId: userId },           // Payload: data we want to store
    process.env.JWT_SECRET,       // Secret key to sign the token
    { expiresIn: '7d' }           // Token expires in 7 days
  );
};

// ============================================
// REGISTER - Create a new user
// ============================================
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Step 1: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Step 2: Create new user (password will be hashed automatically)
    const user = await User.create({
      email,
      password,
      name
    });
    
    // Step 3: Generate JWT token
    const token = generateToken(user._id);
    
    // Step 4: Return success with token
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        token: token
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// ============================================
// LOGIN - Authenticate existing user
// ============================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Step 1: Check if email and password provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    // Step 2: Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Step 3: Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Step 4: Generate token
    const token = generateToken(user._id);
    
    // Step 5: Return success with token
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        token: token
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// ============================================
// GET PROFILE - Get current user info
// ============================================
export const getProfile = async (req, res) => {
  try {
    // req.user is set by the middleware
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};
```

### JWT Middleware for Route Protection

Create `middleware/jwtAuth.js`:

```javascript
// middleware/jwtAuth.js - JWT Verification Middleware
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Step 1: Get token from header
    // Headers format: Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Step 2: Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided'
      });
    }
    
    // Step 3: Verify the token
    // This checks: 1) Valid signature, 2) Not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Step 4: Find user from token payload
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - User not found'
      });
    }
    
    // Step 5: Attach user to request object
    req.user = user;
    
    // Step 6: Continue to next middleware/route
    next();
    
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};
```

### JWT Routes

Create `routes/jwtAuthRoutes.js`:

```javascript
// routes/jwtAuthRoutes.js - JWT Authentication Routes
import express from 'express';
import { register, login, getProfile } from '../controllers/jwtAuthController.js';
import { protect } from '../middleware/jwtAuth.js';

const router = express.Router();

// Public routes (no authentication needed)
router.post('/register', register);
router.post('/login', login);

// Protected routes (authentication required)
router.get('/profile', protect, getProfile);

export default router;
```

### Add Routes to Server

Add to `server.js`:

```javascript
// Add after middleware setup
import jwtAuthRoutes from './routes/jwtAuthRoutes.js';
app.use('/api/jwt', jwtAuthRoutes);
```

### Testing JWT Authentication

**1. Register a new user:**
```bash
POST http://localhost:3000/api/jwt/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "email": "john@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**2. Login:**
```bash
POST http://localhost:3000/api/jwt/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**3. Access protected route:**
```bash
GET http://localhost:3000/api/jwt/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### JWT Pros and Cons

**Pros:**
- ✅ Stateless - No database lookup needed for each request
- ✅ Scalable - Works great with microservices
- ✅ Cross-platform - Works with mobile apps easily
- ✅ Self-contained - Token has all necessary information

**Cons:**
- ❌ Hard to revoke - Token is valid until expiration
- ❌ Token size - Contains data, so larger than session ID
- ❌ No server control - Can't forcefully logout user

---

## Method 2: Opaque Tokens / Session IDs - Stateful

### What are Opaque Tokens?

Opaque tokens are random strings that have no meaning on their own. They're just keys that point to session data stored on the server. Think of it like a coat check ticket - the ticket itself means nothing, but it lets you retrieve your coat.

### How Opaque Tokens Work

```
┌─────────┐                    ┌─────────┐          ┌──────────┐
│  Client │                    │ Server  │          │ Database │
└────┬────┘                    └────┬────┘          └────┬─────┘
     │                              │                    │
     │  1. Login                    │                    │
     │ ─────────────────────────────>                    │
     │                              │                    │
     │                              │  2. Verify user    │
     │                              │ ───────────────────>
     │                              │                    │
     │                              │  3. User found     │
     │                              │ <───────────────────
     │                              │                    │
     │                              │  4. Create random  │
     │                              │     session ID     │
     │                              │                    │
     │                              │  5. Store session  │
     │                              │ ───────────────────>
     │                              │                    │
     │  6. Return session ID        │                    │
     │ <─────────────────────────────                    │
     │                              │                    │
     │  7. Request with session ID  │                    │
     │ ─────────────────────────────>                    │
     │                              │                    │
     │                              │  8. Look up session│
     │                              │ ───────────────────>
     │                              │                    │
     │                              │  9. Session data   │
     │                              │ <───────────────────
     │                              │                    │
     │  10. Return response         │                    │
     │ <─────────────────────────────                    │
```

### Session Model for Opaque Tokens

Create `models/Session.js`:

```javascript
// models/Session.js - Session Storage Model
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  // The session token (opaque, random string)
  token: {
    type: String,
    required: true,
    unique: true,
    index: true  // Index for fast lookups
  },
  
  // Reference to the user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // When the session expires
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  },
  
  // Optional: Track device/browser info
  userAgent: {
    type: String
  },
  
  // Optional: IP address for security
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

// Index for automatic cleanup of expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model('Session', sessionSchema);
export default Session;
```

### Opaque Token Controller

Create `controllers/opaqueTokenController.js`:

```javascript
// controllers/opaqueTokenController.js - Opaque Token Authentication
import User from '../models/User.js';
import Session from '../models/Session.js';
import { randomBytes } from 'crypto';

// Helper function to generate random token
const generateOpaqueToken = () => {
  // Generate 32 bytes of random data and convert to hex string
  return randomBytes(32).toString('hex');
};

// ============================================
// REGISTER - Create new user
// ============================================
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create user
    const user = await User.create({ email, password, name });
    
    // Generate opaque token
    const sessionToken = generateOpaqueToken();
    
    // Create session in database
    await Session.create({
      token: sessionToken,
      userId: user._id,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip
    });
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        sessionToken: sessionToken
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// ============================================
// LOGIN - Authenticate and create session
// ============================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate opaque token
    const sessionToken = generateOpaqueToken();
    
    // Store session in database
    await Session.create({
      token: sessionToken,
      userId: user._id,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip
    });
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        sessionToken: sessionToken
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// ============================================
// LOGOUT - Delete session (instant revocation)
// ============================================
export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      // Delete session from database
      await Session.findOneAndDelete({ token });
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging out',
      error: error.message
    });
  }
};

// ============================================
// LOGOUT ALL - Delete all user sessions
// ============================================
export const logoutAll = async (req, res) => {
  try {
    // Delete all sessions for this user
    await Session.deleteMany({ userId: req.user._id });
    
    res.json({
      success: true,
      message: 'Logged out from all devices'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging out',
      error: error.message
    });
  }
};

// ============================================
// GET PROFILE
// ============================================
export const getProfile = async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
    }
  });
};

// ============================================
// GET ALL SESSIONS - View active sessions
// ============================================
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id })
      .select('userAgent ipAddress createdAt expiresAt')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: sessions.length,
      data: sessions
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sessions',
      error: error.message
    });
  }
};
```

### Opaque Token Middleware

Create `middleware/opaqueAuth.js`:

```javascript
// middleware/opaqueAuth.js - Opaque Token Verification Middleware
import Session from '../models/Session.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided'
      });
    }
    
    // Find session in database
    const session = await Session.findOne({ 
      token,
      expiresAt: { $gt: new Date() }  // Check if not expired
    });
    
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - Invalid or expired session'
      });
    }
    
    // Find user
    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - User not found'
      });
    }
    
    // Attach user and session to request
    req.user = user;
    req.session = session;
    
    next();
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
};
```

### Opaque Token Routes

Create `routes/opaqueTokenRoutes.js`:

```javascript
// routes/opaqueTokenRoutes.js - Opaque Token Routes
import express from 'express';
import {
  register,
  login,
  logout,
  logoutAll,
  getProfile,
  getSessions
} from '../controllers/opaqueTokenController.js';
import { protect } from '../middleware/opaqueAuth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/profile', protect, getProfile);
router.post('/logout-all', protect, logoutAll);
router.get('/sessions', protect, getSessions);

export default router;
```

### Testing Opaque Token Authentication

**Login:**
```bash
POST http://localhost:3000/api/opaque/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "email": "john@example.com",
      "name": "John Doe"
    },
    "sessionToken": "a1b2c3d4e5f6...78bytes...hexstring"
  }
}
```

**View all sessions:**
```bash
GET http://localhost:3000/api/opaque/sessions
Authorization: Bearer a1b2c3d4e5f6...
```

**Logout (instant revocation):**
```bash
POST http://localhost:3000/api/opaque/logout
Authorization: Bearer a1b2c3d4e5f6...
```

### Opaque Token Pros and Cons

**Pros:**
- ✅ Instant revocation - Just delete from database
- ✅ Can track all active sessions
- ✅ Small token size - Just a random string
- ✅ Full server control

**Cons:**
- ❌ Database lookup for every request
- ❌ Not as scalable as JWT
- ❌ Session cleanup needed

---

## Method 3: Hybrid Approach (Access + Refresh Tokens)

### What is the Hybrid Approach?

The hybrid approach combines the best of both worlds:
- **Access Token (JWT)**: Short-lived (15-30 minutes), used for API calls
- **Refresh Token (Opaque)**: Long-lived (days/weeks), stored in database, used to get new access tokens

This gives you the performance of JWT with the control of stateful sessions.

### How Hybrid Tokens Work

```
┌─────────┐                    ┌─────────┐          ┌──────────┐
│  Client │                    │ Server  │          │ Database │
└────┬────┘                    └────┬────┘          └────┬─────┘
     │                              │                    │
     │  1. Login                    │                    │
     │ ─────────────────────────────>                    │
     │                              │                    │
     │  2. Return Access Token (15min)                   │
     │     + Refresh Token (7 days)  │                    │
     │ <─────────────────────────────                    │
     │                              │                    │
     │  3. API call with Access Token│                    │
     │ ─────────────────────────────>                    │
     │                              │                    │
     │  4. Access token valid,      │                    │
     │     no DB lookup needed      │                    │
     │ <─────────────────────────────                    │
     │                              │                    │
     │  5. Access token expires     │                    │
     │                              │                    │
     │  6. Request with Refresh Token                   │
     │ ─────────────────────────────>                    │
     │                              │                    │
     │                              │  7. Verify refresh │
     │                              │     token in DB    │
     │                              │ ───────────────────>
     │                              │                    │
     │  8. New Access Token +       │                    │
     │     optional new Refresh     │                    │
     │ <─────────────────────────────                    │
```

### Refresh Token Model

Create `models/RefreshToken.js`:

```javascript
// models/RefreshToken.js - Refresh Token Storage
import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  // The refresh token (opaque, random string)
  token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Reference to user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // When it expires
  expiresAt: {
    type: Date,
    required: true
  },
  
  // Device info for tracking
  userAgent: String,
  ipAddress: String
}, {
  timestamps: true
});

// Auto-delete expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
```

### Hybrid Token Controller

Create `controllers/hybridAuthController.js`:

```javascript
// controllers/hybridAuthController.js - Hybrid Access + Refresh Token Auth
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

// ============================================
// TOKEN GENERATION HELPERS
// ============================================

// Generate short-lived access token (JWT)
const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }  // 15 minutes
  );
};

// Generate long-lived refresh token (opaque)
const generateRefreshToken = async (userId, userAgent, ipAddress) => {
  const token = randomBytes(40).toString('hex');
  
  await RefreshToken.create({
    token,
    userId,
    userAgent,
    ipAddress,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  });
  
  return token;
};

// ============================================
// REGISTER
// ============================================
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create user
    const user = await User.create({ email, password, name });
    
    // Generate both tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(
      user._id,
      req.headers['user-agent'],
      req.ip
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        accessToken,
        refreshToken,
        // Include expiration info for client
        accessTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
        refreshTokenExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// ============================================
// LOGIN
// ============================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(
      user._id,
      req.headers['user-agent'],
      req.ip
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        accessToken,
        refreshToken,
        accessTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
        refreshTokenExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// ============================================
// REFRESH ACCESS TOKEN
// ============================================
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token required'
      });
    }
    
    // Find refresh token in database
    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
      expiresAt: { $gt: new Date() }
    });
    
    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }
    
    // Verify user still exists
    const user = await User.findById(storedToken.userId);
    if (!user) {
      // Clean up orphaned token
      await RefreshToken.findByIdAndDelete(storedToken._id);
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Optional: Rotate refresh token for better security
    // Delete old refresh token
    await RefreshToken.findByIdAndDelete(storedToken._id);
    
    // Generate new tokens
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = await generateRefreshToken(
      user._id,
      req.headers['user-agent'],
      req.ip
    );
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        accessTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
        refreshTokenExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error refreshing token',
      error: error.message
    });
  }
};

// ============================================
// LOGOUT
// ============================================
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
      await RefreshToken.findOneAndDelete({ token: refreshToken });
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging out',
      error: error.message
    });
  }
};

// ============================================
// LOGOUT ALL DEVICES
// ============================================
export const logoutAll = async (req, res) => {
  try {
    await RefreshToken.deleteMany({ userId: req.user._id });
    
    res.json({
      success: true,
      message: 'Logged out from all devices'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging out',
      error: error.message
    });
  }
};

// ============================================
// GET PROFILE
// ============================================
export const getProfile = async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
    }
  });
};
```

### Hybrid Token Middleware

Create `middleware/hybridAuth.js`:

```javascript
// middleware/hybridAuth.js - Hybrid Authentication Middleware
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Get access token from header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No access token',
        code: 'NO_TOKEN'
      });
    }
    
    // Verify access token (JWT)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }
    
    req.user = user;
    next();
    
  } catch (error) {
    // Handle expired token specially
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token expired - Please refresh',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Invalid access token',
      code: 'INVALID_TOKEN'
    });
  }
};
```

### Hybrid Token Routes

Create `routes/hybridAuthRoutes.js`:

```javascript
// routes/hybridAuthRoutes.js - Hybrid Authentication Routes
import express from 'express';
import {
  register,
  login,
  refreshAccessToken,
  logout,
  logoutAll,
  getProfile
} from '../controllers/hybridAuthController.js';
import { protect } from '../middleware/hybridAuth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);

// Protected routes
router.get('/profile', protect, getProfile);
router.post('/logout-all', protect, logoutAll);

export default router;
```

### Client-Side Implementation Example

Here's how a client would use the hybrid approach:

```javascript
// client/authClient.js - Example Client Implementation
class AuthClient {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.baseURL = 'http://localhost:3000/api/hybrid';
  }
  
  // Store tokens
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    // In real app, store in secure storage (HttpOnly cookies are best)
  }
  
  // Make authenticated request
  async fetch(url, options = {}) {
    // Add access token to headers
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${this.accessToken}`
    };
    
    let response = await fetch(url, { ...options, headers });
    
    // If access token expired, try to refresh
    if (response.status === 401) {
      const data = await response.json();
      
      if (data.code === 'TOKEN_EXPIRED') {
        // Refresh the access token
        const refreshed = await this.refreshAccessToken();
        
        if (refreshed) {
          // Retry the original request with new token
          headers['Authorization'] = `Bearer ${this.accessToken}`;
          response = await fetch(url, { ...options, headers });
        }
      }
    }
    
    return response;
  }
  
  // Refresh access token
  async refreshAccessToken() {
    try {
      const response = await fetch(`${this.baseURL}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken })
      });
      
      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.data.accessToken, data.data.refreshToken);
        return true;
      }
      
      // Refresh token also expired - need to login again
      this.logout();
      return false;
      
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }
  
  // Login
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      this.setTokens(data.data.accessToken, data.data.refreshToken);
      return data;
    }
    
    throw new Error('Login failed');
  }
  
  // Logout
  async logout() {
    await fetch(`${this.baseURL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: this.refreshToken })
    });
    
    this.accessToken = null;
    this.refreshToken = null;
  }
}

export default new AuthClient();
```

### Testing Hybrid Authentication

**1. Login:**
```bash
POST http://localhost:3000/api/hybrid/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGci...",    // Expires in 15 min
    "refreshToken": "a1b2c3...",     // Expires in 7 days
    "accessTokenExpires": "2024-01-15T10:15:00.000Z",
    "refreshTokenExpires": "2024-01-22T10:00:00.000Z"
  }
}
```

**2. Use Access Token (fast, no DB lookup):**
```bash
GET http://localhost:3000/api/hybrid/profile
Authorization: Bearer eyJhbGci...
```

**3. When Access Token Expires, Refresh:**
```bash
POST http://localhost:3000/api/hybrid/refresh
Content-Type: application/json

{
  "refreshToken": "a1b2c3..."
}
```

### Hybrid Approach Pros and Cons

**Pros:**
- ✅ Best of both worlds
- ✅ Fast API calls with JWT access tokens
- ✅ Can revoke refresh tokens anytime
- ✅ Better security with token rotation

**Cons:**
- ❌ More complex to implement
- ❌ Need to handle token refresh logic
- ❌ Client needs to manage two tokens

---

## Method 4: Session-Based Authentication with express-session

### What is express-session?

express-session is Express's built-in session middleware. It stores session data on the server and uses a session ID cookie on the client. It's the traditional way to handle sessions in Express.

### How express-session Works

```
┌─────────┐                    ┌─────────┐          ┌──────────┐
│  Client │                    │ Server  │          │  Mongo   │
└────┬────┘                    └────┬────┘          └────┬─────┘
     │                              │                    │
     │  1. First request           │                    │
     │  (No cookie)                 │                    │
     │ ─────────────────────────────>                    │
     │                              │                    │
     │  2. Create session          │                    │
     │  3. Set session ID cookie   │                    │
     │ <─────────────────────────────                    │
     │    Set-Cookie: connect.sid=xxx                    │
     │                              │                    │
     │  4. Next request with cookie│                    │
     │ ─────────────────────────────>                    │
     │  Cookie: connect.sid=xxx     │                    │
     │                              │                    │
     │  5. Look up session by ID   │                    │
     │                              │ ───────────────────>
     │                              │                    │
     │  6. Session data            │                    │
     │                              │ <───────────────────
     │ <─────────────────────────────                    │
```

### Session Configuration

Create `config/session.js`:

```javascript
// config/session.js - Session Configuration
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Session configuration
export const sessionConfig = session({
  // Secret used to sign the session ID cookie
  secret: process.env.SESSION_SECRET,
  
  // Don't save session if unmodified
  resave: false,
  
  // Don't create session until something stored
  saveUninitialized: false,
  
  // Store sessions in MongoDB
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 7 * 24 * 60 * 60,  // 7 days in seconds
    autoRemove: 'native'     // Use MongoDB TTL index
  }),
  
  // Cookie settings
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
    httpOnly: true,                    // Not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
    sameSite: 'strict'                 // CSRF protection
  }
});
```

### Session Controller

Create `controllers/sessionController.js`:

```javascript
// controllers/sessionController.js - Session-Based Authentication
import User from '../models/User.js';

// ============================================
// REGISTER
// ============================================
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create user
    const user = await User.create({ email, password, name });
    
    // Store user info in session
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    req.session.userName = user.name;
    
    // Save session explicitly
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Session error'
        });
      }
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user._id,
            email: user.email,
            name: user.name
          }
        }
      });
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// ============================================
// LOGIN
// ============================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Store user info in session
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    req.session.userName = user.name;
    req.session.loginTime = new Date();
    
    // Save session
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Session error'
        });
      }
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            email: user.email,
            name: user.name
          }
        }
      });
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// ============================================
// LOGOUT
// ============================================
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out'
      });
    }
    
    // Clear the session cookie
    res.clearCookie('connect.sid');
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
};

// ============================================
// GET PROFILE
// ============================================
export const getProfile = (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.session.userId,
      email: req.session.userEmail,
      name: req.session.userName,
      loginTime: req.session.loginTime
    }
  });
};

// ============================================
// GET SESSION INFO
// ============================================
export const getSessionInfo = (req, res) => {
  res.json({
    success: true,
    data: {
      sessionId: req.sessionID,
      session: req.session,
      cookie: req.session.cookie
    }
  });
};
```

### Session Middleware

Create `middleware/sessionAuth.js`:

```javascript
// middleware/sessionAuth.js - Session Authentication Middleware
export const requireAuth = (req, res, next) => {
  // Check if session has userId
  if (!req.session.userId) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated - Please login'
    });
  }
  
  // User is authenticated
  next();
};
```

### Session Routes

Create `routes/sessionRoutes.js`:

```javascript
// routes/sessionRoutes.js - Session-Based Routes
import express from 'express';
import {
  register,
  login,
  logout,
  getProfile,
  getSessionInfo
} from '../controllers/sessionController.js';
import { requireAuth } from '../middleware/sessionAuth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', requireAuth, getProfile);
router.get('/session-info', requireAuth, getSessionInfo);
router.post('/logout', requireAuth, logout);

export default router;
```

### Adding Session to Server

Add to `server.js`:

```javascript
// server.js - Add session support
import { sessionConfig } from './config/session.js';

// Add session middleware (after cookie-parser, before routes)
app.use(sessionConfig);

// Import routes
import sessionRoutes from './routes/sessionRoutes.js';
app.use('/api/session', sessionRoutes);
```

### Testing Session Authentication

**1. Login (sets cookie automatically):**
```bash
POST http://localhost:3000/api/session/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response includes Set-Cookie header:**
```
Set-Cookie: connect.sid=s%3Aj8K9...; Path=/; HttpOnly
```

**2. Access protected route (cookie sent automatically):**
```bash
GET http://localhost:3000/api/session/profile
Cookie: connect.sid=s%3Aj8K9...
```

**3. View session info:**
```bash
GET http://localhost:3000/api/session/session-info
Cookie: connect.sid=s%3Aj8K9...
```

### Session-Based Pros and Cons

**Pros:**
- ✅ Easy to implement
- ✅ Automatic cookie handling
- ✅ Server has full control
- ✅ Can store additional session data

**Cons:**
- ❌ Requires session store
- ❌ Not ideal for mobile apps
- ❌ CSRF vulnerability (needs protection)

---

## Method 5: Passport.js Integration

### What is Passport.js?

Passport is authentication middleware for Node.js. It provides a flexible set of authentication strategies including local (username/password), OAuth (Google, Facebook, etc.), and more.

### Installing Passport

```bash
npm install passport passport-local passport-jwt
```

### Passport Configuration

Create `config/passport.js`:

```javascript
// config/passport.js - Passport.js Configuration
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

// ============================================
// LOCAL STRATEGY - For login
// ============================================
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        // Find user
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        
        // Check password
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        
        return done(null, user);
        
      } catch (error) {
        return done(error);
      }
    }
  )
);

// ============================================
// JWT STRATEGY - For protected routes
// ============================================
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.userId);
        
        if (user) {
          return done(null, user);
        }
        
        return done(null, false);
        
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
```

### Passport Controller

Create `controllers/passportController.js`:

```javascript
// controllers/passportController.js - Passport.js Controller
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token helper
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// ============================================
// REGISTER
// ============================================
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    const user = await User.create({ email, password, name });
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: { id: user._id, email: user.email, name: user.name },
        token
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// ============================================
// LOGIN (using Passport local strategy)
// ============================================
export const login = (req, res) => {
  // If we reach here, Passport authentication succeeded
  const token = generateToken(req.user._id);
  
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
      },
      token
    }
  });
};

// ============================================
// GET PROFILE (protected by JWT strategy)
// ============================================
export const getProfile = (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
    }
  });
};
```

### Passport Routes

Create `routes/passportRoutes.js`:

```javascript
// routes/passportRoutes.js - Passport.js Routes
import express from 'express';
import passport from 'passport';
import { register, login, getProfile } from '../controllers/passportController.js';

const router = express.Router();

// Register (custom, not using Passport)
router.post('/register', register);

// Login (uses Passport local strategy)
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);

// Protected route (uses Passport JWT strategy)
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  getProfile
);

export default router;
```

### Add Passport to Server

```javascript
// Add to server.js
import passport from 'passport';
import './config/passport.js';  // Configure Passport

app.use(passport.initialize());

import passportRoutes from './routes/passportRoutes.js';
app.use('/api/passport', passportRoutes);
```

### Testing Passport Authentication

**Login:**
```bash
POST http://localhost:3000/api/passport/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Access protected route:**
```bash
GET http://localhost:3000/api/passport/profile
Authorization: Bearer <token>
```

---

## Security Best Practices

### 1. HTTPS is Mandatory

Always use HTTPS in production. Tokens sent over HTTP can be intercepted.

```javascript
// Force HTTPS in production
app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
});
```

### 2. Secure Cookie Settings

```javascript
// Best practice cookie settings
cookie: {
  httpOnly: true,        // Prevent XSS
  secure: true,          // HTTPS only
  sameSite: 'strict',    // Prevent CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000,  // Reasonable expiration
  domain: 'yourdomain.com',
  path: '/'
}
```

### 3. Rate Limiting

```javascript
// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// Login rate limiter
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,  // 5 attempts per window
  message: {
    success: false,
    message: 'Too many login attempts, try again later'
  }
});

// Apply to login route
router.post('/login', loginLimiter, login);
```

### 4. Token Entropy

```javascript
// Generate cryptographically secure tokens
import { randomBytes } from 'crypto';

// Good: 40 bytes = 80 hex characters
const secureToken = randomBytes(40).toString('hex');

// Bad: Don't use Math.random() for tokens
const insecureToken = Math.random().toString(36);  // NOT SECURE
```

### 5. Input Validation

```javascript
// middleware/validate.js
import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
  
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
```

### 6. CORS Configuration

```javascript
import cors from 'cors';

app.use(cors({
  origin: process.env.CLIENT_URL,  // Only allow your frontend
  credentials: true,  // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 7. Helmet for Security Headers

```javascript
import helmet from 'helmet';

app.use(helmet());
```

---

## Comparison Table

| Feature | JWT | Opaque Token | Hybrid | Session |
|---------|-----|--------------|--------|---------|
| **Stateless** | ✅ Yes | ❌ No | Partial | ❌ No |
| **Server Storage** | None | Session store | Refresh tokens | Session store |
| **Revocation** | ❌ Hard | ✅ Instant | ✅ Refresh token | ✅ Instant |
| **Scalability** | ✅ Excellent | ⚠️ Good | ✅ Good | ⚠️ Good |
| **Mobile Apps** | ✅ Easy | ✅ Easy | ✅ Easy | ❌ Hard |
| **CSRF Risk** | ✅ None* | ⚠️ Possible | ⚠️ Possible | ⚠️ High |
| **XSS Risk** | ⚠️ Higher | ⚠️ Possible | ⚠️ Possible | ✅ Lower |
| **DB Lookup** | ❌ Never | ✅ Every request | Refresh only | ✅ Every request |
| **Implementation** | Simple | Medium | Complex | Simple |

*When stored in HttpOnly cookies, JWT also has no CSRF risk if sameSite is set.

### When to Use Each Method

**Use JWT when:**
- Building APIs for mobile apps
- Microservices architecture
- Need stateless authentication
- Don't need instant logout capability

**Use Opaque Tokens when:**
- Need instant session revocation
- Want to track all user sessions
- Building traditional web app
- Security is more important than scale

**Use Hybrid when:**
- Want best of both worlds
- Building production-grade apps
- Need both performance and control
- Can handle implementation complexity

**Use Sessions when:**
- Building traditional web apps
- Need to store user data server-side
- Simplicity is important
- Not building for mobile

---

## Complete Server Example

Here's a complete `server.js` with all authentication methods:

```javascript
// server.js - Complete Authentication Server
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';

// Load environment variables
dotenv.config();

// Import session configuration
import { sessionConfig } from './config/session.js';

// Import Passport configuration
import './config/passport.js';

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(cookieParser());

// Session middleware
app.use(sessionConfig);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);
console.log('✅ Connected to MongoDB');

// Import routes
import jwtAuthRoutes from './routes/jwtAuthRoutes.js';
import opaqueTokenRoutes from './routes/opaqueTokenRoutes.js';
import hybridAuthRoutes from './routes/hybridAuthRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import passportRoutes from './routes/passportRoutes.js';

// Use routes
app.use('/api/jwt', jwtAuthRoutes);
app.use('/api/opaque', opaqueTokenRoutes);
app.use('/api/hybrid', hybridAuthRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/passport', passportRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('\n📚 Available Authentication Endpoints:');
  console.log('   JWT:        /api/jwt/*');
  console.log('   Opaque:     /api/opaque/*');
  console.log('   Hybrid:     /api/hybrid/*');
  console.log('   Session:    /api/session/*');
  console.log('   Passport:   /api/passport/*');
});
```

---

## Summary

This tutorial covered five authentication methods:

1. **JWT (Stateless)**: Best for APIs and microservices
2. **Opaque Tokens (Stateful)**: Best for instant revocation needs
3. **Hybrid (Access + Refresh)**: Best for production apps
4. **Session-Based**: Best for traditional web apps
5. **Passport.js**: Best for multiple auth strategies

Choose the method that best fits your application's needs. For most production applications, the **Hybrid approach** provides the best balance of performance, security, and control.

Remember:
- Always use HTTPS in production
- Store tokens in HttpOnly cookies when possible
- Implement rate limiting
- Validate all input
- Use helmet for security headers
- Keep sensitive data in environment variables
