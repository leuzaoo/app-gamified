import axios from "axios";
import { create } from "zustand";
import api from "../services/api";

axios.defaults.withCredentials = true;

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/workout"
    : "/api/workout";

export const useWorkoutStore = create((set) => ({
  isLoading: false,
  error: null,
  message: null,

  chooseWorkout: async (workout_type) => {
    set({ isLoading: false, error: null });

    try {
      await api.post(`${API_URL}/set-workout`, {
        workout_type,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Ocorreu um erro inesperado ao escolher o treino. Tente mais tarde.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
