# 🛍️ Product-to-Cash

> A full-stack web application where users can list, browse, and manage products — with authentication, comments, and a modern UI.

![Product-to-Cash Screenshot](./frontend/public/screenshot-for-readme.png)

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Scripts Reference](#scripts-reference)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

**Product-to-Cash** is a monorepo full-stack application that allows authenticated users to create and manage product listings, while anyone can browse the marketplace and read comments. The app uses Clerk for authentication, so you don't need to build your own login system from scratch.

This project is great for learning how a **real-world full-stack app** is structured — with a React frontend, a Node/Express backend, and a PostgreSQL database all working together.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [TanStack Query v5](https://tanstack.com/query) | Server state management & caching |
| [Axios](https://axios-http.com/) | HTTP requests |
| [Clerk React](https://clerk.com/) | Authentication (sign in/out/up) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS styling |
| [DaisyUI v5](https://daisyui.com/) | Pre-built UI components & themes |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Vite](https://vitejs.dev/) | Fast development server & build tool |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express v5](https://expressjs.com/) | Web server framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Clerk Express](https://clerk.com/) | Backend authentication middleware |
| [Drizzle ORM](https://orm.drizzle.team/) | Type-safe database queries |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [pg](https://node-postgres.com/) | PostgreSQL driver for Node |

---

## Features

- 🔐 **Authentication** — Sign up, sign in, and sign out powered by Clerk (supports social logins)
- 📦 **Product Listings** — Browse all products on the homepage without needing an account
- ➕ **Create Products** — Authenticated users can list new products with a title, description, and image
- ✏️ **Edit Products** — Owners can update their own product listings
- 🗑️ **Delete Products** — Owners can remove their products
- 💬 **Comments** — Authenticated users can comment on any product; comment owners can delete their own comments
- 👤 **Profile Page** — Users can view and manage all their listings in one place
- 🎨 **Theme Selector** — Multiple UI themes available via DaisyUI
- 📱 **Responsive Design** — Works on mobile and desktop

---

## Project Structure

```
Product-to-Cash/
├── package.json              # Root: dev & build scripts using concurrently
│
├── frontend/                 # React + Vite application
│   ├── public/               # Static assets (images, icons)
│   ├── src/
│   │   ├── components/       # Reusable UI pieces (Navbar, ProductCard, etc.)
│   │   ├── hooks/            # Custom React hooks (data fetching, auth)
│   │   ├── lib/              # Axios instance & API helper functions
│   │   ├── pages/            # Full page components (Home, Profile, etc.)
│   │   ├── App.jsx           # Root component with routing
│   │   └── main.jsx          # App entry point
│   └── package.json
│
└── backend/                  # Express + TypeScript API server
    ├── src/
    │   ├── config/           # Environment variable loading
    │   ├── controllers/      # Route handler logic (products, users, comments)
    │   ├── db/
    │   │   ├── index.ts      # Database connection
    │   │   ├── schema.ts     # Table definitions (Drizzle ORM)
    │   │   └── queries.ts    # Reusable database query functions
    │   ├── routes/           # Express routers (maps URLs to controllers)
    │   └── index.ts          # Server entry point
    ├── drizzle.config.ts     # Drizzle ORM configuration
    └── package.json
```

---

## Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** — [Download here](https://www.postgresql.org/download/) or use a cloud provider like [Neon](https://neon.tech/) (free tier available)
- A **Clerk** account — [Sign up for free](https://clerk.com/) to get your API keys

> 💡 **New to PostgreSQL?** Using [Neon](https://neon.tech/) is the easiest way to get a free hosted PostgreSQL database without installing anything locally.

---

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ayyah-Coded/Product-to-Cash.git
   cd Product-to-Cash
   ```

2. **Install all dependencies** (frontend + backend at once)

   ```bash
   npm run build
   ```

   This installs dependencies for both `frontend/` and `backend/` folders and compiles the TypeScript backend.

---

### Environment Variables

The app needs two `.env` files — one for the backend and one for the frontend.

#### Backend — create `backend/.env`

```env
# The port your server will run on
PORT=5000

# Set to "development" while working locally
NODE_ENV=development

# Your PostgreSQL connection string
# Example (Neon): postgresql://user:password@host/dbname?sslmode=require
DB_URL=your_postgresql_connection_string

# From your Clerk dashboard → API Keys
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx

# The URL your frontend runs on (important for CORS)
FRONTEND_URL=http://localhost:5173
```

#### Frontend — create `frontend/.env`

```env
# From your Clerk dashboard → API Keys
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
```

> 📌 **How to get Clerk keys:**
> 1. Go to [clerk.com](https://clerk.com) and create a new application
> 2. In your Clerk dashboard, navigate to **API Keys**
> 3. Copy the **Publishable Key** and **Secret Key** into the correct `.env` files above

---

### Running the App

**Development mode** (runs both frontend and backend simultaneously):

```bash
npm run dev
```

This starts:
- **Backend** at `http://localhost:5000`
- **Frontend** at `http://localhost:5173`

On first run, the backend automatically pushes your database schema to PostgreSQL via Drizzle.

---

## API Reference

All API routes are prefixed with `/api`. Protected routes require a valid Clerk session token.

### Products

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| `GET` | `/api/products` | ❌ | Get all products |
| `GET` | `/api/products/:id` | ❌ | Get a single product by ID |
| `GET` | `/api/products/my` | ✅ | Get the current user's products |
| `POST` | `/api/products` | ✅ | Create a new product |
| `PUT` | `/api/products/:id` | ✅ | Update a product (owner only) |
| `DELETE` | `/api/products/:id` | ✅ | Delete a product (owner only) |

**POST / PUT body:**
```json
{
  "title": "Product Name",
  "description": "A short description",
  "imageUrl": "https://example.com/image.jpg"
}
```

### Comments

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| `POST` | `/api/comments/:productId` | ✅ | Add a comment to a product |
| `DELETE` | `/api/comments/:commentId` | ✅ | Delete a comment (owner only) |

### Users

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| `POST` | `/api/users/sync` | ✅ | Sync signed-in Clerk user to the database |

---

## Database Schema

The app uses three PostgreSQL tables managed by Drizzle ORM.

```
users
├── id          (text, primary key — Clerk user ID)
├── email       (text, unique)
├── name        (text)
├── imageUrl    (text)
├── createdAt   (timestamp)
└── updatedAt   (timestamp)

products
├── id          (uuid, primary key)
├── title       (text)
├── description (text)
├── imageUrl    (text)
├── userId      (text → references users.id)
├── createdAt   (timestamp)
└── updatedAt   (timestamp)

comments
├── id          (uuid, primary key)
├── content     (text)
├── userId      (text → references users.id)
├── productId   (uuid → references products.id)
└── createdAt   (timestamp)
```

**Relationships:**
- A **User** can have many **Products** and many **Comments**
- A **Product** belongs to one **User** and can have many **Comments**
- A **Comment** belongs to one **User** and one **Product**
- Deleting a user cascades and removes all their products and comments

---

## Scripts Reference

Run these from the **root** of the project:

| Script | Command | Description |
|--------|---------|---|
| Development | `npm run dev` | Start frontend + backend together |
| Build | `npm run build` | Install deps & compile for production |
| Start (production) | `npm run start` | Push DB schema & start the server |

Run these from inside the **`backend/`** folder:

| Script | Command | Description |
|--------|---------|---|
| Dev server | `npm run dev` | Start backend with auto-reload (nodemon) |
| Compile | `npm run build` | Compile TypeScript to JavaScript |
| Push schema | `npm run db:push` | Push schema changes to your database |

---

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code works locally before submitting a PR.

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ by <a href="https://github.com/Ayyah-Coded">Ayyah-Coded</a></p>
