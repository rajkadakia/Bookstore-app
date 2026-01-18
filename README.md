# 📚 किताबkhana - A Cozy Digital Bookshelf

Welcome to **किताबkhana**, a beautifully crafted, coffee-themed digital bookstore designed for book lovers. This project is a full-stack web application that combines a rustic, aesthetic frontend with a robust, efficient backend.

![Project Banner](https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200&h=400)

## ☕ The Experience

**किताबkhana** (Kitabkhana) is more than just a store; it's a digital library experience. Inspired by the warmth of a local independent bookstore, the design features a "Coffee & Mocha" palette, 3D bookshelf layouts, and smooth animations that make browsing a delight.

---

## Key Features

### Frontend (The Library)

- **Cozy Design System**: A custom-themed UI using a warm beige and coffee palette.
- **3D Bookshelf Display**: Realistic 3D book covers with hover lift animations and rustic wooden shelves.
- **Integrated Search**: A seamless search bar in the navbar that filters books by title or author instantly.
- **Dynamic Carousel**: An auto-sliding hero section highlighting member exclusives and seasonal sales.
- **Advanced Cart Management**: A sophisticated cart system with a 10-item quantity limit per book.
- **Address Management**: My Profile section to manage multiple delivery addresses with default selection.
- **Interactive Reviews**: A beautiful review section using "Book Outline" icons for ratings instead of generic stars.
- **Secure Checkout**: A streamlined order process with multiple payment options (COD, UPI, Card).

### Backend (The Engine)

- **RESTful API**: Clean and documented endpoints for all resources.
- **Authentication**: Dual authentication system supporting standard Email/Password and **Google OAuth 2.0**.
- **Regex Search**: Powerful case-insensitive search logic for books.
- **Caching**: High-performance caching implemented with **Redis** to speed up book listings and reviews.
- **Address CRUD**: Specialized service layer to handle complex address logic (default status management).
- **Validation**: Strict server-side validation for business rules (e.g., cart quantity limits).

---

## Tech Stack

### Frontend

- **React 18** (Vite-powered)
- **Bootstrap 5** (Layout & Core UI)
- **Lucide-React** (Aesthetic Iconography)
- **React Router Dom 6** (Navigation)
- **Axios** (API Communication)

### Backend

- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **Redis** (Caching layer)
- **Passport.js** (OAuth & Auth strategy)
- **JWT** (Stateless authentication)

---

## Project Structure

```text
Bookstore-app/
├── backend/                # Express Server
│   ├── src/
│   │   ├── config/         # DB, Passport, Redis configs
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Auth & validation
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routing
│   │   ├── services/       # Business logic (the core)
│   │   └── utils/          # Helpers & Mock Payment
│   └── .env                # Environment variables
├── frontend/               # Vite React App
│   ├── src/
│   │   ├── api/            # Axios client configuration
│   │   ├── components/     # Reusable UI parts (Navbar, BookCard)
│   │   ├── context/        # Global state (Auth, Cart)
│   │   ├── pages/          # Full page views
│   │   └── index.css       # Custom design system (Coffee theme)
│   └── vite.config.js
└── README.md               # You are here!
```

---

## Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (Running locally or Atlas)
- Redis Server (Running on localhost:6379)

### 1. Clone & Install

```bash
git clone <repository-url>
cd Bookstore-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

Fire up the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The app will be live at `http://localhost:5173` (or `5174`).

---

## API Endpoints

### Authentication

- `POST /api/auth/register` - Create a library card.
- `POST /api/auth/login` - Sign in to your account.
- `GET /api/auth/google` - Initiate Google OAuth login.
- `GET /api/auth/me` - Fetch current user profile (Protected).

### Books

- `GET /api/books` - List all books (supports `?search=query`).
- `GET /api/books/:id` - View detailed book insights.

### Cart & Orders

- `GET /api/cart` - View your curated collection (Protected).
- `POST /api/cart/add` - Add a treasure to your cart (Protected).
- `DELETE /api/cart/remove/:bookId` - Remove from cart (Protected).
- `POST /api/orders` - Complete your purchase (Protected).

### Addresses (Protected)

- `GET /api/addresses` - List all saved locations.
- `POST /api/addresses` - Add a new delivery spot.
- `PUT /api/addresses/:id` - Update address details.
- `DELETE /api/addresses/:id` - Remove an address.

### Reviews

- `GET /api/reviews/:bookId` - Read what other bibliophiles say.
- `POST /api/reviews` - Share your own rating & comment (Protected).

---

## Design Philosophy

Every line of CSS and every component was built to feel **premium** and **user-centric**.

- **Typography**: Uses _Playfair Display_ for headers to give a classic literary feel.
- **Interactions**: Subtle `hover-lift` on books to simulate picking them up from a shelf.
- **Feedback**: "Out of Stock" alerts and smooth loading spinners to keep the user informed.

---

## Credits

Crafted with ❤️ by **Raj Kadakia**.
Made for the love of books and beautiful code.
