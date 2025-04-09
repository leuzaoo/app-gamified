import React, { useState } from "react";

import { CircleAlertIcon, Loader2Icon } from "lucide-react";

import { useUsernameStore } from "../store/username.store";
import { useAuthStore } from "./../store/auth.store";

const SetUsernamePage = () => {
  const [username, setUsername] = useState("");

  const { create, error, isLoading } = useUsernameStore();
  const { authCheck } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create(username);
      await authCheck();
    } catch (error) {
      console.error("Username error: ", error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="max-w-3xl border-2 px-20 py-10">
        <div className="flex items-center justify-center gap-5">
          <p className="border p-2">
            <CircleAlertIcon size={40} />
          </p>
          <p className="border px-5 py-2 text-4xl uppercase">Notificação</p>
        </div>

        <p className="mt-5 text-2xl">
          Identifiquei um <span className="text-amber-400">novo jogador</span>{" "}
          em meu sistema e quero saber, como você quer será chamado?
        </p>

        <form onSubmit={handleSubmit} className="mt-5 w-full">
          <input
            id="username"
            placeholder="Nome do jogador"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
            className="mx-auto flex items-center justify-center border border-amber-400 bg-amber-800 p-2 text-center text-xl text-amber-300 outline-none placeholder:opacity-50"
          />
          {error && (
            <p className="mt-3 mb-4 text-center text-red-500">{error}</p>
          )}

          <button className="mx-auto mt-5 flex h-14 w-40 cursor-pointer items-center justify-center border text-center text-2xl">
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Confirmar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUsernamePage;
