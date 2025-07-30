export const LineSkeleton = ({
  index,
  assignment,
  noBorder,
}: {
  index?: number;
  assignment?: true;
  noBorder?: boolean;
}) => {
  return (
    <div
      className={`${
        !noBorder && "border-t"
      } border-gray-300 dark:border-white/30 py-2 px-3`}
    >
      <div className="w-1/2 dark:bg-white/50 h-5 rounded-md bg-zinc-300 skeleton-shimmer" />

      <div
        className={`w-full h-3 dark:bg-white/50 rounded-md bg-zinc-300 mt-2 skeleton-shimmer`}
      />

      {index && index > 2 && (
        <div className="w-1/3 max-w-[10rem] dark:bg-white/50 h-3 rounded-md bg-zinc-300 mt-2 skeleton-shimmer" />
      )}
      {assignment && (
        <>
          <div className="w-1/3 max-w-[6rem] dark:bg-white/50 h-6 rounded-md bg-zinc-300 skeleton-shimmer mb-2 mt-4" />
          <div className="w-full flex gap-x-3 items-center mb-6">
            <div className="h-[4rem] aspect-square flex-0 p-3 bg-zinc-300 dark:bg-white/20 rounded-full mr-4 skeleton-shimmer" />
            <div className="w-full relative">
              <div className="h-6 relative w-1/3 bg-zinc-300 dark:bg-white/20 rounded-lg mb-2 skeleton-shimmer" />
              <div className="h-4  w-1/3 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const CourseCardSkeleton = () => {
  return (
    <div className="shrink-0 w-64 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-[1.01] transition hover:shadow-lg cursor-pointer dark:hover:border-white">
      <div className="relative w-full h-36 bg-lightPrimary dark:bg-white/40" />
      <div className="p-4">
        <div className="h-6 bg-zinc-300 dark:bg-white/50 rounded-md mb-2 skeleton-shimmer" />
        <div className="bg-zinc-300 dark:bg-white/50 mb-3 h-6 rounded-md w-1/2 skeleton-shimmer" />
        <div className=" bg-zinc-300 dark:bg-white/50 mb-1 w-3/4 h-3 rounded skeleton-shimmer" />
        <div className=" bg-zinc-300 dark:bg-white/50 mb-1 h-3 rounded skeleton-shimmer" />
        <div className=" bg-zinc-300 dark:bg-white/50 mb-3 w-1/2 h-3 rounded skeleton-shimmer" />
        <div className="px-3 py-0 bg-zinc-300 dark:bg-white/50 mb-3 rounded-full h-4 w-6 skeleton-shimmer" />
        <div className=" flex flex-wrap gap-x-2 gap-y-1">
          <div className="px-3 py-0 bg-zinc-300 dark:bg-white/50 mb-3 rounded-full h-6 w-14 skeleton-shimmer" />
          <div className="px-3 py-0 bg-zinc-300 dark:bg-white/50 mb-3 rounded-full h-6 w-16 skeleton-shimmer" />
          <div className="px-3 py-0 bg-zinc-300 dark:bg-white/50 mb-3 rounded-full h-6 w-12 skeleton-shimmer" />
        </div>
      </div>
      <div className="p-4 border-t border-zinc-300">
        <div className="bg-zinc-300 h-4 w-1/2 rounded" />
      </div>
    </div>
  );
};

export const CourseDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-darkPrimary p-6 rounded-lg shadow-lg">
      {/* Course Thumbnail */}
      <div className="mb-4 w-full h-72 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />
      <div className="mb-4 w-1/2 h-8 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />
      <div className="mb-2 w-full h-4 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />
      <div className="mb-6 w-1/2 h-4 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />

      <div className="mt-4 flex justify-start gap-2 relative">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div
              className="mb-4 w-full max-w-[4rem] h-6 bg-zinc-300 dark:bg-white/20 rounded-full flex-0"
              key={index}
            ></div>
          ))}
      </div>
      <div className="mb-4 w-1/3 h-4 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />
      <div className="mb-4 w-1/3 h-4 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />
      <div className="mb-4 w-1/3 h-4 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />

      <div className="w-full flex gap-x-3 items-center mb-6">
        <div className="h-[4rem] aspect-square flex-0 p-3 bg-zinc-300 dark:bg-white/20 rounded-full mr-4 skeleton-shimmer" />
        <div className="w-full relative">
          <div className="h-6 relative w-1/3 bg-zinc-300 dark:bg-white/20 rounded-lg mb-2 skeleton-shimmer" />
          <div className="h-4 inline w-1/3 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />
        </div>
      </div>
      <div className="h-4 inline w-1/3 bg-zinc-300 dark:bg-white/20 rounded-lg mb-4 skeleton-shimmer" />
      <div className="h-4 inline w-1/3 bg-zinc-300 dark:bg-white/20 rounded-lg skeleton-shimmer" />
    </div>
  );
};
