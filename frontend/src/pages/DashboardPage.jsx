import { Loader2Icon } from "lucide-react";

import { useAuthStore } from "./../store/auth.store";

import WorkoutHistoryHeatmap from "../components/ui/WorkoutHistoryHeatmap";
import PlayerStats from "../components/ui/PlayerStats";
import DailyQuests from "../components/ui/DailyQuests";
import Navbar from "../components/ui/Navbar";

const DashboardPage = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Navbar />
      <div className="grid-cols-2 lg:grid">
        <PlayerStats user={user} />
        <DailyQuests />
      </div>
      <div className="px-4">
        <WorkoutHistoryHeatmap />
      </div>
    </div>
  );
};

export default DashboardPage;
