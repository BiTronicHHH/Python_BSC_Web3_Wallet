import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/Routes";
import images from "../../assets";
import "./index.css";
import DashboardCard from "../../assets/components/DashboradCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const cardData = [
    {
      imageUrl: images.authBusiness,
      cardName: "Manage Business",
      url: "/business",
    },
    {
      imageUrl: images.authUser,
      cardName: "Manage users",
      url: "/users",
    },
    {
      imageUrl: images.authUser,
      cardName: "Manage tutorials",
      url: "/tutorials",
    },
    {
      imageUrl: images.authUser,
      cardName: "Manage Surveys",
      url: "/survey-list",
    },
  ];
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
          <div className="gap-1 items-center mr-2">Home - Dashboard</div>
        </div>

        <div className="text-center pb-16 bg-[#FCFCFD]">
          <p className="text-5xl font-bold font-segoe-ui -tracking-widest pb-2">
            Dashboard
          </p>
          <p className="text-sm font-normal text-[#777E91]">
            manage users/business and more
            <div className="min-w-[400px] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-8">
                {cardData.map((data) => {
                  return <DashboardCard key={data.cardName} data={data} />;
                })}
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
