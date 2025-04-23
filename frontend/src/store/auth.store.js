import { create } from "zustand";
import axios from "axios";

import api from "../services/api";

axios.defaults.withCredentials = true;

const deleteCookie = ({ name }) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

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

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Erro ao fazer login.",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await api.post(`${API_URL}/logout`, null, {
        withCredentials: true,
      });

      set({ isLoading: false });
    } catch (error) {
      console.error("Erro no servidor ao tentar fazer logout: ", error);
    } finally {
      localStorage.removeItem("auth_user");
      deleteCookie("app-gamified");

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  authCheck: async () => {
    await new Promise((resolver) => setTimeout(resolver, 500));
    set({ isCheckingAuth: true, error: null });

    try {
      const res = await api.get(`${API_URL}/check-auth`);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },

  clearError: () => set({ error: null, message: null }),
}));
