# Mongoose A to Z: Complete Enterprise Guide with Express.js

## Table of Contents

1. [Introduction and Setup](#1-introduction-and-setup)
2. [Connection Management](#2-connection-management)
3. [Schema Definition Deep Dive](#3-schema-definition-deep-dive)
4. [All Schema Types Explained](#4-all-schema-types-explained)
5. [Validation](#5-validation)
6. [Middleware (Hooks)](#6-middleware-hooks)
7. [Indexes and Performance](#7-indexes-and-performance)
8. [Virtuals](#8-virtuals)
9. [Instance and Static Methods](#9-instance-and-static-methods)
10. [Query Helpers](#10-query-helpers)
11. [Population (References)](#11-population-references)
12. [Aggregation Pipeline](#12-aggregation-pipeline)
13. [Transactions](#13-transactions)
14. [Plugins](#14-plugins)
15. [Discriminators (Inheritance)](#15-discriminators-inheritance)
16. [Change Streams](#16-change-streams)
17. [Bulk Operations](#17-bulk-operations)
18. [Enterprise Patterns](#18-enterprise-patterns)
19. [Complete Express.js Integration](#19-complete-expressjs-integration)
20. [Best Practices](#20-best-practices)

---

## 1. Introduction and Setup

### What is Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model your application data, offering built-in type casting, validation, query building, and business logic hooks. Think of Mongoose as a translator between your JavaScript objects and MongoDB documents - it ensures your data follows specific rules before it reaches the database.

### Why Use Mongoose in Enterprise Applications?

In enterprise applications, data integrity and consistency are paramount. Mongoose provides several advantages: it enforces schemas in a database that is naturally schema-less, it provides validation at the application layer before data reaches the database, it offers middleware hooks for implementing business logic, and it includes powerful querying capabilities that abstract complex MongoDB operations into readable JavaScript code.

### Setting Up ES Modules

ES Modules (ECMAScript Modules) is the modern standard for organizing JavaScript code into reusable pieces. Unlike CommonJS (which uses `require` and `module.exports`), ES Modules use `import` and `export` statements, making code more readable and enabling tree-shaking for smaller bundles.

```json
// package.json
{
    "name": "enterprise-api",
    "version": "1.0.0",
    "type": "module",
    "main": "src/index.js",
    "scripts": {
        "start": "node src/index.js",
        "dev": "nodemon src/index.js"
    },
    "dependencies": {
        "express": "^4.18.2",
        "mongoose": "^8.0.0",
        "dotenv": "^16.3.1"
    }
}
```

### Project Structure for Enterprise Applications

A well-organized project structure is essential for maintainable enterprise applications. The following structure separates concerns clearly, making it easy for large teams to collaborate without conflicts:

```
project-root/
├── src/
│   ├── config/
│   │   ├── database.js        # Database connection configuration
│   │   ├── index.js           # App configuration
│   │   └── constants.js       # Application constants
│   ├── models/
│   │   ├── index.js           # Export all models
│   │   ├── User.js            # User model
│   │   ├── Product.js         # Product model
│   │   ├── Order.js           # Order model
│   │   └── plugins/
│   │       ├── pagination.js  # Pagination plugin
│   │       └── softDelete.js  # Soft delete plugin
│   ├── controllers/
│   │   ├── userController.js
│   │   └── productController.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── userService.js
│   │   └── emailService.js
│   ├── validators/
│   │   ├── userValidator.js
│   │   └── productValidator.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── helpers.js
│   └── index.js               # Application entry point
├── .env
├── .env.example
└── package.json
```

---

## 2. Connection Management

### Understanding MongoDB Connections

A MongoDB connection is a communication channel between your Node.js application and the MongoDB server. Proper connection management is crucial for enterprise applications because connections are expensive resources. Opening too many connections can overwhelm the database server, while too few can cause bottlenecks in your application.

### Basic Connection Setup

```javascript
// src/config/database.js
import mongoose from 'mongoose';

/**
 * Database Connection Configuration
 * 
 * This module handles all aspects of MongoDB connection including:
 * - Initial connection establishment
 * - Connection event monitoring
 * - Reconnection logic
 * - Graceful shutdown
 */

const connectDatabase = async () => {
    try {
        const connectionUri = process.env.MONGODB_URI;
        
        // Connection options explained:
        // - maxPoolSize: Maximum number of sockets in the connection pool
        // - minPoolSize: Minimum number of sockets maintained (helps with sudden traffic spikes)
        // - serverSelectionTimeoutMS: How long to wait for server selection
        // - socketTimeoutMS: How long before a socket times out
        // - connectTimeoutMS: How long to wait for initial connection
        const options = {
            maxPoolSize: 50,          // Enterprise standard: 50 connections
            minPoolSize: 10,          // Keep 10 connections ready
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
            family: 4                 // Force IPv4
        };

        await mongoose.connect(connectionUri, options);
        
        console.log('✅ MongoDB connected successfully');
        console.log(`   Database: ${mongoose.connection.name}`);
        console.log(`   Host: ${mongoose.connection.host}`);
        console.log(`   Port: ${mongoose.connection.port}`);
        
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Exit process on connection failure
    }
};

// Connection state monitoring
// These events help you understand the health of your database connection

mongoose.connection.on('connected', () => {
    console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('🚨 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ Mongoose disconnected from MongoDB');
});

// Important: If the Node process ends, close the Mongoose connection
// This ensures graceful shutdown and prevents corrupted data
const gracefulShutdown = async () => {
    try {
        await mongoose.connection.close();
        console.log('🔒 MongoDB connection closed through app termination');
        process.exit(0);
    } catch (error) {
        console.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
};

// Handle different termination signals
process.on('SIGINT', gracefulShutdown);   // Ctrl+C
process.on('SIGTERM', gracefulShutdown);  // kill command

export { connectDatabase, mongoose };
```

### Multiple Database Connections

Enterprise applications often need to connect to multiple databases - for example, separating read replicas from write operations, or isolating different services' data. Mongoose supports this through `createConnection`:

```javascript
// src/config/multiDatabase.js
import mongoose from 'mongoose';

/**
 * Multiple Database Connections
 * 
 * In enterprise applications, you might need:
 * - Primary database: For write operations
 * - Read replica: For read-heavy operations (reporting, analytics)
 * - Archive database: For historical data
 */

// Primary database connection
const primaryConnection = mongoose.createConnection(
    process.env.MONGODB_PRIMARY_URI,
    {
        maxPoolSize: 30,
        minPoolSize: 5
    }
);

// Read replica connection
const readReplicaConnection = mongoose.createConnection(
    process.env.MONGODB_REPLICA_URI,
    {
        maxPoolSize: 20,
        minPoolSize: 5,
        readPreference: 'secondaryPreferred' // Prefer reading from replicas
    }
);

// Archive database connection
const archiveConnection = mongoose.createConnection(
    process.env.MONGODB_ARCHIVE_URI,
    {
        maxPoolSize: 10,
        minPoolSize: 2
    }
);

// Connection event handlers for each database
const setupConnectionEvents = (connection, name) => {
    connection.on('connected', () => {
        console.log(`✅ ${name} database connected`);
    });
    
    connection.on('error', (err) => {
        console.error(`❌ ${name} database error:`, err);
    });
    
    connection.on('disconnected', () => {
        console.warn(`⚠️ ${name} database disconnected`);
    });
};

setupConnectionEvents(primaryConnection, 'Primary');
setupConnectionEvents(readReplicaConnection, 'Read Replica');
setupConnectionEvents(archiveConnection, 'Archive');

export { primaryConnection, readReplicaConnection, archiveConnection };
```

### Connection with Retry Logic

Network issues can cause connection failures. Implementing retry logic ensures your application can recover automatically:

```javascript
// src/config/databaseRetry.js
import mongoose from 'mongoose';

/**
 * Connection with Retry Logic
 * 
 * This is crucial for enterprise applications that need to be resilient
 * to temporary network issues or database restarts.
 */

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

const connectWithRetry = async (retries = MAX_RETRIES) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 50,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log('✅ MongoDB connected successfully');
        return true;
        
    } catch (error) {
        console.error(`❌ Connection attempt failed (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        console.error('   Error:', error.message);
        
        if (retries > 0) {
            console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
            
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return connectWithRetry(retries - 1);
        }
        
        throw new Error('Failed to connect to MongoDB after maximum retries');
    }
};

export { connectWithRetry };
```

---

## 3. Schema Definition Deep Dive

### What is a Schema?

A schema defines the structure of documents within a collection. It specifies the fields, their types, validation rules, default values, and other constraints. Think of a schema as a blueprint that ensures every document in your collection follows the same structure and rules.

### Anatomy of a Schema

```javascript
// src/models/User.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * User Schema Definition
 * 
 * This schema demonstrates all major schema features and explains
 * when and why to use each option in enterprise applications.
 */

const userSchema = new Schema({
    // ===========================================
    // BASIC FIELD DEFINITIONS
    // ===========================================
    
    // Simple field definition
    // This creates a field that accepts any string
    username: String,
    
    // Detailed field definition with options
    // Use this when you need validation, default values, or other constraints
    email: {
        type: String,                    // Data type
        required: [true, 'Email is required'],  // Required with custom error
        unique: true,                    // Create unique index
        lowercase: true,                 // Convert to lowercase before saving
        trim: true,                      // Remove whitespace
        index: true,                     // Create index for faster queries
        match: [                         // Regex validation
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please enter a valid email address'
        ]
    },
    
    // Password field with sensitive data handling
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        maxlength: [128, 'Password cannot exceed 128 characters'],
        select: false  // Exclude from queries by default (security best practice)
    },
    
    // ===========================================
    // NUMERIC FIELDS
    // ===========================================
    
    // Number fields with min/max validation
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [150, 'Age cannot exceed 150'],
        default: null
    },
    
    // Decimal numbers for financial data
    // Using Number for simple cases, but see Decimal128 for precision
    balance: {
        type: Number,
        min: 0,
        default: 0,
        get: (v) => Math.round(v * 100) / 100,  // Round to 2 decimal places
        set: (v) => Math.round(v * 100) / 100
    },
    
    // ===========================================
    // ENUMERATED FIELDS
    // ===========================================
    
    // Use enums when a field should only accept specific values
    // This prevents typos and ensures data consistency
    role: {
        type: String,
        enum: {
            values: ['user', 'admin', 'moderator', 'guest'],
            message: 'Role must be one of: user, admin, moderator, guest'
        },
        default: 'user'
    },
    
    // Status with more complex values
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'pending_verification'],
        default: 'pending_verification'
    },
    
    // ===========================================
    // BOOLEAN FIELDS
    // ===========================================
    
    isActive: {
        type: Boolean,
        default: true
    },
    
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    
    // ===========================================
    // DATE FIELDS
    // ===========================================
    
    // Date with default value
    lastLoginAt: {
        type: Date,
        default: null
    },
    
    // Date with min/max constraints
    birthDate: {
        type: Date,
        min: new Date(1900, 0, 1),       // Minimum date
        max: new Date()                   // Cannot be in the future
    },
    
    // ===========================================
    // ARRAY FIELDS
    // ===========================================
    
    // Simple array of strings
    tags: [String],
    
    // Array of numbers
    ratings: [Number],
    
    // Array of objects (subdocuments)
    addresses: [{
        label: {
            type: String,
            enum: ['home', 'work', 'other'],
            default: 'home'
        },
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }],
    
    // ===========================================
    // OBJECT ID REFERENCES
    // ===========================================
    
    // Single reference to another document
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        index: true
    },
    
    // Array of references
    teamIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }],
    
    // ===========================================
    // NESTED OBJECTS (Subdocuments)
    // ===========================================
    
    profile: {
        firstName: {
            type: String,
            trim: true,
            maxlength: 50
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 50
        },
        avatar: {
            url: String,
            publicId: String  // For cloud storage like Cloudinary
        },
        bio: {
            type: String,
            maxlength: 500
        },
        // Nested object within nested object
        preferences: {
            theme: {
                type: String,
                enum: ['light', 'dark', 'system'],
                default: 'system'
            },
            language: {
                type: String,
                default: 'en'
            },
            notifications: {
                email: { type: Boolean, default: true },
                push: { type: Boolean, default: true },
                sms: { type: Boolean, default: false }
            }
        }
    },
    
    // ===========================================
    // MAP TYPE (Dynamic Key-Value Pairs)
    // ===========================================
    
    // Use Map when you need to store arbitrary key-value pairs
    metadata: {
        type: Map,
        of: String
    },
    
    // ===========================================
    // MIXED TYPE (Any Data Type)
    // ===========================================
    
    // Use Mixed sparingly - it bypasses Mongoose validation
    // Useful for storing data with unpredictable structure
    settings: {
        type: Schema.Types.Mixed,
        default: {}
    }
    
}, {
    // ===========================================
    // SCHEMA OPTIONS
    // ===========================================
    
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
    
    // Version key (optimistic concurrency)
    // Set to false if you don't need versioning
    versionKey: '__v',
    
    // Strict mode: Only allow defined schema fields
    // Set to false to allow arbitrary fields
    strict: true,
    
    // Auto-index: Automatically create indexes
    // Set to false in production and create indexes manually
    autoIndex: process.env.NODE_ENV !== 'production',
    
    // Collection name (override default plural model name)
    collection: 'users',
    
    // Minimize: Don't save empty objects
    minimize: true,
    
    // ID: Add virtual 'id' field that returns _id as string
    id: true,
    
    // toJSON options
    toJSON: {
        virtuals: true,        // Include virtual properties
        getters: true,         // Apply getters
        transform: function(doc, ret) {
            // Remove sensitive fields from JSON output
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    },
    
    // toObject options
    toObject: {
        virtuals: true,
        getters: true
    }
});

// ===========================================
// EXPORT THE MODEL
// ===========================================

const User = mongoose.model('User', userSchema);

export default User;
```

### Schema Options Explained in Detail

```javascript
// src/models/examples/schemaOptions.js

/**
 * Schema Options Comprehensive Guide
 * 
 * Each option serves a specific purpose in enterprise applications.
 * Understanding these options helps you configure your schemas correctly.
 */

import mongoose from 'mongoose';
const { Schema } = mongoose;

// Example 1: Timestamps Configuration
const exampleSchema1 = new Schema({
    name: String
}, {
    // Option 1: Simple timestamps
    timestamps: true,
    // Creates: createdAt, updatedAt
    
    // Option 2: Custom timestamp field names
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    
    // Option 3: Custom timestamp options
    timestamps: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    }
});

// Example 2: Version Key
const exampleSchema2 = new Schema({
    name: String
}, {
    // The version key helps with optimistic concurrency
    // When you update a document, Mongoose checks the version
    // If versions don't match, the update fails
    versionKey: '__v',
    
    // Disable version key (not recommended for concurrent updates)
    // versionKey: false
});

// Example 3: Strict Mode
const exampleSchema3 = new Schema({
    name: String
}, {
    // Strict mode: Only fields defined in schema are saved
    strict: true,
    
    // Throw error for unknown fields
    // strict: 'throw',
    
    // Allow any fields (not recommended for production)
    // strict: false,
    
    // Strict mode for queries too
    strictQuery: true
});

// Example 4: Index Management
const exampleSchema4 = new Schema({
    email: { type: String, index: true },
    name: String
}, {
    // Auto-index is useful in development but can slow startup in production
    // Recommended: Set to true in dev, false in production
    autoIndex: process.env.NODE_ENV === 'development'
});

// Example 5: Custom Collection Name
const exampleSchema5 = new Schema({
    name: String
}, {
    // By default, Mongoose pluralizes the model name
    // Model: 'Person' -> Collection: 'people'
    // Use collection option to override
    collection: 'my_custom_collection_name'
});

// Example 6: Collation (for internationalization)
const exampleSchema6 = new Schema({
    name: String
}, {
    // Collation affects string comparisons and sorting
    // This is important for international applications
    collation: {
        locale: 'en',           // Language
        strength: 2,            // Case insensitive (1 or 2)
        caseLevel: false,
        numericOrdering: true   // "10" > "2" numerically
    }
});

export { 
    exampleSchema1, 
    exampleSchema2, 
    exampleSchema3, 
    exampleSchema4,
    exampleSchema5,
    exampleSchema6 
};
```

---

## 4. All Schema Types Explained

### Complete Schema Types Reference

Mongoose supports various data types that map to MongoDB's BSON types. Understanding each type helps you model your data correctly:

```javascript
// src/models/examples/schemaTypes.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Complete Schema Types Reference
 * 
 * Each type serves specific purposes in enterprise applications.
 * Choosing the right type is crucial for data integrity and performance.
 */

const allTypesSchema = new Schema({
    
    // ===========================================
    // STRING TYPE
    // ===========================================
    // Use for: Names, emails, descriptions, IDs from external systems
    
    stringField: {
        type: String,
        
        // String-specific options:
        lowercase: true,          // Convert to lowercase before save
        uppercase: false,         // Convert to uppercase before save
        trim: true,              // Remove leading/trailing whitespace
        enum: ['option1', 'option2'],  // Restrict to specific values
        match: /^[a-zA-Z]+$/,    // Regex validation
        minlength: 1,            // Minimum length
        maxlength: 100,          // Maximum length
        
        // Transform value before saving
        transform: (value) => value?.trim() || value
    },
    
    // ===========================================
    // NUMBER TYPE
    // ===========================================
    // Use for: Counts, ages, prices (with caution), quantities
    
    numberField: {
        type: Number,
        
        // Number-specific options:
        min: 0,                  // Minimum value
        max: 1000000,            // Maximum value
        enum: [1, 2, 3, 4, 5],   // Restrict to specific values
        default: 0,
        
        // Value transformation
        get: (v) => Math.round(v * 100) / 100,  // Round on retrieval
        set: (v) => Math.round(v * 100) / 100   // Round on save
    },
    
    // Integer (for whole numbers)
    integerField: {
        type: Number,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    },
    
    // ===========================================
    // DATE TYPE
    // ===========================================
    // Use for: Timestamps, expiration dates, birth dates
    
    dateField: {
        type: Date,
        
        // Date-specific options:
        min: new Date('1900-01-01'),  // Minimum date
        max: new Date('2100-12-31'),  // Maximum date
        default: Date.now,             // Default to current time
        
        // Custom validation for business rules
        validate: {
            validator: function(value) {
                // Example: Date must be in the future
                return value > new Date();
            },
            message: 'Date must be in the future'
        }
    },
    
    // ===========================================
    // BOOLEAN TYPE
    // ===========================================
    // Use for: Flags, toggle states, yes/no fields
    
    booleanField: {
        type: Boolean,
        default: false
    },
    
    // ===========================================
    // OBJECTID TYPE
    // ===========================================
    // Use for: References to other documents
    
    // Single reference
    singleRef: {
        type: Schema.Types.ObjectId,
        ref: 'User',             // Reference to User model
        refPath: 'refModel',     // Or use dynamic reference
        required: true
    },
    
    // Dynamic reference path
    dynamicRef: {
        item: { type: Schema.Types.ObjectId },
        itemType: { type: String, enum: ['Product', 'Service'] }
    },
    
    // Array of references
    refArray: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    
    // ===========================================
    // ARRAY TYPE
    // ===========================================
    // Use for: Lists, collections, multiple values
    
    // Simple array
    simpleArray: [String],
    
    // Number array
    numberArray: [Number],
    
    // Array of objects (subdocuments)
    objectArray: [{
        name: String,
        value: Number,
        createdAt: { type: Date, default: Date.now }
    }],
    
    // Array with validation
    validatedArray: {
        type: [String],
        validate: {
            validator: (arr) => arr.length <= 10,
            message: 'Array cannot have more than 10 items'
        }
    },
    
    // ===========================================
    // DECIMAL128 TYPE
    // ===========================================
    // Use for: Financial data, precise measurements
    // Important: Use Decimal128 for money to avoid floating-point errors
    
    priceField: {
        type: Schema.Types.Decimal128,
        get: (v) => v ? parseFloat(v.toString()) : null,
        set: (v) => v ? mongoose.Types.Decimal128.fromString(v.toFixed(2)) : null
    },
    
    // ===========================================
    // BUFFER TYPE
    // ===========================================
    // Use for: Binary data, file contents, encryption keys
    
    bufferField: {
        type: Buffer,
        // Can be useful for storing small files or encrypted data
    },
    
    // ===========================================
    // MIXED TYPE
    // ===========================================
    // Use for: Data with unpredictable structure, JSON blobs
    // Warning: No validation - use sparingly
    
    mixedField: {
        type: Schema.Types.Mixed,
        default: {}
    },
    
    // ===========================================
    // MAP TYPE
    // ===========================================
    // Use for: Key-value pairs, dynamic configurations
    
    mapField: {
        type: Map,
        of: String                // Value type
    },
    
    // Map with nested types
    complexMap: {
        type: Map,
        of: {
            value: String,
            timestamp: Date
        }
    },
    
    // ===========================================
    // UUID TYPE (Mongoose 6+)
    // ===========================================
    // Use for: Unique identifiers, external references
    
    uuidField: {
        type: Schema.Types.UUID,
        default: () => new mongoose.Types.UUID()
    },
    
    // ===========================================
    // BIGINT TYPE (Mongoose 6+)
    // ===========================================
    // Use for: Very large integers (JavaScript safe integer limit: 2^53-1)
    
    bigIntField: {
        type: Schema.Types.BigInt
    }

});

export default allTypesSchema;
```

### Enterprise Example: Financial Transaction Schema

```javascript
// src/models/Transaction.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Transaction Schema - Enterprise Financial Data Model
 * 
 * This schema demonstrates best practices for handling financial data:
 * - Using Decimal128 for precise monetary values
 * - Proper indexing for common queries
 * - Audit trail fields
 * - Status management with enums
 */

const transactionSchema = new Schema({
    // Transaction ID - human readable reference
    transactionId: {
        type: String,
        unique: true,
        required: true,
        default: () => `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    },
    
    // Amount with full precision (critical for financial applications)
    amount: {
        type: Schema.Types.Decimal128,
        required: [true, 'Transaction amount is required'],
        min: [0, 'Amount cannot be negative'],
        get: function(v) {
            // Convert Decimal128 to number for JSON output
            return v ? parseFloat(v.toString()) : null;
        }
    },
    
    // Currency code (ISO 4217)
    currency: {
        type: String,
        required: true,
        uppercase: true,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'CNY'],
        default: 'USD'
    },
    
    // Exchange rate for multi-currency support
    exchangeRate: {
        type: Schema.Types.Decimal128,
        default: mongoose.Types.Decimal128.fromString('1.00'),
        get: (v) => v ? parseFloat(v.toString()) : 1.0
    },
    
    // Converted amount in base currency
    baseCurrencyAmount: {
        type: Schema.Types.Decimal128,
        get: function(v) {
            return v ? parseFloat(v.toString()) : null;
        }
    },
    
    // Transaction type
    type: {
        type: String,
        required: true,
        enum: {
            values: ['credit', 'debit', 'transfer', 'refund', 'adjustment'],
            message: 'Invalid transaction type'
        }
    },
    
    // Status tracking
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'reversed'],
        default: 'pending'
    },
    
    // Parties involved
    sender: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        accountNumber: String,
        name: String
    },
    
    receiver: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        accountNumber: String,
        name: String
    },
    
    // Description and categorization
    description: {
        type: String,
        maxlength: 500,
        trim: true
    },
    
    category: {
        type: String,
        enum: ['payment', 'withdrawal', 'deposit', 'transfer', 'fee', 'interest', 'other'],
        default: 'other'
    },
    
    // Reference to related transactions
    parentTransaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    
    // Metadata
    metadata: {
        ipAddress: String,
        userAgent: String,
        deviceFingerprint: String,
        location: {
            latitude: Number,
            longitude: Number,
            city: String,
            country: String
        }
    },
    
    // Audit trail
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    processedAt: Date,
    processedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    // Soft delete
    isDeleted: {
        type: Boolean,
        default: false
    },
    
    deletedAt: Date,
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, {
    timestamps: true,
    collection: 'transactions',
    
    toJSON: {
        getters: true,
        virtuals: true,
        transform: function(doc, ret) {
            // Remove sensitive internal fields
            delete ret.__v;
            delete ret.isDeleted;
            return ret;
        }
    }
});

// Indexes for common queries
transactionSchema.index({ transactionId: 1 }, { unique: true });
transactionSchema.index({ 'sender.userId': 1, createdAt: -1 });
transactionSchema.index({ 'receiver.userId': 1, createdAt: -1 });
transactionSchema.index({ status: 1, createdAt: -1 });
transactionSchema.index({ type: 1, status: 1 });

// Compound index for reporting
transactionSchema.index({ 
    createdAt: 1, 
    currency: 1, 
    status: 1 
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
```

---

## 5. Validation

### Understanding Mongoose Validation

Validation ensures data integrity before it reaches the database. Mongoose provides built-in validators for common cases and allows custom validators for business-specific rules. In enterprise applications, validation serves as the first line of defense against bad data.

### Built-in Validators

```javascript
// src/models/examples/validation.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Validation Examples
 * 
 * This demonstrates all validation capabilities in Mongoose.
 * Validation runs automatically on save() and can be triggered manually.
 */

const validationExampleSchema = new Schema({
    
    // ===========================================
    // REQUIRED VALIDATOR
    // ===========================================
    // Ensures a field must be present
    
    requiredField: {
        type: String,
        required: [true, 'This field is required'],
        // Or use conditional required
        // required: function() {
        //     return this.status === 'published';
        // }
    },
    
    // Conditional required
    emailAddress: {
        type: String,
        required: function() {
            // Email required if user wants notifications
            return this.wantsNotifications === true;
        }
    },
    
    wantsNotifications: Boolean,
    
    // ===========================================
    // STRING VALIDATORS
    // ===========================================
    
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters'],
        trim: true,
        match: [
            /^[a-zA-Z0-9_]+$/,
            'Username can only contain letters, numbers, and underscores'
        ]
    },
    
    // Email with regex
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },
    
    // ===========================================
    // NUMBER VALIDATORS
    // ===========================================
    
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [120, 'Age seems unrealistic']
    },
    
    // Integer validation
    quantity: {
        type: Number,
        min: [0, 'Quantity cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be a whole number'
        }
    },
    
    // ===========================================
    // ENUM VALIDATOR
    // ===========================================
    // Restricts field to specific values
    
    status: {
        type: String,
        enum: {
            values: ['draft', 'published', 'archived', 'deleted'],
            message: 'Status must be one of: draft, published, archived, deleted'
        },
        default: 'draft'
    },
    
    // Multiple fields enum
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    
    // ===========================================
    // ARRAY VALIDATORS
    // ===========================================
    
    tags: {
        type: [String],
        validate: {
            validator: function(tags) {
                // Validate array length
                return tags.length <= 10;
            },
            message: 'Cannot have more than 10 tags'
        }
    },
    
    // Array with unique values
    uniqueTags: {
        type: [String],
        validate: {
            validator: function(tags) {
                return new Set(tags).size === tags.length;
            },
            message: 'Tags must be unique'
        }
    },
    
    // ===========================================
    // CUSTOM VALIDATORS
    // ===========================================
    
    // Custom validator function
    phone: {
        type: String,
        validate: {
            validator: function(value) {
                // US phone number format: (XXX) XXX-XXXX
                return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    
    // Async custom validator
    username: {
        type: String,
        validate: {
            validator: async function(value) {
                // Check if username already exists in database
                const user = await this.constructor.findOne({ username: value });
                return !user || user._id.equals(this._id);
            },
            message: 'Username already taken'
        }
    },
    
    // Validator with multiple checks
    password: {
        type: String,
        required: true,
        validate: [
            {
                validator: function(value) {
                    return value.length >= 8;
                },
                message: 'Password must be at least 8 characters'
            },
            {
                validator: function(value) {
                    return /[A-Z]/.test(value);
                },
                message: 'Password must contain at least one uppercase letter'
            },
            {
                validator: function(value) {
                    return /[a-z]/.test(value);
                },
                message: 'Password must contain at least one lowercase letter'
            },
            {
                validator: function(value) {
                    return /[0-9]/.test(value);
                },
                message: 'Password must contain at least one number'
            },
            {
                validator: function(value) {
                    return /[!@#$%^&*]/.test(value);
                },
                message: 'Password must contain at least one special character'
            }
        ]
    },
    
    // ===========================================
    // DATE VALIDATORS
    // ===========================================
    
    birthDate: {
        type: Date,
        min: [new Date(1900, 0, 1), 'Birth date cannot be before 1900'],
        max: [new Date(), 'Birth date cannot be in the future']
    },
    
    // Date range validation
    eventDate: {
        type: Date,
        validate: {
            validator: function(value) {
                // Event must be at least 24 hours in the future
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return value > tomorrow;
            },
            message: 'Event date must be at least 24 hours in the future'
        }
    },
    
    // ===========================================
    // OBJECTID VALIDATOR
    // ===========================================
    
    userId: {
        type: Schema.Types.ObjectId,
        validate: {
            validator: function(value) {
                // Check if it's a valid ObjectId
                return mongoose.Types.ObjectId.isValid(value);
            },
            message: 'Invalid user ID format'
        }
    }

});

export default validationExampleSchema;
```

### Custom Validation Class for Enterprise

```javascript
// src/validators/customValidators.js

/**
 * Reusable Custom Validators
 * 
 * Enterprise applications benefit from reusable validation functions
 * that can be shared across multiple schemas.
 */

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (number) => {
    const digits = number.replace(/\D/g, '');
    
    if (digits.length < 13 || digits.length > 19) {
        return false;
    }
    
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
};

// Password strength validator
export const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUppercase && 
           hasLowercase && 
           hasNumber && 
           hasSpecial;
};

// URL validator
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Phone number validator (international)
export const isValidPhoneNumber = (phone) => {
    // E.164 format: +[country code][number]
    return /^\+[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''));
};

// Slug validator
export const isValidSlug = (slug) => {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};

// JSON validator
export const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};

// Date range validator
export const isDateInRange = (date, minDate, maxDate) => {
    const d = new Date(date);
    return d >= new Date(minDate) && d <= new Date(maxDate);
};

// Array size validator
export const isArraySizeInRange = (arr, min, max) => {
    return Array.isArray(arr) && arr.length >= min && arr.length <= max;
};

// Unique array validator
export const isArrayUnique = (arr) => {
    return Array.isArray(arr) && new Set(arr).size === arr.length;
};

// Email domain validator (for corporate emails)
export const isCorporateEmail = (email, allowedDomains) => {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
};

// Username validator
export const isValidUsername = (username) => {
    // Alphanumeric, underscores, and dots
    // No consecutive dots or underscores
    // No leading/trailing dots or underscores
    const pattern = /^(?!.*[_.]{2})[a-zA-Z0-9._](?![_.]$)[a-zA-Z0-9._]{1,28}[a-zA-Z0-9]$/;
    return pattern.test(username);
};
```

### Using Custom Validators in Schema

```javascript
// src/models/User.js
import mongoose from 'mongoose';
import { 
    isStrongPassword, 
    isValidPhoneNumber,
    isValidUsername 
} from '../validators/customValidators.js';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        validate: {
            validator: isValidUsername,
            message: 'Username must be 3-30 characters, alphanumeric with optional dots and underscores'
        }
    },
    
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: isStrongPassword,
            message: 'Password must contain uppercase, lowercase, number, and special character'
        }
    },
    
    phone: {
        type: String,
        validate: {
            validator: isValidPhoneNumber,
            message: 'Phone number must be in E.164 format (+1234567890)'
        }
    }
});

export default mongoose.model('User', userSchema);
```

---

## 6. Middleware (Hooks)

### Understanding Mongoose Middleware

Middleware (also called hooks) are functions that run at specific stages of a document's lifecycle. They're essential for implementing business logic, data transformations, and maintaining data integrity. Think of middleware as automatic actions that happen before or after database operations.

### Types of Middleware

```javascript
// src/models/examples/middleware.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

/**
 * Middleware (Hooks) Comprehensive Guide
 * 
 * Middleware types:
 * 1. Document middleware: runs on document operations (save, validate, remove)
 * 2. Query middleware: runs on query operations (find, update, delete)
 * 3. Aggregate middleware: runs on aggregation pipelines
 * 4. Model middleware: runs on model methods
 */

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActive: { type: Boolean, default: true },
    role: { type: String, default: 'user' },
    lastLoginAt: Date,
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date
}, { timestamps: true });

// ===========================================
// DOCUMENT MIDDLEWARE
// ===========================================

// PRE SAVE - Runs before saving a document
// Use for: Hashing passwords, generating slugs, setting defaults

userSchema.pre('save', async function(next) {
    // Only run if password was modified
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost factor of 12
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        
        // Set password changed timestamp
        if (!this.isNew) {
            this.passwordChangedAt = new Date();
        }
        
        next();
    } catch (error) {
        next(error);
    }
});

// POST SAVE - Runs after saving a document
// Use for: Sending notifications, logging, cache invalidation

userSchema.post('save', function(doc, next) {
    // Don't block the response, just log
    console.log(`User saved: ${doc._id} - ${doc.email}`);
    
    // You could emit events, send emails, etc.
    // emitUserEvent('user.created', doc);
    
    next();
});

// Error handling in post save
userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        next(new Error(`${field} already exists`));
    } else {
        next(error);
    }
});

// PRE VALIDATE - Runs before validation
// Use for: Data normalization before validation

userSchema.pre('validate', function(next) {
    // Normalize email
    if (this.email) {
        this.email = this.email.toLowerCase().trim();
    }
    
    // Generate username from email if not provided
    if (!this.username && this.email) {
        this.username = this.email.split('@')[0];
    }
    
    next();
});

// POST VALIDATE - Runs after validation
// Use for: Additional checks after validation passes

userSchema.post('validate', function(doc, next) {
    console.log('Document validated successfully');
    next();
});

// PRE REMOVE - Runs before removing
// Use for: Cleanup, cascade delete

userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    // Delete related documents
    const userId = this._id;
    
    await mongoose.model('Post').deleteMany({ author: userId });
    await mongoose.model('Comment').deleteMany({ author: userId });
    await mongoose.model('Session').deleteMany({ userId: userId });
    
    console.log(`Cleaned up data for user: ${userId}`);
    next();
});

// POST REMOVE - Runs after removing
userSchema.post('deleteOne', { document: true, query: false }, function(doc, next) {
    console.log(`User deleted: ${doc._id}`);
    next();
});

// ===========================================
// QUERY MIDDLEWARE
// ===========================================

// PRE FIND - Runs before find queries
// Use for: Filtering soft-deleted docs, population

// Apply to all find methods
userSchema.pre(/^find/, function(next) {
    // Exclude soft-deleted documents
    this.where({ isActive: { $ne: false } });
    
    // Default population
    this.populate({
        path: 'profile',
        select: 'firstName lastName avatar'
    });
    
    next();
});

// Specific find middleware
userSchema.pre('findOne', function(next) {
    // Additional population for single doc queries
    this.populate('settings');
    next();
});

// POST FIND - Runs after find queries
userSchema.post(/^find/, function(docs, next) {
    // Log query duration
    console.log(`Query took ${this.options.queryTime || 0}ms`);
    next();
});

// PRE UPDATE - Runs before update operations
userSchema.pre('findOneAndUpdate', function(next) {
    // Add updatedAt timestamp
    this.set({ updatedAt: new Date() });
    
    // Get the update object
    const update = this.getUpdate();
    
    // If updating password, hash it
    if (update.password) {
        // Note: This won't work directly - need manual hashing
        // In this case, better to use save() for password changes
    }
    
    next();
});

// POST UPDATE
userSchema.post('findOneAndUpdate', function(doc, next) {
    console.log(`Document updated: ${doc._id}`);
    next();
});

// ===========================================
// AGGREGATE MIDDLEWARE
// ===========================================

userSchema.pre('aggregate', function(next) {
    // Add a match stage to exclude inactive users
    // This ensures all aggregations filter out inactive users by default
    
    const pipeline = this.pipeline();
    
    // Check if there's already a $match stage
    const hasMatch = pipeline.some(stage => '$match' in stage);
    
    if (!hasMatch) {
        this.pipeline().unshift({ $match: { isActive: true } });
    }
    
    next();
});

// ===========================================
// MODEL MIDDLEWARE
// ===========================================

// Static method with middleware-like behavior
userSchema.statics.findByEmail = async function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

// Static method for authentication
userSchema.statics.authenticate = async function(email, password) {
    const user = await this.findOne({ email: email.toLowerCase() })
        .select('+password +loginAttempts +lockUntil');
    
    if (!user) {
        throw new Error('Invalid credentials');
    }
    
    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
        throw new Error('Account is temporarily locked');
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        // Increment login attempts
        user.loginAttempts += 1;
        
        // Lock after 5 failed attempts
        if (user.loginAttempts >= 5) {
            user.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
        }
        
        await user.save();
        throw new Error('Invalid credentials');
    }
    
    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLoginAt = new Date();
    await user.save();
    
    return user;
};

const User = mongoose.model('User', userSchema);

export default User;
```

### Advanced Middleware Patterns

```javascript
// src/models/plugins/auditPlugin.js

/**
 * Audit Plugin
 * 
 * Automatically tracks who created and modified documents.
 * This is a common requirement in enterprise applications.
 */

const auditPlugin = (schema, options = {}) => {
    // Add audit fields
    schema.add({
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: options.userModel || 'User'
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: options.userModel || 'User'
        },
        auditLog: [{
            action: {
                type: String,
                enum: ['create', 'update', 'delete']
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: options.userModel || 'User'
            },
            timestamp: { type: Date, default: Date.now },
            changes: mongoose.Schema.Types.Mixed
        }]
    });
    
    // Track who created the document
    schema.pre('save', function(next) {
        if (this.isNew && options.getCurrentUser) {
            this.createdBy = options.getCurrentUser();
        }
        next();
    });
    
    // Track updates
    schema.pre('findOneAndUpdate', function(next) {
        if (options.getCurrentUser) {
            this.set({ updatedBy: options.getCurrentUser() });
        }
        next();
    });
    
    // Log changes
    schema.post('save', function(doc) {
        if (options.enableChangeLog) {
            const changes = doc.modifiedPaths();
            if (changes.length > 0) {
                doc.auditLog.push({
                    action: doc.isNew ? 'create' : 'update',
                    userId: options.getCurrentUser?.(),
                    changes: changes.reduce((acc, path) => {
                        acc[path] = doc[path];
                        return acc;
                    }, {})
                });
            }
        }
    });
};

export default auditPlugin;
```

---

## 7. Indexes and Performance

### Understanding MongoDB Indexes

Indexes are special data structures that store a small portion of the collection's data set in an easy-to-traverse form. Without indexes, MongoDB must scan every document in a collection to find matching documents, which is inefficient for large datasets. Understanding indexes is crucial for building performant enterprise applications.

### Types of Indexes

```javascript
// src/models/examples/indexes.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Index Types and Strategies
 * 
 * Proper indexing is critical for application performance.
 * This demonstrates all index types and when to use each.
 */

const productSchema = new Schema({
    name: String,
    sku: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    tags: [String],
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    attributes: {
        color: String,
        size: String,
        material: String
    },
    stock: Number,
    status: String,
    createdAt: Date,
    updatedAt: Date
});

// ===========================================
// SINGLE FIELD INDEX
// ===========================================
// Use for: Queries filtering on a single field

// Method 1: In schema definition
// name: { type: String, index: true }

// Method 2: Using index method
productSchema.index({ name: 1 });        // Ascending
productSchema.index({ price: -1 });      // Descending

// ===========================================
// COMPOUND INDEX
// ===========================================
// Use for: Queries filtering on multiple fields
// Important: Order matters! Put most selective field first

productSchema.index({ category: 1, brand: 1 });  // category + brand queries
productSchema.index({ status: 1, createdAt: -1 }); // status + date sorting

// Compound index for common query pattern
// Query: { category: 'electronics', status: 'active' }, sort: { price: -1 }
productSchema.index({ category: 1, status: 1, price: -1 });

// ===========================================
// UNIQUE INDEX
// ===========================================
// Use for: Fields that must have unique values

productSchema.index({ sku: 1 }, { unique: true });

// Unique compound index
// productSchema.index({ category: 1, sku: 1 }, { unique: true });

// ===========================================
// PARTIAL INDEX
// ===========================================
// Use for: Indexing a subset of documents
// Reduces index size and improves performance

productSchema.index(
    { status: 1, createdAt: -1 },
    { 
        partialFilterExpression: { 
            status: { $in: ['active', 'featured'] } 
        } 
    }
);

// ===========================================
// TEXT INDEX
// ===========================================
// Use for: Full-text search

productSchema.index(
    { name: 'text', description: 'text', brand: 'text' },
    { 
        weights: {
            name: 10,          // Higher weight = more important
            description: 5,
            brand: 3
        },
        name: 'ProductTextIndex'
    }
);

// ===========================================
// GEOSPATIAL INDEX
// ===========================================
// Use for: Location-based queries

// 2dsphere for GeoJSON
productSchema.index({ location: '2dsphere' });

// 2d for legacy coordinate pairs
// productSchema.index({ location: '2d' });

// ===========================================
// TTL INDEX
// ===========================================
// Use for: Auto-expiring documents (sessions, cache, logs)

productSchema.index(
    { createdAt: 1 },
    { 
        expireAfterSeconds: 86400,  // Delete after 24 hours
        name: 'TTLIndex'
    }
);

// ===========================================
// HASHED INDEX
// ===========================================
// Use for: Sharding and exact match queries

productSchema.index({ category: 'hashed' });

// ===========================================
// SPARSE INDEX
// ===========================================
// Use for: Optional fields (only index documents with the field)

productSchema.index({ brand: 1 }, { sparse: true });

// ===========================================
// WILDCARD INDEX
// ===========================================
// Use for: Indexing all fields in a document or subdocument

productSchema.index({ 'attributes.$**': 1 });

// ===========================================
// CASE-INSENSITIVE INDEX
// ===========================================

productSchema.index(
    { name: 1 },
    { 
        collation: { 
            locale: 'en', 
            strength: 2  // Case-insensitive
        } 
    }
);

// ===========================================
// INDEX OPTIONS
// ===========================================

productSchema.index(
    { category: 1 },
    {
        name: 'categoryIndex',     // Custom index name
        background: true,          // Build in background (don't block operations)
        unique: false,
        sparse: false,
        expireAfterSeconds: null,
        partialFilterExpression: null
    }
);

// ===========================================
// DROP INDEXES
// ===========================================

// Drop specific index
// productSchema.dropIndex('categoryIndex');

// Drop all indexes (except _id)
// productSchema.clearIndexes();

const Product = mongoose.model('Product', productSchema);

export default Product;
```

### Index Management in Enterprise

```javascript
// src/config/indexManager.js
import mongoose from 'mongoose';

/**
 * Index Manager
 * 
 * Manages index creation and monitoring for enterprise applications.
 * In production, create indexes during deployment, not at runtime.
 */

class IndexManager {
    
    /**
     * Create all indexes for a model
     * Call this during deployment or application startup
     */
    static async ensureIndexes(model) {
        try {
            const result = await model.ensureIndexes();
            console.log(`✅ Indexes created for ${model.modelName}`);
            return result;
        } catch (error) {
            console.error(`❌ Error creating indexes for ${model.modelName}:`, error);
            throw error;
        }
    }
    
    /**
     * Get index information for a collection
     */
    static async getIndexes(model) {
        const indexes = await model.collection.indexes();
        return indexes.map(index => ({
            name: index.name,
            key: index.key,
            unique: index.unique || false,
            sparse: index.sparse || false,
            size: index.size || 'N/A'
        }));
    }
    
    /**
     * Get index usage statistics
     */
    static async getIndexStats(model) {
        const stats = await model.collection.aggregate([
            { $indexStats: {} }
        ]).toArray();
        
        return stats.map(stat => ({
            name: stat.name,
            accesses: stat.accesses.ops,
            since: stat.accesses.since
        }));
    }
    
    /**
     * Find unused indexes
     */
    static async findUnusedIndexes(model) {
        const stats = await this.getIndexStats(model);
        return stats.filter(stat => stat.accesses === 0);
    }
    
    /**
     * Analyze query performance (explain plan)
     */
    static async explainQuery(query) {
        const explanation = await query.explain('executionStats');
        return {
            winningPlan: explanation.queryPlanner.winningPlan,
            executionTime: explanation.executionStats.executionTimeMillis,
            documentsExamined: explanation.executionStats.totalDocsExamined,
            documentsReturned: explanation.executionStats.nReturned,
            indexUsed: explanation.queryPlanner.winningPlan.inputStage?.indexName || 'COLLSCAN'
        };
    }
    
    /**
     * Create indexes for all models
     */
    static async createAllIndexes(models) {
        const results = [];
        
        for (const [name, model] of Object.entries(models)) {
            try {
                await this.ensureIndexes(model);
                results.push({ model: name, status: 'success' });
            } catch (error) {
                results.push({ model: name, status: 'error', error: error.message });
            }
        }
        
        return results;
    }
}

export default IndexManager;
```

### Performance Optimization Example

```javascript
// src/services/productSearchService.js
import Product from '../models/Product.js';

/**
 * Product Search Service
 * 
 * Demonstrates optimized queries using proper indexing
 */

class ProductSearchService {
    
    /**
     * Search products with optimized query
     * Uses text index for full-text search
     */
    static async searchProducts(searchTerm, options = {}) {
        const { page = 1, limit = 20, category, minPrice, maxPrice } = options;
        
        const query = {};
        
        // Text search
        if (searchTerm) {
            query.$text = { $search: searchTerm };
        }
        
        // Additional filters (uses compound index)
        if (category) query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }
        
        const skip = (page - 1) * limit;
        
        // Projection to reduce data transfer
        const projection = {
            name: 1,
            price: 1,
            category: 1,
            brand: 1,
            status: 1
        };
        
        // Use lean() for read-only queries (faster, returns plain objects)
        const [products, total] = await Promise.all([
            Product.find(query, projection)
                .skip(skip)
                .limit(limit)
                .sort({ score: { $meta: 'textScore' } })
                .lean(),
            Product.countDocuments(query)
        ]);
        
        return {
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    
    /**
     * Find products near a location (geospatial)
     */
    static async findNearby(coordinates, maxDistance = 10000) {
        // maxDistance in meters
        return Product.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates
                    },
                    $maxDistance: maxDistance
                }
            }
        }).lean();
    }
    
    /**
     * Find products within a polygon
     */
    static async findWithinPolygon(polygon) {
        return Product.find({
            location: {
                $geoWithin: {
                    $geometry: {
                        type: 'Polygon',
                        coordinates: polygon
                    }
                }
            }
        }).lean();
    }
    
    /**
     * Bulk update with optimized query
     */
    static async bulkUpdatePrices(updates) {
        const bulkOps = updates.map(({ id, price }) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { price } }
            }
        }));
        
        return Product.bulkWrite(bulkOps, { ordered: false });
    }
}

export default ProductSearchService;
```

---

## 8. Virtuals

### Understanding Virtuals

Virtuals are document properties that are not stored in MongoDB. They are computed on-the-fly when you access them. Virtuals are useful for deriving values from existing fields, formatting data for display, or creating computed properties without duplicating data in the database.

```javascript
// src/models/Person.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Virtual Properties Example
 * 
 * Virtuals are computed properties that don't persist to the database.
 * They're useful for:
 * - Computed fields (full name from first + last)
 * - URL generation
 * - Formatted dates
 * - Relationships between documents
 */

const personSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    birthDate: Date,
    avatar: String,
    bio: String,
    socialLinks: {
        twitter: String,
        linkedin: String,
        github: String,
        website: String
    },
    // Reference to posts
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true,
    // Must enable virtuals for JSON output
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ===========================================
// GETTER VIRTUALS
// ===========================================

// Full name virtual
personSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Initials virtual
personSchema.virtual('initials').get(function() {
    return `${this.firstName?.[0] || ''}${this.lastName?.[0] || ''}`.toUpperCase();
});

// Age virtual (computed from birthDate)
personSchema.virtual('age').get(function() {
    if (!this.birthDate) return null;
    
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
});

// Avatar URL with default
personSchema.virtual('avatarUrl').get(function() {
    if (this.avatar) return this.avatar;
    
    // Generate Gravatar URL as default
    const crypto = await import('crypto');
    const hash = crypto.createHash('md5').update(this.email.toLowerCase()).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
});

// Formatted birth date
personSchema.virtual('formattedBirthDate').get(function() {
    if (!this.birthDate) return null;
    
    return new Date(this.birthDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Profile completion percentage
personSchema.virtual('profileCompletion').get(function() {
    const fields = ['firstName', 'lastName', 'email', 'bio', 'avatar'];
    const socialFields = ['twitter', 'linkedin', 'github', 'website'];
    
    let completed = 0;
    let total = fields.length + socialFields.length;
    
    // Check basic fields
    fields.forEach(field => {
        if (this[field]) completed++;
    });
    
    // Check social links
    socialFields.forEach(field => {
        if (this.socialLinks?.[field]) completed++;
    });
    
    return Math.round((completed / total) * 100);
});

// ===========================================
// SETTER VIRTUALS
// ===========================================

// Set full name (splits into first and last)
personSchema.virtual('setName').set(function(fullName) {
    const parts = fullName.trim().split(/\s+/);
    this.firstName = parts[0];
    this.lastName = parts.slice(1).join(' ') || '';
});

// ===========================================
// VIRTUAL POPULATE
// ===========================================
// Virtuals that reference other collections

// Posts count (virtual populate)
personSchema.virtual('postsCount', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author',
    count: true  // Only return count, not documents
});

// Latest posts
personSchema.virtual('latestPosts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author',
    justOne: false,
    options: { 
        sort: { createdAt: -1 },
        limit: 5 
    }
});

// Comments (nested reference)
personSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'author'
});

const Person = mongoose.model('Person', personSchema);

export default Person;
```

### Using Virtuals in Express Routes

```javascript
// src/routes/personRoutes.js
import express from 'express';
import Person from '../models/Person.js';

const router = express.Router();

// Get person with virtual properties
router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id)
            .populate('posts')
            .populate('postsCount')
            .populate('latestPosts');
        
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        
        // Virtuals are automatically included in JSON output
        res.json({
            person,
            // Can also access virtuals explicitly
            fullName: person.fullName,
            age: person.age,
            initials: person.initials,
            profileCompletion: person.profileCompletion
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create person using setter virtual
router.post('/', async (req, res) => {
    try {
        const person = new Person();
        
        // Use setter virtual
        person.setName = req.body.fullName;
        person.email = req.body.email;
        person.birthDate = req.body.birthDate;
        
        await person.save();
        
        res.status(201).json(person);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
```

---

*This tutorial continues with more sections covering Methods, Query Helpers, Population, Aggregation, Transactions, and complete Express.js integration...*

---

## 13. Transactions

### Understanding MongoDB Transactions

Transactions allow you to perform multiple operations as a single atomic unit - either all operations succeed, or none do. This is crucial for enterprise applications where data consistency is paramount. Transactions are particularly useful when updating multiple documents or collections simultaneously.

### Basic Transaction Implementation

```javascript
// src/services/transactionService.js
import mongoose from 'mongoose';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Inventory from '../models/Inventory.js';

/**
 * Transaction Examples
 * 
 * Demonstrates how to use MongoDB transactions
 * for maintaining data consistency.
 */
class TransactionService {
    
    /**
     * Transfer funds between users
     * Example of atomic operation with rollback
     */
    static async transferFunds(fromUserId, toUserId, amount) {
        const session = await mongoose.startSession();
        
        try {
            // Start transaction
            session.startTransaction();
            
            // 1. Debit from sender
            const sender = await User.findById(fromUserId).session(session);
            
            if (!sender) {
                throw new Error('Sender not found');
            }
            
            if (sender.balance < amount) {
                throw new Error('Insufficient funds');
            }
            
            sender.balance -= amount;
            await sender.save({ session });
            
            // 2. Credit to receiver
            const receiver = await User.findByIdAndUpdate(
                toUserId,
                { $inc: { balance: amount } },
                { new: true, session }
            );
            
            if (!receiver) {
                throw new Error('Receiver not found');
            }
            
            // 3. Create transaction record
            const transaction = await Transaction.create([{
                type: 'transfer',
                from: fromUserId,
                to: toUserId,
                amount,
                status: 'completed'
            }], { session });
            
            // Commit transaction
            await session.commitTransaction();
            
            return {
                success: true,
                transaction: transaction[0],
                senderBalance: sender.balance,
                receiverBalance: receiver.balance
            };
            
        } catch (error) {
            // Abort transaction on error
            await session.abortTransaction();
            
            console.error('Transfer failed:', error.message);
            throw error;
            
        } finally {
            // End session
            session.endSession();
        }
    }
    
    /**
     * Create order with inventory update
     * Ensures product availability is reserved atomically
     */
    static async createOrderWithInventory(userId, items) {
        const session = await mongoose.startSession();
        
        try {
            session.startTransaction();
            
            // Verify and reserve inventory
            const reservedItems = [];
            
            for (const item of items) {
                const product = await Product.findById(item.productId).session(session);
                
                if (!product) {
                    throw new Error(`Product ${item.productId} not found`);
                }
                
                // Check inventory
                const inventory = await Inventory.findOne({
                    product: item.productId
                }).session(session);
                
                if (!inventory || inventory.quantity < item.quantity) {
                    throw new Error(`Insufficient stock for ${product.name}`);
                }
                
                // Reserve inventory
                inventory.quantity -= item.quantity;
                inventory.reserved += item.quantity;
                await inventory.save({ session });
                
                reservedItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                    total: product.price * item.quantity
                });
            }
            
            // Calculate totals
            const subtotal = reservedItems.reduce((sum, item) => sum + item.total, 0);
            const tax = subtotal * 0.1; // 10% tax
            const total = subtotal + tax;
            
            // Create order
            const [order] = await Order.create([{
                user: userId,
                items: reservedItems,
                subtotal,
                tax,
                total,
                status: 'pending'
            }], { session });
            
            // Commit transaction
            await session.commitTransaction();
            
            return {
                success: true,
                order,
                message: 'Order created successfully'
            };
            
        } catch (error) {
            await session.abortTransaction();
            throw error;
            
        } finally {
            session.endSession();
        }
    }
    
    /**
     * Cancel order and restore inventory
     */
    static async cancelOrder(orderId) {
        const session = await mongoose.startSession();
        
        try {
            session.startTransaction();
            
            // Find order
            const order = await Order.findById(orderId).session(session);
            
            if (!order) {
                throw new Error('Order not found');
            }
            
            if (order.status === 'cancelled') {
                throw new Error('Order already cancelled');
            }
            
            if (order.status === 'shipped') {
                throw new Error('Cannot cancel shipped order');
            }
            
            // Restore inventory
            for (const item of order.items) {
                const inventory = await Inventory.findOne({
                    product: item.productId
                }).session(session);
                
                if (inventory) {
                    inventory.quantity += item.quantity;
                    inventory.reserved -= item.quantity;
                    await inventory.save({ session });
                }
            }
            
            // Update order status
            order.status = 'cancelled';
            order.cancelledAt = new Date();
            await order.save({ session });
            
            // Create refund record if payment was made
            if (order.paymentStatus === 'paid') {
                await Refund.create([{
                    order: orderId,
                    amount: order.total,
                    status: 'processing'
                }], { session });
            }
            
            await session.commitTransaction();
            
            return {
                success: true,
                order,
                message: 'Order cancelled successfully'
            };
            
        } catch (error) {
            await session.abortTransaction();
            throw error;
            
        } finally {
            session.endSession();
        }
    }
    
    /**
     * Bulk update with transaction
     */
    static async bulkUpdateWithTransaction(updates) {
        const session = await mongoose.startSession();
        
        try {
            session.startTransaction();
            
            const results = [];
            
            for (const update of updates) {
                const { model, id, data } = update;
                
                const Model = mongoose.model(model);
                const doc = await Model.findByIdAndUpdate(
                    id,
                    { $set: data },
                    { new: true, session }
                );
                
                if (!doc) {
                    throw new Error(`${model} with ID ${id} not found`);
                }
                
                results.push(doc);
            }
            
            await session.commitTransaction();
            
            return {
                success: true,
                updated: results.length,
                data: results
            };
            
        } catch (error) {
            await session.abortTransaction();
            throw error;
            
        } finally {
            session.endSession();
        }
    }
}

export default TransactionService;
```

### Transaction Helper Utility

```javascript
// src/utils/transactionHelper.js
import mongoose from 'mongoose';

/**
 * Transaction Helper
 * 
 * Provides utility functions for working with transactions
 */
class TransactionHelper {
    
    /**
     * Execute function within transaction
     * Simplifies transaction handling
     */
    static async withTransaction(callback, options = {}) {
        const session = await mongoose.startSession();
        
        try {
            session.startTransaction(options);
            
            const result = await callback(session);
            
            await session.commitTransaction();
            
            return result;
            
        } catch (error) {
            await session.abortTransaction();
            throw error;
            
        } finally {
            session.endSession();
        }
    }
    
    /**
     * Retry transaction on failure
     */
    static async withRetry(callback, maxRetries = 3) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await this.withTransaction(callback);
            } catch (error) {
                lastError = error;
                
                // Only retry on transient errors
                if (error.hasErrorLabel && error.hasErrorLabel('TransientTransactionError')) {
                    console.log(`Transaction attempt ${attempt} failed, retrying...`);
                    await new Promise(resolve => setTimeout(resolve, 100 * attempt));
                } else {
                    throw error;
                }
            }
        }
        
        throw lastError;
    }
    
    /**
     * Execute multiple operations in transaction
     */
    static async executeOperations(operations) {
        return this.withTransaction(async (session) => {
            const results = [];
            
            for (const op of operations) {
                const { model, operation, filter, data } = op;
                const Model = mongoose.model(model);
                
                let result;
                
                switch (operation) {
                    case 'create':
                        [result] = await Model.create([data], { session });
                        break;
                    case 'update':
                        result = await Model.findOneAndUpdate(
                            filter,
                            { $set: data },
                            { new: true, session }
                        );
                        break;
                    case 'delete':
                        result = await Model.findOneAndDelete(filter, { session });
                        break;
                    default:
                        throw new Error(`Unknown operation: ${operation}`);
                }
                
                results.push(result);
            }
            
            return results;
        });
    }
}

export default TransactionHelper;

// Usage example:
/*
const result = await TransactionHelper.withTransaction(async (session) => {
    const user = await User.create([{ name: 'John' }], { session });
    const profile = await Profile.create([{ userId: user[0]._id }], { session });
    return { user: user[0], profile: profile[0] };
});
*/
```

---

## 14. Plugins

### Understanding Mongoose Plugins

Plugins are reusable schema extensions that add functionality to your models. They're essential for enterprise applications where you need consistent behavior across multiple models, such as pagination, soft deletes, and audit trails.

### Custom Plugins

```javascript
// src/models/plugins/paginationPlugin.js

/**
 * Pagination Plugin
 * 
 * Adds pagination capabilities to any model.
 * This is essential for enterprise applications dealing with large datasets.
 */
const paginationPlugin = (schema, options = {}) => {
    
    /**
     * Static method: paginate
     * @param {Object} filter - Query filter
     * @param {Object} options - Pagination options
     * @returns {Promise<Object>} - Paginated results
     */
    schema.statics.paginate = async function(filter = {}, options = {}) {
        const {
            page = 1,
            limit = 10,
            sort = '-createdAt',
            select = '',
            populate = '',
            lean = true
        } = options;
        
        const skip = (page - 1) * limit;
        
        // Build query
        let query = this.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        
        if (select) query = query.select(select);
        if (populate) query = query.populate(populate);
        if (lean) query = query.lean();
        
        // Execute queries in parallel
        const [data, total] = await Promise.all([
            query.exec(),
            this.countDocuments(filter)
        ]);
        
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1
            }
        };
    };
    
    /**
     * Static method: paginateAggregate
     * Paginate aggregation results
     */
    schema.statics.paginateAggregate = async function(pipeline, options = {}) {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;
        
        const [data, countResult] = await Promise.all([
            this.aggregate([
                ...pipeline,
                { $skip: skip },
                { $limit: limit }
            ]),
            this.aggregate([
                ...pipeline,
                { $count: 'total' }
            ])
        ]);
        
        const total = countResult[0]?.total || 0;
        
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    };
};

export default paginationPlugin;
```

```javascript
// src/models/plugins/softDeletePlugin.js

/**
 * Soft Delete Plugin
 * 
 * Implements soft delete functionality.
 * Documents are not removed from database but marked as deleted.
 */
const softDeletePlugin = (schema, options = {}) => {
    
    // Add soft delete fields
    schema.add({
        isDeleted: {
            type: Boolean,
            default: false,
            index: true
        },
        deletedAt: {
            type: Date,
            default: null
        },
        deletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: options.userModel || 'User',
            default: null
        }
    });
    
    // Query helper to exclude deleted documents by default
    schema.query.notDeleted = function() {
        return this.where({ isDeleted: false });
    };
    
    schema.query.includeDeleted = function() {
        return this.where({});
    };
    
    // Pre-find middleware to filter deleted documents
    schema.pre(/^find/, function(next) {
        if (!this.options.includeDeleted) {
            this.where({ isDeleted: false });
        }
        next();
    });
    
    /**
     * Instance method: softDelete
     */
    schema.methods.softDelete = async function(deletedBy = null) {
        this.isDeleted = true;
        this.deletedAt = new Date();
        this.deletedBy = deletedBy;
        return this.save();
    };
    
    /**
     * Instance method: restore
     */
    schema.methods.restore = async function() {
        this.isDeleted = false;
        this.deletedAt = null;
        this.deletedBy = null;
        return this.save();
    };
    
    /**
     * Static method: softDeleteMany
     */
    schema.statics.softDeleteMany = async function(filter, deletedBy = null) {
        return this.updateMany(filter, {
            $set: {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy
            }
        });
    };
    
    /**
     * Static method: restoreMany
     */
    schema.statics.restoreMany = async function(filter) {
        return this.updateMany(filter, {
            $set: {
                isDeleted: false,
                deletedAt: null,
                deletedBy: null
            }
        });
    };
    
    /**
     * Static method: findDeleted
     */
    schema.statics.findDeleted = function(filter = {}) {
        return this.find({ ...filter, isDeleted: true });
    };
    
    /**
     * Static method: findWithDeleted
     */
    schema.statics.findWithDeleted = function(filter = {}) {
        return this.find(filter).setOptions({ includeDeleted: true });
    };
};

export default softDeletePlugin;
```

```javascript
// src/models/plugins/timestampsPlugin.js

/**
 * Timestamps Plugin
 * 
 * Enhanced timestamps with additional features
 */
const timestampsPlugin = (schema, options = {}) => {
    
    // Add timestamp fields
    schema.add({
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true  // Cannot be changed after creation
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    });
    
    // Update timestamp on save
    schema.pre('save', function(next) {
        if (!this.isNew) {
            this.updatedAt = new Date();
        }
        next();
    });
    
    // Update timestamp on update operations
    schema.pre('findOneAndUpdate', function(next) {
        this.set({ updatedAt: new Date() });
        next();
    });
    
    // Add index for common queries
    if (options.index !== false) {
        schema.index({ createdAt: -1 });
        schema.index({ updatedAt: -1 });
    }
};

export default timestampsPlugin;
```

### Using Plugins in Models

```javascript
// src/models/Product.js
import mongoose from 'mongoose';
import paginationPlugin from './plugins/paginationPlugin.js';
import softDeletePlugin from './plugins/softDeletePlugin.js';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    description: String
});

// Apply plugins
productSchema.plugin(paginationPlugin);
productSchema.plugin(softDeletePlugin, { userModel: 'User' });

const Product = mongoose.model('Product', productSchema);

export default Product;
```

```javascript
// src/controllers/productController.js
import Product from '../models/Product.js';

class ProductController {
    
    /**
     * Get paginated products
     */
    async getProducts(req, res, next) {
        try {
            const { page = 1, limit = 10, category, search } = req.query;
            
            // Build filter
            const filter = {};
            if (category) filter.category = category;
            if (search) filter.name = { $regex: search, $options: 'i' };
            
            // Use pagination plugin
            const result = await Product.paginate(filter, {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: '-createdAt',
                select: 'name price category'
            });
            
            res.json({
                success: true,
                ...result
            });
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Soft delete product
     */
    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            await product.softDelete(req.user.id);
            
            res.json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Restore deleted product
     */
    async restoreProduct(req, res, next) {
        try {
            const product = await Product.findWithDeleted()
                .findOne({ _id: req.params.id });
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            if (!product.isDeleted) {
                return res.status(400).json({ message: 'Product is not deleted' });
            }
            
            await product.restore();
            
            res.json({
                success: true,
                message: 'Product restored successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
```

---

## 15. Discriminators (Inheritance)

### Understanding Discriminators

Discriminators are a schema inheritance mechanism. They allow you to have multiple models with overlapping schemas on top of the same underlying MongoDB collection. This is useful for scenarios where different types of documents share common fields but have unique properties.

```javascript
// src/models/Event.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Base Event Schema
 * 
 * Demonstrates schema inheritance using discriminators
 */

// Base schema with common fields
const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    startDate: {
        type: Date,
        required: true
    },
    endDate: Date,
    location: {
        address: String,
        city: String,
        country: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['going', 'interested', 'not_going'],
            default: 'interested'
        },
        registeredAt: {
            type: Date,
            default: Date.now
        }
    }],
    maxAttendees: Number,
    isPublic: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'cancelled', 'completed'],
        default: 'draft'
    },
    tags: [String]
}, {
    timestamps: true,
    discriminatorKey: 'eventType'  // Key to identify the type
});

// Create base model
const Event = mongoose.model('Event', eventSchema);

// ===========================================
// DISCRIMINATORS
// ===========================================

/**
 * Concert Event
 * Specific fields for music concerts
 */
const concertSchema = new Schema({
    artists: [{
        name: String,
        genre: String,
        headliner: Boolean
    }],
    ticketPrice: {
        regular: Number,
        vip: Number
    },
    venue: {
        name: String,
        capacity: Number,
        seatingChart: String
    },
    ageRestriction: {
        type: String,
        enum: ['all_ages', '18_plus', '21_plus'],
        default: 'all_ages'
    },
    setlist: [{
        artist: String,
        startTime: Date,
        endTime: Date
    }]
});

const ConcertEvent = Event.discriminator('Concert', concertSchema);

/**
 * Workshop Event
 * Specific fields for educational workshops
 */
const workshopSchema = new Schema({
    instructor: {
        name: String,
        bio: String,
        expertise: [String]
    },
    skillLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'all_levels'],
        default: 'all_levels'
    },
    materials: [String],
    requirements: [String],
    price: Number,
    capacity: Number,
    certificate: {
        type: Boolean,
        default: false
    },
    recording: {
        available: Boolean,
        url: String
    }
});

const WorkshopEvent = Event.discriminator('Workshop', workshopSchema);

/**
 * Conference Event
 * Specific fields for conferences
 */
const conferenceSchema = new Schema({
    theme: String,
    speakers: [{
        name: String,
        topic: String,
        bio: String,
        social: {
            twitter: String,
            linkedin: String
        }
    }],
    schedule: [{
        date: Date,
        sessions: [{
            title: String,
            speaker: String,
            room: String,
            startTime: Date,
            endTime: Date
        }]
    }],
    sponsors: [{
        name: String,
        level: {
            type: String,
            enum: ['platinum', 'gold', 'silver', 'bronze']
        },
        logo: String
    }],
    ticketTiers: [{
        name: String,
        price: Number,
        benefits: [String]
    }]
});

const ConferenceEvent = Event.discriminator('Conference', conferenceSchema);

// Export base model and discriminators
export { Event, ConcertEvent, WorkshopEvent, ConferenceEvent };
```

### Using Discriminators in Services

```javascript
// src/services/eventService.js
import { Event, ConcertEvent, WorkshopEvent, ConferenceEvent } from '../models/Event.js';

class EventService {
    
    /**
     * Create event based on type
     */
    static async createEvent(type, eventData) {
        let EventModel;
        
        switch (type) {
            case 'concert':
                EventModel = ConcertEvent;
                break;
            case 'workshop':
                EventModel = WorkshopEvent;
                break;
            case 'conference':
                EventModel = ConferenceEvent;
                break;
            default:
                EventModel = Event;
        }
        
        const event = await EventModel.create(eventData);
        return event;
    }
    
    /**
     * Get all events with type information
     */
    static async getAllEvents(filter = {}) {
        // Using base model returns all types
        const events = await Event.find(filter)
            .populate('organizer', 'name email');
        
        return events;
    }
    
    /**
     * Get events by specific type
     */
    static async getConcerts() {
        return ConcertEvent.find()
            .populate('organizer', 'name email');
    }
    
    static async getWorkshops() {
        return WorkshopEvent.find()
            .populate('organizer', 'name email');
    }
    
    static async getConferences() {
        return ConferenceEvent.find()
            .populate('organizer', 'name email');
    }
    
    /**
     * Get event with type-specific fields
     */
    static async getEventById(eventId) {
        const event = await Event.findById(eventId)
            .populate('organizer', 'name email');
        
        if (!event) return null;
        
        // Type-specific population
        switch (event.eventType) {
            case 'Concert':
                // Could add concert-specific population
                break;
            case 'Workshop':
                // Could add workshop-specific population
                break;
            case 'Conference':
                // Could add conference-specific population
                break;
        }
        
        return event;
    }
    
    /**
     * Aggregate across event types
     */
    static async getEventStats() {
        const stats = await Event.aggregate([
            {
                $group: {
                    _id: '$eventType',
                    count: { $sum: 1 },
                    avgAttendees: { $avg: { $size: '$attendees' } }
                }
            }
        ]);
        
        return stats;
    }
}

export default EventService;
```

---

## 16. Complete Express.js Integration

### Application Setup

```javascript
// src/index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { connectDatabase } from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

// Create Express app
const app = express();

// Connect to database
connectDatabase();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
```

### Routes Setup

```javascript
// src/routes/index.js
import express from 'express';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;
```

### Complete CRUD Example

```javascript
// src/routes/userRoutes.js
import express from 'express';
import UserController from '../controllers/userController.js';
import { validateRequest } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { createUserSchema, updateUserSchema } from '../validators/userValidator.js';

const router = express.Router();

// Public routes
router.post('/', validateRequest(createUserSchema), UserController.create);
router.post('/login', UserController.login);

// Protected routes
router.use(authenticate);

router.get('/me', UserController.getMe);
router.patch('/me', validateRequest(updateUserSchema), UserController.updateMe);
router.delete('/me', UserController.deleteMe);

router.get('/', authorize('admin'), UserController.getAll);
router.get('/:id', UserController.getById);
router.patch('/:id', authorize('admin'), validateRequest(updateUserSchema), UserController.update);
router.delete('/:id', authorize('admin'), UserController.delete);

export default router;
```

```javascript
// src/controllers/userController.js
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

class UserController {
    
    /**
     * Create new user
     */
    async create(req, res, next) {
        try {
            const user = await User.create(req.body);
            
            const token = user.generateAuthToken();
            
            res.status(201).json(
                ApiResponse.success({
                    user: user.toPublicProfile(),
                    token
                }, 'User created successfully')
            );
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Login user
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            
            const user = await User.authenticate(email, password);
            
            const token = user.generateAuthToken();
            
            res.json(
                ApiResponse.success({
                    user: user.toPublicProfile(),
                    token
                }, 'Login successful')
            );
        } catch (error) {
            next(new ApiError(401, error.message));
        }
    }
    
    /**
     * Get current user
     */
    async getMe(req, res, next) {
        try {
            const user = await User.findById(req.user.id);
            
            res.json(ApiResponse.success(user));
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Update current user
     */
    async updateMe(req, res, next) {
        try {
            const updates = req.body;
            
            // Prevent updating sensitive fields
            delete updates.password;
            delete updates.role;
            delete updates.isActive;
            
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { $set: updates },
                { new: true, runValidators: true }
            );
            
            res.json(ApiResponse.success(user, 'Profile updated'));
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Delete current user (soft delete)
     */
    async deleteMe(req, res, next) {
        try {
            await User.findByIdAndUpdate(req.user.id, {
                isActive: false,
                deletedAt: new Date()
            });
            
            res.json(ApiResponse.success(null, 'Account deactivated'));
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Get all users (admin)
     */
    async getAll(req, res, next) {
        try {
            const { page, limit, search, role } = req.query;
            
            const result = await User.search(
                { search, role },
                { page, limit, sort: '-createdAt' }
            );
            
            res.json(ApiResponse.success(result));
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Get user by ID
     */
    async getById(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            
            res.json(ApiResponse.success(user));
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Update user (admin)
     */
    async update(req, res, next) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
            );
            
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            
            res.json(ApiResponse.success(user, 'User updated'));
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Delete user (admin)
     */
    async delete(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            
            res.json(ApiResponse.success(null, 'User deleted'));
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
```

---

## 17. Best Practices

### Schema Design Best Practices

```javascript
// ✅ DO: Use descriptive field names
const goodSchema = new Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    dateOfBirth: Date
});

// ❌ DON'T: Use cryptic abbreviations
const badSchema = new Schema({
    fn: String,
    ln: String,
    em: String,
    dob: Date
});

// ✅ DO: Use appropriate data types
const goodSchema2 = new Schema({
    price: { type: Schema.Types.Decimal128 },  // For money
    createdAt: { type: Date, default: Date.now },
    tags: [String]
});

// ❌ DON'T: Store everything as strings
const badSchema2 = new Schema({
    price: String,  // Bad for money calculations
    createdAt: String,  // Lose Date methods
    tags: String  // Can't query individual tags
});

// ✅ DO: Index strategically
const goodSchema3 = new Schema({
    email: { type: String, index: true },
    status: { type: String, index: true },
    createdAt: { type: Date, index: true }
});
goodSchema3.index({ status: 1, createdAt: -1 });  // Compound for common query

// ❌ DON'T: Index everything
const badSchema3 = new Schema({
    field1: { type: String, index: true },
    field2: { type: String, index: true },
    field3: { type: String, index: true },
    // Too many indexes slow down writes
});
```

### Query Best Practices

```javascript
// ✅ DO: Use lean() for read-only queries
const users = await User.find().lean();

// ❌ DON'T: Create full Mongoose documents when not needed
const users = await User.find();  // Slower, more memory

// ✅ DO: Select only needed fields
const users = await User.find({}, 'name email');

// ❌ DON'T: Fetch all fields
const users = await User.find({});

// ✅ DO: Use pagination
const { page, limit } = req.query;
const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);

// ✅ DO: Use Promise.all for parallel queries
const [users, count] = await Promise.all([
    User.find().limit(10),
    User.countDocuments()
]);

// ❌ DON'T: Sequential queries when parallel is possible
const users = await User.find().limit(10);
const count = await User.countDocuments();  // Waits unnecessarily

// ✅ DO: Use bulk operations for multiple updates
const bulkOps = updates.map(update => ({
    updateOne: {
        filter: { _id: update.id },
        update: { $set: update.data }
    }
}));
await User.bulkWrite(bulkOps);

// ❌ DON'T: Update documents one by one in a loop
for (const update of updates) {
    await User.findByIdAndUpdate(update.id, update.data);  // Slow!
}
```

### Security Best Practices

```javascript
// ✅ DO: Exclude sensitive fields by default
const userSchema = new Schema({
    password: { type: String, select: false },
    refreshToken: { type: String, select: false }
});

// ✅ DO: Validate all input
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    age: {
        type: Number,
        min: 0,
        max: 150
    }
});

// ✅ DO: Use transactions for critical operations
await mongoose.startSession().then(async (session) => {
    session.startTransaction();
    // ... operations
    await session.commitTransaction();
    session.endSession();
});

// ✅ DO: Sanitize user input
import sanitizeHtml from 'sanitize-html';

function sanitizeInput(input) {
    return sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {}
    });
}
```

---

## Summary

This comprehensive guide has covered Mongoose from A to Z with enterprise-level best practices:

1. **Connection Management**: Multiple connections, retry logic, graceful shutdown
2. **Schema Definition**: All field types, options, and validation
3. **Validation**: Built-in validators, custom validators, async validation
4. **Middleware**: Pre/post hooks for all operations
5. **Indexes**: All index types with performance considerations
6. **Virtuals**: Computed properties and virtual population
7. **Methods**: Instance and static methods for business logic
8. **Query Helpers**: Chainable query methods for clean code
9. **Population**: All population patterns and techniques
10. **Aggregation**: Complex data transformations and analytics
11. **Transactions**: Atomic operations for data consistency
12. **Plugins**: Reusable schema extensions
13. **Discriminators**: Schema inheritance patterns
14. **Express Integration**: Complete CRUD implementation

Use this guide as a reference for building robust, scalable enterprise applications with Mongoose!
