import { AlertTriangle, FilePenLine, XCircleIcon } from "lucide-react";
import React, { FC } from "react";

interface NotificationProps {
  alert?: boolean;
  error?: boolean;
  note: string;
}

const Notification: FC<NotificationProps> = ({ alert, error, note }) => {
  return (
    <div className="fixed bottom-6 w-full mx-auto lg:max-w-screen-2xl z-[999]">
      <div
        className={`absolute right-4 bottom-0 py-3 w-[20rem] px-6 bg-zinc-200 dark:bg-white/40 rounded-lg border shadow-md flex gap-3 truncate ${
          alert && "border-secondary shadow-secondary"
        } ${
          error && "border-red-400 shadow-red-400"
        } border-lightPrimary shadow-lightPrimary`}
      >
        {alert && <AlertTriangle className="fill-secondary text-black" />}
        {error && <XCircleIcon className="fill-red-500 text-black" />}
        <FilePenLine className="fill-white text-black" />
        <div className="truncate">{note}</div>
      </div>
    </div>
  );
};

export default Notification;
