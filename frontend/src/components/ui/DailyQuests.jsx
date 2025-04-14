import React, { useEffect, useState } from "react";

import CountdownTimer from "../common/CountdownTimer";
import { PencilIcon } from "lucide-react";
import { useWorkoutStore } from "../../store/workout.store";

const DailyQuests = ({ openDailyRecord }) => {
  const [record, setRecord] = useState({
    pushups: 0,
    squats: 0,
    situps: 0,
    running_distance: 0,
  });

  const [loading, setLoading] = useState(true);

  const { getDailyWorkout } = useWorkoutStore();

  useEffect(() => {
    async function fetchDailyWorkout() {
      try {
        const res = await getDailyWorkout();
        setRecord(res.record || res.data.record);
        console.log("Treino diário: ", res.record);
      } catch (error) {
        console.error("Erro ao buscar o registro diário: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDailyWorkout();
  }, [getDailyWorkout]);

  const missions = [
    {
      id: 1,
      title: "Flexões",
      progress: record.pushups || 0,
      goal: 20,
      unit: "",
    },
    {
      id: 2,
      title: "Agachamentos",
      progress: record.squats || 0,
      goal: 20,
      unit: "",
    },
    {
      id: 3,
      title: "Abdominais",
      progress: record.situps || 0,
      goal: 20,
      unit: "",
    },
    {
      id: 4,
      title: "Corrida",
      progress: record.running_distance || 0,
      goal: 2,
      unit: "km",
    },
  ];

  return (
    <section className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="max-w-max border-b text-2xl uppercase">
          Missões Diárias
        </h1>
        <PencilIcon
          className="cursor-pointer border-b pb-1"
          onClick={openDailyRecord}
        />
      </div>
      {loading ? (
        <p>Carregando missões...</p>
      ) : (
        <ul className="mt-4 space-y-4 font-light">
          {missions.map((mission) => (
            <div key={mission.id} className="flex items-center justify-between">
              <li>{mission.title}</li>
              <span>
                [{mission.progress}/{mission.goal}
                {mission.unit}]
              </span>
            </div>
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
