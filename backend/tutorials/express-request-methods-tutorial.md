# Complete Guide to HTTP Request Methods in Node.js Express

## Table of Contents

1. [Introduction to HTTP Request Methods](#introduction-to-http-request-methods)
2. [Setting Up Express](#setting-up-express)
3. [GET Method](#get-method)
4. [POST Method](#post-method)
5. [PUT Method](#put-method)
6. [PATCH Method](#patch-method)
7. [DELETE Method](#delete-method)
8. [Other HTTP Methods](#other-http-methods)
9. [Route Parameters and Query Strings](#route-parameters-and-query-strings)
10. [Request Body Handling](#request-body-handling)
11. [Middleware for Request Processing](#middleware-for-request-processing)
12. [Error Handling](#error-handling)
13. [Best Practices](#best-practices)
14. [Complete CRUD Example](#complete-crud-example)

---

## Introduction to HTTP Request Methods

HTTP request methods, also known as HTTP verbs, define the action to be performed on a given resource. Each method has a specific semantic meaning and plays a crucial role in building RESTful APIs and web applications. Understanding these methods is fundamental to web development because they form the backbone of client-server communication. The HTTP protocol defines several request methods, and each serves a distinct purpose in the request-response cycle.

The most commonly used HTTP methods in RESTful API development are GET, POST, PUT, PATCH, and DELETE. These methods align with the CRUD operations (Create, Read, Update, Delete) that form the basis of most web applications. GET is used for retrieving resources, POST for creating new resources, PUT and PATCH for updating existing resources, and DELETE for removing resources. Each method has specific characteristics regarding idempotency, safety, and caching behavior that developers must understand to build robust applications.

When designing APIs, it's essential to follow the semantic meaning of each HTTP method. This convention allows other developers and client applications to understand your API behavior intuitively. For instance, a GET request should never modify data on the server, as it's considered a "safe" method. Similarly, PUT requests should be idempotent, meaning making the same request multiple times should produce the same result. Adhering to these conventions makes your API more predictable, maintainable, and compatible with standard HTTP tools and libraries.

### HTTP Methods Overview Table

| Method | Description | CRUD Operation | Idempotent | Safe | Request Body |
|--------|-------------|----------------|------------|------|--------------|
| GET | Retrieve resource | Read | Yes | Yes | No |
| POST | Create resource | Create | No | No | Yes |
| PUT | Replace resource | Update | Yes | No | Yes |
| PATCH | Partial update | Update | No | No | Yes |
| DELETE | Remove resource | Delete | Yes | No | No |
| HEAD | Get headers only | Read | Yes | Yes | No |
| OPTIONS | Get supported methods | - | Yes | Yes | No |

---

## Setting Up Express

Express.js is a minimal, flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. Before diving into request methods, let's set up a basic Express server that we'll use throughout this tutorial. The setup process involves initializing a Node.js project, installing Express, and creating a basic server configuration.

### Installation and Project Setup

First, create a new directory for your project and initialize it with npm. This creates a package.json file that tracks your project dependencies and configuration. Then, install Express along with other commonly needed packages for handling different types of request data.

```bash
# Create project directory
mkdir express-tutorial
cd express-tutorial

# Initialize npm project
npm init -y

# Install Express and necessary middleware
npm install express body-parser cors helmet morgan
```

### Basic Server Setup

Create an `app.js` or `index.js` file with the following basic Express server configuration. This setup includes essential middleware for parsing different types of request bodies, logging HTTP requests, enabling CORS, and setting security headers.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Request logging
app.use(morgan('combined'));

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Parse raw bodies (for webhooks, etc.)
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }));

// Parse text bodies
app.use(bodyParser.text({ type: 'text/plain' }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express Tutorial API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Understanding Middleware Order

The order of middleware matters significantly in Express. Middleware functions are executed sequentially in the order they are registered using `app.use()`. The body-parser middleware must be placed before any routes that need to access the request body. Security middleware like helmet should be placed early in the chain to ensure headers are set for all responses. CORS middleware should also be placed early to handle preflight requests properly for cross-origin API calls.

---

## GET Method

The GET method is one of the most fundamental HTTP methods, primarily used for retrieving data from the server. GET requests should be idempotent and safe, meaning they should not cause any side effects on the server state. This characteristic makes GET requests cacheable and safe to retry, bookmark, and prefetch. When designing RESTful APIs, GET endpoints should be used exclusively for read operations, never for creating, updating, or deleting resources.

### Basic GET Request

The simplest form of a GET request handler in Express uses the `app.get()` method. This method takes two arguments: the route path and a callback function that handles the request. The callback function receives the request object (req) containing information about the incoming request and the response object (res) used to send the response back to the client.

```javascript
// Simple GET endpoint
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});
```

### GET with Route Parameters

Route parameters allow you to capture dynamic values from the URL. They are defined by prefixing a colon (`:`) to the parameter name in the route path. These parameters are accessible through `req.params` object. This pattern is commonly used for retrieving a specific resource by its identifier, following RESTful conventions where GET `/users/:id` retrieves a single user.

```javascript
// GET single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Simulated database lookup
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${userId} not found`
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});
```

### Multiple Route Parameters

Express allows multiple route parameters in a single route definition. This is useful for representing hierarchical relationships between resources, such as retrieving a specific comment belonging to a specific post. All parameters are captured and made available in the `req.params` object with their respective names as keys.

```javascript
// GET specific comment from a specific post
app.get('/api/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  
  console.log(`Fetching comment ${commentId} from post ${postId}`);
  
  // In a real application, you would query the database here
  const mockComment = {
    id: parseInt(commentId),
    postId: parseInt(postId),
    author: 'Commenter',
    content: 'This is a sample comment',
    createdAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: mockComment
  });
});
```

### GET with Query Parameters

Query parameters provide a way to pass additional data to GET requests, commonly used for filtering, sorting, pagination, and searching. They are appended to the URL after a question mark (`?`) and separated by ampersands (`&`). Express parses query parameters automatically and makes them available through `req.query` object, which contains key-value pairs of all query parameters.

```javascript
// GET users with filtering, sorting, and pagination
app.get('/api/users/search', (req, res) => {
  // Extract query parameters with defaults
  const {
    name = '',
    email = '',
    sort = 'name',
    order = 'asc',
    page = 1,
    limit = 10
  } = req.query;
  
  // Simulated filtered data
  let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'moderator' }
  ];
  
  // Apply filters
  if (name) {
    users = users.filter(u => 
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  if (email) {
    users = users.filter(u => 
      u.email.toLowerCase().includes(email.toLowerCase())
    );
  }
  
  // Apply sorting
  users.sort((a, b) => {
    const comparison = a[sort].localeCompare(b[sort]);
    return order === 'desc' ? -comparison : comparison;
  });
  
  // Apply pagination
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(users.length / parseInt(limit)),
      totalItems: users.length,
      itemsPerPage: parseInt(limit)
    },
    data: paginatedUsers
  });
});
```

### Best Practices for GET Requests

When implementing GET endpoints, always validate input parameters before using them, even though GET requests typically don't carry sensitive data. Use appropriate HTTP status codes: 200 for successful retrieval, 404 for resource not found, 400 for bad requests, and 500 for server errors. Consider implementing pagination for endpoints that return large datasets to improve performance and reduce bandwidth usage. Document all query parameters your API accepts, including their types, default values, and whether they're required or optional.

---

## POST Method

The POST method is used to submit data to the server to create a new resource. Unlike GET requests, POST requests are not idempotent, meaning multiple identical POST requests may create multiple resources. POST requests carry the data to be processed in the request body, which can be in various formats such as JSON, form data, or raw binary data. POST is the most common method for implementing "Create" operations in CRUD applications.

### Basic POST Request

A basic POST handler receives data from `req.body` (after body-parser middleware processes it) and typically performs validation, business logic, and database operations before returning a response. The response should include the created resource and use status code 201 (Created) to indicate successful resource creation.

```javascript
// POST create new user
app.post('/api/users', (req, res) => {
  // Extract data from request body
  const { name, email, role = 'user' } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name and email'
    });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }
  
  // Simulate creating user in database
  const newUser = {
    id: Date.now(), // In production, use database-generated ID
    name,
    email,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Return created resource with 201 status
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});
```

### POST with Form Data

When dealing with HTML form submissions, the data is typically sent as `application/x-www-form-urlencoded`. Express's body-parser middleware handles this format automatically when configured with `urlencoded` option. This is common in traditional web applications where forms submit data without JavaScript.

```javascript
// POST handle form submission
app.post('/api/contact', (req, res) => {
  // Form data is available in req.body
  const { name, email, subject, message } = req.body;
  
  // Validate required fields
  const requiredFields = ['name', 'email', 'message'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }
  
  // Process contact form (save to database, send email, etc.)
  const contactSubmission = {
    id: Date.now(),
    name,
    email,
    subject: subject || 'No Subject',
    message,
    submittedAt: new Date().toISOString()
  };
  
  console.log('Contact form submission:', contactSubmission);
  
  // Return success response
  res.status(201).json({
    success: true,
    message: 'Thank you for your message. We will respond shortly.',
    data: contactSubmission
  });
});
```

### POST with File Upload

Handling file uploads requires additional middleware like `multer`, which processes `multipart/form-data`. This format is used when forms include file inputs. Multer provides options for configuring storage destination, file naming, size limits, and file filtering.

```javascript
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// POST with single file upload
app.post('/api/upload/avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload an image file'
    });
  }
  
  res.status(201).json({
    success: true,
    message: 'Avatar uploaded successfully',
    data: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype
    }
  });
});

// POST with multiple file uploads
app.post('/api/upload/gallery', upload.array('photos', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please upload at least one image'
    });
  }
  
  const uploadedFiles = req.files.map(file => ({
    filename: file.filename,
    path: file.path,
    size: file.size
  }));
  
  res.status(201).json({
    success: true,
    message: `${req.files.length} files uploaded successfully`,
    data: uploadedFiles
  });
});
```

### POST for Authentication

POST requests are commonly used for authentication endpoints like login and registration. These endpoints require special handling for security, including password hashing, token generation, and secure cookie handling. Here's an example of a login endpoint using JWT tokens.

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key-change-in-production';

// POST login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    // In production, fetch user from database
    const mockUser = {
      id: 1,
      email: 'user@example.com',
      password: await bcrypt.hash('password123', 10), // Hashed password
      name: 'Test User',
      role: 'admin'
    };
    
    // Verify user exists and password matches
    if (email !== mockUser.email) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const isPasswordValid = await bcrypt.compare(password, mockUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email, role: mockUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return token and user info (excluding password)
    const { password: _, ...userWithoutPassword } = mockUser;
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
        expiresIn: '24h'
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
});
```

---

## PUT Method

The PUT method is used to update an existing resource by completely replacing it with the new data provided. PUT is idempotent, meaning making the same PUT request multiple times will produce the same result as making it once. This is a crucial characteristic that distinguishes PUT from POST. When using PUT, you must send the complete resource representation; any fields not included in the request will be removed or reset to default values.

### Basic PUT Request

A PUT endpoint typically receives the resource identifier as a route parameter and the complete updated resource data in the request body. The handler validates the input, checks if the resource exists, updates it completely, and returns the updated resource.

```javascript
// PUT - Complete update of user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, role, status } = req.body;
  
  // Validate required fields for complete replacement
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'PUT requires complete resource. Please provide name and email.'
    });
  }
  
  // Simulated database of users
  let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' }
  ];
  
  // Find user index
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${userId} not found`
    });
  }
  
  // Complete replacement - all fields are set to new values or defaults
  const updatedUser = {
    id: userId,
    name,                    // Required
    email,                   // Required
    role: role || 'user',    // Optional with default
    status: status || 'active', // Optional with default
    updatedAt: new Date().toISOString()
  };
  
  // Replace user in database
  users[userIndex] = updatedUser;
  
  res.json({
    success: true,
    message: 'User updated successfully (complete replacement)',
    data: updatedUser
  });
});
```

### PUT vs PATCH Understanding

The key difference between PUT and PATCH lies in how they handle updates. PUT replaces the entire resource, while PATCH performs a partial update. This distinction has important implications for how you design your API and how clients should use it. Understanding when to use each method is essential for building a well-designed REST API.

```javascript
// Example showing the difference between PUT and PATCH

// Original resource
const originalUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  status: 'active',
  createdAt: '2024-01-01T00:00:00.000Z'
};

// PUT request body - MUST include all fields
const putRequestBody = {
  name: 'John Updated',
  email: 'john.updated@example.com',
  role: 'user',
  status: 'active'
  // Note: createdAt would be lost unless explicitly included
};

// Result after PUT - complete replacement
const afterPut = {
  id: 1,
  name: 'John Updated',
  email: 'john.updated@example.com',
  role: 'user',
  status: 'active',
  updatedAt: '2024-02-01T00:00:00.000Z'
  // createdAt is gone because it wasn't in the PUT body
};

// PATCH request body - only fields to update
const patchRequestBody = {
  email: 'john.new@example.com'
  // Only updating email
};

// Result after PATCH - partial update
const afterPatch = {
  id: 1,
  name: 'John Doe',           // Unchanged
  email: 'john.new@example.com', // Updated
  role: 'admin',              // Unchanged
  status: 'active',           // Unchanged
  createdAt: '2024-01-01T00:00:00.000Z', // Unchanged
  updatedAt: '2024-02-01T00:00:00.000Z'  // New
};
```

### PUT for Nested Resources

PUT can also be used for updating nested resources, following RESTful conventions for hierarchical resource relationships. The URL structure typically includes both parent and child resource identifiers.

```javascript
// PUT - Update a specific comment on a post
app.put('/api/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  const { content, author } = req.body;
  
  // Validate required fields
  if (!content) {
    return res.status(400).json({
      success: false,
      message: 'Content is required for comment update'
    });
  }
  
  // Simulated comment lookup and update
  const updatedComment = {
    id: parseInt(commentId),
    postId: parseInt(postId),
    author: author || 'Anonymous',
    content,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Comment updated successfully',
    data: updatedComment
  });
});
```

### PUT with Upsert Behavior

Sometimes PUT endpoints implement "upsert" behavior, where the resource is created if it doesn't exist. This is useful when clients can generate resource IDs or when using natural keys. The response status code should reflect whether a resource was created (201) or updated (200).

```javascript
// PUT with upsert - create or update
app.put('/api/products/:sku', (req, res) => {
  const sku = req.params.sku;
  const { name, price, description, category, inStock } = req.body;
  
  // Validate required fields
  if (!name || price === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Product name and price are required'
    });
  }
  
  // Simulated database check
  const existingProducts = [
    { sku: 'PROD-001', name: 'Laptop', price: 999.99 }
  ];
  
  const existingIndex = existingProducts.findIndex(p => p.sku === sku);
  const isUpdate = existingIndex !== -1;
  
  const productData = {
    sku,
    name,
    price: parseFloat(price),
    description: description || '',
    category: category || 'Uncategorized',
    inStock: inStock !== undefined ? Boolean(inStock) : true,
    updatedAt: new Date().toISOString()
  };
  
  if (isUpdate) {
    // Update existing product
    existingProducts[existingIndex] = productData;
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: productData
    });
  } else {
    // Create new product
    productData.createdAt = new Date().toISOString();
    existingProducts.push(productData);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: productData
    });
  }
});
```

---

## PATCH Method

The PATCH method is used for partial updates to an existing resource. Unlike PUT, which replaces the entire resource, PATCH only modifies the fields specified in the request body. This makes PATCH more efficient for small updates, as you don't need to send the complete resource representation. PATCH is not idempotent in the general case, although it can be designed to be idempotent depending on how the update logic is implemented.

### Basic PATCH Request

A PATCH endpoint receives the resource identifier as a route parameter and only the fields to be updated in the request body. The handler applies only the specified changes, leaving other fields unchanged.

```javascript
// PATCH - Partial update of user
app.patch('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updates = req.body;
  
  // Validate that at least one field is provided for update
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No fields provided for update'
    });
  }
  
  // Define allowed fields for update (security best practice)
  const allowedUpdates = ['name', 'email', 'role', 'status', 'avatar'];
  const invalidFields = Object.keys(updates).filter(
    field => !allowedUpdates.includes(field)
  );
  
  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid update fields: ${invalidFields.join(', ')}`,
      allowedFields: allowedUpdates
    });
  }
  
  // Simulated database lookup
  let users = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'admin',
      status: 'active',
      avatar: null,
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ];
  
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${userId} not found`
    });
  }
  
  // Store original for comparison
  const originalUser = { ...users[userIndex] };
  
  // Apply only the provided updates
  Object.keys(updates).forEach(key => {
    users[userIndex][key] = updates[key];
  });
  
  // Add update timestamp
  users[userIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: 'User updated successfully (partial update)',
    data: {
      original: originalUser,
      updated: users[userIndex],
      changes: updates
    }
  });
});
```

### PATCH with Validation

PATCH endpoints should validate the update data similar to POST and PUT, but with the understanding that only some fields may be present. Field-specific validation can be applied conditionally based on what's being updated.

```javascript
// PATCH with field-specific validation
app.patch('/api/users/:id/profile', async (req, res) => {
  const userId = parseInt(req.params.id);
  const updates = req.body;
  
  // Validation rules for specific fields
  const validationRules = {
    name: {
      validate: (value) => value.length >= 2 && value.length <= 100,
      message: 'Name must be between 2 and 100 characters'
    },
    email: {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please provide a valid email address'
    },
    phone: {
      validate: (value) => /^\+?[\d\s-]{10,}$/.test(value),
      message: 'Please provide a valid phone number'
    },
    age: {
      validate: (value) => Number.isInteger(value) && value >= 13 && value <= 120,
      message: 'Age must be an integer between 13 and 120'
    }
  };
  
  // Validate each provided field
  const errors = [];
  for (const [field, value] of Object.entries(updates)) {
    if (validationRules[field]) {
      if (!validationRules[field].validate(value)) {
        errors.push({
          field,
          message: validationRules[field].message,
          value
        });
      }
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  // Simulate update
  const updatedUser = {
    id: userId,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser
  });
});
```

### PATCH for Status Updates

PATCH is commonly used for status changes, toggles, and other simple field updates. These operations are often atomic and don't require sending other resource data.

```javascript
// PATCH - Toggle user status
app.patch('/api/users/:id/status', (req, res) => {
  const userId = parseInt(req.params.id);
  const { status, reason } = req.body;
  
  // Validate status value
  const validStatuses = ['active', 'inactive', 'suspended', 'banned'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }
  
  // Require reason for certain status changes
  const reasonRequired = ['suspended', 'banned'];
  if (reasonRequired.includes(status) && !reason) {
    return res.status(400).json({
      success: false,
      message: `A reason is required when setting status to '${status}'`
    });
  }
  
  const statusChange = {
    userId,
    previousStatus: 'active', // Would fetch from database
    newStatus: status,
    reason: reason || null,
    changedAt: new Date().toISOString(),
    changedBy: 'admin' // Would come from auth middleware
  };
  
  res.json({
    success: true,
    message: `User status changed to '${status}'`,
    data: statusChange
  });
});
```

---

## DELETE Method

The DELETE method is used to remove a resource from the server. DELETE is idempotent, meaning making the same DELETE request multiple times has the same effect as making it once (the resource is removed, and subsequent requests typically return 404). There are different conventions for what a DELETE response should contain: some APIs return the deleted resource, some return a success message, and others return nothing (204 No Content).

### Basic DELETE Request

A basic DELETE endpoint receives the resource identifier as a route parameter and removes the corresponding resource from the data store. The response typically confirms the deletion or indicates if the resource was not found.

```javascript
// DELETE - Remove user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Simulated database
  let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  // Find user
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${userId} not found`
    });
  }
  
  // Store deleted user for response
  const deletedUser = users[userIndex];
  
  // Remove from array (in production, this would be a database delete)
  users.splice(userIndex, 1);
  
  // Return deleted resource
  res.json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser
  });
});
```

### DELETE with 204 No Content

Some APIs prefer to return a 204 No Content status for successful deletions, especially when there's no need to return the deleted resource. This is a valid RESTful approach and can reduce response payload size.

```javascript
// DELETE - Return 204 No Content
app.delete('/api/users/:id/silent', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Simulated delete operation
  // In production: await User.findByIdAndDelete(userId)
  
  // Return 204 No Content - successful but no response body
  res.status(204).send();
});
```

### Soft Delete Implementation

Many applications implement "soft delete" where resources are marked as deleted but not actually removed from the database. This allows for data recovery, audit trails, and maintaining referential integrity. The resource is typically marked with a `deletedAt` timestamp or a `isDeleted` flag.

```javascript
// DELETE - Soft delete (archive)
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { permanent = false } = req.query;
  
  // Simulated database
  let users = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      deletedAt: null
    }
  ];
  
  const userIndex = users.findIndex(u => u.id === userId && !u.deletedAt);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${userId} not found or already deleted`
    });
  }
  
  if (permanent === 'true') {
    // Permanent delete - actually remove from database
    const deletedUser = users.splice(userIndex, 1)[0];
    return res.json({
      success: true,
      message: 'User permanently deleted',
      data: deletedUser
    });
  }
  
  // Soft delete - mark as deleted
  users[userIndex].deletedAt = new Date().toISOString();
  users[userIndex].deletedBy = 'admin'; // Would come from auth
  
  res.json({
    success: true,
    message: 'User archived successfully (soft delete)',
    data: {
      id: userId,
      deletedAt: users[userIndex].deletedAt
    }
  });
});

// GET - Exclude soft-deleted records by default
app.get('/api/users', (req, res) => {
  const { includeDeleted = false } = req.query;
  
  let users = [
    { id: 1, name: 'John Doe', deletedAt: null },
    { id: 2, name: 'Jane Smith', deletedAt: '2024-01-15T00:00:00.000Z' }
  ];
  
  // Filter out soft-deleted unless explicitly requested
  if (includeDeleted !== 'true') {
    users = users.filter(u => !u.deletedAt);
  }
  
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});
```

### DELETE Multiple Resources

Sometimes APIs need to support deleting multiple resources at once. This can be implemented using query parameters or a request body with a list of IDs, though using a request body with DELETE is technically against HTTP conventions but widely used in practice.

```javascript
// DELETE - Multiple resources using query parameters
app.delete('/api/users', (req, res) => {
  const { ids } = req.query;
  
  if (!ids) {
    return res.status(400).json({
      success: false,
      message: 'Please provide user IDs to delete (use ?ids=1,2,3)'
    });
  }
  
  // Parse comma-separated IDs
  const userIds = ids.split(',').map(id => parseInt(id.trim()));
  
  // Validate IDs
  const invalidIds = userIds.filter(id => isNaN(id));
  if (invalidIds.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid user IDs: ${invalidIds.join(', ')}`
    });
  }
  
  // Simulated bulk delete
  const results = {
    requested: userIds.length,
    deleted: userIds.length, // In production, count actual deletes
    failed: 0,
    deletedIds: userIds
  };
  
  res.json({
    success: true,
    message: `${results.deleted} users deleted successfully`,
    data: results
  });
});
```

### DELETE with Cascade

When deleting a resource that has related resources, you may need to handle cascade deletion or prevent deletion if dependencies exist. This ensures data integrity and prevents orphaned records.

```javascript
// DELETE with cascade option
app.delete('/api/authors/:id', async (req, res) => {
  const authorId = parseInt(req.params.id);
  const { cascade = 'false' } = req.query;
  
  // Simulated data
  const author = { id: authorId, name: 'Author Name' };
  const books = [
    { id: 1, authorId: 1, title: 'Book 1' },
    { id: 2, authorId: 1, title: 'Book 2' }
  ];
  
  // Check for dependent records
  const dependentBooks = books.filter(b => b.authorId === authorId);
  
  if (dependentBooks.length > 0 && cascade === 'false') {
    return res.status(409).json({
      success: false,
      message: `Cannot delete author. ${dependentBooks.length} books are associated with this author.`,
      dependentResources: dependentBooks.map(b => ({ id: b.id, title: b.title })),
      hint: 'Use ?cascade=true to delete author and all associated books'
    });
  }
  
  // Perform cascade delete or reassign
  const deleteResult = {
    author: author,
    deletedBooks: cascade === 'true' ? dependentBooks : [],
    booksReassigned: cascade === 'reassign' ? dependentBooks.length : 0
  };
  
  res.json({
    success: true,
    message: cascade === 'true' 
      ? `Author and ${dependentBooks.length} associated books deleted`
      : 'Author deleted, books preserved',
    data: deleteResult
  });
});
```

---

## Other HTTP Methods

While GET, POST, PUT, PATCH, and DELETE are the most commonly used HTTP methods in REST APIs, Express supports all standard HTTP methods. Understanding these additional methods helps you build more complete and standards-compliant APIs.

### HEAD Method

The HEAD method is similar to GET but returns only the response headers, not the body. This is useful for checking resource existence, testing links, or checking metadata without transferring the full resource content. HEAD requests must return the same headers as a GET request for the same resource.

```javascript
// HEAD - Get headers only (no body)
app.head('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Simulated database check
  const userExists = userId > 0 && userId < 100;
  
  if (!userExists) {
    return res.status(404).end();
  }
  
  // Set headers that would be returned by GET
  res.set({
    'Content-Type': 'application/json',
    'Content-Length': '150', // Size of response body if it were GET
    'Last-Modified': new Date().toUTCString(),
    'ETag': '"abc123"',
    'X-Resource-Type': 'user'
  });
  
  // Send headers only, no body
  res.status(200).end();
});

// Practical use: Check if resource exists
app.head('/api/files/:filename', (req, res) => {
  const { filename } = req.params;
  
  // Simulated file check
  const file = {
    exists: true,
    size: 1024000,
    lastModified: new Date('2024-01-01')
  };
  
  if (!file.exists) {
    return res.status(404).end();
  }
  
  res.set({
    'Content-Type': 'application/octet-stream',
    'Content-Length': file.size.toString(),
    'Last-Modified': file.lastModified.toUTCString()
  });
  
  res.status(200).end();
});
```

### OPTIONS Method

The OPTIONS method returns information about the communication options available for a resource. It's commonly used in CORS preflight requests to determine which methods and headers are allowed. Express handles OPTIONS automatically when CORS middleware is configured, but you can also define custom OPTIONS handlers.

```javascript
// OPTIONS - Return allowed methods
app.options('/api/users', (req, res) => {
  res.set({
    'Allow': 'GET, POST, HEAD, OPTIONS',
    'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400' // Cache preflight for 24 hours
  });
  
  res.status(204).end();
});

// OPTIONS for specific resource
app.options('/api/users/:id', (req, res) => {
  res.set({
    'Allow': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
    'Access-Control-Allow-Methods': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  
  res.status(204).end();
});

// OPTIONS for all routes (wildcard)
app.options('*', (req, res) => {
  res.set({
    'Allow': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  });
  
  res.status(204).end();
});
```

### Custom OPTIONS Handler with CORS

For more control over CORS handling, you can implement custom OPTIONS responses with detailed information about supported operations.

```javascript
// Detailed OPTIONS response
app.options('/api/resources/:id', (req, res) => {
  const resourceId = req.params.id;
  
  // Dynamic response based on resource type or user permissions
  const allowedMethods = ['GET', 'OPTIONS'];
  
  // Check if user can modify (would check auth in production)
  const canModify = true;
  if (canModify) {
    allowedMethods.push('PUT', 'PATCH', 'DELETE');
  }
  
  res.set({
    'Allow': allowedMethods.join(', '),
    'Access-Control-Allow-Methods': allowedMethods.join(', '),
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Custom-Header',
    'Access-Control-Expose-Headers': 'X-Total-Count, X-Page-Count',
    'Access-Control-Max-Age': '3600'
  });
  
  res.status(204).end();
});
```

### Using app.all() for All Methods

The `app.all()` method handles all HTTP methods for a specific route. This is useful for middleware that should run regardless of the method, or for implementing method-agnostic handlers.

```javascript
// Middleware for all methods on a route
app.all('/api/*', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  
  // Add custom headers to all API responses
  res.set({
    'X-API-Version': '1.0.0',
    'X-Response-Time': Date.now()
  });
  
  next();
});

// Require authentication for all methods on admin routes
app.all('/api/admin/*', (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required for admin routes'
    });
  }
  
  // Validate token (simplified)
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'Invalid authentication token'
    });
  }
  
  next();
});

// Handle all methods for deprecated endpoint
app.all('/api/legacy/*', (req, res) => {
  res.status(410).json({
    success: false,
    message: 'This endpoint has been deprecated and removed',
    documentation: 'https://api.example.com/docs/migration-guide'
  });
});
```

---

## Route Parameters and Query Strings

Express provides powerful routing capabilities with support for route parameters, query strings, and route matching patterns. Understanding these features is essential for building flexible and intuitive API endpoints.

### Route Parameters

Route parameters are named URL segments that capture values at specific positions in the URL. They are defined with a colon prefix (`:parameterName`) and accessed via `req.params`.

```javascript
// Single parameter
app.get('/users/:userId', (req, res) => {
  res.json({ userId: req.params.userId });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameters with regex
app.get('/files/:filename.:extension?', (req, res) => {
  const { filename, extension } = req.params;
  res.json({ filename, extension: extension || 'none' });
});
```

### Parameter Validation with Regex

Express allows you to specify regular expressions to validate route parameters directly in the route definition. Parameters that don't match the pattern won't trigger the route handler.

```javascript
// Only match numeric IDs
app.get('/api/users/:id(\\d+)', (req, res) => {
  res.json({ 
    message: 'User ID must be numeric',
    id: parseInt(req.params.id)
  });
});

// Match UUID format
app.get('/api/resources/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', (req, res) => {
  res.json({ 
    message: 'Valid UUID',
    id: req.params.id 
  });
});

// Match slug format (lowercase letters, numbers, hyphens)
app.get('/api/posts/:slug([a-z0-9-]+)', (req, res) => {
  res.json({ 
    message: 'Valid slug',
    slug: req.params.slug 
  });
});

// Match year-month format
app.get('/api/archive/:year(\\d{4})-:month(\\d{2})', (req, res) => {
  const { year, month } = req.params;
  res.json({ year: parseInt(year), month: parseInt(month) });
});
```

### Query Strings

Query strings are key-value pairs appended to the URL after `?`. They are parsed automatically by Express and available in `req.query`.

```javascript
// Basic query string handling
app.get('/api/products', (req, res) => {
  // All query parameters
  console.log('Query params:', req.query);
  
  // Extract with defaults
  const {
    search = '',
    category = 'all',
    minPrice = 0,
    maxPrice = Infinity,
    sort = 'name',
    page = 1,
    limit = 20
  } = req.query;
  
  // Simulated products
  let products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999.99 },
    { id: 2, name: 'Mouse', category: 'electronics', price: 29.99 },
    { id: 3, name: 'Desk', category: 'furniture', price: 199.99 },
    { id: 4, name: 'Chair', category: 'furniture', price: 149.99 }
  ];
  
  // Apply search filter
  if (search) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply category filter
  if (category !== 'all') {
    products = products.filter(p => p.category === category);
  }
  
  // Apply price range
  products = products.filter(p => 
    p.price >= parseFloat(minPrice) && p.price <= parseFloat(maxPrice)
  );
  
  // Apply sorting
  products.sort((a, b) => {
    if (sort === 'price') return a.price - b.price;
    return a.name.localeCompare(b.name);
  });
  
  // Apply pagination
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const paginatedProducts = products.slice(startIndex, startIndex + parseInt(limit));
  
  res.json({
    success: true,
    filters: { search, category, minPrice, maxPrice, sort },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: products.length,
      totalPages: Math.ceil(products.length / parseInt(limit))
    },
    data: paginatedProducts
  });
});
```

### Handling Arrays in Query Strings

Query parameters can represent arrays when the same key appears multiple times or when using bracket notation.

```javascript
// Handle array query parameters
app.get('/api/articles', (req, res) => {
  // Array formats:
  // ?tags=javascript&tags=nodejs           -> tags: ['javascript', 'nodejs']
  // ?tags[]=javascript&tags[]=nodejs      -> tags: ['javascript', 'nodejs']
  // ?tags[0]=javascript&tags[1]=nodejs    -> tags: ['javascript', 'nodejs']
  
  let tags = req.query.tags || [];
  
  // Ensure tags is an array
  if (!Array.isArray(tags)) {
    tags = [tags];
  }
  
  console.log('Filtering by tags:', tags);
  
  const articles = [
    { id: 1, title: 'Express Basics', tags: ['javascript', 'nodejs', 'express'] },
    { id: 2, title: 'React Guide', tags: ['javascript', 'react'] },
    { id: 3, title: 'Database Design', tags: ['sql', 'database'] }
  ];
  
  let filtered = articles;
  if (tags.length > 0) {
    filtered = articles.filter(article =>
      tags.some(tag => article.tags.includes(tag))
    );
  }
  
  res.json({
    success: true,
    filters: { tags },
    count: filtered.length,
    data: filtered
  });
});
```

### Route Wildcards

Express supports wildcard patterns for matching multiple routes with a single handler.

```javascript
// Wildcard (*) matches anything
app.get('/docs/*', (req, res) => {
  const path = req.params[0]; // The matched wildcard portion
  res.json({ 
    message: 'Documentation route',
    requestedPath: path 
  });
});

// Multiple wildcards
app.get('/api/:version/*', (req, res) => {
  const version = req.params.version;
  const path = req.params[0];
  
  res.json({
    apiVersion: version,
    endpoint: path
  });
});

// Parameter with wildcard suffix
app.get('/static/:dirname(*)', (req, res) => {
  res.json({
    dirname: req.params.dirname
  });
});
```

---

## Request Body Handling

Handling different types of request bodies is crucial for building APIs that accept various data formats. Express, with the help of middleware, can parse JSON, URL-encoded data, raw data, and text.

### JSON Request Bodies

JSON is the most common format for API request bodies. The body-parser middleware (or Express's built-in parser) handles JSON parsing automatically.

```javascript
// Built-in Express JSON parser (Express 4.16+)
app.use(express.json({ limit: '10mb' }));

app.post('/api/orders', (req, res) => {
  // Parsed JSON body is available in req.body
  const { customer, items, shippingAddress, paymentMethod } = req.body;
  
  // Validate required fields
  if (!customer || !items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Customer and items are required'
    });
  }
  
  // Calculate total
  const total = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  const order = {
    id: Date.now(),
    customer,
    items,
    shippingAddress,
    paymentMethod: paymentMethod || 'pending',
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: order
  });
});
```

### URL-Encoded Request Bodies

URL-encoded format is commonly used for HTML form submissions. This format encodes data as key-value pairs similar to query strings.

```javascript
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.post('/api/feedback', (req, res) => {
  const { name, email, rating, comments, source } = req.body;
  
  // All values will be strings in urlencoded format
  const feedback = {
    id: Date.now(),
    name: name || 'Anonymous',
    email: email || null,
    rating: parseInt(rating) || 0,
    comments: comments || '',
    source: source || 'web',
    submittedAt: new Date().toISOString()
  };
  
  console.log('Feedback received:', feedback);
  
  res.status(201).json({
    success: true,
    message: 'Thank you for your feedback!',
    data: feedback
  });
});
```

### Raw and Text Request Bodies

For specific use cases like webhooks, file uploads, or plain text data, you may need to handle raw request bodies.

```javascript
// Parse raw bodies
app.use(express.raw({ type: 'application/octet-stream', limit: '10mb' }));

// Parse text bodies
app.use(express.text({ type: 'text/plain' }));

// Handle raw binary data (e.g., file upload via API)
app.post('/api/upload/raw', (req, res) => {
  // req.body is a Buffer for raw content type
  const rawContent = req.body;
  
  if (!Buffer.isBuffer(rawContent)) {
    return res.status(400).json({
      success: false,
      message: 'Expected raw binary data'
    });
  }
  
  // Process raw content
  const fileInfo = {
    size: rawContent.length,
    receivedAt: new Date().toISOString(),
    contentType: req.headers['content-type']
  };
  
  res.status(201).json({
    success: true,
    message: 'Raw data received',
    data: fileInfo
  });
});

// Handle plain text
app.post('/api/notes', (req, res) => {
  // req.body is a string for text/plain content type
  const noteContent = req.body;
  
  if (!noteContent || noteContent.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Note content cannot be empty'
    });
  }
  
  const note = {
    id: Date.now(),
    content: noteContent,
    characterCount: noteContent.length,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: note
  });
});
```

### Handling Multiple Content Types

Your API might need to accept different content types on the same endpoint. You can inspect the Content-Type header and handle accordingly.

```javascript
// Handle multiple content types
app.post('/api/data', (req, res) => {
  const contentType = req.headers['content-type'];
  let data;
  
  switch (contentType) {
    case 'application/json':
      data = req.body; // Already parsed as object
      break;
      
    case 'text/plain':
      data = { text: req.body }; // String, wrap in object
      break;
      
    case 'application/x-www-form-urlencoded':
      data = req.body; // Parsed as object
      break;
      
    case 'application/octet-stream':
      data = { 
        raw: req.body.toString('base64'),
        size: req.body.length 
      };
      break;
      
    default:
      return res.status(415).json({
        success: false,
        message: `Unsupported content type: ${contentType}`,
        supportedTypes: [
          'application/json',
          'text/plain',
          'application/x-www-form-urlencoded',
          'application/octet-stream'
        ]
      });
  }
  
  res.json({
    success: true,
    receivedContentType: contentType,
    data
  });
});
```

### Webhook Signature Verification

When handling webhooks from services like Stripe or GitHub, you often need to verify signatures using the raw request body. This requires access to the unparsed body.

```javascript
const crypto = require('crypto');

// Store raw body for signature verification
app.use('/webhooks', express.raw({ type: 'application/json' }));

app.post('/webhooks/stripe', (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_your_secret_key';
  
  // Verify webhook signature
  let event;
  try {
    // req.body is raw Buffer here
    event = JSON.parse(req.body);
    
    // Verify signature (simplified example)
    const payload = req.body.toString();
    const expectedSignature = crypto
      .createHmac('sha256', endpointSecret)
      .update(payload)
      .digest('hex');
    
    // In production, use Stripe's verify method
    console.log('Webhook received:', event.type);
    
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Webhook signature verification failed'
    });
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', event.data.object.id);
      break;
    case 'customer.created':
      console.log('Customer created:', event.data.object.id);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }
  
  res.json({ received: true });
});
```

---

## Middleware for Request Processing

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. Middleware can execute code, modify request and response objects, end the request-response cycle, or call the next middleware.

### Application-Level Middleware

Application-level middleware is bound to an instance of express using `app.use()` or `app.METHOD()`. It runs for every request that matches the specified path.

```javascript
// Logger middleware
const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  
  // Store start time for response time calculation
  req.startTime = start;
  
  // Override res.json to log response
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const responseTime = Date.now() - start;
    console.log(`Response Time: ${responseTime}ms`);
    console.log('Response Body:', JSON.stringify(body, null, 2));
    return originalJson(body);
  };
  
  next();
};

app.use(loggerMiddleware);

// Request ID middleware
const requestIdMiddleware = (req, res, next) => {
  req.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  res.setHeader('X-Request-ID', req.id);
  next();
};

app.use(requestIdMiddleware);
```

### Authentication Middleware

Authentication middleware verifies user identity before allowing access to protected routes. It typically checks for a valid token in the Authorization header.

```javascript
// Authentication middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No authorization header provided',
      code: 'AUTH_REQUIRED'
    });
  }
  
  // Extract token (Bearer <token>)
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization format. Use: Bearer <token>',
      code: 'AUTH_INVALID_FORMAT'
    });
  }
  
  const token = parts[1];
  
  try {
    // Verify token (using jsonwebtoken)
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user info to request
    req.user = decoded;
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      code: 'TOKEN_INVALID'
    });
  }
};

// Role-based authorization middleware
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `This action requires one of the following roles: ${roles.join(', ')}`,
        requiredRoles: roles,
        currentRole: req.user.role
      });
    }
    
    next();
  };
};

// Apply authentication to routes
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

app.delete('/api/users/:id', authMiddleware, requireRole('admin'), (req, res) => {
  // Only admins can delete users
  res.json({
    success: true,
    message: `User ${req.params.id} deleted by ${req.user.email}`
  });
});
```

### Validation Middleware

Validation middleware checks request data against defined rules before processing. This keeps validation logic separate from route handlers.

```javascript
// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const errors = [];
    
    // Validate body
    if (schema.body) {
      for (const [field, rules] of Object.entries(schema.body)) {
        const value = req.body[field];
        
        // Required check
        if (rules.required && (value === undefined || value === null || value === '')) {
          errors.push({ field, message: `${field} is required`, location: 'body' });
          continue;
        }
        
        // Skip other validations if field is optional and not provided
        if (value === undefined || value === null) continue;
        
        // Type check
        if (rules.type && typeof value !== rules.type) {
          errors.push({ field, message: `${field} must be of type ${rules.type}`, location: 'body' });
        }
        
        // Min length
        if (rules.minLength && value.length < rules.minLength) {
          errors.push({ field, message: `${field} must be at least ${rules.minLength} characters`, location: 'body' });
        }
        
        // Max length
        if (rules.maxLength && value.length > rules.maxLength) {
          errors.push({ field, message: `${field} must not exceed ${rules.maxLength} characters`, location: 'body' });
        }
        
        // Pattern match
        if (rules.pattern && !rules.pattern.test(value)) {
          errors.push({ field, message: `${field} format is invalid`, location: 'body' });
        }
        
        // Custom validation
        if (rules.custom && !rules.custom(value)) {
          errors.push({ field, message: rules.customMessage || `${field} validation failed`, location: 'body' });
        }
      }
    }
    
    // Validate params
    if (schema.params) {
      for (const [field, rules] of Object.entries(schema.params)) {
        const value = req.params[field];
        
        if (rules.required && !value) {
          errors.push({ field, message: `${field} is required`, location: 'params' });
        }
        
        if (rules.pattern && value && !rules.pattern.test(value)) {
          errors.push({ field, message: `${field} format is invalid`, location: 'params' });
        }
      }
    }
    
    // Validate query
    if (schema.query) {
      for (const [field, rules] of Object.entries(schema.query)) {
        const value = req.query[field];
        
        if (rules.required && !value) {
          errors.push({ field, message: `${field} is required`, location: 'query' });
        }
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    next();
  };
};

// Usage example
const userSchema = {
  body: {
    name: {
      required: true,
      type: 'string',
      minLength: 2,
      maxLength: 100
    },
    email: {
      required: true,
      type: 'string',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    age: {
      required: false,
      type: 'number',
      custom: (value) => value >= 13 && value <= 120,
      customMessage: 'Age must be between 13 and 120'
    }
  }
};

app.post('/api/users', validate(userSchema), (req, res) => {
  // If we reach here, validation passed
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: req.body
  });
});
```

### Error Handling Middleware

Error handling middleware catches errors thrown in route handlers and middleware. It must have four parameters (err, req, res, next) to be recognized as error middleware.

```javascript
// Custom error classes
class AppError extends Error {
  constructor(message, statusCode, code = 'ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log error
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    requestId: req.id,
    path: req.path,
    method: req.method
  });
  
  // Default values
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  
  // Response object
  const response = {
    success: false,
    message: err.message || 'An unexpected error occurred',
    code
  };
  
  // Add validation errors if present
  if (err.errors) {
    response.errors = err.errors;
  }
  
  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  
  res.status(statusCode).json(response);
};

// Apply error handler (must be last)
app.use(errorHandler);

// Route using async handler
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await findUserById(req.params.id);
  
  if (!user) {
    throw new NotFoundError('User');
  }
  
  res.json({ success: true, data: user });
}));
```

---

## Error Handling

Proper error handling is essential for building robust APIs. Express provides mechanisms for handling both synchronous and asynchronous errors, and customizing error responses.

### Synchronous Error Handling

Synchronous errors in Express are automatically caught by the error handling middleware. Any error thrown in a synchronous route handler will be passed to the error handler.

```javascript
// Synchronous error example
app.get('/api/sync-error', (req, res) => {
  // This error will be caught by Express automatically
  throw new Error('Something went wrong synchronously!');
});

// Manual error passing
app.get('/api/manual-error', (req, res, next) => {
  try {
    // Some operation
    const result = someOperation();
    res.json(result);
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

### Asynchronous Error Handling

Asynchronous errors require explicit handling because Express doesn't automatically catch them in async functions. You must use try-catch blocks or async handler wrappers.

```javascript
// Wrong - async errors won't be caught
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error('User not found'); // This won't be caught!
  }
  res.json(user);
});

// Correct - with try-catch
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('User');
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

// Correct - with async handler wrapper
app.get('/api/posts/:id', asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new NotFoundError('Post');
  }
  res.json({ success: true, data: post });
}));
```

### 404 Not Found Handler

Handle requests to undefined routes with a 404 handler. This should be placed after all other routes.

```javascript
// 404 handler for undefined routes
app.use((req, res, next) => {
  const error = new NotFoundError(`Route ${req.method} ${req.path}`);
  next(error);
});

// Or return JSON directly
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    availableEndpoints: [
      'GET /api/users',
      'POST /api/users',
      'GET /api/users/:id',
      'PUT /api/users/:id',
      'DELETE /api/users/:id'
    ]
  });
});
```

### Comprehensive Error Handling Setup

Here's a complete error handling setup for a production-ready Express application:

```javascript
// errorHandling.js - Complete error handling module

// Custom error classes
class AppError extends Error {
  constructor(message, statusCode, code = 'ERROR', details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details = null) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflict', details = null) {
    super(message, 409, 'CONFLICT', details);
  }
}

class ValidationError extends AppError {
  constructor(errors = []) {
    super('Validation failed', 422, 'VALIDATION_ERROR', errors);
  }
}

class RateLimitError extends AppError {
  constructor(retryAfter = 60) {
    super('Too many requests', 429, 'RATE_LIMIT_EXCEEDED', { retryAfter });
  }
}

class InternalError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, 500, 'INTERNAL_ERROR');
  }
}

// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Global error handler
const globalErrorHandler = (err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.code = err.code || 'INTERNAL_ERROR';
  err.status = err.status || 'error';
  
  // Log error
  console.error('Error occurred:', {
    timestamp: new Date().toISOString(),
    requestId: req.id,
    method: req.method,
    path: req.path,
    statusCode: err.statusCode,
    code: err.code,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
  
  // Prepare response
  const response = {
    success: false,
    status: err.status,
    code: err.code,
    message: err.message
  };
  
  // Add details if present
  if (err.details) {
    response.details = err.details;
  }
  
  // Development - add stack trace
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.request = {
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body
    };
  }
  
  // Handle specific error types
  if (err.name === 'JsonWebTokenError') {
    response.message = 'Invalid token';
    response.code = 'INVALID_TOKEN';
    err.statusCode = 401;
  }
  
  if (err.name === 'TokenExpiredError') {
    response.message = 'Token expired';
    response.code = 'TOKEN_EXPIRED';
    err.statusCode = 401;
  }
  
  if (err.name === 'SyntaxError' && err.status === 400 && 'body' in err) {
    response.message = 'Invalid JSON in request body';
    response.code = 'INVALID_JSON';
  }
  
  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    response.message = `Duplicate value for field: ${field}`;
    response.code = 'DUPLICATE_KEY';
    err.statusCode = 409;
  }
  
  // MongoDB validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    response.message = 'Validation failed';
    response.details = errors;
    err.statusCode = 422;
  }
  
  res.status(err.statusCode).json(response);
};

// 404 handler
const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.method} ${req.originalUrl}`);
  next(error);
};

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  RateLimitError,
  InternalError,
  asyncHandler,
  globalErrorHandler,
  notFoundHandler
};
```

### Using Error Handling in Routes

```javascript
const {
  NotFoundError,
  ValidationError,
  asyncHandler
} = require('./errorHandling');

// Get user with proper error handling
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate ID format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ValidationError([{
      field: 'id',
      message: 'Invalid user ID format'
    }]);
  }
  
  // Find user
  const user = await User.findById(id);
  
  if (!user) {
    throw new NotFoundError('User');
  }
  
  res.json({
    success: true,
    data: user
  });
}));
```

---

## Best Practices

Following best practices ensures your Express API is maintainable, secure, and performant. Here are key recommendations for each HTTP method and general API design.

### RESTful API Design Principles

When designing RESTful APIs, follow these principles for consistency and usability:

```javascript
// Good: Resource-based URLs
GET    /api/users              // Get all users
POST   /api/users              // Create new user
GET    /api/users/:id          // Get specific user
PUT    /api/users/:id          // Update entire user
PATCH  /api/users/:id          // Partially update user
DELETE /api/users/:id          // Delete user

// Good: Nested resources
GET    /api/users/:id/posts    // Get posts by user
POST   /api/users/:id/posts    // Create post for user
GET    /api/posts/:id/comments // Get comments for post

// Bad: Action-based URLs
GET    /api/getUsers           // Don't use verbs in URLs
POST   /api/createUser
DELETE /api/deleteUser?id=1    // Don't use query params for IDs

// Good: Filtering with query parameters
GET    /api/users?status=active&role=admin&page=1&limit=10

// Good: Consistent response structure
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}

// Error response
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [...]
}
```

### Input Validation and Sanitization

Always validate and sanitize user input to prevent security vulnerabilities like injection attacks and ensure data integrity.

```javascript
const validator = require('validator');
const xss = require('xss');

// Input sanitization middleware
const sanitizeInput = (req, res, next) => {
  // Sanitize body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key].trim());
      }
    }
  }
  
  // Sanitize query parameters
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = xss(req.query[key].trim());
      }
    }
  }
  
  next();
};

app.use(sanitizeInput);

// Validation example
const validateUserInput = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];
  
  // Name validation
  if (!name || name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }
  
  // Email validation
  if (!email || !validator.isEmail(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  
  // Password validation
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  } else if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    errors.push({
      field: 'password',
      message: 'Password must contain uppercase, lowercase, number, and symbol'
    });
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

app.post('/api/users', validateUserInput, (req, res) => {
  // Process validated and sanitized input
  res.status(201).json({ success: true, data: req.body });
});
```

### Rate Limiting

Protect your API from abuse by implementing rate limiting.

```javascript
const rateLimit = require('express-rate-limit');

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: 'Too many requests, please try again later',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again in an hour',
    code: 'AUTH_RATE_LIMIT'
  }
});

// Apply rate limiters
app.use('/api', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

### Security Headers

Use security middleware to protect against common web vulnerabilities.

```javascript
const helmet = require('helmet');
const cors = require('cors');

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
}));

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));
```

### Pagination, Filtering, and Sorting

Implement consistent patterns for data retrieval operations.

```javascript
// Pagination middleware
const paginate = (defaultLimit = 20, maxLimit = 100) => {
  return (req, res, next) => {
    req.pagination = {
      page: Math.max(1, parseInt(req.query.page) || 1),
      limit: Math.min(
        maxLimit,
        Math.max(1, parseInt(req.query.limit) || defaultLimit)
      )
    };
    req.pagination.skip = (req.pagination.page - 1) * req.pagination.limit;
    next();
  };
};

// Sorting middleware
const sort = (defaultSort = 'createdAt', defaultOrder = 'desc') => {
  return (req, res, next) => {
    req.sorting = {
      field: req.query.sortBy || defaultSort,
      order: (req.query.sortOrder || defaultOrder).toLowerCase()
    };
    
    if (!['asc', 'desc'].includes(req.sorting.order)) {
      req.sorting.order = defaultOrder;
    }
    
    next();
  };
};

// Example route with pagination and sorting
app.get('/api/products', paginate(10, 50), sort('name', 'asc'), async (req, res) => {
  const { page, limit, skip } = req.pagination;
  const { field, order } = req.sorting;
  const { category, minPrice, maxPrice, search } = req.query;
  
  // Build filter query
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Build sort object
  const sortObj = {};
  sortObj[field] = order === 'asc' ? 1 : -1;
  
  // Execute query (MongoDB example)
  const [items, total] = await Promise.all([
    Product.find(filter).sort(sortObj).skip(skip).limit(limit),
    Product.countDocuments(filter)
  ]);
  
  res.json({
    success: true,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    },
    data: items
  });
});
```

---

## Complete CRUD Example

Here's a complete, production-ready CRUD API for a user resource, incorporating all the concepts covered in this tutorial.

```javascript
// ==========================================
// Complete CRUD API Example - User Management
// ==========================================

const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// ==========================================
// In-Memory Database (Replace with real DB in production)
// ==========================================
let users = [];

// ==========================================
// Validation Schemas
// ==========================================
const validateCreateUser = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  
  // Check for duplicate email
  if (users.some(u => u.email === email)) {
    errors.push({ field: 'email', message: 'Email already exists' });
  }
  
  if (!password || password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  }
  
  const validRoles = ['user', 'admin', 'moderator'];
  if (role && !validRoles.includes(role)) {
    errors.push({ field: 'role', message: `Role must be one of: ${validRoles.join(', ')}` });
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors
    });
  }
  
  next();
};

const validateUpdateUser = (req, res, next) => {
  const allowedFields = ['name', 'email', 'role', 'status', 'avatar'];
  const updates = req.body;
  
  // Check for invalid fields
  const invalidFields = Object.keys(updates).filter(f => !allowedFields.includes(f));
  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid fields: ${invalidFields.join(', ')}`,
      allowedFields
    });
  }
  
  // Validate individual fields if present
  const errors = [];
  
  if (updates.name !== undefined && updates.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }
  
  if (updates.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updates.email)) {
      errors.push({ field: 'email', message: 'Valid email is required' });
    }
    // Check for duplicate email (excluding current user)
    const userId = req.params.id;
    if (users.some(u => u.email === updates.email && u.id !== userId)) {
      errors.push({ field: 'email', message: 'Email already exists' });
    }
  }
  
  if (updates.role !== undefined) {
    const validRoles = ['user', 'admin', 'moderator'];
    if (!validRoles.includes(updates.role)) {
      errors.push({ field: 'role', message: `Role must be one of: ${validRoles.join(', ')}` });
    }
  }
  
  if (updates.status !== undefined) {
    const validStatuses = ['active', 'inactive', 'suspended'];
    if (!validStatuses.includes(updates.status)) {
      errors.push({ field: 'status', message: `Status must be one of: ${validStatuses.join(', ')}` });
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors
    });
  }
  
  next();
};

// ==========================================
// Route Handlers
// ==========================================

/**
 * @route   GET /api/users
 * @desc    Get all users with pagination, filtering, and sorting
 * @access  Public
 */
router.get('/', (req, res) => {
  const { page = 1, limit = 10, sort = 'name', order = 'asc', search, status, role } = req.query;
  
  let result = [...users];
  
  // Apply filters
  if (status) {
    result = result.filter(u => u.status === status);
  }
  
  if (role) {
    result = result.filter(u => u.role === role);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter(u =>
      u.name.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  result.sort((a, b) => {
    let comparison = 0;
    if (typeof a[sort] === 'string') {
      comparison = a[sort].localeCompare(b[sort]);
    } else if (typeof a[sort] === 'number') {
      comparison = a[sort] - b[sort];
    }
    return order === 'desc' ? -comparison : comparison;
  });
  
  // Apply pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedResult = result.slice(startIndex, endIndex);
  
  // Remove passwords from response
  const safeResult = paginatedResult.map(({ password, ...user }) => user);
  
  res.json({
    success: true,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: result.length,
      totalPages: Math.ceil(result.length / limitNum)
    },
    filters: { search, status, role },
    data: safeResult
  });
});

/**
 * @route   GET /api/users/:id
 * @desc    Get single user by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found`,
      code: 'NOT_FOUND'
    });
  }
  
  // Remove password from response
  const { password, ...safeUser } = user;
  
  res.json({
    success: true,
    data: safeUser
  });
});

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Public
 */
router.post('/', validateCreateUser, async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const newUser = {
    id: uuidv4(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role,
    status: 'active',
    avatar: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Remove password from response
  const { password: _, ...safeUser } = newUser;
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: safeUser
  });
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update entire user (complete replacement)
 * @access  Public
 */
router.put('/:id', validateCreateUser, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, status, avatar } = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found`,
      code: 'NOT_FOUND'
    });
  }
  
  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Complete replacement (preserve id and timestamps)
  const updatedUser = {
    id,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role: role || 'user',
    status: status || 'active',
    avatar: avatar || null,
    createdAt: users[userIndex].createdAt,
    updatedAt: new Date().toISOString()
  };
  
  users[userIndex] = updatedUser;
  
  // Remove password from response
  const { password: _, ...safeUser } = updatedUser;
  
  res.json({
    success: true,
    message: 'User updated successfully (complete replacement)',
    data: safeUser
  });
});

/**
 * @route   PATCH /api/users/:id
 * @desc    Partially update user
 * @access  Public
 */
router.patch('/:id', validateUpdateUser, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found`,
      code: 'NOT_FOUND'
    });
  }
  
  // Store original for comparison
  const originalUser = { ...users[userIndex] };
  
  // Apply updates
  if (updates.name) users[userIndex].name = updates.name.trim();
  if (updates.email) users[userIndex].email = updates.email.toLowerCase().trim();
  if (updates.role) users[userIndex].role = updates.role;
  if (updates.status) users[userIndex].status = updates.status;
  if (updates.avatar !== undefined) users[userIndex].avatar = updates.avatar;
  
  users[userIndex].updatedAt = new Date().toISOString();
  
  // Remove password from response
  const { password, ...safeUser } = users[userIndex];
  
  res.json({
    success: true,
    message: 'User updated successfully (partial update)',
    data: {
      original: { id: originalUser.id, name: originalUser.name, email: originalUser.email },
      updated: safeUser,
      changes: updates
    }
  });
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Public
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { permanent = false } = req.query;
  
  const userIndex = users.findIndex(u => u.id === id && !u.deletedAt);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found or already deleted`,
      code: 'NOT_FOUND'
    });
  }
  
  if (permanent === 'true') {
    // Permanent delete
    const deletedUser = users.splice(userIndex, 1)[0];
    const { password, ...safeUser } = deletedUser;
    
    return res.json({
      success: true,
      message: 'User permanently deleted',
      data: safeUser
    });
  }
  
  // Soft delete
  users[userIndex].deletedAt = new Date().toISOString();
  users[userIndex].status = 'deleted';
  
  const { password, ...safeUser } = users[userIndex];
  
  res.json({
    success: true,
    message: 'User archived successfully (soft delete)',
    data: safeUser
  });
});

/**
 * @route   HEAD /api/users/:id
 * @desc    Check if user exists
 * @access  Public
 */
router.head('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id && !u.deletedAt);
  
  if (!user) {
    return res.status(404).end();
  }
  
  res.set({
    'Content-Type': 'application/json',
    'X-User-Exists': 'true',
    'X-User-Status': user.status
  });
  
  res.status(200).end();
});

module.exports = router;
```

### Using the Router in Your App

```javascript
// app.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', usersRouter);

// Error handlers
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Testing Your API

You can test your API using various tools:

### Using cURL

```bash
# GET all users
curl http://localhost:3000/api/users

# GET single user
curl http://localhost:3000/api/users/abc123

# POST create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# PUT update user
curl -X PUT http://localhost:3000/api/users/abc123 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated","email":"john.updated@example.com","password":"newpassword123"}'

# PATCH partial update
curl -X PATCH http://localhost:3000/api/users/abc123 \
  -H "Content-Type: application/json" \
  -d '{"name":"John New Name"}'

# DELETE user
curl -X DELETE http://localhost:3000/api/users/abc123

# HEAD check user exists
curl -I http://localhost:3000/api/users/abc123
```

### Using JavaScript Fetch

```javascript
// GET request
const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users?page=1&limit=10');
  const data = await response.json();
  console.log(data);
};

// POST request
const createUser = async (userData) => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  console.log(data);
};

// PUT request
const updateUser = async (id, userData) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  console.log(data);
};

// DELETE request
const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log(data);
};
```

---

## Conclusion

This comprehensive guide covered all HTTP request methods in Node.js Express, including GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. We explored route parameters, query strings, request body handling, middleware patterns, error handling, and best practices for building production-ready APIs.

Key takeaways from this tutorial:

1. **Use the right HTTP method** for each operation: GET for reading, POST for creating, PUT for complete replacement, PATCH for partial updates, and DELETE for removal.

2. **Implement proper validation** for all inputs to ensure data integrity and security.

3. **Use middleware** for cross-cutting concerns like authentication, logging, and error handling.

4. **Handle errors gracefully** with appropriate status codes and meaningful error messages.

5. **Follow RESTful conventions** for consistent and predictable API design.

6. **Implement pagination, filtering, and sorting** for endpoints that return collections.

7. **Secure your API** with rate limiting, CORS, and security headers.

By following these patterns and practices, you can build robust, scalable, and maintainable Express APIs that are easy to use and maintain.
