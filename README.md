# Djida Tech Store

Djida Tech Store is a full-stack e-commerce web application developed as an academic project. It provides a responsive shopping interface and a REST API for managing products and user authentication.

The application uses React for the frontend and Node.js, Express.js, and MongoDB for the backend.

## Features

### Frontend
- **Product catalog** — Display products retrieved from the backend.
- **Shopping cart** — Manage cart items using Redux Toolkit.
- **Product search** — Search for products.
- **User authentication** — Register, log in, and log out.
- **Google login** — Authenticate using a Google account.
- **Responsive design** — Interface adapted to different screen sizes.
- **Custom branding** — Dedicated Djida Tech Store logo and visual identity.

### Backend
- **REST API** — Manage products through HTTP endpoints.
- **MongoDB integration** — Store products and user accounts.
- **User registration and login** — Authenticate users using email and password.
- **Password security** — Hash passwords using bcrypt.
- **JWT authentication** — Protect product creation, update, and deletion.
- **Google OAuth2 / OpenID Connect** — Support authentication through Google.
- **Rate limiting** — Limit general API requests and login attempts.
- **Input validation and error handling** — Handle invalid data, duplicate accounts, and unauthorized requests.

## Technologies

### Frontend
- React
- Vite
- Redux Toolkit
- JavaScript (ES6+)
- HTML5 and CSS3

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Google OAuth2 / OpenID Connect
- express-session
- express-rate-limit
- CORS

## Project Structure

```text
djida-tech-store/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── googleOAuth.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── rateLimiters.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── public/
│   └── images/
│
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── features/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Database Models

### Product

The Product model contains:

| Field | Type | Description |
|---|---|---|
| name | String | Product name |
| description | String | Product description |
| price | Number | Product price |
| category | String | Product category |
| imageUrl | String | Product image path or URL |
| stock | Number | Available quantity |
| timestamps | Date | Creation and update dates |

### User

The User model contains:

| Field | Type | Description |
|---|---|---|
| name | String | User name |
| email | String | Unique email address |
| password | String | Hashed password (optional for Google users) |
| googleId | String | Google account identifier |
| timestamps | Date | Creation and update dates |

## API Documentation

The backend runs by default at:

`http://localhost:3000`

All API endpoints are prefixed with `/api`.

### Authentication Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Log in with email and password | Public |
| GET | `/api/auth/google` | Start Google authentication | Public |
| GET | `/api/auth/google/callback` | Handle Google callback | Public |
| GET | `/api/auth/google/session` | Retrieve Google login session | Session |

### Product Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/products` | Retrieve all products | Public |
| GET | `/api/products/:id` | Retrieve a product by ID | Public |
| POST | `/api/products` | Create a product | JWT required |
| PUT | `/api/products/:id` | Update a product | JWT required |
| DELETE | `/api/products/:id` | Delete a product | JWT required |

### JWT Authentication

After a successful email/password login, the server returns a JSON Web Token.

Protected requests must include the token in the HTTP Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The authentication middleware verifies the token before allowing access to protected product operations.

### Rate Limiting

The application implements two rate-limiting configurations:

- **General API limiter:** 100 requests per 15 minutes.
- **Login limiter:** 5 login attempts per 15 minutes per IP address.

When the limit is exceeded, the API returns:

`429 Too Many Requests`

## Installation and Configuration

### Prerequisites

Install the following tools:

- Node.js and npm
- Git
- MongoDB Atlas account
- Google Cloud project and OAuth credentials (for Google login)

### 1. Clone the Repository

```bash
git clone https://github.com/djiya19/djida-tech-store.git
cd djida-tech-store
```

### 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend/` directory using `.env.example` as a template.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

OAUTH_SESSION_SECRET=your_oauth_session_secret
```

Replace the placeholder values with your own configuration.

**Important:** Never commit your `.env` file or expose your database credentials, OAuth client secret, or JWT secret.

### 5. Configure Google OAuth

In Google Cloud Console, configure an OAuth 2.0 Web Client.

For local development, use:

**Authorized JavaScript origin:**

```text
http://localhost:5173
```

**Authorized redirect URI:**

```text
http://localhost:3000/api/auth/google/callback
```

The redirect URI must match the value configured in the backend environment variables.

### 6. Start the Backend

From the `backend/` directory:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:3000
```

### 7. Start the Frontend

Open another terminal, return to the project root, and run:

```bash
cd ~/dztech-store
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

## API Testing

API endpoints were tested using Thunder Client.

The tests cover:

- Successful user registration.
- Duplicate registration.
- Successful login.
- Invalid login credentials.
- Public product retrieval.
- Product creation with a valid JWT.
- Product update with a valid JWT.
- Product deletion with a valid JWT.
- Protected route access without a token.
- Protected route access with an invalid token.
- Login rate limiting and HTTP 429 responses.

## Build for Production

To create an optimized frontend build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Design

Djida Tech Store uses a warm and understated visual identity, with cream backgrounds, soft earth tones, and terracotta accents. The interface aims to provide a friendly, readable, and welcoming shopping experience.

## Author

**Djida Acheuk**

Engineering Student — CyberSecurity
ENSTA

GitHub: [@djiya19](https://github.com/djiya19)

## License

No license has been specified. All rights are reserved unless a license is added to this repository.
