Here is the complete suite of cURL tests covering every single validation rule in your schema. I have formatted it exactly like your terminal output so you can see the expected result next to each command.

### 1. Username Validations

**Test: Missing Username**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"email":"test@gmail.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Username is required"}`

**Test: Username Too Short (2 chars - hits `minlength` before regex)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "jopa", "email":"test2@gmail.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Username is too short"}`

**Test: Username Too Long (21 chars - hits `maxlength` before regex)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "abcdefghijklmnopqrstu", "email":"test@gmail.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Username is too long"}`

**Test: Username Starts with Invalid Character (Underscore)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "_amaka12", "email": "amaka@gmail.com","password": "Body123@"}'
```
*Expected:* `{"success":false,"status":"error","message":"Username must be 3–20 characters long, start/end with a letter or number, and can only contain single underscores, dots, or hyphens in between."}`

**Test: Username Ends with Invalid Character (Hyphen)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "amaka12-", "email": "amaka2@gmail.com","password": "Body123@"}'
```
*Expected:* `{"success":false,"status":"error","message":"Username must be 3–20 characters long, start/end with a letter or number, and can only contain single underscores, dots, or hyphens in between."}`

**Test: Username Consecutive Special Characters (Double underscore)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "ama__ka12", "email": "amaka3@gmail.com","password": "Body123@"}'
```
*Expected:* `{"success":false,"status":"error","message":"Username must be 3–20 characters long, start/end with a letter or number, and can only contain single underscores, dots, or hyphens in between."}`

---

### 2. Email Validations

**Test: Missing Email**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "password": "Pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Email is required"}`

**Test: Email Too Short (hits `minlength` before validator)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "a@b", "password": "Pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Email is too short"}`

**Test: Invalid Email Format (fails `validator.isEmail`)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "invalid-email.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Enter a valid email"}`

---

### 3. Password Validations

**Test: Missing Password**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "valid@gmail.com"}'
```
*Expected:* `{"success":false,"status":"error","message":"password is required"}` *(Note: your schema says "password" in lowercase here)*

**Test: Password Too Short (hits `minlength` before regex)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "valid@gmail.com", "password": "Pa@1"}'
```
*Expected:* `{"success":false,"status":"error","message":"Password is too short"}`

**Test: Password Missing Uppercase**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "valid@gmail.com", "password": "pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Password must be atleast 8 charcters long and must contain an Uppercase, Lowercase, number and a special character"}`

**Test: Password Missing Lowercase**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "valid@gmail.com", "password": "PASS@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Password must be atleast 8 charcters long and must contain an Uppercase, Lowercase, number and a special character"}`

**Test: Password Missing Number**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "valid@gmail.com", "password": "Password@"}'
```
*Expected:* `{"success":false,"status":"error","message":"Password must be atleast 8 charcters long and must contain an Uppercase, Lowercase, number and a special character"}`

**Test: Password Missing Special Character**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "valid@gmail.com", "password": "Password123"}'
```
*Expected:* `{"success":false,"status":"error","message":"Password must be atleast 8 charcters long and must contain an Uppercase, Lowercase, number and a special character"}`

---

### 4. Success & Business Logic Tests

**Test: Perfectly Valid Registration**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "joe_mail", "email": "aba@gmail.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":true,"user":{...},"token":"...","message":"User registered successfully"}`

**Test: Duplicate Registration (Fails in AuthService before hitting Mongoose)**
```bash
curl -X POST http://localhost:4500/api/register \
-H "Content-Type: application/json" \
-d '{"username": "joe_mail", "email": "aba@gmail.com", "password": "Pass@1234"}'
```
*Expected:* `{"success":false,"status":"error","message":"Username or email already exists"}`