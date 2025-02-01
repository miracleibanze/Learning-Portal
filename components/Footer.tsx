import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerLogo } from "@public";

const Footer = () => {
  return (
    <footer className="relative bottom-0 bg-darkBlue text-white py-6 px-8">
      <div className="container mx-auto mb-6 md:mb-0 flex items-center justify-between border-b py-8 border-white/20">
        <Image src={footerLogo} alt="Logo" className="w-16" />
        <div className="flex gap-3 items-center text-md text-darkBlue">
          <i className="fab fa-facebook-f bg-white p-3 !px-4 rounded-full"></i>
          <i className="fab fa-google-plus-g bg-white p-3 rounded-full"></i>
          <i className="fab fa-linkedin-in bg-white p-3 rounded-full"></i>
          <i className="fab fa-youtube bg-white p-3 rounded-full"></i>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start pt-6">
        <div className="text-white/90">
          <p className="h5 font-semibold text-white">Our Address</p>
          <a
            href="mailto:career@tickets.com"
            className="text-sm hover:underline"
          >
            <i className="far fa-envelope mr-3"></i> career@tickets.com
          </a>
          <p className="text-sm flex gap-3 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-4 w-4 fill-white"
            >
              <path d="M505.04 442.66l-99.71-99.69c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.69 44-127.99C416.03 93.09 322.92 0 208.02 0S0 93.09 0 207.98s93.11 207.98 208.02 207.98c48.3 0 92.71-16.4 128.01-44v16.3c0 6.4 2.5 12.5 7 17l99.71 99.69c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.59.1-33.99zm-297.02-90.7c-79.54 0-144-64.34-144-143.98 0-79.53 64.35-143.98 144-143.98 79.54 0 144 64.34 144 143.98 0 79.53-64.35 143.98-144 143.98zm.02-239.96c-40.78 0-73.84 33.05-73.84 73.83 0 32.96 48.26 93.05 66.75 114.86a9.24 9.24 0 0 0 14.18 0c18.49-21.81 66.75-81.89 66.75-114.86 0-40.78-33.06-73.83-73.84-73.83zm0 96c-13.26 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z" />
            </svg>{" "}
            8th KIG 14 Ave, Kigali
          </p>
          <p className="text-sm mb-2">
            <i className="fas fa-phone rotate-90 mr-3"></i> +250 700 000 000
          </p>
        </div>
        <div className="space-y-2">
          <p className="h5 font-semibold">Quick Links</p>
          <ul className="list-none text-white/90 flex flex-col gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/program">Program</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="w-full max-w-md">
          <p className="body-1 font-semibold">
            Join our newsletter to keep up to date with us!
          </p>
          <div className="flex mt-2 bg-white p-2 rounded-md">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 mr-2 flex-1 w-full outline-none text-lg"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/20 pt-4 text-center text-sm flex items-center justify-between container mx-auto">
        <span>Copyright © All Rights Reserved SawaPay 2024</span>
        <span>
          <Link href="/privacy-policy">Privacy Policy</Link> |{" "}
          <Link href="/terms-conditions">Terms and Conditions</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
