import { FC } from "react";

interface BannerParameter {
  fill: string;
  height: string;
  white: boolean;
  className: string;
}

const Banner: FC<BannerParameter> = ({ fill, height, white, className }) => (
  <svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    height={height}
    className={`absolute bottom-0 right-0 left-0 w-[100.5%] ${
      className && className
    }`}
  >
    <path
      d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
      className={`${!fill && !white && "fill-[#f4f4f5] dark:fill-[#242424]"}`}
      fill={`${white ? "white" : fill && fill}`}
    ></path>
  </svg>
);
export default Banner;
