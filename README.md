# nodejs-hw — Express + MongoDB Notes API

An Express.js REST API for a notes collection, backed by MongoDB via Mongoose, with a modular file structure (routes, controllers, models, middleware).

## Stack

- Express 5
- Mongoose (MongoDB)
- http-errors
- dotenv (env vars)
- cors
- pino-http (request logging)
- nodemon (dev reload)
- ESLint (flat config)

## Project structure

```
src/
├── controllers/
│   └── notesController.js   # getAllNotes, getNoteById, createNote, updateNote, deleteNote
├── db/
│   └── connectMongoDB.js    # Mongoose connection
├── middleware/
│   ├── errorHandler.js      # global error handler (respects http-errors status)
│   ├── logger.js            # pino-http request logger
│   └── notFoundHandler.js   # 404 handler
├── models/
│   └── note.js              # Note Mongoose schema
├── routes/
│   └── notesRoutes.js       # /notes routes
└── server.js                # app entry point
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
3. In MongoDB Atlas, allow network access from anywhere (`0.0.0.0/0`) under Network Access, and import `notes.json` into your `notes` collection via Compass or the Atlas UI.
4. Run in dev mode (auto-restart on changes):
   ```
   npm run dev
   ```
   Or in production mode:
   ```
   npm start
   ```

## Routes

- `GET /notes` → `200`, array of all notes
- `GET /notes/:noteId` → `200`, single note, or `404 { "message": "Note not found" }`
- `POST /notes` → `201`, created note
- `PATCH /notes/:noteId` → `200`, updated note, or `404 { "message": "Note not found" }`
- `DELETE /notes/:noteId` → `200`, deleted note, or `404 { "message": "Note not found" }`
- Any other route → `404 { "message": "Route not found" }`
- Any server-side error → `500` (or the status from `http-errors`) with `{ "message": "<error message>" }`

## Deploying to Render

1. Create a new Web Service on render.com pointing at this repo, branch `02-mongodb`
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables `PORT` (optional, Render sets its own) and `MONGO_URL` (required — your MongoDB Atlas connection string) in the Render dashboard's Environment tab
