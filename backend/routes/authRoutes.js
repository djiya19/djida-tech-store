
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  googleLogin,
  googleCallback,
  getGoogleAuthSession
} = require("../controllers/authController");

// Traditional authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// Google OAuth2 / OIDC authentication
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/google/session", getGoogleAuthSession);

module.exports = router;
