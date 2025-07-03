import { link } from "fs";
import { FC } from "react";

const page: FC = () => {
  const typesToCreateWith = [
    {
      name: "Course",
      link: "/dashboard/instructor/create/course",
    },
    {
      name: "Announcement",
      link: "/dashboard/instructor/create/announcement",
    },
    {
      name: "Assignment",
      link: "/dashboard/instructor/create/assignment",
    },
  ];
  return (
    <div className="w-full max-w-md h-full min-h-96 py-6 px-4 rounded-lg bg-white dark:bg-gray-900 dark:border border-white/50  shadow-lg">
      <h4 className="h4 font-semibold">Choose content type ?</h4>
      <ul></ul>
    </div>
  );
};

export default page;
