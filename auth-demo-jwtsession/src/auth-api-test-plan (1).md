# Auth API Test Plan

> Based on the auth flow: `register → login → refresh → logout → logout-all → profile → sessions`
>
> Service issues `accessToken` (JWT, stateless) and `refreshToken` (hex, stored in MongoDB via `RefreshToken` model).
> Token rotation is enforced — every refresh kills the old refresh token and issues a new one.

---

## Base URL

```bash
BASE="http://localhost:4500/api/auth"
```

---

## Test Data

### Valid User 1

```json
{
  "username": "kwamedabo",
  "email": "yawa12@gmail.com",
  "password": "Passco123@"
}
```

### Valid User 2

```json
{
  "username": "akosua123",
  "email": "akosua123@gmail.com",
  "password": "StrongPass123@"
}
```

### Invalid / Edge Cases

```json
{
  "username": "badmailuser",
  "email": "not-an-email",
  "password": "Passco123@"
}
```

```json
{
  "username": "",
  "email": "",
  "password": ""
}
```

---

## Environment Variables for Manual Testing

After a successful login, save both tokens:

```bash
ACCESS_TOKEN="paste_access_token_here"
REFRESH_TOKEN="paste_refresh_token_here"
INVALID_TOKEN="invalidtoken123"
```

---

## 1. REGISTER — POST /api/auth/register

### 1.1 Register successfully

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "kwamedabo",
    "email": "yawa12@gmail.com",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 201
{
  "success": true,
  "message": "User registered successfully",
  "user": { "id": "...", "email": "yawa12@gmail.com", "username": "kwamedabo" },
  "accessToken": "eyJ...",
  "refreshToken": "a1b2c3d4..."
}
```

---

### 1.2 Fail — username missing

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nouser@gmail.com",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 400
"Username is required"
```

---

### 1.3 Fail — email missing

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nouser",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 400
"Email is required"
```

---

### 1.4 Fail — password missing

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nouser",
    "email": "nouser@gmail.com"
  }'
```

**Expected:**

```
Status: 400
"Password is required"
```

---

### 1.5 Fail — all fields empty

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "",
    "email": "",
    "password": ""
  }'
```

**Expected:**

```
Status: 400
```

---

### 1.6 Fail — email already exists

Register once, then repeat with the same email but different username:

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "anotheruser",
    "email": "yawa12@gmail.com",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 409
"Username or email already exists"
```

---

### 1.7 Fail — username already exists

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "kwamedabo",
    "email": "freshmail@gmail.com",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 409
```

---

### 1.8 Fail — invalid JSON

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{"username": "badjson", "email": "badjson@gmail.com",}'
```

**Expected:**

```
Status: 400 (Express / body-parser error)
```

---

### 1.9 Fail — wrong content type

```bash
curl -X POST $BASE/register \
  -H "Content-Type: text/plain" \
  -d 'hello'
```

**Expected:**

```
Status: 400 (validation error — depends on Express parser setup)
```

---

## 2. LOGIN — POST /api/auth/login

The service accepts either `email` or `username` plus `password`.

### 2.1 Login successfully with email

```bash
curl -X POST $BASE/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yawa12@gmail.com",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 200
{
  "success": true,
  "message": "Login successful",
  "user": { "id": "...", "email": "...", "username": "kwamedabo" },
  "accessToken": "eyJ...",
  "refreshToken": "a1b2c3d4..."
}
```

---

### 2.2 Login successfully with username

```bash
curl -X POST $BASE/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "kwamedabo",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 200
```

---

### 2.3 Fail — wrong password

```bash
curl -X POST $BASE/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yawa12@gmail.com",
    "password": "WrongPassword123"
  }'
```

**Expected:**

```
Status: 401
"Password did not match"  or  "Invalid credentials"
```

---

### 2.4 Fail — user does not exist

```bash
curl -X POST $BASE/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "idontexist@gmail.com",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 401
"Invalid credentials"
```

---

### 2.5 Fail — neither email nor username provided

```bash
curl -X POST $BASE/login \
  -H "Content-Type: application/json" \
  -d '{
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 400
"Enter either username or email and password"
```

---

### 2.6 Fail — password missing

```bash
curl -X POST $BASE/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yawa12@gmail.com"
  }'
```

**Expected:**

```
Status: 400
```

---

### 2.7 Fail — empty payload

```bash
curl -X POST $BASE/login \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected:**

```
Status: 400
```

---

## 3. GET PROFILE — GET /api/auth/profile

Requires a valid access token. The middleware sets `req.user` from the JWT payload.

### 3.1 Get profile successfully

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Expected:**

```
Status: 200
{
  "success": true,
  "user": {
    "id": "...",
    "username": "kwamedabo",
    "email": "yawa12@gmail.com",
    "role": "customer",
    ...
  }
}
```

> Note: `password` must NOT appear in the response (schema has `select: false`, controller uses `.select('-password')`).

---

### 3.2 Fail — token missing

```bash
curl -X GET $BASE/profile
```

**Expected:**

```
Status: 401
"Access token is required"
```

---

### 3.3 Fail — invalid token

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Bearer invalidtoken123"
```

**Expected:**

```
Status: 401
"Invalid access token"
```

---

### 3.4 Fail — malformed Authorization header

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Bearer"
```

**Expected:**

```
Status: 401
"Access token is required"
```

---

### 3.5 Fail — wrong auth scheme

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Token $ACCESS_TOKEN"
```

**Expected:**

```
Status: 401
```

---

### 3.6 Fail — token belongs to deleted user

**Setup:**

1. Login and save `ACCESS_TOKEN`
2. Delete the user directly from the database

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Expected:**

```
Status: 401
"User not found or inactive"
```

---

## 4. REFRESH TOKEN — POST /api/auth/refresh

The service expects `refreshToken` in the body. It looks up the stored record, validates it, revokes the old token (rotation), and returns new tokens.

### 4.1 Refresh successfully

```bash
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"
```

**Expected:**

```
Status: 200
{
  "success": true,
  "message": "Token refreshed successfully",
  "user": { "id": "...", "email": "...", "username": "..." },
  "accessToken": "eyJ... (new)",
  "refreshToken": "e5f6g7h8... (new)"
}
```

> Save the new `refreshToken` — the old one is now revoked.

---

### 4.2 Fail — refresh token missing

```bash
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected:**

```
Status: 401
"Refresh token is required"
```

---

### 4.3 Fail — refresh token is invalid (not in DB)

```bash
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "notavalidrefreshtoken"
  }'
```

**Expected:**

```
Status: 401
"Refresh token not found"
```

---

### 4.4 Fail — refresh token already rotated (replay attack)

**Setup:**

1. Refresh once → save new token
2. Try to use the old (now-revoked) token again

```bash
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$OLD_REFRESH_TOKEN\"
  }"
```

**Expected:**

```
Status: 401
"Refresh token has expired or been revoked"
```

---

### 4.5 Fail — refresh token revoked by logout

**Setup:**

1. Login → save tokens
2. Logout using the refresh token
3. Attempt to refresh with the same token

```bash
# Step 2: logout
curl -X POST $BASE/logout \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"

# Step 3: try to refresh
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"
```

**Expected:**

```
Step 2: Status 200
Step 3: Status 401
"Refresh token has expired or been revoked"
```

---

### 4.6 Fail — user is inactive or deleted

**Setup:**

1. Login → save refresh token
2. Deactivate the user in the database (`isActive: false`)
3. Attempt to refresh

```bash
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"
```

**Expected:**

```
Status: 401
"User account is not active"
```

---

## 5. GET SESSIONS — GET /api/auth/sessions

Returns all non-revoked refresh token records for the authenticated user (active devices).

### 5.1 Get sessions successfully

```bash
curl -X GET $BASE/sessions \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Expected:**

```
Status: 200
{
  "success": true,
  "count": 1,
  "sessions": [
    {
      "id": "...",
      "token": "a1b2c3d4...",
      "userId": "...",
      "userAgent": "Mozilla/5.0 ...",
      "ipAddress": "127.0.0.1",
      "deviceName": "Chrome on MacOS",
      "deviceId": "...",
      "lastUsedAt": "2026-03-29T...",
      "expiresAt": "2026-04-05T...",
      "isRevoked": false,
      "createdAt": "2026-03-29T..."
    }
  ]
}
```

---

### 5.2 Fail — token missing

```bash
curl -X GET $BASE/sessions
```

**Expected:**

```
Status: 401
```

---

### 5.3 Fail — invalid token

```bash
curl -X GET $BASE/sessions \
  -H "Authorization: Bearer $INVALID_TOKEN"
```

**Expected:**

```
Status: 401
```

---

### 5.4 Sessions count increases after multiple logins

**Setup:**

1. Login → check sessions (count = 1)
2. Login again → check sessions (count = 2)
3. Login from a different device / IP → check sessions (count = 3)

```bash
# After each login:
curl -X GET $BASE/sessions \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Expected:**

```
count increases each time
each session has a separate token/device/ip record
```

---

## 6. LOGOUT — POST /api/auth/logout

> **Design note:** The service reads `refreshToken` from the body and revokes the stored record.
> The controller must pass `req.body.refreshToken` — NOT the bearer access token.
> If the controller passes the wrong field, logout will not revoke the session.

### 6.1 Logout successfully

```bash
curl -X POST $BASE/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"
```

**Expected:**

```
Status: 200
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 6.2 Fail — refresh token missing from body

```bash
curl -X POST $BASE/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{}'
```

**Expected:**

```
Status: 401
"Refresh token is required"
```

---

### 6.3 Logout with a fake token — should not crash

```bash
curl -X POST $BASE/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "refreshToken": "fake-token"
  }'
```

**Expected:**

```
Status: 200
"Logged out successfully"
```

> This is correct. The service returns success when the token record is not found (idempotent — already logged out).

---

### 6.4 After logout, refresh should fail

**Setup:**

1. Login → save `REFRESH_TOKEN`
2. Logout with that `REFRESH_TOKEN`
3. Try to refresh with the same token

```bash
# Step 3
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"
```

**Expected:**

```
Status: 401
"Refresh token has expired or been revoked"
```

---

## 7. LOGOUT ALL — POST /api/auth/logout-all

Revokes every active refresh token for the authenticated user. Requires the access token in the Authorization header.

### 7.1 Logout all successfully

```bash
curl -X POST $BASE/logout-all \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Expected:**

```
Status: 200
{
  "success": true,
  "message": "Successfully logged out of 3 devices."
}
```

---

### 7.2 Fail — access token missing

```bash
curl -X POST $BASE/logout-all
```

**Expected:**

```
Status: 401
```

---

### 7.3 Fail — access token invalid

```bash
curl -X POST $BASE/logout-all \
  -H "Authorization: Bearer $INVALID_TOKEN"
```

**Expected:**

```
Status: 401
```

---

### 7.4 After logout-all, all refresh tokens should fail

**Setup:**

1. Login (device 1) → save `REFRESH_TOKEN_1`
2. Login (device 2) → save `REFRESH_TOKEN_2`
3. Call logout-all with a valid access token
4. Try to refresh with both tokens

```bash
# Step 3
curl -X POST $BASE/logout-all \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Step 4a
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN_1\"}"

# Step 4b
curl -X POST $BASE/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN_2\"}"
```

**Expected:**

```
Step 4a: Status 401
Step 4b: Status 401
```

---

### 7.5 After logout-all, sessions list should be empty

```bash
curl -X GET $BASE/sessions \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Expected:**

```
Status: 200
{
  "success": true,
  "count": 0,
  "sessions": []
}
```

---

## 8. AUTHORIZATION HEADER EDGE CASES

### 8.1 Lowercase `bearer` — should fail

```bash
curl -X GET $BASE/profile \
  -H "Authorization: bearer $ACCESS_TOKEN"
```

**Expected:**

```
Status: 401
```

> The middleware checks `authHeader.startsWith('Bearer ')` which is case-sensitive.

---

### 8.2 Extra spaces after `Bearer`

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Bearer  $ACCESS_TOKEN"
```

**Expected:**

```
Status: 401
```

> Two spaces means `.slice(7)` returns a token with a leading space — JWT verify will reject it.

---

### 8.3 Empty Bearer token

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Bearer "
```

**Expected:**

```
Status: 401
"Access token is required"
```

---

### 8.4 No Authorization header at all

```bash
curl -X GET $BASE/profile
```

**Expected:**

```
Status: 401
"Access token is required"
```

---

## 9. SECURITY / EDGE CASE TESTS

### 9.1 NoSQL injection in login email

```bash
curl -X POST $BASE/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": {"$gt":""},
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 400 or 401
```

> Mongoose schemas cast types — a `String` field receiving an object will fail validation before the query runs. If the schema uses `strictQuery: true`, unknown operators are rejected.

---

### 9.2 Oversized username (500 chars)

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$(printf 'a%.0s' {1..500})\",
    \"email\": \"biguser@gmail.com\",
    \"password\": \"Passco123@\"
  }"
```

**Expected:**

```
Status: 400
```

> Should fail if the schema has `maxlength` on username (recommended: 30).

---

### 9.3 Oversized email (300 chars)

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"bigmailuser\",
    \"email\": \"$(printf 'a%.0s' {1..300})@gmail.com\",
    \"password\": \"Passco123@\"
  }"
```

**Expected:**

```
Status: 400
```

> Should fail validation or `validator.isEmail()` should reject it.

---

### 9.4 Password with only spaces

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "spacepass",
    "email": "spacepass@gmail.com",
    "password": "     "
  }'
```

**Expected:**

```
Status: 400
```

> The service does `.trim()` on password — empty string after trim fails "Password is required" or schema `minlength`.

---

### 9.5 Username with leading/trailing spaces

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "   kwamedabo2   ",
    "email": "kwamedabo2@gmail.com",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 201 (if schema has `trim: true` on username)
```

> The schema should normalize it to `"kwamedabo2"` via `trim: true`. If `trim` is not set, it stores with spaces and causes subtle bugs.

---

### 9.6 Email with uppercase letters

```bash
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "caseuser",
    "email": "YAWA12@GMAIL.COM",
    "password": "Passco123@"
  }'
```

**Expected:**

```
Status: 201 (first time) — email stored lowercase
Status: 409 (second time) — duplicate caught
```

> The schema should have `lowercase: true` on email. Without it, `"YAWA12@GMAIL.COM"` and `"yawa12@gmail.com"` would be treated as different emails, creating a duplicate-account vulnerability.

---

### 9.7 Concurrent registration race condition

**Setup:**

Send two identical registration requests simultaneously:

```bash
# Terminal 1
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "raceuser",
    "email": "race@gmail.com",
    "password": "Passco123@"
  }' &

# Terminal 2 (same instant)
curl -X POST $BASE/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "raceuser",
    "email": "race@gmail.com",
    "password": "Passco123@"
  }' &

wait
```

**Expected:**

```
One returns 201
Other returns 409 (duplicate key / 11000)
```

> The MongoDB unique index on `email` (and `username`) catches this at the database level, even if the `User.findOne` check passes in both requests.

---

## 10. FLOW TESTS

### 10.1 Full happy path

```
1.  POST /register         → 201, tokens received
2.  POST /login            → 200, new tokens received
3.  GET  /profile          → 200, user object (no password)
4.  GET  /sessions         → 200, count >= 1
5.  POST /refresh          → 200, new tokens (old ones revoked)
6.  POST /logout           → 200, refresh token revoked
7.  POST /refresh (old)    → 401, token was rotated/revoked
```

**Expected:** every success step works; revoked or rotated tokens fail afterward.

---

### 10.2 Login twice, then logout-all

```
1.  POST /login (device 1)   → save REFRESH_1
2.  POST /login (device 2)   → save REFRESH_2
3.  GET  /sessions           → count = 2
4.  POST /logout-all         → 200, "Successfully logged out of 2 devices."
5.  POST /refresh (REFRESH_1) → 401
6.  POST /refresh (REFRESH_2) → 401
```

**Expected:** all device sessions revoked; neither refresh token works.

---

### 10.3 Refresh rotation flow

```
1.  POST /login            → save REFRESH_A
2.  POST /refresh (A)      → 200, save REFRESH_B  (A is now revoked)
3.  POST /refresh (B)      → 200, save REFRESH_C  (B is now revoked)
4.  POST /refresh (A)      → 401  (revoked in step 2)
5.  POST /refresh (B)      → 401  (revoked in step 3)
6.  POST /refresh (C)      → 200  (still valid)
```

**Expected:** only the most recent refresh token works. All previous ones are rejected.

---

### 10.4 Silent refresh via middleware (auto-rotation)

The `authenticate` middleware automatically refreshes expired access tokens when the `X-Refresh-Token` header is present.

```
1.  POST /login → save ACCESS_TOKEN, REFRESH_TOKEN
2.  Wait for access token to expire (or manually create a short-lived token for testing)
3.  GET /profile with expired ACCESS_TOKEN + valid REFRESH_TOKEN in X-Refresh-Token header
```

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Bearer $EXPIRED_ACCESS_TOKEN" \
  -H "X-Refresh-Token: $REFRESH_TOKEN"
```

**Expected:**

```
Status: 200
Response headers:
  X-New-Access-Token:  eyJ... (new)
  X-New-Refresh-Token: f9e8d7... (new)
Body:
  { user: { ... } }
```

> The middleware silently rotates the tokens and the frontend reads them from the response headers.

---

### 10.5 Profile does not expose password

```bash
curl -X GET $BASE/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  | jq '.user | has("password")'
```

**Expected:**

```
false
```

> Double-check that `password` never appears in any response body, even after token refresh.

---

## 11. EXPECTED RESPONSE SHAPE

### 11.1 Success response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "username": "kwamedabo",
    "email": "yawa12@gmail.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "a1b2c3d4e5f6..."
}
```

### 11.2 Error response

```json
{
  "success": false,
  "message": "Password did not match"
}
```

> Your centralized `handleError` middleware should wrap all errors into this shape consistently.

---

## 12. AUTOMATED TEST MATRIX

### Register

| # | Test | Expected Status |
|---|------|----------------|
| 1 | Success with all fields | 201 |
| 2 | Missing username | 400 |
| 3 | Missing email | 400 |
| 4 | Missing password | 400 |
| 5 | Duplicate username | 409 |
| 6 | Duplicate email | 409 |
| 7 | Invalid JSON body | 400 |
| 8 | Wrong content type | 400 |
| 9 | All fields empty | 400 |

### Login

| # | Test | Expected Status |
|---|------|----------------|
| 1 | Success with email | 200 |
| 2 | Success with username | 200 |
| 3 | Wrong password | 401 |
| 4 | Nonexistent user | 401 |
| 5 | Missing password | 400 |
| 6 | Missing email and username | 400 |
| 7 | Empty body | 400 |

### Profile

| # | Test | Expected Status |
|---|------|----------------|
| 1 | Success | 200 |
| 2 | No token | 401 |
| 3 | Invalid token | 401 |
| 4 | Malformed header | 401 |
| 5 | Deleted user | 401 |
| 6 | No password in response | N/A |

### Refresh

| # | Test | Expected Status |
|---|------|----------------|
| 1 | Success | 200 |
| 2 | Missing token | 401 |
| 3 | Invalid token | 401 |
| 4 | Revoked token | 401 |
| 5 | Rotated token reuse | 401 |
| 6 | Inactive user | 401 |
| 7 | New token returned | N/A |
| 8 | Old token rejected | 401 |

### Sessions

| # | Test | Expected Status |
|---|------|----------------|
| 1 | Success | 200 |
| 2 | No token | 401 |
| 3 | Invalid token | 401 |
| 4 | Count matches logins | N/A |
| 5 | Multiple sessions listed | N/A |

### Logout

| # | Test | Expected Status |
|---|------|----------------|
| 1 | Success | 200 |
| 2 | Missing refresh token | 401 |
| 3 | Invalid refresh token | 200 (idempotent) |
| 4 | Token reuse after logout | 401 (via refresh) |

### Logout All

| # | Test | Expected Status |
|---|------|----------------|
| 1 | Success | 200 |
| 2 | No access token | 401 |
| 3 | Invalid access token | 401 |
| 4 | All refresh tokens revoked | 401 (via refresh) |
| 5 | Sessions count = 0 | N/A |

---

## 13. IMPORTANT NOTES

### Note 1 — Controller / Service field mismatch

If the controller passes `req.body.token` but the service reads `payload.refreshToken` (or vice versa), logout will look up the wrong field. The service expects `refreshToken` — ensure the controller maps it correctly:

```js
// Controller must send:
{ refreshToken: req.body.refreshToken }
// NOT:
{ token: req.body.token }
```

### Note 2 — Route mount path

If your Express app mounts the router at `/api` and the route file defines `/auth/register`, the full path is `/api/auth/register`. If it's mounted at `/api/auth`, then the route should be just `/register`. Verify your `app.use()` call.

### Note 3 — JWT payload field name

The `generateAccessToken` function signs `{ userId: userId }`. The middleware must read `decoded.userId` — not `decoded.sub`, `decoded.id`, or `decoded.user`.

### Note 4 — Refresh token field in logout body

The `AuthService.logout()` reads `payload.token` — but the controller should map `req.body.refreshToken` to match. If the controller does `authService.logout({ token: req.body.refreshToken })` it works. If it does `authService.logout(req.body)` directly, the service looks for `payload.token` while the client sends `refreshToken`. This is a potential mismatch to verify.

### Note 5 — TTL index cleanup

Expired refresh tokens are auto-deleted by the MongoDB TTL index on `expiresAt` with `expireAfterSeconds: 0`. This runs every 60 seconds by default. Don't be alarmed if old tokens still appear in the collection immediately after expiry — they will be cleaned up by the next TTL pass.

### Note 6 — Silent refresh headers

The `authenticate` middleware sends new tokens in response headers (`X-New-Access-Token`, `X-New-Refresh-Token`) when it performs a silent refresh. The frontend must have an Axios interceptor or similar to read these headers and replace the stored tokens. If the frontend doesn't handle this, the next request will use the expired access token again, causing another silent refresh cycle (wasteful but not broken).
