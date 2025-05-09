import { Link } from "react-router-dom";

import { Character, HomeBg, Logo } from "../image-datas/imageLinks";

const HomePage = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src={HomeBg}
        alt="Background Wallpaper"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-center px-8 lg:grid-cols-2 lg:place-items-center lg:justify-between">
        <div className="flex flex-col items-center">
          <img src={Logo} className="mb-3 size-20" />
          <h1 className="text-4xl leading-12 font-bold text-white uppercase lg:text-6xl/16">
            Alcance seu próximo nível
          </h1>
          <p className="mt-3 font-light lg:text-xl">
            Sua jornada de evolução pessoal gamificada! Transforme cada treino
            em uma missão. Complete desafios diários, obtenha pontos de
            experiência e suba de nível desbloqueando novos objetivos.
          </p>

          <Link
            to="/login"
            className="bg-light border-dark text-dark-purple hover:text-light hover:bg-primary-orange mt-5 w-full rounded-2xl border-r-4 border-b-4 py-3 text-center text-xl font-medium shadow-xl transition-all duration-300 ease-in-out"
          >
            Iniciar jornada
          </Link>
        </div>
        <div className="hidden lg:block">
          <img
            src={Character}
            className="h-screen object-cover"
            alt="Character"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
