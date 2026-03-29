Here is the complete cURL suite combined into a logical flow: **Register -> Login -> Access Protected Route -> Logout**.

This allows you to test the entire lifecycle of a user session from start to finish.

### PHASE 1: REGISTRATION
*First, we create the user.*

**1. Register a New User**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser01", "email": "testuser01@gmail.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":true, "message":"User registered successfully", "token":"...", "user":...}`

**2. Attempt Duplicate Registration (Validation Test)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser01", "email": "testuser01@gmail.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Username or email already exists"}`

---

### PHASE 2: LOGIN (SESSION START)
*Now we authenticate the user created above to get a valid token.*

**3. Login with Valid Credentials**
```bash
curl -X POST http://localhost:4500/api/login \
-H "Content-Type: application/json" \
-d '{"email": "testuser01@gmail.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":true, "message":"Login successful", "token":"eyJhbGci..."}`
> ⚠️ **ACTION REQUIRED:** Copy the `"token"` string from the response above and paste it into the `YOUR_TOKEN_HERE` placeholder in the commands below.

**4. Login with Wrong Password**
```bash
curl -X POST http://localhost:4500/api/login \
-H "Content-Type: application/json" \
-d '{"email": "testuser01@gmail.com", "password": "WrongPass@1"}'
```
*Expected:* `{"success":false,"status":"error","message":"Invalid credentials"}`

---

### PHASE 3: PROTECTED ROUTES (SESSION VALIDATION)
*We use the token from Phase 2 to access restricted resources.*

**5. Access Profile (Valid Token)**
```bash
curl -X GET http://localhost:4500/api/me \
-H "Authorization: Bearer a7f6fcf31f754882f3d4843868f28b9408112201ed23b1b78b1246600b2d730e"
```
*Expected:* `{"success":true, "data":{"user":{"username":"testuser01"...}}}`

**6. Access Profile (No Token)**
```bash
curl -X GET http://localhost:4500/api/me
```
*Expected:* `{"success":false,"message":"Not authorized to access this route"}`

---

### PHASE 4: LOGOUT (SESSION END)
*We invalidate the token.*

**7. Logout User**
```bash
curl -X POST http://localhost:4500/api/logout \
-H "Authorization: Bearer a7f6fcf31f754882f3d4843868f28b9408112201ed23b1b78b1246600b2d730e"
```
*Expected:* `{"success":true,"message":"Logged out successfully"}`