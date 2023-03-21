import React, { useState } from "react";
import { AiFillPieChart } from "react-icons/ai";
import { HiArrowLongLeft } from "react-icons/hi2";
import { SlGraph } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/Routes";

export default function SurveysObjectives() {
  const [compaignObjective, setCompaignObjective] = useState<
    "qualitative" | "quantitative" | ""
  >("");

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
      <div className="container px-[140px] max-sm:px-4 py-20 mx-auto">
        <p className="text-base font-[500] mb-1">
          {" "}
          <span className="font-normal text-[#3772FF]">01 </span>Help us get you
          started
        </p>
        <div className="border-t-[1px]">
          <p className="text-base font-[500] text-[#777E91] p-5">
            What’s your campaign objective?
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-15">
            <div
              className={
                "w-[415px] h-[332px] max-sm:w-full bg-white border-[1px] p-8 cursor-pointer " +
                (compaignObjective == "qualitative"
                  ? "border-2 border-[#3772ff]"
                  : "")
              }
              onClick={() => setCompaignObjective("qualitative")}
            >
              <div className="flex gap-2">
                <AiFillPieChart color="#3772FF" />
                <p className="text-[15px] font-bold -tracking-wider font-segoe-ui">
                  Qualitative
                </p>
              </div>
              <div className="mt-8 text-[13px] ">
                <p className="text-[#777E91]">
                  Qualitative research involves collecting and analyzing
                  non-numerical data (e.g., text, video, or audio) to understand
                  concepts, opinions, or experiences. Responses are judged and
                  measured by feel rather than mathematics.
                </p>
                <p className="text-[#777E91] mb-2">Examples include:</p>
                <p className="font-[500]">
                  <span className="text-[#3772FF]">01 </span>Product feedback
                </p>
                <p className="font-[500]">
                  <span className="text-[#3772FF]">02 </span>Consumer insights
                </p>
              </div>
            </div>
            <div
              className={
                "w-[415px] h-[332px] max-sm:w-full bg-white border-[1px] p-8 cursor-pointer " +
                (compaignObjective == "quantitative"
                  ? "border-2 border-[#3772ff]"
                  : "")
              }
              onClick={() => setCompaignObjective("quantitative")}
            >
              <div className="flex gap-2">
                <SlGraph color="#3772FF" />
                <p className="text-[15px] font-bold -tracking-wider font-segoe-ui">
                  Quantitative
                </p>
              </div>
              <div className="mt-8 text-[13px] ">
                <p className="text-[#777E91]">
                  Quantitative research is the process of collecting and
                  analyzing numerical data. It can be used to find patterns and
                  averages, make predictions, test causal relationships, and
                  generalize results to wider populations. Responses are judged
                  by performance and mathematics rather than feel.
                </p>
                <p className="text-[#777E91] mb-2">Examples include:</p>
                <p className="font-[500]">
                  <span className="text-[#3772FF]">01 </span>Quizzes
                </p>
                <p className="font-[500]">
                  <span className="text-[#3772FF]">02 </span>Consumer insights
                </p>
                <p className="font-[500]">
                  <span className="text-[#3772FF]">03 </span>Memory tests
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-5 mt-10">
          <button
            className="border-[#e6e8ec]  text-sm border-2 px-6 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
            onClick={() => navigate(Routes.SURVEY_LIST)}
          >
            Back
          </button>
          <button
            className={
              (!compaignObjective ? "bg-[#92A9DE]" : "bg-[#3772FF]") +
              " border-none text-sm text-white border-2 px-12 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
            }
            onClick={() => navigate(Routes.UPLOAD_MEDIA)}
            disabled={!compaignObjective ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
