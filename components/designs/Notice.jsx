import { useContext, useEffect } from "react";
import { AppContext } from "../../features/AppContext";

const Notice = () => {
  const context = useContext(AppContext);
  if (!context) return;
  const { notice, setNotice } = context;

  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => {
        setNotice("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notice]);

  return (
    notice !== "" && (
      <div className="fixed h-[4rem] slide-down top-0 flex items-center justify-center w-full bg-zinc-300 border-b border-zinc-400 text-center body-1 z-[9999]">
        {notice}
      </div>
    )
  );
};

export default Notice;
