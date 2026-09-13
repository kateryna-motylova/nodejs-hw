# nodejs-hw — Express + MongoDB Notes API with Auth, Password Reset & Avatars

An Express.js REST API for a per-user notes collection, with cookie-based session authentication, password reset via email, and avatar upload to Cloudinary.

## Stack

- Express 5, Mongoose (MongoDB)
- bcrypt, jsonwebtoken (password reset tokens)
- nodemailer + handlebars (password reset emails)
- multer + cloudinary + streamifier (avatar upload)
- cookie-parser, celebrate + Joi (validation)
- http-errors, dotenv, cors, pino-http, nodemon, ESLint

## Project structure

```
src/
├── constants/          # tags.js, time.js
├── controllers/
│   ├── authController.js   # register, login, refresh, logout, requestResetEmail, resetPassword
│   ├── notesController.js
│   └── userController.js   # updateUserAvatar
├── db/
├── middleware/
│   ├── authenticate.js
│   ├── multer.js            # memory storage, 2MB limit, images only
│   ├── errorHandler.js      # handles HttpError, MulterError, and generic errors
│   ├── logger.js
│   └── notFoundHandler.js
├── models/                  # note.js, session.js, user.js (now with avatar)
├── routes/
│   ├── authRoutes.js
│   ├── notesRoutes.js
│   └── userRoutes.js        # PATCH /users/me/avatar
├── services/
│   └── auth.js
├── templates/
│   └── reset-password-email.html
├── utils/
│   ├── saveFileToCloudinary.js
│   └── sendMail.js
├── validations/
└── server.js
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file (see `.env.example`) with `PORT`, `MONGO_URL`, `JWT_SECRET`, `FRONTEND_DOMAIN`, `SMTP_*` (Brevo or SendGrid), and `CLOUDINARY_*`.
3. Run in dev mode:
   ```
   npm run dev
   ```

## New auth routes

- `POST /auth/request-reset-email` — body: `{ email }` → always `200 { "message": "Password reset email sent successfully" }` (doesn't leak whether the email exists)
- `POST /auth/reset-password` — body: `{ token, password }` → `200 { "message": "Password reset successfully" }`

## New user route

- `PATCH /users/me/avatar` — requires auth, `multipart/form-data` field `avatar` (image, max 2MB) → `200 { "url": "<cloudinary-url>" }`

## Deploying to Render

1. Web Service pointing at this repo, branch `05-mail-and-img`
2. Build command: `npm install` · Start command: `npm start`
3. Add all env vars listed above in the Render dashboard's Environment tab (use your deployed Render URL, not localhost, for anything user-facing if applicable)
