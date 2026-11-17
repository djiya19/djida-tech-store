
const API_URL = "https://djida-tech-store-api.onrender.com/api";

const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
    });

    return response.json();
  },

  post: async (endpoint, data, token = null) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
};

export default api;

