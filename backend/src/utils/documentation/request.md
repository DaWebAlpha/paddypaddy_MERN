Here is the documentation formatted in clean, readable Markdown.

# Request Metadata Helpers Explained for a Layman

This documentation explains how your code collects small pieces of information from a user's request.

In simple terms, when someone sends a request to your backend, the request can carry **metadata**. Metadata means extra information about the request, not the main business data itself.

For example:
*   the user's IP address
*   the browser or app they are using
*   the name of their device
*   the ID of their device

Your code reads that information in a safe way.

## The Code

```javascript
export const getClientIP = (req) => { 
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    req.ip ||
    'unknown'
  );
};

export const getUserAgent = (req) => {
  return req.headers['user-agent'] || null;
};

export const getDeviceName = (req) => {
  const raw =
    req.body?.device_name ||
    req.headers['x-device-name'] ||
    req.headers['device-name'] ||
    '';

  return String(raw || '').trim();
};

export const getDeviceId = (req) => {
  const raw =
    req.body?.device_id ||
    req.headers['x-device-id'] ||
    req.headers['device-id'] ||
    '';

  return String(raw || '').trim() || crypto.randomUUID();
};

export default {
  getClientIP,
  getUserAgent,
  getDeviceName,
  getDeviceId,
};
```

---

## What “metadata” means here

In this file, the metadata being collected is:

### 1. Client IP
This tells your server where the request came from on the internet.
*   **Example metadata:** `"197.210.54.12"`
*   **Analogy:** This is like the return address on a parcel.

### 2. User Agent
This tells your server what browser, app, or device software made the request.
*   **Example metadata:** `"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/136.0.0.0"`
*   **Analogy:** This is like a label that says: “This request came from Chrome on Windows.”

### 3. Device Name
This is usually a human-friendly name for the device.
*   **Example metadata:** `"My HP Laptop"`, `"Samsung Galaxy S24"`, `"iPhone 14 Pro"`
*   **Analogy:** This is like the nickname of the device.

### 4. Device ID
This is a unique identifier used to tell one device apart from another.
*   **Example metadata:** `"device-123"`, `"galaxy-s24-01"`, `"550e8400-e29b-41d4-a716-446655440000"`
*   **Analogy:** This is like a serial number for the device.

---

## Why this metadata matters

Your server may use this metadata for things like:
*   Login history
*   Active session tracking
*   Suspicious activity detection
*   Audit logs
*   Device management
*   Security alerts

**Example:**
> “Your account was accessed from Chrome on Windows from IP 197.210.54.12.”

That message is built from this kind of metadata.

---

## Understanding the `req` object first

All these functions receive `req`.

`req` means **request**.

It is the object that contains everything the client sent to your server. A request can contain parts like these:

```javascript
const req = {
  headers: {
    "x-forwarded-for": "197.210.54.12, 10.0.0.1",
    "x-real-ip": "197.210.54.12",
    "user-agent": "Mozilla/5.0",
    "x-device-name": "My HP Laptop",
    "x-device-id": "device-123"
  },
  body: {
    device_name: "My HP Laptop",
    device_id: "device-123"
  },
  socket: {
    remoteAddress: "10.0.0.5"
  },
  ip: "10.0.0.5"
};
```

Think of `req` as a bag full of information sent by the user’s browser or app.

---

## 1. `getClientIP(req)`

### Code
```javascript
export const getClientIP = (req) => { 
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    req.ip ||
    'unknown'
  );
};
```

### What this function is doing in plain English
This function tries to answer one simple question:

> “What is the real IP address of the person sending this request?”

It checks several places, one after another, until it finds an answer.

### Layman example
Imagine someone is trying to identify where a letter came from. They check in this order:
1.  The delivery sticker
2.  The return address label
3.  The delivery truck record
4.  The local office record
5.  If nothing exists, they write "unknown"

That is exactly how this function works.

### Line-by-line explanation

**Line 1:** `export const getClientIP = (req) => {`
This creates a function called `getClientIP`. `export` means other files can use it. `req` is the request object.

**Line 2:** `return (`
This means the function will give back a value.

**Line 3:** `req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||`
This is the first place it checks.
*   **What is `x-forwarded-for`?** This is a header that often contains the user's original IP address, especially if your app is behind a proxy, load balancer, or Nginx.
    *   *Example:* `req.headers['x-forwarded-for'] = "197.210.54.12, 10.0.0.1"`
*   **What does `.split(',')[0]` do?** It breaks the text into pieces at the commas.
    *   `"197.210.54.12, 10.0.0.1"` becomes `["197.210.54.12", " 10.0.0.1"]`.
    *   Taking `[0]` grabs the first item: `"197.210.54.12"`.
*   **What does `.trim()` do?** It removes spaces around it.
*   **Why this is useful:** Sometimes the header contains several IPs. The first one is usually the real client IP.
*   **Simple interpretation:** “If the request came through several servers, take the first original IP.”

**Line 4:** `req.headers['x-real-ip'] ||`
If `x-forwarded-for` is missing, the function checks another header called `x-real-ip`.
*   *Example:* `req.headers['x-real-ip'] = "197.210.54.12"`
*   **Layman meaning:** “If the first label is missing, check the backup label.”

**Line 5:** `req.socket?.remoteAddress ||`
If both headers are missing, it checks the socket connection.
*   *Example:* `req.socket.remoteAddress = "10.0.0.5"`
*   **Important note:** This may not always be the real user if your app is behind a proxy, but it is still useful as a fallback.
*   **Layman meaning:** “If no labels exist, look at the address of the machine that directly connected.”

**Line 6:** `req.ip ||`
If the socket value is missing too, it checks `req.ip`.
*   *Example:* `req.ip = "10.0.0.5"`
*   Some frameworks like Express may already provide this field for convenience.
*   **Layman meaning:** “If none of the earlier sources worked, use the request’s own built-in IP field.”

**Line 7:** `'unknown'`
If nothing else exists, return the word `"unknown"`. That way, the function never fails and never leaves you with nothing.
*   **Layman meaning:** “If we truly cannot tell, say we do not know.”

### Examples

**Example 1: Forwarded IP exists**
```javascript
// Request metadata
const req = {
  headers: {
    "x-forwarded-for": "197.210.54.12, 10.0.0.1"
  },
  socket: { remoteAddress: "10.0.0.5" },
  ip: "10.0.0.5"
};

// Result
getClientIP(req); // "197.210.54.12"
```
*Why?* Because the function checks `x-forwarded-for` first and extracts the first IP.

**Example 2: Only `x-real-ip` exists**
```javascript
// Request metadata
const req = {
  headers: {
    "x-real-ip": "105.112.20.8"
  },
  socket: { remoteAddress: "10.0.0.5" }
};

// Result
getClientIP(req); // "105.112.20.8"
```
*Why?* Because `x-forwarded-for` is missing, so it uses `x-real-ip`.

**Example 3: No headers, use socket**
```javascript
// Request metadata
const req = {
  headers: {},
  socket: { remoteAddress: "127.0.0.1" }
};

// Result
getClientIP(req); // "127.0.0.1"
```
*Why?* Because the headers are missing, so it falls back to the socket address.

**Example 4: Nothing exists**
```javascript
// Request metadata
const req = {
  headers: {},
  socket: {}
};

// Result
getClientIP(req); // "unknown"
```
*Why?* Because every earlier source is missing.

---

## 2. `getUserAgent(req)`

### Code
```javascript
export const getUserAgent = (req) => {
  return req.headers['user-agent'] || null;
};
```

### What this function is doing in plain English
This function asks:

> “What browser, app, or client software sent this request?”

### Line-by-line explanation

**Line 1:** `export const getUserAgent = (req) => {`
This creates a function called `getUserAgent`.

**Line 2:** `return req.headers['user-agent'] || null;`
This checks the `user-agent` header.
*   *Example metadata:* `req.headers['user-agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/136.0.0.0"`
*   If it exists, return it. If it does not exist, return `null`.

**Layman meaning:** “Tell me what app or browser made the request. If you cannot tell, give me nothing.”

### Examples

**Example 1: Browser request**
```javascript
// Request metadata
const req = {
  headers: {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/136.0.0.0"
  }
};

// Result
getUserAgent(req);
// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/136.0.0.0"
```
*What that means:* This request came from a Chrome browser on Windows.

**Example 2: Mobile app request**
```javascript
// Request metadata
const req = {
  headers: {
    "user-agent": "okhttp/4.9.0"
  }
};

// Result
getUserAgent(req); // "okhttp/4.9.0"
```
*What that means:* This request likely came from an Android app using the OkHttp library.

**Example 3: Missing user agent**
```javascript
// Request metadata
const req = {
  headers: {}
};

// Result
getUserAgent(req); // null
```
*Why?* Because no `user-agent` header was sent.

---

## 3. `getDeviceName(req)`

### Code
```javascript
export const getDeviceName = (req) => {
  const raw =
    req.body?.device_name ||
    req.headers['x-device-name'] ||
    req.headers['device-name'] ||
    '';

  return String(raw || '').trim();
};
```

### What this function is doing in plain English
This function asks:

> “Did the user send a friendly name for their device?”

Examples of device names: `"My HP Laptop"`, `"Samsung Galaxy S24"`, `"Office Desktop"`, `"iPhone 14 Pro"`.

This is not a technical ID. It is a human-friendly label.

### Line-by-line explanation

**Line 1:** `export const getDeviceName = (req) => {`
This creates the function `getDeviceName`.

**Line 2:** `const raw =`
This creates a variable called `raw`. It means the original value before cleaning it.

**Line 3:** `req.body?.device_name ||`
First, it checks if the device name is in the request body.
*   *Example metadata:* `req.body.device_name = "My HP Laptop"`
*   **Layman meaning:** “Check if the user directly sent the device name in the main form data.”

**Line 4:** `req.headers['x-device-name'] ||`
If not found in the body, check this header.
*   *Example metadata:* `req.headers['x-device-name'] = "Samsung Galaxy S24"`
*   **Layman meaning:** “If not in the form data, check the custom header label.”

**Line 5:** `req.headers['device-name'] ||`
If the previous header is not present, check another header format.
*   *Example metadata:* `req.headers['device-name'] = "Office Desktop"`
*   **Layman meaning:** “Try another version of the same label.”

**Line 6:** `'';`
If none of those exist, use an empty string.

**Line 8:** `return String(raw || '').trim();`
This cleans the value.
*   `String(...)`: This makes sure the result is a string.
*   `.trim()`: This removes spaces at the beginning and end.
    *   `"   My HP Laptop   "` becomes `"My HP Laptop"`.
*   **Layman meaning:** “Take whatever device name you found, turn it into clean text, and remove extra spaces.”

### Examples

**Example 1: Device name in request body**
```javascript
// Request metadata
const req = {
  body: { device_name: "  My HP Laptop  " },
  headers: { "x-device-name": "Header Device" }
};

// Result
getDeviceName(req); // "My HP Laptop"
```
*Why?* Because the body is checked first, and spaces are removed.

**Example 2: Device name in header**
```javascript
// Request metadata
const req = {
  body: {},
  headers: { "x-device-name": "  Samsung Galaxy S24  " }
};

// Result
getDeviceName(req); // "Samsung Galaxy S24"
```
*Why?* Because the body had nothing, so it used the header.

**Example 3: Alternative header**
```javascript
// Request metadata
const req = {
  body: {},
  headers: { "device-name": "  Office Desktop  " }
};

// Result
getDeviceName(req); // "Office Desktop"
```

**Example 4: No device name**
```javascript
// Request metadata
const req = {
  body: {},
  headers: {}
};

// Result
getDeviceName(req); // ""
```
*Why?* Because no device name was found anywhere.

---

## 4. `getDeviceId(req)`

### Code
```javascript
export const getDeviceId = (req) => {
  const raw =
    req.body?.device_id ||
    req.headers['x-device-id'] ||
    req.headers['device-id'] ||
    '';

  return String(raw || '').trim() || crypto.randomUUID();
};
```

### What this function is doing in plain English
This function asks:

> “Does this request have a unique device ID?”

If yes, it uses that ID. If no, it creates a brand-new unique ID.

A device ID is different from a device name:
*   **Device name:** Friendly label like "My iPhone"
*   **Device ID:** Unique technical value like "device-123"

### Line-by-line explanation

**Line 1:** `export const getDeviceId = (req) => {`
This creates the function `getDeviceId`.

**Line 2:** `const raw =`
Creates a variable called `raw`. This stores the original ID before cleaning it.

**Line 3:** `req.body?.device_id ||`
First, it checks the request body.
*   *Example metadata:* `req.body.device_id = "device-123"`
*   **Layman meaning:** “First see whether the user directly sent the device serial number in the form data.”

**Line 4:** `req.headers['x-device-id'] ||`
If the body does not contain it, check this header.
*   *Example metadata:* `req.headers['x-device-id'] = "device-123"`

**Line 5:** `req.headers['device-id'] ||`
If that is also missing, check another header name.
*   *Example metadata:* `req.headers['device-id'] = "device-123"`

**Line 6:** `'';`
If none exist, use an empty string.

**Line 8:** `return String(raw || '').trim() || crypto.randomUUID();`
This does two jobs.

1.  **Job 1: Clean the device ID**
    `String(raw || '').trim()` turns the value into text and removes extra spaces.
    *   `"   device-123   "` becomes `"device-123"`.
2.  **Job 2: Generate one if it does not exist**
    If the cleaned result is empty, then `crypto.randomUUID()` runs. That creates a new unique ID, for example: `"550e8400-e29b-41d4-a716-446655440000"`.

**Layman meaning:** “Use the device ID if the user sent one. If not, create a fresh unique ID so the server can still identify the device.”

### Examples

**Example 1: Device ID in body**
```javascript
// Request metadata
const req = {
  body: { device_id: "  device-123  " },
  headers: {}
};

// Result
getDeviceId(req); // "device-123"
```
*Why?* Because the function found it in the body and cleaned it.

**Example 2: Device ID in header**
```javascript
// Request metadata
const req = {
  body: {},
  headers: { "x-device-id": "  phone-001  " }
};

// Result
getDeviceId(req); // "phone-001"
```

**Example 3: No device ID sent**
```javascript
// Request metadata
const req = {
  body: {},
  headers: {}
};

// Result
getDeviceId(req); 
// something like "550e8400-e29b-41d4-a716-446655440000"
```
*Why?* Because the function found nothing, so it created a new unique ID.

---

## Default Export

### Code
```javascript
export default {
  getClientIP,
  getUserAgent,
  getDeviceName,
  getDeviceId,
};
```

### What this does in plain English
This groups all the functions into one object and exports that object as the default export. That means you can import them as a package.

**Example:**
```javascript
import requestInfo from "../utils/request-info.js";

const ip = requestInfo.getClientIP(req);
const userAgent = requestInfo.getUserAgent(req);
```
Instead of importing each one separately.

---

## A Full Real-Life Example

Imagine a user logs into your app. Their request may look like this:

```javascript
const req = {
  headers: {
    "x-forwarded-for": "197.210.54.12, 10.0.0.1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/136.0.0.0",
    "x-device-name": "My HP Laptop",
    "x-device-id": "laptop-001"
  },
  body: {},
  socket: {
    remoteAddress: "10.0.0.5"
  },
  ip: "10.0.0.5"
};
```

Now see what each function extracts:

```javascript
getClientIP(req);   // "197.210.54.12"
getUserAgent(req);  // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/136.0.0.0"
getDeviceName(req); // "My HP Laptop"
getDeviceId(req);   // "laptop-001"
```

So the backend now knows:
*   The user came from IP `197.210.54.12`.
*   They used a Chrome browser on Windows.
*   The device name is `My HP Laptop`.
*   The device ID is `laptop-001`.

That information can be stored in:
*   Login history
*   Refresh token sessions
*   Audit logs
*   Security alerts

---

## Super Simple Summary for a Beginner

Here is the easiest way to think about the whole file:

| Function | What it does |
| :--- | :--- |
| **`getClientIP(req)`** | Finds the internet address of the user. |
| **`getUserAgent(req)`** | Finds the browser or app they used. |
| **`getDeviceName(req)`** | Finds the human-friendly name of the device. |
| **`getDeviceId(req)`** | Finds the technical unique ID of the device, or creates one if missing. |

---

## Why this code is good

This code is good because it:
*   Checks multiple possible places.
*   Uses fallbacks safely.
*   Cleans text values with `.trim()`.
*   Avoids crashes with optional chaining `?.`.
*   Returns useful defaults like `"unknown"`, `null`, `""`, or a generated UUID.

---

## One Important Note

Because this line is used:
`crypto.randomUUID()`

Your file may need:
```javascript
import crypto from "node:crypto";
```
at the top, depending on your Node.js version.

---

## Final Beginner-Friendly Explanation

Think of this file as a **request information reader**.

Whenever a request comes in, this file asks:
1.  Who sent this request?
2.  From where did it come?
3.  What browser or app sent it?
4.  What device sent it?
5.  If the device has no ID, can I create one?

That is the whole purpose of the module.