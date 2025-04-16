import React, { useEffect, useState } from "react";
import { PencilIcon } from "lucide-react";
import toast from "react-hot-toast";

import { useWorkoutStore } from "../../store/workout.store";

import CountdownTimer from "../common/CountdownTimer";

const DailyQuests = () => {
  const [goals, setGoals] = useState({
    pushups_goal: 0,
    squats_goal: 0,
    situps_goal: 0,
    running_goal: 0,
  });

  const [record, setRecord] = useState({
    pushups: 0,
    squats: 0,
    situps: 0,
    running_distance: 0,
  });

  const [loading, setLoading] = useState(true);

  const [showInputs, setShowInputs] = useState({
    pushups: false,
    squats: false,
    situps: false,
    running_distance: false,
  });
  const [inputs, setInputs] = useState({
    pushups: "",
    squats: "",
    situps: "",
    running_distance: "",
  });

  const { getDailyWorkoutGoals, getDailyWorkout, completeWorkout, error } =
    useWorkoutStore();

  useEffect(() => {
    async function fetchGoals() {
      try {
        const res = await getDailyWorkoutGoals();
        setGoals(res.goals);
      } catch (err) {
        console.error("Erro ao buscar os objetivos de treino:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGoals();
  }, [getDailyWorkoutGoals]);

  useEffect(() => {
    async function fetchRecord() {
      try {
        const res = await getDailyWorkout();
        setRecord(res.record || res.data.record);
      } catch (err) {
        console.error("Erro ao buscar o registro diário:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecord();
  }, [getDailyWorkout]);

  const missions = [
    {
      id: 1,
      key: "pushups",
      title: "Flexões",
      progress: record.pushups || 0,
      goal: goals.pushups_goal || 0,
      unit: "",
    },
    {
      id: 2,
      key: "squats",
      title: "Agachamentos",
      progress: record.squats || 0,
      goal: goals.squats_goal || 0,
      unit: "",
    },
    {
      id: 3,
      key: "situps",
      title: "Abdominais",
      progress: record.situps || 0,
      goal: goals.situps_goal || 0,
      unit: "",
    },
    {
      id: 4,
      key: "running_distance",
      title: "Corrida",
      progress: record.running_distance || 0,
      goal: goals.running_goal || 0,
      unit: "km",
    },
  ];

  const handleConfirm = async (exerciseKey) => {
    const newValue = Number(inputs[exerciseKey]) || 0;
    // Calcula o total atual para este exercício: valor registrado + novo valor
    const totalForExercise = (record[exerciseKey] || 0) + newValue;

    // Define o máximo permitido: dobro da meta
    let maxAllowed = 0;
    if (exerciseKey === "pushups") {
      maxAllowed = 2 * goals.pushups_goal;
    } else if (exerciseKey === "squats") {
      maxAllowed = 2 * goals.squats_goal;
    } else if (exerciseKey === "situps") {
      maxAllowed = 2 * goals.situps_goal;
    } else if (exerciseKey === "running_distance") {
      maxAllowed = 2 * goals.running_goal;
    }

    if (totalForExercise > maxAllowed) {
      toast.error(`Você já alcançou o valor diário permitido deste treino.`);

      return;
    }

    try {
      const p = exerciseKey === "pushups" ? newValue : 0;
      const s = exerciseKey === "squats" ? newValue : 0;
      const a = exerciseKey === "situps" ? newValue : 0;
      const r = exerciseKey === "running_distance" ? newValue : 0;

      await completeWorkout(p, s, a, r);
      setRecord((prev) => ({
        ...prev,
        [exerciseKey]: (prev[exerciseKey] || 0) + newValue,
      }));
      setInputs((prev) => ({ ...prev, [exerciseKey]: "" }));
      setShowInputs((prev) => ({ ...prev, [exerciseKey]: false }));
    } catch (err) {
      console.error("Erro ao registrar treino:", err);
    }
  };

  return (
    <section className="p-4">
      <div className="mb-4 flex">
        <h1 className="border-b text-2xl uppercase">Missões Diárias</h1>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Carregando missões...</p>
      ) : (
        <ul className="mt-8 space-y-4 font-light">
          {missions.map((mission) => (
            <li
              key={mission.id}
              className="flex items-center justify-between pb-2"
            >
              <div>
                {mission.title} [{mission.progress}/{mission.goal}
                {mission.unit}]
              </div>

              {!showInputs[mission.key] ? (
                <button
                  onClick={() =>
                    setShowInputs((prev) => ({ ...prev, [mission.key]: true }))
                  }
                >
                  <PencilIcon />
                </button>
              ) : (
                <div className="ml-2 flex items-center gap-2">
                  <input
                    type="number"
                    value={inputs[mission.key]}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        [mission.key]: e.target.value,
                      }))
                    }
                    placeholder="0"
                    className="w-16 rounded border px-1 text-xs"
                  />
                  <button
                    className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                    onClick={() => handleConfirm(mission.key)}
                  >
                    Confirmar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <CountdownTimer />

      <div className="mt-5 text-center">
        <p className="text-lg font-light">
          <span className="text-amber-500 uppercase">Aviso: </span>
          Caso você falhe na missão diária, você não ganhará os pontos
          necessários para subir de nível e o{" "}
          <span className="text-red-500 underline">
            tempo perdido não será retornado.
          </span>
        </p>
      </div>
    </section>
  );
};

export default DailyQuests;
