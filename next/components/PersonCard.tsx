import { FC } from "react";
import { UserType } from "@type/User";
import Image from "next/image";
import { User } from "lucide-react";

const PersonCard: FC<{ person: Partial<UserType> }> = ({ person }) => {
  return (
    <div
      key={person._id}
      className="md:w-52 w-full h-72 min-h-max rounded-lg border border-zinc-500 dark:border-white/50 shadow flex flex-col overflow-hidden hover:scale-[1.02] transition-all"
    >
      <div className="w-full bg-primary dark:bg-darkPrimary h-20 relative">
        <span className="absolute top-14 right-2 text-sm text-secondary">
          {person.role}
        </span>
        <Image
          src="/logo.png"
          alt="logo"
          width={80}
          height={80}
          className="w-full h-full p-5 pr-2 object-contain"
        />
      </div>
      {person.picture ? (
        <Image
          src={person.picture}
          alt="profile"
          width={80}
          height={80}
          className="object-cover w-20 h-20 aspect-square -translate-y-1/2 rounded-full ml-2"
        />
      ) : (
        <div className="w-20 h-20 aspect-square -translate-y-1/2 rounded-full bg-zinc-300 dark:bg-white p-3 ml-2">
          <User className="w-full h-full" color="white" />
        </div>
      )}
      <div className="flex-1 -translate-y-10 p-3 relative">
        <p className="font-semibold leading-tight">{person.name}</p>
        <p className="truncate-two-lines text-sm mb-2 leading-tight">
          {person.about || "No description available."}
        </p>
        <p className="md:text-sm text-xs text-zinc-500 dark:text-white/70 italic mb-4">
          {person.email}
        </p>
        <div className="flex justify-between">
          <button className="bg-primary text-white rounded-md py-1 text-sm px-3">
            Contact
          </button>
          <button className="bg-primary text-white rounded-md py-1 text-sm px-3">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
