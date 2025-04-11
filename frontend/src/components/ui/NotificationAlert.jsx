import { CircleAlertIcon } from "lucide-react";
import React from "react";

const NotificationAlert = () => {
  return (
    <div className="flex items-center justify-center gap-5 text-amber-400">
      <p className="border p-2">
        <CircleAlertIcon size={40} />
      </p>
      <p className="border px-5 py-2 text-4xl uppercase">Notificação</p>
    </div>
  );
};

export default NotificationAlert;
