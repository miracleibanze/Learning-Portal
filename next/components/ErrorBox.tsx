import { usePathname } from "next/navigation";

const ErrorBox = () => {
  const pathname = usePathname();
  return (
    <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-md border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-600">
      <p className="body-2 font-medium">
        Server error: Couldn't fetch data for this page.
      </p>
      <p className="body-2">
        Please contact{" "}
        <a
          href={`mailto:miracleibanze@gmail.com?subject=${encodeURIComponent(
            "Assignment fetch fail"
          )}&body=${encodeURIComponent(
            `I'm facing an issue with loading data on page ${pathname}.`
          )}`}
          className="underline"
        >
          miracleibanze@gmail.com
        </a>{" "}
        for support.
      </p>
    </div>
  );
};

export default ErrorBox;
