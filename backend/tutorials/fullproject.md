---

# ✏️ Start writing

---

# ⚙️ CONFIGURATION

## 📑 INDEX

* [SET UP PORT](#-set-up-port)
* [SET UP MONGOOSE](#-set-up-mongoose)

---

## 🔧 SET UP PORT

### PROJECT TREE FOR PORT

```bash
$ tree -I node_modules
.
|-- backend
|   |-- src
|   |   |-- app.js
|   |   |-- server.js
|   |   `-- config
|   |       `-- config.js
|-- package-lock.json
|-- package.json
|-- .env
`-- .gitignore
```

---

### 🗂️ CREATE MAIN FOLDER

Use `mkdir` to create the main project folder and navigate into it:

```bash
mkdir project && cd project
```

---

### 🗂️ CREATE BACKEND FOLDER

Create the backend directory and move into it:

```bash
mkdir backend && cd backend
```

---

### 🗂️ CREATE SRC FOLDER

Create the `src` directory:

```bash
mkdir src && cd src
```

---

### 📄 CREATE package.json

Move back to the root (`project`) and initialize a Node.js project:

```bash
cd ..
npm init -y
```

---

### ⚙️ UPDATE package.json

Modify your `package.json` to include the following:

* Start script for production
* Development script using Nodemon
* Enable ES Modules

```json
{
  "name": "bird",
  "version": "1.0.0",
  "description": "",
  "main": "./backend/src/server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./backend/src/server.js",
    "dev": "nodemon ./backend/src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mongoose": "^9.4.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

---

### 📥 INSTALL DEPENDENCIES

Install required packages:

```bash
npm install express mongoose dotenv
npm install --save-dev nodemon
```

---

### 🌱 CREATE .env FILE

Create a `.env` file in the root directory:

```bash
PORT=5000
```

---

### 🔒 CREATE .gitignore

Prevent environment variables from being pushed to GitHub:

```bash
.env
```

---

### 🗂️ CREATE CONFIG FOLDER AND FILE

Navigate into `backend/src` and create the config folder and file:

```bash
cd backend/src
mkdir config && touch config/config.js
```

---

# 🧠 UNDERSTANDING `url` AND `path` (IMPORTANT FOR CONFIG)

Before continuing, you must understand **why some `.env` strategies use `url` and `path`**.

---

## 📦 `url` MODULE (WHAT IT CONTAINS)

Used for working with **file URLs**

### Contains:

* `fileURLToPath()`
* `pathToFileURL()`
* `URL`

### Example:

```javascript
import { fileURLToPath } from "url";

console.log(import.meta.url);
```

Output:

```
file:///C:/project/backend/src/config/config.js
```

👉 This is a **URL**, not a normal file path

---

### Why it's needed

Node.js **cannot use this directly**

So we convert:

```javascript
const __filename = fileURLToPath(import.meta.url);
```

✔ Converts URL → real path

---

## 📁 `path` MODULE (WHAT IT CONTAINS)

Used for working with **file system paths**

### Contains:

* `join()`
* `resolve()`
* `dirname()`
* `basename()`
* `extname()`

---

### Example

```javascript
import path from "node:path";

const dir = path.dirname("/project/backend/src/config/config.js");
```

---

## 🔥 WHY BOTH ARE USED TOGETHER

In ES Modules:

❌ `__dirname` does NOT exist

So we recreate it:

```javascript
import { fileURLToPath } from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

✔ This is **production standard**

---

## ⚔️ KEY DIFFERENCE

| Module | Purpose                         |
| ------ | ------------------------------- |
| `url`  | Handles URLs (file://, http://) |
| `path` | Handles system file paths       |

---

### 🗂️ WRITE INITIAL CODE IN config.js

```javascript
import dotenv from "dotenv";

dotenv.config();


const { PORT } = process.env;

const toPositiveInt = (value, fallback) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const config = Object.freeze({
    port: toPositiveInt(PORT, 5000),
});

export { config };
export default config;
```

---

### OR

```javascript
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
    path: join(__dirname, "../../../.env"),
});

const { PORT } = process.env;

const toPositiveInt = (value, fallback) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const config = Object.freeze({
    port: toPositiveInt(PORT, 5000),
});

export { config };
export default config;
```

---

### OR

```javascript
import "dotenv/config"


const { PORT } = process.env;

const toPositiveInt = (value, fallback) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const config = Object.freeze({
    port: toPositiveInt(PORT, 5000),
});

export { config };
export default config;
```

---

### OR

```javascript
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../../../.env")
})

const { PORT } = process.env;

const toPositiveInt = (value, fallback) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const config = Object.freeze({
    port: toPositiveInt(PORT, 5000),
});

export { config };
export default config;
```

---

### OR

```javascript
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
    path: path.resolve(process.cwd(), '.env')
})

const { PORT } = process.env;

const toPositiveInt = (value, fallback) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const config = Object.freeze({
    port: toPositiveInt(PORT, 5000),
});

export { config };
export default config;
```

---

# 🚀 NEXT LEVEL (PRODUCTION DEEP DIVE)

## ⚔️ `path.join()` vs `path.resolve()`

### `join()`

```javascript
path.join(__dirname, "../../../.env")
```

* Combines paths
* Relative-safe
* Does NOT guarantee absolute path

---

### `resolve()`

```javascript
path.resolve(process.cwd(), ".env")
```

* Always returns **absolute path**
* Starts from right → left

---

## 🧠 KEY DIFFERENCE

| Feature                  | join | resolve |
| ------------------------ | ---- | ------- |
| Returns absolute path    | ❌    | ✅       |
| Uses current working dir | ❌    | ✅       |
| Safer in production      | ⚠️   | ✅       |

---

## 🐳 HOW THIS AFFECTS PRODUCTION

### Docker

* Container working directory may differ
* ❌ `join()` can break
* ✅ `resolve()` is safer

---

### CI/CD (GitHub Actions, etc.)

* Scripts may run from different directories
* ❌ Default dotenv may fail
* ✅ Explicit path is required

---

### Testing (Jest)

* Tests run from root or different context
* ❌ `.env` not found
* ✅ Must explicitly define path

---

## 🚨 WHY WRONG USAGE BREAKS YOUR APP

If `.env` is not loaded:

```bash
PORT=undefined
```

➡️ Server may:

* Fail to start
* Use wrong port
* Crash in production

---

## 🏆 FINAL PRODUCTION RULE

👉 Always make `.env` loading **deterministic**

✔ Do NOT rely on default behavior
✔ Do NOT assume working directory

---

### 🗂️ CREATE app.js

```bash
touch app.js
```

```javascript
import express from "express";

const app = express();

export { app };
export default app;
```

---

### 🗂️ CREATE server.js

```bash
touch server.js
```

```javascript
import { app } from "./app.js";
import { config } from "./config/config.js";

const PORT = config.port;

const startServer = async () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        });

        server.on("error", (error) => {
            console.error("Server failed to start:", error);
            process.exit(1);
        });
    } catch (error) {
        console.error("Unexpected startup error:", error);
        process.exit(1);
    }
};

startServer();
```

---

## 🔧 SET UP MONGOOSE

### ADD MONGO_URI TO .env

```javascript

#LOGICAL GATEWAY TO LISTEN FOR INCOMING TRAFFIC
PORT=7000

#CONNECTION STRING REQUIRED FOR APPLICATION TO CONNECT TO MONGODB DATABASE
MONGO_URI=mongodb+srv://tribillio:########@cluster0.doyr9s2.mongodb.net/bird?retryWrites=true&w=majority&appName=Cluster0


#SPECIFIES WHETHER WE ARE IN DEVELOPMENT OR PRODUCTION
NODE_ENV=development 

```

### MONGO_URI TO CONFIG

```javascript
import dotenv from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const result = dotenv.config({
    path: join(__dirname, "../../../.env")
});

if (result.error) {
    throw result.error;
}

const {
    PORT,
    MONGO_URI,
    NODE_ENV,
} = process.env;

const required = {
    MONGO_URI,
};

for (const [key, value] of Object.entries(required)) {
    if (!value || !String(value).trim()) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

const toPositiveInt = (value, fallback) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const resolvedNodeEnv = NODE_ENV || "development";

const allowedNodeEnvs = ["development", "production", "test"];
if (!allowedNodeEnvs.includes(resolvedNodeEnv)) {
    throw new Error(`Invalid NODE_ENV: ${resolvedNodeEnv}`);
}

const config = Object.freeze({
    port: toPositiveInt(PORT, 5000),
    node_env: resolvedNodeEnv,
    mongo_uri: MONGO_URI,
});

export { config };
export default config;
```

### DEFINE MONGOOSE CONNECTION IN CORE
**path: ./backend/src/core/mongoose.database.js**

```javascript
import mongoose from "mongoose";
import { config } from "../config/config.js";

const MONGO_URI = config.mongo_uri;
const NODE_ENV = config.node_env;


const databaseConnection = async () => {
    try{
        const options = {
            maxPoolSize: 50,
            minPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            autoIndex: NODE_ENV !== "production"
        }

        await mongoose.connect(MONGO_URI, options);
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error({err: error}, "MongoDB connection failed");
        throw new Error("MongoDB connection failed");
    }
}

mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established");
})

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
})

mongoose.connection.on("error", (err) => {
    console.error({ err }, "MongoDB connection error")
})

export { databaseConnection };
export default databaseConnection;  
```


### ADD IT TO SERVER.JS
```javascript
import { app } from "./app.js";
import { config } from "./config/config.js";
import { databaseConnection } from "./core/mongoose.database.js";

const PORT = config.port;


const startServer = async () => {
    try {

        await databaseConnection();
        
        const server = app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        });

        server.on("error", (error) => {
            console.error("Server failed to start:", error);
            process.exit(1);
        });
    } catch (error) {
        console.error("Unexpected startup error:", error);
        process.exit(1);
    }
};

startServer();
```

