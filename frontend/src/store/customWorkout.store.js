import api from "../services/api";
import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/workout"
    : "/api/workout";

export const useCustomWorkoutStore = create((set) => ({
  workouts: [],
  current: null,
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true });

    try {
      const res = await api.get(API_URL);
      set({ workouts: res.data.workouts, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createWorkout: async (name) => {
    set({ isLoading: true });
    try {
      const res = await api.post(API_URL, { name });
      set((s) => ({
        workouts: [...s.workouts, res.data.workout],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchOne: async (id) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`${API_URL}/${id}`);
      set({ current: res.data.workout, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addExercise: async (workoutId, exercise) => {
    set({ isLoading: true });
    try {
      const res = await api.post(`${API_URL}/${workoutId}/exercises`, exercise);
      set((s) => ({
        current: { ...s.current, exercises: res.data.exercises },
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
