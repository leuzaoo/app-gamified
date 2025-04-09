import React from "react";

const DailyQuests = () => {
  return (
    <section className="p-4">
      <h1 className="max-w-max border-b text-2xl uppercase">Missões Diárias</h1>
      <ul className="mt-4 space-y-4 font-light">
        <div className="flex items-center justify-between">
          <li>Flexões</li>
          <span>[0/10]</span>
        </div>
        <div className="flex items-center justify-between">
          <li>Agachamentos</li>
          <span>[0/10]</span>
        </div>
        <div className="flex items-center justify-between">
          <li>Abdominais</li>
          <span>[0/10]</span>
        </div>
        <div className="flex items-center justify-between">
          <li>Corrida</li>
          <span>[0/5km]</span>
        </div>
      </ul>
      <div className="mt-10 text-center">
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
