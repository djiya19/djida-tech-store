
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const googleOAuthClient = require("../config/googleOAuth");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// ==========================================
// 1. REGISTER WITH EMAIL AND PASSWORD
// ==========================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password"
      });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
};


// ==========================================
// 2. LOGIN WITH EMAIL AND PASSWORD
// ==========================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    }).select("+password");

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};


// ==========================================
// 3. START GOOGLE OAUTH AUTHENTICATION
// ==========================================

const googleLogin = async (req, res) => {
  try {
    const { codeVerifier, codeChallenge } =
      await googleOAuthClient.generateCodeVerifierAsync();

    const state = crypto.randomBytes(32).toString("hex");

    req.session.oauthState = state;
    req.session.codeVerifier = codeVerifier;

    const authorizationUrl = googleOAuthClient.generateAuthUrl({
      access_type: "online",
      scope: ["openid", "email", "profile"],
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256"
    });

    return res.redirect(authorizationUrl);

  } catch (error) {
    console.error("Google login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not start Google authentication"
    });
  }
};


// ==========================================
// 4. HANDLE GOOGLE OAUTH CALLBACK
// ==========================================

const googleCallback = async (req, res) => {
  try {
    const { code, state, error: oauthError } = req.query;

   const frontendURL =
  process.env.NODE_ENV === "production"
    ? "https://djiya19.github.io/djida-tech-store/"
    : "http://localhost:5173/djida-tech-store/";

    if (oauthError) {
      return res.redirect(`${frontendURL}?auth=error`);
    }

    // Validate state to prevent CSRF attacks
    if (
      !code ||
      !state ||
      !req.session ||
      state !== req.session.oauthState
    ) {
      return res.redirect(`${frontendURL}?auth=error`);
    }

    const codeVerifier = req.session.codeVerifier;

    if (!codeVerifier) {
      return res.redirect(`${frontendURL}?auth=error`);
    }

    // Remove temporary OAuth values
    delete req.session.oauthState;
    delete req.session.codeVerifier;

    // Exchange authorization code for Google tokens
    const { tokens } = await googleOAuthClient.getToken({
      code,
      codeVerifier
    });

    if (!tokens.id_token) {
      return res.redirect(`${frontendURL}?auth=error`);
    }

    // Verify Google's ID token
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (
      !payload ||
      !payload.sub ||
      !payload.email ||
      payload.email_verified !== true
    ) {
      return res.redirect(`${frontendURL}?auth=error`);
    }

    // Find user using Google's unique identifier
    const googleId = payload.sub;

    let user = await User.findOne({ googleId });

    // Create a new Google user if necessary
    if (!user) {
      const normalizedEmail = payload.email.toLowerCase().trim();

      const existingUser = await User.findOne({
        email: normalizedEmail
      });

      // Do not automatically link existing password accounts
      if (existingUser) {
        return res.redirect(`${frontendURL}?auth=error`);
      }

      user = await User.create({
        name: payload.name || "Google User",
        email: normalizedEmail,
        googleId
      });
    }

    // Generate our application's JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store authentication result temporarily in session
    req.session.googleAuth = {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };

    // Save session before redirecting
    req.session.save((error) => {
      if (error) {
        console.error("Session save error:", error.message);
        return res.redirect(`${frontendURL}?auth=error`);
      }

      return res.redirect(`${frontendURL}?auth=success`);
    });

  } catch (error) {
    console.error("Google callback error:", error.message);

    return res.redirect(`${frontendURL}?auth=error`);
  }
};


// ==========================================
// 5. RETRIEVE GOOGLE AUTHENTICATION SESSION
// ==========================================

const getGoogleAuthSession = (req, res) => {
  if (!req.session || !req.session.googleAuth) {
    return res.status(401).json({
      success: false,
      message: "No Google authentication session found."
    });
  }

  const authData = req.session.googleAuth;

  // Consume temporary authentication data
  delete req.session.googleAuth;

  req.session.save((error) => {
    if (error) {
      console.error("Session save error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Could not complete authentication."
      });
    }

    return res.status(200).json({
      success: true,
      token: authData.token,
      user: authData.user
    });
  });
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  googleCallback,
  getGoogleAuthSession
};
