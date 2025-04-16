import React, { useState } from "react";

import { useWorkoutStore } from "./../../store/workout.store";

const DailyWorkoutRecordForm = () => {
  const [pushUps, setPushUps] = useState("");
  const [squats, setSquats] = useState("");
  const [sitUps, setSitUps] = useState("");
  const [runningDistance, setRunningDistance] = useState("");

  const { completeWorkout, isLoading, error, message } = useWorkoutStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const p = Number(pushUps) || 0;
      const s = Number(squats) || 0;
      const a = Number(sitUps) || 0;
      const r = Number(runningDistance) || 0;

      await completeWorkout(p, s, a, r);
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (err) {
      console.error("Erro ao registrar treino:", err);
    }
  };

  return (
    <div className="bg-dark absolute top-0 left-0 mx-auto h-screen w-screen max-w-md rounded p-4 shadow">
      <h2 className="mb-4 text-center text-xl font-bold">
        Registro do Treino Diário
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="w-1/2">Flexões:</label>
          <input
            type="number"
            value={pushUps}
            onChange={(e) => setPushUps(e.target.value)}
            placeholder="0"
            className="w-1/2 rounded border p-2"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="w-1/2">Agachamentos:</label>
          <input
            type="number"
            value={squats}
            onChange={(e) => setSquats(e.target.value)}
            placeholder="0"
            className="w-1/2 rounded border p-2"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="w-1/2">Abdominais:</label>
          <input
            type="number"
            value={sitUps}
            onChange={(e) => setSitUps(e.target.value)}
            placeholder="0"
            className="w-1/2 rounded border p-2"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="w-1/2">Corrida (km):</label>
          <input
            type="number"
            step="0.1"
            value={runningDistance}
            onChange={(e) => setRunningDistance(e.target.value)}
            placeholder="0"
            className="w-1/2 rounded border p-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          {isLoading ? "Registrando..." : "Registrar Treino"}
        </button>
      </form>
    </div>
  );
};

export default DailyWorkoutRecordForm;
