import { create } from "zustand";
import axios from "axios";
import api from "../services/api";

axios.defaults.withCredentials = true;

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  isLoading: false,
  error: null,
  message: null,

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      localStorage.setItem("auth_user", JSON.stringify(res.data.user));

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Erro ao criar a conta",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.post(`${API_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("auth_user", JSON.stringify(res.data.user));

      setTimeout(() => {
        set({
          user: res.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      }, 2000);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Erro ao fazer login.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
