import React from "react";

import CountdownTimer from "../common/CountdownTimer";

const mockMissions = [
  { id: 1, title: "Flexões", progress: 0, goal: 10, unit: "" },
  { id: 2, title: "Agachamentos", progress: 0, goal: 10, unit: "" },
  { id: 3, title: "Abdominais", progress: 0, goal: 10, unit: "" },
  { id: 4, title: "Corrida", progress: 0, goal: 5, unit: "km" },
];

const DailyQuests = () => {
  return (
    <section className="p-4">
      <h1 className="max-w-max border-b text-2xl uppercase">Missões Diárias</h1>
      <ul className="mt-4 space-y-4 font-light">
        {mockMissions.map((mission) => (
          <div key={mission.id} className="flex items-center justify-between">
            <li>{mission.title}</li>
            <span>
              [{mission.progress}/{mission.goal}
              {mission.unit}]
            </span>
          </div>
        ))}
      </ul>

      <CountdownTimer />

      <div className="mt-5 text-center">
        <p className="text-lg font-light">
          <span className="text-amber-500 uppercase">Aviso: </span>
          Caso você falhar na missão diária, você não ganhará os pontos
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
