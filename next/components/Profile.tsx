import { FC } from "react";
import Image from "next/image";
import { UserType } from "@type/User";
interface ProfileProps {
  user: UserType | null;
}
const Profile: FC<ProfileProps> = ({ user }) => {
  return (
    <div className="p-4 rounded-md shadow-md">
      {user ? (
        <>
          {user?.picture ? (
            <Image
              src={user?.picture as string}
              alt="profile"
              width={80}
              height={80}
              className="w-[7rem] object-cover"
            />
          ) : (
            <div className="bg-zinc-300/50 aspect-square w-max h-[4rem] flex items-center justify-center">
              <i className="fas fa-user text-[3rem]"></i>
            </div>
          )}
        </>
      ) : (
        <p>User not found.</p>
      )}
      <h2 className="text-xl font-bold">{user?.name}</h2>
      <p className="text-gray-600 dark:text-white/70">{user?.email}</p>
    </div>
  );
};

export default Profile;
