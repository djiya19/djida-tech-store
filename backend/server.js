require("dotenv").config();

const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const { generalLimiter, loginLimiter } = require("./middleware/rateLimiters");
const session = require("express-session");

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

app.use(
  session({
    name: "djida.sid",
    secret: process.env.OAUTH_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 10 * 60 * 1000
    }
  })
);

// Rate limiting
app.use("/api", generalLimiter);
app.use("/api/auth/login", loginLimiter);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Apply general rate limiting to all API routes
app.use("/api", generalLimiter);
app.use("/api/auth/login", loginLimiter);
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

// Server port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
