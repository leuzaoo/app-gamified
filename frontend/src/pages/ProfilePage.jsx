import { UserCircle2Icon } from "lucide-react";

import { useAuthStore } from "../store/auth.store";

import WorkoutHistoryHeatmap from "./../components/ui/WorkoutHistoryHeatmap";
import TableStats from "../components/ui/TableStats";
import Navbar from "../components/ui/Navbar";

const ProfilePage = () => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div className="mx-auto max-w-5xl p-4">
      <Navbar />
      <section>
        <div className="flex w-full grid-cols-4 items-center justify-between sm:grid sm:gap-5">
          <div className="col-span-2 flex items-center gap-4">
            <UserCircle2Icon size={80} strokeWidth={1} />
            <div className="col-span-3">
              <span className="text-sm">{user.name}</span>
              <h1 className="text-3xl font-medium">{user.username}</h1>
            </div>
          </div>
          <h1 className="text-xl underline sm:hidden">Status de jogador</h1>
          <div className="col-span-2">
            <TableStats user={user} />
          </div>
        </div>
        <WorkoutHistoryHeatmap />
      </section>
    </div>
  );
};

export default ProfilePage;
