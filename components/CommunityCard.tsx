import { FC, useState } from "react";
import { Community } from "@/redux/slices/communitySlice";
import Image from "next/image";
import { whiteLogo } from "@public";

interface CommunityCardProps {
  community: Community;
  onEdit: (community: Community) => void;
  onDelete: (id: string) => void;
  onManageMembers: (id: string) => void;
}

const CommunityCard: FC<CommunityCardProps> = ({
  community,
  onEdit,
  onDelete,
  onManageMembers,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const toggleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <tr
        className={`${
          community.visibility === "public" && "bg-zinc-100"
        } border-zinc-300 cursor-pointer ${
          isClicked ? "border-t" : "border-y hover:bg-zinc-200"
        }`}
        onClick={toggleClick}
      >
        <td className="font-semibold flex gap-2">
          <Image
            src={whiteLogo}
            width={400}
            height={400}
            className="h-6 !w-6 rounded-full bg-primary object-contain p-1 flex-0"
            alt="community image"
          />
          {community.name}
        </td>
        <td className="text-zinc-600 text-sm max-w-[18rem]">
          {community.description}
        </td>
        <td className="text-sm font-medium">
          <u>{community.members || 0}</u> members
        </td>
      </tr>
      <tr
        className={`${
          community.visibility === "public" && "bg-zinc-100"
        } col-span-3 w-full ${!isClicked && "hidden"} transition duration-300`}
      >
        <td colSpan={3}>
          <button
            onClick={() => onEdit(community)}
            className="button bg-blue-500 hover:bg-blue-400 text-white rounded px-4 mr-3"
          >
            <i className="fas fa-edit mr-2"></i>Edit
          </button>
          <button
            onClick={() => onManageMembers(community._id!)}
            className="button bg-blue-700 hover:bg-blue-600 text-white rounded px-4 mr-3"
          >
            <i className="fas fa-user mr-2"></i>Manage Members
          </button>
          <button
            onClick={() => onDelete(community._id!)}
            className="button bg-red-600 hover:bg-red-500 text-white rounded px-4 mr-3"
          >
            <i className="fas fa-trash mr-2"></i>Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default CommunityCard;
