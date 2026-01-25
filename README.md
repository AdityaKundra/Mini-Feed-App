# Mini Feed – Backend

## How to run the backend

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the `backend` folder with:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mini-feed
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

- **PORT** – Server port (default: 3000)
- **MONGO_URI** – MongoDB connection string
- **JWT_SECRET** – Secret used to sign JWTs
- **JWT_EXPIRES_IN** – Token lifetime (e.g. `7d`, `24h`, `3600`)

### 3. Run the server

**Development (with hot reload):**

```bash
npm run dev
```

**Production (after build):**

```bash
npm run build
npm start
```

The API runs at `http://localhost:3000` (or the port in `.env`).

### 4. API docs

Swagger UI: **http://localhost:3000/api-docs**

Use **Authorize** with a JWT from `/auth/register` or `/auth/login` to try protected routes.

---

### Scripts

| Script   | Command        | Description                    |
|----------|----------------|--------------------------------|
| `dev`    | `npm run dev`  | Run with tsx watch (hot reload) |
| `build`  | `npm run build`| Compile TypeScript              |
| `start`  | `npm start`    | Run compiled `dist/server.js`   |
