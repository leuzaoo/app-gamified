import React, { useEffect } from "react";

import { useCustomWorkoutStore } from "../store/customWorkout.store";

import Navbar from "./../components/ui/Navbar";

const LABELS = {
  strength: "Força",
  agility: "Agilidade",
  vitality: "Vitalidade",
  intelligence: "Inteligência",
};

const WorkoutsPage = () => {
  const { workouts, isLoading, getExercises, error } = useCustomWorkoutStore();

  useEffect(() => {
    getExercises();
  }, [getExercises]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="mb-4 text-2xl">Meus Treinos</h1>
        {workouts.length === 0 ? (
          <p>Você ainda não criou nenhum treino.</p>
        ) : (
          <ul className="space-y-6">
            {workouts.map((workout) => (
              <li key={workout.id} className="rounded-lg border p-4">
                <h2 className="mb-2 text-xl font-semibold">{workout.name}</h2>
                {workout.exercises.length === 0 ? (
                  <p className="text-sm italic">Nenhum exercício adicionado.</p>
                ) : (
                  <ul className="list-disc space-y-1 pl-5">
                    {workout.exercises.map((exercise) => (
                      <li key={exercise.id}>
                        {exercise.name} — {exercise.goal_value}{" "}
                        {exercise.metric_type === "reps" ? "reps" : "km"} (
                        {LABELS[exercise.attribute]})
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default WorkoutsPage;
