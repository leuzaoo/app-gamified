import React, { useState } from "react";

import { useWorkoutStore } from "../../store/workout.store";
import { useAuthStore } from "../../store/auth.store";

import NotificationAlert from "./../ui/NotificationAlert";

const SetWorkoutForm = () => {
  const [workoutType, setWorkoutType] = useState("");

  const { chooseWorkout } = useWorkoutStore();
  const { authCheck } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (workoutType) {
        await chooseWorkout(workoutType);
        await authCheck();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="px-4">
          <NotificationAlert />
          <p className="my-10 text-2xl">
            Defina abaixo como será a sua{" "}
            <span className="text-amber-400 underline">evolução de força</span>.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 border p-4">
              <label
                className={`cursor-pointer border p-4 ${workoutType === "academia" ? "text-dark-purple border-white bg-amber-400 font-medium" : ""}`}
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
                  <span className="text-xl">Vou treinar na academia</span>
                </div>
              </label>
              <label
                className={`cursor-pointer border p-4 ${workoutType === "casa/rua" ? "text-dark-purple border-white bg-amber-400 font-medium" : ""}`}
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
                  <span className="text-xl">Vou treinar em casa/rua</span>
                </div>
              </label>
            </div>
            <button
              type="submit"
              disabled={!workoutType}
              className="bg-primary-blue mt-10 w-full cursor-pointer rounded-lg border py-3 font-semibold text-white hover:opacity-80 disabled:opacity-50"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetWorkoutForm;
