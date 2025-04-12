import React, { useState } from "react";
import { useWorkoutStore } from "../../store/workout.store";
import { useAuthStore } from "../../store/auth.store";
import NotificationAlert from "./../ui/NotificationAlert";

const SetWorkoutForm = () => {
  const [workoutType, setWorkoutType] = useState("");
  const [trainingExperience, setTrainingExperience] = useState("");

  const { chooseWorkout } = useWorkoutStore();
  const { authCheck } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (workoutType && trainingExperience) {
        await chooseWorkout(workoutType, trainingExperience);
        await authCheck();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="px-4">
        <NotificationAlert />
        <p className="my-10 text-2xl">
          Defina abaixo como será a sua{" "}
          <span className="text-amber-400 underline">evolução de força</span>.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 border p-4">
            <p className="mb-2 text-lg font-medium">Onde você irá treinar?</p>
            <div className="flex flex-col gap-4">
              <label
                className={`cursor-pointer border p-4 ${
                  workoutType === "academia"
                    ? "text-dark-purple border-white bg-amber-400 font-medium"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="workout"
                  value="academia"
                  checked={workoutType === "academia"}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  className="hidden"
                />
                <div className="flex flex-col text-center">
                  <span className="text-xl">Na academia</span>
                </div>
              </label>
              <label
                className={`cursor-pointer border p-4 ${
                  workoutType === "casa/rua"
                    ? "text-dark-purple border-white bg-amber-400 font-medium"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="workout"
                  value="casa/rua"
                  checked={workoutType === "casa/rua"}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  className="hidden"
                />
                <div className="flex flex-col text-center">
                  <span className="text-xl">Em casa/rua</span>
                </div>
              </label>
            </div>

            <p className="mt-6 mb-2 text-lg font-medium">
              Qual a sua experiência de treino?
            </p>
            <div className="flex flex-col gap-4">
              <label
                className={`cursor-pointer border p-4 ${
                  trainingExperience === "beginner"
                    ? "text-dark-purple border-white bg-amber-400 font-medium"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="experience"
                  value="beginner"
                  checked={trainingExperience === "beginner"}
                  onChange={(e) => setTrainingExperience(e.target.value)}
                  className="hidden"
                />
                <div className="flex flex-col text-center">
                  <span className="text-xl">Nunca treinei</span>
                </div>
              </label>
              <label
                className={`cursor-pointer border p-4 ${
                  trainingExperience === "regular"
                    ? "text-dark-purple border-white bg-amber-400 font-medium"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="experience"
                  value="regular"
                  checked={trainingExperience === "regular"}
                  onChange={(e) => setTrainingExperience(e.target.value)}
                  className="hidden"
                />
                <div className="flex flex-col text-center">
                  <span className="text-xl">Regularmente</span>
                </div>
              </label>
              <label
                className={`cursor-pointer border p-4 ${
                  trainingExperience === "advanced"
                    ? "text-dark-purple border-white bg-amber-400 font-medium"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="experience"
                  value="advanced"
                  checked={trainingExperience === "advanced"}
                  onChange={(e) => setTrainingExperience(e.target.value)}
                  className="hidden"
                />
                <div className="flex flex-col text-center">
                  <span className="text-xl">Mais de 1 ano</span>
                </div>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={!workoutType || !trainingExperience}
            className="bg-primary-blue mt-10 w-full cursor-pointer rounded-lg border py-3 font-semibold text-white hover:opacity-80 disabled:opacity-50"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetWorkoutForm;
