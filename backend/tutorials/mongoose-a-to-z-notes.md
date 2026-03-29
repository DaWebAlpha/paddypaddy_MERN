# Mongoose A to Z — In-Depth Notes with Real-World Examples

> **Stack Context:** Mongoose 9.x · Express 5.x · Node.js (ESM) · Argon2 · jsonwebtoken · ioredis · pino · validator

---

## Table of Contents

1. [What Is Mongoose?](#1-what-is-mongoose)
2. [Connection & Configuration](#2-connection--configuration)
3. [Schemas — The Blueprint](#3-schemas--the-blueprint)
4. [SchemaTypes Deep Dive](#4-schematypes-deep-dive)
5. [Schema Options & toJSON/toObject](#5-schema-options--tojsontoobject)
6. [Models — Compiling Schemas](#6-models--compiling-schemas)
7. [Base Model Pattern (DRY)](#7-base-model-pattern-dry)
8. [Documents — Instance Lifecycle](#8-documents--instance-lifecycle)
9. [CRUD Operations](#9-crud-operations)
10. [Query Building & Chaining](#10-query-building--chaining)
11. [Projections (Selecting Fields)](#11-projections-selecting-fields)
12. [Population (References)](#12-population-references)
13. [Deep Population](#13-deep-population)
14. [Virtuals — Computed Fields](#14-virtuals--computed-fields)
15. [Instance Methods & Static Methods](#15-instance-methods--static-methods)
16. [Indexes — Performance Foundation](#16-indexes--performance-foundation)
17. [Middleware / Hooks](#17-middleware--hooks)
18. [Validators — Built-in & Custom](#18-validators--built-in--custom)
19. [Transactions & Sessions](#19-transactions--sessions)
20. [Aggregation Pipeline](#20-aggregation-pipeline)
21. [Discriminators — Schema Inheritance](#21-discriminators--schema-inheritance)
22. [Plugins — Reusable Logic](#22-plugins--reusable-logic)
23. [Lean Queries for Performance](#23-lean-queries-for-performance)
24. [Cursors — Streaming Large Datasets](#24-cursors--streaming-large-datasets)
25. [Caching Strategies with Redis (ioredis)](#25-caching-strategies-with-redis-ioredis)
26. [Error Handling](#26-error-handling)
27. [Repository Pattern](#27-repository-pattern)
28. [Schema Design Best Practices](#28-schema-design-best-practices)
29. [Debugging & Logging](#29-debugging--logging)
30. [Migration Strategy](#30-migration-strategy)
31. [Quick Reference Cheat Sheet](#31-quick-reference-cheat-sheet)

---

## 1. What Is Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data, with built-in type casting, validation, query building, business logic hooks, and much more. Instead of writing raw MongoDB driver commands, you define **schemas** and **models** that enforce structure, and Mongoose translates your JavaScript operations into optimized MongoDB queries behind the scenes.

In the context of your backend project — which includes auth (`user.model.js`, `refreshToken.model.js`), location hierarchy (`country → region → district → town`), a marketplace catalog (`product.model.js`, `service.model.js`), messaging (`conversation.model.js`, `message.model.js`), payments (`paymentTransaction.model.js`), and social features (`post.model.js`, `notification.model.js`) — Mongoose serves as the **single source of truth** for every data shape in your application. It ensures that a `Product` always has the required fields with the correct types, that a `User`'s email is unique and valid, and that a `Conversation` between two users is consistent across the messaging subsystem.

Without Mongoose you would need to manually validate every field, manage ObjectId references, handle nested document structures, and write repetitive boilerplate for each collection. Mongoose eliminates all of this by giving you a declarative schema API, middleware hooks for cross-cutting concerns (like password hashing before save), and a powerful query builder that supports chaining, population, aggregation, and transactions.

**Key benefits of using Mongoose in your stack:**

- **Schema Enforcement**: MongoDB is schema-less by default; Mongoose adds a rigid schema layer so every document conforms to your expected shape, preventing corrupt or missing data.
- **Type Casting**: Automatically converts values to the correct types (e.g., string `"42"` becomes Number `42` for an `age` field).
- **Validation**: Runs validators before every `save` and `updateOne`, rejecting invalid data before it reaches the database.
- **Business Logic Hooks**: Pre/post middleware lets you inject logic (hashing passwords with Argon2, generating JWT tokens, logging audit events) at precise lifecycle points.
- **Reference Population**: Replaces raw ObjectId references with fully hydrated documents (`conversation.populate('participants')`), making relational data easy to work with.
- **Plugin Ecosystem**: Share common schema logic (timestamps, soft deletes, pagination) across models using plugins.

---

## 2. Connection & Configuration

### 2.1 Connecting to MongoDB

Your project uses `src/core/mongoose.database.js` as the centralized connection module. Here's how it should be structured with Mongoose 9.x and ESM syntax:

```js
// src/core/mongoose.database.js
import mongoose from 'mongoose';
import { config } from '../config/config.js';
import logger from './pino.logger.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.dbUri, {
      // Mongoose 9.x options
      maxPoolSize: 10,          // Maintain up to 10 socket connections
      minPoolSize: 2,           // Keep at least 2 connections open
      serverSelectionTimeoutMS: 5000, // Fail fast if primary is down
      socketTimeoutMS: 45000,   // Close sockets after 45s of inactivity
      family: 4,                // Use IPv4, skip IPv6 resolution
      retryWrites: true,
      w: 'majority',            // Write concern: wait for majority replica acknowledgment
    });

    logger.info(
      { host: conn.connection.host, port: conn.connection.port, db: conn.connection.name },
      'MongoDB connected successfully'
    );

    // Listen for connection events
    mongoose.connection.on('error', (err) => {
      logger.error({ err }, 'MongoDB connection error');
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to connect to MongoDB');
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected gracefully');
  } catch (error) {
    logger.error({ err: error }, 'Error during MongoDB disconnect');
  }
};
```

### 2.2 Configuration

```js
// src/config/config.js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  dbUri: process.env.MONGODB_URI,
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};
```

### 2.3 Bootstrapping in Server

```js
// src/server.js
import { config } from './config/config.js';
import { app } from './app.js';
import { connectDB } from './core/mongoose.database.js';
import logger from './core/pino.logger.js';

const start = async () => {
  await connectDB();

  app.listen(config.port, () => {
    logger.info(
      { port: config.port, env: config.env },
      `Server running on port ${config.port} in ${config.env} mode`
    );
  });
};

start();
```

**Connection pooling** is critical in a production Express app. Mongoose 9 manages a connection pool under the hood. The `maxPoolSize` option controls how many concurrent TCP connections Mongoose keeps open to MongoDB. For a typical API server handling 100–500 req/s, a pool size of 10–25 is sufficient. Each connection can handle many operations sequentially. If you see `ServerSelectionTimeoutError` in your error logs (`logs/errors/`), you may need to increase `serverSelectionTimeoutMS` or investigate your replica set health.

**Write concern** (`w: 'majority'`) tells MongoDB to wait until a majority of replica set members have acknowledged the write before returning success. This guarantees durability but adds latency. For non-critical operations (like analytics pings), you could use `w: 1` for faster writes at the cost of potential data loss during a primary failover.

---

## 3. Schemas — The Blueprint

A Mongoose schema defines the **shape** of documents inside a MongoDB collection. It specifies fields, types, default values, validators, and much more. Every model in your project starts with a schema definition.

### 3.1 Basic Schema Definition

```js
// src/models/auth/user.model.js
import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Never included in queries by default
    },
    role: {
      type: String,
      enum: {
        values: ['customer', 'provider', 'admin', 'superadmin'],
        message: '{VALUE} is not a valid role',
      },
      default: 'customer',
    },
    accountType: {
      type: String,
      enum: ['basic', 'premium'],
      default: 'basic',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    googleId: {
      type: String,
      sparse: true, // Allow null but enforce uniqueness when present
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
```

### 3.2 Nested / Sub-Documents

Sub-documents are documents embedded inside a parent document. They get their own schema but are stored within the parent collection. This is ideal for data that is tightly coupled and always queried together with its parent.

```js
// src/models/messaging/message.model.js
import mongoose, { Schema } from 'mongoose';

const messageAttachmentSchema = new Schema(
  {
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ['image', 'video', 'document', 'audio'],
      required: true,
    },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
  },
  { _id: true }
);

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    attachments: [messageAttachmentSchema],
    isRead: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
  },
  { timestamps: true }
);
```

### 3.3 Mixed / Flexible Schemas

The `Mixed` type (`Schema.Types.Mixed` or `mongoose.Mixed`) allows any data structure. This is useful for dynamic or evolving data that doesn't fit a rigid schema. However, it bypasses Mongoose's type casting and validation, so use it sparingly.

```js
// In a promotion model where metadata varies per promotion type
const promotionSchema = new Schema({
  title: { type: String, required: true },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
    // Could contain anything: { discountPercent, minOrderAmount, validCategories, ... }
  },
});
```

### 3.4 Map Type (Dynamic Keys)

The `Map` type is like a JavaScript `Map` — it supports dynamic string keys with typed values. This is excellent for localization, feature flags, or any key-value structure where keys aren't known at schema design time.

```js
// Localized product names
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  localizedNames: {
    type: Map,
    of: String,
    default: {},
    // Usage: product.localizedNames.set('am', 'የምርት ስም')
  },
});
```

---

## 4. SchemaTypes Deep Dive

Mongoose provides a rich set of SchemaTypes, each with its own set of options and behaviors. Understanding these types deeply is essential for modeling data correctly.

### 4.1 String

The `String` type is the most commonly used SchemaType. It supports several built-in validators and transformers that make it extremely versatile for text-based data.

```js
{
  // Basic fields
  name: { type: String, required: true },

  // Enum constraint - limits to a fixed set of values
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'banned'],
    default: 'active',
  },

  // String validators
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
    trim: true,
    lowercase: true,
  },

  // With a transform (modify value before save)
  bio: {
    type: String,
    maxlength: 1000,
    trim: true,
  },

  // With regex validation
  phone: {
    type: String,
    match: [/^\+251[0-9]{9}$/, 'Please provide a valid Ethiopian phone number'],
  },
}
```

### 4.2 Number

```js
{
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
    max: [9999999, 'Price exceeds maximum allowed'],
    // Custom get/set for currency formatting
    get: (v) => (v / 100).toFixed(2), // Stored as cents, returned as dollars
    set: (v) => Math.round(v * 100),  // Convert dollars to cents
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },

  stockCount: {
    type: Number,
    min: 0,
    default: 0,
  },
}
```

### 4.3 Date

```js
{
  // Mongoose automatically converts string dates to JS Date objects
  lastLoginAt: { type: Date, default: Date.now },

  // No automatic default — must be set explicitly
  appointmentDate: {
    type: Date,
    required: true,
    validate: {
      validator: (v) => v > new Date(),
      message: 'Appointment date must be in the future',
    },
  },

  // Date range validation
  availableFrom: { type: Date, required: true },
  availableTo: {
    type: Date,
    required: true,
    validate: {
      // `this` refers to the document being validated
      validator: function (v) {
        return v > this.availableFrom;
      },
      message: 'availableTo must be after availableFrom',
    },
  },

  // expires: create a TTL index for automatic deletion
  resetTokenExpiresAt: {
    type: Date,
    expires: 3600, // Document auto-deleted 1 hour after this field's value
  },
}
```

### 4.4 Boolean

```js
{
  isEmailVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isPremium: { type: Boolean, default: false },
  acceptsMarketing: { type: Boolean, default: false },
}
```

### 4.5 ObjectId (References)

ObjectId fields store MongoDB `_id` values and allow cross-collection references via `ref`. This is the backbone of relational data modeling in Mongoose.

```js
{
  // Single reference
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  // Reference to a different collection
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  // Optional reference (no required, no index)
  parentCommentId: {
    type: Schema.Types.ObjectId,
    ref: 'PostComment',
    default: null,
  },
}
```

### 4.6 Array

Arrays can hold primitives or sub-documents. They support validation on each element and special validators like `maxlength`, `minlength`, and `unique`.

```js
{
  // Array of strings
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: (arr) => arr.length <= 10,
      message: 'A post cannot have more than 10 tags',
    },
  },

  // Array of ObjectIds (many-to-many)
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],

  // Array of sub-documents
  images: [
    {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      width: { type: Number },
      height: { type: Number },
      isPrimary: { type: Boolean, default: false },
    },
  ],

  // Unique values in array
  blockedUserIds: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    unique: true, // Ensure no duplicates
    default: [],
  },
}
```

### 4.7 Decimal128

For financial data where floating-point precision errors are unacceptable. Unlike JavaScript's native `Number`, `Decimal128` stores values as 128-bit decimals, avoiding the classic `0.1 + 0.2 !== 0.3` problem.

```js
{
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    // Always store monetary values as Decimal128
    // e.g., new mongoose.Types.Decimal128('19.99')
  },
}
```

### 4.8 Buffer

For storing binary data like small files, images, or encrypted payloads. Avoid storing large binary data directly in MongoDB — use S3 or GridFS instead.

```js
{
  profilePictureBuffer: {
    type: Buffer,
    contentType: String, // MIME type, e.g., 'image/png'
  },
  encryptedData: {
    type: Buffer,
  },
}
```

### 4.9 UUID

MongoDB 3.6+ supports native UUID type. Use this when you need non-sequential, globally unique identifiers (e.g., for public-facing IDs that shouldn't reveal document count).

```js
import mongoose from 'mongoose';

const paymentSchema = new Schema({
  transactionRef: {
    type: mongoose.Schema.Types.UUID,
    default: () => crypto.randomUUID(),
    unique: true,
    index: true,
  },
});
```

---

## 5. Schema Options & toJSON/toObject

### 5.1 Global Schema Options

Schema options control the behavior of the schema, model, and documents globally. They can be passed as the second argument to `new Schema()`.

```js
// src/models/base.options.js
export const baseSchemaOptions = {
  timestamps: true,              // Auto-add createdAt & updatedAt
  strict: true,                  // Reject fields not in schema
  strictQuery: true,             // Same for queries (Mongoose 9 default)
  minimize: false,               // Keep empty objects {} instead of stripping them
  toJSON: { virtuals: true },    // Include virtuals in JSON.stringify()
  toObject: { virtuals: true },  // Include virtuals in toObject()
  id: false,                     // Don't add virtual `id` getter (use _id)
};
```

### 5.2 toJSON / toObject Transformers

These are critical for controlling what data is sent to clients. In an API, you almost never want to expose internal fields like `password`, `__v`, or raw ObjectIds. The `toJSON` transform runs automatically when the document is serialized to JSON (which is what Express `res.json()` does).

```js
// src/models/auth/user.model.js (continued)
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false, // Remove __v
  transform: (doc, ret) => {
    // `doc` is the full Mongoose document
    // `ret` is the plain object that will be serialized
    ret.id = ret._id.toString(); // Convert ObjectId to string
    delete ret._id;               // Remove raw ObjectId
    delete ret.password;          // Ensure password is never sent to client
    delete ret.googleId;          // Hide OAuth internals
    return ret;
  },
});

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.password;
    return ret;
  },
});
```

### 5.3 Per-Field `transform`

Individual fields can also have `get`/`set` accessors that transform values on read and write:

```js
const paymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    // Store in cents, return in dollars
    get: (v) => v / 100,
    set: (v) => Math.round(v * 100),
  },
}, { toJSON: { getters: true } }); // IMPORTANT: enable getters in toJSON
```

---

## 6. Models — Compiling Schemas

A **Model** is a compiled Schema. It represents a collection in MongoDB and provides the interface for creating, reading, updating, and deleting documents. You create one model per collection.

### 6.1 Creating a Model

```js
// src/models/auth/user.model.js (continued)
import mongoose, { Schema } from 'mongoose';
import baseSchemaOptions from '../base.options.js';

// ... schema definition ...

// Compile the schema into a model
// First arg: singular collection name → Mongoose auto-pluralizes to "users"
const User = mongoose.model('User', userSchema);

export default User;
```

**Naming convention:** Mongoose auto-lowercases and pluralizes the model name to determine the collection name. So `mongoose.model('User', schema)` → collection `users`. For names that don't pluralize well (like `Category` → `categorys`), specify the collection name explicitly:

```js
// src/models/catalog/category.model.js
const Category = mongoose.model('Category', categorySchema, 'categories');
//                                                       ^^^^^^^^^^  explicit collection name
```

### 6.2 Model Registration Pattern

In a large project, it's important to register all models in a predictable order so references resolve correctly. Create an index file that imports all models:

```js
// src/models/index.js

// Auth models
import './auth/user.model.js';
import './auth/refreshToken.model.js';
import './auth/email.verification.model.js';
import './auth/passwordResetToken.model.js';

// Location models (import BEFORE models that reference them)
import './location/country.model.js';
import './location/region.model.js';
import './location/district.model.js';
import './location/town.model.js';

// Catalog models
import './catalog/category.model.js';
import './catalog/product.model.js';
import './catalog/service.model.js';
import './catalog/workCategory.model.js';

// Profile models
import './profile/customer.profile.model.js';
import './profile/provider.profile.model.js';
import './profile/review.model.js';
import './profile/userGallery.model.js';

// Messaging models
import './messaging/conversation.model.js';
import './messaging/message.model.js';
import './messaging/callLog.model.js';
import './messaging/messageAttachment.model.js';
import './messaging/messageReaction.model.js';

// Post models
import './posts/post.model.js';
import './posts/postComment.model.js';
import './posts/postReaction.model.js';
import './posts/postAttachment.model.js';

// Payment models
import './payment/paymentTransaction.model.js';

// Notification models
import './notification/notification.model.js';

// Moderation models
import './moderation/abuseReport.model.js';

// Promotion models
import './promotion/promotion.model.js';
import './promotion/promotion.payment.model.js';

console.log('All Mongoose models registered');
```

Then import this index file **early** in your app bootstrap (before routes or controllers run):

```js
// src/app.js
import './models/index.js'; // Register ALL models before anything else
import express from 'express';
// ... rest of app setup
```

### 6.3 Why Order Matters

Mongoose resolves `ref: 'User'` by looking up the model name in an internal registry. If `Conversation` references `User` but the `User` model hasn't been registered yet, `populate('userId')` will throw `MissingSchemaError`. Always import models that are **referenced by others** first.

---

## 7. Base Model Pattern (DRY)

When your project has 20+ models, you'll notice repetitive patterns: every model needs timestamps, soft deletes, a standard `toJSON` transform, and pagination helpers. The **base model pattern** extracts these into a reusable foundation.

### 7.1 Creating a Base Schema

```js
// src/models/mongoose.base.model.js
import mongoose, { Schema } from 'mongoose';

/**
 * Creates a base schema with common fields and options.
 * All domain models extend this to avoid repeating boilerplate.
 *
 * @param {Object} definition - Mongoose schema definition
 * @param {Object} options - Additional schema options (merged with defaults)
 */
export function createBaseSchema(definition, options = {}) {
  const baseDefinition = {
    ...definition,
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false, // Don't return soft-deleted docs by default
    },
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      select: false,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  };

  const baseOptions = {
    timestamps: true,
    strict: true,
    strictQuery: true,
    minimize: false,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.isDeleted;
        delete ret.deletedAt;
        delete ret.deletedBy;
        if (options.transform) {
          return options.transform(doc, ret);
        }
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
    },
    ...options,
  };

  return new Schema(baseDefinition, baseOptions);
}
```

### 7.2 Using the Base Schema

```js
// src/models/catalog/product.model.js
import mongoose from 'mongoose';
import { createBaseSchema } from '../mongoose.base.model.js';

const productSchema = createBaseSchema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // ... other product-specific fields
  },
  {
    transform: (doc, ret) => {
      // Product-specific transform (runs AFTER base transform)
      return ret;
    },
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
```

### 7.3 Base Schema — Soft Delete Plugin

Add a soft delete static method to the base:

```js
// Add to createBaseSchema, after the schema is created:
// (or create a plugin — see Section 22)

export function softDeletePlugin(schema) {
  // Pre-find hook: filter out soft-deleted documents
  schema.pre(/^find/, function (next) {
    // `this` is the query object
    if (!this.getOptions().includeDeleted) {
      this.where({ isDeleted: { $ne: true } });
    }
    next();
  });

  // Instance method: soft delete this document
  schema.method('softDelete', async function (deletedByUserId) {
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.deletedBy = deletedByUserId;
    return this.save();
  });

  // Static method: restore a soft-deleted document
  schema.static('restore', async function (id) {
    const doc = await this.findById(id);
    if (!doc) throw new Error('Document not found');
    doc.isDeleted = false;
    doc.deletedAt = null;
    doc.deletedBy = null;
    return doc.save();
  });
}
```

---

## 8. Documents — Instance Lifecycle

A **document** is an instance of a Model. It represents a single record in the database. Documents have their own lifecycle: they can be new (not yet saved), modified (changed but not saved), or persisted (saved to the database).

### 8.1 Creating Documents

```js
import User from '../models/auth/user.model.js';

// Method 1: new + save (full lifecycle, triggers all hooks)
const user = new User({
  firstName: 'Abebe',
  lastName: 'Kebede',
  email: 'abebe@example.com',
  password: 'StrongPassword123!',
  role: 'customer',
});
await user.save();
// Logs: "Validation succeeded" → "Pre-save hook runs" → "MongoDB insert"

// Method 2: Model.create (shortcut for new + save)
const user2 = await User.create({
  firstName: 'Tigist',
  lastName: 'Hailu',
  email: 'tigist@example.com',
  password: 'AnotherStrongPass456!',
});
// Note: .create() also triggers middleware hooks

// Method 3: Model.insertMany (bulk insert — faster but NO middleware)
const users = await User.insertMany([
  { firstName: 'A', lastName: 'B', email: 'a@b.com', password: 'pass1' },
  { firstName: 'C', lastName: 'D', email: 'c@d.com', password: 'pass2' },
  { firstName: 'E', lastName: 'F', email: 'e@f.com', password: 'pass3' },
]);
// WARNING: insertMany does NOT trigger pre/post save hooks or validation!
// Use create() or individual saves when you need middleware (like password hashing)
```

### 8.2 Document State Tracking

Mongoose documents track which fields have been modified using change tracking. This is incredibly useful for conditional logic in middleware and for optimizing updates.

```js
const user = await User.findById('507f1f77bcf86cd799439011');
console.log(user.isNew);       // false — already persisted
console.log(user.firstName);    // 'Abebe'

user.firstName = 'Abel';
console.log(user.isModified('firstName')); // true
console.log(user.isModified('lastName'));  // false
console.log(user.modifiedPaths());         // ['firstName']

await user.save(); // Only sends an $set for firstName — partial update

user.$unset('lastName'); // Mark for removal
console.log(user.modifiedPaths()); // ['lastName']
await user.save();
```

### 8.3 init() vs Hydration

The `init()` method is used internally by Mongoose to create a document from raw MongoDB data without going through validation or middleware. This is what happens when you call `Model.findOne()` — the raw document data is passed through `init()`.

```js
// Manual hydration from raw data (rare, but useful in edge cases)
const raw = { _id: new mongoose.Types.ObjectId(), firstName: 'Abebe', email: 'abebe@example.com' };
const user = new User();
user.init(raw);
console.log(user.isNew); // false — init marks it as persisted
```

---

## 9. CRUD Operations

### 9.1 Create

```js
import Post from '../models/posts/post.model.js';
import Product from '../models/catalog/product.model.js';

// Create a single post with embedded reactions
const post = await Post.create({
  authorId: new mongoose.Types.ObjectId('...'),
  content: 'Looking for a reliable plumber in Addis Ababa!',
  tags: ['plumbing', 'addis-ababa', 'home-repair'],
  attachments: [
    {
      url: 'https://storage.example.com/posts/img1.jpg',
      type: 'image',
      name: 'leak-photo.jpg',
    },
  ],
});
```

### 9.2 Read

```js
// Find one by ID
const user = await User.findById('507f1f77bcf86cd799439011');

// Find one by criteria
const product = await Product.findOne({
  name: 'Samsung Galaxy S25',
  isActive: true,
});

// Find all matching criteria
const activeProducts = await Product.find({
  isActive: true,
  price: { $gte: 1000, $lte: 50000 },
  'location.townId': new mongoose.Types.ObjectId('...'),
}).sort({ createdAt: -1 }).limit(20);

// Find by ID with automatic 404 handling
const userOrThrow = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError(`User with id ${id} not found`);
  return user;
};

// Exists check (returns boolean, no full document)
const emailExists = await User.exists({ email: 'abebe@example.com' });
// Returns: { _id: ObjectId('...') } or null
```

### 9.3 Update

```js
// findByIdAndUpdate — returns the document BEFORE update by default
const updatedUser = await User.findByIdAndUpdate(
  '507f1f77bcf86cd799439011',
  { $set: { firstName: 'Abel', isEmailVerified: true } },
  { new: true, runValidators: true } // CRITICAL: new + runValidators
);

// findOneAndUpdate — update by criteria
const promotedProduct = await Product.findOneAndUpdate(
  { _id: productId, isActive: true },
  { $inc: { viewCount: 1 } }, // Atomic increment
  { new: true }
);

// Update via document instance (triggers save middleware)
const user = await User.findById('...');
user.firstName = 'New Name';
user.markModified('firstName'); // Not needed for simple assignments
await user.save();

// Bulk update many documents at once
await Product.updateMany(
  { categoryId: oldCategoryId },
  { $set: { categoryId: newCategoryId } }
);
```

**Critical note on `runValidators`**: By default, `findByIdAndUpdate` and `findOneAndUpdate` do **not** run schema validators. This is because they use MongoDB's native `findOneAndUpdate` which operates at the database level. Always pass `{ runValidators: true }` if you need validation on updates.

### 9.4 Delete

```js
// deleteOne — deletes first matching document (no middleware)
await User.deleteOne({ _id: userId });

// findByIdAndDelete — returns the deleted document
const deleted = await User.findByIdAndDelete(userId);

// Soft delete (using the base schema plugin)
const user = await User.findById(userId);
await user.softDelete(adminUserId);

// Document instance delete (triggers pre/post delete middleware)
const user = await User.findById(userId);
await user.deleteOne(); // Triggers middleware!
```

---

## 10. Query Building & Chaining

Mongoose queries are **lazily evaluated** — they don't execute against the database until you call a terminal method like `.exec()`, `.then()`, or `await`. This allows you to build complex queries by chaining methods.

### 10.1 Query Chain

```js
// src/repositories/catalog/product.repository.js

const products = await Product.find({
  isActive: true,
  isDeleted: { $ne: true },
})
  .where('price').gte(100).lte(10000)
  .where('rating').gte(3)
  .in('tags', ['electronics', 'mobile'])
  .or([{ isFeatured: true }, { promotionId: { $ne: null } }])
  .nor([{ stockCount: 0 }])
  .sort({ createdAt: -1, rating: -1 })
  .select('name price rating images.primaryUrl tags')
  .skip(0)
  .limit(20)
  .populate('categoryId', 'name slug')
  .populate('providerId', 'firstName lastName businessName')
  .lean()
  .exec();
```

### 10.2 Logical Operators

```js
// AND (implicit — comma-separated conditions)
await Product.find({ isActive: true, price: { $gte: 100 } });

// Explicit $and (when you need multiple conditions on the same field)
await Product.find({
  $and: [
    { price: { $gte: 100 } },
    { price: { $lte: 10000 } },
    { tags: { $in: ['electronics', 'mobile'] } },
  ],
});

// $or — match ANY condition
await Post.find({
  $or: [
    { content: /plumber/i },
    { tags: 'plumbing' },
    { authorId: recommendedUserId },
  ],
});

// $nor — match NONE of the conditions
await User.find({
  $nor: [
    { role: 'admin' },
    { isEmailVerified: false },
  ],
});
```

### 10.3 Comparison Operators

```js
await Product.find({
  price: { $eq: 999 },           // Equal to
  price: { $ne: 0 },              // Not equal to
  price: { $gt: 100 },            // Greater than
  price: { $gte: 100 },           // Greater than or equal
  price: { $lt: 10000 },          // Less than
  price: { $lte: 10000 },         // Less than or equal
  price: { $in: [499, 999, 1499] }, // Match any in array
  price: { $nin: [0, 1] },        // Match none in array
});
```

### 10.4 Element Operators

```js
// Field exists
await User.find({ avatar: { $exists: true, $ne: null } });

// By type
await User.find({ createdAt: { $type: 'date' } });
```

### 10.5 Array Operators

```js
// $all — all elements must be present
await Post.find({ tags: { $all: ['javascript', 'nodejs'] } });

// $elemMatch — at least one array element matches all conditions
await Conversation.find({
  participants: {
    $elemMatch: {
      $eq: userId,
    },
  },
  participants: {
    $elemMatch: {
      $eq: otherUserId,
    },
  },
});

// $size — exact array length
await Post.find({ attachments: { $size: { $gte: 1 } } });
// Note: $size in raw MongoDB takes an exact number; for range use $where
// or add a virtual/counter field
```

### 10.6 Regex / Text Search

```js
// Case-insensitive regex search
const products = await Product.find({
  name: { $regex: 'galaxy', $options: 'i' },
});

// Text search (requires a text index — see Section 16)
await Product.find(
  { $text: { $search: 'Samsung Galaxy phone' } },
  { score: { $meta: 'textScore' } }
).sort({ score: { $meta: 'textScore' } });
```

---

## 11. Projections (Selecting Fields)

Projections control which fields are returned from a query. This is critical for performance — fetching only the fields you need reduces network transfer and memory usage.

### 11.1 Include / Exclude Syntax

```js
// Include only specific fields
const users = await User.find({ role: 'customer' })
  .select('firstName lastName email avatar createdAt')
  .lean();

// Exclude specific fields
const users = await User.find({ role: 'customer' })
  .select('-password -__v -isDeleted -deletedAt')
  .lean();

// In schema definition (persistent projection)
const userSchema = new Schema({
  password: {
    type: String,
    required: true,
    select: false, // NEVER returned unless explicitly selected
  },
});
```

### 11.2 Projections with Population

```js
// Select specific fields from populated documents
const conversations = await Conversation.find({ participants: userId })
  .populate('participants', 'firstName lastName avatar') // Only these fields from User
  .populate('lastMessage', 'content senderId createdAt') // Only these from Message
  .select('-messages') // Don't return full message history
  .lean();
```

### 11.3 Slicing Arrays

```js
// Return only the first 5 images
await Product.findById(productId)
  .select('name images')
  .slice('images', 5);

// Return images 10-20 (skip 10, limit 10)
await Product.findById(productId)
  .slice('images', [10, 10]);
```

---

## 12. Population (References)

Population (`.populate()`) replaces ObjectId references with the actual documents they point to. It's Mongoose's equivalent of a SQL JOIN. Population issues additional queries to the database (one per `populate` call unless using `$in` optimization), so it's essential to use it wisely.

### 12.1 Basic Population

```js
// src/models/posts/post.model.js
const postSchema = createBaseSchema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  content: { type: String, required: true, maxlength: 5000 },
  tags: [{ type: String }],
  attachments: [postAttachmentSchema],
});

// Usage: populate the author
const post = await Post.findById(postId)
  .populate('authorId', 'firstName lastName avatar') // field selection
  .lean();

// Result:
// {
//   _id: '...',
//   content: '...',
//   authorId: {  // <-- was ObjectId, now is full user document
//     _id: '...',
//     firstName: 'Abebe',
//     lastName: 'Kebede',
//     avatar: 'https://...',
//   },
//   tags: [...]
// }
```

### 12.2 Multiple References

```js
const conversation = await Conversation.findById(convId)
  .populate({
    path: 'participants',
    select: 'firstName lastName avatar isOnline',
    model: 'User',
  })
  .populate({
    path: 'lastMessageId',
    select: 'content createdAt senderId isRead',
    model: 'Message',
  })
  .lean();
```

### 12.3 Array of References

```js
// A post has multiple reactions, each referencing a user
await Post.findById(postId)
  .populate('reactions.userId', 'firstName lastName avatar')
  .lean();

// A conversation has multiple participants
await Conversation.find({ participants: userId })
  .populate('participants', 'firstName lastName avatar isOnline lastSeenAt')
  .lean();
```

### 12.4 Population with Conditions

```js
// Only populate if the reference exists
await Post.find().populate({
  path: 'authorId',
  match: { isActive: true },   // Only return active users
  select: 'firstName lastName',
});

// Note: if the match fails, the field will be set to null
// Use `populate` options to handle this
```

### 12.5 Dynamic Ref (refPath)

When a field can reference different models depending on another field's value:

```js
// src/models/posts/postAttachment.model.js
const postAttachmentSchema = new Schema({
  // The attachment can belong to a Post or a Message
  onModel: {
    type: String,
    required: true,
    enum: ['Post', 'Message'],
  },
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel', // <-- Dynamic! Resolves to Post or Message
  },
});

// Usage:
const attachment = await PostAttachment.findById(id)
  .populate('itemId') // Automatically resolves to Post or Message model
  .lean();
```

---

## 13. Deep Population

Deep population populates fields within populated documents. Mongoose does NOT support this natively with chained `.populate()` calls — you need to use nested syntax.

### 13.1 Nested Populate Syntax

```js
// Post → authorId (User) → providerProfileId (ProviderProfile) → workCategoryIds (WorkCategory)
const post = await Post.findById(postId)
  .populate({
    path: 'authorId',
    select: 'firstName lastName role providerProfileId',
    populate: {
      path: 'providerProfileId',
      select: 'businessName rating completedJobs',
      populate: {
        path: 'workCategoryIds',
        select: 'name icon',
      },
    },
  })
  .lean();
```

### 13.2 Deep Population Helper

For complex scenarios, create a reusable deep populate utility:

```js
// src/core/populate.utils.js

/**
 * Deeply populate a document based on a populate map.
 *
 * @param {Object} doc - Mongoose document or query
 * @param {Object} populateMap - Nested populate configuration
 *
 * @example
 * deepPopulate(Post.findById(id), {
 *   authorId: {
 *     select: 'firstName lastName providerProfileId',
 *     populate: {
 *       providerProfileId: {
 *         select: 'businessName rating',
 *       },
 *     },
 *   },
 * });
 */
export function deepPopulate(query, populateMap) {
  for (const [path, config] of Object.entries(populateMap)) {
    const populateObj = { path, select: config.select || '' };

    if (config.match) populateObj.match = config.match;
    if (config.model) populateObj.model = config.model;

    if (config.populate) {
      populateObj.populate = buildNested(config.populate);
    }

    query = query.populate(populateObj);
  }

  return query;
}

function buildNested(map) {
  const entries = Object.entries(map).map(([path, config]) => {
    const obj = { path, select: config.select || '' };
    if (config.populate) obj.populate = buildNested(config.populate);
    return obj;
  });
  return entries.length === 1 ? entries[0] : entries;
}
```

---

## 14. Virtuals — Computed Fields

Virtuals are fields that don't exist in MongoDB but are computed on-the-fly from other fields. They're perfect for derived data like full names, display URLs, age calculations, or any value that can be computed from stored data.

### 14.1 Basic Virtual

```js
// src/models/auth/user.model.js

// Virtual: full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual: initials
userSchema.virtual('initials').get(function () {
  return `${this.firstName?.[0] || ''}${this.lastName?.[0] || ''}`.toUpperCase();
});

// Virtual: age (from dateOfBirth)
userSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});
```

### 14.2 Virtual with Set

Virtual setters let you destructure a single input into multiple stored fields:

```js
userSchema.virtual('displayName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('displayName').set(function (value) {
  const parts = value.split(' ');
  this.firstName = parts[0] || '';
  this.lastName = parts.slice(1).join(' ') || '';
});

// Usage:
const user = new User({ displayName: 'Abebe Kebede' });
// Results in: firstName = 'Abebe', lastName = 'Kebede'
```

### 14.3 Virtual Populate (Reference Without Storing ObjectId)

Virtual populate creates a reference-like relationship without storing the ObjectId. Instead, it computes the reference at query time using a local field and a foreign field.

```js
// src/models/notification/notification.model.js
const notificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['message', 'like', 'comment', 'follow', 'review', 'system'],
    required: true,
  },
  // Store the entity type and ID without a fixed ref
  entityType: {
    type: String,
    enum: ['Post', 'Comment', 'Conversation', 'Message', 'Review'],
    required: true,
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  title: { type: String, required: true },
  body: { type: String, maxlength: 500 },
  isRead: { type: Boolean, default: false },
});

// Virtual populate: load the related entity dynamically
notificationSchema.virtual('entity', {
  ref: (doc) => doc.entityType, // Dynamic ref based on entityType
  localField: 'entityId',
  foreignField: '_id',
  justOne: true,
});

// Usage:
const notifications = await Notification.find({ userId, isRead: false })
  .populate('userId', 'firstName lastName avatar')
  .populate('entity') // Populates Post, Comment, etc. based on entityType
  .lean();
```

### 14.4 Virtual for Counting (Without $count)

```js
// Add a virtual for counting unread messages in a conversation
conversationSchema.virtual('unreadCount').get(function () {
  // This only works if the count is already loaded/provided
  // For actual counting, use aggregation or a counter field
  return this._unreadCount || 0;
});

// Better approach: use a counter field updated via middleware
conversationSchema.virtual('unreadCount').get(function () {
  return this.unreadMessageCount || 0;
});
```

---

## 15. Instance Methods & Static Methods

### 15.1 Instance Methods

Instance methods operate on a **single document**. They have access to `this` (the document instance) and are defined using `schema.method()`.

```js
// src/models/auth/user.model.js

// Check if user's password matches the provided password
userSchema.method('comparePassword', async function (candidatePassword) {
  // `this` is the user document — password is hidden by select: false
  // We need to explicitly select it
  return argon2.verify(this.password, candidatePassword);
});

// Check if the user is a provider
userSchema.method('isProvider', function () {
  return this.role === 'provider';
});

// Generate a password reset token
userSchema.method('generatePasswordResetToken', async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetToken = hashedToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await this.save({ validateBeforeSave: false });

  return resetToken; // Send the unhashed token to the user
});

// Usage:
const user = await User.findById(userId).select('+password'); // Override select:false
const isMatch = await user.comparePassword('inputPassword');
```

### 15.2 Static Methods

Static methods operate on the **Model** itself (not an instance). They're like class methods in OOP. Define them using `schema.static()`.

```js
// src/models/auth/user.model.js

// Find user by email (always returns lean for read-only operations)
userSchema.static('findByEmail', async function (email) {
  return this.findOne({ email: email.toLowerCase() }).lean();
});

// Check if email is already taken
userSchema.static('isEmailTaken', async function (email) {
  const user = await this.findOne({ email: email.toLowerCase() });
  return !!user;
});

// Find active users by role with pagination
userSchema.static('findActiveByRole', async function (role, { page = 1, limit = 20 } = {}) {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    this.find({ role, isActive: true, isEmailVerified: true })
      .select('firstName lastName email avatar createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    this.countDocuments({ role, isActive: true, isEmailVerified: true }),
  ]);

  return { users, total, page, limit, totalPages: Math.ceil(total / limit) };
});

// Usage (called on the Model, not an instance):
const emailTaken = await User.isEmailTaken('abebe@example.com');
const { users, total } = await User.findActiveByRole('provider', { page: 1, limit: 10 });
```

### 15.3 Query Methods

Query methods modify the query object itself. They're defined using `schema.query()` and are useful for adding reusable query filters.

```js
// src/models/base.options.js — or in a plugin

// Add to all schemas: a reusable "active" filter
schema.query.active = function () {
  return this.where({ isActive: true, isDeleted: { $ne: true } });
};

// Usage:
const activeProducts = await Product.find().active().sort({ createdAt: -1 }).lean();
const activeProviders = await User.find().active().where('role', 'provider').lean();
```

---

## 16. Indexes — Performance Foundation

Indexes are data structures that dramatically improve query speed at the cost of slightly slower writes and increased storage. Without indexes, every query does a full collection scan (O(n)). With the right index, MongoDB can find documents in O(log n).

### 16.1 Single Field Indexes

```js
// src/models/auth/user.model.js

// Simple index
userSchema.index({ email: 1 }); // Ascending (1) or descending (-1)

// Unique index (also enforces uniqueness)
userSchema.index({ email: 1 }, { unique: true });

// Sparse unique index (allows null/undefined but enforces uniqueness when present)
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

// TTL index — auto-delete documents after a time period
// src/models/auth/refreshToken.model.js
refreshTokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60 } // Delete after 7 days
);
```

### 16.2 Compound Indexes

Compound indexes support queries on multiple fields. The order of fields in the index matters — MongoDB can efficiently use a compound index for queries that match the prefix of the index.

```js
// src/models/posts/post.model.js

// Index for finding posts by author, sorted by date
postSchema.index({ authorId: 1, createdAt: -1 });

// Index for location-based product queries
// src/models/catalog/product.model.js
productSchema.index({
  isActive: 1,
  categoryId: 1,
  price: 1,
});

// Index for messaging: find conversations for a user, sorted by last activity
// src/models/messaging/conversation.model.js
conversationSchema.index({ participants: 1, updatedAt: -1 });

// Index for notifications: unread notifications for a user
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

// Index for abuse reports: open reports by type
// src/models/moderation/abuseReport.model.js
abuseReportSchema.index({ status: 1, reportType: 1, createdAt: -1 });
```

### 16.3 Text Indexes

Text indexes support full-text search on string content. A collection can have at most one text index.

```js
// Full-text search across multiple fields with weights
productSchema.index(
  {
    name: 'text',
    description: 'text',
    tags: 'text',
  },
  {
    weights: {
      name: 10,        // Name matches are 10x more relevant
      tags: 5,         // Tag matches are 5x
      description: 1,  // Description matches are baseline
    },
    name: 'ProductTextIndex', // Named index (helps with debugging)
    background: true,   // Build index in background (non-blocking)
  }
);

// Usage:
const results = await Product.find(
  { $text: { $search: 'Samsung Galaxy phone' } },
  { score: { $meta: 'textScore' } }
)
  .sort({ score: { $meta: 'textScore' } })
  .limit(20)
  .lean();
```

### 16.4 2dsphere Indexes (Geospatial)

```js
// Index for location-based queries (towns, providers)
townSchema.index({ location: '2dsphere' });

// Usage: find providers within 10km of a point
const nearbyProviders = await ProviderProfile.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [38.7469, 9.0250], // [longitude, latitude] — Addis Ababa
      },
      $maxDistance: 10000, // 10km in meters
    },
  },
}).lean();
```

### 16.5 Index Management

```js
// After schema definition, ensure indexes are built
// (Mongoose auto-builds indexes on startup by default in Mongoose 9)
// But you can also build them manually:

await Product.syncIndexes(); // Build any new indexes, remove old ones
await Product.createIndexes(); // Just build new indexes

// View existing indexes
const indexes = await Product.collection.getIndexes();
console.log(indexes);
```

### 16.6 Index Building Strategy

In **production**, never let Mongoose auto-build indexes on every startup (`autoIndex: false` in connection options). Instead, build indexes during deployments using a migration script:

```js
// src/scripts/build-indexes.js
import mongoose from 'mongoose';
import { config } from '../config/config.js';

// Disable auto-index
const conn = await mongoose.connect(config.dbUri, { autoIndex: false });

// Import all models to register their schemas
import '../models/index.js';

// Build all indexes
const modelNames = mongoose.modelNames();
for (const name of modelNames) {
  const model = mongoose.model(name);
  try {
    await model.syncIndexes();
    console.log(`✅ Synced indexes for ${name}`);
  } catch (err) {
    console.error(`❌ Failed to sync indexes for ${name}:`, err.message);
  }
}

await mongoose.disconnect();
```

---

## 17. Middleware / Hooks

Middleware (also called hooks) are functions that execute at specific stages of the document lifecycle or query execution pipeline. They're the backbone of cross-cutting concerns in a Mongoose application.

### 17.1 Document Middleware

Document middleware runs on **document instances** — `save()`, `validate()`, `remove()`, `init()`. The `this` context is the document itself.

#### Pre-Save: Password Hashing

```js
// src/models/auth/user.model.js
import argon2 from 'argon2';

userSchema.pre('save', async function (next) {
  // Only hash if password was modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Argon2id is the recommended variant (side-channel resistant)
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
      memoryCost: 65536,  // 64 MB
      timeCost: 3,        // 3 iterations
      parallelism: 4,     // 4 threads
      hashLength: 32,     // 32-byte output
    });
    next();
  } catch (error) {
    next(error); // Pass error to next middleware
  }
});
```

#### Pre-Save: Email Lowercasing

```js
userSchema.pre('save', function (next) {
  // Ensure email is always lowercase before save
  if (this.email && this.isModified('email')) {
    this.email = this.email.toLowerCase().trim();
  }
  next();
});
```

#### Post-Save: Audit Logging

```js
import logger from '../../core/pino.logger.js';

userSchema.post('save', function (doc, next) {
  // `doc` is the saved document (after save completes)
  logger.info(
    {
      userId: doc._id,
      action: doc.isNew ? 'USER_CREATED' : 'USER_UPDATED',
      modifiedPaths: doc.modifiedPaths(),
    },
    'User document saved'
  );
  next();
});
```

#### Pre-Remove: Cascade Cleanup

```js
// When a user is deleted, clean up all related data
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const userId = this._id;

    // Delete user's refresh tokens
    await RefreshToken.deleteMany({ userId });

    // Delete user's conversations
    await Conversation.deleteMany({ participants: userId });

    // Delete user's posts
    await Post.deleteMany({ authorId: userId });

    // Soft-delete user's reviews (keep for analytics)
    await Review.updateMany(
      { $or: [{ reviewerId: userId }, { providerId: userId }] },
      { isDeleted: true, deletedAt: new Date(), deletedBy: userId }
    );

    logger.info({ userId }, 'Cascade cleanup completed for deleted user');
    next();
  } catch (error) {
    next(error);
  }
});
```

### 17.2 Query Middleware

Query middleware runs on **Model queries** like `find()`, `findOne()`, `updateOne()`, `deleteOne()`, etc. The `this` context is the query object.

#### Auto-Filter: Soft Deletes

```js
// Exclude soft-deleted documents from all find queries
userSchema.pre(/^find/, function (next) {
  // `this` is the Query object
  // Only filter if the caller hasn't explicitly opted in
  if (!this.getOptions().includeDeleted) {
    this.where({ isDeleted: { $ne: true } });
  }
  next();
});

// Usage: include deleted docs when needed
const allUsers = await User.find().setOptions({ includeDeleted: true });
```

#### Auto-Filter: Only Active Documents

```js
productSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeInactive) {
    this.where({ isActive: true });
  }
  next();
});
```

### 17.3 Aggregate Middleware

```js
// Runs before any aggregate() call on this model
postSchema.pre('aggregate', function (next) {
  // Add a $match stage at the beginning to filter out deleted posts
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
```

### 17.4 Error Handling Middleware

```js
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    // Duplicate key error
    const field = Object.keys(error.keyValue)[0];
    next(new ConflictError(`${field} already exists`));
  } else if (error.name === 'ValidationError') {
    next(new BadRequestError(error.message));
  } else {
    next(error);
  }
});
```

### 17.5 Middleware Execution Order

```
pre('validate')  → validate() → post('validate') →
pre('save')      → save()     → post('save')     →
pre('findOneAndUpdate') → query  → post('findOneAndUpdate')
```

Multiple middleware for the same hook runs in the order they're defined. Each must call `next()` to pass control to the next middleware.

---

## 18. Validators — Built-in & Custom

### 18.1 Built-in Validators

```js
const reviewSchema = createBaseSchema({
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    minlength: [10, 'Comment must be at least 10 characters'],
    maxlength: [2000, 'Comment cannot exceed 2000 characters'],
    trim: true,
  },
});
```

### 18.2 Custom Validators

```js
import validator from 'validator';

const providerProfileSchema = createBaseSchema({
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  businessEmail: {
    type: String,
    validate: {
      // Custom validator function
      validator: (v) => !v || validator.isEmail(v),
      message: 'Please provide a valid business email',
    },
  },
  website: {
    type: String,
    validate: {
      validator: (v) => !v || validator.isURL(v, { protocols: ['https', 'http'] }),
      message: 'Please provide a valid URL (http or https)',
    },
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        // Using `function` to access `this`
        // Only validate phone if role is provider
        if (this.role !== 'provider') return true;
        return validator.isMobilePhone(v, 'et-ET'); // Ethiopian format
      },
      message: 'Please provide a valid Ethiopian phone number',
    },
  },
});
```

### 18.3 Async Validators

For validators that need to call a database or external service:

```js
const emailVerificationSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      // Async validator: check if email is already verified
      validator: async (email) => {
        const existing = await mongoose.model('EmailVerification').findOne({
          email: email.toLowerCase(),
          isVerified: true,
        });
        return !existing; // Return true if no verified record exists
      },
      message: 'This email is already verified',
    },
  },
});
```

### 18.4 updateValidators

When using `findOneAndUpdate` or `findByIdAndUpdate`, you MUST enable `runValidators` for validators to execute. However, `this` in validators refers to the **query object**, not the document. Use `context: 'query'` to change this:

```js
await User.findByIdAndUpdate(
  userId,
  { email: newEmail, phone: newPhone },
  {
    new: true,
    runValidators: true,
    context: 'query', // `this` in validators refers to the query
  }
);
```

### 18.5 Required If Conditional

Mongoose doesn't have a built-in `required: if(condition)`, but you can achieve this with a custom validator:

```js
const userSchema = new Schema({
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    required: true,
  },
  password: {
    type: String,
    // Password is required only for local auth
    required: function () {
      return this.authProvider === 'local';
    },
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function (v) {
        // Skip validation for Google auth
        if (this.authProvider === 'google') return true;
        return v && v.length >= 8;
      },
    },
  },
  googleId: {
    type: String,
    required: function () {
      return this.authProvider === 'google';
    },
  },
});
```

---

## 19. Transactions & Sessions

MongoDB 4.0+ supports multi-document ACID transactions. Mongoose wraps this API with `session.startTransaction()`, `session.commitTransaction()`, and `session.abortTransaction()`.

### 19.1 Transaction Helper

```js
// src/database/mongo.transaction.js
import mongoose from 'mongoose';
import logger from '../core/pino.logger.js';

/**
 * Execute a function within a MongoDB transaction.
 * Automatically commits on success, aborts on failure.
 *
 * @param {Function} fn - Async function receiving the session
 * @returns {*} The return value of fn
 */
export async function withTransaction(fn) {
  const session = await mongoose.startSession();
  session.startTransaction({
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary',
  });

  try {
    const result = await fn(session);
    await session.commitTransaction();
    logger.info('Transaction committed successfully');
    return result;
  } catch (error) {
    await session.abortTransaction();
    logger.error({ err: error }, 'Transaction aborted due to error');
    throw error;
  } finally {
    session.endSession();
  }
}

/**
 * Execute multiple operations within a transaction using callback pattern.
 * More verbose but useful for complex multi-step operations.
 */
export async function runInTransaction(operations) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const results = [];
    for (const operation of operations) {
      const result = await operation(session);
      results.push(result);
    }
    await session.commitTransaction();
    return results;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
```

### 19.2 Real-World Transaction: Payment Processing

```js
// src/controllers/payment/payment.controller.js
import { withTransaction } from '../../database/mongo.transaction.js';
import PaymentTransaction from '../../models/payment/paymentTransaction.model.js';
import Promotion from '../../models/promotion/promotion.model.js';
import PromotionPayment from '../../models/promotion/promotion.payment.model.js';
import ProviderProfile from '../../models/profile/provider.profile.model.js';

export const processPromotionPayment = async (providerId, promotionId, amount) => {
  return withTransaction(async (session) => {
    // Step 1: Create payment transaction record
    const payment = await PaymentTransaction.create([{
      userId: providerId,
      amount,
      currency: 'ETB',
      status: 'completed',
      paymentMethod: 'telebirr',
      reference: `PROMO-${Date.now()}`,
      metadata: { promotionId },
    }], { session });

    // Step 2: Create promotion payment link
    await PromotionPayment.create([{
      paymentId: payment[0]._id,
      promotionId,
      amount,
      status: 'paid',
    }], { session });

    // Step 3: Activate the promotion
    const promotion = await Promotion.findByIdAndUpdate(
      promotionId,
      {
        $set: { status: 'active', activatedAt: new Date() },
      },
      { new: true, session }
    );

    if (!promotion) {
      throw new Error('Promotion not found');
    }

    // Step 4: Deduct from provider's wallet (if applicable)
    await ProviderProfile.updateOne(
      { userId: providerId },
      { $inc: { walletBalance: -amount } },
      { session }
    );

    return payment[0];
  });
};
```

### 19.3 Transaction: Transfer Money Between Users

```js
export const transferFunds = async (senderId, receiverId, amount) => {
  return withTransaction(async (session) => {
    // Atomically debit sender
    const senderUpdate = await ProviderProfile.findOneAndUpdate(
      { userId: senderId, walletBalance: { $gte: amount } },
      { $inc: { walletBalance: -amount } },
      { new: true, session }
    );

    if (!senderUpdate) {
      throw new Error('Insufficient balance or sender not found');
    }

    // Atomically credit receiver
    await ProviderProfile.findOneAndUpdate(
      { userId: receiverId },
      { $inc: { walletBalance: amount } },
      { session }
    );

    // Record the transaction
    await PaymentTransaction.create([{
      senderId,
      receiverId,
      amount,
      currency: 'ETB',
      status: 'completed',
      type: 'transfer',
    }], { session });

    return { senderBalance: senderUpdate.walletBalance };
  });
};
```

### 19.4 Transaction: Create Conversation with First Message

```js
export const startConversation = async (participant1Id, participant2Id, messageContent) => {
  return withTransaction(async (session) => {
    // Check if conversation already exists
    const existing = await Conversation.findOne({
      participants: { $all: [participant1Id, participant2Id] },
      participantCount: 2,
    }).session(session);

    if (existing) {
      // Add message to existing conversation
      const message = await Message.create([{
        conversationId: existing._id,
        senderId: participant1Id,
        content: messageContent,
      }], { session });

      // Update last message reference
      await Conversation.updateOne(
        { _id: existing._id },
        { lastMessageId: message[0]._id },
        { session }
      );

      return { conversation: existing, message: message[0], isNew: false };
    }

    // Create new conversation
    const [conversation] = await Conversation.create([{
      participants: [participant1Id, participant2Id],
      participantCount: 2,
    }], { session });

    // Create first message
    const [message] = await Message.create([{
      conversationId: conversation._id,
      senderId: participant1Id,
      content: messageContent,
    }], { session });

    // Set last message
    conversation.lastMessageId = message._id;
    await conversation.save({ session });

    return { conversation, message, isNew: true };
  });
};
```

---

## 20. Aggregation Pipeline

The aggregation pipeline processes documents through a sequence of stages, transforming data at each step. It's MongoDB's equivalent of SQL `GROUP BY`, `JOIN`, and window functions.

### 20.1 Basic Aggregation: Dashboard Stats

```js
// src/repositories/admin.repository.js
import mongoose from 'mongoose';
import User from '../models/auth/user.model.js';
import Post from '../models/posts/post.model.js';
import PaymentTransaction from '../models/payment/paymentTransaction.model.js';
import Conversation from '../models/messaging/conversation.model.js';

export const getAdminDashboardStats = async () => {
  const stats = await User.aggregate([
    // Stage 1: Match all users
    { $match: { isDeleted: { $ne: true } } },

    // Stage 2: Group by role
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        verifiedCount: { $sum: { $cond: ['$isEmailVerified', 1, 0] } },
        premiumCount: { $sum: { $cond: [{ $eq: ['$accountType', 'premium'] }, 1, 0] } },
      },
    },

    // Stage 3: Sort by count
    { $sort: { count: -1 } },
  ]);

  return stats;
  // Result: [
  //   { _id: 'customer', count: 15200, verifiedCount: 12000, premiumCount: 1500 },
  //   { _id: 'provider', count: 3200, verifiedCount: 2900, premiumCount: 800 },
  //   { _id: 'admin', count: 15, verifiedCount: 15, premiumCount: 0 },
  // ]
};
```

### 20.2 Aggregation with $lookup (JOIN)

```js
// Get posts with author details and like count
export const getPostsFeed = async (userId, { page = 1, limit = 20 } = {}) => {
  const posts = await Post.aggregate([
    // Stage 1: Match active, non-deleted posts
    { $match: { isDeleted: { $ne: true }, isActive: true } },

    // Stage 2: Lookup author details
    {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'author',
        pipeline: [
          { $project: { firstName: 1, lastName: 1, avatar: 1, role: 1 } },
        ],
      },
    },
    { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },

    // Stage 3: Lookup like count from PostReaction
    {
      $lookup: {
        from: 'postreactions',
        let: { postId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$postId', '$$postId'] }, type: 'like' } },
          { $count: 'likeCount' },
        ],
        as: 'likeInfo',
      },
    },
    {
      $addFields: {
        likeCount: { $ifNull: [{ $arrayElemAt: ['$likeInfo.likeCount', 0] }, 0] },
      },
    },

    // Stage 4: Lookup comment count
    {
      $lookup: {
        from: 'postcomments',
        let: { postId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$postId', '$$postId'] }, isDeleted: { $ne: true } } },
          { $count: 'commentCount' },
        ],
        as: 'commentInfo',
      },
    },
    {
      $addFields: {
        commentCount: { $ifNull: [{ $arrayElemAt: ['$commentInfo.commentCount', 0] }, 0] },
      },
    },

    // Stage 5: Check if current user liked this post
    {
      $lookup: {
        from: 'postreactions',
        let: { postId: '$_id', currentUserId: new mongoose.Types.ObjectId(userId) },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$postId', '$$postId'] },
                  { $eq: ['$userId', '$$currentUserId'] },
                  { $eq: ['$type', 'like'] },
                ],
              },
            },
          },
          { $limit: 1 },
          { $project: { _id: 1 } },
        ],
        as: 'userLike',
      },
    },
    {
      $addFields: {
        isLikedByUser: { $gt: [{ $size: '$userLike' }, 0] },
      },
    },

    // Stage 6: Sort by creation date (newest first)
    { $sort: { createdAt: -1 } },

    // Stage 7: Pagination
    { $skip: (page - 1) * limit },
    { $limit: limit },

    // Stage 8: Project final shape
    {
      $project: {
        _id: 1,
        content: 1,
        tags: 1,
        attachments: 1,
        author: 1,
        likeCount: 1,
        commentCount: 1,
        isLikedByUser: 1,
        createdAt: 1,
      },
    },
  ]);

  return posts;
};
```

### 20.3 Aggregation: Revenue Report

```js
export const getRevenueReport = async ({ startDate, endDate } = {}) => {
  const report = await PaymentTransaction.aggregate([
    // Stage 1: Filter by date range and status
    {
      $match: {
        status: 'completed',
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },

    // Stage 2: Group by day
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        totalAmount: { $sum: '$amount' },
        transactionCount: { $sum: 1 },
        avgAmount: { $avg: '$amount' },
      },
    },

    // Stage 3: Sort chronologically
    { $sort: { _id: 1 } },

    // Stage 4: Add cumulative total
    {
      $setWindowFields: {
        sortBy: { _id: 1 },
        output: {
          cumulativeTotal: {
            $sum: '$totalAmount',
            window: { documents: ['unbounded', 'current'] },
          },
        },
      },
    },
  ]);

  // Also get overall totals
  const [overall] = await PaymentTransaction.aggregate([
    {
      $match: {
        status: 'completed',
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$amount' },
        totalTransactions: { $sum: 1 },
        averageTransaction: { $avg: '$amount' },
      },
    },
  ]);

  return { daily: report, overall: overall || {} };
};
```

### 20.4 Aggregation: Location Hierarchy

```js
// src/repositories/location/country.repository.js

// Get all countries with their regions, districts, and towns count
export const getLocationTree = async () => {
  return mongoose.model('Country').aggregate([
    {
      $lookup: {
        from: 'regions',
        localField: '_id',
        foreignField: 'countryId',
        as: 'regions',
        pipeline: [
          {
            $lookup: {
              from: 'districts',
              localField: '_id',
              foreignField: 'regionId',
              as: 'districts',
              pipeline: [
                {
                  $lookup: {
                    from: 'towns',
                    localField: '_id',
                    foreignField: 'districtId',
                    as: 'towns',
                  },
                },
                {
                  $addFields: {
                    townCount: { $size: '$towns' },
                  },
                },
                { $project: { towns: 0 } },
              ],
            },
          },
          {
            $addFields: {
              districtCount: { $size: '$districts' },
              totalTowns: { $sum: '$districts.townCount' },
            },
          },
          { $project: { districts: 0 } },
        ],
      },
    },
    {
      $addFields: {
        regionCount: { $size: '$regions' },
      },
    },
    { $sort: { name: 1 } },
  ]);
};
```

---

## 21. Discriminators — Schema Inheritance

Discriminators let you create multiple models from the same schema, each with its own additional fields. It's Mongoose's version of class inheritance and is perfect for models that share common fields but have type-specific differences.

### 21.1 Discriminator for Notifications

```js
// src/models/notification/notification.model.js

// Base notification schema (shared by all notification types)
const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true, discriminatorKey: 'type' }
);

const Notification = mongoose.model('Notification', notificationSchema);

// Message notification discriminator
const MessageNotification = Notification.discriminator(
  'MessageNotification',
  new Schema({
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    messageId: { type: Schema.Types.ObjectId, ref: 'Message' },
    messagePreview: { type: String, maxlength: 100 },
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  })
);

// Like notification discriminator
const LikeNotification = Notification.discriminator(
  'LikeNotification',
  new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    likerId: { type: Schema.Types.ObjectId, ref: 'User' },
    postPreview: { type: String, maxlength: 100 },
  })
);

// Payment notification discriminator
const PaymentNotification = Notification.discriminator(
  'PaymentNotification',
  new Schema({
    transactionId: { type: Schema.Types.ObjectId, ref: 'PaymentTransaction' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'ETB' },
  })
);

// All notifications are stored in the SAME collection
// The `type` field (discriminatorKey) determines which shape the document has

// Query: get all notifications for a user (returns mixed types)
const allNotifications = await Notification.find({ userId }).sort({ createdAt: -1 }).lean();

// Query: get only message notifications
const messageNotifs = await MessageNotification.find({ userId }).lean();

// Create: creates with type = 'MessageNotification' automatically
await MessageNotification.create({
  userId,
  conversationId: convId,
  messageId: msgId,
  messagePreview: 'Hey, I need your services...',
  senderId: senderId,
});
```

### 21.2 Discriminator for Payment Methods

```js
// src/models/payment/paymentTransaction.model.js

const paymentSchema = createBaseSchema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'ETB' },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
}, { discriminatorKey: 'paymentMethod' });

const PaymentTransaction = mongoose.model('PaymentTransaction', paymentSchema);

// Telebirr payment
const TelebirrPayment = PaymentTransaction.discriminator(
  'TelebirrPayment',
  new Schema({
    telebirrTransactionId: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
  })
);

// Bank transfer payment
const BankTransferPayment = PaymentTransaction.discriminator(
  'BankTransferPayment',
  new Schema({
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    receiptUrl: { type: String },
    verifiedAt: { type: Date },
  })
);

// CBE Birr payment
const CBEBirrPayment = PaymentTransaction.discriminator(
  'CBEBirrPayment',
  new Schema({
    cbeTransactionId: { type: String, required: true },
    referenceNumber: { type: String },
  })
);
```

### 21.3 When to Use Discriminators vs Separate Models

| Use Case | Discriminators | Separate Models |
|---|---|---|
| Same collection, same base fields | ✅ | |
| Need to query all types together | ✅ | ❌ (need `$unionWith`) |
| Different collections | ❌ | ✅ |
| Very different schemas | ❌ (bloats) | ✅ |
| Need per-type indexes | Limited | ✅ |
| Natural inheritance hierarchy | ✅ | |

---

## 22. Plugins — Reusable Logic

Plugins are functions that receive a schema and modify it. They're the primary way to share reusable schema logic across models. If you find yourself copying the same fields, methods, or middleware into multiple schemas, extract them into a plugin.

### 22.1 Pagination Plugin

```js
// src/plugins/paginate.plugin.js

/**
 * Adds a static `paginate()` method to the schema.
 *
 * Usage:
 *   const { docs, total, page, totalPages } = await Model.paginate(filter, { page: 1, limit: 10 });
 */
export function paginatePlugin(schema) {
  schema.static('paginate', async function (filter = {}, options = {}) {
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(options.limit) || 20));
    const skip = (page - 1) * limit;
    const sort = options.sort || { createdAt: -1 };
    const select = options.select || '';
    const populate = options.populate || [];

    const [docs, total] = await Promise.all([
      this.find(filter)
        .sort(sort)
        .select(select)
        .skip(skip)
        .limit(limit)
        .populate(populate)
        .lean()
        .exec(),
      this.countDocuments(filter),
    ]);

    return {
      docs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    };
  });
}
```

### 22.2 Soft Delete Plugin

```js
// src/plugins/soft-delete.plugin.js

export function softDeletePlugin(schema) {
  // Add fields
  schema.add({
    isDeleted: { type: Boolean, default: false, select: false },
    deletedAt: { type: Date, select: false },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User', select: false },
  });

  // Pre-find filter
  schema.pre(/^find/, function (next) {
    if (!this.getOptions().withDeleted) {
      const conditions = { isDeleted: { $ne: true } };
      this.where(conditions);
    }
    next();
  });

  // Pre-aggregate filter
  schema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });

  // Instance methods
  schema.method('softDelete', async function (deletedBy) {
    this.isDeleted = true;
    this.deletedAt = new Date();
    if (deletedBy) this.deletedBy = deletedBy;
    return this.save();
  });

  schema.method('restore', async function () {
    this.isDeleted = false;
    this.deletedAt = null;
    this.deletedBy = null;
    return this.save();
  });

  // Static methods
  schema.static('findDeleted', function (filter = {}) {
    return this.find({ ...filter, isDeleted: true }).setOptions({ withDeleted: true });
  });

  schema.static('findWithDeleted', function (filter = {}) {
    return this.find(filter).setOptions({ withDeleted: true });
  });

  schema.static('softDeleteMany', async function (filter, deletedBy) {
    return this.updateMany(filter, {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    });
  });
}
```

### 22.3 Applying Plugins

```js
// src/models/catalog/product.model.js
import mongoose from 'mongoose';
import { createBaseSchema } from '../mongoose.base.model.js';
import { paginatePlugin } from '../../plugins/paginate.plugin.js';
import { softDeletePlugin } from '../../plugins/soft-delete.plugin.js';

const productSchema = createBaseSchema({
  // ... product fields
});

// Apply plugins
paginatePlugin(productSchema);
softDeletePlugin(productSchema);

const Product = mongoose.model('Product', productSchema);
export default Product;

// Usage:
const result = await Product.paginate(
  { categoryId: '507f...' },
  { page: 2, limit: 10, sort: { price: 1 }, populate: 'providerId' }
);
// { docs: [...], total: 85, page: 2, totalPages: 9, hasNextPage: true, hasPrevPage: true }
```

### 22.4 toJSON Transform Plugin

```js
// src/plugins/to-json.plugin.js

/**
 * Standardizes the toJSON output for all models.
 * Adds `id` string field, removes `_id` and `__v`.
 */
export function toJSONPlugin(schema) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id?.toString();
      delete ret._id;
      return ret;
    },
  });

  schema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id?.toString();
      delete ret._id;
      return ret;
    },
  });
}
```

---

## 23. Lean Queries for Performance

By default, Mongoose returns full **document instances** with change tracking, validation, getters/setters, and virtuals. For read-only operations (especially in API responses), this overhead is unnecessary. The `.lean()` method returns plain JavaScript objects instead, which is significantly faster and uses less memory.

### 23.1 When to Use Lean

```js
// ✅ USE lean for: API responses, listing endpoints, search results
const users = await User.find({ role: 'customer' }).lean();

// ✅ USE lean for: aggregation results (already plain objects)
const stats = await User.aggregate([...]); // No .lean() needed

// ❌ DON'T use lean for: documents you need to modify and save
const user = await User.findById(id).lean();
user.firstName = 'New Name';
await user.save(); // ERROR: lean() returns POJO, not a Mongoose document

// ❌ DON'T use lean for: when you need virtuals (unless you enable them)
const user = await User.findById(id).lean(); // virtuals are NOT included
// To include virtuals with lean:
const userWithVirtuals = await User.findById(id).lean({ virtuals: true });
```

### 23.2 Performance Impact

```js
// Benchmark: 10,000 documents
// With Mongoose docs: ~350ms, 280MB heap
// With .lean():        ~45ms,  35MB heap
// That's ~8x faster and ~8x less memory

// In API controllers, ALWAYS use .lean() for read operations:
export const getProducts = async (req, res, next) => {
  const products = await Product.find({ isActive: true })
    .populate('categoryId', 'name')
    .sort({ createdAt: -1 })
    .limit(20)
    .lean(); // ← Critical for API performance

  res.json({ success: true, data: products });
};
```

### 23.3 Lean with Mongoose Methods

If you need Mongoose methods on individual documents from a lean query, re-hydrate:

```js
const docs = await User.find({ role: 'customer' }).lean();

// Re-hydrate a single document
const mongooseDoc = new User(docs[0]);
await mongooseDoc.save(); // Now works!
```

---

## 24. Cursors — Streaming Large Datasets

Cursors allow you to process large result sets one document at a time without loading everything into memory. This is essential for bulk operations, data migrations, and exports.

### 24.1 Basic Cursor Usage

```js
// Process all users for a newsletter (potentially millions)
const cursor = User.find({ isActive: true, isEmailVerified: true })
  .select('email firstName lastName')
  .cursor(); // Returns a QueryCursor — does NOT load all docs into memory

let count = 0;
for await (const user of cursor) {
  await sendEmail(user.email, 'Weekly Newsletter', `Hello ${user.firstName}...`);
  count++;
  if (count % 1000 === 0) {
    logger.info({ processed: count }, 'Newsletter progress');
  }
}
logger.info({ total: count }, 'Newsletter sending complete');
```

### 24.2 Cursor for Data Migration

```js
// Migrate: add accountType field to all existing users
const cursor = User.find({ accountType: { $exists: false } }).cursor();

let migrated = 0;
for await (const user of cursor) {
  user.accountType = user.role === 'admin' ? 'basic' : 'basic';
  await user.save();
  migrated++;

  if (migrated % 500 === 0) {
    logger.info({ migrated }, 'Migration progress');
  }
}
```

### 24.3 Cursor with Transform

```js
// Stream products as CSV
const cursor = Product.find({ isActive: true })
  .select('name price rating stockCount')
  .lean()
  .cursor();

const csvRows = [];
for await (const product of cursor) {
  csvRows.push(
    `${product.name},${product.price},${product.rating},${product.stockCount}`
  );
}
const csvContent = csvRows.join('\n');
```

---

## 25. Caching Strategies with Redis (ioredis)

### 25.1 Cache Layer for Expensive Queries

```js
// src/core/cache.js
import Redis from 'ioredis';
import { config } from '../config/config.js';

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  enableReadyCheck: true,
  lazyConnect: true, // Connect only when first command is issued
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err.message);
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

export default redis;
```

### 25.2 Cache-Aside Pattern

```js
// src/repositories/base.repository.js
import redis from '../core/cache.js';

const CACHE_TTL = 300; // 5 minutes

export class BaseRepository {
  constructor(model) {
    this.model = model;
    this.cachePrefix = model.modelName.toLowerCase();
  }

  /**
   * Find by ID with Redis cache.
   */
  async findByIdCached(id, populateOptions = '') {
    const cacheKey = `${this.cachePrefix}:${id}`;

    // 1. Try cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // 2. Cache miss — query database
    const doc = await this.model.findById(id)
      .populate(populateOptions)
      .lean();

    if (doc) {
      // 3. Store in cache
      await redis.set(cacheKey, JSON.stringify(doc), 'EX', CACHE_TTL);
    }

    return doc;
  }

  /**
   * Invalidate cache for a specific document.
   */
  async invalidateCache(id) {
    const cacheKey = `${this.cachePrefix}:${id}`;
    await redis.del(cacheKey);
  }

  /**
   * Invalidate all caches matching a pattern.
   */
  async invalidatePattern(pattern) {
    const keys = await redis.keys(`${this.cachePrefix}:${pattern}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}
```

### 25.3 Location Tree Cache

```js
// src/repositories/location/country.repository.js
import BaseRepository from '../base.repository.js';
import Country from '../../models/location/country.model.js';

class CountryRepository extends BaseRepository {
  constructor() {
    super(Country);
  }

  async getLocationTree() {
    const cacheKey = 'location:full-tree';

    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Expensive aggregation query
    const tree = await Country.aggregate([
      // ... aggregation pipeline from Section 20.4
    ]);

    // Cache for 1 hour (location data rarely changes)
    await redis.set(cacheKey, JSON.stringify(tree), 'EX', 3600);

    return tree;
  }

  async onLocationUpdate() {
    // Invalidate location cache when any location is modified
    await redis.del('location:full-tree');
    // Also invalidate all location-related caches
    const keys = await redis.keys('location:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}
```

### 25.4 Rate Limiting Cache

```js
// src/middlewares/rateLimit.redis.middleware.js
import redis from '../core/cache.js';

export const rateLimiter = (options = {}) => {
  const {
    windowMs = 60000,         // 1 minute window
    maxRequests = 100,        // Max requests per window
    keyPrefix = 'rate-limit',
  } = options;

  return async (req, res, next) => {
    const key = `${keyPrefix}:${req.ip}:${req.path}`;

    try {
      const current = await redis.incr(key);

      if (current === 1) {
        // First request — set expiration
        await redis.expire(key, Math.ceil(windowMs / 1000));
      }

      // Set rate limit headers
      res.set({
        'X-RateLimit-Limit': maxRequests,
        'X-RateLimit-Remaining': Math.max(0, maxRequests - current),
      });

      if (current > maxRequests) {
        res.set('Retry-After', Math.ceil(windowMs / 1000));
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later',
        });
      }

      next();
    } catch (error) {
      // If Redis is down, allow request through (fail open)
      next();
    }
  };
};
```

---

## 26. Error Handling

### 26.1 Mongoose Error Types

Mongoose errors fall into several categories, each with specific properties that help you identify and handle them:

```js
import mongoose from 'mongoose';

// ValidationError — schema validation failed
try {
  await User.create({ firstName: '', email: 'not-an-email' });
} catch (error) {
  if (error instanceof mongoose.Error.ValidationError) {
    // error.errors is an object keyed by field name
    for (const [field, err] of Object.entries(error.errors)) {
      console.log(`${field}: ${err.message}`); // "firstName: First name is required"
      console.log(`  kind: ${err.kind}`);       // "required"
      console.log(`  path: ${err.path}`);       // "firstName"
    }
  }
}

// CastError — value couldn't be converted to the expected type
try {
  await User.findById('not-a-valid-objectid');
} catch (error) {
  if (error instanceof mongoose.Error.CastError) {
    console.log(`Invalid ${error.path}: ${error.value}`); // "Invalid _id: not-a-valid-objectid"
    // Return 400 Bad Request
  }
}

// ValidatorError — custom validator returned false
// (extends ValidationError)

// VersionError — document was modified between find and save (optimistic locking)
try {
  const user = await User.findById(id);
  // ... another process updates the same document ...
  await user.save();
} catch (error) {
  if (error instanceof mongoose.Error.VersionError) {
    console.log('Document was modified by another process');
    // Retry: re-fetch and re-apply changes
  }
}

// MissingSchemaError — referenced model not found
try {
  await Post.find().populate('nonExistentRef');
} catch (error) {
  if (error instanceof mongoose.Error.MissingSchemaError) {
    console.log(`Schema not registered: ${error.message}`);
  }
}
```

### 26.2 MongoDB Driver Errors

```js
// MongoServerError — database-level errors

// Duplicate key (code 11000)
try {
  await User.create({ email: 'existing@email.com' });
} catch (error) {
  if (error.code === 11000) {
    // Extract the duplicate field name
    const field = Object.keys(error.keyValue)[0];
    // email already exists → return 409 Conflict
  }
}

// WriteError / BulkWriteError
try {
  await User.bulkWrite([...]);
} catch (error) {
  // Handle partial failures
}
```

### 26.3 Centralized Error Handler

```js
// src/middlewares/handleError.js

import mongoose from 'mongoose';
import { AppError } from '../errors/app.error.js';
import logger from '../core/pino.logger.js';

export const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log the error with request context
  logger.error(
    {
      err,
      statusCode: err.statusCode,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: req.user?.id,
    },
    err.message
  );

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
      kind: e.kind,
      value: e.value,
    }));

    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors,
    });
  }

  // Mongoose cast error (invalid ObjectId, etc.)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      error: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      error: `${field} already exists`,
      field,
    });
  }

  // Mongoose version error (concurrent modification)
  if (err instanceof mongoose.Error.VersionError) {
    return res.status(409).json({
      success: false,
      error: 'Document was modified by another process. Please refresh and try again.',
    });
  }

  // Operational error (our custom AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Programming error (bug) — don't leak details
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    });
  }

  // Development — full error details
  return res.status(err.statusCode).json({
    success: false,
    error: err.message,
    stack: err.stack,
  });
};
```

---

## 27. Repository Pattern

The repository pattern abstracts database access behind a clean interface. Controllers call repository methods instead of directly using Mongoose models. This separates concerns, makes testing easier (you can mock the repository), and centralizes query logic.

### 27.1 Base Repository

```js
// src/repositories/base.repository.js
import mongoose from 'mongoose';

export class BaseRepository {
  /**
   * @param {mongoose.Model} model - The Mongoose model
   */
  constructor(model) {
    this.model = model;
    this.modelName = model.modelName;
  }

  async findById(id, options = {}) {
    const query = this.model.findById(id);
    if (options.populate) query.populate(options.populate);
    if (options.select) query.select(options.select);
    if (options.lean !== false) query.lean();
    const doc = await query;
    if (!doc) throw new Error(`${this.modelName} with id ${id} not found`);
    return doc;
  }

  async findOne(filter, options = {}) {
    const query = this.model.findOne(filter);
    if (options.populate) query.populate(options.populate);
    if (options.select) query.select(options.select);
    if (options.lean !== false) query.lean();
    return query;
  }

  async findAll(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 20,
      sort = { createdAt: -1 },
      select = '',
      populate = '',
    } = options;

    const skip = (page - 1) * limit;
    const cappedLimit = Math.min(limit, 100);

    const [docs, total] = await Promise.all([
      this.model.find(filter)
        .sort(sort)
        .select(select)
        .populate(populate)
        .skip(skip)
        .limit(cappedLimit)
        .lean(),
      this.model.countDocuments(filter),
    ]);

    return {
      docs,
      total,
      page: Number(page),
      limit: cappedLimit,
      totalPages: Math.ceil(total / cappedLimit),
    };
  }

  async create(data) {
    const doc = await this.model.create(data);
    return doc.toJSON ? doc.toJSON() : doc.toObject();
  }

  async updateById(id, data, options = {}) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true, ...options }
    );
    if (!doc) throw new Error(`${this.modelName} with id ${id} not found`);
    return doc;
  }

  async deleteById(id) {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) throw new Error(`${this.modelName} with id ${id} not found`);
    return doc;
  }

  async exists(filter) {
    return this.model.exists(filter);
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }
}
```

### 27.2 Concrete Repository: User

```js
// src/repositories/user.repository.js
import User from '../models/auth/user.model.js';
import { BaseRepository } from './base.repository.js';

export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.model.findOne({ email: email.toLowerCase() }).lean();
  }

  async findByGoogleId(googleId) {
    return this.model.findOne({ googleId }).lean();
  }

  async findActiveProviders(options = {}) {
    return this.findAll(
      { role: 'provider', isActive: true, isEmailVerified: true },
      { ...options, select: 'firstName lastName avatar businessName' }
    );
  }

  async updatePassword(userId, newPassword) {
    const user = await this.model.findById(userId);
    if (!user) throw new Error('User not found');
    user.password = newPassword; // Pre-save hook will hash it
    await user.save();
    return true;
  }

  async getUserProfile(userId) {
    return this.findById(userId, {
      populate: 'providerProfileId customerProfileId',
      select: '-password',
    });
  }
}
```

### 27.3 Concrete Repository: Location

```js
// src/repositories/location/country.repository.js
import Country from '../../models/location/country.model.js';
import { BaseRepository } from '../base.repository.js';

export class CountryRepository extends BaseRepository {
  constructor() {
    super(Country);
  }

  async getCountriesWithRegions() {
    return this.model.aggregate([
      {
        $lookup: {
          from: 'regions',
          localField: '_id',
          foreignField: 'countryId',
          as: 'regions',
          pipeline: [{ $project: { name: 1, code: 1 } }],
        },
      },
      { $sort: { name: 1 } },
    ]);
  }

  async searchCountries(query) {
    return this.model
      .find({ name: { $regex: query, $options: 'i' } })
      .select('name code flagEmoji')
      .limit(10)
      .lean();
  }
}

// src/repositories/location/region.repository.js
import Region from '../../models/location/region.model.js';
import { BaseRepository } from '../base.repository.js';

export class RegionRepository extends BaseRepository {
  constructor() {
    super(Region);
  }

  async getRegionsByCountry(countryId) {
    return this.model
      .find({ countryId, isActive: true })
      .sort({ name: 1 })
      .lean();
  }
}
```

### 27.4 Using Repositories in Controllers

```js
// src/controllers/auth/auth.controller.js
import { UserRepository } from '../../repositories/user.repository.js';
import { BadRequestError } from '../../errors/bad-request.error.js';
import { ConflictError } from '../../errors/conflict.error.js';

const userRepo = new UserRepository();

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if email exists
    if (await userRepo.exists({ email: email.toLowerCase() })) {
      throw new ConflictError('Email is already registered');
    }

    // Create user
    const user = await userRepo.create({
      firstName,
      lastName,
      email,
      password,
      role: 'customer',
    });

    // ... generate tokens, send verification email, etc.

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
```

---

## 28. Schema Design Best Practices

### 28.1 Embedding vs Referencing

The most important decision in MongoDB schema design is whether to **embed** data or **reference** it. Here's a decision framework based on your project:

| Factor | Embed | Reference |
|---|---|---|
| Data is always queried together with parent | ✅ | |
| One-to-few relationship (< 100 items) | ✅ | |
| Child needs to exist independently | | ✅ |
| Many-to-many relationship | | ✅ |
| Child can grow unbounded | | ✅ |
| Need to update child independently | | ✅ |
| Read performance is critical (no $lookup) | ✅ | |
| Data is accessed from multiple parents | | ✅ |

**Examples from your project:**

**Embed (good choice):**
- `Message.attachments` — always loaded with the message, rarely queried independently
- `Post.tags` — small array of strings, always needed with the post
- `Post.attachments` — typically 1-5 attachments, always loaded with the post

**Reference (good choice):**
- `Post.authorId → User` — users exist independently, referenced from many places
- `Conversation.participants → User` — users exist independently
- `Product.categoryId → Category` — categories shared across products

### 28.2 The One-to-Many Consideration

```js
// ❌ ANTI-PATTERN: Unbounded array of references
// If a provider could have 10,000+ reviews, embedding all IDs is a bad idea
const providerProfileSchema = new Schema({
  reviewIds: [
    { type: Schema.Types.ObjectId, ref: 'Review' },
    // Could grow to 10,000+ entries → document exceeds 16MB BSON limit!
  ],
});

// ✅ BETTER: Use referencing (review has providerId)
const reviewSchema = new Schema({
  providerId: { type: Schema.Types.ObjectId, ref: 'ProviderProfile', required: true, index: true },
  reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
});
// Query: Review.find({ providerId }).sort({ createdAt: -1 }).limit(20)
```

### 28.3 Denormalization for Read Performance

```js
// For frequently accessed data, denormalize (copy) a summary into the parent:

// When a user creates a post, store a snapshot of their info
// This avoids a $lookup on every feed query
const postSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Denormalized author info for fast feed rendering
  authorSnapshot: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String },
  },
  content: { type: String, required: true },
});

// When the user updates their name, you need to update all snapshots
// This is the denormalization trade-off: faster reads, more complex writes
```

### 28.4 Indexing Strategy

1. **Every foreign key gets an index**: `authorId`, `userId`, `categoryId`, `conversationId`, etc.
2. **Compound indexes for common query patterns**: If you always query `{ userId, isRead, createdAt }`, create a compound index on those fields in that order.
3. **Use the ESR rule** (Equality, Sort, Range) for compound index order: equality conditions first, then sort, then range conditions.
4. **Avoid over-indexing**: Each index slows down writes and uses storage. Monitor with `db.collection.aggregate([{ $indexStats: {} }])`.
5. **Use `background: true`** when creating indexes on large collections in production to avoid blocking.

### 28.5 Schema Versioning

```js
// Add a schema version field to track migrations
const productSchema = createBaseSchema({
  schemaVersion: {
    type: Number,
    default: 1,
    select: false, // Internal field, never expose to clients
  },
  // ... other fields
});

// In application startup, check and migrate
async function migrateProductSchema() {
  const outdated = await Product.find({
    schemaVersion: { $lt: 2 },
  }).limit(1000).cursor();

  for await (const product of outdated) {
    product.schemaVersion = 2;
    // Apply migration transformations
    if (!product.slug) {
      product.slug = product.name.toLowerCase().replace(/\s+/g, '-');
    }
    await product.save();
  }
}
```

---

## 29. Debugging & Logging

### 29.1 Mongoose Debug Mode

```js
// Development only — logs all queries to console
if (config.env === 'development') {
  mongoose.set('debug', true);
}

// Custom debug with pino logger
mongoose.set('debug', (collectionName, method, query, doc) => {
  logger.debug(
    {
      collection: collectionName,
      method,
      query: JSON.stringify(query),
      doc: JSON.stringify(doc),
    },
    `Mongoose: ${collectionName}.${method}`
  );
});

// Colorized debug output
mongoose.set('debug', { color: true });
```

### 29.2 Slow Query Logging

```js
// Log queries that take longer than 100ms
mongoose.set('debug', (collectionName, method, query, doc, options) => {
  const startTime = Date.now();

  return (err, result) => {
    const duration = Date.now() - startTime;
    if (duration > 100) {
      logger.warn(
        {
          collection: collectionName,
          method,
          query: JSON.stringify(query),
          duration: `${duration}ms`,
        },
        'Slow Mongoose query detected'
      );
    }
  };
});
```

### 29.3 Query Explain

```js
// Check if your query is using an index
const explanation = await User.find({ email: 'abebe@example.com' }).explain('executionStats');
console.log(JSON.stringify(explanation, null, 2));

// Key things to look for:
// - totalDocsExamined: should be close to nReturned (if not, missing index)
// - executionStages.stage: should be 'IXSCAN' (index scan), not 'COLLSCAN' (full scan)
// - indexName: which index was used
```

---

## 30. Migration Strategy

### 30.1 Schema Migrations

Unlike SQL databases, MongoDB doesn't have built-in schema migrations. You need to handle schema evolution in your application code. Here's a migration framework pattern:

```js
// src/database/migrations/index.js

const migrations = [
  {
    version: 1,
    description: 'Add accountType field to existing users',
    async up() {
      await mongoose.model('User').updateMany(
        { accountType: { $exists: false } },
        { $set: { accountType: 'basic' } }
      );
    },
    async down() {
      await mongoose.model('User').updateMany(
        {},
        { $unset: { accountType: 1 } }
      );
    },
  },
  {
    version: 2,
    description: 'Convert price from dollars to cents',
    async up() {
      const cursor = mongoose.model('Product')
        .find({ schemaVersion: { $lt: 2 } })
        .cursor();

      for await (const product of cursor) {
        product.price = Math.round(product.price * 100);
        product.schemaVersion = 2;
        await product.save();
      }
    },
    async down() {
      const cursor = mongoose.model('Product')
        .find({ schemaVersion: 2 })
        .cursor();

      for await (const product of cursor) {
        product.price = product.price / 100;
        product.schemaVersion = 1;
        await product.save();
      }
    },
  },
  {
    version: 3,
    description: 'Create text index on products',
    async up() {
      await mongoose.model('Product').createIndexes();
    },
    async down() {
      await mongoose.model('Product').collection.dropIndex('ProductTextIndex');
    },
  },
];

export async function runMigrations(targetVersion = null) {
  // Store current migration version in a config collection
  const MigrationLog = mongoose.model(
    'MigrationLog',
    new mongoose.Schema({
      version: Number,
      description: String,
      appliedAt: { type: Date, default: Date.now },
    })
  );

  const lastMigration = await MigrationLog.findOne().sort({ version: -1 });
  const currentVersion = lastMigration?.version || 0;

  const target = targetVersion || migrations[migrations.length - 1].version;

  for (const migration of migrations) {
    if (migration.version > currentVersion && migration.version <= target) {
      console.log(`Running migration ${migration.version}: ${migration.description}`);
      try {
        await migration.up();
        await MigrationLog.create({
          version: migration.version,
          description: migration.description,
        });
        console.log(`✅ Migration ${migration.version} completed`);
      } catch (error) {
        console.error(`❌ Migration ${migration.version} failed:`, error);
        throw error;
      }
    }
  }

  console.log(`All migrations complete. Current version: ${target}`);
}
```

---

## 31. Quick Reference Cheat Sheet

### Connection

```js
import mongoose from 'mongoose';
await mongoose.connect(uri, { maxPoolSize: 10 });
await mongoose.disconnect();
mongoose.connection.readyState; // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
```

### Schema

```js
const schema = new mongoose.Schema(
  { field: { type: String, required: true, unique: true, enum: ['a', 'b'], default: 'a' } },
  { timestamps: true, strict: true, toJSON: { virtuals: true }, minimize: false }
);
```

### Model

```js
const Model = mongoose.model('Name', schema); // Collection: "names"
```

### CRUD

```js
const doc = new Model({ field: 'value' });
await doc.save();                           // Create (with hooks)
await Model.create({ field: 'value' });     // Create (with hooks)
await Model.insertMany([...]);              // Bulk (NO hooks)
await Model.find({});                       // Read many
await Model.findById(id);                   // Read by ID
await Model.findOne({ field: 'value' });    // Read one
await Model.exists({ field: 'value' });     // Check existence
await Model.countDocuments({});             // Count
await Model.findByIdAndUpdate(id, update, { new: true, runValidators: true });
await Model.findOneAndUpdate(filter, update, { new: true });
await Model.findByIdAndDelete(id);          // Delete
await doc.deleteOne();                      // Delete (with hooks)
```

### Query Chaining

```js
Model.find()
  .where('field').equals(value)
  .gte('age', 18)
  .in('status', ['active', 'pending'])
  .or([{ a: 1 }, { b: 2 }])
  .sort({ createdAt: -1 })
  .select('name email -password')
  .skip(10).limit(20)
  .populate('refField', 'name')
  .lean()
  .exec();
```

### Populate

```js
doc.populate('field');                       // Single ref
Model.find().populate('field', 'name');      // Field selection
Model.find().populate({ path: 'field', match: { isActive: true } }); // With filter
Model.find().populate({ path: 'a', populate: { path: 'b' } });      // Deep
```

### Transactions

```js
const session = await mongoose.startSession();
session.startTransaction();
try {
  await Model.create([{ ... }], { session });
  await OtherModel.updateOne({ _id: id }, update, { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

### Aggregation

```js
Model.aggregate([
  { $match: { status: 'active' } },
  { $group: { _id: '$category', count: { $sum: 1 }, total: { $sum: '$price' } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
  { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
  { $unwind: '$user' },
  { $project: { _id: 1, count: 1, 'user.name': 1 } },
]);
```

### Common Pitfalls

| Pitfall | Solution |
|---|---|
| `findByIdAndUpdate` skips validation | Add `{ runValidators: true }` |
| `insertMany` skips middleware | Use `create()` instead |
| Virtuals missing from JSON | Add `toJSON: { virtuals: true }` |
| Virtuals missing from lean() | Use `.lean({ virtuals: true })` |
| Duplicate key error unhandled | Catch `error.code === 11000` |
| ObjectId invalid | Catch `CastError` |
| Over-fetching data | Use `.select()` and `.lean()` |
| N+1 queries with populate | Batch populate or use aggregation `$lookup` |
| Forgetting `await` | Always `await` Mongoose operations |
| Schema not registered | Import models before using `populate` |

---

> These notes cover Mongoose 9.x with Express 5.x using ESM modules. Always refer to the [official Mongoose docs](https://mongoosejs.com/docs/) for the latest API changes and best practices.
