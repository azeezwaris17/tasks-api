# Tasks API (Node.js + Express + MongoDB Atlas)

A small REST API that manages a `tasks` resource.

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose

## Prerequisites

- Node.js 18+ (recommended: Node.js 20 LTS)
- A MongoDB Atlas cluster

## Setup

1) Clone the repo and install dependencies

```bash
git clone https://github.com/azeezwaris17/tasks-api.git
cd tasks-api
npm install
```

2) Create a `.env` file in the project root

Copy `.env.example` to `.env` and fill in your values:

```bash
# Windows PowerShell
Copy-Item .env.example .env
```

`.env` format:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/tasksdb?retryWrites=true&w=majority
```

### MongoDB Atlas notes (common gotchas)

- Create a database user (Database Access) and use it in the connection string.
- Add your IP to Atlas Network Access (or allow all IPs temporarily: `0.0.0.0/0`).
- Ensure your cluster is running.

3) Start the server

```bash
npm start
```

Optional dev mode (auto-restarts):

```bash
npm run dev
```

Server will run on `http://localhost:5000`.

## API Documentation

Base URL: `http://localhost:5000`

### Health Check

- Method: `GET`
- URL: `/api/health`

Response (200):

```json
{ "status": "ok" }
```

---

### Create Task

- Method: `POST`
- URL: `/api/tasks`

Request body:

```json
{
  "title": "Finish backend assessment",
  "description": "Implement CRUD endpoints",
  "status": "in-progress",
  "priority": "high"
}
```

Notes:
- `title` is required.
- `status` must be one of: `pending | in-progress | done` (default: `pending`).
- `priority` must be one of: `low | medium | high` (default: `medium`).

Response (201):

```json
{
  "_id": "65f0c0f2c1c2a2b3c4d5e6f7",
  "title": "Finish backend assessment",
  "description": "Implement CRUD endpoints",
  "status": "in-progress",
  "priority": "high",
  "createdAt": "2026-01-29T00:00:00.000Z",
  "updatedAt": "2026-01-29T00:00:00.000Z",
  "__v": 0
}
```

---

### List Tasks

- Method: `GET`
- URL: `/api/tasks`

Response (200):

```json
[
  {
    "_id": "...",
    "title": "...",
    "description": "...",
    "status": "pending",
    "priority": "medium",
    "createdAt": "...",
    "updatedAt": "...",
    "__v": 0
  }
]
```

---

### Get Task by ID

- Method: `GET`
- URL: `/api/tasks/:id`

Response (200):

```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "status": "pending",
  "priority": "medium",
  "createdAt": "...",
  "updatedAt": "...",
  "__v": 0
}
```

Errors:
- 400 `{ "message": "Invalid task id" }`
- 404 `{ "message": "Task not found" }`

---

### Update Task

- Method: `PUT`
- URL: `/api/tasks/:id`

Request body (any subset of fields):

```json
{
  "status": "done",
  "priority": "low"
}
```

Response (200):

```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "status": "done",
  "priority": "low",
  "createdAt": "...",
  "updatedAt": "...",
  "__v": 0
}
```

Errors:
- 400 `{ "message": "Invalid task id" }`
- 400 `{ "message": "No valid fields provided for update" }`
- 404 `{ "message": "Task not found" }`

---

### Delete Task

- Method: `DELETE`
- URL: `/api/tasks/:id`

Response (200):

```json
{ "message": "Task deleted" }
```

Errors:
- 400 `{ "message": "Invalid task id" }`
- 404 `{ "message": "Task not found" }`




