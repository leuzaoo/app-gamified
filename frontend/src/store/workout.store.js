import toast from "react-hot-toast";
import api from "../services/api";
import { create } from "zustand";
import axios from "axios";

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

  completeWorkout: async (pushups, squats, situps, runningDistance) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`${API_URL}/complete-workout`, {
        pushups,
        squats,
        situps,
        runningDistance,
      });
      set({ isLoading: false, message: response?.data?.message });
      toast.success(response?.data?.message);
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

  getDailyWorkout: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get(`${API_URL}/get-daily-workout`);
      set({ isLoading: null });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Ocorreu um erro inesperado ao pegar o treino diário.",
        isLoading: false,
      });
      throw error;
    }
  },

  getDailyWorkoutGoals: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`${API_URL}/get-daily-goals`);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro inesperado ao buscar o goal diário do treino.",
        isLoading: false,
      });
      throw error;
    }
  },

  getWorkoutHistory: async (start, end) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get(
        `${API_URL}/history?start=${start}&end=${end}`,
        set({ isLoading: false }),
      );
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Ocorreu um erro inesperado ao pegar o histórico de treino.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
