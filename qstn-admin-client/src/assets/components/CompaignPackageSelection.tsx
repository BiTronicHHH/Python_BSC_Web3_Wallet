import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/Routes";

export interface CompaignPackageType {
  title: string;
  price: number;
  usersCount: number;
}

export default function CompaignPackageSelection({
  title,
  price,
  usersCount,
}: CompaignPackageType) {
  const navigate = useNavigate();

  return (
    <div className="w-[235px] h-[408px] bg-[#FFFFFFd1] rounded-xl p-8 relative">
      <div className="flex flex-col mt-2">
        <p className="text-[15px] font-poppins-bold tracking-widest text-center">
          {title}
        </p>
        <div className=" text-center mx-auto w-max">
          <div className="relative w-max mx-auto">
            <BiDollar className="text-[30px] text-[#3772FF] font-bold font-segoe-ui absolute left-[-22px]" />
            <p className="text-[50px] font-poppins-black">{price}</p>
          </div>
          <p className="text-[10px] font-poppins-bold">
            QSTN <span className="text-[#777E91]">service fee</span>
            <span className="text-[#3772FF]"> 10%</span>
          </p>
          <p className="text-[10px] font-poppins-bold">Per compaign</p>
        </div>
        <div className="mt-10 text-[#777E91]">
          <div className="flex gap-2 items-start">
            <div>
              <AiFillStar color="#FFCC57" size={20} />
            </div>
            <p className="text-xs font-normal mb-5 text-left">
              Survey{" "}
              <span className="font-poppins-bold text-[#23262F]">
                {" "}
                {usersCount}{" "}
              </span>{" "}
              users.
            </p>
          </div>
          <div className="flex gap-2 items-start">
            <div>
              <AiFillStar color="#FFCC57" size={20} />
            </div>
            <p className="text-xs font-normal mb-5 text-left">
              <span className="font-poppins-bold text-[#23262F]"> NFT </span>{" "}
              Reward per compaign.
            </p>
          </div>
          <div className="flex gap-2 items-start">
            <div>
              <AiFillStar color="#FFCC57" size={20} />
            </div>
            <p className="text-xs font-normal mb-5 text-left">
              respondent will earn $0.50 per compaign.
            </p>
          </div>
        </div>
      </div>
      <button
        className="w-[50px] h-[50px] bg-[#3772FF] text-white rounded-full flex items-center justify-center drop-shadow-[0_50px_49.5px_rgba(55,43,123,0.14)] absolute bottom-[-25px] left-[87px]"
        onClick={() => navigate(Routes.SURVEYS_PAYMENTMETHOD_SELECTION)}
      >
        <BsArrowRight />
      </button>
    </div>
  );
}
