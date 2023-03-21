import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Routes } from "../../routes/Routes";
import { GoSearch } from "react-icons/go";
import { CiCircleChevDown } from "react-icons/ci";
import images from "../../assets";
import "./index.css";
import BusinessCard from "../../assets/components/BusinessCard";
import axios from "axios";

export interface filterType {
  industry: "all" | "trending" | "recommended";
  category: "all" | "commerical";
  membership: "all" | "prenium" | "common";
  verification: "all" | "verified-only" | "not-verified-only";
  number_of_surveys: number;
}

export default function Business() {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [active, setActive] = useState<filterType["industry"]>("all");
  useEffect(() => {
    axios
      .post("http://192.168.124.8:5000/api/business/display", {})
      .then((res) => {
        console.log(res.data.business);
        setCardData(res.data.business);
        console.log(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const cardData = [
  //   {
  //     imageUrl: images.authBusiness,
  //     cardName: "Manage Business",
  //     url: "/business",
  //   },
  //   {
  //     imageUrl: images.authUser,
  //     cardName: "authUser",
  //     url: "/page2",
  //   },
  //   {
  //     imageUrl: images.authUser,
  //     cardName: "authUser",
  //     url: "/page3",
  //   },
  //   {
  //     imageUrl: images.authUser,
  //     cardName: "authUser",
  //     url: "/page4",
  //   },
  // ];

  return (
    <>
      <div className="grid flex">
        <div className="flex container mx-auto py-2 justify-between items-center">
          <button
            className="border-[#e6e8ec]  text-sm border-2 px-3 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
            onClick={() => navigate(Routes.HOME)}
          >
            <HiArrowLongLeft />
            Back to home
          </button>
          <div className="gap-1 items-center mr-2">
            Home - Manage Businesses
          </div>
        </div>

        <div className="text-center pb-16 bg-[#FCFCFD] mx-auto">
          <p className="text-5xl font-bold font-segoe-ui -tracking-widest pb-2">
            Businesses
          </p>
          <p className="text-sm font-normal text-[#777E91]">
            Manage Businesses
          </p>

          <div className="flex items-center justify-between">
            <div className="">
              <div className="flex justify-between">
                <button
                  className="top-[-10px] max-sm:top-[-60px] right-5 bg-[#3772FF] px-5 py-3 text-white rounded-full font-bold font-segoe-ui border-none"
                  onClick={() => navigate(Routes.BADD)}
                >
                  + Add a business
                </button>
                <div>
                  <div className="w-[256px] mr-5 max-sm:mr-0 relative">
                    <label
                      htmlFor="business_search"
                      className="pl-2 text-xs uppercase font-poppins font-bold text-[#B1B5C4]"
                    >
                      Search business
                    </label>
                    <input
                      className="py-2 px-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none text-sm rounded-xl relative right-[-5px] w-full"
                      id="business_search"
                      placeholder="Search"
                    />
                    <GoSearch className="text-[#B1B5C4] absolute right-2 bottom-[10px]" />
                  </div>
                </div>
              </div>
              <div className="relative mt-10">
                <div className="flex flex-wrap items-center gap-3 font-bold text-xs mb-10 w-max max-sm:w-full">
                  <div
                    id="category"
                    className="relative mb-2 mr-5 w-[150px] max-sm:!w-[100vw] text-sm"
                  >
                    <select
                      defaultValue="type"
                      className="p-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none rounded-xl relative right-[-5px] w-full"
                    >
                      <option value="all">All</option>
                      <option value="ascending">Ascending</option>
                    </select>
                    <CiCircleChevDown className="w-[32px] h-[32px] bg-white absolute bottom-2 right-0 text-[#777E91]" />
                  </div>
                  <button
                    className={
                      (active === "all"
                        ? "bg-[#353945] text-[white]"
                        : "bg-transparent text-[#777E90]") +
                      " rounded-full h-[28px] px-3 py-1"
                    }
                    onClick={() => setActive("all")}
                  >
                    All Businesses
                  </button>
                  <button
                    className={
                      (active === "trending"
                        ? "bg-[#353945] text-[white]"
                        : "bg-transparent text-[#777E90]") +
                      " rounded-full h-[28px] px-3 py-1"
                    }
                    onClick={() => setActive("trending")}
                  >
                    Trending
                  </button>
                  <button
                    className={
                      (active === "recommended"
                        ? "bg-[#353945] text-[white]"
                        : "bg-transparent text-[#777E90]") +
                      " rounded-full h-[28px] px-3 py-1"
                    }
                    onClick={() => setActive("recommended")}
                  >
                    Recommended
                  </button>
                </div>
                <button className=" absolute top-[-10px] max-sm:top-[-60px] right-5 bg-[#3772FF] px-5 py-3 text-white rounded-full font-bold font-segoe-ui border-none">
                  Filter &times;
                </button>
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <div>
                  <label
                    htmlFor="category"
                    className="pl-2 text-xs uppercase font-poppins font-bold text-[#B1B5C4]"
                  >
                    Category
                  </label>
                  <div
                    id="category"
                    className="relative w-[256px] max-sm:!w-[100vw] mb-2 mr-5 mt-1"
                  >
                    <select
                      defaultValue="commerical"
                      className="p-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none rounded-xl relative right-[-5px] w-full"
                    >
                      <option value="all">All</option>
                      <option value="commerical">Commerical</option>
                    </select>
                    <CiCircleChevDown className="w-[32px] h-[32px] bg-white absolute bottom-2 right-0 text-[#777E91]" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="membership"
                    className="pl-2 text-xs uppercase font-poppins font-bold text-[#B1B5C4]"
                  >
                    Membership
                  </label>
                  <div
                    id="membership"
                    className="relative w-[256px] max-sm:!w-[100vw] mb-2 mr-5 mt-1"
                  >
                    <select
                      defaultValue="prenium"
                      className="p-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none rounded-xl relative right-[-5px] w-full"
                    >
                      <option value="all">All</option>
                      <option value="prenium">Prenium</option>
                      <option value="common">Common</option>
                    </select>
                    <CiCircleChevDown className="w-[32px] h-[32px] bg-white absolute bottom-2 right-0 text-[#777E91]" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="verified"
                    className="pl-2 text-xs uppercase font-poppins font-bold text-[#B1B5C4]"
                  >
                    Verified
                  </label>
                  <div
                    id="verified"
                    className="relative w-[256px] max-sm:!w-[100vw] mb-2 mr-5 mt-1"
                  >
                    <select
                      defaultValue="verified-only"
                      className="p-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none rounded-xl relative right-[-5px] w-full"
                    >
                      <option value="all">All</option>
                      <option value="verified-only">Verified only</option>
                      <option value="not-verified-only">
                        Not Verified only
                      </option>
                    </select>
                    <CiCircleChevDown className="w-[32px] h-[32px] bg-white absolute bottom-2 right-0 text-[#777E91]" />
                  </div>
                </div>
                <div className="flex flex-col relative items-center range-container mt-2 w-[256px]">
                  <label
                    htmlFor="range"
                    className="text-left uppercase w-full text-xs font-poppins-bold text-[#B1B5C4]"
                  >
                    Number of Surveys
                  </label>
                  <input
                    type="range"
                    className="rounded-lg overflow-hidden mt-2 appearance-none bg-[#E6E8EC] w-full"
                    id="range"
                    defaultValue={50}
                    min={10}
                    max={100}
                    step={10}
                    // onChange={(e) => {
                    //   setRange(Number(e.target.value))
                    // }}
                  />
                  <div className="flex justify-between w-full absolute -bottom-0">
                    <label htmlFor="range" className="text-sm">
                      {" "}
                      10{" "}
                    </label>
                    <label htmlFor="range" className="text-sm">
                      {" "}
                      {"< 100"}{" "}
                    </label>
                  </div>
                </div>
              </div>
              <div className="min-w-[400px] flex items-center justify-center">
                <div className="grid grid-cols-4 gap-8">
                  {cardData.map((data, index) => {
                    console.log(data);
                    return <BusinessCard key={index} data={data} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
