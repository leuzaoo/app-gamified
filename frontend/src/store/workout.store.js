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

  chooseWorkout: async (workout_type, training_experience) => {
    set({ isLoading: true, error: null });

    try {
      await api.post(`${API_URL}/set-workout`, {
        workout_type,
        training_experience,
      });
      set({ isLoading: false });
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

  completeWorkout: async (pushUps, squats, sitUps, runningDistance) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`${API_URL}/complete-workout`, {
        pushUps,
        squats,
        sitUps,
        runningDistance,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Ocorreu um erro inesperado ao registrar o treino. Tente mais tarde.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
