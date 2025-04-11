import {
  BrainIcon,
  DumbbellIcon,
  FootprintsIcon,
  HeartCrackIcon,
} from "lucide-react";
import React from "react";

const PlayerStats = ({ user }) => {
  return (
    <section className="px-4">
      <h1 className="mx-auto max-w-max border px-12 text-2xl uppercase">
        Status
      </h1>
      <div className="mt-4 flex w-full items-center justify-center gap-10">
        <div className="flex max-w-max flex-col items-center uppercase">
          <span className="text-5xl">22</span>
          <span className="text-xs font-light">Nível</span>
        </div>
        <div className="flex flex-col space-y-1 text-xs uppercase">
          <p className="font-light">
            Jogador: <span className="font-medium">{user.username}</span>
          </p>
          <p className="font-light">
            Título: <span className="font-medium">Caçador de onça</span>
          </p>
        </div>
      </div>

      <div className="my-5 border">
        <div className="uppercase">
          <ul className="grid grid-cols-2 justify-items-center gap-2 px-10 py-4">
            <li className="flex items-center gap-2">
              <DumbbellIcon size={20} />{" "}
              <p className="flex items-center gap-1 font-extralight">
                FOR: <span className="text-lg font-medium">22</span>
              </p>
            </li>
            <li className="flex items-center gap-2">
              <BrainIcon size={20} />{" "}
              <p className="flex items-center gap-1 font-extralight">
                INT: <span className="text-lg font-medium">10</span>
              </p>
            </li>
            <li className="flex items-center gap-2">
              <HeartCrackIcon size={20} />{" "}
              <p className="flex items-center gap-1 font-extralight">
                VIT: <span className="text-lg font-medium">10</span>
              </p>
            </li>
            <li className="flex items-center gap-2">
              <FootprintsIcon size={20} />{" "}
              <p className="flex items-center gap-1 font-extralight">
                AGI: <span className="text-lg font-medium">10</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PlayerStats;
