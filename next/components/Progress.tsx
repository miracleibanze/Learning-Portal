import { FC } from "react";
import { UserState } from "@redux/slices/userSlice";
import { Loader } from "lucide-react";

const Progress: FC<{ currentUser: UserState }> = ({ currentUser }) => {
  const { user, loadingUser } = currentUser;
  return (
    <div>
      <div className="w-full flex-1">
        <p className="h4 text-primary font-semibold px-3 pt-2">Your Progress</p>
        <p className="text-sm text-primary leading-none px-3 pb-2">
          Track your progress and learn faster and smarter.
        </p>
      </div>
      <h2></h2>
      {loadingUser ? (
        <div className="w-full h-52 flex items-center justify-center">
          <Loader className="h-12 w-12" />
        </div>
      ) : user?.progress ? (
        user.progress.map((progress) => (
          <div key={progress.courseId}>
            <h3>{progress.courseId}</h3>
            <p>
              {progress.completedModules}/{progress.totalModules} modules
              completed
            </p>
            <progress
              value={progress.completedModules}
              max={progress.totalModules}
            />
            <p>
              Last Accessed:{" "}
              {new Date(progress.lastAccessed).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <div className="w-full h-52 flex items-center justify-center">
          <p className="text-gray-500 text-sm text-center py-2">
            No course available.
          </p>
        </div>
      )}
    </div>
  );
};

export default Progress;
