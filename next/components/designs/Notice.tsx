import React, { FC, useEffect, useState } from "react";

const Notice: FC<{ message: string }> = ({ message }) => {
  const [notice, setNotice] = useState<string | null>(null);
  useEffect(() => {
    if (message) {
      setNotice(message);
      const timer = setTimeout(() => {
        setNotice(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    notice !== "" && (
      <div className="fixed h-[4rem] top-4 right-2 w-full max-w-sm rounded bg-darkPrimary border-b border-zinc-400 text-center body-1 z-[9999]">
        {notice}
      </div>
    )
  );
};

export default Notice;
