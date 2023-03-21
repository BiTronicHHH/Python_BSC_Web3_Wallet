import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import images from "../../assets";
import { Routes } from "../../routes/Routes";

export default function CreateSurvey() {
  const navigate = useNavigate();

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
      <div className="text-center pb-16">
        <p className="text-5xl font-bold font-segoe-ui -tracking-widest pb-2">
          Surveys
        </p>
        <p className="text-sm font-normal text-[#777E91]">
          You currently have no published surveys .
        </p>
        <div className="w-[637px] max-sm:w-full border-2 rounded-md p-5 mt-10 mx-auto bg-white">
          <img src={images.suveryImg} alt="No Survey" className="" />
          <button
            className="bg-[#3772FF] text-base border-none px-3 py-2 text-white font-segoe-ui font-bold rounded-full w-max mx-auto justify-center flex mt-5"
            onClick={() => navigate("/surveys-objectives")}
          >
            Create survey
          </button>
        </div>
      </div>
    </>
  );
}
