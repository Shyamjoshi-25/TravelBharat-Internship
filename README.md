# TravelBharat – Explore India State by State

A full-stack tourism information portal built with React, Vite, Node.js, Express and MongoDB. It is configured so the **website and API deploy together in one Vercel project**. MongoDB is the database and must be hosted separately (MongoDB Atlas is the easiest option).

## Features
- Browse India's 28 states and 8 Union Territories
- Search destinations by name, state, city or description
- Filter destinations by state/UT and category
- Destination details, best time to visit, entry-fee note and nearby attractions
- Admin login and dashboard
- Admin can add, edit and delete destinations
- Responsive desktop and mobile layout

## Important: what “Vercel only” means
Vercel hosts both the React website and the Express API. A database is still required; Vercel does not replace MongoDB. Create a free MongoDB Atlas database and connect it to the Vercel app using `MONGODB_URI`.

## Deploy the complete project on Vercel

### 1. Create a MongoDB Atlas database
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas/database.
2. Create a free shared cluster and a database user (save the username and password).
3. In Network Access, allow access from `0.0.0.0/0` for this Vercel deployment. Use a strong database password.
4. Select **Connect → Drivers** and copy the connection string. Replace `<password>` with your database user's password and add `/travelbharat` before any `?` query options.

### 2. Upload this project to GitHub
1. Extract the ZIP on your computer.
2. Create a new GitHub repository.
3. Upload all files and folders inside `TravelBharat_Project` to the repository root (including `api`, `client`, `server`, `package.json` and `vercel.json`).

### 3. Import into Vercel
1. Open https://vercel.com and choose **Add New → Project**.
2. Import the GitHub repository.
3. Keep the project root directory as `./` (the repository root), not `client` or `server`.
4. The included `vercel.json` sets the build and output settings. If Vercel asks, use:
   - Install command: `npm install && npm install --prefix client`
   - Build command: `npm run build`
   - Output directory: `client/dist`
5. Before deploying, add these Environment Variables in Vercel → Project → Settings → Environment Variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a long, random secret (at least 32 characters)
   - `CLIENT_URL` = your Vercel website URL, e.g. `https://your-project.vercel.app` (optional for same-origin API, but safe to set)
6. Deploy. The website and API are deployed by the same Vercel project. The API health check is `https://your-project.vercel.app/api/health`.

### 4. Create the first admin account (username + password)

The project does not contain a public default password. Create your own admin account once from your computer:

1. Install Node.js 18 or newer.
2. Open a terminal in the extracted project folder and run `npm install` and `npm install --prefix server`.
3. Create `server/.env` using `server/.env.example`; set `MONGODB_URI` to your Atlas connection string.
4. Run this command, replacing the example username and password with your own:

```bash
npm run create-admin --prefix server -- --username traveladmin --password ChooseA-StrongPassword123 --name "TravelBharat Admin"
```

You may optionally add `--email you@example.com`. Keep your password private. It is stored as a bcrypt hash, not plain text. On the Admin Login page, enter the username (or email if you added one) and password.

### 5. Add sample destinations

Run this command from the project root:

```bash
npm run seed --prefix server
```

It adds or updates 36 sample destinations: one representative destination for each of India's 28 states and 8 Union Territories. Each record includes state/UT, city, category, description, best time to visit, entry-fee guidance, nearby attractions and a Google Maps search link. It does not delete existing destination records. Add more city-wise places from the Admin dashboard as needed. Verify current opening hours, fees, permits and travel conditions before visiting.

## Run locally

1. Install Node.js 18+ and MongoDB, or use your Atlas connection string.
2. Create `server/.env` from `server/.env.example` and set `MONGODB_URI` and `JWT_SECRET`.
3. From the project root run:

```bash
npm install
npm install --prefix client
npm install --prefix server
npm run dev
```

4. Open `http://localhost:5173`. The Vite development server forwards `/api` requests to the local Express server on port 5000.

## Project structure

```text
TravelBharat_Project/
  api/[...path].js       Vercel serverless API entry point
  client/                React + Vite frontend
  server/src/app.js      Express application and API routes
  server/src/db.js       Reusable MongoDB connection
  server/src/            Models, routes, authentication and seed scripts
  vercel.json            One-project Vercel deployment configuration
```

## Scope
This is an informational tourism platform. Booking, payment, live transport and user reviews are intentionally not included in this phase.
