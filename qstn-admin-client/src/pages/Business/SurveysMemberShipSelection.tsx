import React from "react";
import { AiFillPieChart, AiFillStar } from "react-icons/ai";
import { HiArrowLongLeft } from "react-icons/hi2";
import { SlGraph } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { BiDollar } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import images from "../../assets";
import { Routes } from "../../routes/Routes";
import CompaignPackageSelection from "../../assets/components/CompaignPackageSelection";

export interface CompaignPackageType {
  title: string;
  price: number;
  usersCount: number;
}

export default function SurveysMemberShipSelection() {
  const navigate = useNavigate();

  const packageList: CompaignPackageType[] = [
    {
      title: "individual",
      price: 11,
      usersCount: 20,
    },
    {
      title: "small business",
      price: 55,
      usersCount: 100,
    },
    {
      title: "medium business",
      price: 110,
      usersCount: 100,
    },
    {
      title: "large business",
      price: 525,
      usersCount: 500,
    },
  ];

  return (
    <>
      <div className="container mx-auto py-2">
        <button
          className="border-[#e6e8ec]  text-sm border-2 px-3 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
          onClick={() => navigate(Routes.SURVEY_LIST)}
        >
          <HiArrowLongLeft />
          Back
        </button>
      </div>
      <div className="relative pt-24 pb-40">
        <div className="container px-20 max-sm:px-4  mx-auto ">
          <p className="text-5xl font-bold -tracking-wider font-segoe-ui mb-1">
            Reaching out to your audience
          </p>
          <p className="text-lg text-[#777E91]">
            pick one of ours plans to get started with your campaign
          </p>
          <p className="text-lg text-[#777E91] mb-1 w-[425px]">
            You can reach out to us for a custom plan that fits your needs by{" "}
            <span className="text-[#3772FF]">contacting us</span>.
          </p>
          <div className="border-t-[1px] py-20 flex flex-wrap justify-center gap-8 z-20 relative">
            {packageList.map(
              ({ title, price, usersCount }: CompaignPackageType, index) => (
                <div key={index}>
                  <CompaignPackageSelection
                    title={title}
                    price={price}
                    usersCount={usersCount}
                  />
                </div>
              )
            )}
          </div>
          <img
            src={images.surveyHeroImg}
            alt="BG"
            className=" w-auto h-[760px] absolute bottom-0 right-0 z-[10] max-sm:hidden"
          />
        </div>
      </div>
    </>
  );
}
