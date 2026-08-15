# nodejs-hw — Express Notes Server

A minimal Express.js server exposing a temporary (mocked) notes API, built as part of the Node.js homework track.

## Stack

- Express 5
- dotenv (env vars)
- cors
- pino-http (request logging)
- nodemon (dev reload)
- ESLint (flat config)

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create `.env` (already included for local dev) with:
   ```
   PORT=3000
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

- `GET /notes` → `200 { "message": "Retrieved all notes" }`
- `GET /notes/:noteId` → `200 { "message": "Retrieved note with ID: <noteId>" }`
- `GET /test-error` → throws a simulated error, caught by the error-handling middleware → `500 { "message": "Simulated server error" }`
- Any other route → `404 { "message": "Route not found" }`

## Deploying to Render

1. Create a new Web Service on render.com pointing at this repo/branch (`01-express`)
2. Build command: `npm install`
3. Start command: `npm start`
4. Add the `PORT` environment variable is set automatically by Render — no need to hardcode it, the server already falls back correctly.
