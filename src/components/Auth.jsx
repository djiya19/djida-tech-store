
import { useEffect, useRef, useState } from "react";
import api from "../services/api";

function Auth({ user, onClose, onAuthChange }) {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const googleRequestStarted = useRef(false);

  // Complete Google OAuth login after redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get("auth");

    if (authStatus === "error") {
      setMessage("Google authentication failed. Please try again.");

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
      return;
    }

    if (authStatus !== "success" || googleRequestStarted.current) {
      return;
    }

    googleRequestStarted.current = true;

    const completeGoogleLogin = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/google/session",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Google login failed.");
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        onAuthChange(result.user);
        onClose();
      } catch (error) {
        setMessage(error.message || "Google login failed.");
      } finally {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    };

    completeGoogleLogin();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const data = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : formData;

      const result = await api.post(endpoint, data);

      if (!result.success) {
        throw new Error(result.message || "Authentication failed.");
      }

      if (isLogin) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        onAuthChange(result.user);
        onClose();
      } else {
        setMessage("Registration successful! You can now log in.");

        setIsLogin(true);
        setFormData({
          name: "",
          email: formData.email,
          password: "",
        });
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onAuthChange(null);
    onClose();
  };

  return (
    <div
      className="auth-overlay"
      onClick={onClose}
    >
      <section
        className="auth-section"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="auth-close"
          onClick={onClose}
          aria-label="Close authentication"
        >
          ×
        </button>

        {user ? (
          <div className="auth-account">
            <h2>Welcome, {user.name}!</h2>
            <p>{user.email}</p>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2>
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h2>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isLogin
                    ? "Login"
                    : "Register"}
              </button>
            </form>

            <button
              type="button"
              className="google-button"
              onClick={() => {
                window.location.href =
                  "http://localhost:3000/api/auth/google";
              }}
            >
              Continue with Google
            </button>

            {message && <p className="auth-message">{message}</p>}

            <p className="auth-switch">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                }}
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </>
        )}
      </section>
    </div>
  );
}

export default Auth;
