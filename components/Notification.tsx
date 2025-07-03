import {
  AlertTriangle,
  BrainIcon,
  FilePenLine,
  MarsStrokeIcon,
  PenOffIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import { FC } from "react";

interface NotificationProps {
  alert?: boolean;
  error?: boolean;
  note?: boolean;
}

const Notification: FC<NotificationProps> = ({ alert, error, note }) => {
  return (
    <div className="fixed bottom-6 w-full mx-auto lg:max-w-screen-2xl z-[999]">
      <div
        className={`absolute right-4 bottom-0 py-3 w-[20rem] px-6 bg-zinc-200 dark:bg-white/40 rounded-lg border shadow-md flex gap-3 truncate ${
          alert && "border-yellow-300 shadow-yellow-400"
        } ${
          error && "border-red-400 shadow-red-400"
        } border-green-400 shadow-green-400`}
      >
        {alert && <AlertTriangle className="fill-yellow-400 text-black" />}
        {error && <XCircleIcon className="fill-red-500 text-black" />}
        <FilePenLine className="fill-white text-black" />
        <div className="truncate">Notification</div>
      </div>
    </div>
  );
};

export default Notification;
