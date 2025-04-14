import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";

import { useAuthStore } from "./../store/auth.store";

import DailyWorkoutRecordForm from "../components/forms/DailyWorkoutRecordForm";
import PlayerStats from "../components/ui/PlayerStats";
import DailyQuests from "../components/ui/DailyQuests";
import Navbar from "../components/ui/Navbar";

const DashboardPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDailyRecord, setOpenDailyRecord] = useState(false);

  const { user, logout, isLoading } = useAuthStore();

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleOpenDailyRecord = () => {
    setOpenDailyRecord(!openDailyRecord);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar
        menuOpen={menuOpen}
        handleMenuOpen={handleMenuOpen}
        handleLogout={handleLogout}
      />
      <PlayerStats user={user} />
      <hr className="mx-4 mt-4 border-t opacity-20" />
      <DailyQuests openDailyRecord={handleOpenDailyRecord} />
      {openDailyRecord ? <DailyWorkoutRecordForm /> : ""}
    </div>
  );
};

export default DashboardPage;
