
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const { generalLimiter, loginLimiter } = require("./middleware/rateLimiters");
const connectDB = require("./config/db");

const app = express();

const isProduction = process.env.NODE_ENV === "production";

// Trust Render's reverse proxy for secure cookies
if (isProduction) {
  app.set("trust proxy", 1);
}

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://djiya19.github.io"
    ],
    credentials: true
  })
);

app.use(express.json());

// Session configuration
app.use(
  session({
    name: "djida.sid",
    secret: process.env.OAUTH_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 10 * 60 * 1000
    }
  })
);

// Rate limiting (register only once)
app.use("/api", generalLimiter);
app.use("/api/auth/login", loginLimiter);

// API routes (register only once)
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Djida Tech Store API!"
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

