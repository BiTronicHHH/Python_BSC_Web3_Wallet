import React from "react";
import images from "../../assets";
import { TbArrowNarrowRight } from "react-icons/tb";

export default function FooterQstn() {
  return (
    <div className="container mx-auto footer font-poppins py-[60px]">
      <div className="mb-10">
        <div className="flex max-md:flex-wrap items-center">
          <div className="w-1/2 max-md:w-full">
            <div className="w-[213px]">
              <img src={images.logo} alt="Logo" />
              <p className="text-2xl text-[#23262F] mb-0 mt-3 tracking-[-1px] w-max">
                The new creative community.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap w-1/2 max-md:w-full max-md:mt-3">
            <div className="w-1/3 max-md:w-full m-auto">
              <p className="text-base font-[700] mb-4">Qstn</p>
              <div className="flex flex-col gap-3 text-sm text-[#777E91] font-bold font-segoe-ui">
                <p>Discover</p>
                <p>Connect Wallet</p>
                <p>Create item</p>
              </div>
            </div>
            <div className="w-2/3 max-md:w-full max-md:mt-5 flex flex-col gap-3">
              <p className="text-base font-[700] mb-4">Join Newsletter</p>
              <p className="text-sm">
                Subscribe to our newsletter for product updates, drops and more
              </p>
              <div className="w-full flex justify-between items-center px-3 py-2 border-2 focus:ring-blue-500 focus:border-blue-500  text-[#3d4c63] rounded-3xl">
                <input
                  className="outline-none border-none font-bold text-sm placeholder:font-normal"
                  placeholder="Enter your email"
                />
                <TbArrowNarrowRight
                  color="white"
                  className="bg-[#3772FF] rounded-full w-[32px] h-[32px] p-1"
                />
              </div>
              <p className="text-xs text-[#777E91] font-poppins">
                By signing up for email, you agree to QSTN's{" "}
                <span className="text-[#3772FF]">Terms of Service</span> and{" "}
                <span className="text-[#3772FF]">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t-2 flex flex-wrap-reverse justify-between items-center text-xs ">
        <p className="text-[#777E91]">
          Copyright © 2023 Sink. All rights reserved
        </p>
        <div className="flex justify-between">
          <p className="text-[#23262F]">We use cookies for better service.</p>
          <button className="text-[#3772FF] border-none h-max ml-3">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
