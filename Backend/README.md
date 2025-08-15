## 1. Setting Up Project

1. Intialize Project with Express
2. Setup the folder structure
3. Install Libraries

   - `Express`
   - `Mongoose`
   - `Dotenv`
   - `Cross-env`
   - `Mongoose`,
   - `validator`
   - `cors`
   - `jsonwebtoken`

4. Set the NODE_ENV Variable in package.json file to setup environment variable using `cross-env` library.
5. Setup the `env.config` file to resolve **.env** file.
6. Connect Monogodb with mongoose
7. Make TryCatch Wrapper
8. Make Glboal **GlobalErrorHandler** function
9. Make ErrorHandler Middleware
10. Make ApiResponse formatting class
11. Add Middleware `app.use(express.json())` to parse json req

## 2. Authentication & Authorizationi

```
   POST   /api/auth/register
   POST   /api/auth/verify
   POST   /api/auth/resend-otp
   POST   /api/auth/login
   GET    /api/auth/refresh-token
   POST   /api/auth/reset-password-email
   POST   /api/auth/verify-reset-password/:token
   GET    /api/auth/profile
   POST   /api/auth/change-password
   POST   /api/auth/logout
```

## 3. File Upload

```
POST   /api/upload/video
POST   /api/upload/image
POST   /api/upload/document
DELETE /api/upload/:fileId
GET    /api/upload/signed-url
```

## 4. Profile Routes

```
GET /api/users/profile
PUT /api/users/profile
DELETE /api/users/account
GET /api/users/dashboard
GET /api/users/enrolled-courses
GET /api/users/wishlist
POST /api/users/wishlist/:courseId
DELETE /api/users/wishlist/:courseId
```
