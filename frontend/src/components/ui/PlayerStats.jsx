import TableStats from "./TableStats";
import XPBar from "./XPBar";

const PlayerStats = ({ user }) => {
  const xpBase = 100;
  const currentLevel = Math.floor(Math.sqrt(user.xp / xpBase)) + 1;

  return (
    <section className="px-4">
      <h1 className="mx-auto max-w-max border px-12 text-2xl uppercase">
        Status
      </h1>
      <div className="mt-4 flex w-full items-center justify-center gap-10">
        <div className="flex max-w-max flex-col items-center uppercase">
          <span className="text-5xl">{currentLevel}</span>
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

      <XPBar xp={user.xp} />

      <TableStats user={user} />
    </section>
  );
};

export default PlayerStats;
