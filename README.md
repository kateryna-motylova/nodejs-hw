# nodejs-hw — Express + MongoDB Notes API with Auth

An Express.js REST API for a per-user notes collection, backed by MongoDB via Mongoose, with cookie-based session authentication, pagination, filtering, text search, and request validation via celebrate/Joi.

## Stack

- Express 5
- Mongoose (MongoDB)
- bcrypt (password hashing)
- cookie-parser
- celebrate + Joi (validation)
- http-errors
- dotenv (env vars)
- cors (with credentials support for cookies)
- pino-http (request logging)
- nodemon (dev reload)
- ESLint (flat config)

## Project structure

```
src/
├── constants/
│   ├── tags.js                # shared list of valid note tags
│   └── time.js                # FIFTEEN_MINUTES, ONE_DAY (cookie maxAge)
├── controllers/
│   ├── authController.js      # registerUser, loginUser, refreshUserSession, logoutUser
│   └── notesController.js     # CRUD scoped to the authenticated user
├── db/
│   └── connectMongoDB.js
├── middleware/
│   ├── authenticate.js        # protects all /notes routes via accessToken cookie
│   ├── errorHandler.js
│   ├── logger.js
│   └── notFoundHandler.js
├── models/
│   ├── note.js                 # now includes userId (ref User)
│   ├── session.js
│   └── user.js                 # hashes handled in controller; toJSON strips password
├── routes/
│   ├── authRoutes.js          # /auth/register, /auth/login, /auth/refresh, /auth/logout
│   └── notesRoutes.js         # /notes routes, all behind authenticate + celebrate validation
├── services/
│   └── auth.js                 # createSession, setSessionCookies
├── validations/
│   ├── authValidation.js      # registerUserSchema, loginUserSchema
│   └── notesValidation.js
└── server.js
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file in the project root (see `.env.example`):
   ```
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   ```
3. Run in dev mode:
   ```
   npm run dev
   ```

## Auth routes

- `POST /auth/register` — body: `{ email, password }` → `201`, created user (no password field)
- `POST /auth/login` — body: `{ email, password }` → `200`, logged-in user
- `POST /auth/refresh` — uses `sessionId`/`refreshToken` cookies → `200 { "message": "Session refreshed" }`
- `POST /auth/logout` — uses `sessionId` cookie, clears all auth cookies → `204`

All auth endpoints set three cookies (`accessToken`, `refreshToken`, `sessionId`) with `httpOnly: true, secure: true, sameSite: 'none'`.

## Notes routes (all require a valid `accessToken` cookie)

- `GET /notes?page=1&perPage=10&tag=Todo&search=hello` → notes belonging to the authenticated user only
- `GET /notes/:noteId`, `POST /notes`, `PATCH /notes/:noteId`, `DELETE /notes/:noteId` — all scoped to the authenticated user; accessing another user's note returns `404 { "message": "Note not found" }`

## Deploying to Render

1. Create a new Web Service on render.com pointing at this repo, branch `04-auth`
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables `PORT` (optional) and `MONGO_URL` (required) in the Render dashboard's Environment tab
