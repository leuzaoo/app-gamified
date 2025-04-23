import { Link } from "react-router-dom";
import React from "react";

import { HomeBg } from "../image-datas/imageLinks";

const HomePage = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src={HomeBg}
        alt="Background Wallpaper"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8">
        <h1 className="text-4xl leading-12 font-bold text-white uppercase">
          Alcance seu próximo nível
        </h1>
        <p className="mt-3 font-light">
          Sua jornada de evolução pessoal gamificada! Transforme cada treino em
          uma missão. Complete desafios diários, obtenha pontos de experiência e
          suba de nível desbloqueando novos objetivos.
        </p>

        <Link
          to="/login"
          className="bg-light text-dark-purple hover:text-light hover:bg-primary-orange mt-5 w-full rounded-2xl py-3 text-center text-xl font-medium transition-all duration-300 ease-in-out"
        >
          Iniciar jornada
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
