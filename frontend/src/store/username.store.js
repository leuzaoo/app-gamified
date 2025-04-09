import { create } from "zustand";
import axios from "axios";
import api from "../services/api";

axios.defaults.withCredentials = true;

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/username"
    : "/api/username";

export const useUsernameStore = create((set) => ({
  isLoading: false,
  error: null,
  message: null,

  create: async (username) => {
    set({ isLoading: false, error: null });

    try {
      await api.put(`${API_URL}`, {
        username,
      });

      setTimeout(() => {
        set(
          {
            isLoading: true,
          },
          1500,
        );
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Ocorreu um erro inesperado. Tente mais tarde.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
