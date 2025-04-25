import React from "react";

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
    <div>
      <Navbar />
      <PlayerStats user={user} />
      <hr className="mx-4 mt-4 border-t opacity-20" />
      <DailyQuests />
      <hr className="mx-4 my-4 border-t opacity-20" />
      <WorkoutHistoryHeatmap />
      <hr className="mx-4 my-4 border-t opacity-20" />
    </div>
  );
};

export default DashboardPage;
