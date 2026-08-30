# nodejs-hw — Express + MongoDB Notes API

An Express.js REST API for a notes collection, backed by MongoDB via Mongoose, with pagination, filtering, text search, and request validation via celebrate/Joi.

## Stack

- Express 5
- Mongoose (MongoDB)
- celebrate + Joi (validation)
- http-errors
- dotenv (env vars)
- cors
- pino-http (request logging)
- nodemon (dev reload)
- ESLint (flat config)

## Project structure

```
src/
├── constants/
│   └── tags.js               # shared list of valid note tags
├── controllers/
│   └── notesController.js    # getAllNotes, getNoteById, createNote, updateNote, deleteNote
├── db/
│   └── connectMongoDB.js     # Mongoose connection (exits process on failure)
├── middleware/
│   ├── errorHandler.js       # global error handler (distinguishes HttpError vs generic errors)
│   ├── logger.js             # pino-http request logger
│   └── notFoundHandler.js    # 404 handler
├── models/
│   └── note.js                # Note Mongoose schema (tag is indexed)
├── routes/
│   └── notesRoutes.js        # /notes routes, wired with celebrate(schema) validation
├── validations/
│   └── notesValidation.js    # getAllNotesSchema, noteIdSchema, createNoteSchema, updateNoteSchema
└── server.js                  # app entry point
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
3. Run in dev mode (auto-restart on changes):
   ```
   npm run dev
   ```
   Or in production mode:
   ```
   npm start
   ```

## Routes

- `GET /notes?page=1&perPage=10&tag=Todo&search=hello` → `200`
  ```json
  { "page": 1, "perPage": 10, "totalNotes": 40, "totalPages": 4, "notes": [] }
  ```
- `GET /notes/:noteId` → `200`, single note, or `404 { "message": "Note not found" }`
- `POST /notes` → `201`, created note (body: `title` required, `content`/`tag` optional)
- `PATCH /notes/:noteId` → `200`, updated note (body must include at least one of `title`/`content`/`tag`), or `404`
- `DELETE /notes/:noteId` → `200`, deleted note, or `404`
- Any other route → `404 { "message": "Route not found" }`
- Validation errors (celebrate/Joi) → `400` with details
- Any other server-side error → `500` (or the status from `http-errors`) with `{ "message": "<error message>" }`

## Deploying to Render

1. Create a new Web Service on render.com pointing at this repo, branch `03-validation`
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables `PORT` (optional) and `MONGO_URL` (required) in the Render dashboard's Environment tab
