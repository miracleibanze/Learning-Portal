import React from "react";

interface HeadingProps {
  title: string;
  title2?: string;
  text?: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  title2,
  text,
  className,
}) => {
  return (
    <>
      <h3
        className={`h3 w-full leading-tight mb-2 px-4 text-center font-semibold mx-auto max-w-3xl ${
          className ? className : ""
        }`}
      >
        {title}
        {title2 && (
          <>
            <br className="max-md:hidden" />
            {title2}
          </>
        )}
      </h3>
      <p
        className={`body-2 text-center px-4 text-zinc-500 w-full max-w-xl mx-auto mb-12 ${
          className ? className : ""
        }`}
      >
        {text}
      </p>
    </>
  );
};

export default Heading;
