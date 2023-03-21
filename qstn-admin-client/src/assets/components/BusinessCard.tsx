import React, { useEffect, useState } from "react";
import { CiCircleChevDown } from "react-icons/ci";
import { redirect } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { Business } from "../../store/features/types";
import { useNavigate } from "react-router-dom";

interface BusinessPropsType {
  data: {
    imageUrl: string;
    display_name: string;
    url: string;
  };
  version?: "new" | "";
}

const BusinessCard = ({ data, version }: BusinessPropsType) => {
  const navigate = useNavigate();
  const goto = (url: string) => {
    navigate(url);
  };
  console.log(data);
  return (
    <div
      className={
        "flex flex-col font-poppins m-auto my-1 " +
        (version == "new" ? "w-[256px]" : "")
      }
      onClick={() => goto(data.url)}
    >
      <div className="my-6 m-auto p-6 flex flex-col relative w-[240px] h-[316px] hover:shadow-[0_90px_45px_rgba(191,191,191,0.16)] cursor-pointer bg-white rounded-3xl hover:w-[240px] hover:h-[317px]  duration-500  ">
        <img
          src={data.imageUrl}
          alt="NFT"
          className="rounded-2xl h-[173px] w-full"
        />
        <div className="border-t-2 my-5 py-6">
          <button className="border-[#3772FE] border-2 px-3 py-2 text-sm font-bold rounded-3xl mx-auto w-max flex gap-2 justify-between items-center bg-[#3772FF] text-white">
            {data.display_name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
