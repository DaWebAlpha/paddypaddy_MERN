# Jest for Your Backend: Terms First, Then a Full Test Plan for Your Project Tree

## Index

1. [How to use this guide](#how-to-use-this-guide)
2. [Jest terms explained first](#jest-terms-explained-first)

   1. [What Jest is](#what-jest-is)
   2. [`describe`](#describe)
   3. [`test` and `it`](#test-and-it)
   4. [`expect`](#expect)
   5. [Matchers](#matchers)
   6. [Test suite](#test-suite)
   7. [Test case](#test-case)
   8. [Assertion](#assertion)
   9. [Mock](#mock)
   10. [Spy](#spy)
   11. [Stub](#stub)
   12. [Fake](#fake)
   13. [Fixture](#fixture)
   14. [Factory](#factory)
   15. [Builder](#builder)
   16. [Hook functions](#hook-functions)
   17. [Setup and teardown](#setup-and-teardown)
   18. [Unit test](#unit-test)
   19. [Integration test](#integration-test)
   20. [API test](#api-test)
   21. [End-to-end flow](#end-to-end-flow)
   22. [Coverage](#coverage)
   23. [Snapshot](#snapshot)
   24. [Fake timers](#fake-timers)
   25. [Async test](#async-test)
   26. [Open handles](#open-handles)
   27. [Flaky test](#flaky-test)
   28. [Regression test](#regression-test)
   29. [Happy path](#happy-path)
   30. [Failure path](#failure-path)
3. [How Jest fits your backend architecture](#how-jest-fits-your-backend-architecture)
4. [Reading your project tree the right way](#reading-your-project-tree-the-right-way)
5. [What should be tested in your project](#what-should-be-tested-in-your-project)
6. [Testing order for your current codebase](#testing-order-for-your-current-codebase)
7. [Recommended test folder structure for your tree](#recommended-test-folder-structure-for-your-tree)
8. [Jest configuration for your project](#jest-configuration-for-your-project)
9. [Base setup files you should create](#base-setup-files-you-should-create)
10. [Template helper files for your tests](#template-helper-files-for-your-tests)
11. [How to test your `config` folder](#how-to-test-your-config-folder)
12. [How to test your `errors` folder](#how-to-test-your-errors-folder)
13. [How to test your `utils` folder](#how-to-test-your-utils-folder)
14. [How to test your `middlewares` folder](#how-to-test-your-middlewares-folder)
15. [How to test your `controllers` folder](#how-to-test-your-controllers-folder)
16. [How to test your `services` folder](#how-to-test-your-services-folder)
17. [How to test your `repositories` folder](#how-to-test-your-repositories-folder)
18. [How to test your `models` folder](#how-to-test-your-models-folder)
19. [How to test your `routes` and `app.js`](#how-to-test-your-routes-and-appjs)
20. [How to test `database/mongo.transaction.js`](#how-to-test-databasemongotransactionjs)
21. [How to test `core` files](#how-to-test-core-files)
22. [How to test auth in your specific tree](#how-to-test-auth-in-your-specific-tree)
23. [How to test location modules in your specific tree](#how-to-test-location-modules-in-your-specific-tree)
24. [How to test logs without depending on log files](#how-to-test-logs-without-depending-on-log-files)
25. [How to add Mongo memory testing](#how-to-add-mongo-memory-testing)
26. [How to test transactions and sessions](#how-to-test-transactions-and-sessions)
27. [How to test Redis-dependent code](#how-to-test-redis-dependent-code)
28. [How to test mail, JWT, Argon2, and Google verification utilities](#how-to-test-mail-jwt-argon2-and-google-verification-utilities)
29. [Coverage targets for this backend](#coverage-targets-for-this-backend)
30. [What your current test suite is missing](#what-your-current-test-suite-is-missing)
31. [The enterprise rollout plan for your project](#the-enterprise-rollout-plan-for-your-project)
32. [Starter code templates tailored to your tree](#starter-code-templates-tailored-to-your-tree)
33. [Holy grail backend notes for your project](#holy-grail-backend-notes-for-your-project)
34. [Final checklist](#final-checklist)

---

## How to use this guide

This guide is written for **your exact backend shape**.

You asked for two things:

1. explain Jest terms first
2. tailor the testing strategy to your real tree

So this guide starts with the language of testing, then maps every major folder in your backend to the kind of tests you should write.

The goal is not only to make tests pass.
The goal is to make your backend:

* safe to refactor
* safe to deploy
* easy to debug
* hard to break silently
* strong enough for enterprise-style development

---

# Jest terms explained first

## What Jest is

Jest is a JavaScript testing framework.

It helps you:

* organize tests
* run tests
* make assertions
* mock dependencies
* measure coverage
* debug failures
* isolate behavior

Think of Jest as the test runner, assertion environment, mocking system, and report system all in one.

---

## `describe`

`describe` groups related tests together.

Example:

```js
describe('AppError', () => {
  test('creates default values', () => {
    // test body
  });
});
```

Use `describe` when multiple tests belong to one file, one class, one function, or one behavior group.

Good examples:

* `describe('authMiddleware', ...)`
* `describe('AuthService.register', ...)`
* `describe('CountryRepository.create', ...)`

---

## `test` and `it`

These define one behavior you want to verify.

```js
test('returns 401 when token is missing', () => {});
```

`it` is just another readable style:

```js
it('returns 401 when token is missing', () => {});
```

Use either one consistently.

---

## `expect`

`expect` starts an assertion.

```js
expect(result).toBeDefined();
```

It is how you say, “I expect this outcome to be true.”

---

## Matchers

Matchers are the methods after `expect(...)`.

Examples:

* `toBe`
* `toEqual`
* `toStrictEqual`
* `toBeDefined`
* `toBeNull`
* `toHaveProperty`
* `toContain`
* `toThrow`
* `toHaveBeenCalledWith`
* `rejects.toThrow`
* `resolves.toEqual`

### `toBe`

Use for primitive exact equality.

```js
expect(statusCode).toBe(400);
```

### `toEqual`

Use for object and array deep comparison.

```js
expect(error.details).toEqual({ field: 'email' });
```

### `toStrictEqual`

Like `toEqual`, but stricter about shape and undefined fields.

### `toHaveBeenCalled`

Used on mock functions.

```js
expect(next).toHaveBeenCalled();
```

### `rejects`

Used for async errors.

```js
await expect(service.login(payload)).rejects.toThrow('Invalid credentials');
```

---

## Test suite

A test suite is a group of related tests, usually inside one file or one `describe` block.

Example:

* `tests/errors/app.error.test.js`
* `tests/middlewares/auth.middleware.test.js`

Each file can be viewed as one suite.

---

## Test case

A single `test(...)` is one test case.

Example:

```js
test('should create default error', () => {
  const error = new AppError();
  expect(error.statusCode).toBe(500);
});
```

---

## Assertion

An assertion is a statement that checks the result.

Example:

```js
expect(error.message).toBe('Application error');
```

One test can contain multiple assertions.

---

## Mock

A mock is a controlled fake function or module used during testing.

You use mocks when you do not want the real dependency to run.

Example:

* do not hit real Redis
* do not send a real email
* do not call real Google token verification
* do not hit a real payment provider

Example:

```js
const next = jest.fn();
```

or

```js
jest.mock('../../src/repositories/user.repository.js');
```

---

## Spy

A spy watches an existing function and lets you inspect how it was called.

```js
const spy = jest.spyOn(userRepository, 'findById');
```

Use a spy when:

* you want to observe calls to a real method
* or temporarily replace that method but still track usage

---

## Stub

A stub is a test double that returns controlled data.

In Jest, you often do this with:

```js
jest.spyOn(service, 'method').mockResolvedValue(data);
```

or

```js
jest.fn().mockReturnValue(value);
```

---

## Fake

A fake is a working replacement with simplified behavior.

Example:

* in-memory database
* fake queue implementation
* fake mail sender that stores payloads in memory instead of sending mail

---

## Fixture

A fixture is predefined test data.

Example:

```js
export const validRegisterPayload = {
  username: 'kashi',
  email: 'kashi@example.com',
  password: 'Password123!'
};
```

Fixtures help keep repeated data clean and reusable.

---

## Factory

A factory creates test data dynamically.

Example:

```js
export const buildUserPayload = (overrides = {}) => ({
  username: 'kashi',
  email: `user_${Date.now()}@example.com`,
  password: 'Password123!',
  role: 'user',
  ...overrides,
});
```

Factories are better than hardcoded fixtures when unique values matter.

This is important for Mongoose models with unique indexes.

---

## Builder

A builder is a more advanced data creator for complex objects.

Use it when payloads are large and have many optional branches.

---

## Hook functions

Jest hooks are:

* `beforeAll`
* `beforeEach`
* `afterEach`
* `afterAll`

### `beforeAll`

Runs once before all tests in a suite.

Use it for:

* connecting to a test database
* bootstrapping shared setup

### `beforeEach`

Runs before every test.

Use it for:

* resetting test data
* clearing mocks
* preparing clean state

### `afterEach`

Runs after every test.

Use it for:

* clearing database collections
* resetting timers

### `afterAll`

Runs once after all tests.

Use it for:

* closing DB connections
* stopping Mongo memory server
* closing Redis connections

---

## Setup and teardown

Setup means preparing the test environment.
Teardown means cleaning it up.

If setup and teardown are weak, tests become flaky.

---

## Unit test

A unit test checks one small piece of logic in isolation.

Examples from your tree:

* `string.utils.js`
* `app.error.js`
* `bad-request.error.js`
* `role.middleware.js`
* small service methods with dependencies mocked

---

## Integration test

An integration test checks how multiple real parts work together.

Examples from your tree:

* repository + mongoose model + in-memory MongoDB
* controller + service + mocked repositories
* Express route + middleware + controller + app

---

## API test

An API test sends real HTTP-like requests through your Express app using `supertest`.

Example:

* `POST /auth/login`
* `POST /location/country`
* `GET /health`

---

## End-to-end flow

In a backend-only project, this usually means a full request flow from route to middleware to controller to service to repository to database.

---

## Coverage

Coverage tells you how much of your code ran during tests.

Important types:

* statements
* branches
* functions
* lines

Branch coverage matters a lot for services and middleware because your backend has many `if` paths and error paths.

---

## Snapshot

A snapshot stores a previous output and compares future outputs against it.

Snapshots are used heavily in frontend testing, but for backend code they are usually less important.

For your backend, direct assertions are usually better than snapshots.

---

## Fake timers

Use fake timers when testing:

* token expiry
* lockout duration
* retry delays
* scheduled logic

---

## Async test

An async test is any test that waits for promises or async code.

Correct:

```js
await expect(authService.login(payload)).rejects.toThrow();
```

Wrong:

```js
expect(authService.login(payload)).rejects.toThrow();
```

---

## Open handles

Open handles are things keeping Jest from exiting.

Common causes in your kind of project:

* mongoose connection left open
* redis client left open
* timers still running
* mail/queue connections left open

---

## Flaky test

A flaky test sometimes passes and sometimes fails.

Common causes:

* shared state
* real time dependency
* race conditions
* random data without control
* database not cleaned between tests

---

## Regression test

A regression test is written after a bug is found, so that exact bug never silently returns.

Example from your current situation:

If `AppError is not a constructor` happened before, you should keep a regression test that locks down the export/import shape forever.

---

## Happy path

This is the successful, expected flow.

Example:

* valid token
* valid payload
* service succeeds
* response is 201

---

## Failure path

This is the error flow.

Example:

* no token
* invalid role
* missing district slug
* duplicate country
* repository throws error
* transaction fails

Enterprise backends are protected by failure-path tests more than happy-path tests.

---

# How Jest fits your backend architecture

Your project is a classic layered backend:

* `routes`
* `middlewares`
* `controllers`
* `services`
* `repositories`
* `models`
* `utils`
* `errors`
* `core`
* `database`

That means your testing strategy should also be layered.

Best mapping:

* **errors + utils + simple middlewares** -> unit tests first
* **services** -> strong unit tests with mocked repos and dependencies
* **repositories + models** -> integration tests with Mongo memory server
* **routes + app** -> API tests with `supertest`
* **transaction + auth flows** -> targeted integration tests

---

# Reading your project tree the right way

Here is the important reality in your tree:

## Already testable immediately

* `src/errors/*`
* `src/config/config.js`
* `src/middlewares/*`
* `src/utils/string.utils.js`
* `src/utils/jwt.js`
* `src/utils/password.argon2.js`
* `src/services/auth/auth.service.js`
* `src/services/location/*`

## Needs integration support

* `src/models/*`
* `src/repositories/*`
* `src/database/mongo.transaction.js`
* `src/core/mongoose.database.js`

## Needs API test wiring

* `src/app.js`
* `src/routes/*`
* `src/controllers/*`

## Needs careful mocking

* `src/core/redis.js`
* `src/utils/mail.js`
* `src/utils/google.verify.js`
* `src/core/pino.logger.js`

---

# What should be tested in your project

## 1. Config

You already started this.
Test:

* values exist
* numeric values are numbers
* env-specific values change correctly in test mode
* secrets are defined
* Mongo URI exists

## 2. Error classes

You already started this too.
Test:

* inheritance
* default message
* custom message
* default status code
* custom details payload
* `name` correctness

## 3. Middlewares

Very important in your tree.
Test:

* `auth.middleware.js`
* `role.middleware.js`
* `accountType.middleware.js`
* `isPremium.middleware.js`
* `onboarding.middleware.js`
* `handleError.js`
* `notFound.js`
* rate limit middlewares

## 4. Services

This is where business rules live.
Test:

* `auth.service.js`
* `country.service.js`
* `district.service.js`
* `region.Service.js`
* `town.service.js`

## 5. Repositories

Test with real in-memory MongoDB.

## 6. Models

Test schema rules, defaults, enums, hooks, indexes, and methods.

## 7. Routes and API flows

Test the full request chain with `supertest`.

---

# Testing order for your current codebase

Do not try to test all 170 files at once.

Use this order:

## Phase 1: stabilize what already exists

1. `config`
2. `errors`
3. `middlewares`
4. `utils/string.utils.js`

## Phase 2: service confidence

5. `auth.service.js`
6. location services

## Phase 3: database confidence

7. location models
8. auth models
9. repositories

## Phase 4: request confidence

10. auth routes
11. country/region/district/town routes
12. global app behavior

## Phase 5: enterprise hardening

13. transactions
14. Redis rate limit behavior
15. logging assertions
16. auth edge cases
17. regression tests for old bugs

---

# Recommended test folder structure for your tree

Your current `tests` folder is too small for your real backend size.

Use this structure:

```text
tests/
  setup/
    env.setup.js
    db.setup.js
    redis.setup.js
  helpers/
    mock-express.js
    factories/
      user.factory.js
      country.factory.js
      region.factory.js
      district.factory.js
      town.factory.js
  unit/
    config/
      config.test.js
    errors/
      app.error.test.js
      bad-request.error.test.js
      bad-gateway.error.test.js
      conflict.error.test.js
      gateway-timeout.error.test.js
      internal-server.error.test.js
      not-found.error.test.js
      service-unavailable.error.test.js
      too-many-requests.error.test.js
      unauthenticated.error.test.js
      unauthorized.error.test.js
    utils/
      string.utils.test.js
      jwt.test.js
      password.argon2.test.js
      request.test.js
      autoCatchFn.test.js
    middlewares/
      auth.middleware.test.js
      role.middleware.test.js
      accountType.middleware.test.js
      isPremium.middleware.test.js
      onboarding.middleware.test.js
      notFound.test.js
      handleError.test.js
      authRateLimit.middleware.test.js
      rateLimit.redis.middleware.test.js
    services/
      auth/
        auth.service.test.js
      location/
        country.service.test.js
        region.service.test.js
        district.service.test.js
        town.service.test.js
    controllers/
      auth/
        auth.controller.test.js
      location/
        country.controller.test.js
        region.controller.test.js
        district.controller.test.js
        town.controller.test.js
  integration/
    models/
      auth/
        user.model.test.js
        refreshToken.model.test.js
        passwordResetToken.model.test.js
        email.verification.model.test.js
      location/
        country.model.test.js
        region.model.test.js
        district.model.test.js
        town.model.test.js
    repositories/
      base.repository.test.js
      user.repository.test.js
      location/
        country.repository.test.js
        region.repository.test.js
        district.repository.test.js
        town.repository.test.js
    database/
      mongo.transaction.test.js
  api/
    app.test.js
    auth/
      auth.routes.test.js
    location/
      country.routes.test.js
      region.routes.test.js
      district.routes.test.js
      town.routes.test.js
```

---

# Jest configuration for your project

Because your backend appears to use ESM, here is the safer template.

## `package.json` scripts

```json
{
  "scripts": {
    "test": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test:watch": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js --watch",
    "test:unit": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/unit",
    "test:integration": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/integration --runInBand",
    "test:api": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js tests/api --runInBand",
    "test:coverage": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage --runInBand",
    "test:detect": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js --detectOpenHandles --runInBand"
  }
}
```

## `jest.config.js`

```js
export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/seed/**',
    '!src/socket/**',
    '!src/**/documentation/**'
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/env.setup.js'],
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
};
```

Why exclude `server.js`?
Because it is usually only the bootstrap entry, not business logic.

Why exclude `seed`?
Because seed files are data bootstrapping, not normal app behavior.

---

# Base setup files you should create

## `tests/setup/env.setup.js`

```js
process.env.NODE_ENV = 'test';
process.env.PORT = '4001';
process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/test-db';
process.env.JWT_ACCESS_SECRET = 'test-access-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_ACCESS_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '7d';
process.env.MAX_FAILED_ATTEMPTS = '5';
process.env.ACCOUNT_LOCK_DURATION_MINUTES = '15';
```

## `tests/setup/db.setup.js`

```js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export const connectTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;

  for (const name of Object.keys(collections)) {
    await collections[name].deleteMany({});
  }
};

export const disconnectTestDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};
```

---

# Template helper files for your tests

## `tests/helpers/mock-express.js`

```js
export const mockReq = (overrides = {}) => ({
  headers: {},
  body: {},
  params: {},
  query: {},
  user: null,
  ip: '127.0.0.1',
  method: 'GET',
  originalUrl: '/',
  ...overrides,
});

export const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};
```

## `tests/helpers/factories/user.factory.js`

```js
let count = 0;

export const buildUserPayload = (overrides = {}) => {
  count += 1;

  return {
    username: `user${count}`,
    email: `user${count}@example.com`,
    password: 'Password123!',
    role: 'user',
    account_type: 'customer',
    ...overrides,
  };
};
```

---

# How to test your `config` folder

File:

* `src/config/config.js`

You already have `tests/config/config.test.js`.
That is good.

Add these checks too:

* every required config value exists
* numeric config values are cast correctly
* JWT secrets are strings
* expiry values exist
* Mongo URI has usable shape
* Redis URL or Redis config exists if required
* test environment loads `node_env = test`

Template:

```js
import config from '../../src/config/config.js';

describe('config', () => {
  test('should expose test environment', () => {
    expect(config.node_env).toBe('test');
  });

  test('should expose numeric port', () => {
    expect(typeof config.port).toBe('number');
  });

  test('should expose jwt settings', () => {
    expect(config.jwt_access_secret).toBeDefined();
    expect(config.jwt_refresh_secret).toBeDefined();
    expect(config.jwt_access_expires_in).toBeDefined();
    expect(config.jwt_refresh_expires_in).toBeDefined();
  });
});
```

---

# How to test your `errors` folder

Files:

* `app.error.js`
* `bad-gateway.error.js`
* `bad-request.error.js`
* `conflict.error.js`
* `gateway-timeout.error.js`
* `internal-server.error.js`
* `not-found.error.js`
* `service-unavailable.error.js`
* `too-many-requests.error.js`
* `unauthenticated.error.js`
* `unauthorized.error.js`

You already have tests for them, which is a strong start.

## What every error test should verify

1. instance of `Error`
2. instance of `AppError`
3. correct `name`
4. correct default `message`
5. correct default `statusCode`
6. preserves `details`
7. custom message works
8. custom details work

## Important special regression for your project

Because you saw:

* `TypeError: AppError is not a constructor`

You need to test your export shape carefully.

Example:

```js
import AppError from '../../src/errors/app.error.js';

describe('AppError export', () => {
  test('should be a constructible class', () => {
    expect(typeof AppError).toBe('function');
    const error = new AppError();
    expect(error).toBeInstanceOf(Error);
  });
});
```

If your exports are named exports instead, keep imports consistent in every test and every subclass file.

---

# How to test your `utils` folder

Files of interest:

* `autoCatchFn.js`
* `google.verify.js`
* `gracefulShutDown.js`
* `jwt.js`
* `mail.js`
* `password.argon2.js`
* `request.js`
* `string.utils.js`

## `string.utils.js`

Test heavily.

You already use helpers like `cleanName`, `formatName`, maybe `formatSlug`.

Test:

* trims spaces
* lowercases when expected
* keeps non-strings unchanged if that is your design
* compresses multiple spaces
* creates correct slug if slug helper exists

## `jwt.js`

Test:

* generates access token
* generates refresh token
* verifies valid token
* rejects malformed token
* rejects expired token
* rejects token with wrong secret
* rejects wrong token type if your payload distinguishes that

## `password.argon2.js`

Test:

* hashes password
* hashed output differs from raw input
* verify returns true for correct password
* verify returns false for wrong password

## `autoCatchFn.js`

Test:

* wraps async controller
* forwards rejected error to `next`

## `mail.js`

Unit test only.
Do not send real emails.
Mock transporter or provider.

## `google.verify.js`

Mock Google SDK or verifier call.
Test:

* valid token accepted
* invalid token rejected
* provider error handled

---

# How to test your `middlewares` folder

Files:

* `accountType.middleware.js`
* `auth.middleware.js`
* `authRateLimit.middleware.js`
* `handleError.js`
* `isPremium.middleware.js`
* `notFound.js`
* `onboarding.middleware.js`
* `rateLimit.redis.middleware.js`
* `role.middleware.js`

This folder deserves a lot more tests than you currently have.

## 1. `auth.middleware.js`

You already have a test file. Expand it.

Test cases:

* no authorization header -> 401
* header without `Bearer ` -> 401
* empty bearer token -> 401
* invalid token -> 401
* expired token -> 401
* decoded token but no user in DB -> 401
* decoded token with inactive or blocked user -> correct error if your code checks this
* success -> sets `req.user` and calls `next`

Mock:

* `verifyAccessToken`
* `userRepository.findActiveById`

## 2. `role.middleware.js`

Test:

* missing user -> 401
* wrong role -> 403
* correct role -> next
* multiple allowed roles -> correct one passes

## 3. `accountType.middleware.js`

Test:

* missing user -> blocked
* wrong account type -> forbidden
* valid account type -> next

## 4. `isPremium.middleware.js`

Test:

* free user denied
* premium user allowed
* expired premium denied if logic exists

## 5. `onboarding.middleware.js`

Test:

* onboarded user allowed
* not onboarded blocked

## 6. `notFound.js`

Test:

* unknown route returns 404
* message shape is correct

## 7. `handleError.js`

Very important.

Test:

* `AppError` returns its status code
* unknown error returns 500
* validation error maps correctly if you added such mapping
* response body does not leak stack in production mode

## 8. `authRateLimit.middleware.js` and `rateLimit.redis.middleware.js`

Test both behavior and safety.

Test:

* below limit -> allowed
* exact limit edge -> expected behavior
* above limit -> 429
* Redis failure fallback -> safe behavior

---

# How to test your `controllers` folder

Files:

* `auth/auth.controller.js`
* location controllers

Controllers should be thin.

A controller test should verify:

* service was called with correct payload
* correct status returned
* correct JSON returned
* errors passed to `next`

Do not put full business logic testing into controller tests.
That belongs in services.

Example:

```js
import { mockReq, mockRes } from '../../helpers/mock-express.js';
import authService from '../../../src/services/auth/auth.service.js';
import { register } from '../../../src/controllers/auth/auth.controller.js';

jest.mock('../../../src/services/auth/auth.service.js');

describe('auth.controller register', () => {
  test('should return 201 on success', async () => {
    const req = mockReq({
      body: { email: 'user@example.com', password: 'Password123!' }
    });
    const res = mockRes();
    const next = jest.fn();

    authService.register.mockResolvedValue({ id: '1', email: 'user@example.com' });

    await register(req, res, next);

    expect(authService.register).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(next).not.toHaveBeenCalled();
  });
});
```

---

# How to test your `services` folder

Files:

* `services/auth/auth.service.js`
* `services/location/country.service.js`
* `services/location/district.service.js`
* `services/location/region.Service.js`
* `services/location/town.service.js`

This is one of the most important parts of your backend.

## `auth.service.js`

Test with repositories and external dependencies mocked.

Mock likely dependencies:

* `userRepository`
* `RefreshToken`
* `EmailVerificationToken`
* `verifyGoogleIdToken`
* `generateAccessToken`
* `generateRefreshToken`
* `verifyAccessToken`
* `verifyRefreshToken`
* `redis`
* loggers
* password hashing utility
* transaction helper if used

### Key `auth.service.js` cases

#### Register

* username normalized correctly
* email normalized correctly
* missing username rejected
* missing email rejected
* duplicate email rejected
* duplicate username rejected if your code checks it
* password hashed
* user created
* verification token created
* audit log called
* transaction committed on success
* transaction rolled back on failure

#### Login

* email not found rejected
* wrong password rejected
* locked account rejected
* inactive account rejected
* access token returned
* refresh token returned
* failed attempts incremented when needed
* failed attempts reset on successful login if logic exists

#### Refresh token flow

* valid refresh token issues new access token
* invalid refresh token rejected
* revoked refresh token rejected
* user missing rejected

#### Logout

* refresh token removed or revoked
* redis/session invalidated if used

#### Google auth

* valid Google token accepted
* invalid Google token rejected
* new user creation path works if supported
* existing user path works if supported

## `country.service.js`, `region.Service.js`, `district.service.js`, `town.service.js`

These are excellent service-testing candidates because they have validation and repository orchestration.

### Country service cases

* missing `country` rejected
* missing `iso_code` rejected
* missing `slug` rejected if required by your implementation
* duplicate country rejected
* duplicate iso code rejected
* duplicate slug rejected
* create success returns created country
* audit logger called

### Region service cases

* missing `region` rejected
* missing `country_slug` rejected
* country not found rejected
* duplicate region in country rejected
* valid region created

### District service cases

* missing district rejected
* missing region slug rejected
* region not found rejected
* duplicate district rejected
* create success

### Town service cases

* missing town rejected
* missing district slug rejected
* district not found rejected
* duplicate town in district rejected
* create success

These are exactly the kind of services where you should verify both business logic and repository interactions.

---

# How to test your `repositories` folder

Files:

* `base.repository.js`
* `admin.repository.js`
* `user.repository.js`
* location repositories

Repository tests should use real Mongoose models and a Mongo memory database.

## `base.repository.js`

Because many repositories may inherit from it, this file is very important.

Test:

* create
* findOne
* findById
* updateById
* delete or soft delete if implemented
* pagination helpers
* sort options
* session option propagation
* `_extractQueryOptions` logic

## `user.repository.js`

Test:

* create user
* find by email
* find active by id
* exists helpers
* unique behaviors

## Location repositories

Test:

* create country/region/district/town
* find by slug
* exists by composite keys
* parent-child lookups work correctly

---

# How to test your `models` folder

You have many models, so do not start with all of them.

Start with these:

## Auth models

* `user.model.js`
* `refreshToken.model.js`
* `passwordResetToken.model.js`
* `email.verification.model.js`

## Location models

* `country.model.js`
* `region.model.js`
* `district.model.js`
* `town.model.js`

These support your core routes and services.

## What to verify on models

* required fields
* enum validation
* defaults
* timestamps
* lowercase/trim transformations
* indexes if reflected in schema
* methods and statics
* relations/references

### Example user model tests

* email required
* password required
* role default correct
* account type default correct if defined
* email normalized
* invalid enum rejected

### Example location model tests

* country requires `country`, `iso_code`, `slug`
* region requires country reference
* district requires region reference
* town requires district reference

---

# How to test your `routes` and `app.js`

Files:

* `src/app.js`
* `src/routes/index.js`
* `src/routes/auth/auth.js`
* location route files

These should be tested with `supertest`.

## What route tests should verify

* route exists
* method exists
* middleware chain works
* validation failures return expected status
* success path returns expected status/body
* unauthorized requests are blocked
* authorized requests pass

### API examples for your app

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/refresh-token`
* location creation routes
* unknown route -> 404

### `app.js` global tests

* unknown route uses `notFound`
* thrown errors use `handleError`
* JSON parsing works
* route mounting is correct

---

# How to test `database/mongo.transaction.js`

This file matters a lot if you want enterprise quality.

Test:

* starts session
* starts transaction
* commits on success
* aborts on failure
* ends session in both success and failure paths
* returns wrapped function result

You can test this in two ways:

## Unit style

Mock session methods.

## Integration style

Use a real MongoDB replica set test environment if transaction support is needed.

At minimum, unit-test the orchestration.

---

# How to test `core` files

Files:

* `mongoose.database.js`
* `pino.logger.js`
* `redis.js`

## `mongoose.database.js`

Test:

* successful connection function calls mongoose connect
* failure path logs or throws correctly

Usually mock `mongoose.connect`.

## `pino.logger.js`

Do not test actual log file creation in normal unit tests.
Test:

* exported logger objects exist
* functions can be called
* business code calls logger methods with structured payloads

## `redis.js`

Mock the Redis client in most unit tests.
Test:

* exported client exists
* connect/setup errors handled
* dependent code behaves correctly when Redis fails

---

# How to test auth in your specific tree

Your auth stack crosses these files:

* `routes/auth/auth.js`
* `controllers/auth/auth.controller.js`
* `services/auth/auth.service.js`
* `middlewares/auth.middleware.js`
* `models/auth/*`
* `repositories/user.repository.js`
* `utils/jwt.js`
* `utils/password.argon2.js`
* `utils/google.verify.js`
* `core/redis.js`

That means auth should be tested at three levels.

## Unit level

* `jwt.js`
* `password.argon2.js`
* `auth.middleware.js`
* `auth.service.js`

## Integration level

* user model
* refresh token model
* user repository

## API level

* register route
* login route
* refresh route
* protected route with token
* protected route without token

This multi-layer testing is what gives real confidence.

---

# How to test location modules in your specific tree

Your location stack crosses:

* controllers/location/*
* services/location/*
* repositories/location/*
* models/location/*
* routes/location/*

That is perfect for layered testing.

## Unit level

Test services:

* input validation
* parent slug resolution
* duplicate checks
* logging calls
* correct repository orchestration

## Integration level

Test models and repositories:

* country create/find
* region belongs to country
* district belongs to region
* town belongs to district

## API level

Test route flows:

* create country
* create region under country
* create district under region
* create town under district
* invalid parent slug returns not found
* duplicates return conflict/bad request depending on your error design

---

# How to test logs without depending on log files

Your project has actual log directories:

* access
* audit
* errors
* system

Do not build most tests around real log files.
That makes tests slow and brittle.

Instead, test that your code calls the logger.

Example:

```js
import { system_logger } from '../../../src/core/pino.logger.js';

jest.mock('../../../src/core/pino.logger.js', () => ({
  system_logger: {
    error: jest.fn(),
    info: jest.fn(),
  },
  audit_logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));
```

Then assert:

```js
expect(system_logger.error).toHaveBeenCalledWith('Country is required');
```

That is the right testing level for logging in most unit tests.

---

# How to add Mongo memory testing

Install:

```bash
npm install -D mongodb-memory-server
```

Use it for:

* model integration tests
* repository integration tests
* API tests that require a real DB

This is one of the best upgrades for your backend because you use Mongoose heavily.

---

# How to test transactions and sessions

Your backend already has transaction infrastructure.

Test these cases in service tests:

* `createCountry` or `register` success path commits
* any downstream failure aborts transaction
* session passed to repository methods if your services use it

Example assertion pattern:

```js
expect(userRepository.create).toHaveBeenCalledWith(
  expect.any(Object),
  expect.objectContaining({ session: expect.anything() })
);
```

If your transaction helper wraps a callback, test both result return and rollback path.

---

# How to test Redis-dependent code

Files:

* `core/redis.js`
* auth rate limit middleware
* redis-based rate limiter
* auth service session/token flows if using Redis

Test:

* Redis returns expected count -> request allowed
* Redis says limit exceeded -> 429
* Redis unavailable -> safe fallback path
* token blacklist/session invalidation works if implemented

Mock Redis methods such as:

* `get`
* `set`
* `setEx`
* `del`
* `incr`
* `expire`

---

# How to test mail, JWT, Argon2, and Google verification utilities

## Mail

Mock the whole transport/provider.
Test only that:

* correct function is called
* correct recipient is used
* correct template or subject is used

## JWT

Test:

* sign access token
* sign refresh token
* verify access token
* verify refresh token
* reject invalid token

## Argon2

Test:

* hash is created
* verification success
* verification fails for wrong password

## Google verification

Mock provider result.
Test:

* valid ID token returns payload
* invalid ID token throws
* provider/network error handled

---

# Coverage targets for this backend

Do not chase fake perfection.
But do set standards.

Recommended targets for your project:

```js
coverageThreshold: {
  global: {
    branches: 75,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

Then for critical folders aim higher over time:

* `src/errors` -> 95%+
* `src/middlewares` -> 90%+
* `src/services` -> 85%+
* `src/utils` -> 85%+
* `src/repositories` -> high-value integration coverage

Branch coverage is very important for:

* `auth.service.js`
* location services
* `auth.middleware.js`
* `handleError.js`
* rate limit middlewares

---

# What your current test suite is missing

Right now your `tests` tree mainly covers:

* config
* errors
* some middlewares

That means it is missing a lot of real business confidence.

## Biggest missing areas

1. `utils` tests
2. controller tests
3. service tests
4. repository integration tests
5. model integration tests
6. route/API tests
7. transaction tests
8. Redis fallback tests
9. auth flow tests
10. location module flow tests

This is why your next growth should focus on services first, then model/repository integration, then routes.

---

# The enterprise rollout plan for your project

## Step 1

Finish and fix all existing error tests.

## Step 2

Complete all middleware tests.

## Step 3

Add utility tests:

* string utils
* jwt
* password argon2
* autoCatchFn

## Step 4

Add service tests for:

* auth
* country
* region
* district
* town

## Step 5

Add Mongo memory integration tests for models and repositories.

## Step 6

Add `supertest` API tests for auth and location routes.

## Step 7

Add transaction and Redis edge-case tests.

## Step 8

Add regression tests whenever you fix a real bug.

That is the correct enterprise progression for your exact tree.

---

# Starter code templates tailored to your tree

## 1. AppError test template

```js
import AppError from '../../src/errors/app.error.js';

describe('AppError', () => {
  test('should create default error', () => {
    const error = new AppError();

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.name).toBe('AppError');
    expect(error.message).toBe('Application error');
    expect(error.statusCode).toBe(500);
    expect(error.details).toBeNull();
  });

  test('should accept custom values', () => {
    const error = new AppError('Custom', 400, { field: 'email' });

    expect(error.message).toBe('Custom');
    expect(error.statusCode).toBe(400);
    expect(error.details).toEqual({ field: 'email' });
  });
});
```

## 2. `auth.middleware.js` template

```js
import { mockReq, mockRes } from '../helpers/mock-express.js';
import { authMiddleware } from '../../src/middlewares/auth.middleware.js';
import { verifyAccessToken } from '../../src/utils/jwt.js';
import userRepository from '../../src/repositories/user.repository.js';

jest.mock('../../src/utils/jwt.js', () => ({
  verifyAccessToken: jest.fn(),
}));

jest.mock('../../src/repositories/user.repository.js', () => ({
  __esModule: true,
  default: {
    findActiveById: jest.fn(),
  },
}));

describe('authMiddleware', () => {
  test('should return 401 when header is missing', async () => {
    const req = mockReq();
    const res = mockRes();
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next when token is valid and user exists', async () => {
    const req = mockReq({
      headers: { authorization: 'Bearer valid-token' },
    });
    const res = mockRes();
    const next = jest.fn();

    verifyAccessToken.mockResolvedValue({ sub: 'user123' });
    userRepository.findActiveById.mockResolvedValue({ _id: 'user123', role: 'user' });

    await authMiddleware(req, res, next);

    expect(req.user).toEqual({ _id: 'user123', role: 'user' });
    expect(next).toHaveBeenCalled();
  });
});
```

## 3. `country.service.js` template

```js
import countryService from '../../../src/services/location/country.service.js';
import { BadRequestError, ConflictError } from '../../../src/errors/index.js';
import { countryRepository } from '../../../src/repositories/index.js';

jest.mock('../../../src/repositories/index.js', () => ({
  countryRepository: {
    existsByCountry: jest.fn(),
    existsByIso_code: jest.fn(),
    existsBySlug: jest.fn(),
    create: jest.fn(),
  },
}));

describe('CountryService.createCountry', () => {
  test('should throw when country is missing', async () => {
    await expect(countryService.createCountry({})).rejects.toBeInstanceOf(BadRequestError);
  });

  test('should throw when country already exists', async () => {
    countryRepository.existsByCountry.mockResolvedValue(true);
    countryRepository.existsByIso_code.mockResolvedValue(false);
    countryRepository.existsBySlug.mockResolvedValue(false);

    await expect(
      countryService.createCountry({ country: 'Ghana', iso_code: 'GH', slug: 'ghana' })
    ).rejects.toBeInstanceOf(ConflictError);
  });
});
```

## 4. `role.middleware.js` template

```js
import roleMiddleware from '../../src/middlewares/role.middleware.js';
import { mockReq, mockRes } from '../helpers/mock-express.js';

describe('roleMiddleware', () => {
  test('should return 401 if req.user is missing', () => {
    const req = mockReq();
    const res = mockRes();
    const next = jest.fn();

    roleMiddleware('admin')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 403 if role is not allowed', () => {
    const req = mockReq({ user: { role: 'user' } });
    const res = mockRes();
    const next = jest.fn();

    roleMiddleware('admin')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if role is allowed', () => {
    const req = mockReq({ user: { role: 'admin' } });
    const res = mockRes();
    const next = jest.fn();

    roleMiddleware('admin')(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
```

## 5. Model integration template

```js
import Country from '../../../src/models/location/country.model.js';
import { connectTestDB, clearTestDB, disconnectTestDB } from '../../setup/db.setup.js';

describe('Country model', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  test('should require country fields', async () => {
    const country = new Country({});
    await expect(country.validate()).rejects.toThrow();
  });

  test('should create valid country', async () => {
    const country = await Country.create({
      country: 'ghana',
      iso_code: 'GH',
      slug: 'ghana',
    });

    expect(country._id).toBeDefined();
    expect(country.country).toBe('ghana');
  });
});
```

## 6. API route template

```js
import request from 'supertest';
import app from '../../../src/app.js';

describe('GET unknown route', () => {
  test('should return 404', async () => {
    const response = await request(app).get('/unknown-route');

    expect(response.status).toBe(404);
  });
});
```

---

# Holy grail backend notes for your project

## 1. Services are your truth center

Your controllers should stay thin.
Your services should carry the business rules.
That means most of your deep logic tests should live in service tests.

## 2. Errors should be locked down forever

Your custom error system is foundational.
Every subclass should be predictable.
Once fixed, never let exports or inheritance drift again.

## 3. Middleware is part of security

`auth.middleware.js`, `role.middleware.js`, premium/account/onboarding checks, and rate limiters are not “small helpers.”
They are security boundaries.
Treat them as high priority.

## 4. Repositories should be tested with a real database layer

Mocking repositories is good for service tests.
But repositories themselves should be integration-tested with Mongo memory server.

## 5. Auth must be tested in layers

Do not trust auth because one route test passed.
Test JWT utils, middleware, service logic, token storage logic, and API flow.

## 6. Location module is a good candidate for clean architecture

Your country -> region -> district -> town chain is perfect for layered testing because it has:

* validation
* parent-child dependency
* duplicate checks
* repository queries
* clean success/failure behavior

## 7. Logger assertions should stay lightweight

Test logger calls, not log file contents, in most unit tests.

## 8. Every bug should leave behind a test

That is how enterprise suites get stronger over time.

---

# Final checklist

Use this as your immediate roadmap.

## Right now

* keep your current error tests
* fix import/export consistency for `AppError`
* expand middleware tests
* add helper files

## Next

* add `utils` tests
* add `auth.service` tests
* add `country/region/district/town.service` tests

## After that

* add Mongo memory integration tests for models and repositories
* add route tests with `supertest`
* add transaction and Redis edge-case tests

## Enterprise level

* add regression tests for every bug fixed
* enforce coverage thresholds
* separate unit/integration/api commands
* run all of them in CI

This is the testing path that best fits your exact backend tree.
